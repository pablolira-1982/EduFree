import React from 'react';

interface Props {
  onStart: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#00183c',
      display: 'flex',
      flexDirection: 'column',
      color: '#FFFFFF',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Top Graphic with Owl, Globe, Title & Slogan */}
      <div style={{
        width: '100%',
        backgroundColor: '#00183c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '16px'
      }}>
        <img
          src="/assets/Logo_principal.png"
          alt="EduFree — Aprender hoje, um futuro melhor amanhã"
          style={{
            width: '100%',
            maxWidth: '430px',
            height: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Seamless continuation container in exact #00183c */}
      <div style={{
        flex: 1,
        backgroundColor: '#00183c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px 32px 24px',
        maxWidth: '430px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* 4 Feature Badges exactly as Mockup */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '12px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(23, 105, 244, 0.12)',
            border: '1px solid rgba(54, 197, 240, 0.25)',
            padding: '12px 18px',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1769F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              📶
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
              Funciona offline
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(23, 105, 244, 0.12)',
            border: '1px solid rgba(54, 197, 240, 0.25)',
            padding: '12px 18px',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1769F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              📖
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
              Conteúdos gratuitos
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(23, 105, 244, 0.12)',
            border: '1px solid rgba(54, 197, 240, 0.25)',
            padding: '12px 18px',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1769F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              📊
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
              Para todas as idades
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(23, 105, 244, 0.12)',
            border: '1px solid rgba(54, 197, 240, 0.25)',
            padding: '12px 18px',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#1769F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              👥
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
              Um mundo de oportunidades
            </span>
          </div>
        </div>

        {/* Action Button "Começar ->" */}
        <button
          onClick={onStart}
          style={{
            width: '100%',
            height: '56px',
            backgroundColor: '#1769F4',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '28px',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(23, 105, 244, 0.4)',
            transition: 'transform 0.15s ease, background-color 0.2s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Começar <span>→</span>
        </button>
      </div>
    </div>
  );
};
