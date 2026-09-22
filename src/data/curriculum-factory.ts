import type { SubjectItem, ThemeModule, LessonItem, ExerciseItem } from '../core/types';

export type Level = 'basico' | 'intermediario' | 'avancado';
// [título, nível, faixaEtária, conceito, exemplo]
export type Seed = readonly [string, Level, string, string, string];

export interface SubjectConfig {
  id: string;
  title: string;
  color: string;
  icon: string;
  imageSrc?: string;
}

function genExercises(
  subjectId: string,
  lessonId: string,
  title: string,
  concept: string,
  num: number
): ExerciseItem[] {
  const idx = num % 4;
  const letters = ['a', 'b', 'c', 'd'] as const;
  const makeQ = (
    qNum: number,
    prompt: string,
    rightAnswer: string,
    w1: string,
    w2: string,
    w3: string
  ): ExerciseItem => {
    const qCorrect = letters[(qNum + idx) % 4];
    const optsRaw = [rightAnswer, w1, w2, w3];
    // rotate so correct lands on qCorrect position
    const rotated: string[] = new Array(4);
    rotated[(qNum + idx) % 4] = optsRaw[0];
    let wi = 0;
    letters.forEach((_, li) => {
      if (li !== (qNum + idx) % 4) rotated[li] = optsRaw[++wi];
    });
    return {
      id: `${lessonId}_q${qNum}`,
      lessonId,
      questionNumber: qNum,
      totalQuestions: 4,
      prompt,
      options: letters.map((l, li) => ({ id: l, text: rotated[li] })),
      correctOptionId: qCorrect,
      explanation: `Resposta: ${rightAnswer}. ${concept.substring(0, 90)}.`
    };
  };

  const short = concept.length > 50 ? concept.substring(0, 50).trim() + '.' : concept;

  return [
    makeQ(1,
      `O que melhor descreve "${title}"?`,
      short,
      'Uma técnica de programação avançada sem relação.',
      'Um processo mecânico industrial.',
      'Uma fórmula exclusiva da química orgânica.'
    ),
    makeQ(2,
      `Em qual área "${title}" é mais aplicado?`,
      subjectId === 'matematica' ? 'Cálculo e raciocínio lógico' :
      subjectId === 'portugues'  ? 'Comunicação e linguagem' :
      subjectId === 'ciencias'   ? 'Ciências naturais e experimentação' :
      subjectId === 'historia'   ? 'Compreensão histórica e temporal' :
      subjectId === 'geografia'  ? 'Espaço geográfico e sociedade' :
      subjectId === 'fisica'     ? 'Fenômenos físicos e cálculo' :
      subjectId === 'quimica'    ? 'Transformações da matéria' :
      subjectId === 'biologia'   ? 'Seres vivos e processos vitais' :
      'Comunicação em língua inglesa',
      'Culinária e gastronomia internacional.',
      'Programação de computadores.',
      'Design gráfico e artes visuais.'
    ),
    makeQ(3,
      `Qual conceito está correto sobre "${title}"?`,
      concept.substring(0, Math.min(60, concept.length)),
      'É um conceito exclusivo do ensino superior.',
      'Não tem aplicação prática no cotidiano.',
      'Só pode ser compreendido com cálculo diferencial.'
    ),
    makeQ(4,
      `Por que estudar "${title}" é importante?`,
      'Desenvolve habilidades essenciais para a vida e o trabalho.',
      'Apenas para passar em provas e testes.',
      'Não é necessário no mundo atual.',
      'Somente para quem quer ser professor.'
    ),
  ];
}

export function buildSubject(
  config: SubjectConfig,
  seeds: readonly Seed[],
  customThemes?: ThemeModule[]
): SubjectItem {
  const themes: ThemeModule[] = seeds.map((seed, i) => {
    const num = i + 1;
    const existing = customThemes?.find(t => t.number === num);
    if (existing) {
      return existing;
    }

    const [title, level, ageGroup, concept, example] = seed;
    const lessonId = `${config.id}_m${num}`;

    // Para História, constrói uma narrativa aprofundada como capítulo de livro didático
    const isHistoria = config.id === 'historia';
    const cleanTitle = title.replace(/^[0-9]+\.\s*/, '').trim();
    const fullTitle = isHistoria ? `História: ${cleanTitle}` : cleanTitle;
    const questionPrompt = isHistoria
      ? `Como ${cleanTitle} transformou a trajetória histórica da humanidade?`
      : `O que é ${cleanTitle} e como aplicar no dia a dia?`;

    const descriptionText = isHistoria
      ? `O estudo de ${cleanTitle} revela um momento decisivo da experiência humana no tempo. ${concept} Ao longo desse período histórico, profundas transformações sociais, políticas e culturais moldaram o cotidiano dos povos e influenciaram as gerações futuras. Compreender os acontecimentos desse contexto permite identificar causas, conflitos e desfechos que ainda ecoam no mundo contemporâneo e nas nossas instituições democráticas.`
      : concept;

    const lesson: LessonItem = {
      id: lessonId,
      subjectId: config.id,
      themeNumber: num,
      title: fullTitle,
      subtitle: `Módulo ${num} — ${ageGroup}`,
      summary: concept,
      content: {
        questionPrompt,
        description: descriptionText,
        numeratorExplanation: isHistoria
          ? `Contexto Histórico e Causas: ${concept} A análise dos vestígios documentais e materiais comprova o impacto desse processo na organização social da época.`
          : concept,
        denominatorExplanation: isHistoria
          ? `Desdobramentos e Transformações: ${example} Os efeitos desse acontecimento redefiniram fronteiras, estruturas de poder e direitos coletivos.`
          : example,
        exampleText: example,
        dailyLifeContext: isHistoria
          ? `O legado de ${cleanTitle} está presente nos museus, nas leis, nas artes e na memória coletiva da humanidade. ${example}`
          : `${title} é aplicado frequentemente em situações do quotidiano escolar e profissional. ${example}`
      },
      level,
      exercises: genExercises(config.id, lessonId, title, concept, num)
    };

    return {
      id: `${config.id}_t${num}`,
      number: num,
      title: `${num}. ${title}`,
      description: `${concept.substring(0, 75).trim()} (${ageGroup})`,
      level,
      ageGroup,
      lessons: [lesson]
    };
  });

  const completed = Math.floor(seeds.length * 0.2);
  return {
    id: config.id,
    title: config.title,
    color: config.color,
    icon: config.icon,
    imageSrc: config.imageSrc,
    activeLessonsCount: `${completed}/${seeds.length}`,
    themes
  };
}
