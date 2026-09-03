import React, { useState, useMemo } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  FileText,
  Play,
  CheckCircle2,
  Network,
  Sparkles,
  Zap,
  BookOpen,
  Award,
  HelpCircle,
  Clock,
  Lightbulb,
  AlertTriangle,
  Flame,
  Star,
  Layers,
} from 'lucide-react';
import { Language, TopicItem, TopicType, Adaptive360Data } from '../types';
import { translations } from '../data/translations';
import { speech } from '../utils/speech';
import { generateTopicPdf, downloadPdfBlob } from '../utils/pdfGenerator';
import { synthesizeAdaptive360, getTopicTypeMeta } from '../utils/topicClassifier';
import { MermaidDiagram } from './MermaidDiagram';

interface TopicDetailModalProps {
  topic: TopicItem;
  lang: Language;
  onClose: () => void;
  onOpenQuiz: (topic: TopicItem) => void;
  onOpenVideo: (topic: TopicItem) => void;
  onOpenInfographic: (topic: TopicItem) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  lang,
  onClose,
  onOpenQuiz,
  onOpenVideo,
  onOpenInfographic,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const topicName = topic.name[lang] || topic.name['hi'] || topic.name['en'] || 'Topic';

  // Retrieve or synthesize Adaptive 360 content via 2-Agent system
  const adaptive: Adaptive360Data = useMemo(() => {
    if (topic.adaptive360 && topic.adaptive360.tabsConfig?.length > 0) {
      return topic.adaptive360;
    }
    return synthesizeAdaptive360(
      topic.name.en || topic.name.hi || 'Topic',
      topic.subject || 'General',
      topic.chapter || 'Foundations',
      topic.classLevel,
      topic.examType
    );
  }, [topic]);

  const tabs = adaptive.tabsConfig || [];
  const [activeTabKey, setActiveTabKey] = useState<string>(tabs[0]?.key || 'formula');

  const meta = getTopicTypeMeta(adaptive.topicType);

