import React, { useState } from 'react';
import { Language, ITITabSection } from '../types';
import {
  ITI_TRADES_DATA,
  ITI_GOVT_JOBS_ROADMAP,
  ITI_WORKSHOP_TOOLS,
  ITI_MOCK_TEST_QUESTIONS,
  ITI_BHARAT_SKILLS_DATA,
  ITI_CONTRACTOR_LICENSES_DATA,
  ITI_WORKSHOP_FORMULAS_DATA,
  ITITrade,
  ITIGovtExamRoadmap,
  ITIWorkshopTool
} from '../data/itiData';
import {
  Wrench,
  Zap,
  HardHat,
  Award,
  BookOpen,
  Compass,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Building2,
  Briefcase,
  Layers,
  Search,
  Flame,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Scale,
  Clock,
  HelpCircle,
  PlayCircle,
  FileText,
  ExternalLink,
  Calculator,
  Download
} from 'lucide-react';

interface ITIModuleProps {
  lang: Language;
}

export const ITIModule: React.FC<ITIModuleProps> = ({ lang }) => {
  const [activeSection, setActiveSection] = useState<ITITabSection>('overview');
  const [selectedTrade, setSelectedTrade] = useState<ITITrade>(ITI_TRADES_DATA[0]);
  const [tradeSearch, setTradeSearch] = useState('');
  const [selectedGovtJob, setSelectedGovtJob] = useState<ITIGovtExamRoadmap>(ITI_GOVT_JOBS_ROADMAP[0]);
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('All');
  
  // Mock test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredTrades = ITI_TRADES_DATA.filter(t => 
    t.name[lang]?.toLowerCase().includes(tradeSearch.toLowerCase()) ||
    t.name.hi.toLowerCase().includes(tradeSearch.toLowerCase()) ||
    t.code.toLowerCase().includes(tradeSearch.toLowerCase())
  );

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
  };

  const calculateScore = () => {
    let score = 0;
    ITI_MOCK_TEST_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="w-full bg-[#000000] text-slate-100 min-h-screen pb-20">
      {/* Hero Banner with Golden Sovereign Styling */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0B1528] via-[#050C1B] to-[#000000] border-b border-[#FFD700]/30 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD700]/15 text-[#FFD700] font-bold text-xs border border-[#FFD700]/40">
              <HardHat className="w-4 h-4 text-[#FFD700] animate-bounce" />
              <span>SKILL INDIA • NCVT/SCVT • DGT CRAFTSMEN TRAINING (CTS) • 100% PRACTICAL MASTER</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF] font-heading tracking-tight">
              ITI महा-हब: ए टू जेड संपूर्ण गाइड (A to Z)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              औद्योगिक प्रशिक्षण संस्थान (ITI) के समस्त इंजीनियरिंग व नॉन-इंजीनियरिंग ट्रेड्स: <strong>इलेक्ट्रीशियन, फिटर, वेल्डर, कोपा, डीजल मैकेनिक</strong>, <strong>रेलवे ALP व टेक्नीशियन ग्रेड-3</strong>, <strong>NAPS अप्रेंटिसशिप</strong>, <strong>CITS इंस्ट्रक्टर रोडमैप</strong> एवं <strong>NCVT CBT मॉक टेस्ट</strong>।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <button
              onClick={() => setActiveSection('trades_directory')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-500 to-[#FFD700] text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-slate-950" />
              <span>🛠️ टॉप ट्रेड्स डायरेक्टरी</span>
            </button>
            <button
              onClick={() => setActiveSection('govt_jobs_railway')}
              className="px-5 py-3 rounded-2xl bg-[#08152B] hover:bg-[#0E2244] text-[#00D4FF] font-bold text-xs sm:text-sm border border-[#00D4FF]/40 transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#00D4FF]" />
              <span>🚆 रेलवे ALP व सरकारी नौकरियां</span>
            </button>
            <button
              onClick={() => setActiveSection('cbt_mock_tests')}
              className="px-5 py-3 rounded-2xl bg-[#041F12] hover:bg-[#072F1C] text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition-all flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <span>🏆 NCVT CBT टेस्ट एरीना</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Secondary Navigation Bar */}
      <div className="bg-[#030B1E] border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'overview', label: '🌟 ओवरव्यू व करियर लैडर', icon: '⚡' },
            { id: 'trades_directory', label: '🛠️ टॉप ट्रेड्स सिलेबस (SOP)', icon: '🔧' },
            { id: 'apprenticeship_naps', label: '📜 NAPS अप्रेंटिसशिप पोर्टल', icon: '🏛️' },
            { id: 'govt_jobs_railway', label: '🚆 रेलवे ALP व PSU भर्ती', icon: '🎖️' },
            { id: 'workshop_tools_safety', label: '🧰 वर्कशॉप टूल्स व 5S सुरक्षा', icon: '📏' },
            { id: 'cits_instructor', label: '🎓 CITS इंस्ट्रक्टर ट्रेनिंग', icon: '👨‍🏫' },
            { id: 'cbt_mock_tests', label: '🏆 NCVT CBT मॉक टेस्ट', icon: '🎯' },
            { id: 'salary_career', label: '💰 सैलरी व करियर ग्रोथ मैट्रिक्स', icon: '📈' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as ITITabSection)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 border border-amber-400/60 font-black'
                  : 'bg-black/60 text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">

        {/* SECTION 1: OVERVIEW & CAREER LADDER */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Quick 4 Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveSection('trades_directory')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1202] to-[#0D0901] border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 w-fit mb-3">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  10+ इंजीनियरिंग ट्रेड्स
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  इलेक्ट्रीशियन, फिटर, वेल्डर, टर्नर, डीजल मैकेनिक का 2-वर्षीय सेमेस्टर सिलेबस।
                </p>
                <div className="mt-3 flex items-center text-xs text-amber-400 font-bold gap-1">
                  <span>ट्रेड्स एक्सप्लोर करें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('apprenticeship_naps')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#061A28] to-[#020A12] border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors">
                  NAPS रेलवे अप्रेंटिसशिप
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  रेलवे ग्रुप-D में 20% कोटा, ₹8,000-₹12,000/माह स्टाइपेंड व नेशनल अप्रेंटिसशिप सर्टिफिकेट (NAC)।
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-400 font-bold gap-1">
                  <span>NAPS गाइड खोलें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('govt_jobs_railway')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#031811] to-[#020D09] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                  RRB ALP व PSU नौकरियां
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  ISRO, DRDO, BARC, BHEL, बिजली विभाग व लोको पायलट का पूरा एग्जाम पैटर्न व तैयारी रोडमैप।
                </p>
                <div className="mt-3 flex items-center text-xs text-emerald-400 font-bold gap-1">
                  <span>सरकारी रोडमैप देखें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('cits_instructor')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#1C0521] to-[#0D020F] border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 w-fit mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-purple-400 transition-colors">
                  CITS इंस्ट्रक्टर ट्रेनिंग
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  NSTI से 1-वर्षीय CITS कोर्स करके सरकारी ITI में ट्रेनिंग ऑफिसर (TO/अनुदेशक - ₹35,400 बेसिक) बनें।
                </p>
                <div className="mt-3 flex items-center text-xs text-purple-400 font-bold gap-1">
                  <span>CITS प्रक्रिया देखें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* ITI Career Progression Ladder Infographic Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1528] via-[#051124] to-[#0B1528] border-2 border-[#FFD700]/40 shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold border border-[#FFD700]/40">
                      <TrendingUp className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>THE ITI GOLDEN CAREER LADDER</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                      10वीं के बाद ITI से सुपर-टेक्नीशियन व उद्योगपति बनने का सफर
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">चरण 1 (Age 15-17)</div>
                    <h4 className="text-sm font-bold text-white">10th पास + ITI दाखिला</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      NCVT मान्यता प्राप्त संस्थान से इलेक्ट्रीशियन/फिटर ट्रेड में 2 वर्ष का व्यावहारिक प्रशिक्षण।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-cyan-400 font-bold">चरण 2 (Age 17-18)</div>
                    <h4 className="text-sm font-bold text-white">1-Year NAPS अप्रेंटिस</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      रेलवे, भेल, टाटा मोटर्स या मारुति में लाइव प्लांट ट्रेनिंग + ₹10,000/माह स्टाइपेंड + NAC सर्टिफिकेट।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold">चरण 3 (Age 18-20)</div>
                    <h4 className="text-sm font-bold text-white">सरकारी या MNC में प्रवेश</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      RRB ALP (लोको पायलट), ISRO तकनीशियन या L&T/Schneider में ₹30,000 - ₹55,000/माह इन-हैंड।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-purple-400 font-bold">चरण 4 (Age 20-22)</div>
                    <h4 className="text-sm font-bold text-white">CITS या लेटरल डिप्लोमा</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      NSTI से CITS करके ITI अनुदेशक (TO) बनें या सीधे पॉलिटेक्निक द्वितीय वर्ष में प्रवेश लें।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-rose-400 font-bold">चरण 5 (Age 23+)</div>
                    <h4 className="text-sm font-bold text-white">वर्कशॉप या कांट्रेक्टर फर्म</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      'A' क्लास इलेक्ट्रिकल कांट्रेक्टर लाइसेंस या CNC फैब्रिकेशन यूनिट स्थापित करके ₹1 लाख+/माह कमाई।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NCVT vs SCVT Comparison Matrix */}
            <div className="p-6 rounded-2xl bg-[#07132B] border border-slate-800 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>NCVT बनाम SCVT: अंतर व मान्यता की सच्चाई</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/50 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">NCVT (राष्ट्रीय स्तर)</span>
                    <span className="text-slate-400">National Council for Vocational Training</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>DGT (कौशल विकास एवं उद्यमिता मंत्रालय, भारत सरकार) द्वारा संचालित।</li>
                    <li><strong>100% ऑल इंडिया व इंटरनेशनल मान्यता</strong> (खाड़ी देश, यूरोप, रेलवे, इसरो, डीआरडीओ)।</li>
                    <li>ऑनलाइन CBT परीक्षा एवं <strong>Bharat Skills / NIMI</strong> मानकीकृत पाठ्यक्रम।</li>
                    <li>प्रमाण पत्र: <strong>National Trade Certificate (NTC)</strong>।</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-bold">SCVT (राज्य स्तर)</span>
                    <span className="text-slate-400">State Council for Vocational Training</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>संबंधित राज्य सरकार के तकनीकी शिक्षा विभाग द्वारा संचालित।</li>
                    <li>राज्य स्तरीय सरकारी नौकरियों व स्थानीय उद्योगों में मान्य।</li>
                    <li>कुछ केंद्रीय भर्तियों में NCVT अनिवार्य होता है, हालांकि SCVT वाले NCVT अप्रेंटिस करके बराबर हो सकते हैं।</li>
                    <li>प्रमाण पत्र: <strong>State Trade Certificate (STC)</strong>।</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: TOP TRADES DIRECTORY */}
        {activeSection === 'trades_directory' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Search & Trade Selector Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#030B1E] border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={tradeSearch}
                  onChange={(e) => setTradeSearch(e.target.value)}
                  placeholder="ट्रेड खोजें (उदा. Electrician, Fitter)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                {filteredTrades.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrade(t)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedTrade.id === t.id
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-black/60 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.name[lang] || t.name.hi}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Trade Detailed View */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/40">
                      {selectedTrade.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/40">
                      {selectedTrade.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                      {selectedTrade.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                    <span className="text-4xl">{selectedTrade.icon}</span>
                    <span>{selectedTrade.name[lang] || selectedTrade.name.hi}</span>
                  </h2>
                  <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {selectedTrade.overview[lang] || selectedTrade.overview.hi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs space-y-1.5 w-full sm:w-auto shrink-0">
                  <div className="text-slate-400 font-medium">पात्रता (Eligibility):</div>
                  <div className="text-amber-300 font-bold">{selectedTrade.eligibility}</div>
                  <div className="text-slate-400 font-medium mt-2">सर्टिफिकेशन:</div>
                  <div className="text-emerald-400 font-bold">{selectedTrade.certification}</div>
                </div>
              </div>

              {/* Core Syllabus Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>सेमेस्टर-वाइज आधिकारिक सिलेबस व प्रैक्टिकल SOPs</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTrade.coreSyllabus.map((syl, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                      <div className="text-sm font-black text-amber-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>{syl.semesterOrYear}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-cyan-400">📖 ट्रेड थ्योरी (Trade Theory):</div>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {syl.tradeTheory.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-emerald-400">🛠️ वर्कशॉप प्रैक्टिकल (Trade Practical):</div>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {syl.tradePractical.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-900">
                        <div className="text-[11px] font-bold text-purple-400">📐 WCS एवं इंजीनियरिंग ड्राइंग:</div>
                        <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                          {syl.workshopCalcScience.concat(syl.engineeringDrawingOrIT).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Equipment Matrix */}
              <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>मुख्य उपकरण व टेस्टिंग किट (Key Tools & Instruments):</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrade.keyToolsAndEquipment.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-700 font-mono">
                      ⚙️ {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#061A28] to-[#020A12] border border-cyan-500/30 space-y-2">
                  <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>सरकारी नौकरियां (Govt & PSUs)</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {selectedTrade.govtJobOpportunities.map((job, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{job}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A1202] to-[#0D0901] border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>प्राइवेट व MNC नौकरियां</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {selectedTrade.privateSectorJobs.map((pjob, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{pjob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#031811] to-[#020D09] border border-emerald-500/30 space-y-2">
                  <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>स्व-रोजगार व बिजनेस (Self Employment)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedTrade.selfEmploymentPotential[lang] || selectedTrade.selfEmploymentPotential.hi}
                  </p>
                  <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400 font-mono font-bold">
                    💰 फ्रेशर स्टाइपेंड: {selectedTrade.averageSalary.freshApprentice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: NAPS APPRENTICESHIP PORTAL */}
        {activeSection === 'apprenticeship_naps' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1528] via-[#051124] to-[#0B1528] border-2 border-cyan-500/40 shadow-2xl space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>DGT & MINISTRY OF SKILL DEVELOPMENT (MSDE)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    National Apprenticeship Promotion Scheme (NAPS) मास्टर गाइड
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    ITI पास करने के बाद 1 वर्ष की अप्रेंटिसशिप अनिवार्य मील का पत्थर है। इससे <strong>National Apprenticeship Certificate (NAC)</strong> मिलता है और रेलवे में <strong>20% कोटा</strong> प्राप्त होता है।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 text-center w-full lg:w-auto">
                  <div className="text-xs text-slate-400">आधिकारिक पोर्टल (Official Link):</div>
                  <a
                    href="https://www.apprenticeshipindia.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-cyan-300 hover:underline font-mono"
                  >
                    apprenticeshipindia.gov.in ↗
                  </a>
                </div>
              </div>

              {/* Step-by-Step Registration Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold">स्टेप 1: कैंडिडेट रजिस्ट्रेशन</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    पोर्टल पर Candidate Login पर जाएं। आधार नंबर, मोबाइल, ईमेल व 10th/ITI मार्कशीट अपलोड करें।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold">स्टेप 2: e-KYC व प्रोफाइल 100%</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Aadhaar OTP से e-KYC पूरा करें। बैंक खाता विवरण भरें ताकि सरकार का DBT स्टाइपेंड सीधे खाते में आए।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold">स्टेप 3: अपॉर्चुनिटी सर्च व अप्लाई</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Railway RRC, BHEL, DRDO, IOCL या Maruti Suzuki सर्च करें और 1-क्लिक में अप्रेंटिस कॉन्ट्रैक्ट सबमिट करें।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-purple-400 font-bold">स्टेप 4: AITT एग्जाम व NAC</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1 साल बाद ऑल इंडिया ट्रेड टेस्ट (AITT) दें और जीवन भर मान्य National Apprenticeship Certificate डाउनलोड करें।
                  </p>
                </div>
              </div>

              {/* Railway Special Apprentice Benefits Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1A0B05] via-[#2A1005] to-[#1A0B05] border border-amber-500/40 space-y-3">
                <h3 className="text-base font-black text-amber-300 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>भारतीय रेलवे में अप्रेंटिस (CCAA) के 3 महा-लाभ:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-amber-500/20">
                    <strong className="text-white block mb-1">1. 20% सीधा आरक्षण (Quota):</strong>
                    <span className="text-slate-300">रेलवे ग्रुप-D (Level-1) की हर भर्ती में 20% पद सिर्फ रेलवे एक्ट अप्रेंटिस के लिए आरक्षित रहते हैं।</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-amber-500/20">
                    <strong className="text-white block mb-1">2. 1/3 मार्क्स का NCVT वेटेज:</strong>
                    <span className="text-slate-300">CBT परीक्षा में आपके NCVT अप्रेंटिस के 1/3 अंक सीधे जुड़ते हैं, जिससे कटऑफ बहुत कम जाती है।</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-amber-500/20">
                    <strong className="text-white block mb-1">3. PET (दौड़/फिजिकल) से 100% छूट:</strong>
                    <span className="text-slate-300">रेलवे अप्रेंटिस वालों को 1 किमी दौड़ व 35 किग्रा वजन उठाने वाले फिजिकल टेस्ट से पूर्ण छूट मिलती है।</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: GOVT JOBS & RAILWAY ALP */}
        {activeSection === 'govt_jobs_railway' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Organization Selector */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 bg-[#030B1E] border border-slate-800 rounded-2xl">
              {ITI_GOVT_JOBS_ROADMAP.map(job => (
                <button
                  key={job.id}
                  onClick={() => setSelectedGovtJob(job)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedGovtJob.id === job.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-lg shadow-blue-500/30'
                      : 'bg-black/60 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{job.icon}</span>
                  <span>{job.organization.split('(')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Govt Exam Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold">{selectedGovtJob.organization}</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                    <span>{selectedGovtJob.icon}</span>
                    <span>{selectedGovtJob.postName}</span>
                  </h2>
                  <div className="text-xs text-amber-300 font-bold">
                    वेतनमान (Salary): {selectedGovtJob.salaryStructure}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-xs">
                  <div className="text-slate-400">आधिकारिक वेबसाइट:</div>
                  <div className="text-cyan-300 font-mono font-bold">{selectedGovtJob.officialPortal}</div>
                </div>
              </div>

              {/* Selection Process Flow */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>चयन प्रक्रिया (Step-by-Step Selection Stages):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {selectedGovtJob.selectionProcess.map((step, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-400 block mb-1">चरण {i + 1}:</strong>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Pattern & Syllabus Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>लिखित परीक्षा पैटर्न (Tier-1 & Non-Tech):</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedGovtJob.examPattern.tier1}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ट्रेड टेस्ट व स्किल टेस्ट (Trade Theory 100%):</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedGovtJob.examPattern.tier2TradeTest}
                  </p>
                </div>
              </div>

              {/* Winning Preparation Strategy */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#031811] via-[#05291D] to-[#031811] border border-emerald-500/40 space-y-3">
                <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>टॉप रैंकर्स की सीक्रेट तैयारी रणनीति (Success Blueprint):</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedGovtJob.preparationStrategy.map((strat, i) => (
                    <li key={i} className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: WORKSHOP TOOLS & 5S SAFETY */}
        {activeSection === 'workshop_tools_safety' && (
          <div className="space-y-8 animate-in fade-in">
            {/* 5S Industrial Methodology Spotlight Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1A051D] via-[#0E0312] to-[#1A051D] border-2 border-purple-500/40 shadow-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                  JAPANESE TOYOTA PRODUCTION SYSTEM (TPS)
                </span>
                <h2 className="text-2xl font-black text-white">
                  वर्कशॉप 5S सुरक्षा एवं उत्पादकता प्रणाली
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { s: '1S - Seiri (Sort)', desc: 'काम की और गैर-जरूरी वस्तुओं को अलग करना और कचरा हटाना।' },
                  { s: '2S - Seiton (Set in Order)', desc: 'हर औजार की निश्चित जगह तय करना (A place for everything).' },
                  { s: '3S - Seiso (Shine)', desc: 'मशीनों व वर्कशॉप फर्श की नियमित सफाई व निरीक्षण।' },
                  { s: '4S - Seiketsu (Standardize)', desc: 'सुरक्षा मानकों और कलर कोडिंग का मानकीकरण।' },
                  { s: '5S - Shitsuke (Sustain)', desc: 'स्वयं-अनुशासन और 5S नियमों का निरंतर पालन।' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-purple-500/30 text-xs space-y-1">
                    <strong className="text-purple-300 block">{item.s}</strong>
                    <p className="text-slate-400 leading-relaxed text-[11px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Precision Tools Matrix */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <span>प्रिसिजन मापक यंत्र व टेस्टिंग उपकरण (Precision Instruments)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ITI_WORKSHOP_TOOLS.map(tool => (
                  <div key={tool.id} className="p-5 rounded-2xl bg-[#030B1E] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl">{tool.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{tool.name[lang] || tool.name.hi}</h4>
                          <span className="text-[10px] font-mono text-cyan-300">{tool.category}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                        {tool.leastCountOrRating}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>उपयोग:</strong> {tool.useCase[lang] || tool.useCase.hi}
                    </p>

                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-[11px] text-red-200">
                      <strong>⚠️ सुरक्षा नियम:</strong> {tool.safetyRule[lang] || tool.safetyRule.hi}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: CITS INSTRUCTOR TRAINING */}
        {activeSection === 'cits_instructor' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#170B28] via-[#0E0519] to-[#170B28] border-2 border-purple-500/40 shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>DGT CRAFT INSTRUCTOR TRAINING SCHEME (CITS)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  ITI अनुदेशक (Training Officer / Instructor) कैसे बनें?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  यदि आप सरकारी ITI में स्थायी शिक्षक (वेतनमान: Level-6 / Level-7, ₹35,400 - ₹1,12,400 बेसिक) बनना चाहते हैं, तो <strong>CITS (Craft Instructor Training Scheme)</strong> का 1-वर्षीय डिप्लोमा अनिवार्य है।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-purple-300">1. AICET प्रवेश परीक्षा</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    हर वर्ष जून-जुलाई में DGT द्वारा All India Common Entrance Test (AICET) आयोजित होता है (75 प्रश्न ट्रेड थ्योरी + 25 प्रश्न मैथ्स/रीजनिंग)।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300">2. NSTI में 1-Year ट्रेनिंग</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    National Skill Training Institute (NSTI कानपुर, हावड़ा, मुंबई, देहरादून, चेन्नई आदि) में ट्रेनिंग मेथोडोलॉजी (TM) व एडवांस्ड प्रैक्टिकल सिखाया जाता है।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300">3. NCIC प्रमाण पत्र</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    कोर्स पूरा होने पर National Craft Instructor Certificate (NCIC) मिलता है, जिससे राज्य ITI अनुदेशक भर्तियों में आवेदन कर सकते हैं।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: NCVT CBT MOCK TESTS */}
        {activeSection === 'cbt_mock_tests' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>NCVT ऑल इंडिया CBT मॉक टेस्ट सिमुलेटर (All Trades)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Bharat Skills NIMI पैटर्न पर आधारित आधिकारिक प्रश्नोत्तरी।</p>
                </div>

                <div className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                  स्कोर: {calculateScore()} / {ITI_MOCK_TEST_QUESTIONS.length}
                </div>
              </div>

              {/* Questions Stream */}
              <div className="space-y-6">
                {ITI_MOCK_TEST_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold">
                        प्रश्न {idx + 1} • {q.trade}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {q.question[lang] || q.question.hi}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrect = q.correctAnswer === optIdx;
                        const answered = selectedAnswers[q.id] !== undefined;

                        let btnStyle = 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-400/60';
                        if (answered) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-red-950/80 text-red-200 border-red-500 font-bold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={answered}
                            onClick={() => handleAnswerSelect(q.id, optIdx)}
                            className={`p-3 rounded-xl text-xs text-left border transition-all flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="font-mono text-[11px] text-amber-400 font-bold shrink-0">
                              ({String.fromCharCode(65 + optIdx)})
                            </span>
                            <span>{opt[lang] || opt.hi}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation[q.id] && (
                      <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 space-y-1 animate-in fade-in">
                        <strong className="text-cyan-300 block">💡 विस्तृत व्याख्या (Explanation):</strong>
                        <p>{q.explanation[lang] || q.explanation.hi}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: SALARY & CAREER */}
        {activeSection === 'salary_career' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <span>ITI ट्रेड्स सैलरी एवं 5-वर्षीय ग्रोथ मैट्रिक्स</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                      <th className="p-3 font-bold">ट्रेड (Trade)</th>
                      <th className="p-3 font-bold">फ्रेश अप्रेंटिस स्टाइपेंड</th>
                      <th className="p-3 font-bold">प्राइवेट/MNC शुरुआती सैलरी</th>
                      <th className="p-3 font-bold">3-5 वर्ष अनुभवी टेक्नीशियन</th>
                      <th className="p-3 font-bold">सरकारी वेतन (7th CPC)</th>
                      <th className="p-3 font-bold">गल्फ/विदेश पैकेज</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-amber-300">⚡ Electrician</td>
                      <td className="p-3">₹8,500 - ₹12,000</td>
                      <td className="p-3">₹18,000 - ₹25,000</td>
                      <td className="p-3 text-emerald-400 font-bold">₹35,000 - ₹55,000</td>
                      <td className="p-3 text-cyan-300">Level-2/4 (₹32,000 - ₹45,000 in-hand)</td>
                      <td className="p-3 text-purple-400 font-bold">₹60,000 - ₹1,20,000 / माह</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-amber-300">🔧 Fitter</td>
                      <td className="p-3">₹8,000 - ₹11,500</td>
                      <td className="p-3">₹16,000 - ₹24,000</td>
                      <td className="p-3 text-emerald-400 font-bold">₹32,000 - ₹50,000</td>
                      <td className="p-3 text-cyan-300">Level-2 (₹30,000 - ₹42,000 in-hand)</td>
                      <td className="p-3 text-purple-400 font-bold">₹70,000 - ₹1,30,000 / माह</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-amber-300">🔥 Welder (6G / TIG)</td>
                      <td className="p-3">₹7,700 - ₹10,500</td>
                      <td className="p-3">₹20,000 - ₹30,000</td>
                      <td className="p-3 text-emerald-400 font-bold">₹40,000 - ₹70,000</td>
                      <td className="p-3 text-cyan-300">Level-2 (₹30,000 - ₹42,000 in-hand)</td>
                      <td className="p-3 text-purple-400 font-bold">₹90,000 - ₹1,80,000 / माह</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-amber-300">⚙️ Turner / Machinist CNC</td>
                      <td className="p-3">₹8,500 - ₹12,000</td>
                      <td className="p-3">₹18,000 - ₹26,000</td>
                      <td className="p-3 text-emerald-400 font-bold">₹38,000 - ₹60,000</td>
                      <td className="p-3 text-cyan-300">Level-2 (₹30,000 - ₹42,000 in-hand)</td>
                      <td className="p-3 text-purple-400 font-bold">₹80,000 - ₹1,40,000 / माह</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
