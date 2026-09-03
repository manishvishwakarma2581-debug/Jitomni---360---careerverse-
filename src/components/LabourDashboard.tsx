import React, { useState } from 'react';
import { HardHat, Phone, MapPin, CheckCircle2, Clock, Utensils, Home, ArrowRight, ShieldCheck, X, Sparkles, Navigation, Check } from 'lucide-react';
import { LabourJob, LabourWorkType, Language } from '../types';
import { initialLabourJobs } from '../data/initialData';

interface LabourDashboardProps {
  lang: Language;
}

export const LabourDashboard: React.FC<LabourDashboardProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<LabourWorkType | 'All'>('All');
  const [labourJobsList, setLabourJobsList] = useState<LabourJob[]>(initialLabourJobs);
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(5);

  // 1-Click Apply Modal State
  const [activeJobForApply, setActiveJobForApply] = useState<LabourJob | null>(null);
  const [workerName, setWorkerName] = useState('रामलाल कुशवाहा');
  const [workerPhone, setWorkerPhone] = useState('+91 98263 11224');
  const [workerLocation, setWorkerLocation] = useState('भोपाल (एमपी नगर)');
  const [appliedJobsMap, setAppliedJobsMap] = useState<Record<string, boolean>>({});
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const [directCallNumber, setDirectCallNumber] = useState<string | null>(null);

  // Categories list with Hindi titles and big visual icons
  const categories: { type: LabourWorkType; labelHindi: string; emoji: string }[] = [
    { type: 'Mistri', labelHindi: 'राजमिस्त्री', emoji: '🧱' },
    { type: 'Mazdoor', labelHindi: 'मजदूर / हेल्पर', emoji: '🔨' },
    { type: 'Factory Worker', labelHindi: 'फैक्ट्री वर्कर', emoji: '🏭' },
    { type: 'Driver', labelHindi: 'ड्राइवर', emoji: '🚚' },
    { type: 'Delivery', labelHindi: 'डिलीवरी बॉय', emoji: '🛵' },
    { type: 'Safai Karmi', labelHindi: 'सफाई कर्मी', emoji: '🧹' },
    { type: 'Security Guard', labelHindi: 'सिक्योरिटी गार्ड', emoji: '👮' },
    { type: 'Electrician', labelHindi: 'इलेक्ट्रीशियन', emoji: '⚡' },
    { type: 'Plumber', labelHindi: 'प्लंबर', emoji: '🔧' },
  ];

  const filteredJobs = labourJobsList.filter((j) => {
    const matchesCat = selectedCategory === 'All' || j.workType === selectedCategory;
    const matchesRadius = j.distanceKm <= selectedRadiusKm;
    return matchesCat && matchesRadius;
  });

  const handle1ClickApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobForApply || !workerName.trim() || !workerPhone.trim()) return;

    setAppliedJobsMap((prev) => ({
      ...prev,
      [activeJobForApply.id]: true,
    }));

    setDirectCallNumber(activeJobForApply.employerPhone);
    setIsApplySuccess(true);

    try {
      await fetch('/api/hiring/labour-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: activeJobForApply.id,
          jobTitle: activeJobForApply.titleHindi,
          employerName: activeJobForApply.employerName,
          employerPhone: activeJobForApply.employerPhone,
          workerName,
          workerPhone,
          workerLocation,
          workType: activeJobForApply.workType,
        }),
      });
    } catch (err) {
      console.warn('Labour apply warning:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* MEGA VISUAL BANNER FOR BLUE COLLAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C14] via-[#05291D] to-[#02140E] border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 uppercase tracking-wider flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 text-emerald-400" /> ROLE 3: लेबर व कारीगर (BLUE COLLAR)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ⚡ नो टेस्ट • नो डिग्री • डायरेक्ट काम
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">
              👷 अपने पास का काम चुनें और <span className="text-emerald-400">सीधे मालिक को कॉल लगाएं</span>
            </h1>

            <p className="text-sm text-emerald-200/90 font-semibold max-w-xl">
              बड़ी फोटो, आसान चयन। सिर्फ नाम और मोबाइल नंबर डालकर तुरंत काम पाएं।
            </p>
          </div>

          {/* GPS Auto-detect Location Pill */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold">आपकी लोकेशन (GPS):</div>
              <div className="text-sm font-black text-emerald-400">भोपाल (एमपी नगर)</div>
              <div className="text-[11px] text-amber-300 font-semibold">
                📍 {filteredJobs.length} काम उपलब्ध हैं ({selectedRadiusKm}km के अंदर)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY SELECTOR WITH BIG EMOJI TILES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>🔨 क्या काम करना चाहते हैं? (Select Kaam)</span>
          </h2>
          
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="text-slate-400 px-2 font-bold">दूरी:</span>
            {[3, 5, 10].map((km) => (
              <button
                key={km}
                onClick={() => setSelectedRadiusKm(km)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedRadiusKm === km
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {km}km
              </button>
            ))}
          </div>
        </div>

        {/* Big visual category pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              selectedCategory === 'All'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 font-black'
                : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xl">⭐</span>
            <span>सभी काम ({labourJobsList.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.type}
              onClick={() => setSelectedCategory(cat.type)}
              className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
                selectedCategory === cat.type
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span>{cat.labelHindi}</span>
            </button>
          ))}
        </div>
      </section>

      {/* BIG PHOTO JOB CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white">
            📍 आपके {selectedRadiusKm}km के दायरे में उपलब्ध काम:
          </h2>
          <span className="text-xs text-emerald-400 font-bold">
            {filteredJobs.length} काम मिले
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobsMap[job.id];

            return (
              <div
                key={job.id}
                className="rounded-3xl bg-[#061812] border-2 border-emerald-500/40 shadow-xl overflow-hidden hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                {/* Job Photo Banner */}
                {job.photoUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={job.photoUrl}
                      alt={job.titleHindi}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061812] via-transparent to-transparent" />
                    
                    {/* Distance Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{job.distanceKm} km दूर</span>
                    </div>

                    {/* Openings Count */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                      {job.vacanciesCount} लोगों की ज़रूरत
                    </div>
                  </div>
                )}

                {/* Job Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-xl font-black text-white leading-snug">
                      {job.titleHindi}
                    </h3>
                    <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{job.employerName}</span>
                    </p>
                  </div>

                  {/* Wage Highlight Box */}
                  <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/50">
                    <div className="text-xs text-emerald-300 font-bold">मजदूरी / सैलरी:</div>
                    <div className="text-lg font-black text-amber-300">
                      {job.wagePerDay}
                    </div>
                  </div>

                  {/* Perks: Food, Stay, Timings */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {job.foodIncluded && (
                      <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-amber-400" />
                        <span>खाना फ्री</span>
                      </span>
                    )}
                    {job.stayIncluded && (
                      <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-blue-400" />
                        <span>रहना फ्री</span>
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{job.dailyTimings}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 pt-1 line-clamp-2">
                    {job.descriptionHindi}
                  </p>
                </div>

                {/* Bottom Action: 1-Click Apply or Direct Call */}
                <div className="p-5 pt-0">
                  {isApplied ? (
                    <a
                      href={`tel:${job.employerPhone}`}
                      className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
                    >
                      <Phone className="w-5 h-5 animate-bounce" />
                      <span>कॉल करो ({job.employerPhone})</span>
                    </a>
                  ) : (
                    <button
                      id={`apply-labour-${job.id}`}
                      onClick={() => {
                        setActiveJobForApply(job);
                        setIsApplySuccess(false);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95"
                    >
                      <span>1-क्लिक में काम पाओ & कॉल लगाओ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 1-CLICK APPLY MODAL */}
      {activeJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#051C14] border-2 border-emerald-500/60 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  1-Click Direct Application
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {activeJobForApply.titleHindi}
                </h3>
              </div>

              <button
                onClick={() => setActiveJobForApply(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isApplySuccess ? (
              <div className="text-center space-y-4 py-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h4 className="text-xl font-black text-white">
                  आवेदन सफलतापूर्वक दर्ज हो गया!
                </h4>

                <p className="text-xs text-slate-300">
                  ठेकेदार: <strong>{activeJobForApply.contactPerson} ({activeJobForApply.employerName})</strong>
                </p>

                <a
                  href={`tel:${activeJobForApply.employerPhone}`}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30"
                >
                  <Phone className="w-5 h-5 animate-bounce" />
                  <span>ठेकेदार को तुरंत कॉल करें</span>
                </a>

                <button
                  onClick={() => setActiveJobForApply(null)}
                  className="text-xs text-slate-400 underline font-semibold"
                >
                  डैशबोर्ड पर वापस आएं
                </button>
              </div>
            ) : (
              <form onSubmit={handle1ClickApply} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
                  <div className="text-emerald-400 font-bold">मजदूरी: {activeJobForApply.wagePerDay}</div>
                  <div className="text-slate-400">स्थान: {activeJobForApply.location} ({activeJobForApply.distanceKm} km)</div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    आपका नाम (Your Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    placeholder="जैसे: रामलाल कुशवाहा"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    मोबाइल नंबर (Phone Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={workerPhone}
                    onChange={(e) => setWorkerPhone(e.target.value)}
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    आप कहाँ रहते हैं? (Location)
                  </label>
                  <input
                    type="text"
                    value={workerLocation}
                    onChange={(e) => setWorkerLocation(e.target.value)}
                    placeholder="जैसे: भोपाल (एमपी नगर)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
                  >
                    <span>1-क्लिक सबमिट करें & कॉल नंबर पाएं</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
