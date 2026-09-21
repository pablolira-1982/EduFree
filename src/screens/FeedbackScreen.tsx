import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../engine/sound-engine';

interface Props {
  isCorrect: boolean;
  explanation: string;
  streakDays: number;
  onNext: () => void;
}

// Dispara confetti em múltiplas ondas — efeito de explosão real
function fireExplosionConfetti() {
  // Onda 1: centro — explosão principal
  confetti({
    particleCount: 120,
    spread: 90,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: ['#FFD700', '#FF6B35', '#00C48C', '#1E88E5', '#FF4081', '#B2FF59']
  });

  // Onda 2: canto esquerdo após 120ms
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      startVelocity: 50,
      origin: { x: 0, y: 0.65 },
      colors: ['#FFD700', '#FF6B35', '#00C48C']
    });
  }, 120);

  // Onda 3: canto direito após 200ms
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      startVelocity: 50,
      origin: { x: 1, y: 0.65 },
      colors: ['#1E88E5', '#FF4081', '#B2FF59']
    });
  }, 200);

  // Onda 4: chuva suave no topo após 400ms
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      startVelocity: 20,
      ticks: 200,
      gravity: 0.6,
      origin: { x: 0.5, y: 0 },
      colors: ['#FFD700', '#FFFFFF', '#FF6B35']
    });
  }, 400);
}

export const FeedbackScreen: React.FC<Props> = ({
  isCorrect,
  explanation,
  streakDays,
  onNext
}) => {
  const didFire = useRef(false);

  useEffect(() => {
    if (didFire.current) return;
    didFire.current = true;

    if (isCorrect) {
      sound.playExplosion();
      fireExplosionConfetti();
    } else {
      sound.playTryAgain();
    }
  }, [isCorrect]);

  const daysOfWeek = [
    { label: 'Seg', active: true },
    { label: 'Ter', active: true },
    { label: 'Qua', active: true },
    { label: 'Qui', active: false },
    { label: 'Sex', active: false },
    { label: 'Sáb', active: false },
    { label: 'Dom', active: false }
  ];

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      color: '#1F2937',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '40px 24px 32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      {/* Ícone Celebratório com animação de explosão */}
      <div style={{
        fontSize: '72px',
        marginBottom: '16px',
        animation: isCorrect
          ? 'explodePop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both'
          : 'bounce 0.8s ease',
        filter: isCorrect ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' : 'none',
        transformOrigin: 'center'
      }}>
        {isCorrect ? '🎉' : '💡'}
      </div>

      <h2 style={{
        margin: '0 0 8px 0',
        fontSize: '24px',
        fontWeight: 800,
        color: isCorrect ? '#00C48C' : '#FF6B6B',
        textAlign: 'center',
        animation: isCorrect ? 'slideUp 0.4s ease 0.1s both' : 'none'
      }}>
        {isCorrect ? '🚀 Muito bem! Resposta correta!' : 'Quase lá! Continua a tentar!'}
      </h2>

      {/* Flash de celebração */}
      {isCorrect && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '8px',
          animation: 'slideUp 0.4s ease 0.2s both'
        }}>
          {['⭐', '✨', '🌟', '💫', '⭐'].map((s, i) => (
            <span key={i} style={{
              fontSize: '20px',
              animation: `twinkle 0.6s ease ${i * 0.1}s both`
            }}>{s}</span>
          ))}
        </div>
      )}

      {/* Explicação Pedagógica */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box',
        border: isCorrect ? '2px solid #00C48C' : '1px solid #E2E8F0',
        boxShadow: isCorrect
          ? '0 4px 24px rgba(0, 196, 140, 0.2)'
          : '0 4px 16px rgba(11, 61, 145, 0.05)',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#4B5563', lineHeight: 1.5 }}>
          {explanation}
        </p>
      </div>

      {/* Botão Próximo Exercício */}
      <button
        onClick={onNext}
        style={{
          width: '100%',
          height: '54px',
          borderRadius: '27px',
          border: 'none',
          backgroundColor: isCorrect ? '#00C48C' : '#1E88E5',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: isCorrect
            ? '0 6px 24px rgba(0, 196, 140, 0.45)'
            : '0 6px 20px rgba(30, 136, 229, 0.35)',
          marginBottom: '28px',
          transition: 'transform 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Próximo exercício →
      </button>

      {/* Cartão de Ofensiva / Ritmo Diário */}
      <div style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
        boxSizing: 'border-box',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 12px rgba(11, 61, 145, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/conquista_fogo.png" alt="Streak" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
            Mantém o ritmo!
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#FF6B6B',
            backgroundColor: '#FEE2E2',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {streakDays} dias seguidos
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
          {daysOfWeek.map((day, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: day.active ? '#00C48C' : '#F1F5F9',
                color: day.active ? '#FFFFFF' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700
              }}>
                {day.active ? '✓' : ''}
              </div>
              <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS para animações de explosão */}
      <style>{`
        @keyframes explodePop {
          0%   { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50%  { transform: scale(1.4) rotate(5deg); opacity: 1; }
          70%  { transform: scale(0.9) rotate(-3deg); }
          85%  { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%   { opacity: 0; transform: scale(0) rotate(-30deg); }
          60%  { opacity: 1; transform: scale(1.3) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};
