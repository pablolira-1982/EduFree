import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import os from 'os';
import path from 'path';
import fs from 'fs';
// @ts-ignore
import { EdgeTTS } from 'node-edge-tts';

const PT_ACCENTS = /[áàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/i;

const PT_COMMON_WORDS = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'das', 'dos',
  'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'pelo', 'pela', 'com', 'sem',
  'é', 'são', 'era', 'eram', 'ser', 'estar', 'está', 'estão', 'estou', 'sou',
  'como', 'quando', 'onde', 'porque', 'porquê', 'qual', 'quais', 'quem',
  'muito', 'muita', 'muitos', 'muitas', 'mais', 'menos', 'bem', 'mal',
  'não', 'sim', 'já', 'ainda', 'sempre', 'nunca', 'também', 'tanto', 'quanto',
  'significa', 'significam', 'quer', 'dizer', 'exemplo', 'prático', 'prática',
  'passo', 'primeiro', 'segundo', 'terceiro', 'começar', 'aprender', 'conhecer',
  'pronomes', 'pessoais', 'verbo', 'verbos', 'frase', 'frases', 'palavra', 'palavras',
  'tranquilidade', 'vida', 'dia', 'jogar', 'videogames', 'ouvir', 'músicas',
  'olá', 'ola', 'bom', 'boa', 'tarde', 'noite', 'ao', 'sair', 'você', 'ele', 'ela', 'eles', 'elas',
  'opção', 'opcao', 'questão', 'questao'
]);

const EN_COMMON_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
  'hello', 'hi', 'good', 'morning', 'afternoon', 'evening', 'night', 'goodbye', 'bye',
  'happy', 'name', 'very', 'student', 'school', 'book', 'teacher', 'children', 'child',
  'yellow', 'blue', 'red', 'green', 'black', 'white', 'orange', 'purple',
  'present', 'past', 'future', 'continuous', 'conditional', 'simple', 'phrasal', 'verbs',
  'verb', 'grammar', 'vocabulary', 'foundations', 'reading', 'debate', 'fluency',
  'if', 'had', 'spaceship', 'travel', 'mars', 'world', 'dollar', 'dollars', 'complete', 'sentence'
]);

