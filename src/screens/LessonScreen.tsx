import React, { useState, useEffect } from 'react';
import type { LessonItem } from '../core/types';
import { tts } from '../engine/tts-engine';
import { sound } from '../engine/sound-engine';
import { isFavorite, toggleFavorite } from '../db/database';

interface Props {
  lesson: LessonItem;
  onBack: () => void;
  onStartExercises: () => void;
}

export const LessonScreen: React.FC<Props> = ({ lesson, onBack, onStartExercises }) => {
  const [activeTab, setActiveTab] = useState<'aula' | 'exercicios' | 'resumo'>('aula');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    isFavorite(lesson.id).then(setFavorited);
  }, [lesson.id]);

  const handleToggleFavorite = async () => {
    sound.playPop();
    const newState = await toggleFavorite({
      id: lesson.id,
      type: 'lesson',
      title: lesson.title,
      subtitle: lesson.subtitle,
      subjectId: lesson.subjectId,
      subjectTitle: lesson.subjectId.charAt(0).toUpperCase() + lesson.subjectId.slice(1),
      subjectColor: '#1769F4',
      themeNumber: lesson.themeNumber
    });
    setFavorited(newState);
    setToastMessage(newState ? '❤️ Salvo nos Favoritos!' : 'Removido dos Favoritos');
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleToggleSpeech = () => {
    if (isPlayingAudio) {
      tts.stop();
      setIsPlayingAudio(false);
    } else {
      const isEnglish = lesson.subjectId === 'ingles';
      const speechText = `${lesson.content.questionPrompt}. ${lesson.content.description}. ${lesson.content.numeratorExplanation}. ${lesson.content.denominatorExplanation}. ${lesson.content.exampleText}`;
      setIsPlayingAudio(true);
      tts.speak(speechText, isEnglish ? 'bilingual-en' : 'pt-BR', () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleSpeakWord = (word: string, lang: string = 'en-US') => {
    tts.speak(word, lang);
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '40px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Toast de Feedback */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '9999px',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0'
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
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
            {lesson.title}
          </h2>
        </div>

        <button
          onClick={handleToggleFavorite}
          aria-label={favorited ? 'Remover dos favoritos' : 'Marcar favorito'}
          style={{
            background: favorited ? '#FEE2E2' : '#F1F5F9',
            border: favorited ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '6px 10px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: favorited ? 'scale(1.08)' : 'scale(1)'
          }}
          title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Tabs: Aula, Exercícios, Resumo */}
      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          backgroundColor: '#E2E8F0',
          borderRadius: '14px',
          padding: '4px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveTab('aula')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'aula' ? '#1769F4' : 'transparent',
              color: activeTab === 'aula' ? '#FFFFFF' : '#6B7280',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Aula
          </button>
          <button
            onClick={() => {
              tts.stop();
              onStartExercises();
            }}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'exercicios' ? '#1769F4' : 'transparent',
              color: activeTab === 'exercicios' ? '#FFFFFF' : '#6B7280',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Exercícios
          </button>
          <button
            onClick={() => setActiveTab('resumo')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'resumo' ? '#1769F4' : 'transparent',
              color: activeTab === 'resumo' ? '#FFFFFF' : '#6B7280',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Resumo
          </button>
        </div>
      </div>

      {/* Conteúdo Pedagógico da Aula */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 20px',
          boxShadow: '0 4px 16px rgba(11, 61, 145, 0.05)',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700, color: '#1F2937' }}>
            {lesson.content.questionPrompt}
          </h3>

          <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: '#4B5563', lineHeight: 1.6 }}>
            {lesson.content.description}
          </p>

          {/* Bloco Visual Específico da Matéria e Tema */}
          {lesson.id.includes('num_op') || lesson.title.toLowerCase().includes('operaç') ? (
            /* Infográfico Didático das 4 Operações Fundamentais */
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '18px',
              padding: '18px',
              border: '1.5px solid #00C48C40',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>📐</span>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#00C48C' }}>
                  As Quatro Operações Fundamentais
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, color: '#1E88E5', fontSize: '13px' }}>➕ Soma (Adição)</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Juntar ou somar quantidades</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937', marginTop: '4px' }}>24 + 16 = 40</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '13px' }}>➖ Subtração</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Diminuir ou achar a diferença</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937', marginTop: '4px' }}>50 - 18 = 32</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, color: '#F59E0B', fontSize: '13px' }}>✖️ Multiplicação</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Soma rápida de parcelas iguais</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937', marginTop: '4px' }}>6 × 7 = 42</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, color: '#10B981', fontSize: '13px' }}>➗ Divisão</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Repartir em partes iguais</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937', marginTop: '4px' }}>48 ÷ 6 = 8</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FEF3C7',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#92400E',
                fontWeight: 700,
                border: '1px solid #FDE68A'
              }}>
                ⚡ Ordem das Contas: Multiplicação (×) e Divisão (÷) calculam-se ANTES de Soma (+) e Subtração (-)! Ex: 15 + 7 × 2 = 15 + 14 = 29.
              </div>
            </div>
          ) : lesson.subjectId === 'matematica' && (lesson.id.includes('frac') || lesson.title.toLowerCase().includes('fração') || lesson.title.toLowerCase().includes('fracoes')) ? (
            /* Diagrama de Fração exclusivo para aulas de Frações */
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: 800,
                fontSize: '32px',
                color: '#1E88E5',
                lineHeight: 1
              }}>
                <span>1</span>
                <div style={{ width: '36px', height: '4px', backgroundColor: '#1E88E5', margin: '4px 0', borderRadius: '2px' }} />
                <span>2</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#4B5563' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#1E88E5', fontWeight: 700 }}>←</span>
                  <span><strong>Numerador</strong><br />(quantas partes temos)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#1E88E5', fontWeight: 700 }}>←</span>
                  <span><strong>Denominador</strong><br />(em quantas partes o todo foi dividido)</span>
                </div>
              </div>
            </div>
          ) : lesson.subjectId === 'ingles' ? (
            /* Card Didático de Pronúncia Interativa em Inglês */
            <div style={{
              backgroundColor: '#FDF2F8',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1.5px solid #F472B6',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px' }}>🇬🇧</span>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#9D174D' }}>
                    Pronúncia Nativa (To Be & Pronomes)
                  </h4>
                </div>
                <span style={{ fontSize: '11px', backgroundColor: '#FCE7F3', color: '#BE185D', padding: '3px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  Toque para ouvir 🔊
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { en: 'To Be', pt: 'Ser / Estar' },
                  { en: 'I am', pt: 'Eu sou/estou' },
                  { en: 'You are', pt: 'Você é/está' },
                  { en: 'He is', pt: 'Ele é/está' },
                  { en: 'She is', pt: 'Ela é/está' },
                  { en: 'We are', pt: 'Nós somos/estamos' },
                  { en: 'They are', pt: 'Eles são/estão' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSpeakWord(item.en, 'en-US')}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #FBCFE8',
                      borderRadius: '10px',
                      padding: '8px 6px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#DB2777' }}>{item.en}</span>
                      <span style={{ fontSize: '11px' }}>🔊</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{item.pt}</span>
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '13px', color: '#831843', lineHeight: 1.5, backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #FCE7F3' }}>
                {lesson.content.numeratorExplanation}
              </div>
              <div style={{ fontSize: '13px', color: '#9D174D', lineHeight: 1.5 }}>
                {lesson.content.denominatorExplanation}
              </div>
            </div>
          ) : (
            /* Infográfico Conceitual Dinâmico e Didático para outras matérias (Ciências, História, etc.) */
            <div style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid #BBF7D0',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>💡</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#166534' }}>
                    Conceito Chave
                  </h4>
                  <span style={{ fontSize: '12px', color: '#15803D' }}>
                    Fundamento indispensável
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#14532D', lineHeight: 1.5, backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #DCFCE7' }}>
                {lesson.content.numeratorExplanation}
              </div>
              <div style={{ fontSize: '13px', color: '#166534', lineHeight: 1.5 }}>
                {lesson.content.denominatorExplanation}
              </div>
            </div>
          )}

          {/* Bloco de Exemplo Prático da Aula */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
              Exemplo Prático:
            </h4>
            <div style={{
              backgroundColor: '#EFF6FF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #DBEAFE',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px'
            }}>
              <span style={{ fontSize: '22px' }}>🎯</span>
              <div style={{ fontSize: '14px', color: '#1E3A8A', lineHeight: 1.5, fontWeight: 500 }}>
                {lesson.content.exampleText}
              </div>
            </div>
          </div>

          {/* Destaque Contexto no Cotidiano */}
          <div style={{
            backgroundColor: '#FEF3C7',
            borderLeft: '4px solid #F59E0B',
            borderRadius: '10px',
            padding: '14px 16px',
            fontSize: '13px',
            color: '#92400E',
            lineHeight: 1.5
          }}>
            <strong>Aplicação Prática:</strong> {lesson.content.dailyLifeContext}
          </div>
        </div>

        {/* Botões de Ação Inferiores: Ouvir (Voz Francisca) e Próximo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '12px', marginTop: '6px' }}>
          <button
            onClick={handleToggleSpeech}
            style={{
              height: '52px',
              borderRadius: '26px',
              border: '2px solid #1E88E5',
              backgroundColor: isPlayingAudio ? '#1E88E5' : '#FFFFFF',
              color: isPlayingAudio ? '#FFFFFF' : '#1E88E5',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(30, 136, 229, 0.15)'
            }}
          >
            <span>{isPlayingAudio ? '⏹️ Parar Voz' : '🔊 Voz Francisca'}</span>
          </button>

          <button
            onClick={() => {
              tts.stop();
              onStartExercises();
            }}
            style={{
              height: '52px',
              borderRadius: '26px',
              border: 'none',
              backgroundColor: '#1E88E5',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 16px rgba(30, 136, 229, 0.3)'
            }}
          >
            Próximo <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
