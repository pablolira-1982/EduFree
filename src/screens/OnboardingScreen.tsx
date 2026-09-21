import React, { useState } from 'react';
import type { LocaleType } from '../core/types';

interface Props {
  onComplete: (name: string, locale: LocaleType) => void;
}

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [locale, setLocale] = useState<LocaleType>('pt-BR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete(name.trim(), locale);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#00183c',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src="/assets/Logo_EduFree.png"
          alt="EduFree Coruja"
          style={{ width: '120px', height: '120px', marginBottom: '20px', objectFit: 'contain' }}
        />

        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', textAlign: 'center' }}>
          Bem-vindo ao EduFree!
        </h1>
        <p style={{ fontSize: '15px', color: '#94A3B8', textAlign: 'center', margin: '0 0 32px 0', lineHeight: 1.5 }}>
          Vamos personalizar a tua experiência de aprendizagem offline. Não precisas de email ou password!
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#F8FAFC' }}>
              Como te chamas? (Pseudónimo ou Primeiro Nome)
            </label>
            <input
              type="text"
              placeholder="Ex: Pablo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#F8FAFC' }}>
              Variante Linguística
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setLocale('pt-BR')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: locale === 'pt-BR' ? '2px solid #1769F4' : '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: locale === 'pt-BR' ? 'rgba(23, 105, 244, 0.25)' : 'rgba(255,255,255,0.05)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                🇧🇷 Português (BR)
              </button>

              <button
                type="button"
                onClick={() => setLocale('pt-PT')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: locale === 'pt-PT' ? '2px solid #1769F4' : '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: locale === 'pt-PT' ? 'rgba(23, 105, 244, 0.25)' : 'rgba(255,255,255,0.05)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                🇵🇹 Português (PT)
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '28px',
              backgroundColor: name.trim() ? '#1769F4' : '#64748B',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '16px',
              fontWeight: 700,
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              boxShadow: name.trim() ? '0 8px 24px rgba(23, 105, 244, 0.4)' : 'none'
            }}
          >
            Aceder ao EduFree →
          </button>
        </form>
      </div>
    </div>
  );
};
