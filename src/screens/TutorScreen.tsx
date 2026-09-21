import React, { useState, useRef, useEffect } from 'react';
import { tts } from '../engine/tts-engine';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  options?: string[];
}

interface Props {
  onBack: () => void;
}

export const TutorScreen: React.FC<Props> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'tutor',
      text: 'Olá! Eu sou o teu Tutor Offline EduFree 🤖. Estou aqui para te ajudar a entender qualquer matéria sem precisares de Internet! Sobre o que gostarias de aprender hoje?',
      options: [
        'O que são frações?',
        'Como calcular a tabuada?',
        'O que é um adjetivo?',
        'Explica a cadeia alimentar',
        'Conta uma curiosidade!'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateTutorResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('fração') || q.includes('fracao') || q.includes('frações')) {
      return 'Uma fração representa uma parte de um todo! O número de cima é o Numerador (quantas partes temos) e o de baixo é o Denominador (em quantas partes o todo foi dividido). Exemplo: se dividires uma pizza em 4 fatias e comeres 1, comeste 1/4 da pizza! 🍕';
    }
    if (q.includes('tabuada') || q.includes('multiplica') || q.includes('vezes')) {
      return 'A multiplicação é uma soma repetida! Por exemplo: 3 x 4 é o mesmo que somar o número 3 quatro vezes (3 + 3 + 3 + 3 = 12). Dica de ouro: qualquer número multiplicado por 0 dá 0, e por 1 dá ele mesmo! ✨';
    }
    if (q.includes('adjetivo') || q.includes('substantivo') || q.includes('português')) {
      return 'O substantivo dá NOME às coisas (menino, livro, sol), enquanto o adjetivo dá QUALIDADE ou característica (menino alegre, livro grande, sol brilhante)! 📖';
    }
    if (q.includes('cadeia') || q.includes('alimentar') || q.includes('ciência') || q.includes('animal')) {
      return 'Na cadeia alimentar temos: 1) Produtores (plantas que produzem seu alimento pela luz do sol), 2) Consumidores (animais que comem plantas ou outros animais) e 3) Decompositores (fungos e bactérias que reciclam a matéria orgânica na terra)! 🌿🦁';
    }
    if (q.includes('curiosidade') || q.includes('planeta') || q.includes('universo') || q.includes('terra')) {
      return 'Sabias que o coração de uma baleia-azul é tão grande que um ser humano poderia nadar através das suas artérias principais? E que o Oceano Pacífico é maior do que todas as terras emersas do planeta juntas! 🌊🐋';
    }
    if (q.includes('inglês') || q.includes('ingles') || q.includes('hello') || q.includes('traduz')) {
      return 'Em inglês, "Good morning" é Bom dia, "Thank you" é Obrigado(a), e "Friend" é Amigo! Lembra-te: praticar um bocadinho todos os dias faz-te aprender qualquer idioma! 🇬🇧';
    }

    return `Essa é uma excelente pergunta sobre "${query}"! Como estamos no modo 100% offline, podes explorar os tópicos completos de Matemática, Português, Ciências e História no menu principal. Quer que te explique com mais detalhe sobre Frações ou Adjetivos?`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim()
    };

    const replyText = generateTutorResponse(text.trim());
    const tutorMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'tutor',
      text: replyText
    };

    setMessages(prev => [...prev, userMsg, tutorMsg]);
    setInputText('');
  };

  const handleReadAloud = (text: string) => {
    if (isSpeaking) {
      tts.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      tts.speak(text, 'pt-BR', () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div style={{
      backgroundColor: '#00183c',
      minHeight: '100vh',
      color: '#FFFFFF',
      maxWidth: '480px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00183c',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              tts.stop();
              onBack();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ‹
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/Robo_EduFree.png" alt="Robô Tutor" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                Tutor EduFree (Offline)
              </h2>
              <span style={{ fontSize: '11px', color: '#00C48C', fontWeight: 600 }}>
                ● Sempre Disponível Sem Rede
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            tts.stop();
            setIsSpeaking(false);
          }}
          title="Parar voz"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          🔇
        </button>
      </div>

      {/* Área de Conversação Interativa */}
      <div style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto'
      }}>
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isTutor ? 'flex-start' : 'flex-end',
                width: '100%'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                maxWidth: '88%'
              }}>
                {isTutor && (
                  <img
                    src="/assets/Robo_EduFree.png"
                    alt="Tutor"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(54, 197, 240, 0.15)',
                      padding: '2px',
                      objectFit: 'contain',
                      flexShrink: 0
                    }}
                  />
                )}

                <div style={{
                  backgroundColor: isTutor ? 'rgba(255, 255, 255, 0.08)' : '#1E88E5',
                  border: isTutor ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                  borderRadius: isTutor ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                  padding: '14px 16px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {msg.text}

                  {isTutor && (
                    <button
                      onClick={() => handleReadAloud(msg.text)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '4px 10px',
                        color: '#38BDF8',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <span>🔊</span> Ouvir explicação
                    </button>
                  )}
                </div>
              </div>

              {/* Botões de sugestão rápida */}
              {msg.options && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '12px',
                  marginLeft: '42px'
                }}>
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(opt)}
                      style={{
                        backgroundColor: 'rgba(54, 197, 240, 0.12)',
                        border: '1px solid rgba(54, 197, 240, 0.35)',
                        borderRadius: '16px',
                        padding: '8px 14px',
                        color: '#F8FAFC',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar no Rodapé */}
      <div style={{
        padding: '12px 20px 24px 20px',
        backgroundColor: '#00183c',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            padding: '6px 8px 6px 16px',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <input
            type="text"
            placeholder="Escreve a tua pergunta..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: inputText.trim() ? '#1E88E5' : 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputText.trim() ? 'pointer' : 'default',
              fontSize: '16px',
              transition: 'background-color 0.2s ease'
            }}
          >
            →
          </button>
        </form>
      </div>
    </div>
  );
};
