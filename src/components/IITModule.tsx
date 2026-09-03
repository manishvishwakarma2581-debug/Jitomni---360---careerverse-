import React, { useState } from 'react';
import { Language, IITTabSection } from '../types';
import {
  IIT_INSTITUTES_DATA,
  JEE_MASTER_STRATEGY,
  IIT_BRANCHES_DATA,
  IIT_MOCK_QUESTIONS,
  IITInstitute,
  IITBranchDetail,
  JEESubjectStrategy
} from '../data/iitData';
import {
  GraduationCap,
  Building2,
  Award,
  Sparkles,
  Search,
  BookOpen,
  Code,
  TrendingUp,
  Cpu,
  Globe2,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Atom,
  Rocket,
  ShieldCheck,
  Compass,
  Layers,
  PlayCircle
} from 'lucide-react';

interface IITModuleProps {
  lang: Language;
}

export const IITModule: React.FC<IITModuleProps> = ({ lang }) => {
  const [activeSection, setActiveSection] = useState<IITTabSection>('overview');
  const [selectedInstitute, setSelectedInstitute] = useState<IITInstitute>(IIT_INSTITUTES_DATA[0]);
  const [searchIIT, setSearchIIT] = useState('');
  const [selectedSubjectStrategy, setSelectedSubjectStrategy] = useState<JEESubjectStrategy>(JEE_MASTER_STRATEGY[0]);
  const [selectedBranch, setSelectedBranch] = useState<IITBranchDetail>(IIT_BRANCHES_DATA[0]);

  // Mock quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number | string }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});

  const filteredIITs = IIT_INSTITUTES_DATA.filter(iit =>
    iit.name.toLowerCase().includes(searchIIT.toLowerCase()) ||
    iit.location.toLowerCase().includes(searchIIT.toLowerCase()) ||
    iit.state.toLowerCase().includes(searchIIT.toLowerCase())
  );

  const handleAnswerSelect = (qId: string, optIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="w-full bg-[#000000] text-slate-100 min-h-screen pb-20">
      {/* Hero Banner with Premium Deep Sovereign Blue & Gold Theme */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#081836] via-[#040E20] to-[#000000] border-b border-[#00D4FF]/30 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00D4FF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D4FF]/15 text-[#00D4FF] font-bold text-xs border border-[#00D4FF]/40">
              <GraduationCap className="w-4 h-4 text-[#00D4FF] animate-pulse" />
              <span>INSTITUTES OF NATIONAL IMPORTANCE • 23 IITS • JEE ADVANCED • GLOBAL LEADERSHIP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-white to-[#FFD700] font-heading tracking-tight">
              IIT एवं JEE महा-हब: ए टू जेड संपूर्ण गाइड (A to Z)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              23 भारतीय प्रौद्योगिकी संस्थानों (IITs) का 360° विश्लेषण: <strong>JEE Main व Advanced मास्टर स्ट्रैटेजी</strong>, <strong>कटऑफ व NIRF रैंकिंग</strong>, <strong>CSE/AI व VLSI ब्रांचेज</strong>, <strong>₹1 Cr+ HFT प्लेसमेंट्स</strong>, <strong>यूनिकॉर्न स्टार्टअप्स (Zomato/Flipkart)</strong>, <strong>GATE व शोध रोडमैप</strong>।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <button
              onClick={() => setActiveSection('23_iits_matrix')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00D4FF] via-blue-600 to-[#00D4FF] text-white font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-white" />
              <span>🏛️ 23 IITs मैट्रिक्स व कटऑफ</span>
            </button>
            <button
              onClick={() => setActiveSection('jee_main_adv_strategy')}
              className="px-5 py-3 rounded-2xl bg-[#0F203E] hover:bg-[#152B52] text-[#FFD700] font-bold text-xs sm:text-sm border border-[#FFD700]/40 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#FFD700]" />
              <span>🎯 JEE Main & Advanced स्ट्रैटेजी</span>
            </button>
            <button
              onClick={() => setActiveSection('coding_cp_roadmap')}
              className="px-5 py-3 rounded-2xl bg-[#061F16] hover:bg-[#0A2E21] text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition-all flex items-center gap-2"
            >
              <Code className="w-4 h-4 text-emerald-400" />
              <span>💻 IITian कोडिंग व CP रोडमैप</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Secondary Navigation Bar */}
      <div className="bg-[#030B1E] border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'overview', label: '🌟 IIT इकोसिस्टम ओवरव्यू', icon: '🏛️' },
            { id: '23_iits_matrix', label: '🏫 23 IITs डायरेक्टरी व कटऑफ', icon: '📍' },
            { id: 'jee_main_adv_strategy', label: '🎯 JEE Main & Advanced A-Z', icon: '📖' },
            { id: 'branches_future_tech', label: '🚀 ब्रांचेज व फ्यूचर टेक (CSE/VLSI)', icon: '⚡' },
            { id: 'placements_internships', label: '💼 ₹1 Cr+ प्लेसमेंट्स व यूनिकॉर्न', icon: '💰' },
            { id: 'startups_incubation', label: '🦄 स्टार्टअप इनक्यूबेशन (SINE/FITT)', icon: '🚀' },
            { id: 'gate_jam_research', label: '🔬 GATE, JAM, PMRF व शोध', icon: '⚛️' },
            { id: 'coding_cp_roadmap', label: '💻 4-वर्षीय IITian कोडिंग रोडमैप', icon: '👨‍💻' },
            { id: 'advanced_mock_arena', label: '🏆 JEE Advanced मॉक चैलेंज', icon: '🎯' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as IITTabSection)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-[#00D4FF] to-blue-700 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/60 font-black'
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

        {/* SECTION 1: IIT ECOSYSTEM OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Quick 4 Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveSection('23_iits_matrix')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#061A28] to-[#020A12] border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors">
                  23 प्रीमियर IITs
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  मद्रास, बॉम्बे, दिल्ली, कानपुर, खड़गपुर, रुड़की, गुवाहाटी, हैदराबाद व अन्य संस्थानों का पूरा डेटा।
                </p>
                <div className="mt-3 flex items-center text-xs text-cyan-400 font-bold gap-1">
                  <span>डायरेक्टरी खोलें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('jee_main_adv_strategy')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1202] to-[#0D0901] border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 w-fit mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  JEE Main & Advanced रोडमैप
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  फिजिक्स, केमिस्ट्री व मैथ्स के हाई-वेटेज चैप्टर्स, टॉपर्स नोट्स एवं फॉर्मूला बैंक।
                </p>
                <div className="mt-3 flex items-center text-xs text-amber-400 font-bold gap-1">
                  <span>रणनीति देखें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('placements_internships')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#031811] to-[#020D09] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                  ₹1 Cr+ HFT व टेक पैकेजेस
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Jane Street, Google, Graviton, Apple, ISRO प्लेसमेंट्स एवं समर इंटर्नशिप्स (Day-1 Slot-1)।
                </p>
                <div className="mt-3 flex items-center text-xs text-emerald-400 font-bold gap-1">
                  <span>प्लेसमेंट आंकड़े देखें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveSection('startups_incubation')}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#1C0521] to-[#0D020F] border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer group shadow-lg hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 w-fit mb-3">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-purple-400 transition-colors">
                  यूनिकॉर्न स्टार्टअप नर्सरी
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Zomato, Flipkart, Ola, Meesho, Ather Energy, Agnikul Cosmos के जन्मदाता आईआईटी इनक्यूबेशन सेंटर्स।
                </p>
                <div className="mt-3 flex items-center text-xs text-purple-400 font-bold gap-1">
                  <span>स्टार्टअप हब देखें</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Sovereign IIT Impact Infographic */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071733] via-[#030E20] to-[#071733] border-2 border-[#00D4FF]/40 shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold border border-[#00D4FF]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>THE GLOBAL IMPACT ENGINE OF INDIA</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  आईआईटी: भारत का संप्रभु तकनीकी व नेतृत्व स्तंभ
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  1951 में खड़गपुर से शुरू हुआ आईआईटी सफर आज 23 वैश्विक उत्कृष्टता केंद्रों में बदल चुका है। गूगल के <strong>सुंदर पिचाई</strong>, आईबीएम के <strong>अरविंद कृष्ण</strong>, इंफोसिस के <strong>नारायण मूर्ति</strong> व <strong>नंदन नीलेकणी</strong> से लेकर भारत के 50% से अधिक यूनिकॉर्न संस्थापकों को आईआईटी ने ही गढ़ा है।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-[#00D4FF]">23</div>
                  <div className="text-xs font-bold text-white">स्वायत्त आईआईटी संस्थान</div>
                  <p className="text-[11px] text-slate-400">संसद के विशेष अधिनियम द्वारा घोषित Institute of National Importance।</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-[#FFD700]">~17,000+</div>
                  <div className="text-xs font-bold text-white">बी.टेक वार्षिक सीटें</div>
                  <p className="text-[11px] text-slate-400">14 लाख जेईई मेन परीक्षार्थियों में से शीर्ष 2.5 लाख जेईई एडवांस्ड देते हैं।</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-emerald-400">₹3.67 Cr</div>
                  <div className="text-xs font-bold text-white">सर्वोच्च अंतरराष्ट्रीय पैकेज</div>
                  <p className="text-[11px] text-slate-400">Jane Street, Citadel व टॉप HFTs द्वारा ऑफर किया गया पैकेज।</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-purple-400">100+</div>
                  <div className="text-xs font-bold text-white">यूनिकॉर्न व डीप-टेक स्टार्टअप्स</div>
                  <p className="text-[11px] text-slate-400">SINE (IITB), FITT (IITD), Nirmaan (IITM) द्वारा इनक्यूबेटेड।</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: 23 IITS MATRIX */}
        {activeSection === '23_iits_matrix' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Search & IIT Selector Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#030B1E] border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchIIT}
                  onChange={(e) => setSearchIIT(e.target.value)}
                  placeholder="आईआईटी खोजें (उदा. Bombay, Delhi, Madras)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-black/60 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                {filteredIITs.map(iit => (
                  <button
                    key={iit.id}
                    onClick={() => setSelectedInstitute(iit)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedInstitute.id === iit.id
                        ? 'bg-gradient-to-r from-[#00D4FF] to-blue-600 text-white font-black shadow-md shadow-cyan-500/20'
                        : 'bg-black/60 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 font-mono text-[10px]">#{iit.nirfRank2024}</span>
                    <span>{iit.name.split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected IIT Full Breakdown Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] font-mono font-bold text-xs border border-[#00D4FF]/40">
                      NIRF 2024 Rank #{selectedInstitute.nirfRank2024}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-mono font-bold text-xs border border-[#FFD700]/40">
                      Est. {selectedInstitute.established}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
                      {selectedInstitute.campusAreaAcres} Acres Campus
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {selectedInstitute.name}
                  </h2>
                  <div className="text-xs text-slate-400 font-mono italic">
                    ध्येय वाक्य (Motto): "{selectedInstitute.motto}"
                  </div>
                  <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {selectedInstitute.overview[lang] || selectedInstitute.overview.hi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs space-y-2 w-full sm:w-auto shrink-0">
                  <div>
                    <span className="text-slate-400">सर्वोच्च पैकेज:</span>
                    <div className="text-[#00D4FF] font-black">{selectedInstitute.highestPackage}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">मीडियन बी.टेक पैकेज:</span>
                    <div className="text-emerald-400 font-black">{selectedInstitute.medianPackageBTech}</div>
                  </div>
                </div>
              </div>

              {/* Flagship Branches & Iconic Labs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-[#00D4FF] flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[#00D4FF]" />
                    <span>फ्लैगशिप ब्रांचेज (Top Branches):</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstitute.flagshipBranches.map((br, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-blue-950/60 text-cyan-300 text-xs border border-blue-800">
                        ⚡ {br}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-[#FFD700] flex items-center gap-2">
                    <Atom className="w-4 h-4 text-[#FFD700]" />
                    <span>अत्याधुनिक शोध लैब्स (Iconic R&D Centres):</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {selectedInstitute.iconicLabs.map((lab, i) => (
                      <li key={i}>{lab}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notable Alumni & Incubation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1202] to-[#0D0901] border border-amber-500/30 space-y-3">
                  <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>प्रसिद्ध पूर्व छात्र (Notable Alumni):</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedInstitute.notableAlumni.map((alum, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-black/50 border border-amber-500/20 text-xs">
                        <strong className="text-white block">{alum.name}</strong>
                        <span className="text-amber-200/80 text-[11px]">{alum.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1C0521] to-[#0D020F] border border-purple-500/30 space-y-3">
                  <h4 className="text-sm font-black text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>स्टार्टअप इनक्यूबेशन सेल (Incubator):</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedInstitute.incubationCell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: JEE MAIN & ADVANCED MASTER STRATEGY */}
        {activeSection === 'jee_main_adv_strategy' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Subject Selector */}
            <div className="flex items-center gap-2 p-2 bg-[#030B1E] border border-slate-800 rounded-2xl">
              {JEE_MASTER_STRATEGY.map(subj => (
                <button
                  key={subj.subject}
                  onClick={() => setSelectedSubjectStrategy(subj)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    selectedSubjectStrategy.subject === subj.subject
                      ? 'bg-gradient-to-r from-[#00D4FF] to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-black/60 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{subj.icon}</span>
                  <span>{subj.subject} मास्टर स्ट्रैटेजी</span>
                </button>
              ))}
            </div>

            {/* Selected Subject Deep Dive */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <span>{selectedSubjectStrategy.icon}</span>
                    <span>{selectedSubjectStrategy.subject}: हाई-वेटेज चैप्टर्स व फॉर्मूला बैंक</span>
                  </h3>
                  <div className="text-xs text-[#00D4FF] font-bold mt-1">
                    वेटेज: {selectedSubjectStrategy.weightagePercentage}
                  </div>
                </div>
              </div>

              {/* High Yield Chapters Cards */}
              <div className="space-y-4">
                {selectedSubjectStrategy.highYieldChapters.map((ch, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
                      <h4 className="text-sm font-black text-white">{ch.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-blue-950 text-cyan-300 font-mono text-[11px] font-bold">
                          औसत ~{ch.questionsAvg} प्रश्न
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[11px] font-bold">
                          {ch.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-amber-400">🔑 मुख्य फॉर्मूला व सिद्धांत (Core Concepts):</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ch.coreFormulasOrKeys.map((f, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800">
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Topper Mastery Tips */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#031811] via-[#05291D] to-[#031811] border border-emerald-500/40 space-y-3">
                <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>AIR Top 100 रैंकर्स की विशेष तैयारी टिप्स:</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200">
                  {selectedSubjectStrategy.masteryTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 bg-black/50 p-3 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: BRANCHES & FUTURE TECH */}
        {activeSection === 'branches_future_tech' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Branch Selector */}
            <div className="flex items-center gap-2 p-2 bg-[#030B1E] border border-slate-800 rounded-2xl overflow-x-auto no-scrollbar">
              {IIT_BRANCHES_DATA.map(br => (
                <button
                  key={br.id}
                  onClick={() => setSelectedBranch(br)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedBranch.id === br.id
                      ? 'bg-gradient-to-r from-[#00D4FF] to-blue-600 text-white font-black shadow-lg shadow-cyan-500/30'
                      : 'bg-black/60 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{br.icon}</span>
                  <span>{br.code}</span>
                </button>
              ))}
            </div>

            {/* Selected Branch Detail */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40">
                      {selectedBranch.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                      {selectedBranch.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                    <span>{selectedBranch.icon}</span>
                    <span>{selectedBranch.name[lang] || selectedBranch.name.hi}</span>
                  </h2>
                  <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {selectedBranch.overview[lang] || selectedBranch.overview.hi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs shrink-0">
                  <div className="text-slate-400">औसत सीटीसी (CTC):</div>
                  <div className="text-[#00D4FF] font-black text-sm">{selectedBranch.avgPackageLPA}</div>
                </div>
              </div>

              {/* Core Subjects & Emerging Subfields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-cyan-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>कोर विषय (4-Year Core Curriculum):</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {selectedBranch.coreSubjects.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-black text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>उभरते भविष्य के क्षेत्र (Emerging Future Tech):</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {selectedBranch.emergingSubFields.map((field, i) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top Recruiters & Career Roles */}
              <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>शीर्ष रिक्रूटर्स व कंपनियां (Top Recruiters):</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBranch.topRecruiters.map((rec, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-200 text-xs border border-slate-700 font-mono">
                      🏢 {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: PLACEMENTS & STARTUPS */}
        {activeSection === 'placements_internships' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031811] via-[#05291D] to-[#031811] border-2 border-emerald-500/40 shadow-2xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  DAY-1 RECRUITMENT & WALL STREET HIGH FREQUENCY TRADING
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  आईआईटी प्लेसमेंट्स एवं समर इंटर्नशिप्स की हकीकत
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  आईआईटी में प्लेसमेंट सीजन 1 दिसंबर (Day 1 Slot 1) से शुरू होता है। क्वांटिटेटिव ट्रेडिंग फर्म्स, सिलिकॉन वैली टेक कंपनियां और भारतीय स्टार्टअप्स पहले 48 घंटों में ही करोड़ों के ऑफर जारी करते हैं।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                  <div className="text-xs font-bold text-emerald-400">1. क्वांट/HFT ट्रेडर फर्म्स</div>
                  <div className="text-xl font-black text-white">₹1.5 Cr - ₹3.67 Cr</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Jane Street, Citadel, Graviton, Quadeye, Tower Research, Hudson River Trading। मैथ्स, अल्गो और C++ में महारत रखने वाले शीर्ष 1% छात्र चुने जाते हैं।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
                  <div className="text-xs font-bold text-cyan-400">2. ग्लोबल टेक दिग्गज</div>
                  <div className="text-xl font-black text-white">₹45L - ₹85L (Domestic)</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Google, Microsoft, Apple, Uber, Meta, Amazon। डिस्ट्रीब्यूटेड सिस्टम्स, AI मॉडल और क्लाउड आर्किटेक्चर रोल्स।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2">
                  <div className="text-xs font-bold text-amber-400">3. कोर इंजीनियरिंग व PSUs</div>
                  <div className="text-xl font-black text-white">₹20L - ₹38L + भत्ते</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Texas Instruments, Qualcomm, Nvidia Hardware, Airbus, GE, ISRO, DRDO एवं महारत्न PSUs (IOCL, ONGC)।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: STARTUPS & INCUBATION */}
        {activeSection === 'startups_incubation' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#170524] via-[#0D0214] to-[#170524] border-2 border-purple-500/40 shadow-2xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                  UNICORN FACTORIES OF INDIA
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  आईआईटी इनक्यूबेशन सेंटर्स व यूनिकॉर्न संस्थापकों की गाथा
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
                  <h4 className="text-sm font-bold text-purple-300">IIT Bombay (SINE)</h4>
                  <p className="text-xs text-slate-300">
                    <strong>Bhavish Aggarwal</strong> (Ola), <strong>Nandan Nilekani</strong> (Infosys), <strong>Parag Agrawal</strong> (Twitter), 220+ टेक स्टार्टअप्स।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
                  <h4 className="text-sm font-bold text-purple-300">IIT Delhi (FITT)</h4>
                  <p className="text-xs text-slate-300">
                    <strong>Deepinder Goyal</strong> (Zomato), <strong>Sachin & Binny Bansal</strong> (Flipkart), <strong>Vidit Aatrey</strong> (Meesho)।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
                  <h4 className="text-sm font-bold text-purple-300">IIT Madras (Nirmaan)</h4>
                  <p className="text-xs text-slate-300">
                    <strong>Ather Energy</strong> (EV Scooter), <strong>Agnikul Cosmos</strong> (3D Printed Rocket Engine), <strong>Zoho</strong> (Sridhar Vembu)।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
                  <h4 className="text-sm font-bold text-purple-300">IIT Kanpur (SIIC)</h4>
                  <p className="text-xs text-slate-300">
                    <strong>Mukesh Bansal</strong> (Myntra/Cult.fit), <strong>Arvind Krishna</strong> (IBM CEO), C3iHub साइबर सिक्योरिटी।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: GATE, JAM & PMRF RESEARCH */}
        {activeSection === 'gate_jam_research' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                  HIGHER STUDIES & CENTRAL PSU DIRECT ENTRY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  गेट (GATE), JAM एवं PMRF रिसर्च फेलोशिप
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  बी.टेक के बाद IIT से M.Tech करने अथवा <strong>ONGC, IOCL, NTPC, BHEL, PowerGrid</strong> में सीधे क्लास-1 एग्जीक्यूटिव इंजीनियर बनने का सबसे प्रतिष्ठित मार्ग।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>GATE Exam (M.Tech & PSUs)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    65 प्रश्न (100 अंक)। शीर्ष 100 रैंकर्स को महारत्न PSUs में ₹18-₹24 LPA का डायरेक्ट ऑफिसर पैकेज मिलता है या IIT बॉम्बे/दिल्ली में M.Tech व ₹12,400/माह स्टाइपेंड।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Atom className="w-4 h-4 text-amber-400" />
                    <span>IIT JAM (M.Sc Admissions)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    B.Sc स्नातकों के लिए IITs और IISc बैंगलोर में M.Sc व इंटीग्रेटेड Ph.D. में प्रवेश हेतु राष्ट्रीय परीक्षा (Physics, Chemistry, Maths, Biotechnology)।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>PMRF शोध फेलोशिप (₹80,000/mo)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prime Minister's Research Fellowship (PMRF) के तहत IIT Ph.D. स्कॉलर्स को ₹70,000 से ₹80,000 प्रति माह स्टाइपेंड व ₹2 लाख वार्षिक शोध अनुदान मिलता है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: 4-YEAR IITIAN CODING & CP ROADMAP */}
        {activeSection === 'coding_cp_roadmap' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  THE 4-YEAR CODEFORCES / LEETCODE / SYSTEM DESIGN ROADMAP
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  आईआईटीयन बनने के बाद सॉफ्टवेयर व क्वांट में शीर्ष पर पहुंचने का रोडमैप
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold">वर्ष 1: नींव व भाषाएं</div>
                  <h4 className="text-sm font-bold text-white">C++ STL, Python व Linux</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fast I/O, Pointers, Memory management, Git/GitHub, Discrete Mathematics और बेसिक DSA (Arrays, Strings, Recursion)।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold">वर्ष 2: CP व एडवांस्ड DSA</div>
                  <h4 className="text-sm font-bold text-white">Codeforces Candidate Master</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Trees, Graphs, DP, Segment Trees, Trie, LeetCode 2000+ रेटिंग और Google Summer of Code (GSoC) ओपन सोर्स कंट्रीब्यूशन।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold">वर्ष 3: सिस्टम्स व समर इंटर्न</div>
                  <h4 className="text-sm font-bold text-white">Low & High Level Design</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    OS, DBMS, Computer Networks, Distributed Caching (Redis), Kafka, Day-1 समर इंटर्नशिप (₹1.5L-₹3L/माह स्टाइपेंड)।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-purple-400 font-bold">वर्ष 4: डीप-टेक व फाइनल प्लेसमेंट</div>
                  <h4 className="text-sm font-bold text-white">AI Research व HFT Placement</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    NeurIPS/CVPR पेपर पब्लिकेशन या स्टार्टअप प्रोटोटाइप, 1 दिसंबर को ₹50L - ₹2 Cr+ का फाइनल प्लेसमेंट सिक्योर करना।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 9: ADVANCED MOCK ARENA */}
        {activeSection === 'advanced_mock_arena' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 rounded-3xl bg-[#030B1E] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#00D4FF]" />
                    <span>JEE Advanced स्तर बहु-संकल्पनात्मक (Multi-Concept) चैलेंज</span>
                  </h3>
                  <p className="text-xs text-slate-400">कठिन गणितीय व तार्किक विश्लेषण वाले प्रश्न।</p>
                </div>
              </div>

              <div className="space-y-6">
                {IIT_MOCK_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-blue-950 text-cyan-300 text-[11px] font-mono font-bold">
                        क्वेश्चन {idx + 1} • {q.subject} • {q.questionType}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {q.question[lang] || q.question.hi}
                    </h4>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          const isCorrect = q.correctAnswer === optIdx;
                          const answered = selectedAnswers[q.id] !== undefined;

                          let btnStyle = 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-cyan-400/60';
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
                              <span className="font-mono text-[11px] text-cyan-400 font-bold shrink-0">
                                ({String.fromCharCode(65 + optIdx)})
                              </span>
                              <span>{opt[lang] || opt.hi}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {showExplanation[q.id] && (
                      <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 space-y-1 animate-in fade-in">
                        <strong className="text-cyan-300 block">💡 संपूर्ण गणितीय व वैज्ञानिक हल (Solution):</strong>
                        <p className="whitespace-pre-line leading-relaxed">{q.solutionExplanation[lang] || q.solutionExplanation.hi}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
