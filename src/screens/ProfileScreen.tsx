import React, { useState } from 'react';
import type { UserProfile } from '../core/types';

interface Props {
  profile: UserProfile;
  onOpenOfflinePacks: () => void;
  onOpenSettings: () => void;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const ProfileScreen: React.FC<Props> = ({
  profile,
  onOpenOfflinePacks,
  onOpenSettings,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const handleSaveName = () => {
    if (nameInput.trim() && onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        name: nameInput.trim()
      });
    }
    setIsEditing(false);
  };

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
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
          Perfil
        </h2>
        <button
          onClick={onOpenSettings}
          style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
        >
          ⚙️
        </button>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Identificação do Usuário */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(11, 61, 145, 0.05)'
        }}>
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            backgroundColor: '#1E88E5',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '12px',
            boxShadow: '0 4px 16px rgba(30, 136, 229, 0.35)'
          }}>
            {profile.name.charAt(0)}
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: '2px solid #1E88E5',
                  fontSize: '16px',
                  fontWeight: 700,
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
              <button
                onClick={handleSaveName}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  backgroundColor: '#00C48C',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ✓
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>
                {profile.name}
              </h3>
              <button
                onClick={() => {
                  setNameInput(profile.name);
                  setIsEditing(true);
                }}
                title="Editar Nome"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  color: '#1E88E5',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                ✏️
              </button>
            </div>
          )}

          <span style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
            {profile.tagline}
          </span>

          {/* Badges de Nível e Pontos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            width: '100%'
          }}>
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '20px' }}>📊</span>
              <div>
                <div style={{ fontSize: '10px', color: '#6B7280' }}>Nível</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{profile.level}</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '20px' }}>⭐</span>
              <div>
                <div style={{ fontSize: '10px', color: '#6B7280' }}>Pontos</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{profile.points}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Opções do Perfil Fiel ao Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div
            onClick={onOpenOfflinePacks}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>💾</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                Os meus conteúdos offline
              </span>
            </div>
            <span style={{ color: '#94A3B8', fontSize: '18px' }}>›</span>
          </div>

          <div
            onClick={onOpenSettings}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>⚙️</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                Preferências de aprendizagem
              </span>
            </div>
            <span style={{ color: '#94A3B8', fontSize: '18px' }}>›</span>
          </div>

          <div
            onClick={onOpenSettings}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>🔒</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                Privacidade
              </span>
            </div>
            <span style={{ color: '#94A3B8', fontSize: '18px' }}>›</span>
          </div>

          <div
            onClick={onOpenSettings}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>ℹ️</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                Sobre o EduFree
              </span>
            </div>
            <span style={{ color: '#94A3B8', fontSize: '18px' }}>›</span>
          </div>
        </div>
      </div>
    </div>
  );
};