function cleanSpeechText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*[/\\\\]\s*/g, ' ou ')
    .replace(/[:;]/g, ', ')
    .replace(/[!¡]/g, '. ')
    .replace(/["“”‘’'`]/g, '')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/[-—–_]/g, ' ')
    .replace(/\.{2,}/g, '. ')
    .replace(/…/g, '. ')
    .replace(/,{2,}/g, ', ')
    .replace(/\s+,/g, ', ')
    .replace(/\s+\./g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanSegmentText(text: string): string {
  if (!text) return '';
  let s = cleanSpeechText(text);
  s = s.replace(/^[.,;:!?\s]+/, '').trim();
  s = s.replace(/,\s*\./g, '.');
  return s;
}

function classifyTextLanguage(str: string, defaultLang: 'pt-BR' | 'en-US' = 'pt-BR'): 'pt-BR' | 'en-US' {
  const clean = str.trim().toLowerCase().replace(/[.,!?:;()""'']/g, '');
  if (!clean) return defaultLang;
  if (PT_ACCENTS.test(clean)) return 'pt-BR';
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return defaultLang;

  if (
    clean === 'to be' ||
    clean === 'verb to be' ||
    clean === 'i am' ||
    clean === 'you are' ||
    clean === 'he is' ||
    clean === 'she is' ||
    clean === 'it is' ||
    clean === 'we are' ||
    clean === 'they are' ||
    clean === 'greetings' ||
    clean === 'am, is, are' ||
    clean === 'am is are' ||
    clean === 'good morning' ||
    clean === 'good afternoon' ||
    clean === 'good evening' ||
    clean === 'good night' ||
    clean === 'how are you' ||
    clean === 'my name is' ||
    clean === 'nice to meet you'
  ) {
    return 'en-US';
  }

  let ptScore = 0;
  let enScore = 0;
  for (const w of words) {
    if (PT_COMMON_WORDS.has(w)) ptScore++;
    if (EN_COMMON_WORDS.has(w)) enScore++;
  }
  if (enScore > ptScore) return 'en-US';
  if (ptScore > enScore) return 'pt-BR';
  return defaultLang;
}

function parseBilingualSegments(text: string): { text: string; lang: 'pt-BR' | 'en-US' }[] {
  if (!text || !text.trim()) return [];
  const normalized = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  // Frases longas vêm antes das curtas para não dividir "I am a student"
  // entre a voz Jenny e a voz Francisca.
  const tokenRegex = /(?:'([^']+)'|"([^"]+)"|\b(?:i am a student|she is happy|he is happy|you are a student|we are students|they are students|my name is [a-z]+|nice to meet you|good morning|good afternoon|good evening|good night|how are you|simple present|present continuous|past simple|second conditional|phrasal verbs|personal pronouns|family members|verb to be|to be|i am|you are|he is|she is|it is|we are|they are|greetings|opposites)\b|\b(?:I|You|He|She|We|They|It)\b(?=\s+significa))/gi;

  const rawSegments: { text: string; lang: 'pt-BR' | 'en-US' }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(normalized)) !== null) {
    const matchStart = match.index;
    const matchEnd = tokenRegex.lastIndex;
    const matchedStr = match[0];

    if (matchStart > lastIndex) {
      const preceding = normalized.slice(lastIndex, matchStart);
      const cleanedPre = cleanSegmentText(preceding);
      if (cleanedPre && /[a-zA-Z0-9À-ÿ]/.test(cleanedPre)) {
        rawSegments.push({ text: cleanedPre, lang: classifyTextLanguage(cleanedPre, 'pt-BR') });
      }
    }

    let content = matchedStr;
    const isQuoted = (matchedStr.startsWith("'") && matchedStr.endsWith("'")) ||
                     (matchedStr.startsWith('"') && matchedStr.endsWith('"'));

    if (isQuoted) {
      content = matchedStr.slice(1, -1).trim();
    }

    let tokenLang: 'pt-BR' | 'en-US' = 'en-US';
    if (isQuoted) {
      tokenLang = classifyTextLanguage(content, 'en-US');
    }

    const cleanedContent = cleanSegmentText(content);
    if (cleanedContent && /[a-zA-Z0-9À-ÿ]/.test(cleanedContent)) {
      rawSegments.push({ text: cleanedContent, lang: tokenLang });
    }
    lastIndex = matchEnd;
  }

  if (lastIndex < normalized.length) {
    const trailing = normalized.slice(lastIndex);
    const cleanedTrail = cleanSegmentText(trailing);
    if (cleanedTrail && /[a-zA-Z0-9À-ÿ]/.test(cleanedTrail)) {
      rawSegments.push({ text: cleanedTrail, lang: classifyTextLanguage(cleanedTrail, 'pt-BR') });
    }
  }

  const merged: { text: string; lang: 'pt-BR' | 'en-US' }[] = [];
  for (const seg of rawSegments) {
    if (merged.length > 0 && merged[merged.length - 1].lang === seg.lang) {
      const prev = merged[merged.length - 1];
      const needsSpace = !prev.text.endsWith(' ');
      prev.text += (needsSpace ? ' ' : '') + seg.text;
    } else {
      merged.push({ text: seg.text, lang: seg.lang });
    }
  }
  return merged;
}

