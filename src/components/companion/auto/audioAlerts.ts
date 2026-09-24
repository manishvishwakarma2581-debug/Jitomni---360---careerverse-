// Web Audio API Sound Generator for Driver Alert Chime and SOS Siren
class AudioAlertService {
  private audioCtx: AudioContext | null = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Incoming Ride Request Beep (pleasant royal alert chime: Rapido/Ola style)
  playRideRequestBeep() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6
      osc.frequency.setValueAtTime(1760, now + 0.2); // A6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn('Audio alert not allowed yet without user gesture', e);
    }
  }

  // SOS Emergency Siren (pulsing warning frequency)
  playSOSSiren() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.3);
      osc.frequency.linearRampToValueAtTime(900, now + 0.6);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {
      console.warn('Audio alert error', e);
    }
  }
}

export const audioAlertService = new AudioAlertService();

export const playIncomingRideSound = () => {
  audioAlertService.playRideRequestBeep();
};

export const playAcceptSound = () => {
  audioAlertService.playRideRequestBeep();
};
