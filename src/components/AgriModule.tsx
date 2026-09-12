import React, { useState } from 'react';
import { 
  Sprout, 
  Leaf, 
  FlaskConical, 
  Cpu, 
  Globe2, 
  ShieldCheck, 
  Award, 
  Search, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Bug, 
  Droplets, 
  Sun, 
  Layers, 
  Compass, 
  TrendingUp, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  FileText, 
  Plane, 
  Gauge, 
  RefreshCw, 
  ExternalLink,
  Flame,
  Info,
  Bot,
  Building2,
  Tractor,
  CloudRain,
  Shield,
  Star
} from 'lucide-react';
import { Language, AgriTabSection, AgriSubject, GlobalAgriTech, CropDiseaseItem } from '../types';
import { AGRI_SUBJECTS, GLOBAL_AGRI_BENCHMARKS, CROP_DISEASES_DB, AGRI_MOCK_EXAM_QUESTIONS } from '../data/agriData';
import { JitomniEmblemLogo } from './JitomniEmblemLogo';
import { KisanSuperHub } from './agri/KisanSuperHub';
import { KisanCropGuide } from './agri/KisanCropGuide';
import { KisanGovtSchemes } from './agri/KisanGovtSchemes';
import { KisanAIMitra } from './agri/KisanAIMitra';
import { KisanMarketDemand } from './agri/KisanMarketDemand';
import { KisanWeatherWidget } from './agri/KisanWeatherWidget';
import { KisanMachineryCHC } from './agri/KisanMachineryCHC';
import { KritiFaaSModule } from './agri/KritiFaaSModule';

interface AgriModuleProps {
  lang: Language;
  onNavigateTab: (tab: any) => void;
}

