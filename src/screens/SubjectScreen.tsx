import React, { useState, useEffect } from 'react';
import type { SubjectItem, TestMode } from '../core/types';
import { sound } from '../engine/sound-engine';
import { toggleFavorite, getAllFavorites } from '../db/database';

interface Props {
  subject: SubjectItem;
  allSubjects?: SubjectItem[];
  onSelectOtherSubject?: (subjectId: string) => void;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
  onStartTestSession?: (subjectId: string, testMode: TestMode, count: number, themeId?: string) => void;
}

export const SubjectScreen: React.FC<Props> = ({
  subject,
  allSubjects,
  onSelectOtherSubject,
  onBack,
  onOpenLesson,
  onStartTestSession
}) => {
  const [levelTab, setLevelTab] = useState<'todos' | 'basico' | 'intermediario' | 'avancado'>('todos');
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

  const filteredThemes = subject.themes
    .filter((theme) => {
      if (levelTab === 'todos') return true;
      if (levelTab === 'basico') return theme.level === 'basico';
      if (levelTab === 'intermediario') return theme.level === 'intermediario';
      if (levelTab === 'avancado') return theme.level === 'avancado';
      return true;
    })
    .sort((a, b) => a.number - b.number);

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '40px',
      boxSizing: 'border-box'
    }}>
      {/* Top Header com Ícone 3D Oficial da Disciplina */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#1F2937',
              cursor: 'pointer',
              padding: '4px 8px',
              fontWeight: 700
            }}
            title="Voltar"
          >
            ‹
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: `${subject.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: `1px solid ${subject.color}35`
            }}>
              {subject.imageSrc ? (
                <img
                  src={subject.imageSrc}
                  alt={subject.title}
                  style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: '24px' }}>{subject.icon}</span>
              )}
            </div>

            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                {subject.title}
              </h2>
              <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                {subject.themes.length} módulos estruturados
              </span>
            </div>
          </div>
        </div>

        <div style={{
          padding: '6px 12px',
          borderRadius: '12px',
          backgroundColor: `${subject.color}18`,
          color: subject.color,
          fontSize: '12px',
          fontWeight: 800
        }}>
          {subject.activeLessonsCount}
        </div>
      </div>

      {/* Barra de Troca Rápida Entre Disciplinas com Ícones 3D Oficiais */}
      {allSubjects && allSubjects.length > 0 && onSelectOtherSubject && (
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '10px 16px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {allSubjects.map((s) => {
            const isCurrent = s.id === subject.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectOtherSubject(s.id)}
                style={{
                  backgroundColor: isCurrent ? s.color : '#F8FAFC',
                  color: isCurrent ? '#FFFFFF' : '#475569',
                  border: isCurrent ? `1.5px solid ${s.color}` : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'all 0.15s ease'
                }}
              >
                {s.imageSrc ? (
                  <img
                    src={s.imageSrc}
                    alt={s.title}
                    style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                  />
                ) : (
                  <span>{s.icon}</span>
                )}
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Tabs de Níveis Pedagógicos por Faixa Etária */}
      <div style={{ padding: '14px 20px 6px 20px' }}>
        <div style={{
          backgroundColor: '#E2E8F0',
          borderRadius: '14px',
          padding: '4px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px'
        }}>
          <button
            onClick={() => setLevelTab('todos')}
            style={{
              padding: '8px 2px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: levelTab === 'todos' ? '#1E88E5' : 'transparent',
              color: levelTab === 'todos' ? '#FFFFFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Todos
          </button>
          <button
            onClick={() => setLevelTab('basico')}
            style={{
              padding: '8px 2px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: levelTab === 'basico' ? '#00C48C' : 'transparent',
              color: levelTab === 'basico' ? '#FFFFFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            10-12a
          </button>
          <button
            onClick={() => setLevelTab('intermediario')}
            style={{
              padding: '8px 2px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: levelTab === 'intermediario' ? '#1E88E5' : 'transparent',
              color: levelTab === 'intermediario' ? '#FFFFFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            13-14a
          </button>
          <button
            onClick={() => setLevelTab('avancado')}
            style={{
              padding: '8px 2px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: levelTab === 'avancado' ? '#8B5CF6' : 'transparent',
              color: levelTab === 'avancado' ? '#FFFFFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            15-17a
          </button>
        </div>
      </div>

      {/* Ações Rápidas de Teste da Disciplina */}
      {onStartTestSession && (
        <div style={{ padding: '8px 20px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onStartTestSession(subject.id, 'rapido', 10)}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              border: `1.5px solid ${subject.color}40`,
              borderRadius: '14px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#1F2937',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
          >
            <span>⚡</span>
            <span>Teste Rápido (10q)</span>
          </button>

          <button
            onClick={() => onStartTestSession(subject.id, 'simulado', 20)}
            style={{
              flex: 1,
              backgroundColor: `${subject.color}15`,
              border: `1.5px solid ${subject.color}60`,
              borderRadius: '14px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: subject.color,
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            <span>📝</span>
            <span>Simulado (20q)</span>
          </button>
        </div>
      )}

      {/* Lista de Módulos / Temas Numerados com Ordem Pedagógica Rigorosa */}
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredThemes.map((theme) => {
          const levelLabel = theme.level === 'avancado' 
            ? '🟣 Avançado (15-17 anos)' 
            : theme.level === 'intermediario' 
            ? '🔵 Intermédio (13-14 anos)' 
            : '🟢 Básico (10-12 anos)';
          const levelColor = theme.level === 'avancado' ? '#8B5CF6' : theme.level === 'intermediario' ? '#1E88E5' : '#00C48C';
          const hasLesson = theme.lessons.length > 0;
          const lessonId = hasLesson ? theme.lessons[0].id : '';

          return (
            <div
              key={theme.id}
              onClick={() => {
                if (hasLesson) {
                  onOpenLesson(lessonId);
                }
              }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 4px 14px rgba(11, 61, 145, 0.06)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                {/* Ícone 3D Oficial da Disciplina */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: `${subject.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${subject.color}35`
                }}>
                  {subject.imageSrc ? (
                    <img
                      src={subject.imageSrc}
                      alt={subject.title}
                      style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '26px' }}>{subject.icon}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: subject.color,
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {theme.number}
                    </span>

                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1F2937', flex: 1 }}>
                      {theme.title}
                    </h4>

                    {hasLesson && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          sound.playPop();
                          const isFav = favoriteIds.has(lessonId);
                          await toggleFavorite({
                            id: lessonId,
                            type: 'lesson',
                            title: theme.title,
                            subtitle: `Módulo ${theme.number}`,
                            subjectId: subject.id,
                            subjectTitle: subject.title,
                            subjectColor: subject.color,
                            themeNumber: theme.number
                          });
                          setFavoriteIds(prev => {
                            const next = new Set(prev);
                            if (isFav) next.delete(lessonId);
                            else next.add(lessonId);
                            return next;
                          });
                        }}
                        style={{
                          background: favoriteIds.has(lessonId) ? '#FEE2E2' : '#F1F5F9',
                          border: favoriteIds.has(lessonId) ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: '15px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        title={favoriteIds.has(lessonId) ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                      >
                        {favoriteIds.has(lessonId) ? '❤️' : '🤍'}
                      </button>
                    )}
                  </div>

                  {/* Badges de Nível e Desbloqueado */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: levelColor,
                      backgroundColor: `${levelColor}15`,
                      border: `1px solid ${levelColor}35`,
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      {levelLabel}
                    </span>

                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#00C48C',
                      backgroundColor: '#00C48C18',
                      border: '1px solid #00C48C35',
                      padding: '2px 6px',
                      borderRadius: '8px'
                    }}>
                      🔓 100% Desbloqueado • Ativo
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.45 }}>
                    {theme.description}
                  </p>
                </div>
              </div>

              {/* Botões de Ação Imediata */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '10px',
                  borderTop: '1px solid #F1F5F9'
                }}
              >
                <button
                  onClick={() => {
                    if (hasLesson) {
                      onOpenLesson(lessonId);
                    }
                  }}
                  style={{
                    flex: 1.2,
                    backgroundColor: '#1E88E5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '11px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(30, 136, 229, 0.25)'
                  }}
                >
                  <span>📖</span>
                  <span>Estudar Aula</span>
                </button>

                {onStartTestSession && (
                  <button
                    onClick={() => {
                      onStartTestSession(subject.id, 'modulo', 15, theme.id);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#EFF6FF',
                      color: '#1E88E5',
                      border: '1.5px solid #BFDBFE',
                      borderRadius: '12px',
                      padding: '11px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>⚡</span>
                    <span>Testes (60q)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
