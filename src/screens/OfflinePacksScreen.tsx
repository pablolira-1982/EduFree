import React, { useState, useEffect } from 'react';
import { db, DEFAULT_PACKS } from '../db/database';
import type { OfflinePack } from '../core/types';

interface Props {
  onBack: () => void;
}

export const OfflinePacksScreen: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'disponiveis' | 'instalados'>('disponiveis');
  const [packs, setPacks] = useState<OfflinePack[]>(DEFAULT_PACKS);

  useEffect(() => {
    db.packs.toArray().then((items) => {
      if (items && items.length > 0) {
        setPacks(items);
      }
    });
  }, []);

  const handleToggleInstall = async (packId: string) => {
    const updated = packs.map(p => {
      if (p.id === packId) {
        return { ...p, installed: !p.installed };
      }
      return p;
    });
    setPacks(updated);
    const target = updated.find(p => p.id === packId);
    if (target) {
      await db.packs.put(target);
    }
  };

  const displayedPacks = activeTab === 'instalados' 
    ? packs.filter(p => p.installed)
    : packs;

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
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <button
          onClick={onBack}
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
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
          Conteúdos offline
        </h2>
      </div>

      {/* Tabs: Disponíveis, Instalados */}
      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          backgroundColor: '#E2E8F0',
          borderRadius: '14px',
          padding: '4px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveTab('disponiveis')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'disponiveis' ? '#1769F4' : 'transparent',
              color: activeTab === 'disponiveis' ? '#FFFFFF' : '#6B7280',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Disponíveis
          </button>
          <button
            onClick={() => setActiveTab('instalados')}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'instalados' ? '#1769F4' : 'transparent',
              color: activeTab === 'instalados' ? '#FFFFFF' : '#6B7280',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Instalados
          </button>
        </div>
      </div>

      {/* Lista de Pacotes */}
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {displayedPacks.map((pack) => (
          <div
            key={pack.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: pack.subject === 'Português' ? '#FF6B6B18' : pack.subject === 'Matemática' ? '#1E88E518' : '#00C48C18',
                color: pack.subject === 'Português' ? '#FF6B6B' : pack.subject === 'Matemática' ? '#1E88E5' : '#00C48C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                📦
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>
                  {pack.title}
                </h4>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                  {pack.size}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleToggleInstall(pack.id)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: pack.installed ? '#F1F5F9' : '#1E88E5',
                color: pack.installed ? '#00C48C' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {pack.installed ? '✓' : '↓'}
            </button>
          </div>
        ))}
      </div>

      {/* Barra de Armazenamento do Dispositivo Fiel ao Mockup */}
      <div style={{
        margin: '16px 20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '16px 20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
            Armazenamento
          </span>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>
            2,4 GB de 32 GB utilizados
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#E2E8F0',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{ width: '15%', height: '100%', backgroundColor: '#1E88E5', borderRadius: '9999px' }} />
        </div>
      </div>
    </div>
  );
};
