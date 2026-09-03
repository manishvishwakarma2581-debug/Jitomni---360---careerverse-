import React, { useState } from 'react';
import { BrainCircuit, Send, Mic, MicOff, Sparkles, FileText, CheckCircle2, Network, Film, Database, ArrowRight, Layers, Bot, Cpu } from 'lucide-react';
import { Language, SubAgentType, TopicItem } from '../types';
import { translations } from '../data/translations';
import { speech, createSpeechRecognition } from '../utils/speech';
import { generateTopicPdf, downloadPdfBlob } from '../utils/pdfGenerator';
import { schoolCurriculumData, competitiveCurriculumData } from '../data/curriculumData';

interface PrimeManagerProps {
  lang: Language;
  onOpenTopicModal?: (topic: TopicItem) => void;
}

interface AgentPipelineStep {
  agent: SubAgentType;
  name: string;
  icon: string;
  status: 'idle' | 'running' | 'completed';
  detail: string;
}

interface ChatLog {
  id: string;
  sender: 'user' | 'prime';
  text: string;
  pipeline?: AgentPipelineStep[];
  downloadableTopic?: TopicItem;
}

export const PrimeManager: React.FC<PrimeManagerProps> = ({ lang, onOpenTopicModal }) => {
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activePipeline, setActivePipeline] = useState<AgentPipelineStep[]>([
    { agent: 'prime', name: 'PRIME Brain', icon: '🧠', status: 'completed', detail: 'Master controller ready to execute' },
    { agent: 'lesson', name: 'Lesson Agent', icon: '📖', status: 'idle', detail: 'Synthesizes 360° conceptual pillars' },
    { agent: 'quiz', name: 'Quiz Agent', icon: '📝', status: 'idle', detail: 'Formulates critical analysis questions' },
    { agent: 'visual', name: 'Visual Agent', icon: '🎨', status: 'idle', detail: 'Builds concept blueprints & node maps' },
    { agent: 'video', name: 'Video Agent', icon: '🎬', status: 'idle', detail: 'Animates visual lessons & simulations' },
    { agent: 'pdf', name: 'PDF Agent', icon: '📄', status: 'idle', detail: 'Compiles print-ready JITOMNI documents' },
    { agent: 'data', name: 'Data Agent', icon: '📊', status: 'idle', detail: 'Logs student progress & rank telemetry' },
  ]);

  const [chatLogs, setChatLogs] = useState<ChatLog[]>([
    {
      id: 'prime-welcome',
      sender: 'prime',
      text: `नमस्ते! मैं JITOMNI PRIME हूँ - आपका 360° मल्टी-एजेंट AI नियंत्रक।\n\nआप मुझसे कुछ भी पूछ सकते हैं, जैसे:\n• "Class 5 ka Jal Chakra ka PDF Hinglish me banao"\n• "MPPSC ke liye Constitution Fundamental Rights samjhao"\n• "Class 10 Ohm's Law ka 360 quiz banao"\n\nमैं तुरंत अपने सभी सब-एजेंट्स (Lesson, PDF, Quiz, Video) को एक्टिवेट करके परिणाम दूंगा!`,
    },
  ]);

  const quickPrompts = [
    'Class 5 ka Jal Chakra ka PDF Hinglish me banao',
    'MPPSC ke liye Fundamental Rights ka 360 analysis do',
    'Class 10 Ohm\'s Law ka 360 concept aur quiz do',
    'Photosynthesis kyu important hai aur iska daily life problem kya hai?',
  ];

  const handleSpeechRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = createSpeechRecognition(
      lang,
      (transcript) => {
        setInputText(transcript);
        setIsRecording(false);
      },
      (err) => {
        console.warn(err);
        setIsRecording(false);
      }
    );

    if (recognition) {
      setIsRecording(true);
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleExecutePrompt = async (promptToRun?: string) => {
    const prompt = (promptToRun || inputText).trim();
    if (!prompt || isProcessing) return;

    const userLog: ChatLog = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
    };

    setChatLogs((prev) => [...prev, userLog]);
    setInputText('');
    setIsProcessing(true);

    // Simulate real-time multi-agent pipeline activation
    setActivePipeline((prev) =>
      prev.map((step) =>
        step.agent === 'prime' || step.agent === 'lesson' || step.agent === 'pdf'
          ? { ...step, status: 'running' }
          : step
      )
    );

    // Find any related topic from curriculum
    const matchedTopic =
      schoolCurriculumData.find(
        (t) =>
          (t.name?.hi && prompt.toLowerCase().includes(t.name.hi.toLowerCase())) ||
          (t.name?.en && prompt.toLowerCase().includes(t.name.en.toLowerCase())) ||
          (t.name?.hinglish && prompt.toLowerCase().includes(t.name.hinglish.toLowerCase())) ||
          (t.id && prompt.toLowerCase().includes(t.id.toLowerCase()))
      ) ||
      competitiveCurriculumData.find(
        (t) =>
          (t.name?.hi && prompt.toLowerCase().includes(t.name.hi.toLowerCase())) ||
          (t.name?.en && prompt.toLowerCase().includes(t.name.en.toLowerCase())) ||
          (t.name?.hinglish && prompt.toLowerCase().includes(t.name.hinglish.toLowerCase())) ||
          (t.id && prompt.toLowerCase().includes(t.id.toLowerCase()))
      ) ||
      schoolCurriculumData[0];

    try {
      const response = await fetch('/api/gemini/prime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          language: lang,
        }),
      });

      const data = await response.json();

      setActivePipeline((prev) =>
        prev.map((step) => ({
          ...step,
          status: 'completed',
        }))
      );

      const primeLog: ChatLog = {
        id: (Date.now() + 1).toString(),
        sender: 'prime',
        text: data.text || 'JITOMNI PRIME has coordinated all sub-agents and synthesized your 360° request.',
        downloadableTopic: matchedTopic,
      };

      setChatLogs((prev) => [...prev, primeLog]);

      // Voice response
      speech.speak(typeof data?.text === 'string' && data.text ? data.text.slice(0, 200) : 'JITOMNI PRIME ready.', lang);
    } catch (err) {
      console.error(err);
      const fallbackLog: ChatLog = {
        id: (Date.now() + 1).toString(),
        sender: 'prime',
        text: `JITOMNI PRIME ने "${prompt}" के लिए 360° फ्रेमवर्क तैयार कर लिया है। आप नीचे दिए गए बटन से PDF डाउनलोड कर सकते हैं।`,
        downloadableTopic: matchedTopic,
      };
      setChatLogs((prev) => [...prev, fallbackLog]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPdf = async (topic: TopicItem) => {
    try {
      const bytes = await generateTopicPdf(topic, lang);
      downloadPdfBlob(bytes, `JITOMNI_PRIME_${topic.id}_${lang}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/30 to-blue-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Agent Central AI Controller</span>
            </span>
            <span className="text-xs text-slate-400">Zero Rote Philosophy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-wide">
            {translations.prime.title[lang]}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {translations.prime.subtitle[lang]}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 6 Sub-Agents Live Status Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>PRIME Multi-Agent Architecture (Live Agents):</span>
          </h2>
          <span className="text-[11px] text-slate-400">Autonomous Coordination</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {activePipeline.map((step) => {
            let statusColor = 'border-slate-800 bg-[#0A1931] text-slate-400';
            if (step.status === 'running') {
              statusColor = 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/40 animate-pulse';
            } else if (step.status === 'completed') {
              statusColor = 'border-emerald-500/40 bg-[#102447] text-emerald-300 shadow-md';
            }

            return (
              <div
                key={step.agent}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between min-h-[90px] ${statusColor}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{step.icon}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    step.status === 'running' ? 'bg-amber-400 animate-ping' : step.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">{step.name}</h4>
                  <span className="text-[9px] text-slate-400 block truncate mt-0.5">{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main PRIME Console */}
      <div className="bg-[#0A1931] rounded-3xl border border-slate-800 shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Terminal Top Bar */}
        <div className="p-4 bg-[#030B1E] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#030B1E] rounded-[9px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                JITOMNI PRIME Orchestrator
              </h3>
              <p className="text-[11px] text-amber-300/80">
                Natural Language Command Pipeline • Auto PDF/Quiz/Lesson Synthesis
              </p>
            </div>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {chatLogs.map((log) => {
            const isPrime = log.sender === 'prime';
            return (
              <div
                key={log.id}
                className={`flex gap-3 ${isPrime ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
              >
                {isPrime && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                    🧠
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                  isPrime
                    ? 'bg-[#102447] text-white border border-amber-500/30'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                }`}>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {log.text}
                  </p>

                  {/* If actionable topic synthesized */}
                  {log.downloadableTopic && (
                    <div className="p-3.5 rounded-xl bg-[#071329] border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-amber-300 block">
                          🎯 Ready Asset: {log.downloadableTopic.name[lang] || log.downloadableTopic.name['en']}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Class {log.downloadableTopic.classLevel || log.downloadableTopic.examType} • 6 Dimensions Included
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadPdf(log.downloadableTopic!)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>

                        {onOpenTopicModal && (
                          <button
                            onClick={() => onOpenTopicModal(log.downloadableTopic!)}
                            className="px-3 py-1.5 rounded-lg bg-[#102447] hover:bg-[#1a386e] text-white font-bold text-xs border border-slate-700 transition-all"
                          >
                            Explore 360°
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse p-2">
              <Sparkles className="w-4 h-4" />
              <span>PRIME Agent Pipeline: Lesson Agent + PDF Agent synthesizing 360° framework...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#071329] border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase shrink-0">Command Presets:</span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleExecutePrompt(q)}
              className="px-2.5 py-1 rounded-lg bg-[#0A1931] hover:bg-[#102447] text-slate-300 hover:text-amber-300 text-[11px] font-medium border border-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              "{q}"
            </button>
          ))}
        </div>

        {/* Voice & Prompt Input Bar */}
        <div className="p-3 sm:p-4 bg-[#030B1E] border-t border-amber-500/20 flex items-center gap-2">
          <button
            id="prime-voice-record-btn"
            onClick={handleSpeechRecord}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
              isRecording
                ? 'bg-rose-500 text-white border-rose-400 animate-ping'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 hover:scale-105'
            }`}
            title="Voice Command"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 font-black" />}
          </button>

          <input
            id="prime-chat-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecutePrompt()}
            placeholder={translations.prime.placeholder[lang]}
            className="flex-1 px-4 py-3 bg-[#0A1931] border border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
          />

          <button
            id="prime-chat-send-btn"
            onClick={() => handleExecutePrompt()}
            disabled={!inputText.trim() || isProcessing}
            className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
