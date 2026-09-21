import React, { useState, useEffect } from 'react';
import type { ExerciseItem } from '../core/types';
import { sound } from '../engine/sound-engine';
import { tts } from '../engine/tts-engine';
import { isFavorite, toggleFavorite } from '../db/database';

interface Props {
  exercise: ExerciseItem;
  onBack: () => void;
  onVerify: (selectedOptionId: string) => void;
}

export const ExerciseScreen: React.FC<Props> = ({ exercise, onBack, onVerify }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    isFavorite(exercise.lessonId || exercise.id).then(setFavorited);
  }, [exercise.id, exercise.lessonId]);

  const handleToggleFavorite = async () => {
    sound.playPop();
    const favId = exercise.lessonId || exercise.id;
    const newState = await toggleFavorite({
      id: favId,
      type: 'exercise',
      title: exercise.prompt.substring(0, 45) + (exercise.prompt.length > 45 ? '...' : ''),
      subtitle: `Questão ${exercise.questionNumber} de ${exercise.totalQuestions}`,
      subjectId: exercise.lessonId?.split('_')[0] || 'geral',
      subjectTitle: 'Exercício',
      subjectColor: '#1769F4'
    });
    setFavorited(newState);
  };

  const handleToggleSpeech = () => {
    if (isPlayingSpeech) {
      tts.stop();
      setIsPlayingSpeech(false);
    } else {
      const optionsText = exercise.options.map((opt) => `Opção ${opt.id.toUpperCase()}: ${opt.text}`).join('. ');
      const fullText = `Questão ${exercise.questionNumber}. ${exercise.prompt}. ${optionsText}`;
      const isEnglish = exercise.lessonId?.startsWith('ing') || 
                        exercise.prompt.toLowerCase().includes('english') || 
                        exercise.prompt.toLowerCase().includes('verb to be') ||
                        exercise.prompt.toLowerCase().includes('sentence');
      setIsPlayingSpeech(true);
      tts.speak(fullText, isEnglish ? 'bilingual-en' : 'pt-BR', () => {
        setIsPlayingSpeech(false);
      });
    }
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Top Bar com Título e Favorito */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              tts.stop();
              onBack();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#1F2937',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ‹
          </button>
          <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>
            Exercício {exercise.questionNumber}/{exercise.totalQuestions}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Botão de Favorito */}
          <button
            onClick={handleToggleFavorite}
            aria-label={favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            style={{
              background: favorited ? '#FEE2E2' : '#F1F5F9',
              border: favorited ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '6px 10px',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: favorited ? 'scale(1.05)' : 'scale(1)'
            }}
            title={favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          >
            {favorited ? '❤️' : '🤍'}
          </button>

          {/* Botão para ouvir questão com voz humana */}
          <button
            onClick={handleToggleSpeech}
            style={{
              background: isPlayingSpeech ? '#1769F4' : '#F1F5F9',
              color: isPlayingSpeech ? '#FFFFFF' : '#1769F4',
              border: 'none',
              borderRadius: '12px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Ouvir questão com voz natural da Microsoft"
          >
            <span>{isPlayingSpeech ? '⏹️' : '🔊'}</span>
            <span>{isPlayingSpeech ? 'Parar' : 'Ouvir'}</span>
          </button>
        </div>
      </div>

      {/* Barra de Progresso Superior */}
      <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0' }}>
        <div style={{
          width: `${(exercise.questionNumber / exercise.totalQuestions) * 100}%`,
          height: '100%',
          backgroundColor: '#00C48C',
          transition: 'width 0.3s ease'
        }} />
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Enunciado do Exercício */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F2937', lineHeight: 1.4, flex: 1 }}>
            {exercise.prompt}
          </h3>
        </div>

        {/* Ilustração / Diagrama SVG Fiel ao Mockup (Círculo dividido em 4 com 1/4 verde) */}
        {exercise.svgDiagramType === 'fraction_circle' && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(11, 61, 145, 0.04)'
          }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              {/* Base completa */}
              <circle cx="70" cy="70" r="64" fill="#F8FAFC" stroke="#1F2937" strokeWidth="2.5" />
              {/* Divisões em 4 quartos */}
              <line x1="70" y1="6" x2="70" y2="134" stroke="#1F2937" strokeWidth="2.5" />
              <line x1="6" y1="70" x2="134" y2="70" stroke="#1F2937" strokeWidth="2.5" />
              {/* 1 Quarto colorido em Verde Sucesso (#00C48C) */}
              <path d="M 70 70 L 134 70 A 64 64 0 0 1 70 134 Z" fill="#00C48C" />
            </svg>
          </div>
        )}

        {/* Opções de Resposta em Cartões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercise.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => {
                  sound.unlockAudio(); // desbloqueia AudioContext no primeiro toque
                  sound.playPop();
                  setSelectedId(opt.id);
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #00C48C' : '1px solid #E2E8F0',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 196, 140, 0.15)' : '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#00C48C' : '#1F2937'
                }}>
                  {opt.text}
                </span>

                {isSelected && (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#00C48C',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700
                  }}>
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botão Inferior Verificar */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button
            onClick={() => {
              if (selectedId) {
                onVerify(selectedId);
              }
            }}
            disabled={!selectedId}
            style={{
              width: '100%',
              height: '54px',
              borderRadius: '27px',
              border: 'none',
              backgroundColor: selectedId ? '#00C48C' : '#94A3B8',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '16px',
              cursor: selectedId ? 'pointer' : 'not-allowed',
              boxShadow: selectedId ? '0 6px 20px rgba(0, 196, 140, 0.35)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};
