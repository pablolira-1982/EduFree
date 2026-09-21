import { db } from '../db/database';

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  isNeural?: boolean;
  gender?: 'female' | 'male';
}

import { parseBilingualSegments, type SpeechSegment } from './bilingual-tts';

export { parseBilingualSegments, type SpeechSegment };

export const MICROSOFT_EDGE_NEURAL_VOICES: VoiceOption[] = [
  {
    id: 'pt-BR-FranciscaNeural',
    name: 'Francisca (Natural / Microsoft Edge)',
    lang: 'pt-BR',
    isNeural: true,
    gender: 'female'
  },
  {
    id: 'pt-BR-AntonioNeural',
    name: 'Antônio (Natural / Microsoft Edge)',
    lang: 'pt-BR',
    isNeural: true,
    gender: 'male'
  },
  {
    id: 'pt-BR-ThalitaNeural',
    name: 'Thalita (Natural Jovem / Microsoft Edge)',
    lang: 'pt-BR',
    isNeural: true,
    gender: 'female'
  },
  {
    id: 'pt-PT-RaquelNeural',
    name: 'Raquel (Natural PT-PT / Microsoft Edge)',
    lang: 'pt-PT',
    isNeural: true,
    gender: 'female'
  },
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny (Native English / Microsoft Edge)',
    lang: 'en-US',
    isNeural: true,
    gender: 'female'
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy (Native English / Microsoft Edge)',
    lang: 'en-US',
    isNeural: true,
    gender: 'male'
  }
];

