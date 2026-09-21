import React, { useState, useEffect } from 'react';
import type { ScreenType, UserProfile, TestMode, ExerciseItem } from './core/types';
import { initDatabase, DEFAULT_USER_PROFILE, db } from './db/database';
import { SUBJECTS_DATA } from './data/curriculum';
import { expandTo60Questions, createDisciplineTestSession } from './data/exercise-bank-builder';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ActivitiesScreen } from './screens/ActivitiesScreen';
import { SubjectScreen } from './screens/SubjectScreen';
import { LessonScreen } from './screens/LessonScreen';
import { ExerciseScreen } from './screens/ExerciseScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { OfflinePacksScreen } from './screens/OfflinePacksScreen';
import { TutorScreen } from './screens/TutorScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { BottomNav } from './components/layout/BottomNav';

import { sound } from './engine/sound-engine';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [activeSubjectId, setActiveSubjectId] = useState<string>('matematica');
  const [activeLessonId, setActiveLessonId] = useState<string>('num_op_intro');
  const [isExerciseCorrect, setIsExerciseCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sessão personalizada de exercícios / simulados por disciplina
  const [customTestQuestions, setCustomTestQuestions] = useState<ExerciseItem[] | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  useEffect(() => {
    initDatabase().then((loadedProfile) => {
      setProfile(loadedProfile);
      setIsLoading(false);
      if (loadedProfile && loadedProfile.name) {
        setCurrentScreen('home');
      }
    });

    // Notifica e solicita permissão de áudio na hora ao iniciar o app
    sound.requestAudioPermission();

    // Desbloqueia AudioContext no primeiro toque/clique em mobile
    const handleFirstGesture = () => {
      sound.unlockAudio();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const handleUpdateProfile = async (updated: UserProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('edufree_user_name', updated.name);
    } catch (e) {
      console.warn(e);
    }
    await db.profiles.put(updated);
  };

  const handleOnboardingComplete = async (name: string, locale: 'pt-PT' | 'pt-BR') => {
    const updated: UserProfile = {
      ...profile,
      name,
      locale
    };
    await handleUpdateProfile(updated);
    setCurrentScreen('home');
  };

  const activeSubject = SUBJECTS_DATA.find(s => s.id === activeSubjectId) || SUBJECTS_DATA[0];
  const rawLesson = activeSubject.themes.flatMap(t => t.lessons).find(l => l.id === activeLessonId) 
    || activeSubject.themes[0]?.lessons[0];

  // Expansão dinâmica garantindo 60 questões pedagógicas por tema sem misturar assuntos
  const activeLesson = rawLesson ? {
    ...rawLesson,
    exercises: expandTo60Questions(rawLesson.exercises, rawLesson.id, activeSubject.id)
  } : undefined;

  // Lista ativa de exercícios (seja sessão de simulado/atividade por disciplina ou lição direta)
  const activeExercises: ExerciseItem[] = customTestQuestions && customTestQuestions.length > 0
    ? customTestQuestions
    : (activeLesson ? activeLesson.exercises : []);

  const currentExercise = activeExercises[currentExerciseIndex] || activeExercises[0];

  const handleStartTestSession = (subjectId: string, testMode: TestMode, count: number, themeId?: string) => {
    setActiveSubjectId(subjectId);
    const questions = createDisciplineTestSession(subjectId, testMode, count, themeId);
    setCustomTestQuestions(questions);
    setCurrentExerciseIndex(0);
    setCurrentScreen('exercise');
  };

  const handleVerifyExercise = async (selectedOptionId: string) => {
    const correct = currentExercise ? selectedOptionId === currentExercise.correctOptionId : true;
    setIsExerciseCorrect(correct);

    if (correct) {
      const updatedProfile = {
        ...profile,
        points: profile.points + 25,
        resolvedExercises: profile.resolvedExercises + 1,
        completedLessons: currentExerciseIndex + 1 === activeExercises.length ? profile.completedLessons + 1 : profile.completedLessons
      };
      await handleUpdateProfile(updatedProfile);
    }

    setCurrentScreen('feedback');
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex + 1 < activeExercises.length) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentScreen('exercise');
    } else {
      setCurrentExerciseIndex(0);
      setCustomTestQuestions(null);
      setCurrentScreen('completion');
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#00183c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/assets/Logo_EduFree.png" alt="EduFree" style={{ width: '80px', height: '80px' }} />
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#94A3B8' }}>A carregar EduFree...</p>
        </div>
      </div>
    );
  }

  // Telas que exibem a BottomNav
  const showBottomNav = ['home', 'activities', 'packs', 'progress', 'profile'].includes(currentScreen);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: 'var(--font-family)',
      position: 'relative'
    }}>
      {/* Roteamento de Telas */}
      {currentScreen === 'splash' && (
        <SplashScreen onStart={() => setCurrentScreen('onboarding')} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          profile={profile}
          subjects={SUBJECTS_DATA}
          onSelectSubject={(subId) => {
            setActiveSubjectId(subId);
            setCustomTestQuestions(null);
            setCurrentScreen('subject');
          }}
          onOpenLesson={(lessonId) => {
            setActiveLessonId(lessonId);
            setCustomTestQuestions(null);
            setCurrentScreen('lesson');
          }}
          onOpenSettings={() => setCurrentScreen('settings')}
          onOpenActivities={() => setCurrentScreen('activities')}
        />
      )}

      {currentScreen === 'activities' && (
        <ActivitiesScreen
          subjects={SUBJECTS_DATA}
          onStartTestSession={handleStartTestSession}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'subject' && (
        <SubjectScreen
          subject={activeSubject}
          allSubjects={SUBJECTS_DATA}
          onSelectOtherSubject={(id) => setActiveSubjectId(id)}
          onBack={() => setCurrentScreen('home')}
          onOpenLesson={(lessonId) => {
            setActiveLessonId(lessonId);
            setCustomTestQuestions(null);
            setCurrentScreen('lesson');
          }}
          onStartTestSession={handleStartTestSession}
        />
      )}

      {currentScreen === 'lesson' && activeLesson && (
        <LessonScreen
          lesson={activeLesson}
          onBack={() => setCurrentScreen('subject')}
          onStartExercises={() => {
            setCustomTestQuestions(null);
            setCurrentExerciseIndex(0);
            setCurrentScreen('exercise');
          }}
        />
      )}

      {currentScreen === 'exercise' && currentExercise && (
        <ExerciseScreen
          key={currentExercise.id}
          exercise={currentExercise}
          onBack={() => {
            if (customTestQuestions) {
              setCustomTestQuestions(null);
              setCurrentScreen('activities');
            } else {
              setCurrentScreen('lesson');
            }
          }}
          onVerify={handleVerifyExercise}
        />
      )}

      {currentScreen === 'feedback' && (
        <FeedbackScreen
          isCorrect={isExerciseCorrect}
          explanation={currentExercise?.explanation || 'Excelente dedicação! Continua a praticar!'}
          streakDays={profile.streakDays}
          onNext={handleNextExercise}
        />
      )}

      {currentScreen === 'completion' && (
        <CompletionScreen onReturnHome={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'progress' && (
        <ProgressScreen
          profile={profile}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          profile={profile}
          onOpenOfflinePacks={() => setCurrentScreen('packs')}
          onOpenSettings={() => setCurrentScreen('settings')}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {currentScreen === 'packs' && (
        <OfflinePacksScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'tutor' && (
        <TutorScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          profile={profile}
          onBack={() => setCurrentScreen('home')}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* Botão de Acesso Rápido ao Tutor Flutuante no Home */}
      {currentScreen === 'home' && (
        <button
          onClick={() => setCurrentScreen('tutor')}
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '84px',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#00183c',
            border: '2px solid #36C5F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(0, 24, 60, 0.4)',
            cursor: 'pointer',
            zIndex: 90,
            transition: 'transform 0.2s ease'
          }}
          title="Tutor de IA (Offline)"
        >
          <img src="/assets/Robo_EduFree.png" alt="Tutor" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
        </button>
      )}

      {/* Barra de Navegação Inferior para Telas Principais */}
      {showBottomNav && (
        <BottomNav
          activeScreen={currentScreen}
          onNavigate={(screen) => {
            setCustomTestQuestions(null);
            setCurrentScreen(screen);
          }}
        />
      )}
    </div>
  );
};

export default App;
