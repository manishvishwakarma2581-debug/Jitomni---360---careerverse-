import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ShieldCheck,
  User,
  Phone,
  HelpCircle,
  BookOpen,
  Filter,
  Check,
  TrendingUp,
  MessageSquarePlus,
  RefreshCw,
  Award
} from 'lucide-react';
import { Language, MainTab } from '../types';
import { UserDemand, UserDemandService } from '../services/userDemandService';

interface UserDemandBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  defaultCategory?: string;
  defaultModule?: string;
  initialQuery?: string;
  onNavigateTab?: (tab: MainTab) => void;
}

export const UserDemandBoxModal: React.FC<UserDemandBoxModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultCategory = 'exam_notes_demand',
  defaultModule = 'Module 2: Competitive Exams Hub (/exam)',
  initialQuery = '',
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'resolved' | 'admin'>('submit');
  const [demands, setDemands] = useState<UserDemand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedDemand, setSubmittedDemand] = useState<UserDemand | null>(null);

  // Form states
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userRole, setUserRole] = useState('🩺 NEET / मेडिकल आकांक्षी');
  const [category, setCategory] = useState<UserDemand['category']>(defaultCategory as any || 'exam_notes_demand');
  const [targetModule, setTargetModule] = useState(defaultModule);
  const [title, setTitle] = useState(initialQuery || '');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UserDemand['urgency']>('high');

  // Admin filter
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'implemented'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const roleOptions = [
    '🩺 NEET / मेडिकल आकांक्षी',
    '🎓 स्कूल छात्र (कक्षा 1 से 12 NCERT)',
    '🏛️ JEE / इंजीनियरिंग आकांक्षी',
    '🎯 सरकारी नौकरी (UPSC / SSC / Banking / Railway / Police)',
    '💼 नौकरी आकांक्षी / कॉलेज फ्रेशर',
    '🛠️ ITI / वोकेशनल ट्रेड छात्र',
    '🌍 ग्लोबल AI जॉब्स / फ्रीलांसर',
    '🌾 किसान / कृषि छात्र (ICAR)',
    '🔨 श्रमिक / दैनिक कामगार (Labour)',
    '🤝 ऑन-डिमांड साथी / टास्क यूजर',
    '👤 अभिभावक / शिक्षक / अन्य'
  ];

  const modulesList = [
    'Module 1: School 360° Hub (/school)',
    'Module 2: Competitive Exams Hub - NEET/UPSC/SSC (/exam)',
    'Module 3: IIT-JEE Master Hub (/iit)',
    'Module 4: ITI Sovereign Hub (/iti)',
    'Module 5: Krishi 360° Agri-Tech Hub (/agri)',
    'Module 6: Sovereign Verified Jobs & Company Hub (/verified-jobs)',
    'Module 7: Labour & Unskilled Local Work Hub (/labour-jobs)',
    'Module 8: AI Sovereign Interviewer (/ai-interview)',
    'Module 9: Live Sarkari Vacancies Hub (/vacancies)',
    'Module 10: Global High-Paying AI Jobs (/global-ai-jobs)',
    'Module 11: On-Demand Companion & Safe Task Service (/companion)',
    'Module 12: English AI Mentor & Fluency Coach (/english)',
    'Module 13: Instant 360° AI Doubt Solver (/doubt)',
    'Module 14: Interactive Spaced Flashcards Hub (/flashcards)',
    'General App Feedback / संपूर्ण ऐप सुविधा'
  ];

  const loadDemands = async () => {
    setIsLoading(true);
    try {
      const data = await UserDemandService.getDemands();
      setDemands(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDemands();
      setSubmittedDemand(null);
      if (initialQuery && !title) {
        setTitle(initialQuery);
      }
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('कृपया मांग का शीर्षक और विस्तृत विवरण दर्ज करें।');
      return;
    }

    setIsLoading(true);
    try {
      const newDemand = await UserDemandService.submitDemand({
        userName: userName.trim() || 'JITOMNI Aspirant',
        userContact: userContact.trim() || 'Provided via in-app request',
        userRole,
        category,
        targetModule,
        title: title.trim(),
        description: description.trim(),
        urgency,
      });

      setSubmittedDemand(newDemand);
      await loadDemands();
    } catch (err) {
      console.error(err);
      alert('मांग सबमिट करने में समस्या आई, कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: UserDemand['status']) => {
    setUpdatingId(id);
    try {
      const note = prompt('एडमिन नोट दर्ज करें (वैकल्पिक - e.g. "अपडेट कर दिया गया है"):', 'मांग के अनुसार ऐप में नया फीचर/नोट्स जोड़ दिए गए हैं।');
      await UserDemandService.updateDemandStatus(id, newStatus, note || undefined);
      await loadDemands();
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredDemands = demands.filter((d) => {
    if (adminStatusFilter === 'all') return true;
    return d.status === adminStatusFilter;
  });

  const implementedDemands = demands.filter((d) => d.status === 'implemented');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#030B1E] border-2 border-[#FFD700]/70 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.25)] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#000000] via-[#07132B] to-[#030B1E] border-b border-[#FFD700]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD700] to-amber-600 flex items-center justify-center shadow-lg shadow-[#FFD700]/20 shrink-0">
              <MessageSquarePlus className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF] font-heading">
                  संप्रभु यूजर मांग व सहायता बॉक्स
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 font-bold uppercase tracking-wider">
                  User Demand Box
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  ⚡ 24H Update SLA
                </span>
              </div>
              <p className="text-xs text-amber-200/90 mt-0.5">
                ऐप में जो नहीं मिला, तुरंत मांग दर्ज करें — व्यवस्थापक (मनीष विश्वकर्मा) आपकी मांग के अनुसार ऐप को अपडेट करेंगे।
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 pb-2 bg-[#020714] border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveTab('submit');
                setSubmittedDemand(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'submit'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-600 text-black shadow-md shadow-[#FFD700]/30'
                  : 'text-slate-300 hover:text-[#FFD700] hover:bg-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>अपनी मांग / सुझाव दर्ज करें</span>
            </button>

            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'resolved'
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-emerald-300 hover:bg-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>पूरी की गई मांगें ({implementedDemands.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-[#00D4FF] text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-[#00D4FF] hover:bg-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>👑 व्यवस्थापक समीक्षा ({demands.length})</span>
            </button>
          </div>

          <button
            onClick={loadDemands}
            className="p-2 text-slate-400 hover:text-[#FFD700] transition-all cursor-pointer"
            title="रिफ्रेश करें"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: SUBMIT DEMAND */}
          {activeTab === 'submit' && (
            <div>
              {submittedDemand ? (
                <div className="bg-gradient-to-br from-emerald-950/60 via-[#030B1E] to-[#0A1931] border-2 border-emerald-500/60 rounded-3xl p-6 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-300 font-heading">
                      आपकी मांग सफलतापूर्वक दर्ज हो गई है!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                      मांग ट्रैकिंग आईडी:{' '}
                      <span className="font-mono font-bold text-[#FFD700] bg-black/60 px-2 py-0.5 rounded border border-[#FFD700]/30">
                        {submittedDemand.id}
                      </span>
                    </p>
                    <p className="text-xs text-amber-200/90 pt-2">
                      सॉवरेन एडमिन टीम आपकी मांग का विश्लेषण कर रही है और 24 घंटे के अंदर JITOMNI 360° के प्रासंगिक मॉड्यूल में समाधान जोड़ दिया जाएगा।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-slate-700 text-left max-w-lg mx-auto space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">मांग विषय:</span>
                      <span className="font-bold text-white">{submittedDemand.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">लक्षित मॉड्यूल:</span>
                      <span className="text-[#00D4FF]">{submittedDemand.targetModule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">प्राथमिकता:</span>
                      <span className="text-emerald-400 font-bold uppercase">{submittedDemand.urgency}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <button
                      onClick={() => setSubmittedDemand(null)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-600 text-black font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-md"
                    >
                      एक और मांग या सवाल दर्ज करें
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-600 transition-all"
                    >
                      समाप्त करें (Close)
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Top Notice */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-blue-950/30 to-purple-950/40 border border-[#FFD700]/40 flex items-start gap-3 text-xs">
                    <Sparkles className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#FFD700]">
                        "Padhai Se Kamai Tak" — शून्य समझ-सहमति, 100% छात्र व युवा की वास्तविक जरूरत!
                      </p>
                      <p className="text-slate-300 mt-1 leading-relaxed">
                        यदि आप NEET, JEE, UPSC, स्कूल, ITI, कृषि या नौकरियों में किसी खास विषय के नोट्स, टेस्ट सीरीज, वीडियो या फीचर चाहते हैं जो अभी ऐप में उपलब्ध नहीं है, तो नीचे बेझिझक लिखें।
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* User Role */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>आप कौन हैं? (User Category):</span>
                      </label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#FFD700]"
                      >
                        {roleOptions.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category of Demand */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-cyan-400" />
                        <span>मांग का प्रकार (Type of Request):</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#FFD700]"
                      >
                        <option value="exam_notes_demand">📚 परीक्षा सामग्री, नोट्स या टेस्ट सीरीज की मांग (e.g. NEET, JEE, UPSC)</option>
                        <option value="new_feature">🚀 नया फीचर या तकनीकी सुविधा (New Feature)</option>
                        <option value="missing_item_bug">⚠️ ऐप में कमी या सुधार का सुझाव (Missing Item / Bug)</option>
                        <option value="help_query">❓ सामान्य सहायता या मार्गदर्शन (Help / Query)</option>
                      </select>
                    </div>

                    {/* Target Module */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                        <span>संबंधित JITOMNI मॉड्यूल (Target Module):</span>
                      </label>
                      <select
                        value={targetModule}
                        onChange={(e) => setTargetModule(e.target.value)}
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#FFD700]"
                      >
                        {modulesList.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>मांग / सवाल का मुख्य शीर्षक (Subject / Title)*:</span>
                        <span className="text-[11px] text-slate-400">e.g. "NEET 2026 बायोलॉजी NCERT लाइन-बाय-लाइन टेस्ट चाहिए"</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="अपनी मांग या सवाल का संक्षेप में नाम लिखें..."
                        required
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>विस्तार से बताएं क्या कमी है या क्या नया चाहिए (Detailed Description)*:</span>
                        <span className="text-[11px] text-amber-400">जितना स्पष्ट लिखेंगे, उतना सटीक अपडेट होगा</span>
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="जैसे: मुझे NEET 2026 के लिए जेनेटिक्स और इकोलॉजी के 500 PYQs और 200 मिनट का टाइमर युक्त ऑल इंडिया मॉक टेस्ट चाहिए, जिससे मेरी रैंक सुधर सके..."
                        required
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FFD700] resize-none"
                      />
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        आपका नाम (Your Name):
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. अमित विश्वकर्मा (वैकल्पिक)"
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    {/* Contact info */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>मोबाइल / WhatsApp (अपडेट सूचना हेतु):</span>
                      </label>
                      <input
                        type="text"
                        value={userContact}
                        onChange={(e) => setUserContact(e.target.value)}
                        placeholder="+91 98765 43210 (वैकल्पिक)"
                        className="w-full bg-[#07132B] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    {/* Urgency */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-300">
                        प्राथमिकता (Urgency Level):
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'normal', label: 'सामान्य (Normal)' },
                          { id: 'high', label: 'उच्च (High Priority)' },
                          { id: 'urgent', label: 'अति-आवश्यक (Urgent / 24h)' },
                        ].map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setUrgency(u.id as any)}
                            className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              urgency === u.id
                                ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20'
                                : 'bg-[#0A1931] border-slate-700 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer transition-all"
                    >
                      रद्द करें (Cancel)
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-500 to-[#F59E0B] text-black font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-xl shadow-[#FFD700]/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isLoading ? 'सबमिट हो रहा है...' : '🚀 मांग दर्ज करें (Submit Demand)'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: RESOLVED DEMANDS */}
          {activeTab === 'resolved' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-emerald-300 text-sm">
                    हाल ही में पूरी की गई यूजर मांगें (Live Implemented Updates)
                  </h4>
                  <p className="text-slate-300 mt-0.5">
                    छात्रों व युवाओं द्वारा दर्ज की गई वे मांगें जिन्हें सॉवरेन टीम द्वारा ऐप में सफलतापूर्वक जोड़ दिया गया है:
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-black text-xs shrink-0">
                  {implementedDemands.length} लाइव अपडेट्स
                </span>
              </div>

              {implementedDemands.length === 0 ? (
                <p className="text-center py-10 text-slate-400 text-xs">अभी तक कोई पूरी की गई मांग दर्ज नहीं है।</p>
              ) : (
                <div className="space-y-3">
                  {implementedDemands.map((demand) => (
                    <div
                      key={demand.id}
                      className="p-4 rounded-2xl bg-[#07132B] border border-emerald-500/40 space-y-2 shadow-lg"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-mono text-[10px] font-bold">
                            {demand.id}
                          </span>
                          <span className="text-[11px] text-[#FFD700] font-bold">
                            {demand.userRole}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          सफलतापूर्वक जोड़ा गया (Resolved)
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm">
                        {demand.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {demand.description}
                      </p>

                      {demand.adminNotes && (
                        <div className="p-2.5 rounded-xl bg-black/50 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                          <strong className="text-amber-300 font-sans">एडमिन कार्रवाई (Action Taken): </strong>
                          {demand.adminNotes}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-400 flex justify-between pt-1">
                        <span>लक्षित: {demand.targetModule}</span>
                        <span>दिनांक: {new Date(demand.createdAt).toLocaleDateString('hi-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADMIN / CREATOR VIEW */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0A1931] border border-[#00D4FF]/40 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-black text-[#00D4FF] text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FFD700]" />
                    <span>सॉवरेन एडमिन डैशबोर्ड — यूजर मांग समीक्षा (Manish Vishwakarma Desk)</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    कुल दर्ज मांगें: <strong className="text-white">{demands.length}</strong> | लंबित (Pending):{' '}
                    <strong className="text-amber-400">{demands.filter((d) => d.status === 'pending').length}</strong> | पूरी हुईं:{' '}
                    <strong className="text-emerald-400">{implementedDemands.length}</strong>
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-slate-700 text-xs">
                  {(['all', 'pending', 'in_progress', 'implemented'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setAdminStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        adminStatusFilter === st
                          ? 'bg-gradient-to-r from-[#FFD700] to-amber-600 text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'all' ? 'सभी' : st === 'pending' ? 'लंबित' : st === 'in_progress' ? 'प्रगति' : 'पूर्ण'}
                    </button>
                  ))}
                </div>
              </div>

              {filteredDemands.length === 0 ? (
                <p className="text-center py-10 text-slate-400 text-xs">इस श्रेणी में कोई मांग नहीं है।</p>
              ) : (
                <div className="space-y-3">
                  {filteredDemands.map((demand) => (
                    <div
                      key={demand.id}
                      className="p-4 rounded-2xl bg-[#07132B] border border-slate-700/80 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-[#FFD700] bg-black/60 px-2 py-0.5 rounded border border-slate-700">
                            {demand.id}
                          </span>
                          <span className="text-xs text-cyan-300 font-bold">
                            {demand.userRole}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            demand.urgency === 'urgent' ? 'bg-rose-500 text-white' : demand.urgency === 'high' ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {demand.urgency}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                            demand.status === 'implemented'
                              ? 'bg-emerald-500 text-black'
                              : demand.status === 'in_progress'
                              ? 'bg-blue-500 text-white'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {demand.status === 'implemented' ? 'पूर्ण (Implemented)' : demand.status === 'in_progress' ? 'प्रगति पर (In Progress)' : 'लंबित (Pending)'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {demand.title}
                        </h4>
                        <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                          {demand.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-black/40 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                        <div>
                          <span className="text-slate-400">आवेदक: </span>
                          <strong className="text-white">{demand.userName}</strong> ({demand.userContact})
                        </div>
                        <div>
                          <span className="text-slate-400">मॉड्यूल: </span>
                          <strong className="text-cyan-300">{demand.targetModule}</strong>
                        </div>
                      </div>

                      {demand.adminNotes && (
                        <div className="text-xs bg-emerald-950/30 border border-emerald-500/30 p-2 rounded-xl text-emerald-300">
                          <strong>एडमिन नोट: </strong>{demand.adminNotes}
                        </div>
                      )}

                      {/* Admin action buttons */}
                      <div className="pt-1 flex flex-wrap items-center justify-end gap-2">
                        {demand.status !== 'in_progress' && (
                          <button
                            disabled={updatingId === demand.id}
                            onClick={() => handleUpdateStatus(demand.id, 'in_progress')}
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            प्रगति पर मार्क करें
                          </button>
                        )}
                        {demand.status !== 'implemented' && (
                          <button
                            disabled={updatingId === demand.id}
                            onClick={() => handleUpdateStatus(demand.id, 'implemented')}
                            className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>पूर्ण व अपडेट घोषित करें</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#020714] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
            <span>JITOMNI 360° Sovereign Architecture • Manish Vishwakarma Desk</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
