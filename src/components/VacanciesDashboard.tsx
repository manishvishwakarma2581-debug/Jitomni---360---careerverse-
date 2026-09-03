import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  GraduationCap, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Bell, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Shield, 
  Flame, 
  MapPin, 
  Building2, 
  X,
  Share2,
  ChevronRight
} from 'lucide-react';
import { Language, VacancyItem, VacancyFilter, VacancyNotificationAlert, CompetitiveExam } from '../types';

interface VacanciesDashboardProps {
  lang: Language;
  onNavigateToExam?: (examKey: CompetitiveExam) => void;
}

export const VacanciesDashboard: React.FC<VacanciesDashboardProps> = ({ lang, onNavigateToExam }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<VacancyFilter>('All');
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [alerts, setAlerts] = useState<VacancyNotificationAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyItem | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const filters: { id: VacancyFilter; label: { hi: string; en: string; hinglish: string }; icon: string }[] = [
    { id: 'All', label: { hi: 'सभी (All)', en: 'All Jobs', hinglish: 'All Jobs' }, icon: '🌟' },
    { id: 'Centre', label: { hi: 'केंद्र सरकार (Centre)', en: 'Central Govt', hinglish: 'Central Jobs' }, icon: '🏛️' },
    { id: 'MP State', label: { hi: 'MP राज्य भर्ती (State)', en: 'MP State Govt', hinglish: 'MP State' }, icon: '🇮🇳' },
    { id: 'Police', label: { hi: 'पुलिस व रक्षा (Police)', en: 'Police & Defence', hinglish: 'Police & Defence' }, icon: '👮' },
    { id: 'Banking', label: { hi: 'बैंकिंग (Banking)', en: 'Banking & Finance', hinglish: 'Banking' }, icon: '🏦' },
    { id: 'Railway', label: { hi: 'रेलवे (Railway)', en: 'Railway (RRB)', hinglish: 'Railway' }, icon: '🚆' },
    { id: '10th Pass', label: { hi: '10वीं पास (10th Pass)', en: '10th Pass', hinglish: '10th Pass' }, icon: '📜' },
    { id: '12th Pass', label: { hi: '12वीं पास (12th Pass)', en: '12th Pass', hinglish: '12th Pass' }, icon: '🎓' },
    { id: 'Graduation', label: { hi: 'ग्रेजुएशन (Graduation)', en: 'Graduates', hinglish: 'Graduation' }, icon: '🎯' },
  ];

  const fetchLiveVacancies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/vacancies/live');
      const data = await res.json();
      if (data.success && data.vacancies) {
        setVacancies(data.vacancies);
        setAlerts(data.alerts || []);
        setLastSyncTime(new Date(data.lastSyncTime).toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching live vacancies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshFromGemini = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/vacancies/refresh', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.vacancies) {
        setVacancies(data.vacancies);
        setAlerts(data.alerts || []);
        setLastSyncTime(new Date(data.lastSyncTime).toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error refreshing vacancies from server:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveVacancies();
  }, []);

  // Alert cycler
  useEffect(() => {
    if (alerts.length <= 1) return;
    const interval = setInterval(() => {
      setActiveAlertIndex((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [alerts]);

  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted' && alerts.length > 0) {
        new Notification(alerts[0].title, {
          body: alerts[0].message,
          icon: '/favicon.ico'
        });
      }
    }
  };

  // Filter & Search logic
  const filteredVacancies = vacancies.filter((vac) => {
    // Tab condition
    if (activeTab === 'live' && vac.status === 'Upcoming') return false;
    if (activeTab === 'upcoming' && vac.status !== 'Upcoming') return false;

    // Filter condition
    if (selectedFilter === 'Centre' && vac.category !== 'Centre') return false;
    if (selectedFilter === 'MP State' && vac.category !== 'MP State') return false;
    if (selectedFilter === 'Police' && vac.subCategory !== 'Police') return false;
    if (selectedFilter === 'Banking' && vac.subCategory !== 'Banking') return false;
    if (selectedFilter === 'Railway' && vac.subCategory !== 'Railway') return false;
    if (selectedFilter === '10th Pass' && !vac.qualification.toLowerCase().includes('10th')) return false;
    if (selectedFilter === '12th Pass' && !vac.qualification.toLowerCase().includes('12th')) return false;
    if (selectedFilter === 'Graduation' && !vac.qualification.toLowerCase().includes('graduat')) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vac.postName.toLowerCase().includes(q);
      const matchDept = vac.department.toLowerCase().includes(q);
      const matchQual = vac.qualification.toLowerCase().includes(q);
      const matchSub = vac.subCategory.toLowerCase().includes(q);
      return matchName || matchDept || matchQual || matchSub;
    }

    return true;
  });

  const activeCount = vacancies.filter((v) => v.status !== 'Upcoming').length;
  const upcomingCount = vacancies.filter((v) => v.status === 'Upcoming').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Live Breaking News Push Alert Banner */}
      {alerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-950 via-rose-900/60 to-[#0A1931] border border-red-500/40 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div className="truncate">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] uppercase tracking-wider mr-2">
                BREAKING ALERT
              </span>
              <span className="text-white font-bold text-xs sm:text-sm">
                {alerts[activeAlertIndex]?.title}
              </span>
              <span className="hidden md:inline text-slate-300 text-xs ml-2">
                - {alerts[activeAlertIndex]?.message}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {notificationPermission !== 'granted' ? (
              <button
                onClick={requestPushPermission}
                className="px-3 py-1 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Bell className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline">Push Notification On करें</span>
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Alerts Active</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-[#0E2045] via-[#0A1931] to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Real-Time Government Vacancy Hub • Verified Official Links</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide">
              {lang === 'hi' ? '🔥 सरकारी नौकरी - लाइव वेकेंसी डैशबोर्ड' : '🔥 Sarkari Naukri - Real-Time Live Vacancies'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'SSC, रेलवे, MP पुलिस, पटवारी, MPPSC, UPSC एवं बैंकिंग की सभी नई और आगामी भर्तियों के आधिकारिक नोटिफिकेशन, योग्यता व 360° तैयारी सिलेबस।'
                : 'Live tracking of all Central and MP State government competitive exams with direct notification PDFs and JITOMNI 360° syllabus mapping.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleRefreshFromGemini}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-2xl bg-[#030B1E] hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:border-cyan-400 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-cyan-400'}`} />
              <span>{isRefreshing ? 'AI लाइव सिंक हो रहा है...' : 'रोज़ सुबह 6:00 AM ऑटो-अपडेट'}</span>
            </button>

            {lastSyncTime && (
              <div className="px-3 py-2 rounded-xl bg-black/40 border border-slate-700/60 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Synced: {lastSyncTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Tab Controller: Live vs Upcoming */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-3 bg-[#0A1931] p-1.5 rounded-2xl border border-slate-700">
          <button
            id="tab-live-vacancies"
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{lang === 'hi' ? 'लाइव भर्तियां (आज सक्रिय)' : 'Live Active Vacancies'}</span>
            <span className="px-2 py-0.5 rounded-full bg-black/40 text-[11px] font-mono">
              {activeCount}
            </span>
          </button>

          <button
            id="tab-upcoming-vacancies"
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⏳</span>
            <span>{lang === 'hi' ? 'आगामी भर्तियां (आने वाली हैं)' : 'Upcoming Vacancies'}</span>
            <span className="px-2 py-0.5 rounded-full bg-black/40 text-[11px] font-mono">
              {upcomingCount}
            </span>
          </button>
        </div>

        {/* Live Search Box */}
        <div className="relative flex-1 max-w-md min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'परीक्षा या विभाग खोजें (उदा: SSC, Police, 10th Pass, Railway)...'
                : 'Search exam or department (e.g. SSC CGL, Police, Patwari)...'
            }
            className="w-full bg-[#0A1931] border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Top Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-1.5 ${
              selectedFilter === f.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <span>{f.icon}</span>
            <span>{f.label[lang] || f.label.en}</span>
          </button>
        ))}
      </div>

      {/* Vacancies Grid */}
      {isLoading ? (
        <div className="bg-[#0A1931] border border-slate-800 rounded-3xl p-16 text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-white">सरकारी भर्तियों का लाइव डेटा लोड हो रहा है...</h3>
          <p className="text-xs text-slate-400">आधिकारिक पोर्टल्स और नवीनतम अधिसूचनाओं की जाँच</p>
        </div>
      ) : filteredVacancies.length === 0 ? (
        <div className="bg-[#0A1931] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">कोई भर्ती नहीं मिली</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            कृपया अपने सर्च कीवर्ड बदलें या "सभी (All)" फ़िल्टर का चयन करें।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
          >
            फ़िल्टर रीसेट करें
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
          {filteredVacancies.map((vacancy) => {
            const isLastDateNear = vacancy.status === 'Last Date Near' || vacancy.isLastDateNear;
            const isUpcoming = vacancy.status === 'Upcoming';

            return (
              <div
                key={vacancy.id}
                className="bg-gradient-to-br from-[#0A1931] via-[#08152B] to-[#040C1A] border border-slate-700/80 hover:border-cyan-500/60 rounded-3xl p-5 sm:p-6 shadow-xl transition-all hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                {/* Accent top glowing stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isLastDateNear
                      ? 'bg-gradient-to-r from-red-500 via-rose-500 to-amber-500'
                      : isUpcoming
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400'
                  }`}
                />

                {/* Card Top: Department, Logo, and Status Tag */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black/50 border border-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        {vacancy.departmentLogo || '🏛️'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                            {vacancy.category}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400 font-semibold">
                            {vacancy.subCategory}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-1 font-medium">
                          {vacancy.department}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black shrink-0 border ${
                        isLastDateNear
                          ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                          : isUpcoming
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {isLastDateNear ? '🔥 Last Date Near' : isUpcoming ? '⏳ Upcoming' : '✓ Active Now'}
                    </span>
                  </div>

                  {/* Post Name Heading */}
                  <h3 className="text-lg sm:text-xl font-heading font-black text-white mt-4 group-hover:text-cyan-200 transition-colors">
                    {vacancy.postName}
                  </h3>

                  {vacancy.summaryHindi && (
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {vacancy.summaryHindi}
                    </p>
                  )}

                  {/* Key Metrics Grid: Total Posts, Last Date (Red Highlight), Qualification */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800">
                    <div className="bg-[#030B1E]/80 border border-slate-800 rounded-xl p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-cyan-400 text-xs mb-0.5">
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Total Posts</span>
                      </div>
                      <p className="font-heading font-black text-xs sm:text-sm text-white truncate">
                        {vacancy.totalPosts}
                      </p>
                    </div>

                    <div
                      className={`border rounded-xl p-2.5 text-center ${
                        isLastDateNear
                          ? 'bg-red-950/40 border-red-500/40'
                          : 'bg-[#030B1E]/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs mb-0.5">
                        <Calendar className={`w-3.5 h-3.5 ${isLastDateNear ? 'text-red-400' : 'text-amber-400'}`} />
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Last Date</span>
                      </div>
                      <p className={`font-heading font-black text-xs sm:text-sm truncate ${isLastDateNear ? 'text-red-400 font-extrabold' : 'text-red-300'}`}>
                        {vacancy.lastDate}
                      </p>
                    </div>

                    <div className="bg-[#030B1E]/80 border border-slate-800 rounded-xl p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-violet-400 text-xs mb-0.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Eligibility</span>
                      </div>
                      <p className="font-heading font-black text-xs sm:text-sm text-slate-200 truncate">
                        {vacancy.qualification}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions: 2 Main Buttons + Jitomni 360° Prep Button */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Official Notification PDF Button */}
                    <a
                      href={vacancy.notificationPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[#030B1E] hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Notification PDF</span>
                    </a>

                    {/* Apply Now Button */}
                    <a
                      href={vacancy.applyOnlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all text-center shadow-md ${
                        isUpcoming
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold shadow-cyan-600/30'
                      }`}
                    >
                      <span>{isUpcoming ? 'जल्द शुरू होगा' : 'Apply Now'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Jitomni 360° Preparation Portal Button */}
                  <button
                    onClick={() => {
                      if (onNavigateToExam && vacancy.syllabusExamKey) {
                        onNavigateToExam(vacancy.syllabusExamKey);
                      } else {
                        setSelectedVacancy(vacancy);
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-violet-950/80 via-purple-950/60 to-[#030B1E] hover:bg-violet-900/50 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group/prep shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>JITOMNI 360° तैयारी व सिलेबस देखें</span>
                    <ArrowRight className="w-3.5 h-3.5 text-violet-400 group-hover/prep:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal Drawer if clicked */}
      {selectedVacancy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1931] border-2 border-cyan-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setSelectedVacancy(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-black/60 border border-slate-700 flex items-center justify-center text-3xl shrink-0">
                {selectedVacancy.departmentLogo || '🏛️'}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded bg-cyan-600/30 text-cyan-300 text-xs font-bold border border-cyan-500/40">
                  {selectedVacancy.category} • {selectedVacancy.subCategory}
                </span>
                <h3 className="text-xl font-heading font-black text-white mt-1">
                  {selectedVacancy.postName}
                </h3>
                <p className="text-xs text-slate-300">{selectedVacancy.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#030B1E] p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Vacancy</span>
                <p className="text-sm font-bold text-white">{selectedVacancy.totalPosts}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Last Date</span>
                <p className="text-sm font-bold text-red-400">{selectedVacancy.lastDate}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Age Limit</span>
                <p className="text-sm font-bold text-slate-200">{selectedVacancy.ageLimit || '18 - 32 Yrs'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Pay Scale</span>
                <p className="text-sm font-bold text-emerald-400">{selectedVacancy.salaryPayScale || 'Standard'}</p>
              </div>
            </div>

            {selectedVacancy.keyPoints && (
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-white text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>मुख्य परीक्षा बिंदु व चयन प्रक्रिया:</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedVacancy.keyPoints.map((pt, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <a
                href={selectedVacancy.notificationPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download Official Notification PDF</span>
              </a>
              <a
                href={selectedVacancy.applyOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black text-xs text-center flex items-center justify-center gap-1.5"
              >
                <span>Direct Apply Online Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
