import React from 'react';
import type { ScreenType } from '../../core/types';

interface Props {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  const navItems: Array<{
    id: ScreenType;
    label: string;
    renderIcon: (active: boolean) => React.ReactNode;
  }> = [
    {
      id: 'home',
      label: 'Início',
      renderIcon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1769F4' : 'none'} stroke={active ? '#1769F4' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'activities',
      label: 'Atividades',
      renderIcon: () => (
        <img
          src="/assets/conquista_mestre_contas.png"
          alt="Atividades"
          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
        />
      )
    },
    {
      id: 'packs',
      label: 'Explorar',
      renderIcon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1769F4' : 'none'} stroke={active ? '#1769F4' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    },
    {
      id: 'progress',
      label: 'Progresso',
      renderIcon: () => (
        <img
          src="/assets/conquista_trofeu.png"
          alt="Progresso"
          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
        />
      )
    },
    {
      id: 'profile',
      label: 'Perfil',
      renderIcon: () => (
        <img
          src="/assets/Logo_EduFree.png"
          alt="Perfil"
          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
        />
      )
    },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      maxWidth: '480px',
      margin: '0 auto',
      boxShadow: '0 -4px 16px rgba(11, 61, 145, 0.06)'
    }}>
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: isActive ? '#EFF6FF' : 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: isActive ? '#1769F4' : '#64748B',
              fontWeight: isActive ? 700 : 500,
              fontSize: '11px',
              padding: '6px 12px',
              borderRadius: '16px',
              transition: 'all 0.2s ease',
              minWidth: '58px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.15s ease'
            }}>
              {item.renderIcon(isActive)}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
