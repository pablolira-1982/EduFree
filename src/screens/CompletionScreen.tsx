import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../engine/sound-engine';

interface Props {
  onReturnHome: () => void;
}

// Confetti de troféu em 5 ondas épicas
function fireTrophyConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  // Onda 1: Explosão central imediata
  confetti({
    particleCount: 160,
    spread: 100,
    startVelocity: 60,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#FFD700', '#FFA500', '#FF6B35', '#00C48C', '#1E88E5', '#FF4081', '#B2FF59', '#FFFFFF']
  });

  // Ondas 2-3: chuva lateral após 300ms
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 65, startVelocity: 55, origin: { x: 0, y: 0.6 } });
    confetti({ particleCount: 80, angle: 120, spread: 65, startVelocity: 55, origin: { x: 1, y: 0.6 } });
  }, 300);

  // Loop de estrelas douradas caindo
  const interval = setInterval(() => {
    if (Date.now() > end) { clearInterval(interval); return; }
    confetti({
      particleCount: 12,
      angle: 90,
      spread: 180,
      startVelocity: 20,
      ticks: 300,
      gravity: 0.4,
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500', '#FFFFFF'],
      origin: { x: Math.random(), y: 0 }
    });
  }, 200);
}

export const CompletionScreen: React.FC<Props> = ({ onReturnHome }) => {
  const didFire = useRef(false);

  useEffect(() => {
    if (didFire.current) return;
    didFire.current = true;
    sound.playTrophy();
    fireTrophyConfetti();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#00183c',
      color: '#FFFFFF',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '48px 24px 32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        {/* Troféu animado */}
        <div style={{
          fontSize: '80px',
          marginBottom: '12px',
          animation: 'trophyBounce 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))'
        }}>
          🏆
        </div>

        {/* Estrelas em redor */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '16px',
          animation: 'fadeIn 0.5s ease 0.3s both'
        }}>
          {['🌟', '⭐', '✨', '⭐', '🌟'].map((s, i) => (
            <span key={i} style={{
              fontSize: '22px',
              animation: `starPop 0.5s ease ${0.4 + i * 0.1}s both`
            }}>{s}</span>
          ))}
        </div>

        {/* Mascote Coruja */}
        <img
          src="/assets/Logo_EduFree.png"
          alt="EduFree Coruja"
          style={{
            width: '110px', height: '110px', objectFit: 'contain', marginBottom: '24px',
            animation: 'mascotePulse 1s ease 0.5s infinite alternate',
            filter: 'drop-shadow(0 0 16px rgba(30, 136, 229, 0.7))'
          }}
        />

        <h2 style={{
          fontSize: '28px', fontWeight: 800, margin: '0 0 10px 0',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'slideUp 0.5s ease 0.2s both'
        }}>
          Módulo Concluído!
        </h2>
        <p style={{
          fontSize: '15px', color: '#94A3B8', margin: '0 0 36px 0',
          lineHeight: 1.5, maxWidth: '300px',
          animation: 'slideUp 0.5s ease 0.35s both'
        }}>
          Excelente! Continuas a evoluir. Cada lição aproxima-te de um futuro melhor.
        </p>

        {/* 3 Pilares */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
          width: '100%', marginBottom: '36px',
          animation: 'slideUp 0.5s ease 0.5s both'
        }}>
          {[
            { icon: '📖', label: 'Aprender hoje' },
            { icon: '🌱', label: 'Construir o amanhã' },
            { icon: '🌍', label: 'Transformar o mundo' }
          ].map((p, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              borderRadius: '16px', padding: '16px 8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ fontSize: '26px', marginBottom: '6px' }}>{p.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>{p.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '13px', color: '#38BDF8', fontWeight: 600,
          animation: 'slideUp 0.5s ease 0.65s both'
        }}>
          Educação sem limites. Para um mundo com mais oportunidades.
        </div>
      </div>

      <button
        onClick={onReturnHome}
        style={{
          width: '100%', height: '56px', borderRadius: '28px', border: 'none',
          backgroundColor: '#1E88E5', color: '#FFFFFF', fontWeight: 700,
          fontSize: '16px', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(30, 136, 229, 0.5)',
          marginTop: '24px', transition: 'transform 0.15s ease'
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Continuar a aprender →
      </button>

      <style>{`
        @keyframes trophyBounce {
          0%   { transform: scale(0.2) translateY(40px); opacity: 0; }
          55%  { transform: scale(1.3) translateY(-10px); opacity: 1; }
          75%  { transform: scale(0.93) translateY(5px); }
          90%  { transform: scale(1.07) translateY(-4px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes starPop {
          0%   { opacity: 0; transform: scale(0) rotate(-45deg); }
          70%  { opacity: 1; transform: scale(1.4) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes mascotePulse {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