function edgeTTSPlugin(): Plugin {
  const memoryCache = new Map<string, Buffer>();

  const handleTTS = async (req: any, res: any) => {
    try {
      const urlObj = new URL(req.url, 'http://localhost');
      const rawText = urlObj.searchParams.get('text');
      const text = cleanSpeechText(rawText || '');
      const voice = urlObj.searchParams.get('voice') || 'pt-BR-FranciscaNeural';
      const rate = urlObj.searchParams.get('rate') || 'default';
      const isBilingual = urlObj.searchParams.get('bilingual') === '1' || voice === 'bilingual' || voice.startsWith('bilingual');

      if (!text || text.trim().length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Text query parameter is required' }));
        return;
      }

      // 1. Processamento Bilíngue: combina voz nativa portuguesa (Francisca) e inglesa (Jenny)
      let resolvedVoice = voice;
      if (isBilingual) {
        const segments = parseBilingualSegments(text.trim());
        const hasEnglish = segments.some(s => s.lang === 'en-US');
        const hasPortuguese = segments.some(s => s.lang === 'pt-BR');

        if (hasEnglish && hasPortuguese) {
          const cacheKey = `bilingual_${rate}_${text.trim()}`;
          if (memoryCache.has(cacheKey)) {
            const cached = memoryCache.get(cacheKey)!;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('X-EduFree-TTS-Voice', 'pt-BR-FranciscaNeural,en-US-JennyNeural');
            res.setHeader('Content-Length', cached.length);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.end(cached);
            return;
          }

          // Sintetizar cada segmento em paralelo com a respectiva voz neural
          const promises = segments.map(async (seg, idx) => {
            const isEnglishSeg = seg.lang === 'en-US';
            const segVoice = isEnglishSeg ? 'en-US-JennyNeural' : 'pt-BR-FranciscaNeural';
            const segLang = seg.lang;
            // Jenny reduzida para aprendizagem; Francisca em velocidade natural.
            const segRate = rate !== 'default' ? rate : (isEnglishSeg ? '-10%' : 'default');
            const tmpFile = path.join(
              os.tmpdir(),
              `edufree_bi_${Date.now()}_${idx}_${Math.random().toString(36).substring(7)}.mp3`
            );
            const tts = new EdgeTTS({
              voice: segVoice,
              lang: segLang,
              outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
              rate: segRate
            });

            await tts.ttsPromise(seg.text, tmpFile);
            if (fs.existsSync(tmpFile)) {
              const buf = fs.readFileSync(tmpFile);
              try { fs.unlinkSync(tmpFile); } catch {}
              return buf;
            }
            return Buffer.alloc(0);
          });

          const buffers = await Promise.all(promises);
          const combined = Buffer.concat(buffers.filter(b => b.length > 0));

          if (combined.length > 0) {
            memoryCache.set(cacheKey, combined);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('X-EduFree-TTS-Voice', 'pt-BR-FranciscaNeural,en-US-JennyNeural');
            res.setHeader('Content-Length', combined.length);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.end(combined);
            return;
          }
        } else if (hasEnglish && !hasPortuguese) {
          resolvedVoice = 'en-US-JennyNeural';
        } else {
          resolvedVoice = 'pt-BR-FranciscaNeural';
        }
      }

      // 2. Processamento Monolíngue Padrão
      const singleVoice = resolvedVoice === 'bilingual' 
        ? (classifyTextLanguage(text.trim(), 'pt-BR') === 'en-US' ? 'en-US-JennyNeural' : 'pt-BR-FranciscaNeural')
        : resolvedVoice;
      const singleVoiceRate = rate !== 'default' ? rate : (singleVoice.startsWith('en-') ? '-10%' : 'default');
      const cacheKey = `${singleVoice}_${singleVoiceRate}_${text.trim()}`;
      if (memoryCache.has(cacheKey)) {
        const cached = memoryCache.get(cacheKey)!;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('X-EduFree-TTS-Voice', singleVoice);
        res.setHeader('Content-Length', cached.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.end(cached);
        return;
      }

      const tmpFile = path.join(
        os.tmpdir(),
        `edufree_tts_${Date.now()}_${Math.random().toString(36).substring(7)}.mp3`
      );

      const lang = singleVoice.startsWith('en-') ? 'en-US' : singleVoice.startsWith('pt-PT') ? 'pt-PT' : 'pt-BR';
      const tts = new EdgeTTS({
        voice: singleVoice,
        lang,
        outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
        rate: singleVoiceRate
      });

      await tts.ttsPromise(text, tmpFile);

      if (fs.existsSync(tmpFile)) {
        const audioBuffer = fs.readFileSync(tmpFile);
        try {
          fs.unlinkSync(tmpFile);
        } catch {
          // ignore unlink error
        }

        memoryCache.set(cacheKey, audioBuffer);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('X-EduFree-TTS-Voice', singleVoice);
        res.setHeader('Content-Length', audioBuffer.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.end(audioBuffer);
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to generate audio file' }));
      }
    } catch (err: any) {
      console.error('[Edge TTS Plugin Error]:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err?.message || 'TTS generation failed' }));
    }
  };

  return {
    name: 'vite-plugin-edge-tts',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/tts')) {
          handleTTS(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/tts')) {
          handleTTS(req, res);
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), edgeTTSPlugin()],
});
