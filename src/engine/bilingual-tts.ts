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
  'opção', 'opcao', 'questão', 'questao', 'dizemos', 'as', 'formas', 'no', 'presente',
  'estudante', 'felizes', 'resposta', 'correta', 'incorreta'
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
  'greetings', 'pronouns', 'personal', 'opposites', 'jobs', 'family', 'members',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'october', 'march', 'welcome', 'nice', 'meet',
  'if', 'had', 'spaceship', 'travel', 'mars', 'world', 'dollar', 'dollars', 'complete', 'sentence'
]);

/**
 * Sanitiza o texto para síntese de voz natural e fluida:
 * - Evita terminantemente que o TTS fale "ponto", "ponto ponto" ou "exclamação".
 * - Ajusta a pontuação exclusivamente para entonação e pausas oracionais naturais.
 * - Remove aspas, parênteses e caracteres gráficos especiais.
 */
export function cleanSpeechText(text: string): string {
  if (!text) return '';
  return text
    // Converte barras isoladas para 'ou' para evitar falar 'barra'
    .replace(/\s*[/\\\\]\s*/g, ' ou ')
    // Dois pontos e ponto e vírgula viram pausa suave (vírgula)
    .replace(/[:;]/g, ', ')
    // Exclamações viram ponto simples (pausa de cadência sem verbalizar "exclamação")
    .replace(/[!¡]/g, '. ')
    // Remove aspas de qualquer tipo (evita verbalizar "aspas")
    .replace(/["“”‘’'`]/g, '')
    // Remove parênteses, colchetes e chaves (evita falar "abre parênteses")
    .replace(/[()[\]{}]/g, ' ')
    // Traços e hífens viram espaços
    .replace(/[-—–_]/g, ' ')
    // Sequências de pontos (reticências .. ou ...) viram um único ponto
    .replace(/\.{2,}/g, '. ')
    .replace(/…/g, '. ')
    // Sequências de vírgulas viram uma única vírgula
    .replace(/,{2,}/g, ', ')
    // Normaliza espaçamentos antes de pontuações
    .replace(/\s+,/g, ', ')
    .replace(/\s+\./g, '. ')
    // Normaliza múltiplos espaços
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Higieniza um segmento individual para garantir que nunca inicie com ponto ou pontuação solta,
 * o que causava o sintetizador a falar "ponto" no início da fala.
 */
export function cleanSegmentText(text: string): string {
  if (!text) return '';
  let s = cleanSpeechText(text);
  // Remove pontuações no início do segmento (ex: ". O verbo" -> "O verbo")
  s = s.replace(/^[.,;:!?\s]+/, '').trim();
  // Se houver vírgula colada no ponto, normaliza
  s = s.replace(/,\s*\./g, '.');
  return s;
}

/**
 * Classifica se um fragmento textual é 'en-US' ou 'pt-BR'
 */
export function classifyTextLanguage(str: string, defaultLang: 'pt-BR' | 'en-US' = 'pt-BR'): 'pt-BR' | 'en-US' {
  const clean = str.trim().toLowerCase().replace(/[.,!?:;()""'']/g, '');
  if (!clean) return defaultLang;

  // Acentos específicos do português indicam imediatamente pt-BR
  if (PT_ACCENTS.test(clean)) return 'pt-BR';

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return defaultLang;

  // Frases e termos exatos característicos de inglês
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

/**
 * Divide o texto bilíngue em segmentos para síntese de voz alternando vozes nativas:
 * - Português: Voz feminina Francisca (pt-BR)
 * - Inglês: Voz feminina Jenny (en-US)
 * Garante que termos em inglês ('To Be', 'I am', etc.) mudem para a voz en-US,
 * e explicações em português permaneçam na voz pt-BR do Brasil.
 */
export function parseBilingualSegments(text: string): SpeechSegment[] {
  if (!text || !text.trim()) return [];

  // Normaliza aspas para facilitar matching de termos em destaque
  const normalized = text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  // Regex abrangente para detectar termos em inglês (entre aspas ou vocábulos-chave gramaticais)
  // Frases longas vêm antes das curtas para que "I am a student" nunca seja
  // quebrado em "I am" (Jenny) + "a student" (Francisca).
  const tokenRegex = /(?:'([^']+)'|"([^"]+)"|\b(?:i am a student|she is happy|he is happy|you are a student|we are students|they are students|my name is [a-z]+|nice to meet you|good morning|good afternoon|good evening|good night|how are you|simple present|present continuous|past simple|second conditional|phrasal verbs|personal pronouns|family members|verb to be|to be|i am|you are|he is|she is|it is|we are|they are|greetings|opposites)\b|\b(?:I|You|He|She|We|They|It)\b(?=\s+significa))/gi;

  const rawSegments: SpeechSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(normalized)) !== null) {
    const matchStart = match.index;
    const matchEnd = tokenRegex.lastIndex;
    const matchedStr = match[0];

    // Texto explicativo em português antes do termo em inglês
    if (matchStart > lastIndex) {
      const preceding = normalized.slice(lastIndex, matchStart);
      const cleanedPre = cleanSegmentText(preceding);
      if (cleanedPre && /[a-zA-Z0-9À-ÿ]/.test(cleanedPre)) {
        const lang = classifyTextLanguage(cleanedPre, 'pt-BR');
        rawSegments.push({ text: cleanedPre, lang });
      }
    }

    // Processar o termo detectado
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

  // Texto restante após último token
  if (lastIndex < normalized.length) {
    const trailing = normalized.slice(lastIndex);
    const cleanedTrail = cleanSegmentText(trailing);
    if (cleanedTrail && /[a-zA-Z0-9À-ÿ]/.test(cleanedTrail)) {
      const lang = classifyTextLanguage(cleanedTrail, 'pt-BR');
      rawSegments.push({ text: cleanedTrail, lang });
    }
  }

  // Mesclar segmentos contíguos do mesmo idioma de forma natural e sem pontuação artificial
  const merged: SpeechSegment[] = [];
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
