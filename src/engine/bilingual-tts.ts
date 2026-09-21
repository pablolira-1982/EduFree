export interface SpeechSegment {
  text: string;
  lang: 'pt-BR' | 'en-US' | 'pt-PT';
}

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

/**
 * Classifies a phrase or word as 'en-US' or 'pt-BR'
 */
export function classifyTextLanguage(str: string, defaultLang: 'pt-BR' | 'en-US' = 'pt-BR'): 'pt-BR' | 'en-US' {
  const clean = str.trim().toLowerCase().replace(/[.,!?:;()""'']/g, '');
  if (!clean) return defaultLang;

  // Accents specific to Portuguese
  if (PT_ACCENTS.test(clean)) return 'pt-BR';

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return defaultLang;

  // Exact phrase overrides
  if (clean === 'to be' || clean === 'verb to be' || clean === 'i am' || clean === 'you are' || clean === 'he is' || clean === 'she is') {
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

/**
 * Splits bilingual lesson text into segments for sequential or multi-voice speech synthesis.
 * Handles quoted English expressions ('to be', 'I am'), unquoted English phrases, and Portuguese explanations.
 */
export function parseBilingualSegments(text: string): SpeechSegment[] {
  if (!text || !text.trim()) return [];

  // Normalize quotes
  const normalized = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  // Regex to detect:
  // 1. Quoted text: '...' or "..."
  // 2. English phrases: "To Be", "verb to be", "I am", "You are", "He is", "She is", "We are", "They are", "It is"
  // 3. English pronouns before "significa": "I significa", "You significa", etc.
  // 4. English greeting tokens: "Good morning", "Good afternoon", etc.
  const tokenRegex = /('([^']+)'|"([^"]+)"|\b(?:to be|verb to be|i am|you are|he is|she is|it is|we are|they are|good morning|good afternoon|good evening|good night|how are you|simple present|present continuous|past simple|second conditional|phrasal verbs)\b|\b(?:I|You|He|She|We|They|It)\b(?=\s+significa))/gi;

  const rawSegments: SpeechSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(normalized)) !== null) {
    const matchStart = match.index;
    const matchEnd = tokenRegex.lastIndex;
    const matchedStr = match[0];

    // Preceding text before match
    if (matchStart > lastIndex) {
      const preceding = normalized.slice(lastIndex, matchStart);
      if (preceding.trim()) {
        const lang = classifyTextLanguage(preceding, 'pt-BR');
        rawSegments.push({ text: preceding, lang });
      }
    }

    // Process matched token
    let content = matchedStr;
    const isQuoted = (matchedStr.startsWith("'") && matchedStr.endsWith("'")) ||
                     (matchedStr.startsWith('"') && matchedStr.endsWith('"'));
    if (isQuoted) {
      content = matchedStr.slice(1, -1);
    }

    // Classify the content of this token
    let tokenLang: 'pt-BR' | 'en-US';
    if (isQuoted) {
      tokenLang = classifyTextLanguage(content, 'en-US');
    } else {
      tokenLang = 'en-US';
    }

    rawSegments.push({ text: content, lang: tokenLang });
    lastIndex = matchEnd;
  }

  if (lastIndex < normalized.length) {
    const trailing = normalized.slice(lastIndex);
    if (trailing.trim()) {
      const lang = classifyTextLanguage(trailing, 'pt-BR');
      rawSegments.push({ text: trailing, lang });
    }
  }

  // Merge adjacent segments with identical language
  const merged: SpeechSegment[] = [];
  for (const seg of rawSegments) {
    const cleanSegText = seg.text.trim();
    if (!cleanSegText) continue;

    if (merged.length > 0 && merged[merged.length - 1].lang === seg.lang) {
      const prev = merged[merged.length - 1];
      const needsSpace = !prev.text.endsWith(' ') && !cleanSegText.startsWith('.') && !cleanSegText.startsWith(',') && !cleanSegText.startsWith('!') && !cleanSegText.startsWith('?');
      prev.text += (needsSpace ? ' ' : '') + cleanSegText;
    } else {
      merged.push({ text: cleanSegText, lang: seg.lang });
    }
  }

  return merged;
}
