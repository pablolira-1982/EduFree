import React, { useState, useEffect } from 'react';
import type { UserProfile, SubjectItem } from '../core/types';
import { getAllFavorites, type FavoriteItem } from '../db/database';

interface Props {
  profile: UserProfile;
  subjects: SubjectItem[];
  onSelectSubject: (subjectId: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenSettings: () => void;
  onOpenActivities?: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  profile,
  subjects,
  onSelectSubject,
  onOpenLesson,
  onOpenSettings,
  onOpenActivities
}) => {
  const [levelFilter, setLevelFilter] = useState<'todos' | 'basico' | 'intermediario' | 'avancado'>('todos');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const loadFavs = () => {
      getAllFavorites().then(setFavorites);
    };
    loadFavs();
    window.addEventListener('edufree_favorites_changed', loadFavs);
    return () => window.removeEventListener('edufree_favorites_changed', loadFavs);
  }, []);

  // Filtrar disciplinas ou módulos por nível pedagógico
  const filteredSubjects = subjects.filter((sub) => {
    if (levelFilter === 'todos') return true;
    if (levelFilter === 'basico') {
      return ['matematica', 'portugues', 'ciencias', 'historia', 'geografia', 'ingles'].includes(sub.id);
    }
    if (levelFilter === 'intermediario') {
      return ['matematica', 'portugues', 'ciencias', 'historia', 'geografia', 'ingles', 'fisica', 'quimica'].includes(sub.id);
    }
    if (levelFilter === 'avancado') {
      return ['matematica', 'fisica', 'quimica', 'biologia', 'ingles'].includes(sub.id);
    }
    return true;
  });

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      paddingBottom: '88px',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Header com Saudação e Perfil */}
      <div style={{
        padding: '20px 20px 14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#1E88E5',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '19px',
            boxShadow: '0 4px 14px rgba(30, 136, 229, 0.35)',
            border: '2px solid #FFFFFF'
          }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1F2937' }}>
              Olá, {profile.name}!
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#1E88E5',
                backgroundColor: '#EFF6FF',
                padding: '3px 8px',
                borderRadius: '8px',
                border: '1px solid #BFDBFE'
              }}>
                🎓 Nível: {profile.level || 'Intermédio'} (10-14 anos)
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#D97706',
                backgroundColor: '#FEF3C7',
                padding: '3px 8px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid #FDE68A'
              }}>
                <img
                  src="/assets/conquista_fogo.png"
                  alt="Streak"
                  style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                />
                {profile.streakDays} dias seguidos
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
          title="Definições"
        >
          ⚙️
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
        {/* Banner Motivacional Oficial banner_inicio.png */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(23, 105, 244, 0.18)',
          border: '1px solid #E2E8F0',
          cursor: 'pointer'
        }}>
          <img
            src="/assets/banner_inicio.png"
            alt="Pequenos passos, grandes conquistas!"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Card Destaque: Continuar a aprender (Matemática - Módulo 1) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1F2937' }}>
              Continuar a aprender
            </h4>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#00C48C',
              backgroundColor: '#00C48C18',
              border: '1px solid #00C48C35',
              padding: '3px 10px',
              borderRadius: '10px'
            }}>
              🟢 Nível Básico (10-12 anos)
            </span>
          </div>

          <div
            onClick={() => {
              onSelectSubject('matematica');
              onOpenLesson('num_op_intro');
            }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              border: '2px solid #00C48C40',
              boxShadow: '0 6px 20px rgba(0, 196, 140, 0.1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              backgroundColor: '#00C48C18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid #00C48C30'
            }}>
              <img
                src="/assets/disciplina_matematica.png"
                alt="Matemática 3D"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>
                  Matemática — Módulo 1
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#00C48C',
                  backgroundColor: '#00C48C20',
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}>
                  🔓 ATIVO
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#4B5563', fontWeight: 600, marginBottom: '8px', lineHeight: 1.4 }}>
                1. Números e operações (Soma, Subtração, Multiplicação e Divisão)
              </div>

              {/* Barra de progresso */}
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#E2E8F0',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '35%',
                  height: '100%',
                  backgroundColor: '#00C48C',
                  borderRadius: '9999px'
                }} />
              </div>
            </div>

            <span style={{
              backgroundColor: '#00C48C',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 800,
              flexShrink: 0
            }}>
              ›
            </span>
          </div>
        </div>

        {/* Seção Meus Favoritos */}
        {favorites.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1F2937' }}>
                  Aulas Favoritas
                </h4>
                <span style={{ fontSize: '16px' }}>❤️</span>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#EF4444',
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                {favorites.length} {favorites.length === 1 ? 'salva' : 'salvas'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '6px',
              scrollbarWidth: 'none'
            }}>
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => {
                    if (fav.subjectId) onSelectSubject(fav.subjectId);
                    onOpenLesson(fav.id);
                  }}
                  style={{
                    minWidth: '220px',
                    maxWidth: '240px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '14px',
                    border: '1.5px solid #FEE2E2',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexShrink: 0,
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: fav.subjectColor || '#EF4444',
                        backgroundColor: `${fav.subjectColor || '#EF4444'}18`,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                      }}>
                        {fav.subjectTitle || 'Aula'}
                      </span>
                      <span style={{ fontSize: '13px' }}>❤️</span>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1F2937',
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {fav.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                      {fav.subtitle || 'Estudar agora'}
                    </span>
                    <span style={{
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800
                    }}>
                      ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Destaque: Atividades & Testes Separadas por Disciplinas */}
        {onOpenActivities && (
          <div
            onClick={onOpenActivities}
            style={{
              background: 'linear-gradient(135deg, #0B3D91 0%, #1E88E5 100%)',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(11, 61, 145, 0.25)',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img
                  src="/assets/conquista_mestre_contas.png"
                  alt="Atividades"
                  style={{ width: '34px', height: '34px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>
                  Atividades & Testes Práticos
                </h4>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#E0F2FE' }}>
                  Simulados e testes rápidos separados por disciplina
                </p>
              </div>
            </div>

            <span style={{
              backgroundColor: '#FFFFFF',
              color: '#0B3D91',
              fontWeight: 800,
              fontSize: '12px',
              padding: '8px 14px',
              borderRadius: '12px',
              whiteSpace: 'nowrap'
            }}>
              Abrir ›
            </span>
          </div>
        )}

        {/* Seção das 9 Disciplinas com Ícones 3D Oficiais e Filtro por Nível */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#1F2937' }}>
              Disciplinas ({filteredSubjects.length})
            </h4>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              Ícones 3D Oficiais
            </span>
          </div>

          {/* Filtro de Níveis Obrigatório */}
          <div style={{
            backgroundColor: '#E2E8F0',
            borderRadius: '14px',
            padding: '4px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '4px',
            marginBottom: '14px'
          }}>
            <button
              onClick={() => setLevelFilter('todos')}
              style={{
                padding: '8px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: levelFilter === 'todos' ? '#1E88E5' : 'transparent',
                color: levelFilter === 'todos' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Todas (9)
            </button>
            <button
              onClick={() => setLevelFilter('basico')}
              style={{
                padding: '8px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: levelFilter === 'basico' ? '#00C48C' : 'transparent',
                color: levelFilter === 'basico' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              10-12a
            </button>
            <button
              onClick={() => setLevelFilter('intermediario')}
              style={{
                padding: '8px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: levelFilter === 'intermediario' ? '#1E88E5' : 'transparent',
                color: levelFilter === 'intermediario' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              13-14a
            </button>
            <button
              onClick={() => setLevelFilter('avancado')}
              style={{
                padding: '8px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: levelFilter === 'avancado' ? '#8B5CF6' : 'transparent',
                color: levelFilter === 'avancado' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              15-17a
            </button>
          </div>

          {/* Grade com Todas as 9 Disciplinas com Ícones 3D */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            {filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '16px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 14px rgba(11, 61, 145, 0.05)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: `${sub.color}14`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${sub.color}30`
                }}>
                  {sub.imageSrc ? (
                    <img
                      src={sub.imageSrc}
                      alt={sub.title}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '30px' }}>{sub.icon}</span>
                  )}
                </div>

                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', textAlign: 'center' }}>
                  {sub.title}
                </span>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: sub.color,
                  backgroundColor: `${sub.color}15`,
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}>
                  {sub.themes?.length || 0} módulos
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
