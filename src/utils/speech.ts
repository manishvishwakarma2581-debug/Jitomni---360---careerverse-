import { Language } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, lang: Language, onEnd?: () => void) {
    if (!this.synth) return;
    this.stop();

    const cleanText = text.replace(/[#*`_]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Select suitable voice for Hindi or English
    const voices = this.synth.getVoices();
    if (lang === 'hi') {
      const hiVoice = voices.find((v) => v.lang.includes('hi') || v.name.includes('Hindi'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
    } else {
      const enVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speech = new SpeechService();

export function speakText(text: string, lang: Language = 'hi', onEnd?: () => void) {
  speech.speak(text, lang, onEnd);
}

export function stopSpeaking() {
  speech.stop();
}

// Speech Recognition helper
export function createSpeechRecognition(
  lang: Language,
  onResult: (text: string) => void,
  onError: (err: any) => void
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(event.error);
  };

  return recognition;
}
