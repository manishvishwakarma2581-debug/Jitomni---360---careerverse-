import React, { useState } from 'react';
import { 
  Network, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Scale, 
  TrendingUp, 
  Users, 
  Globe2, 
  Target, 
  Layers, 
  FileText, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Maximize2,
  Copy,
  Check,
  Eye,
  BarChart3,
  Bookmark
} from 'lucide-react';
import { VisionIasInfographic, Language } from '../types';
import { MermaidDiagram } from './MermaidDiagram';
import { speakText, stopSpeaking } from '../utils/speech';

interface VisionIasInfographicCardProps {
  infographic: VisionIasInfographic;
  lang: Language;
  onNavigateTab?: (tab: string) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const VisionIasInfographicCard: React.FC<VisionIasInfographicCardProps> = ({
  infographic,
  lang,
  onNavigateTab,
  className = '',
  defaultExpanded = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'infographic' | 'matrix' | 'mains'>('infographic');
  const [diagramMode, setDiagramMode] = useState<'mermaid' | 'process'>('mermaid');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const narration = `
      ${infographic.topicTitle}.
      ${infographic.whyInNews.heading}: ${infographic.whyInNews.points.join('. ')}.
      मुख्य निष्कर्ष: आगे की राह में ${infographic.wayForward.map(w => w.title).join(', ')}.
    `;
    speakText(narration, lang);
    setIsSpeaking(true);
  };

  const handleCopySummary = () => {
    const textToCopy = `
[JITOMNI PRIME AI • 360° VISION IAS INFOGRAPHIC]
विषय: ${infographic.topicTitle}
पेपर लिंकेज: ${infographic.paperLinkage}

${infographic.whyInNews.heading}:
${infographic.whyInNews.points.map(p => `• ${p}`).join('\n')}

360° बहुआयामी आयाम:
- संवैधानिक/कानूनी: ${infographic.multidimensionalMatrix.constitutionalLegal.points.join(' ')}
- आर्थिक/संसाधन: ${infographic.multidimensionalMatrix.economicFinancial.points.join(' ')}
- सामाजिक/मानवीय: ${infographic.multidimensionalMatrix.socialHuman.points.join(' ')}
- तकनीकी/वैश्विक: ${infographic.multidimensionalMatrix.techGlobalEnvironmental.points.join(' ')}

आगे की राह:
${infographic.wayForward.map(w => `• ${w.title} (${w.agencyOrModel}): ${w.actionableStep}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className={`bg-gradient-to-b from-[#061126] via-[#0A1931] to-[#040D1E] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-300 ${className}`}>
      {/* 1. VISION IAS STYLE MAGAZINE MASTHEAD HEADER */}
      <div className="bg-gradient-to-r from-[#030919] via-[#0A1931] to-[#0D234A] border-b-2 border-amber-500/40 p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          {/* Top Ribbons & Paper Linkage */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{infographic.editionTag || 'VISION IAS STYLE 360° CRITICAL ANALYSIS'}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold text-[11px] tracking-wide">
                {infographic.paperLinkage}
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-[10px]">
                100% Demand Match
              </span>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeech}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-red-600 text-white border-red-400 animate-pulse'
                    : 'bg-[#030B1E] hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
                title="Audio Narration"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <span className="hidden sm:inline">{isSpeaking ? 'स्टॉप (Stop)' : 'बोलकर सुनो (Audio)'}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-xl bg-[#030B1E] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy Infographic Text"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span className="hidden sm:inline">{isCopied ? 'कॉपी हो गया' : 'कॉपी (Copy)'}</span>
              </button>
            </div>
          </div>

          {/* Main Headline */}
          <div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white tracking-wide leading-tight">
              {infographic.topicTitle}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-1">
              JITOMNI Sovereign Comprehensive Editorial • 360° Multidimensional Concept & Visual Matrix
            </p>
          </div>

          {/* Magazine Section Nav Tabs */}
          <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-800/80 text-xs font-bold">
            <button
              onClick={() => setActiveTab('infographic')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'infographic'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-[#030B1E] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>1. विजुअल इन्फोग्राफिक व संदर्भ (Visual Mindmap)</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-md font-black'
                  : 'bg-[#030B1E] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. 360° बहुआयामी मैट्रिक्स (4 Pillars)</span>
            </button>

            <button
              onClick={() => setActiveTab('mains')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'mains'
                  ? 'bg-emerald-600 text-white shadow-md font-black'
                  : 'bg-[#030B1E] text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>3. 15-मार्कर मेंस उत्तर आर्किटेक्ट (Mains Model)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KEY DATA POINTS & FACTS BOX (Vision IAS Fast Facts Banner) */}
      {infographic.keyDataPoints && infographic.keyDataPoints.length > 0 && (
        <div className="bg-[#030B1E] border-b border-slate-800 px-5 sm:px-7 py-3.5">
          <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>इन्फोग्राफिक मुख्य तथ्य व आंकड़े (High-Yield Key Data Points):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {infographic.keyDataPoints.map((dp, idx) => (
              <div
                key={idx}
                className="bg-[#0A1931] border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between hover:border-amber-500/50 transition-all"
              >
                <span className="text-lg sm:text-2xl font-black text-amber-400 font-mono leading-none">
                  {dp.metric}
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                  {dp.label}
                </span>
                {dp.source && (
                  <span className="text-[10px] text-slate-400 truncate mt-0.5">
                    Ref: {dp.source}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MAIN TAB CONTENT PANELS */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* TAB 1: INFOGRAPHIC & CONTEXT */}
        {activeTab === 'infographic' && (
          <div className="space-y-6">
            {/* Box: क्यों चर्चा में है (Why in News) */}
            <div className="bg-gradient-to-br from-amber-950/40 via-[#0A1931] to-[#040D1E] border-2 border-amber-500/40 rounded-2xl p-5 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{infographic.whyInNews.heading}</span>
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Vision IAS Core Trigger
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {infographic.whyInNews.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="flex-1 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mindmap / Mermaid Diagram Container */}
            <div className="bg-[#030B1E] border-2 border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="font-heading font-black text-white text-sm sm:text-base flex items-center gap-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span>360° विजुअल कॉन्सेप्ट माइंडमैप व फ्लोचार्ट (Vector Diagram)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Live interactive concept nodes showing hierarchical linkages and causality
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#0A1931] p-1 rounded-xl border border-slate-700 text-xs">
                  <button
                    onClick={() => setDiagramMode('mermaid')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      diagramMode === 'mermaid'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mermaid Vector
                  </button>
                  <button
                    onClick={() => setDiagramMode('process')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      diagramMode === 'process'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Process Flow
                  </button>
                </div>
              </div>

              {diagramMode === 'mermaid' ? (
                <div className="bg-[#071329] rounded-xl p-3 border border-slate-800 overflow-hidden">
                  <MermaidDiagram
                    code={infographic.mindmapMermaidCode}
                    title={infographic.topicTitle}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {infographic.visualProcessSteps?.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-[#0A1931] border border-blue-500/30 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-blue-400 transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 font-black text-sm flex items-center justify-center">
                        {step.stepNumber}
                      </div>
                      <h5 className="font-bold text-white text-sm">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Conceptual Cluster Cards (Node Pills) */}
            {infographic.graphicIllustrationConcept && (
              <div className="bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#030B1E] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{infographic.graphicIllustrationConcept.title}:</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Holistic Node Cluster</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {infographic.graphicIllustrationConcept.visualNodes.map((node, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl bg-gradient-to-br ${node.color} text-white shadow-md space-y-0.5 border border-white/20`}
                    >
                      <p className="font-black text-xs sm:text-sm">{node.label}</p>
                      <p className="text-[11px] text-white/80 leading-tight">{node.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 360° MULTIDIMENSIONAL MATRIX (4 PILLARS + CHALLENGES + WAY FORWARD) */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-heading font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span>360° बहुआयामी विश्लेषण मैट्रिक्स (Vision IAS 4-Pillars Analytical Matrix)</span>
              </h3>
              <p className="text-xs text-slate-400">
                प्रत्येक विषय को 4 अनिवार्य दृष्टिकोणों (विधिक, आर्थिक, सामाजिक व तकनीकी) से परखने का वैज्ञानिक मॉडल
              </p>
            </div>

            {/* 4 Multi-Dimensional Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Constitutional & Legal */}
              <div className="bg-gradient-to-br from-blue-950/60 via-[#0A1931] to-[#040D1E] border-2 border-blue-500/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Scale className="w-5 h-5 text-blue-400" />
                  <span>{infographic.multidimensionalMatrix.constitutionalLegal.title}</span>
                </div>
                <div className="space-y-2">
                  {infographic.multidimensionalMatrix.constitutionalLegal.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-blue-400 mt-1">•</span>
                      <p className="flex-1 font-medium">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Economic & Financial */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-[#0A1931] to-[#040D1E] border-2 border-emerald-500/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>{infographic.multidimensionalMatrix.economicFinancial.title}</span>
                </div>
                <div className="space-y-2">
                  {infographic.multidimensionalMatrix.economicFinancial.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-emerald-400 mt-1">•</span>
                      <p className="flex-1 font-medium">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Social & Human */}
              <div className="bg-gradient-to-br from-purple-950/60 via-[#0A1931] to-[#040D1E] border-2 border-purple-500/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>{infographic.multidimensionalMatrix.socialHuman.title}</span>
                </div>
                <div className="space-y-2">
                  {infographic.multidimensionalMatrix.socialHuman.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-purple-400 mt-1">•</span>
                      <p className="flex-1 font-medium">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Tech & Global */}
              <div className="bg-gradient-to-br from-amber-950/60 via-[#0A1931] to-[#040D1E] border-2 border-amber-500/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Globe2 className="w-5 h-5 text-amber-400" />
                  <span>{infographic.multidimensionalMatrix.techGlobalEnvironmental.title}</span>
                </div>
                <div className="space-y-2">
                  {infographic.multidimensionalMatrix.techGlobalEnvironmental.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-amber-400 mt-1">•</span>
                      <p className="flex-1 font-medium">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Critical Challenges & Roadblocks */}
            <div className="bg-gradient-to-r from-rose-950/40 via-[#0A1931] to-[#040D1E] border-2 border-rose-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-black text-rose-400 text-sm sm:text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>प्रमुख चुनौतियाँ, सीमाएं व गतिरोध (Bottlenecks & Vulnerabilities)</span>
                </h4>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                  Critical Impact
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {infographic.criticalChallenges.map((c, i) => (
                  <div key={i} className="bg-[#030B1E] border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{c.challenge}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        c.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {c.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{c.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Way Forward & Recommendations */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-[#0A1931] to-[#040D1E] border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-black text-emerald-400 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>आगे की राह व विशेषज्ञ सिफारिशें (The Way Forward & Actionable Roadmap)</span>
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  NITI Aayog / 2nd ARC
                </span>
              </div>

              <div className="space-y-2.5">
                {infographic.wayForward.map((rec, i) => (
                  <div key={i} className="bg-[#030B1E] border border-emerald-500/30 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-bold text-emerald-300 text-xs sm:text-sm">
                        {i + 1}. {rec.title}
                      </h5>
                      <span className="text-[10px] text-amber-400 font-mono bg-black/40 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                        {rec.agencyOrModel}
                      </span>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed pl-4">
                      {rec.actionableStep}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 15-MARKER MAINS & INTERVIEW BLUEPRINT */}
        {activeTab === 'mains' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-950/50 via-[#0A1931] to-[#040D1E] border-2 border-purple-500/50 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-purple-500/30">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                    UPSC / State PCS Mains Answer Architect
                  </span>
                  <h4 className="text-base sm:text-lg font-heading font-black text-white">
                    15-मार्कर मॉडल उत्तर संरचना (60%+ अंक गारंटी फ्रेमवर्क)
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white font-black text-xs shadow-md">
                  {infographic.mainsFramework.marks}
                </span>
              </div>

              {/* The Actual Question */}
              <div className="bg-black/50 border border-purple-400/40 rounded-xl p-4">
                <p className="text-xs sm:text-sm font-bold text-amber-200 leading-relaxed">
                  {infographic.mainsFramework.question}
                </p>
              </div>

              {/* 4-Step Structural Blueprint */}
              <div className="space-y-3">
                {/* 1. Introduction */}
                <div className="bg-[#030B1E] border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                      <span>प्रस्तावना (Introduction - 15% शब्द सीमा)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Context & Definition</span>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pl-6">
                    {infographic.mainsFramework.intro}
                  </p>
                </div>

                {/* 2. Multi-Dimensional Body */}
                <div className="bg-[#030B1E] border border-slate-700/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                      <span>मुख्य भाग (Multi-Dimensional Body - 70% शब्द सीमा)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Dimensions & Case Laws</span>
                  </div>
                  <div className="space-y-1.5 pl-6">
                    {infographic.mainsFramework.dimensions.map((dim, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                        <span className="text-blue-400 font-bold">•</span>
                        <p className="flex-1">{dim}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Diagram / Flowchart Tip */}
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                    <Network className="w-4 h-4 text-amber-400" />
                    <span>विजुअल फ्लोचार्ट व डायग्राम सलाह (Diagram in Mains):</span>
                  </div>
                  <p className="text-amber-100 text-xs leading-relaxed font-mono pl-5">
                    {infographic.mainsFramework.diagramTip}
                  </p>
                </div>

                {/* 4. Conclusion */}
                <div className="bg-[#030B1E] border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                      <span>निष्कर्ष (Forward-Looking Conclusion - 15% शब्द सीमा)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Constructive Vision</span>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pl-6">
                    {infographic.mainsFramework.conclusion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER CREDITS & LINKAGES */}
      <div className="p-4 sm:p-5 bg-[#030816] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>JITOMNI Sovereign 360° Academic Protocol • Verified Editorial Research Standard</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-amber-400 font-bold">
            Zero Rote Learning Guarantee
          </span>
        </div>
      </div>
    </div>
  );
};
