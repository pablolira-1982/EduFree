import React, { useState, useEffect } from 'react';
import type { SubjectItem, TestMode } from '../core/types';
import { tts } from '../engine/tts-engine';
import { getAllFavorites } from '../db/database';

interface Props {
  subjects: SubjectItem[];
  onStartTestSession: (subjectId: string, testMode: TestMode, count: number, themeId?: string) => void;
  onBack: () => void;
}

export const ActivitiesScreen: React.FC<Props> = ({
  subjects,
  onStartTestSession,
  onBack
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'matematica');
  const [selectedLevel, setSelectedLevel] = useState<'todos' | 'basico' | 'intermediario' | 'avancado' | 'favoritos'>('todos');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadFavs = () => {
      getAllFavorites().then(favs => {
        setFavoriteIds(new Set(favs.map(f => f.id)));
      });
    };
    loadFavs();
    window.addEventListener('edufree_favorites_changed', loadFavs);
    return () => window.removeEventListener('edufree_favorites_changed', loadFavs);
  }, []);

  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const handlePlayDisciplineAudio = () => {
    if (isPlayingAudio) {
      tts.stop();
      setIsPlayingAudio(false);
    } else {
      const text = `Atividades e testes de ${activeSubject.title}. Níveis básico, intermédio e avançado. Escolha entre Teste Rápido de dez questões, Simulado de vinte questões ou a Maratona Completa. Vamos aprender juntos!`;
      setIsPlayingAudio(true);
      tts.speak(text, 'pt-BR', () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const filteredThemes = activeSubject.themes.filter((theme) => {
    if (selectedLevel === 'favoritos') {
      return theme.lessons.some(l => favoriteIds.has(l.id)) || favoriteIds.has(`${activeSubject.id}_t${theme.number}`);
    }
    if (selectedLevel === 'todos') return true;
    return theme.level === selectedLevel;
  });

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '96px',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
              Atividades & Testes
            </h2>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Separadas por disciplinas e níveis
            </span>
          </div>
        </div>

        {/* Botão de voz natural */}
        <button
          onClick={handlePlayDisciplineAudio}
          style={{
            background: isPlayingAudio ? '#1769F4' : '#F1F5F9',
            color: isPlayingAudio ? '#FFFFFF' : '#1769F4',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Ouvir com voz humana Edge TTS"
        >
          <span>{isPlayingAudio ? '⏹️' : '🔊'}</span>
          <span>{isPlayingAudio ? 'Parar' : 'Ouvir'}</span>
        </button>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Carrossel Horizontal de Disciplinas com Ícones 3D */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
              Disciplinas (Ícones Oficiais):
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              {subjects.length} matérias
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}>
            {subjects.map((sub) => {
              const isSelected = sub.id === selectedSubjectId;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    tts.stop();
                    setIsPlayingAudio(false);
                    setSelectedSubjectId(sub.id);
                  }}
                  style={{
                    backgroundColor: isSelected ? sub.color : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#1F2937',
                    border: isSelected ? `2px solid ${sub.color}` : '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? `0 4px 12px ${sub.color}40` : '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  {sub.imageSrc ? (
                    <img
                      src={sub.imageSrc}
                      alt={sub.title}
                      style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '18px' }}>{sub.icon}</span>
                  )}
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>
                    {sub.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro de Níveis Pedagógicos Obrigatório */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
              Filtrar por Faixa Etária e Nível:
            </span>
          </div>

          <div style={{
            backgroundColor: '#F1F5F9',
            borderRadius: '14px',
            padding: '4px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '3px'
          }}>
            <button
              onClick={() => setSelectedLevel('todos')}
              style={{
                padding: '8px 2px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedLevel === 'todos' ? '#1769F4' : 'transparent',
                color: selectedLevel === 'todos' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedLevel('basico')}
              style={{
                padding: '8px 2px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedLevel === 'basico' ? '#00C48C' : 'transparent',
                color: selectedLevel === 'basico' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              10-12a
            </button>
            <button
              onClick={() => setSelectedLevel('intermediario')}
              style={{
                padding: '8px 2px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedLevel === 'intermediario' ? '#1E88E5' : 'transparent',
                color: selectedLevel === 'intermediario' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              13-14a
            </button>
            <button
              onClick={() => setSelectedLevel('avancado')}
              style={{
                padding: '8px 2px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedLevel === 'avancado' ? '#8B5CF6' : 'transparent',
                color: selectedLevel === 'avancado' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              15-17a
            </button>
            <button
              onClick={() => setSelectedLevel('favoritos')}
              style={{
                padding: '8px 2px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedLevel === 'favoritos' ? '#EF4444' : 'transparent',
                color: selectedLevel === 'favoritos' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              ❤️ Favs
            </button>
          </div>
        </div>

        {/* Card Destaque da Matéria Selecionada com Imagem 3D */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '20px',
          border: `1.5px solid ${activeSubject.color}35`,
          boxShadow: `0 8px 24px ${activeSubject.color}15`,
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: `${activeSubject.color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {activeSubject.imageSrc ? (
              <img
                src={activeSubject.imageSrc}
                alt={activeSubject.title}
                style={{ width: '52px', height: '52px', objectFit: 'contain' }}
              />
            ) : (
              <span style={{ fontSize: '32px' }}>{activeSubject.icon}</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>
                {activeSubject.title}
              </h3>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: activeSubject.color,
                backgroundColor: `${activeSubject.color}18`,
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                Disponível
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
              Testes adaptados com voz neural, gabarito instantâneo e resolução comentada.
            </p>
          </div>
        </div>

        {/* Modos de Testes */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
            Modalidades de Teste ({activeSubject.title})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 1. Teste Rápido */}
            <div
              onClick={() => onStartTestSession(activeSubject.id, 'rapido', 10)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: '#00C48C18',
                  color: '#00C48C',
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  ⚡
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
                      Teste Rápido de Fixação
                    </h5>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#00C48C', backgroundColor: '#00C48C15', padding: '2px 6px', borderRadius: '6px' }}>
                      Nível Básico
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    10 Questões • 5 a 8 min • Ideal para praticar todo dia
                  </span>
                </div>
              </div>
              <button style={{
                backgroundColor: '#00C48C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                Começar
              </button>
            </div>

            {/* 2. Simulado Avaliativo */}
            <div
              onClick={() => onStartTestSession(activeSubject.id, 'simulado', 20)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: '#1E88E518',
                  color: '#1E88E5',
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  📝
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
                      Simulado Avaliativo Geral
                    </h5>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#1E88E5', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '6px' }}>
                      Nível Intermédio
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    20 Questões • Avaliação completa com nota e feedback
                  </span>
                </div>
              </div>
              <button style={{
                backgroundColor: '#1E88E5',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                Começar
              </button>
            </div>

            {/* 3. Maratona de Domínio */}
            <div
              onClick={() => onStartTestSession(activeSubject.id, 'maratona', 50)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: '#FFC10718',
                  color: '#D97706',
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  🏆
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
                      Maratona Completa (50 Testes)
                    </h5>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#8B5CF6', backgroundColor: '#F5F3FF', padding: '2px 6px', borderRadius: '6px' }}>
                      Nível Avançado
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    50 Questões • Para atingir maestria e pontuação máxima
                  </span>
                </div>
              </div>
              <button style={{
                backgroundColor: '#FFC107',
                color: '#1F2937',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                Começar
              </button>
            </div>
          </div>
        </div>

        {/* Atividades por Módulo Específico */}
        {filteredThemes && filteredThemes.length > 0 && (
          <div>
            <h4 style={{ margin: '8px 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
              Módulos e Atividades de {activeSubject.title}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredThemes.map((theme) => {
                const levelColor = theme.level === 'avancado' ? '#8B5CF6' : theme.level === 'intermediario' ? '#1E88E5' : '#00C48C';
                const levelText = theme.level === 'avancado' ? 'Avançado (15-17a)' : theme.level === 'intermediario' ? 'Intermédio (13-14a)' : 'Básico (10-12a)';

                return (
                  <div
                    key={theme.id}
                    onClick={() => onStartTestSession(activeSubject.id, 'modulo', 15, theme.id)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '12px',
                        backgroundColor: `${activeSubject.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {activeSubject.imageSrc ? (
                          <img src={activeSubject.imageSrc} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '16px' }}>{activeSubject.icon}</span>
                        )}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h6 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
                            {theme.title}
                          </h6>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: levelColor,
                            backgroundColor: `${levelColor}15`,
                            padding: '1px 6px',
                            borderRadius: '6px'
                          }}>
                            {levelText}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {theme.description.slice(0, 50)}...
                        </span>
                      </div>
                    </div>

                    <span style={{ fontSize: '16px', color: activeSubject.color, fontWeight: 700 }}>
                      ›
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
