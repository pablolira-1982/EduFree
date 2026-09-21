export type ScreenType = 
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'activities'
  | 'subject'
  | 'lesson'
  | 'exercise'
  | 'feedback'
  | 'progress'
  | 'profile'
  | 'packs'
  | 'tutor'
  | 'settings'
  | 'completion';

export type TestMode = 'rapido' | 'simulado' | 'maratona' | 'modulo';

export interface TestSessionConfig {
  subjectId: string;
  subjectTitle: string;
  testMode: TestMode;
  questionCount: number;
  themeId?: string;
  themeTitle?: string;
}

export type LocaleType = 'pt-PT' | 'pt-BR';

export interface UserProfile {
  id: string;
  name: string;
  tagline: string;
  locale: LocaleType;
  level: string;
  points: number;
  completedLessons: number;
  resolvedExercises: number;
  achievements: number;
  streakDays: number;
  lastActiveDate: string;
  settings: {
    theme: 'auto' | 'light' | 'dark';
    textSize: 'normal' | 'large' | 'xlarge';
    ttsEnabled: boolean;
    ttsVoice: string;
    ttsSpeed: number;
  };
}

export interface ExerciseOption {
  id: string;
  text: string;
}

export interface ExerciseItem {
  id: string;
  lessonId: string;
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  svgDiagramType?: 'fraction_circle' | 'fraction_bar' | 'none';
  svgData?: any;
  options: ExerciseOption[];
  correctOptionId: string;
  explanation: string;
}

export interface LessonItem {
  id: string;
  subjectId: string;
  themeNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  content: {
    questionPrompt: string;
    description: string;
    numeratorExplanation: string;
    denominatorExplanation: string;
    exampleText: string;
    dailyLifeContext: string;
  };
  level?: 'basico' | 'intermediario' | 'avancado';
  exercises: ExerciseItem[];
}

export interface ThemeModule {
  id: string;
  number: number;
  title: string;
  description: string;
  level?: 'basico' | 'intermediario' | 'avancado';
  ageGroup?: string;
  isCompleted?: boolean;
  lessons: LessonItem[];
}

export interface SubjectItem {
  id: string;
  title: string;
  color: string;
  icon: string;
  imageSrc?: string;
  activeLessonsCount: string;
  themes: ThemeModule[];
}

export interface OfflinePack {
  id: string;
  title: string;
  size: string;
  subject: string;
  installed: boolean;
}