  const getStr = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['hi'] || obj['en'] || obj['hinglish'] || '';
  };

  const getArr = (obj: any): string[] => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    return obj[lang] || obj['hi'] || obj['en'] || obj['hinglish'] || [];
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      speech.stop();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = `${topicName}. `;

    if (adaptive.topicType === 'TYPE_A' && adaptive.typeA_Maths) {
      const a = adaptive.typeA_Maths;
      if (activeTabKey === 'formula') {
        textToSpeak += a.masterFormulas.map((f) => `${getStr(f.name)}. ${f.formula}. ${getStr(f.explanation)}`).join('. ');
      } else if (activeTabKey === 'trick') {
        textToSpeak += `${getStr(a.jitomniSpeedTrick.title)}. ${a.jitomniSpeedTrick.trickFormulaOrLogic}. ${a.jitomniSpeedTrick.steps.map((s) => getStr(s)).join('. ')}`;
      } else if (activeTabKey === 'examples') {
        textToSpeak += a.stepExamples.map((e) => `${getStr(e.problem)}. ${getStr(e.trickMethodStep)}. ${e.answer}`).join('. ');
      } else {
        textToSpeak += a.pyqPractice.map((p) => `${getStr(p.question)}. ${getStr(p.trickExplanation)}`).join('. ');
      }
    } else if (adaptive.topicType === 'TYPE_C' && adaptive.typeC_Kids) {
      const c = adaptive.typeC_Kids;
      if (activeTabKey === 'story') {
        textToSpeak += `${getStr(c.story.title)}. ${getStr(c.story.narrative)}. ${getStr(c.story.moralLesson)}`;
      } else if (activeTabKey === 'activity') {
        textToSpeak += `${getStr(c.funActivity.activityName)}. ${getArr(c.funActivity.steps).join('. ')}. ${getStr(c.funActivity.funRiddle.question)}`;
      } else {
        textToSpeak += `${getStr(c.visualCartoon.visualDesc)}. ${c.visualCartoon.keyLabels.map((l) => `${l.name}: ${l.funFact}`).join('. ')}`;
      }
    } else if (adaptive.topicType === 'TYPE_B' && adaptive.typeB_Science) {
      const b = adaptive.typeB_Science;
      textToSpeak += `${getStr(b.coreConcept.title)}. ${getStr(b.coreConcept.summary)}. ${getStr(b.coreConcept.scientificAnalogy)}`;
    } else if (adaptive.topicType === 'TYPE_D' && adaptive.typeD_HistoryGK) {
      const d = adaptive.typeD_HistoryGK;
      textToSpeak += `${getStr(d.timelineMermaid.title)}. ${d.mnemonicTricks.map((m) => `${m.trickPhrase}: ${getStr(m.meaning)}`).join('. ')}`;
    } else if (adaptive.topicType === 'TYPE_E' && adaptive.typeE_Reasoning) {
      const e = adaptive.typeE_Reasoning;
      textToSpeak += `${getStr(e.logicRules.title)}. ${getStr(e.speedTrick10s.title)}. ${e.speedTrick10s.formulaOrPattern}`;
    } else if (adaptive.typeF_Competitive) {
      const f = adaptive.typeF_Competitive;
      textToSpeak += `${getStr(f.superShortTrick.trickName)}. ${f.superShortTrick.formulaPattern}. ${getStr(f.superShortTrick.executionMethod)}`;
    }

    setIsSpeaking(true);
    speech.speak(textToSpeak, lang, () => {
      setIsSpeaking(false);
    });
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const pdfBytes = await generateTopicPdf(topic, lang);
      downloadPdfBlob(pdfBytes, `JITOMNI_Adaptive_${topic.id}_${lang}.pdf`);
    } catch (err) {
      console.error('PDF error', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A1931] w-full max-w-5xl max-h-[94vh] rounded-2xl sm:rounded-3xl border border-amber-500/50 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border-b border-amber-500/30 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                {topic.subject}
              </span>
              <span className="text-xs text-slate-400 font-medium">{topic.chapter}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1">
                <span>{meta.typeIcon}</span>
                <span>{meta.typeBadge}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading tracking-wide">
              {topicName}
            </h2>
            <p className="text-xs text-amber-300/90 mt-0.5">
              ✨ <strong>Best Study Pattern:</strong> {meta.typeLabel[lang] || meta.typeLabel['en']}
            </p>
          </div>

          <button
            id="close-topic-modal"
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Action Buttons Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#071329] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="action-generate-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-amber-500/30 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Compiling PDF...' : translations.buttons.generatePdf[lang]}</span>
            </button>

            <button
              id="action-watch-video-btn"
              onClick={() => {
                console.log('Video button clicked for:', topicName);
                onOpenVideo(topic);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-red-500/30 flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{translations.buttons.watchVideo[lang]} (YouTube 360°)</span>
            </button>

            <button
              id="action-take-quiz-btn"
              onClick={() => {
                console.log('Quiz button clicked for:', topicName);
                onOpenQuiz(topic);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-emerald-500/30 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{translations.buttons.takeQuiz[lang]}</span>
            </button>

            {/* Mermaid Infographic Map only for Class 6-12 & Competitive (Forbidden for Class 1-5 / TYPE_C) */}
            {adaptive.topicType !== 'TYPE_C' && (!topic.classLevel || topic.classLevel > 5) && (
              <button
                id="action-infographic-btn"
                onClick={() => {
                  console.log('Infographic button clicked for:', topicName);
                  onOpenInfographic(topic);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md shadow-purple-500/30 flex items-center gap-1.5"
              >
                <Network className="w-4 h-4 text-amber-300" />
                <span>Mermaid Infographic Map</span>
              </button>
            )}
          </div>

          {/* Read Aloud Voice Button */}
          <button
            id="read-aloud-btn"
            onClick={handleReadAloud}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSpeaking
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? translations.buttons.stopAudio[lang] : translations.buttons.readAloud[lang]}</span>
          </button>
        </div>

        {/* Dynamic Adaptive Tabs (Type-specific) */}
        <div className="bg-[#030B1E] px-3 sm:px-6 pt-2.5 border-b border-amber-500/20 overflow-x-auto no-scrollbar flex gap-2">
          {tabs.map((tab) => {
            const isActive = activeTabKey === tab.key;
            const labelText = tab.label[lang] || tab.label['hi'] || tab.label['en'];
            return (
              <button
                key={tab.key}
                id={`adaptive-tab-${tab.key}`}
                onClick={() => {
                  speech.stop();
                  setIsSpeaking(false);
                  setActiveTabKey(tab.key);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border-t border-x ${
                  isActive
                    ? 'bg-[#0A1931] text-amber-400 border-amber-500/50 shadow-md ring-1 ring-amber-400/30'
                    : 'bg-[#061226]/60 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{labelText}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ======================================================== */}
          {/* TYPE A: MATHS & NUMERICAL TEMPLATE                       */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_A' && adaptive.typeA_Maths && (
            <>
              {activeTabKey === 'formula' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#102447] border border-amber-500/40">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-base sm:text-lg">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <h3>मास्टर सूत्र एवं मुख्य नियम (Core Mathematical Formulation)</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mb-4">
                      परीक्षा में शून्य-कन्फ्यूजन के लिए सत्यापित गणितीय नियम एवं फॉर्मूला:
                    </p>

                    <div className="space-y-3.5">
                      {adaptive.typeA_Maths.masterFormulas.map((f, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#071329] border border-slate-700/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-500/30">
                                {idx + 1}
                              </span>
                              <span>{getStr(f.name)}</span>
                            </h4>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#030B1E] border border-amber-500/30 text-amber-300 font-mono text-xs sm:text-sm font-bold">
                            {f.formula}
                          </div>

                          <p className="text-slate-300 text-xs sm:text-sm">{getStr(f.explanation)}</p>

                          <div className="text-xs text-cyan-300 font-mono bg-cyan-950/30 p-2 rounded border border-cyan-500/20">
                            <strong>उदाहरण:</strong> {f.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'trick' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#102447] via-[#0A1931] to-[#071329] border border-blue-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-base sm:text-lg">
                      <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <h3>{getStr(adaptive.typeA_Maths.jitomniSpeedTrick.title)}</h3>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs sm:text-sm">
                      <span className="font-bold text-amber-400 block mb-1">⚡ 10s मेंटल लॉजिक:</span>
                      {adaptive.typeA_Maths.jitomniSpeedTrick.trickFormulaOrLogic}
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        स्पीड एग्जीक्यूशन स्टेप्स:
                      </h4>
                      {adaptive.typeA_Maths.jitomniSpeedTrick.steps.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#030B1E] border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                            ✓
                          </span>
                          <span>{getStr(step)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                      <span>⏱️ {adaptive.typeA_Maths.jitomniSpeedTrick.timeSavings}</span>
                      <span className="font-bold text-amber-400">{getStr(adaptive.typeA_Maths.jitomniSpeedTrick.proTip)}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'examples' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4">
                    {adaptive.typeA_Maths.stepExamples.map((ex, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#102447]/80 border border-emerald-500/40 space-y-3">
                        <h4 className="font-bold text-white text-sm sm:text-base text-emerald-400">
                          {getStr(ex.problem)}
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-3 pt-2">
                          <div className="p-3.5 rounded-xl bg-[#071329] border border-slate-700/80 space-y-1.5">
                            <span className="text-xs font-bold text-slate-400 block">पारंपरिक स्टेप्स:</span>
                            {ex.basicMethodSteps.map((s, i) => (
                              <p key={i} className="text-xs text-slate-300">
                                • {getStr(s)}
                              </p>
                            ))}
                          </div>

                          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                            <span className="text-xs font-bold text-emerald-400 block">⚡ JITOMNI 10s शॉर्टकट:</span>
                            <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                              {getStr(ex.trickMethodStep)}
                            </p>
                            <div className="pt-2 text-xs font-bold text-amber-300">
                              🎯 उत्तर: {ex.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabKey === 'pyq' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-3.5">
                    {adaptive.typeA_Maths.pyqPractice.map((p, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#071329] border border-purple-500/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
                            {p.examTag}
                          </span>
                          <span className="text-xs text-slate-400">Question #{idx + 1}</span>
                        </div>

                        <h4 className="font-bold text-white text-sm sm:text-base">{getStr(p.question)}</h4>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {p.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl text-xs font-bold text-center border ${
                                oIdx === p.correctIndex
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 ring-1 ring-emerald-400'
                                  : 'bg-[#030B1E] text-slate-300 border-slate-800'
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                          <strong>हल व शॉर्ट ट्रिक:</strong> {getStr(p.trickExplanation)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabKey === 'mermaid' && adaptive.mermaidInfographic && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <MermaidDiagram
                    code={adaptive.mermaidInfographic.diagramCode}
                    title={getStr(adaptive.mermaidInfographic.title)}
                  />
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TYPE C: KIDS & STORY TEMPLATE (CLASS 1-5)                */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_C' && adaptive.typeC_Kids && (
            <>
              {activeTabKey === 'story' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1b1a3d] via-[#102447] to-[#0A1931] border border-amber-400/50 shadow-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">📖</span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-amber-300 font-heading">
                          {getStr(adaptive.typeC_Kids.story.title)}
                        </h3>
                        <p className="text-xs text-pink-300">बाल कहानी एवं नैतिक सीख (Illustrated Story)</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <span className="font-bold text-amber-300 block mb-1">पात्र (Characters in Story):</span>
                      {adaptive.typeC_Kids.story.characters.join(' • ')}
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#071329]/90 border border-slate-700 text-slate-100 text-sm sm:text-base leading-relaxed space-y-2">
                      {getStr(adaptive.typeC_Kids.story.narrative)}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
                      <span className="text-xl">🌟</span>
                      <div>
                        <span className="font-bold text-emerald-300 block mb-0.5">नैतिक सीख (Moral of the Story):</span>
                        {getStr(adaptive.typeC_Kids.story.moralLesson)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'visual' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1a1236] to-[#071329] border border-pink-500/40 text-center space-y-4">
                    <div className="text-4xl sm:text-5xl py-2 tracking-widest animate-bounce" style={{ animationDuration: '4s' }}>
                      {adaptive.typeC_Kids.visualCartoon.visualEmojiScene}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-pink-300">
                      {getStr(adaptive.typeC_Kids.visualCartoon.visualDesc)}
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-3 text-left pt-2">
                      {adaptive.typeC_Kids.visualCartoon.keyLabels.map((lbl, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-[#030B1E] border border-slate-800 space-y-1">
                          <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                            <span className="text-lg">{lbl.icon}</span>
                            <span>{lbl.name}</span>
                          </div>
                          <p className="text-xs text-slate-300">{lbl.funFact}</p>
                        </div>
                      ))}
                    </div>

                    {adaptive.mermaidInfographic && (
                      <div className="pt-4 text-left">
                        <MermaidDiagram
                          code={adaptive.mermaidInfographic.diagramCode}
                          title={getStr(adaptive.mermaidInfographic.title)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTabKey === 'activity' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#102447] border border-emerald-500/40 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-base sm:text-lg">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <h3>{getStr(adaptive.typeC_Kids.funActivity.activityName)}</h3>
                    </div>

                    <div className="space-y-2">
                      {getArr(adaptive.typeC_Kids.funActivity.steps).map((s, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#071329] border border-slate-800 text-xs sm:text-sm text-slate-200">
                          {s}
                        </div>
                      ))}
                    </div>

                    {/* Fun Riddle Card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-400/50 space-y-2">
                      <span className="text-xs font-bold text-amber-300 block">🧠 मज़ेदार पहेली (Solve the Riddle):</span>
                      <p className="text-sm font-bold text-white">{getStr(adaptive.typeC_Kids.funActivity.funRiddle.question)}</p>
                      <div className="p-2.5 rounded-xl bg-black/40 text-xs text-amber-200">
                        {getStr(adaptive.typeC_Kids.funActivity.funRiddle.answer)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'quiz' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-3.5">
                    {adaptive.typeC_Kids.kidsQuiz.map((q, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#071329] border border-purple-500/40 space-y-3">
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                          <span className="text-amber-400">❓</span>
                          <span>{getStr(q.question)}</span>
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {q.emojiOptions.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border ${
                                oIdx === q.correctIndex
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                                  : 'bg-[#030B1E] text-slate-300 border-slate-800'
                              }`}
                            >
                              <span className="text-lg">{opt.emoji}</span>
                              <span>{opt.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-bold">
                          🎉 {q.funCelebration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TYPE B: SCIENCE & THEORY TEMPLATE                        */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_B' && adaptive.typeB_Science && (
            <>
              {activeTabKey === 'concept' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#102447] border border-blue-500/40 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-blue-300">
                      {getStr(adaptive.typeB_Science.coreConcept.title)}
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                      {getStr(adaptive.typeB_Science.coreConcept.summary)}
                    </p>

                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm text-blue-200">
                      <span className="font-bold text-amber-300 block mb-1">💡 वैज्ञानिक उपमा (Everyday Analogy):</span>
                      {getStr(adaptive.typeB_Science.coreConcept.scientificAnalogy)}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'mermaid' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <MermaidDiagram
                    code={adaptive.typeB_Science.mermaidDiagram.code}
                    title={getStr(adaptive.typeB_Science.mermaidDiagram.title)}
                  />
                  <div className="p-4 rounded-xl bg-[#071329] border border-slate-800 text-xs sm:text-sm text-slate-300">
                    <span className="font-bold text-cyan-400 block mb-1">डायग्राम विश्लेषण:</span>
                    {getStr(adaptive.typeB_Science.mermaidDiagram.explanation)}
                  </div>
                </div>
              )}

              {activeTabKey === 'process' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-3">
                    {adaptive.typeB_Science.stepProcess.stages.map((stg) => (
                      <div key={stg.stageNumber} className="p-4 rounded-2xl bg-[#071329] border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">
                            {stg.stageNumber}
                          </span>
                          <span>{getStr(stg.name)}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200">{getStr(stg.details)}</p>
                        {stg.inputsOutputs && (
                          <div className="text-[11px] font-mono text-amber-300 bg-black/40 p-1.5 rounded">
                            {stg.inputsOutputs}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabKey === 'realLife' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#102447] border border-purple-500/40 space-y-3">
                    <h3 className="font-bold text-purple-300 text-base sm:text-lg">दैनिक जीवन व उद्योगों में अनुप्रयोग</h3>
                    <div className="space-y-2">
                      {getArr(adaptive.typeB_Science.realApplication.everydayUses).map((u, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#071329] border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                          <span className="text-purple-400 font-bold">✓</span>
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TYPE D: HISTORY & POLITY (TIMELINE & MNEMONIC)           */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_D' && adaptive.typeD_HistoryGK && (
            <>
              {activeTabKey === 'timeline' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <MermaidDiagram
                    code={adaptive.typeD_HistoryGK.timelineMermaid.code}
                    title={getStr(adaptive.typeD_HistoryGK.timelineMermaid.title)}
                  />
                  <div className="space-y-2.5">
                    {adaptive.typeD_HistoryGK.timelineMermaid.keyMilestones.map((m, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#071329] border border-slate-800 flex items-start gap-3">
                        <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold shrink-0">
                          {m.yearOrEra}
                        </span>
                        <div>
                          <h5 className="font-bold text-white text-xs sm:text-sm">{getStr(m.event)}</h5>
                          <p className="text-xs text-slate-400">{getStr(m.impact)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabKey === 'mnemonic' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {adaptive.typeD_HistoryGK.mnemonicTricks.map((m, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#102447] border border-purple-500/40 space-y-3">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                        {m.trickPhrase}
                      </span>
                      <p className="text-slate-200 text-xs sm:text-sm">{getStr(m.meaning)}</p>

                      <div className="grid sm:grid-cols-2 gap-2 pt-2">
                        {m.breakdown.map((b, bIdx) => (
                          <div key={bIdx} className="p-2.5 rounded-xl bg-[#071329] border border-slate-800 text-xs flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
                              {b.letterOrWord}
                            </span>
                            <span className="text-slate-200">{b.standsFor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTabKey === 'facts' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#071329] border border-blue-500/40 space-y-3">
                    <h3 className="font-bold text-blue-400 text-base sm:text-lg">
                      {getStr(adaptive.typeD_HistoryGK.keyFactsBreakdown.title)}
                    </h3>
                    <div className="space-y-2">
                      {getArr(adaptive.typeD_HistoryGK.keyFactsBreakdown.bulletFacts).map((f, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#030B1E] border border-slate-800 text-xs sm:text-sm text-slate-200">
                          • {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'pyq' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {adaptive.typeD_HistoryGK.examPyqFocus.pyqQuestions.map((q, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#071329] border border-rose-500/40 space-y-3">
                      <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                        {q.examTag}
                      </span>
                      <h4 className="font-bold text-white text-sm sm:text-base">{getStr(q.question)}</h4>
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                        {getStr(q.explanation)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TYPE E: REASONING & LOGIC TEMPLATE                       */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_E' && adaptive.typeE_Reasoning && (
            <>
              {activeTabKey === 'logic' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#102447] border border-indigo-500/40 space-y-3">
                    <h3 className="font-bold text-indigo-300 text-base sm:text-lg">
                      {getStr(adaptive.typeE_Reasoning.logicRules.title)}
                    </h3>
                    <div className="space-y-3">
                      {adaptive.typeE_Reasoning.logicRules.fundamentalRules.map((r) => (
                        <div key={r.ruleNumber} className="p-3.5 rounded-xl bg-[#071329] border border-slate-800 space-y-1">
                          <h5 className="font-bold text-white text-xs sm:text-sm">नियम {r.ruleNumber}: {getStr(r.rule)}</h5>
                          {r.exceptionNote && (
                            <p className="text-xs text-amber-300">{getStr(r.exceptionNote)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'trick' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#071329] border border-amber-500/40 space-y-3">
                    <h3 className="font-bold text-amber-400 text-base sm:text-lg">
                      {getStr(adaptive.typeE_Reasoning.speedTrick10s.title)}
                    </h3>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-mono">
                      {adaptive.typeE_Reasoning.speedTrick10s.formulaOrPattern}
                    </div>
                    <div className="space-y-2">
                      {adaptive.typeE_Reasoning.speedTrick10s.mentalSteps.map((s, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-[#030B1E] border border-slate-800 text-xs text-slate-200">
                          {getStr(s)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'mermaid' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <MermaidDiagram
                    code={adaptive.typeE_Reasoning.mermaidVisualMap.code}
                    title={getStr(adaptive.typeE_Reasoning.mermaidVisualMap.title)}
                  />
                </div>
              )}

              {activeTabKey === 'drills' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {adaptive.typeE_Reasoning.practiceDrills5Level.map((d, i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#071329] border border-emerald-500/40 space-y-3">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                        {d.difficulty}
                      </span>
                      <h4 className="font-bold text-white text-sm sm:text-base">{getStr(d.question)}</h4>
                      <div className="p-2.5 rounded-xl bg-black/40 text-xs text-emerald-300">
                        {getStr(d.speedExplanation)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* TYPE F: COMPETITIVE PYQ HEAVY TEMPLATE                   */}
          {/* ======================================================== */}
          {adaptive.topicType === 'TYPE_F' && adaptive.typeF_Competitive && (
            <>
              {activeTabKey === 'trend' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#102447] border border-blue-500/40 space-y-3">
                    <h3 className="font-bold text-blue-300 text-base sm:text-lg">10-वर्षीय परीक्षा रुझान व वेटेज</h3>
                    <p className="text-xs sm:text-sm text-slate-300">{getStr(adaptive.typeF_Competitive.pyq10YearTrend.trendSummary)}</p>

                    <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                      {adaptive.typeF_Competitive.pyq10YearTrend.examFrequency.map((ef, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#071329] border border-slate-800 text-xs flex justify-between">
                          <span className="font-bold text-white">{ef.exam}</span>
                          <span className="text-amber-300">{ef.frequency} ({ef.marksWeightage})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabKey === 'trick' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-[#071329] border border-amber-500/40 space-y-3">
                    <h3 className="font-bold text-amber-400 text-base sm:text-lg">
                      {getStr(adaptive.typeF_Competitive.superShortTrick.trickName)}
                    </h3>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-mono font-bold">
                      {adaptive.typeF_Competitive.superShortTrick.formulaPattern}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200">{getStr(adaptive.typeF_Competitive.superShortTrick.executionMethod)}</p>
                  </div>
                </div>
              )}

              {activeTabKey === 'formula' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-3">
                    {adaptive.typeF_Competitive.masterFormulaConcept.formulas.map((f, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#071329] border border-slate-800 space-y-2">
                        <h4 className="font-bold text-white text-sm">{getStr(f.name)}</h4>
                        <div className="p-2 rounded bg-black/40 text-amber-300 font-mono text-xs">{f.formula}</div>
                        <p className="text-xs text-slate-300">{getStr(f.whereUsed)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabKey === 'pyq' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {adaptive.typeF_Competitive.solvedPyqBank.map((pyq, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#071329] border border-emerald-500/40 space-y-3">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                        {pyq.examYear}
                      </span>
                      <h4 className="font-bold text-white text-sm sm:text-base">{getStr(pyq.question)}</h4>
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                        <strong>JITOMNI शॉर्टकट:</strong> {getStr(pyq.jitomniShortcutSolution)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#030B1E] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300">2-Agent Adaptive 360° Engine Active ({adaptive.topicType})</span>
          </div>
          <button
            id="modal-close-bottom-btn"
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold transition-all"
          >
            {translations.buttons.close[lang]}
          </button>
        </div>
      </div>
    </div>
  );
};