export const AgriModule: React.FC<AgriModuleProps> = ({ lang, onNavigateTab }) => {
  const [activeSection, setActiveSection] = useState<AgriTabSection>('overview');
  const [selectedSubject, setSelectedSubject] = useState<AgriSubject | null>(AGRI_SUBJECTS[0]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(AGRI_SUBJECTS[0].chapters[0]?.id || '');
  const [selectedGlobalTech, setSelectedGlobalTech] = useState<GlobalAgriTech>(GLOBAL_AGRI_BENCHMARKS[0]);
  const [activeCountryFilter, setActiveCountryFilter] = useState<'All' | 'Singapore' | 'China'>('All');
  
  // Crop Doctor State
  const [selectedCropDisease, setSelectedCropDisease] = useState<CropDiseaseItem>(CROP_DISEASES_DB[0]);
  const [cropDoctorSearch, setCropDoctorSearch] = useState('');
  const [treatmentMode, setTreatmentMode] = useState<'both' | 'organic' | 'chemical'>('both');

  // Soil NPK Calculator State
  const [cropType, setCropType] = useState<'wheat' | 'paddy' | 'cotton' | 'sugarcane' | 'tomato' | 'mustard'>('wheat');
  const [acreage, setAcreage] = useState<number>(2);
  const [soilNitrogen, setSoilNitrogen] = useState<number>(220); // Low: <280 kg/ha
  const [soilPhosphorus, setSoilPhosphorus] = useState<number>(14); // Med: 11-25 kg/ha
  const [soilPotassium, setSoilPotassium] = useState<number>(180); // Med: 140-280 kg/ha
  const [soilPh, setSoilPh] = useState<number>(7.8);
  const [soilOrganicCarbon, setSoilOrganicCarbon] = useState<number>(0.45); // Low <0.5%
  const [useNanoUrea, setUseNanoUrea] = useState<boolean>(true);

  // Hydroponics Simulator State
  const [hydroEc, setHydroEc] = useState<number>(2.0);
  const [hydroPh, setHydroPh] = useState<number>(6.0);
  const [waterTemp, setWaterTemp] = useState<number>(22);
  const [lightHours, setLightHours] = useState<number>(16);

  // Exam Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Mandi Profit Calculator
  const [mandiCrop, setMandiCrop] = useState<'wheat' | 'soybean' | 'mustard' | 'paddy' | 'cotton'>('wheat');
  const [expectedYieldQuintal, setExpectedYieldQuintal] = useState<number>(22); // per acre
  const [inputCostPerAcre, setInputCostPerAcre] = useState<number>(14000);

  const cropMspData = {
    wheat: { name: 'गेहूं (Wheat)', msp: 2275, marketHigh: 2650, marketAvg: 2420, trend: '+8.4% Up' },
    soybean: { name: 'सोयाबीन (Soybean)', msp: 4892, marketHigh: 5400, marketAvg: 5120, trend: '+4.2% Steady' },
    mustard: { name: 'सरसों (Mustard/Rapeseed)', msp: 5650, marketHigh: 6200, marketAvg: 5900, trend: '+11.5% High Demand' },
    paddy: { name: 'धान (Paddy Common)', msp: 2300, marketHigh: 2550, marketAvg: 2380, trend: '+3.1% MSP Backed' },
    cotton: { name: 'कपास (Cotton Medium)', msp: 7121, marketHigh: 7800, marketAvg: 7450, trend: '+6.8% Export Bullish' },
  };

  // NPK Calculation Logic
  const calculateFertilizer = () => {
    let baseUreaBags = 2.5 * acreage;
    let baseDapBags = 1.0 * acreage;
    let baseMopBags = 0.8 * acreage;

    // Adjust based on soil test
    if (soilNitrogen < 280) baseUreaBags *= 1.25;
    else if (soilNitrogen > 560) baseUreaBags *= 0.75;

    if (soilPhosphorus < 11) baseDapBags *= 1.3;
    else if (soilPhosphorus > 25) baseDapBags *= 0.7;

    if (soilPotassium < 140) baseMopBags *= 1.25;
    else if (soilPotassium > 280) baseMopBags *= 0.7;

    const nanoBottles = useNanoUrea ? Math.round(baseUreaBags * 0.5 * 2) : 0;
    const finalUreaBags = useNanoUrea ? Math.max(1, Math.round(baseUreaBags * 0.5)) : Math.round(baseUreaBags);
    const gypsumKg = soilPh > 8.2 ? Math.round(250 * acreage) : 0;
    const zincKg = Math.round(5 * acreage);

    const costGranularOnly = Math.round(baseUreaBags * 266 + baseDapBags * 1350 + baseMopBags * 1700);
    const costWithNano = Math.round(finalUreaBags * 266 + nanoBottles * 225 + baseDapBags * 1350 + baseMopBags * 1700);
    const savings = Math.max(0, costGranularOnly - costWithNano);

    return {
      finalUreaBags,
      nanoBottles,
      dapBags: Math.round(baseDapBags),
      mopBags: Math.round(baseMopBags),
      gypsumKg,
      zincKg,
      costGranularOnly,
      costWithNano,
      savings,
    };
  };

  const fertResults = calculateFertilizer();

  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
    setIsAnswerSubmitted(true);
    if (optionIdx === AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].correctOptionIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex + 1 < AGRI_MOCK_EXAM_QUESTIONS.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const filteredGlobalTech = GLOBAL_AGRI_BENCHMARKS.filter(item => {
    if (activeCountryFilter === 'All') return true;
    return item.country === activeCountryFilter;
  });

  const filteredDiseases = CROP_DISEASES_DB.filter(d => {
    const q = cropDoctorSearch.toLowerCase();
    return (
      d.cropName.hi.toLowerCase().includes(q) ||
      d.cropName.en.toLowerCase().includes(q) ||
      d.diseaseName.hi.toLowerCase().includes(q) ||
      d.diseaseName.en.toLowerCase().includes(q)
    );
  });

  const activeChapter = selectedSubject?.chapters.find(c => c.id === selectedChapterId) || selectedSubject?.chapters[0];

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 pb-20 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="p-6 sm:p-10 bg-gradient-to-r from-[#000000] via-[#051C14] to-[#000000] border-b-2 border-[#10B981]/40 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] font-bold text-xs border border-[#10B981]/40">
              <Sprout className="w-4 h-4 text-[#10B981] animate-pulse" />
              <span>KRISHI 360° • KISAN SUPER HUB • ICAR CURRICULUM • GLOBAL AGRI-TECH</span>
            </div>

            {/* Mahi Pawar: Chief Strategic Architect & Director of Agri 360° Badge */}
            <div className="flex justify-center lg:justify-start">
              <div 
                id="agri-chief-architect-badge"
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-2 sm:py-2.5 rounded-2xl bg-[#060D17] border-2 border-[#FFD700] shadow-[0_0_22px_rgba(255,215,0,0.35)] text-white text-xs sm:text-sm font-bold tracking-wide transition-all hover:shadow-[0_0_28px_rgba(255,215,0,0.55)] max-w-full"
              >
                <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFD700] fill-[#FFD700]/25 shrink-0" />
                <span className="font-extrabold text-white text-center">
                  Mahi Pawar: Chief Strategic Architect & Director of Agri 360°
                </span>
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700] fill-[#FFD700] shrink-0" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#FFD700] to-white font-heading tracking-tight">
              कृषि 360° & किसान संपूर्ण समाधान
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              अन्नदाता व कृषि छात्रों के लिए वन-स्टॉप प्लेटफॉर्म: <strong>फसल उगाने का सही तरीका (SOP)</strong>, <strong>मार्केट डिमांड व लखपति फसलें</strong>, <strong>AI किसान मित्र (बोलकर पूछें)</strong>, <strong>60-90% सरकारी सब्सिडी</strong>, <strong>ICAR 6D सिलेबस</strong> एवं <strong>सिंगापुर/चीन स्मार्ट फार्मिंग</strong>।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <button
              onClick={() => setActiveSection('kriti_faas')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#F59E0B] to-[#D97706] text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-amber-500/30 flex items-center gap-2 border border-amber-300"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>✨ कृषि 360° (FaaS मॉडल)</span>
            </button>
            <button
              onClick={() => setActiveSection('ai_kisan_mitra')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-white font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-200" />
              <span>🎤 AI किसान मित्र (Q&A)</span>
            </button>
            <button
              onClick={() => setActiveSection('crop_calendar_guide')}
              className="px-5 py-3 rounded-2xl bg-[#031811] hover:bg-[#06291C] text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition-all flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>🌾 फसल उगाने की विधि</span>
            </button>
            <button
              onClick={() => setActiveSection('global_tech')}
              className="px-5 py-3 rounded-2xl bg-[#030B1E] hover:bg-[#07132B] text-[#FFD700] font-bold text-xs sm:text-sm border border-[#FFD700]/40 transition-all flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4 text-[#FFD700]" />
              <span>🇸🇬 🇨🇳 सिंगापुर व चीन</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-Bar */}
      <div className="bg-[#030B1E] border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'kisan_hub', label: '🌾 किसान समाधान हब', icon: '🌾' },
            { id: 'kriti_faas', label: '✨ कृषि 360° (FaaS मॉडल)', icon: '✨' },
            { id: 'crop_calendar_guide', label: '🌱 फसल वैज्ञानिक विधि (SOP)', icon: '📖' },
            { id: 'ai_kisan_mitra', label: '🤖 AI किसान मित्र (Q&A)', icon: '🎤' },
            { id: 'market_demand_profit', label: '📈 मार्केट डिमांड व मुनाफा', icon: '💰' },
            { id: 'govt_schemes', label: '🏛️ सरकारी योजना व सब्सिडी', icon: '📜' },
            { id: 'weather_advisory', label: '🌦️ लाइव मौसम व सलाह', icon: '🌧️' },
            { id: 'farm_equipment', label: '🚜 मशीनरी व AI ड्रोन', icon: '🚁' },
            { id: 'curriculum', label: '📚 ICAR 6D पाठ्यक्रम', icon: '🎓' },
            { id: 'global_tech', label: '🌏 सिंगापुर व चीन तकनीक', icon: '🚀' },
            { id: 'crop_doctor', label: '🌿 AI फसल डॉक्टर', icon: '🔬' },
            { id: 'soil_npk', label: '🧪 सॉइल NPK व नैनो खाद', icon: '🌱' },
            { id: 'hydroponics', label: '💧 हाइड्रोपोनिक्स IoT', icon: '🏙️' },
            { id: 'exam_arena', label: '🏆 ICAR/NABARD मॉक टेस्ट', icon: '🎯' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as AgriTabSection)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeSection === tab.id || (tab.id === 'kisan_hub' && activeSection === 'overview')
                  ? 'bg-gradient-to-r from-[#10B981] to-[#047857] text-white shadow-lg shadow-emerald-500/20 border border-emerald-400/50'
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

        {/* SECTION 0: KISAN SUPER HUB & OVERVIEW */}
        {(activeSection === 'overview' || activeSection === 'kisan_hub') && (
          <KisanSuperHub 
            lang={lang} 
            onNavigateSection={(sec) => setActiveSection(sec)} 
          />
        )}

        {/* SECTION: KRITI 360° (FARMING-AS-A-SERVICE FaaS) */}
        {activeSection === 'kriti_faas' && (
          <KritiFaaSModule 
            lang={lang} 
            onNavigateAgriTab={(sec) => setActiveSection(sec as any)} 
          />
        )}

        {/* SECTION 1: CROP CULTIVATION SOPS & CALENDAR */}
        {activeSection === 'crop_calendar_guide' && (
          <KisanCropGuide lang={lang} />
        )}

        {/* SECTION 2: AI KISAN MITRA (VOICE & CHAT Q&A) */}
        {activeSection === 'ai_kisan_mitra' && (
          <KisanAIMitra lang={lang} />
        )}

        {/* SECTION 3: MARKET DEMAND & HIGH PROFIT CROPS */}
        {activeSection === 'market_demand_profit' && (
          <KisanMarketDemand lang={lang} />
        )}

        {/* SECTION 4: GOVT SCHEMES & 60-90% SUBSIDY */}
        {activeSection === 'govt_schemes' && (
          <KisanGovtSchemes lang={lang} />
        )}

        {/* SECTION 5: LIVE WEATHER & AGRO ADVISORIES */}
        {activeSection === 'weather_advisory' && (
          <KisanWeatherWidget lang={lang} />
        )}

        {/* SECTION 6: FARM EQUIPMENT & DRONE RENTAL */}
        {activeSection === 'farm_equipment' && (
          <KisanMachineryCHC lang={lang} />
        )}

        {/* SECTION 2: ICAR CURRICULUM 6D FRAMEWORK */}
        {activeSection === 'curriculum' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Subject Selector Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {AGRI_SUBJECTS.map(subj => (
                <button
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj);
                    setSelectedChapterId(subj.chapters[0]?.id || '');
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    selectedSubject?.id === subj.id
                      ? 'bg-[#10B981] text-black border-emerald-300 font-black shadow-lg shadow-emerald-500/20'
                      : 'bg-[#030B1E] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{subj.icon}</span>
                  <span>{subj.name[lang] || subj.name.hi}</span>
                </button>
              ))}
            </div>

            {/* Chapters List and 6D Detail View */}
            {selectedSubject && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chapters List Column */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#030B1E] border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">{selectedSubject.code}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {selectedSubject.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-white">{selectedSubject.name[lang] || selectedSubject.name.hi}</h3>
                    <p className="text-xs text-slate-400 mt-1">{selectedSubject.description[lang] || selectedSubject.description.hi}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">अध्याय सूची (Chapters)</h4>
                    {selectedSubject.chapters.map(ch => (
                      <div
                        key={ch.id}
                        onClick={() => setSelectedChapterId(ch.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          selectedChapterId === ch.id
                            ? 'bg-gradient-to-r from-emerald-950/60 to-[#030B1E] border-emerald-500 text-white font-bold shadow-md'
                            : 'bg-[#030B1E]/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="text-xs leading-snug">{ch.title[lang] || ch.title.hi}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {ch.keyConcepts.slice(0, 2).map((kc, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {kc}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6-D Framework Content Column */}
                <div className="lg:col-span-2 space-y-4">
                  {activeChapter ? (
                    <div className="space-y-4">
                      {/* Chapter Title Header */}
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#030B1E] via-[#051C14] to-[#030B1E] border border-emerald-500/40 shadow-xl">
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>6-DIMENSIONAL 360° ACADEMIC ANALYSIS</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-white">
                          {activeChapter.title[lang] || activeChapter.title.hi}
                        </h2>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {activeChapter.keyConcepts.map((kc, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-medium">
                              #{kc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 6 Tabs / Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {/* 1. What */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-blue-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                            <span className="p-1 rounded bg-blue-500/20 text-blue-300">1</span>
                            <span>यह क्या है? (What is it?)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.what[lang] || activeChapter.framework360.what.hi}
                          </p>
                        </div>

                        {/* 2. Why */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-amber-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                            <span className="p-1 rounded bg-amber-500/20 text-amber-300">2</span>
                            <span>यह क्यों जरूरी है? (Why it matters?)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.why[lang] || activeChapter.framework360.why.hi}
                          </p>
                        </div>

                        {/* 3. How */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-emerald-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-300">3</span>
                            <span>यह कैसे काम करता है? (Mechanism / How)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.how[lang] || activeChapter.framework360.how.hi}
                          </p>
                        </div>

                        {/* 4. Application */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-purple-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                            <span className="p-1 rounded bg-purple-500/20 text-purple-300">4</span>
                            <span>कहाँ उपयोग होता है? (Applications)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.application[lang] || activeChapter.framework360.application.hi}
                          </p>
                        </div>

                        {/* 5. Challenges */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-red-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                            <span className="p-1 rounded bg-red-500/20 text-red-300">5</span>
                            <span>प्रमुख चुनौतियाँ (Key Challenges)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.challenges[lang] || activeChapter.framework360.challenges.hi}
                          </p>
                        </div>

                        {/* 6. Solution & AI Future */}
                        <div className="p-4 rounded-2xl bg-[#030B1E] border border-[#FFD700]/40 space-y-2 bg-gradient-to-br from-black to-[#0d1c14]">
                          <div className="flex items-center gap-2 text-[#FFD700] font-bold text-xs">
                            <span className="p-1 rounded bg-amber-500/20 text-[#FFD700]">6</span>
                            <span>समाधान व AI भविष्य (Future & AI)</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {activeChapter.framework360.solutionFuture[lang] || activeChapter.framework360.solutionFuture.hi}
                          </p>
                        </div>
                      </div>

                      {/* Global Benchmark Reference */}
                      {activeChapter.globalBenchmark && (
                        <div className="p-4 rounded-2xl bg-black border border-emerald-500/30 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Globe2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold text-emerald-300">Global Case Study: </span>
                              <span className="text-slate-300">{activeChapter.globalBenchmark}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveSection('global_tech')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold whitespace-nowrap"
                          >
                            Explore Tech
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: GLOBAL ADVANCED AGRI-TECH (SINGAPORE & CHINA) */}
        {activeSection === 'global_tech' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Country Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {(['All', 'Singapore', 'China'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveCountryFilter(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      activeCountryFilter === c
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#F59E0B] text-black border-amber-300 shadow-md font-black'
                        : 'bg-[#030B1E] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {c === 'Singapore' ? '🇸🇬 सिंगापुर (Singapore)' : c === 'China' ? '🇨🇳 चीन (China)' : '🌏 सभी देश (All Global)'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Showing {filteredGlobalTech.length} Breakthrough Technologies
              </div>
            </div>

            {/* Grid of Global Technologies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGlobalTech.map(tech => (
                <div
                  key={tech.id}
                  className="p-6 rounded-3xl bg-[#030B1E] border-2 border-slate-800 hover:border-emerald-500/60 transition-all shadow-xl space-y-5"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tech.flag}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tech.badgeColor}`}>
                          {tech.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {tech.title[lang] || tech.title.hi}
                      </h3>
                      <p className="text-xs text-[#00D4FF] font-medium">
                        {tech.subtitle[lang] || tech.subtitle.hi}
                      </p>
                    </div>
                    <span className="text-3xl p-2 rounded-2xl bg-black/50 border border-slate-800">{tech.icon}</span>
                  </div>

                  {/* Core Mechanism */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-[#FFD700] block mb-1">⚙️ कार्य प्रणाली (Core Mechanism):</strong>
                    {tech.coreMechanism[lang] || tech.coreMechanism.hi}
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {tech.keyMetrics.map((km, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#051224] border border-slate-800/80">
                        <div className="text-[10px] text-slate-400 font-medium">{km.label}</div>
                        <div className="text-sm font-black text-emerald-400">{km.value}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5">{km.impact}</div>
                      </div>
                    ))}
                  </div>

                  {/* India Replication Blueprint */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#061F13] to-[#020A06] border border-emerald-500/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>🇮🇳 भारत में कैसे लागू करें (India Blueprint):</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {tech.indiaReplicationStrategy[lang] || tech.indiaReplicationStrategy.hi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: AI CROP DOCTOR & PEST DIAGNOSTICIAN */}
        {activeSection === 'crop_doctor' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header & Search */}
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <Bug className="w-4 h-4" />
                  <span>AI VISION CROP PATHOLOGY & PEST CLINIC</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  AI फसल डॉक्टर (रोग, फंगस व कीट निदान)
                </h2>
                <p className="text-xs text-slate-300">
                  फसल का नाम चुनें या रोग का नाम खोजें — रासायनिक व 100% जैविक उपचार की सटीक खुराक तुरंत प्राप्त करें।
                </p>
              </div>

              <div className="w-full md:w-72 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="फसल या रोग खोजें (e.g. धान, Blast)..."
                  value={cropDoctorSearch}
                  onChange={e => setCropDoctorSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Disease Selector Ribbons */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {filteredDiseases.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedCropDisease(d)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    selectedCropDisease.id === d.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-300 font-black shadow-lg shadow-amber-500/20'
                      : 'bg-[#030B1E] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">{d.icon}</span>
                  <div className="text-left">
                    <div className="leading-none">{d.cropName[lang] || d.cropName.hi}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{d.diseaseName[lang] || d.diseaseName.hi}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Detailed Diagnosis Card */}
            {selectedCropDisease && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border-2 border-amber-500/40 shadow-2xl space-y-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        {selectedCropDisease.pathogenType}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                        गंभीरता: {selectedCropDisease.severity}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedCropDisease.diseaseName[lang] || selectedCropDisease.diseaseName.hi}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      फसल: <strong className="text-emerald-400">{selectedCropDisease.cropName[lang] || selectedCropDisease.cropName.hi}</strong> • सम्भावित नुकसान: <span className="text-red-400 font-bold">{selectedCropDisease.yieldLossRisk}</span>
                    </p>
                  </div>

                  {/* Treatment Filter Selector */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black border border-slate-800 text-xs">
                    <button
                      onClick={() => setTreatmentMode('both')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${treatmentMode === 'both' ? 'bg-amber-500 text-black' : 'text-slate-400'}`}
                    >
                      दोनों (Both)
                    </button>
                    <button
                      onClick={() => setTreatmentMode('chemical')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${treatmentMode === 'chemical' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                      रासायनिक दवा
                    </button>
                    <button
                      onClick={() => setTreatmentMode('organic')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${treatmentMode === 'organic' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                    >
                      जैविक उपचार
                    </button>
                  </div>
                </div>

                {/* Symptoms & Etiology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>पहचान के लक्षण (Visual Symptoms):</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedCropDisease.symptoms[lang] || selectedCropDisease.symptoms.hi}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span>फैलने का कारण व मौसम (Cause & Climate):</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedCropDisease.causeAndSpread[lang] || selectedCropDisease.causeAndSpread.hi}
                    </p>
                  </div>
                </div>

                {/* Prescriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(treatmentMode === 'both' || treatmentMode === 'chemical') && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#07172B] to-[#020A14] border border-blue-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                          <FlaskConical className="w-4 h-4 text-blue-400" />
                          <span>सटीक रासायनिक दवा (Chemical Control)</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                          ICAR Certified
                        </span>
                      </div>
                      <div className="text-sm font-black text-white">
                        {selectedCropDisease.chemicalControl.medicine}
                      </div>
                      <div className="text-xs text-slate-300">
                        <strong>खुराक (Dose):</strong> {selectedCropDisease.chemicalControl.dose}
                      </div>
                      <div className="text-xs text-amber-300/90">
                        <strong>छिड़काव का समय:</strong> {selectedCropDisease.chemicalControl.stage}
                      </div>
                    </div>
                  )}

                  {(treatmentMode === 'both' || treatmentMode === 'organic') && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#061F13] to-[#020A06] border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Leaf className="w-4 h-4 text-emerald-400" />
                          <span>100% जैविक व प्राकृतिक उपचार (Organic/Bio)</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          Zero Toxic Residue
                        </span>
                      </div>
                      <div className="text-sm font-black text-white">
                        {selectedCropDisease.organicControl.medicine}
                      </div>
                      <div className="text-xs text-slate-300">
                        <strong>विधि:</strong> {selectedCropDisease.organicControl.preparation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preventive Protocol */}
                <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-[#FFD700] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                    <span>भविष्य में इस रोग से बचाव के 3 नियम (Prevention Protocol):</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedCropDisease.preventiveTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 5: PRECISION SOIL NPK & NANO FERTILIZER CALCULATOR */}
        {activeSection === 'soil_npk' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-emerald-500/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <FlaskConical className="w-4 h-4" />
                <span>PRECISION SOIL HEALTH & NANO FERTILIZER ENGINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                मृदा स्वास्थ्य एवं नैनो उर्वरक कैलकुलेटर
              </h2>
              <p className="text-xs text-slate-300">
                अपनी मिट्टी की जांच रिपोर्ट (Soil Test) के मान और खेत का रकबा डालें — सिस्टम सटीक यूरिया, DAP, MOP और नैनो यूरिया का शेड्यूल तैयार करेगा।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs Form */}
              <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-4">
                <h3 className="text-sm font-black text-white border-b border-slate-800 pb-2">
                  1. खेत व मिट्टी के पैरामीटर
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">फसल चुनें (Crop):</label>
                  <select
                    value={cropType}
                    onChange={e => setCropType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="wheat">गेहूं (Wheat - Rabi)</option>
                    <option value="paddy">धान (Paddy - Kharif)</option>
                    <option value="cotton">कपास (Cotton - Cash)</option>
                    <option value="sugarcane">गन्ना (Sugarcane - Annual)</option>
                    <option value="tomato">टमाटर (Tomato - Horticulture)</option>
                    <option value="mustard">सरसों (Mustard - Oilseed)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>खेत का रकबा (Acreage):</span>
                    <span className="text-emerald-400 font-mono">{acreage} एकड़</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={acreage}
                    onChange={e => setAcreage(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>नाइट्रोजन N (kg/ha):</span>
                    <span className="text-blue-400 font-mono">{soilNitrogen} kg/ha ({soilNitrogen < 280 ? 'Low' : soilNitrogen > 560 ? 'High' : 'Medium'})</span>
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={650}
                    value={soilNitrogen}
                    onChange={e => setSoilNitrogen(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>फॉस्फोरस P (kg/ha):</span>
                    <span className="text-purple-400 font-mono">{soilPhosphorus} kg/ha</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    value={soilPhosphorus}
                    onChange={e => setSoilPhosphorus(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>पोटैशियम K (kg/ha):</span>
                    <span className="text-amber-400 font-mono">{soilPotassium} kg/ha</span>
                  </label>
                  <input
                    type="range"
                    min={80}
                    max={400}
                    value={soilPotassium}
                    onChange={e => setSoilPotassium(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>मृदा pH मान:</span>
                    <span className="text-red-400 font-mono">{soilPh} ({soilPh > 8.0 ? 'क्षारीय (Alkali)' : soilPh < 6.0 ? 'अम्लीय (Acidic)' : 'आदर्श (Neutral)'})</span>
                  </label>
                  <input
                    type="range"
                    min={5.0}
                    max={9.5}
                    step={0.1}
                    value={soilPh}
                    onChange={e => setSoilPh(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={useNanoUrea}
                      onChange={e => setUseNanoUrea(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <span>नैनो यूरिया + फोलियर स्प्रे तकनीक लागू करें</span>
                  </label>
                </div>
              </div>

              {/* Recommended Prescription Card */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 rounded-3xl bg-[#030B1E] border-2 border-emerald-500/40 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{acreage} एकड़ के लिए अनुकूलित खाद संस्तुति (Prescription)</span>
                    </h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Smart Schedule
                    </span>
                  </div>

                  {/* Quantity Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {useNanoUrea ? (
                      <>
                        <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/40 text-center">
                          <div className="text-[10px] text-slate-400">नैनो यूरिया (500ml)</div>
                          <div className="text-xl font-black text-emerald-400">{fertResults.nanoBottles} बोतल</div>
                          <div className="text-[9px] text-slate-400">2-4 ml/L फोलियर स्प्रे</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-black/60 border border-blue-500/30 text-center">
                          <div className="text-[10px] text-slate-400">दानेदार यूरिया बोरी</div>
                          <div className="text-xl font-black text-blue-400">{fertResults.finalUreaBags} बैग</div>
                          <div className="text-[9px] text-emerald-400">50% बचत</div>
                        </div>
                      </>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-black/60 border border-blue-500/30 text-center col-span-2">
                        <div className="text-[10px] text-slate-400">पारंपरिक यूरिया बोरी</div>
                        <div className="text-xl font-black text-blue-400">{fertResults.finalUreaBags} बैग (45kg)</div>
                        <div className="text-[9px] text-amber-400">अत्यधिक लीचिंग का खतरा</div>
                      </div>
                    )}

                    <div className="p-3.5 rounded-2xl bg-black/60 border border-purple-500/30 text-center">
                      <div className="text-[10px] text-slate-400">DAP बोरी (50kg)</div>
                      <div className="text-xl font-black text-purple-400">{fertResults.dapBags} बैग</div>
                      <div className="text-[9px] text-slate-400">बुवाई के समय (Basal)</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/30 text-center">
                      <div className="text-[10px] text-slate-400">MOP पोटाश (50kg)</div>
                      <div className="text-xl font-black text-amber-400">{fertResults.mopBags} बैग</div>
                      <div className="text-[9px] text-slate-400">चमक व दाना भराव हेतु</div>
                    </div>
                  </div>

                  {/* Micro-Nutrients & pH Alert */}
                  {(fertResults.gypsumKg > 0 || fertResults.zincKg > 0) && (
                    <div className="p-4 rounded-2xl bg-black/80 border border-amber-500/40 space-y-2">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>विशेष सुधार एवं सूक्ष्म पोषक तत्व (Special Amendments):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                        {fertResults.gypsumKg > 0 && (
                          <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
                            <strong>जिप्सम आवश्यकता:</strong> {fertResults.gypsumKg} किग्रा (क्योंकि मिट्टी की pH {soilPh} क्षारीय है)।
                          </div>
                        )}
                        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                          <strong>जिंक सल्फेट (21%):</strong> {fertResults.zincKg} किग्रा बुवाई के 25 दिन बाद डालें।
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Financial & Environmental ROI */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#031C14] to-[#030B1E] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-slate-400">कुल अनुमानित उर्वरक लागत ({acreage} एकड़):</div>
                      <div className="text-xl font-black text-white">
                        ₹{fertResults.costWithNano.toLocaleString('en-IN')}{' '}
                        {fertResults.savings > 0 && (
                          <span className="text-xs text-emerald-400 font-mono">
                            (₹{fertResults.savings} की बचत + 85% अधिक दक्षता)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-emerald-300 font-bold">मिट्टी का ऑर्गेनिक कार्बन स्वास्थ्य:</div>
                      <div className="text-xs text-slate-300">
                        नैनो तकनीक से भूजल प्रदूषण 80% घटता है
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: HYDROPONICS & IOT CLIMATE SIMULATOR */}
        {activeSection === 'hydroponics' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-cyan-500/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
                <Droplets className="w-4 h-4" />
                <span>IOT VERTICAL FARMING & HYDROPONICS DOSER SANDBOX</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                स्मार्ट हाइड्रोपोनिक्स एवं नियंत्रित पर्यावरण सिम्युलेटर
              </h2>
              <p className="text-xs text-slate-300">
                सिंगापुर व हॉलैंड की तरह पानी की विद्युत चालकता (EC), pH और तापमान को नियंत्रित कर देखें कि पौधों के पोषक तत्वों पर क्या प्रभाव पड़ता है।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sliders Control Box */}
              <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-5">
                <h3 className="text-sm font-black text-white border-b border-slate-800 pb-2">
                  IoT सेंसर्स व एक्ट्यूएटर सेटिंग्स
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>विद्युत चालकता EC (mS/cm):</span>
                    <span className={`font-mono font-bold ${hydroEc >= 1.8 && hydroEc <= 2.4 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {hydroEc} mS/cm {hydroEc >= 1.8 && hydroEc <= 2.4 ? '✓ Perfect' : '⚠️ Danger'}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={4.0}
                    step={0.1}
                    value={hydroEc}
                    onChange={e => setHydroEc(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500">आदर्श रेंज: शिमला मिर्च व टमाटर हेतु 1.8 - 2.4</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>घोल का pH मान:</span>
                    <span className={`font-mono font-bold ${hydroPh >= 5.8 && hydroPh <= 6.5 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {hydroPh} {hydroPh >= 5.8 && hydroPh <= 6.5 ? '✓ Ideal' : '⚠️ Nutrient Lockout'}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={4.0}
                    max={8.5}
                    step={0.1}
                    value={hydroPh}
                    onChange={e => setHydroPh(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <span className="text-[10px] text-slate-500">आदर्श रेंज: 5.8 से 6.5 (आयरन व फॉस्फोरस अवशोषण)</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>पानी का तापमान (°C):</span>
                    <span className={`font-mono font-bold ${waterTemp >= 18 && waterTemp <= 24 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {waterTemp}°C {waterTemp > 25 ? '⚠️ Pythium Root Rot Risk' : '✓ Good Oxygen'}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={35}
                    value={waterTemp}
                    onChange={e => setWaterTemp(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>LED स्पेक्ट्रम प्रकाश (घंटे/दिन):</span>
                    <span className="text-amber-400 font-mono">{lightHours} घंटे DLI</span>
                  </label>
                  <input
                    type="range"
                    min={8}
                    max={20}
                    value={lightHours}
                    onChange={e => setLightHours(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Real-Time Status & Plant Telemetry */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 rounded-3xl bg-[#030B1E] border-2 border-cyan-500/40 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-base font-black text-white">पौधों का स्वास्थ्य एवं पोषक तत्व टेलीमेट्री</h3>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      hydroEc >= 1.8 && hydroEc <= 2.4 && hydroPh >= 5.8 && hydroPh <= 6.5
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {hydroEc >= 1.8 && hydroEc <= 2.4 && hydroPh >= 5.8 && hydroPh <= 6.5 ? 'System Optimal' : 'Adjustment Needed'}
                    </span>
                  </div>

                  {/* Nutrient Availability Visual Bar */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-300">पोषक तत्वों का अवशोषण स्तर (Nutrient Uptake):</div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>नाइट्रोजन एवं फॉस्फोरस (N & P)</span>
                          <span className={hydroPh >= 5.8 && hydroPh <= 7.0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {hydroPh >= 5.8 && hydroPh <= 7.0 ? '98% Available' : 'Locked out (pH issue)'}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className={`h-full transition-all ${hydroPh >= 5.8 && hydroPh <= 7.0 ? 'bg-emerald-500 w-[95%]' : 'bg-red-500 w-[35%]'}`} 
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>आयरन एवं माइक्रोन्यूट्रिएंट्स (Fe, Mn, Zn, Cu)</span>
                          <span className={hydroPh <= 6.5 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            {hydroPh <= 6.5 ? '100% Soluble' : 'Precipitation Risk (pH too high)'}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className={`h-full transition-all ${hydroPh <= 6.5 ? 'bg-cyan-500 w-[98%]' : 'bg-amber-500 w-[45%]'}`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Diagnosis Insights */}
                  <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-[#FFD700] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FFD700]" />
                      <span>AI क्लाइमेट कंप्यूटर की स्वचालित सलाह (AI Advisory):</span>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed">
                      {hydroPh > 6.5 ? (
                        <span className="text-amber-300">
                          ⚠️ pH अधिक है ({hydroPh})! फास्फोरिक एसिड (pH Down) इंजेक्ट करें ताकि पौधों में आयरन की कमी से पत्तियां पीली न पड़ें।
                        </span>
                      ) : hydroPh < 5.5 ? (
                        <span className="text-red-300">
                          ⚠️ pH बहुत कम है ({hydroPh})! पोटैशियम हाइड्रॉक्साइड (pH Up) डालकर 6.0 पर लाएं अन्यथा जड़ें जल जाएंगी।
                        </span>
                      ) : (
                        <span className="text-emerald-300">
                          ✓ pH {hydroPh} आदर्श है। जड़ें बिना किसी रुकावट के 100% पोषक तत्व सोख रही हैं।
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed pt-1">
                      {waterTemp > 24 ? (
                        <span className="text-red-400">
                          ⚠️ पानी का तापमान {waterTemp}°C है। चिलर ऑन करें अन्यथा पानी में ऑक्सीजन कम होगी और पाइथियम जड़ सड़न लग सकती है।
                        </span>
                      ) : (
                        <span className="text-cyan-300">
                          ✓ पानी का तापमान {waterTemp}°C घुलित ऑक्सीजन (DO &gt; 7 mg/L) के लिए अनुकूल है।
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: MANDI PRICE ARBITRAGE & CROP ECONOMICS */}
        {activeSection === 'mandi_economics' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-amber-500/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>LIVE MSP VS APMC MANDI PRICE ARBITRAGE SIMULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                मंडी भाव AI एवं प्रति एकड़ शुद्ध लाभ कैलकुलेटर
              </h2>
              <p className="text-xs text-slate-300">
                सरकारी न्यूनतम समर्थन मूल्य (MSP), स्थानीय मंडियों का औसत भाव और फसल लागत का विश्लेषण कर जानें कब बेचना सबसे फायदेमंद रहेगा।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Crop Selector & Inputs */}
              <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-4">
                <h3 className="text-sm font-black text-white border-b border-slate-800 pb-2">
                  फसल एवं लागत पैरामीटर
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">फसल चुनें:</label>
                  <select
                    value={mandiCrop}
                    onChange={e => setMandiCrop(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="wheat">गेहूं (Wheat)</option>
                    <option value="soybean">सोयाबीन (Soybean)</option>
                    <option value="mustard">सरसों (Mustard)</option>
                    <option value="paddy">धान (Paddy)</option>
                    <option value="cotton">कपास (Cotton)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>प्रति एकड़ अनुमानित पैदावार (क्विंटल):</span>
                    <span className="text-emerald-400 font-mono">{expectedYieldQuintal} क्विंटल/एकड़</span>
                  </label>
                  <input
                    type="range"
                    min={8}
                    max={40}
                    value={expectedYieldQuintal}
                    onChange={e => setExpectedYieldQuintal(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                    <span>प्रति एकड़ कुल लागत (बीज, खाद, जुताई, पानी):</span>
                    <span className="text-red-400 font-mono">₹{inputCostPerAcre.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={6000}
                    max={30000}
                    step={500}
                    value={inputCostPerAcre}
                    onChange={e => setInputCostPerAcre(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>
              </div>

              {/* Market Economics Dashboard */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 rounded-3xl bg-[#030B1E] border-2 border-amber-500/40 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white">{cropMspData[mandiCrop].name} मंडी अर्थशास्त्र</h3>
                      <span className="text-xs text-emerald-400 font-bold">{cropMspData[mandiCrop].trend}</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                      2026 Mandi Trends
                    </span>
                  </div>

                  {/* 3 Price Benchmarks */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-black/60 border border-blue-500/30">
                      <div className="text-[10px] text-slate-400">सरकारी MSP (प्रति क्विंटल)</div>
                      <div className="text-xl font-black text-blue-400">₹{cropMspData[mandiCrop].msp}</div>
                      <div className="text-[10px] text-slate-500">न्यूनतम गारंटीकृत मूल्य</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40">
                      <div className="text-[10px] text-slate-400">मंडी औसत भाव (Avg APMC)</div>
                      <div className="text-xl font-black text-emerald-400">₹{cropMspData[mandiCrop].marketAvg}</div>
                      <div className="text-[10px] text-emerald-300">
                        +{Math.round(((cropMspData[mandiCrop].marketAvg - cropMspData[mandiCrop].msp) / cropMspData[mandiCrop].msp) * 100)}% vs MSP
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/40">
                      <div className="text-[10px] text-slate-400">उच्चतम बोली (A-Grade)</div>
                      <div className="text-xl font-black text-[#FFD700]">₹{cropMspData[mandiCrop].marketHigh}</div>
                      <div className="text-[10px] text-amber-300">ग्रेड-1 क्लीनिंग पर</div>
                    </div>
                  </div>

                  {/* Net Profit Calculator per Acre */}
                  {(() => {
                    const grossIncomeAtAvg = expectedYieldQuintal * cropMspData[mandiCrop].marketAvg;
                    const netProfit = grossIncomeAtAvg - inputCostPerAcre;
                    const roiPercent = Math.round((netProfit / inputCostPerAcre) * 100);

                    return (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#031C14] to-[#030B1E] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <div className="text-xs text-slate-400">प्रति एकड़ कुल आय (Gross Revenue):</div>
                          <div className="text-2xl font-black text-white">₹{grossIncomeAtAvg.toLocaleString('en-IN')}</div>
                          <div className="text-xs text-slate-400 mt-0.5">लागत घटाकर शुद्ध मुनाफा (Net Profit):</div>
                          <div className="text-xl font-black text-emerald-400">₹{netProfit.toLocaleString('en-IN')} प्रति एकड़</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-black/80 border border-emerald-500/30 text-center sm:text-right">
                          <div className="text-[10px] text-slate-400">रिटर्न ऑन इन्वेस्टमेंट (ROI)</div>
                          <div className="text-2xl font-black text-[#FFD700]">+{roiPercent}%</div>
                          <div className="text-[10px] text-emerald-400">प्रॉफिटेबल कमर्शियल फार्मिंग</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: ICAR / NABARD MOCK EXAM ARENA */}
        {activeSection === 'exam_arena' && (
          <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-emerald-500/40 shadow-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span>ICAR JRF / SRF / NABARD GRADE-A PRACTICE ARENA</span>
                </div>
                <h2 className="text-xl font-black text-white">कृषि प्रतियोगी परीक्षा अभ्यास</h2>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Q {currentQuizIndex + 1} / {AGRI_MOCK_EXAM_QUESTIONS.length}
              </span>
            </div>

            {!quizCompleted ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border-2 border-slate-800 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                    विषय: {AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].subject}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
                    {AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].correctOptionIndex;

                    let btnStyle = 'bg-black/60 border-slate-800 text-slate-200 hover:border-emerald-500/40';
                    if (isAnswerSubmitted) {
                      if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-400 text-white font-bold';
                      else if (isSelected) btnStyle = 'bg-red-950/80 border-red-400 text-white';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                        {isAnswerSubmitted && isSelected && !isCorrect && <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="p-4 rounded-2xl bg-black border border-emerald-500/40 space-y-2 animate-in fade-in">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>व्याख्या एवं विश्लेषण (Rationale):</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {AGRI_MOCK_EXAM_QUESTIONS[currentQuizIndex].explanation}
                    </p>
                    <div className="pt-3 text-right">
                      <button
                        onClick={nextQuestion}
                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs transition-all shadow-md"
                      >
                        {currentQuizIndex + 1 < AGRI_MOCK_EXAM_QUESTIONS.length ? 'अगला प्रश्न →' : 'परिणाम देखें'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-[#030B1E] border-2 border-emerald-500/40 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
                <div className="text-5xl">🏆</div>
                <h3 className="text-2xl font-black text-white">मॉक टेस्ट पूर्ण हुआ!</h3>
                <div className="text-4xl font-black text-[#FFD700] font-mono">
                  {quizScore} / {AGRI_MOCK_EXAM_QUESTIONS.length}
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {quizScore === AGRI_MOCK_EXAM_QUESTIONS.length
                    ? 'अद्भुत! आपकी ICAR व ग्लोबल एग्री-टेक पर मजबूत पकड़ है।'
                    : 'अच्छा प्रयास! 6D फ्रेमवर्क और ग्लोबल केस स्टडीज का पुनः अभ्यास करें।'}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-black text-xs transition-all shadow-lg"
                >
                  पुनः टेस्ट दें (Retry Quiz)
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
