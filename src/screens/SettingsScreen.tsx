import React, { useState } from 'react';
import type { UserProfile } from '../core/types';
import { tts } from '../engine/tts-engine';
import { sound } from '../engine/sound-engine';

interface Props {
  profile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const SettingsScreen: React.FC<Props> = ({ profile, onBack, onUpdateProfile }) => {
  const [ttsEnabled, setTtsEnabled] = useState(profile.settings.ttsEnabled);
  const [locale, setLocale] = useState(profile.locale);
  const [theme, setTheme] = useState(profile.settings.theme);

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      locale,
      settings: {
        ...profile.settings,
        theme,
        ttsEnabled
      }
    });
    onBack();
  };

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
          Definições
        </h2>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Seção Geral */}
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Geral
          </span>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Idioma da aplicação</span>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as any)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="pt-BR">Português (BR)</option>
                <option value="pt-PT">Português (PT)</option>
              </select>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Tema</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="auto">Automático</option>
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seção Voz */}
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Voz e Áudio Didático
          </span>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Ler conteúdos em voz alta</span>
              <input
                type="checkbox"
                checked={ttsEnabled}
                onChange={(e) => setTtsEnabled(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#1769F4', cursor: 'pointer' }}
              />
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, display: 'block' }}>Voz Neural Humana</span>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>Microsoft Edge TTS (Sem robô, sem instalar Edge)</span>
              </div>
              <select
                value={profile.settings.ttsVoice || 'pt-BR-FranciscaNeural'}
                onChange={(e) => {
                  const val = e.target.value;
                  tts.setPreferredVoice(val);
                  onUpdateProfile({
                    ...profile,
                    settings: {
                      ...profile.settings,
                      ttsVoice: val
                    }
                  });
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  outline: 'none',
                  maxWidth: '190px'
                }}
              >
                <option value="pt-BR-FranciscaNeural">✨ Francisca (Feminina BR)</option>
                <option value="pt-BR-AntonioNeural">✨ Antônio (Masculino BR)</option>
                <option value="pt-BR-ThalitaNeural">✨ Thalita (Jovem BR)</option>
                <option value="pt-PT-RaquelNeural">✨ Raquel (Portugal PT)</option>
                <option value="en-US-JennyNeural">✨ Jenny (English US)</option>
              </select>
            </div>

            <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', borderTop: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={async () => {
                  const granted = await sound.requestAudioPermission();
                  if (granted) {
                    alert('Permissão de áudio e microfone ativa com sucesso! 🎙️✅');
                  } else {
                    alert('Permissão de áudio recusada ou bloqueada nas definições do sistema.');
                  }
                }}
                style={{
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🎙️ Permissão de Áudio
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentVoice = profile.settings.ttsVoice || 'pt-BR-FranciscaNeural';
                  const voiceName = currentVoice.includes('Antonio') ? 'Antônio' : currentVoice.includes('Thalita') ? 'Thalita' : 'Francisca';
                  tts.speak(`Olá! Eu sou a voz de ${voiceName} no EduFree. Minha voz é natural, humana e clara, sem som de robô!`, profile.locale);
                }}
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#1E88E5',
                  border: '1px solid #BFDBFE',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🔊 Ouvir Teste da Voz Humana
              </button>
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSave}
          style={{
            marginTop: '12px',
            width: '100%',
            height: '52px',
            borderRadius: '26px',
            backgroundColor: '#1769F4',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(23, 105, 244, 0.3)'
          }}
        >
          Guardar Definições
        </button>
      </div>
    </div>
  );
};