export class TTSEngine {
  private static instance: TTSEngine;
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private currentAudio: HTMLAudioElement | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoiceId: string = 'pt-BR-FranciscaNeural';

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('edufree_preferred_voice');
        if (saved) {
          this.preferredVoiceId = saved;
        }
      } catch {
        // ignore
      }

      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadLocalVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadLocalVoices();
        }
      }
    }
  }

  private loadLocalVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public static getInstance(): TTSEngine {
    if (!TTSEngine.instance) {
      TTSEngine.instance = new TTSEngine();
    }
    return TTSEngine.instance;
  }

  public setPreferredVoice(voiceId: string) {
    this.preferredVoiceId = voiceId;
    try {
      localStorage.setItem('edufree_preferred_voice', voiceId);
    } catch {
      // ignore
    }
  }

  public getPreferredVoice(): string {
    return this.preferredVoiceId;
  }

  public getAvailableVoices(): VoiceOption[] {
    return MICROSOFT_EDGE_NEURAL_VOICES;
  }

  /**
   * Tenta reproduzir áudio com voz natural Microsoft Edge (online ou cache IndexedDB)
   * Suporta síntese Bilíngue (troca automática para inglês nativo em expressões como 'to be', 'I am')
   * Se offline e não houver cache, utiliza fallback inteligente do SpeechSynthesis.
   */
  public async speak(text: string, locale: string = 'pt-BR', onEnd?: () => void): Promise<void> {
    const cleanText = text.trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    this.isSpeaking = true;

    const isBilingual = locale === 'bilingual-en' || locale === 'bilingual' || 
                        (locale === 'en-US' && (cleanText.includes('significa') || cleanText.includes('Qual é') || cleanText.includes('Como se')));

    // Selecionar voz ou modo bilíngue adequado
    let voiceId = this.preferredVoiceId;
    if (isBilingual) {
      voiceId = 'bilingual';
    } else if (locale === 'pt-PT' && !voiceId.startsWith('pt-PT')) {
      voiceId = 'pt-PT-RaquelNeural';
    } else if (locale === 'en-US') {
      voiceId = 'en-US-JennyNeural';
    }

    const cacheKey = `edge_${voiceId}_${cleanText}`;

    // 1. Verificar cache local no IndexedDB (armazenamento persistente offline)
    try {
      const cached = await db.audioCache.get(cacheKey);
      if (cached && cached.blob) {
        this.playAudioBlob(cached.blob, cleanText, locale, onEnd);
        return;
      }
    } catch (e) {
      console.warn('Falha ao ler cache de áudio do IndexedDB:', e);
    }

    // 2. Requisitar ao serviço Microsoft Edge TTS através do middleware /api/tts
    try {
      const endpoint = isBilingual
        ? `/api/tts?text=${encodeURIComponent(cleanText)}&voice=bilingual&bilingual=1`
        : `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(voiceId)}`;
      const res = await fetch(endpoint);

      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const audioBlob = await res.blob();

        // Salvar no IndexedDB para reproduções futuras 100% offline
        try {
          await db.audioCache.put({
            key: cacheKey,
            blob: audioBlob,
            createdAt: Date.now()
          });
        } catch (dbErr) {
          console.warn('Não foi possível gravar no audioCache:', dbErr);
        }

        if (!this.isSpeaking) return; // cancelado no meio do carregamento
        this.playAudioBlob(audioBlob, cleanText, locale, onEnd);
        return;
      }
    } catch (fetchErr) {
      console.warn('Erro ao conectar ao Microsoft Edge TTS, acionando fallback local:', fetchErr);
    }

    // 3. Fallback: síntese de fala do navegador se a requisição falhou e não há cache
    this.speakWithSpeechSynthesis(cleanText, locale, onEnd);
  }

  private playAudioBlob(blob: Blob, cleanText: string, locale: string, onEnd?: () => void) {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    this.currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      this.isSpeaking = false;
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn('Erro na reprodução do áudio:', e);
      URL.revokeObjectURL(audioUrl);
      this.currentAudio = null;
      // Fallback resiliente imediato
      this.speakWithSpeechSynthesis(cleanText, locale, onEnd);
    };

    audio.play().catch(err => {
      console.warn('Autoplay impedido ou falhou:', err);
      URL.revokeObjectURL(audioUrl);
      this.currentAudio = null;
      // Fallback resiliente imediato caso a política do navegador impeça áudio gerado assincronamente
      this.speakWithSpeechSynthesis(cleanText, locale, onEnd);
    });
  }

  /**
   * Fallback com síntese local Web Speech API caso não haja rede
   * No modo bilíngue, segmenta e troca a voz nativa entre PT e EN para pronúncia impecável.
   */
  private speakWithSpeechSynthesis(text: string, locale: string, onEnd?: () => void) {
    if (!this.synth) {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    const isBilingual = locale === 'bilingual-en' || locale === 'bilingual' || 
                        (locale === 'en-US' && (text.includes('significa') || text.includes('Qual é')));

    if (isBilingual) {
      const segments = parseBilingualSegments(text);
      if (segments.length > 1) {
        this.speakSegmentsWithSpeechSynthesis(segments, onEnd);
        return;
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === 'pt-PT' ? 'pt-PT' : locale === 'en-US' ? 'en-US' : 'pt-BR';
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    if (this.voices.length === 0) {
      this.loadLocalVoices();
    }

    const targetVoices = this.voices.filter(v => v.lang.startsWith(locale.substring(0, 2)));
    if (targetVoices.length > 0) {
      utterance.voice = targetVoices[0];
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  /**
   * Executa fila encadeada de segmentos com síntese de voz local (Web Speech API)
   */
  private speakSegmentsWithSpeechSynthesis(segments: SpeechSegment[], onEnd?: () => void) {
    if (!this.synth || segments.length === 0) {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    if (this.voices.length === 0) {
      this.loadLocalVoices();
    }

    let currentIndex = 0;

    const playNext = () => {
      if (!this.isSpeaking || currentIndex >= segments.length) {
        this.isSpeaking = false;
        if (onEnd) onEnd();
        return;
      }

      const seg = segments[currentIndex++];
      const utterance = new SpeechSynthesisUtterance(seg.text);
      utterance.lang = seg.lang;
      utterance.rate = 0.98;

      const targetVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith(seg.lang.substring(0, 2).toLowerCase()));
      if (targetVoices.length > 0) {
        utterance.voice = targetVoices[0];
      }

      utterance.onend = () => {
        playNext();
      };

      utterance.onerror = () => {
        playNext();
      };

      this.synth!.speak(utterance);
    };

    playNext();
  }

  public stop() {
    this.isSpeaking = false;
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
  }

  public speaking(): boolean {
    return this.isSpeaking;
  }
}

export const tts = TTSEngine.getInstance();
