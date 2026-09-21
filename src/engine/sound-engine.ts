// Motor de Efeitos Sonoros 100% Offline usando Web Audio API nativa
// Sem dependência de ficheiros externos ou downloads - funciona imediatamente em qualquer dispositivo!

class SoundEngine {
  private static instance: SoundEngine;
  private ctx: AudioContext | null = null;
  private unlocked = false;

  private constructor() {}

  public static getInstance(): SoundEngine {
    if (!SoundEngine.instance) {
      SoundEngine.instance = new SoundEngine();
    }
    return SoundEngine.instance;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Chama no primeiro toque do utilizador para desbloquear AudioContext em mobile/iOS
  public unlockAudio() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.unlocked) {
      this.unlocked = true;
      // Silent buffer trick para desbloquear AudioContext em iOS/Android
      try {
        if (this.ctx) {
          const buf = this.ctx.createBuffer(1, 1, 22050);
          const src = this.ctx.createBufferSource();
          src.buffer = buf;
          src.connect(this.ctx.destination);
          src.start(0);
        }
      } catch (e) {}
    }
  }

  // Notifica e solicita permissão de áudio / microfone imediatamente na inicialização
  public async requestAudioPermission(): Promise<boolean> {
    this.unlockAudio();
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Fecha as faixas imediatamente para liberar o hardware sem manter microfone gravando
        stream.getTracks().forEach((track) => track.stop());
        return true;
      } catch (err) {
        console.warn('Permissão de microfone / áudio:', err);
        return false;
      }
    }
    return true;
  }

  // 1. EXPLOSÃO ao acertar questão — BOOM + Faíscas + Melodia vitória
  public playExplosion() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Camada 1: BOOM grave (impacto)
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(180, now);
      boomOsc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      boomGain.gain.setValueAtTime(0.6, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start(now);
      boomOsc.stop(now + 0.36);

      // Camada 2: Faíscas (ruído branco filtrado curto)
      const bufSize = Math.floor(this.ctx.sampleRate * 0.15);
      const sparkBuf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const sparkData = sparkBuf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) sparkData[i] = Math.random() * 2 - 1;
      const sparkSrc = this.ctx.createBufferSource();
      sparkSrc.buffer = sparkBuf;
      const sparkFilter = this.ctx.createBiquadFilter();
      sparkFilter.type = 'highpass';
      sparkFilter.frequency.value = 3000;
      const sparkGain = this.ctx.createGain();
      sparkGain.gain.setValueAtTime(0.4, now + 0.02);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      sparkSrc.connect(sparkFilter);
      sparkFilter.connect(sparkGain);
      sparkGain.connect(this.ctx.destination);
      sparkSrc.start(now + 0.02);

      // Camada 3: Melodia de vitória rápida (C5 E5 G5 C6)
      const melody: { f: number; t: number; d: number }[] = [
        { f: 523.25, t: 0.05, d: 0.12 },
        { f: 659.25, t: 0.17, d: 0.12 },
        { f: 783.99, t: 0.29, d: 0.12 },
        { f: 1046.50, t: 0.41, d: 0.28 }
      ];
      melody.forEach(n => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0, now + n.t);
        gain.gain.linearRampToValueAtTime(0.15, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch (e) {
      console.warn('Audio playExplosion:', e);
    }
  }

  // 2. TROFÉU — Fanfarra épica ao completar módulo/troféu
  public playTrophy() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const fanfare: { f: number; t: number; d: number }[] = [
        { f: 392.00, t: 0.0,  d: 0.15 }, // G4
        { f: 523.25, t: 0.15, d: 0.15 }, // C5
        { f: 659.25, t: 0.3,  d: 0.15 }, // E5
        { f: 783.99, t: 0.45, d: 0.15 }, // G5
        { f: 1046.50, t: 0.6, d: 0.5  }, // C6 sustain
        { f: 880.00,  t: 1.1, d: 0.2  }, // A5
        { f: 1046.50, t: 1.3, d: 0.8  }, // C6 final
      ];
      fanfare.forEach(n => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0, now + n.t);
        gain.gain.linearRampToValueAtTime(0.22, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });

      // Aplausos em paralelo após breve delay
      setTimeout(() => { this.playApplause(); }, 300);
    } catch (e) {
      console.warn('Audio playTrophy:', e);
    }
  }

  // 3. Som de Sucesso simples (acorde C-E-G-C)
  public playSuccess() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn('Audio playSuccess:', e);
    }
  }

  // 4. Aplausos sintetizados (ruído rosa filtrado)
  public playApplause() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 2.4;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      gain.gain.linearRampToValueAtTime(0.3, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + duration);
      setTimeout(() => { this.playFanfare(); }, 150);
    } catch (e) {
      console.warn('Audio playApplause:', e);
    }
  }

  // 5. Fanfarra de Vitória
  public playFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const fanfareNotes = [
        { f: 523.25, t: 0.0,  d: 0.15 },
        { f: 523.25, t: 0.15, d: 0.15 },
        { f: 523.25, t: 0.3,  d: 0.15 },
        { f: 659.25, t: 0.45, d: 0.4  },
        { f: 783.99, t: 0.85, d: 0.6  }
      ];
      fanfareNotes.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0, now + n.t);
        gain.gain.linearRampToValueAtTime(0.2, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch (e) {
      console.warn('Audio playFanfare:', e);
    }
  }

  // 6. Pop suave ao selecionar alternativa
  public playPop() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn('Audio playPop:', e);
    }
  }

  // 7. Tentar novamente (tom descendente amigável)
  public playTryAgain() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio playTryAgain:', e);
    }
  }
}

export const sound = SoundEngine.getInstance();
