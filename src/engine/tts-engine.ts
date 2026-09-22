import { db } from '../db/database';

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  isNeural?: boolean;
  gender?: 'female' | 'male';
}

import { parseBilingualSegments, cleanSpeechText, cleanSegmentText, type SpeechSegment } from './bilingual-tts';

export { parseBilingualSegments, cleanSpeechText, cleanSegmentText, type SpeechSegment };

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
    // Mantemos o texto original para a segmentação: as aspas são uma pista
    // importante para detectar frases inglesas antes da higienização da fala.
    const sourceText = text;
    const cleanText = cleanSpeechText(sourceText);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    this.isSpeaking = true;

    const isBilingual = locale === 'bilingual-en' || locale === 'bilingual' || 
                        (locale === 'en-US' && (cleanText.includes('significa') || cleanText.includes('Qual é') || cleanText.includes('Como se')));

    // 0. Prioridade no APK Android: Text-to-Speech nativo do sistema Android (100% offline)
    if (typeof window !== 'undefined' && (window as any).AndroidTTS) {
      try {
        (window as any).onAndroidTTSEnd = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
        };

        if (isBilingual) {
          const segments = parseBilingualSegments(sourceText);
          if (typeof (window as any).AndroidTTS.speakSegments === 'function' && segments.length > 0) {
            (window as any).AndroidTTS.speakSegments(JSON.stringify(segments));
            return;
          }
        }

        const targetLang = locale === 'bilingual-en' || locale === 'bilingual' ? 'pt-BR' : (locale === 'en-US' ? 'en-US' : 'pt-BR');
        const speechPureText = cleanSegmentText(cleanText);
        (window as any).AndroidTTS.speak(speechPureText, targetLang);
        return;
      } catch (e) {
        console.warn('Falha no AndroidTTS nativo:', e);
      }
    }

    // A voz do EduFree é SEMPRE feminina brasileira: Francisca (pt-BR-FranciscaNeural)
    // Apenas para conteúdos ou termos em inglês na disciplina de Inglês alternamos para Jenny (en-US-JennyNeural)
    let voiceId = 'pt-BR-FranciscaNeural';
    if (isBilingual) {
      voiceId = 'bilingual';
    } else if (locale === 'en-US') {
      voiceId = 'en-US-JennyNeural';
    }

    const cacheKey = `edge_v2_${voiceId}_${cleanText}`;

    // 1. Verificar cache local no IndexedDB (armazenamento persistente offline)
    try {
      const cached = await db.audioCache.get(cacheKey);
      if (cached && cached.blob) {
        this.playAudioBlob(cached.blob, onEnd);
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
        const renderedVoices = res.headers.get('x-edufree-tts-voice') || '';
        const expectedVoice = isBilingual
          ? 'pt-BR-FranciscaNeural,en-US-JennyNeural'
          : voiceId;
        if (renderedVoices !== expectedVoice) {
          throw new Error(`Resposta TTS sem a voz esperada: ${renderedVoices || 'não informada'}`);
        }
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
        this.playAudioBlob(audioBlob, onEnd);
        return;
      }
    } catch (fetchErr) {
      console.error('Microsoft Edge TTS não ficou disponível; voz sintética foi bloqueada.', fetchErr);
    }

    // Nunca usar a voz local por padrão: ela é a origem da fala robótica.
    // O modo de contingência só pode ser habilitado explicitamente durante
    // diagnóstico por quem estiver com acesso ao armazenamento local.
    if (localStorage.getItem('edufree_allow_device_tts') === 'true') {
      this.speakWithSpeechSynthesis(cleanText, locale, onEnd);
    } else {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  private playAudioBlob(blob: Blob, onEnd?: () => void) {
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
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    audio.play().catch(err => {
      console.warn('Autoplay impedido ou falhou:', err);
      URL.revokeObjectURL(audioUrl);
      this.currentAudio = null;
      this.isSpeaking = false;
      if (onEnd) onEnd();
    });
  }

  /**
   * Localiza a melhor voz feminina de estúdio para o idioma correspondente,
   * garantindo que a voz brasileira seja sempre feminina natural e nunca robotizada.
   */
  private getBestVoiceForLocale(locale: string): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.loadLocalVoices();
    }
    if (this.voices.length === 0) return null;

    const isEn = locale.toLowerCase().startsWith('en');
    if (isEn) {
      // Prioriza voz feminina norte-americana (Jenny, Samantha, Google US English, etc.)
      return (
        this.voices.find(v => v.lang.startsWith('en') && /jenny|samantha|zira|female|natural|online/i.test(v.name)) ||
        this.voices.find(v => v.lang.startsWith('en') && /google us english/i.test(v.name)) ||
        this.voices.find(v => v.lang === 'en-US') ||
        this.voices.find(v => v.lang.startsWith('en')) ||
        null
      );
    }

    // Padrão: Voz feminina brasileira (Francisca, Luciana, Leticia, Google português do Brasil)
    return (
      this.voices.find(v => (v.lang === 'pt-BR' || v.lang.includes('BR')) && /francisca|luciana|leticia|helena|maria|female|mulher|natural|online/i.test(v.name)) ||
      this.voices.find(v => /google português do brasil/i.test(v.name)) ||
      this.voices.find(v => v.lang === 'pt-BR') ||
      this.voices.find(v => v.lang.startsWith('pt')) ||
      null
    );
  }

  /**
   * Fallback com síntese local Web Speech API caso não haja rede
   * No modo bilíngue, segmenta e troca a voz nativa entre PT (Francisca) e EN (Jenny)
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
      if (segments.length > 0) {
        this.speakSegmentsWithSpeechSynthesis(segments, onEnd);
        return;
      }
    }

    const cleanedPure = cleanSegmentText(text);
    if (!cleanedPure) {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanedPure);
    utterance.lang = locale === 'en-US' ? 'en-US' : 'pt-BR';
    // Inglês reduzido para aprendizagem; português em velocidade natural.
    utterance.rate = utterance.lang === 'en-US' ? 0.90 : 1.0;
    utterance.pitch = 1.0;

    const targetVoice = this.getBestVoiceForLocale(utterance.lang);
    if (targetVoice) {
      utterance.voice = targetVoice;
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
   * Alternando voz feminina brasileira e americana sem falar pontuações
   */
  private speakSegmentsWithSpeechSynthesis(segments: SpeechSegment[], onEnd?: () => void) {
    if (!this.synth || segments.length === 0) {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    let currentIndex = 0;

    const playNext = () => {
      if (!this.isSpeaking || currentIndex >= segments.length) {
        this.isSpeaking = false;
        if (onEnd) onEnd();
        return;
      }

      const seg = segments[currentIndex++];
      const cleanSeg = cleanSegmentText(seg.text);
      if (!cleanSeg) {
        playNext();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanSeg);
      utterance.lang = seg.lang;
      // Inglês reduzido para aprendizagem; português em velocidade natural.
      utterance.rate = seg.lang === 'en-US' ? 0.90 : 1.0;

      const targetVoice = this.getBestVoiceForLocale(seg.lang);
      if (targetVoice) {
        utterance.voice = targetVoice;
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

    if (typeof window !== 'undefined' && (window as any).AndroidTTS) {
      try {
        (window as any).AndroidTTS.stop();
      } catch (e) {
        console.warn('Erro ao parar AndroidTTS:', e);
      }
    }

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
