import React, { useState } from 'react';
import type { UserProfile } from '../core/types';
import { SUBJECTS_DATA } from '../data/curriculum';

interface Props {
  profile: UserProfile;
  onBack: () => void;
}

export const ProgressScreen: React.FC<Props> = ({ profile, onBack }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'disciplinas' | 'conquistas'>('geral');

  const achievementsList = [
    {
      id: 'trofeu',
      title: 'Primeiro Passo Rumo ao Futuro',
      desc: 'Completaste o teu primeiro módulo com sucesso.',
      image: '/assets/conquista_trofeu.png',
      unlocked: true,
      date: 'Conquistado'
    },
    {
      id: 'fogo',
      title: 'Chama do Conhecimento',
      desc: `${profile.streakDays} dias seguidos de estudo focado e consistente.`,
      image: '/assets/conquista_fogo.png',
      unlocked: true,
      date: `${profile.streakDays} dias de streak`
    },
    {
      id: 'mestre_contas',
      title: 'Mestre dos Números e Contas',
      desc: 'Dominaste as quatro operações fundamentais em Matemática.',
      image: '/assets/conquista_mestre_contas.png',
      unlocked: true,
      date: 'Nível Básico'
    },
    {
      id: 'cientista',
      title: 'Jovem Cientista Curioso',
      desc: 'Exploraste lições de Ciências Naturais e o método científico.',
      image: '/assets/conquista_cientista.png',
      unlocked: true,
      date: 'Nível Intermédio'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '88px',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
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
        >
          ‹
        </button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
          O meu Progresso e Níveis
        </h2>
      </div>

      {/* Tabs */}
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
            onClick={() => setActiveTab('geral')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'geral' ? '#1E88E5' : 'transparent',
              color: activeTab === 'geral' ? '#FFFFFF' : '#6B7280',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Geral
          </button>
          <button
            onClick={() => setActiveTab('disciplinas')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'disciplinas' ? '#1E88E5' : 'transparent',
              color: activeTab === 'disciplinas' ? '#FFFFFF' : '#6B7280',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Disciplinas (9)
          </button>
          <button
            onClick={() => setActiveTab('conquistas')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'conquistas' ? '#1E88E5' : 'transparent',
              color: activeTab === 'conquistas' ? '#FFFFFF' : '#6B7280',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Conquistas
          </button>
        </div>
      </div>

      {/* CONTEÚDO: TAB GERAL */}
      {activeTab === 'geral' && (
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Gráfico Circular de Progresso Fiel ao Mockup */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(11, 61, 145, 0.05)'
          }}>
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="14"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke="#00C48C"
                  strokeWidth="14"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * 0.65)}
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#1F2937', lineHeight: 1 }}>
                  65%
                </span>
                <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>
                  Progresso geral
                </span>
              </div>
            </div>

            <span style={{
              marginTop: '12px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E88E5',
              backgroundColor: '#EFF6FF',
              padding: '4px 12px',
              borderRadius: '10px',
              border: '1px solid #BFDBFE'
            }}>
              Nível Atual: {profile.level || 'Intermédio'} (10-14 anos)
            </span>
          </div>

          {/* 4 Cards de Estatísticas com Ícones Oficiais 3D */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <img
                src="/assets/conquista_mestre_contas.png"
                alt="Aulas Concluídas"
                style={{ width: '44px', height: '44px', objectFit: 'contain', marginBottom: '6px' }}
              />
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1F2937' }}>
                {profile.completedLessons}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                Aulas concluídas
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <img
                src="/assets/conquista_cientista.png"
                alt="Exercícios Resolvidos"
                style={{ width: '44px', height: '44px', objectFit: 'contain', marginBottom: '6px' }}
              />
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1F2937' }}>
                {profile.resolvedExercises}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                Exercícios resolvidos
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <img
                src="/assets/conquista_trofeu.png"
                alt="Troféu"
                style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '6px' }}
              />
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1F2937' }}>
                {profile.achievements}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                Conquistas 3D
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <img
                src="/assets/conquista_fogo.png"
                alt="Fogo"
                style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '6px' }}
              />
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1F2937' }}>
                {profile.streakDays}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                Dias seguidos
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO: TAB DISCIPLINAS (TODAS AS 9 EM 3D COM NÍVEIS) */}
      {activeTab === 'disciplinas' && (
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SUBJECTS_DATA.map((sub, index) => {
            const pct = Math.min(100, Math.round(((index + 2) * 11) % 85 + 15));
            return (
              <div
                key={sub.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: `${sub.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${sub.color}35`
                }}>
                  {sub.imageSrc ? (
                    <img
                      src={sub.imageSrc}
                      alt={sub.title}
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                  ) : (
                    <span>{sub.icon}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>
                      {sub.title}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: sub.color }}>
                      {pct}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#64748B',
                      backgroundColor: '#F1F5F9',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      {sub.themes.length} módulos
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#1E88E5',
                      backgroundColor: '#EFF6FF',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      Níveis Básico & Intermédio
                    </span>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: sub.color,
                      borderRadius: '9999px'
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CONTEÚDO: TAB CONQUISTAS 3D */}
      {activeTab === 'conquistas' && (
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {achievementsList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(11, 61, 145, 0.04)'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '56px', height: '56px', objectFit: 'contain', flexShrink: 0 }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>
                    {item.title}
                  </h4>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#00C48C',
                    backgroundColor: '#00C48C18',
                    padding: '2px 6px',
                    borderRadius: '6px'
                  }}>
                    {item.date}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
