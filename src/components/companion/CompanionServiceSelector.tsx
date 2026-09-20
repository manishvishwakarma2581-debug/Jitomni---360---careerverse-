import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Star, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  Award,
  Bike,
  User,
  Calculator,
  Gift,
  Timer,
  Moon,
  Info,
  ChevronRight,
  MapPin,
  Check
} from 'lucide-react';
import { CompanionCategoryType, CompanionServiceCategory, Language, SovereignTaskServiceId, CompanionVehicleMode } from '../../types';
import { companionCategories, SOVEREIGN_TASK_SERVICES, SOVEREIGN_COMPANION_RULES } from '../../data/companionData';

interface CompanionServiceSelectorProps {
  selectedCategory: CompanionCategoryType;
  onSelectCategory: (cat: CompanionCategoryType, subServiceId?: string) => void;
  onQuickBook: (cat: CompanionCategoryType) => void;
  onSelectTask?: (taskId: SovereignTaskServiceId, vehicleMode: CompanionVehicleMode) => void;
  lang: Language;
}

export const CompanionServiceSelector: React.FC<CompanionServiceSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  onQuickBook,
  onSelectTask,
  lang,
}) => {
  // Rate Card Table Mode Filter: All, Without Bike, or With Bike
  const [rateCardMode, setRateCardMode] = useState<CompanionVehicleMode>('without_bike');

  // Interactive Live Rule 1 Simulator: Distance (KM)
  const [simKm, setSimKm] = useState<number>(8);

  // Interactive Live Rule 2 Simulator: Waiting Minutes
  const [simWaitMins, setSimWaitMins] = useState<number>(90);

  const handleBookTask = (taskId: SovereignTaskServiceId, vehicleMode: CompanionVehicleMode, category: CompanionCategoryType) => {
    if (onSelectTask) {
      onSelectTask(taskId, vehicleMode);
    } else {
      onSelectCategory(category);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06142E] via-[#040B1A] to-black border-2 border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-black border border-[#FFD700]/50 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              BUILDINDIA • PADHAI SE KAMAI TAK
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Police & Aadhaar Verified
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40 font-mono">
              FINAL SOVEREIGN TARIFF 2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
            {lang === 'hi' ? (
              <>
                जिटोम्नी 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">ऑन-डिमांड साथी</span> एवं टास्क सेवा
              </>
            ) : (
              <>
                Jitomni 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF]">On-Demand Companion</span> & Task Service
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {lang === 'hi'
              ? 'अस्पताल ओपीडी, बुजुर्ग देखभाल, बैंक कतार, शहर नेविगेशन, लोकल डिलीवरी व शादी इवेंट हेतु 100% वेरिफाइड युवा साथी। बिना बिचौलियों के पारदर्शी प्रति-घंटा रेट कार्ड और 3 सुरक्षा नियम।'
              : 'Compassionate, 100% police-verified companions for hospital bedside support, elderly assistance, bank errands, city guide & rapid deliveries. Transparent hourly rates with guaranteed minimum booking.'}
          </p>

          {/* Key Trust Pillars */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <div>
                <div className="font-bold text-white">CID & Police Verified</div>
                <div className="text-[10px] text-slate-400">Zero Criminal Record</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">🏍️</span>
              <div>
                <div className="font-bold text-white">Bike / Non-Bike Options</div>
                <div className="text-[10px] text-slate-400">Pillion Ride Facility</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <div>
                <div className="font-bold text-white">4 KM Free Rule</div>
                <div className="text-[10px] text-slate-400">Tasks 4, 5, 6 Ride Saver</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <div>
                <div className="font-bold text-white">Fair Waiting Charge</div>
                <div className="text-[10px] text-slate-400">Hospital & Bank Protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 0. NEW FEATURE HIGHLIGHT: HUMARA MEDICAL SATHI 3-LEVEL HOSPITAL ESCORT */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#020B1A] via-[#081F4D] to-[#030D24] border-2 border-[#FFD700] p-6 sm:p-7 shadow-[0_0_35px_rgba(255,215,0,0.2)]">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                NEW 3-LEVEL SERVICE MODEL
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-black border border-[#FFD700]/50 font-mono">
                Railway Station / Home Se Hospital Tak
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              HUMARA Medical Sathi - Complete Hospital Escort Service
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              <strong>Railway Station / Home Se Hospital Tak — Nurse + Doctor Ki Nigrani Me</strong>. 3 पारदर्शी स्तर: 
              <span className="text-[#FFD700] font-bold"> Level 1 (Basic Sathi)</span>, 
              <span className="text-cyan-300 font-bold"> Level 2 (Sathi + Nurse)</span>, व 
              <span className="text-amber-300 font-bold"> Level 3 (Sathi + Nurse + Doctor Supervision)</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory('hospital_care')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-xs sm:text-sm transition-all hover:scale-105 shadow-xl shadow-[#FFD700]/30 flex items-center gap-2 border-2 border-white/60 whitespace-nowrap"
          >
            <span>🏥 Explore 3-Level Medical Sathi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MASTER RATE CARD TABLE: 8 SOVEREIGN SERVICES WITH ACCURATE TARIFF */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-b from-[#081838] to-[#040C1C] border-2 border-[#FFD700]/40 p-5 sm:p-7 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-700/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#FFD700]/20 text-[#FFD700] text-[11px] font-black uppercase tracking-wider border border-[#FFD700]/40">
                OFFICIAL RATE CARD
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% पारदर्शी दरें • कोई गुप्त शुल्क नहीं
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'hi' ? 'साथी एवं टास्क ऑफिशियल रेट कार्ड (सभी 8 सेवाएं)' : 'Official Sovereign Companion Rate Card (All 8 Services)'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {lang === 'hi' 
                ? 'बिना बाइक वाला साथी (पैदल/बस) अथवा बाइक वाला साथी (+ राइड सुविधा) अपनी जरूरत के अनुसार चुनें' 
                : 'Choose without-bike companion (walking/bus) or bike companion (+ ride included) based on requirement'}
            </p>
          </div>

          {/* Sathi Mode Toggle */}
          <div className="flex items-center gap-1 bg-black/60 p-1.5 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => setRateCardMode('without_bike')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                rateCardMode === 'without_bike'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>🚶‍♂️ बिना बाइक वाला साथी</span>
            </button>
            <button
              type="button"
              onClick={() => setRateCardMode('with_bike')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                rateCardMode === 'with_bike'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-amber-900" />
              <span>🏍️ बाइक वाला साथी (+ राइड)</span>
            </button>
          </div>
        </div>

        {/* 8-Services Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-black/40">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#091E44] border-b border-slate-700 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">क्र.सं.</th>
                <th className="py-3.5 px-4 min-w-[200px]">काम का नाम (Service Task)</th>
                <th className="py-3.5 px-4 min-w-[140px]">
                  <span className="flex items-center gap-1 text-blue-300">
                    <User className="w-3.5 h-3.5" />
                    <span>बिना बाइक (/घंटा)</span>
                  </span>
                </th>
                <th className="py-3.5 px-4 min-w-[170px]">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Bike className="w-3.5 h-3.5" />
                    <span>बाइक वाला साथी (/घंटा) + राइड</span>
                  </span>
                </th>
                <th className="py-3.5 px-4 text-center">न्यूनतम बुकिंग</th>
                <th className="py-3.5 px-4 min-w-[150px]">विशेष नियम व सुविधा</th>
                <th className="py-3.5 px-4 text-right">त्वरित एक्शन</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {SOVEREIGN_TASK_SERVICES.map((task) => {
                const isSelected = selectedCategory === task.category;
                return (
                  <tr 
                    key={task.id} 
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    {/* Task Number */}
                    <td className="py-4 px-4 font-mono font-black text-amber-400 text-sm">
                      #{task.taskNumber}
                    </td>

                    {/* Task Title & Description */}
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5 p-1.5 rounded-xl bg-slate-900 border border-slate-700">
                          {task.icon}
                        </span>
                        <div>
                          <div className="font-black text-white text-sm">
                            {task.name[lang] || task.name.hi}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight mt-0.5 max-w-sm">
                            {task.desc[lang] || task.desc.hi}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Bina Bike Rate */}
                    <td className="py-4 px-4">
                      {task.withoutBikeRatePerHour !== null ? (
                        <div>
                          <span className="text-base font-black font-mono text-white">
                            ₹{task.withoutBikeRatePerHour}
                          </span>
                          <span className="text-slate-400 text-[11px]">/hr</span>
                          {task.withoutBikeNote && (
                            <div className="text-[10px] text-slate-400 italic mt-0.5">
                              {task.withoutBikeNote[lang] || task.withoutBikeNote.hi}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono italic">— (केवल बाइक)</span>
                      )}
                    </td>

                    {/* Bike Wala Sathi Rate */}
                    <td className="py-4 px-4">
                      <div>
                        {task.isRideService ? (
                          <div>
                            <div className="text-sm font-black font-mono text-amber-300">
                              Base ₹30 + ₹10/KM
                            </div>
                            <div className="text-[10px] text-cyan-300 font-bold">
                              रात (9pm-6am): ₹12/KM
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-base font-black font-mono text-amber-400">
                              ₹{task.withBikeRatePerHour}
                            </span>
                            <span className="text-slate-400 text-[11px]">/hr</span>
                            {task.withBikeNote && (
                              <div className="text-[10px] text-amber-300/90 mt-0.5 font-medium">
                                {task.withBikeNote[lang] || task.withBikeNote.hi}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Minimum Booking */}
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-mono font-bold text-xs border border-slate-700 whitespace-nowrap">
                        {task.minBookingHours > 0 ? `${task.minBookingHours} Hour` : 'Ride Based'}
                      </span>
                    </td>

                    {/* Rules & Badges */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {task.hasFourKmFreeRule && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black text-[10px] border border-emerald-500/40 flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            <span>0-4 KM FREE</span>
                          </span>
                        )}
                        {task.hasWaitingChargeRule && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[10px] border border-purple-500/40 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            <span>WAITING RULE</span>
                          </span>
                        )}
                        {task.taskNumber === 6 && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold text-[10px] border border-rose-500/40">
                            🛡️ रैपिडो स्टाइल
                          </span>
                        )}
                        {task.taskNumber === 7 && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
                            🪔 इवेंट क्रू
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleBookTask(task.id, rateCardMode, task.category)}
                        className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:from-white hover:to-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1 ml-auto whitespace-nowrap"
                      >
                        <span>बुक करें</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE FIXED MANDATORY RULES (3 FIX RULES) SHOWCASE & SIMULATORS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-black uppercase tracking-wider border border-cyan-500/40">
                SYSTEM GUARANTEE
              </span>
              <span className="text-xs text-amber-400 font-bold">3 Rule Fix • स्थायी नियम</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {lang === 'hi' ? 'तीन अनिवार्य नियम — ग्राहक एवं साथी दोनों के हित में' : 'Three Sovereign Rules — Fair Pricing & Worker Protection'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* RULE 1: 4 KM Free Rule */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#061F1A] via-[#051412] to-black border-2 border-emerald-500/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-emerald-400" />
                  <span>नियम 1: 4 KM FREE RULE</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">काम नं. 4, 5, 6</span>
              </div>
              <h4 className="text-base font-black text-white">पहले 4 KM का कोई शुल्क नहीं</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                काम नं. 4 (शहर गाइड), 5 (सामान डिलीवरी) व 6 (सुरक्षित यात्रा) में पहले 4 किलोमीटर बाइक राइड बिल्कुल मुफ्त है। 4 KM के बाद ही ₹10/KM जुड़ेगा ताकि छोटे कामों में ग्राहक को महंगा न लगे।
              </p>
            </div>

            {/* Interactive Rule 1 Live Calculator */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">दूरी टेस्ट करें:</span>
                <span className="font-mono text-emerald-300 font-bold">{simKm} KM</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={simKm}
                onChange={(e) => setSimKm(Number(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {simKm <= 4 ? '0-4 KM Free:' : `4 KM Free + ${simKm - 4}KM:`}
                </span>
                <span className="font-black text-emerald-400 text-sm">
                  ₹{Math.max(0, simKm - 4) * 10} {simKm <= 4 && '(100% FREE!)'}
                </span>
              </div>
            </div>
          </div>

          {/* RULE 2: Waiting Charge Rule */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#1C0F2B] via-[#12071C] to-black border-2 border-purple-500/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-500/40 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-purple-400" />
                  <span>नियम 2: WAITING CHARGE</span>
                </span>
                <span className="text-xs font-mono text-purple-400 font-bold">काम नं. 2, 3</span>
              </div>
              <h4 className="text-base font-black text-white">कतार व दवा वेटिंग सुरक्षा</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                हॉस्पिटल (काम 2) व बैंक (काम 3) में यदि साथी को 1 घंटे (60 मिनट) से अधिक खड़ा रहना पड़े, तो हर अतिरिक्त 30 मिनट का ₹50 अतिरिक्त वेटिंग शुल्क देय होगा। (पहला 1 घंटा बुकिंग में शामिल है)।
              </p>
            </div>

            {/* Interactive Rule 2 Live Calculator */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">कुल वेटिंग समय:</span>
                <span className="font-mono text-purple-300 font-bold">{simWaitMins} Mins</span>
              </div>
              <input
                type="range"
                min="30"
                max="240"
                step="15"
                value={simWaitMins}
                onChange={(e) => setSimWaitMins(Number(e.target.value))}
                className="w-full accent-purple-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {simWaitMins <= 60 ? 'First 60m Free:' : `Extra ${simWaitMins - 60}m:`}
                </span>
                <span className="font-black text-purple-300 text-sm">
                  ₹{simWaitMins <= 60 ? 0 : Math.ceil((simWaitMins - 60) / 30) * 50}
                  {simWaitMins <= 60 && ' (शामिल)'}
                </span>
              </div>
            </div>
          </div>

          {/* RULE 3: Night Ride Tariff & Minimum Booking Guarantee */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#1F1705] via-[#140E02] to-black border-2 border-amber-500/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>नियम 3: NIGHT & MIN HOURS</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">सभी 8 सेवाएं</span>
              </div>
              <h4 className="text-base font-black text-white">नाइट टैरिफ एवं न्यूनतम बुकिंग</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                SIRF Ride Service में दिन में ₹10/KM व रात 9pm-6am में ₹12/KM लागू होगा। साथी की रोजी-रोटी की सुरक्षा हेतु न्यूनतम बुकिंग (1h, 2h, 3h) अनिवार्य है ताकि किसी भी साथी का समय व यात्रा व्यर्थ न जाए।
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>दिन की राइड (6am - 9pm):</span>
                <strong className="text-white">Base ₹30 + ₹10/KM</strong>
              </div>
              <div className="flex items-center justify-between text-amber-300">
                <span>रात की राइड (9pm - 6am):</span>
                <strong className="text-amber-400">Base ₹30 + ₹12/KM</strong>
              </div>
              <div className="pt-1 border-t border-slate-800 text-[11px] text-emerald-400 font-sans">
                ✓ बुजुर्ग/अस्पताल/बैंक: Min 2h | इवेंट: Min 3h | अन्य: Min 1h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ORIGINAL 5 SERVICE VERTICALS CARDS (FOR DEEP DETAILED EXPLORATION) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <span>विस्तृत सेवा श्रेणियां</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-mono font-bold">
                Detailed Vertical Explorer
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'hi'
                ? 'विशिष्ट कार्य, अनुशंसित घंटे व त्वरित आवश्यकताएं देखने के लिए श्रेणी कार्ड चुनें:'
                : 'Browse category cards to inspect specific sub-services, recommended hours and prompts:'}
            </p>
          </div>
        </div>

        {/* 5 Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companionCategories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <div
                key={category.id}
                id={`service-card-${category.id}`}
                className={`group relative rounded-3xl p-6 transition-all duration-300 border-2 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-br ${category.themeColor.bgGlow} ${category.themeColor.border} shadow-[0_0_35px_rgba(255,215,0,0.15)] ring-2 ring-[#FFD700]/40 scale-[1.01]`
                    : `bg-[#07132B]/80 hover:bg-[#0A1A38] border-slate-700/60 ${category.themeColor.border}`
                }`}
              >
                {/* Category Anchor Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase border ${category.themeColor.badge}`}>
                    {category.visualAnchorBadge}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs">
                    <span className="text-slate-400">Starting</span>
                    <span className="font-bold text-[#FFD700]">₹{category.baseHourlyRate}</span>
                    <span className="text-[10px] text-slate-400">/hr</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl p-2.5 rounded-2xl bg-black/40 border border-white/10">
                      {category.icon}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-[#FFD700] transition-colors">
                        {category.title[lang] || category.title.hi}
                      </h4>
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Police & Aadhaar Verified Crew
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                    {category.tagline[lang] || category.tagline.hi}
                  </p>

                  {/* Sub-services Breakdown Pills */}
                  <div className="mt-4 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'hi' ? 'शामिल मुख्य कार्य (Sub-Services):' : 'Key Included Tasks:'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.subServices.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCategory(category.id, sub.id);
                          }}
                          className="p-2.5 rounded-xl bg-black/40 hover:bg-black/80 border border-white/5 hover:border-[#FFD700]/40 transition-all cursor-pointer flex items-start gap-2 text-left"
                        >
                          <span className="text-sm mt-0.5">{sub.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-200 truncate">
                              {sub.name[lang] || sub.name.hi}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-2.5 h-2.5 text-amber-400" />
                              <span>Recommended: ~{sub.recommendedHours} hrs</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Popular Requirement Samples */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                      {lang === 'hi' ? 'त्वरित आवश्यकताएं (Quick Prompts):' : 'Common Requirement Prompts:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.quickRequirements.slice(0, 3).map((req, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5"
                        >
                          "{req}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    id={`select-cat-btn-${category.id}`}
                    type="button"
                    onClick={() => onSelectCategory(category.id)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
                      isSelected
                        ? 'bg-white text-slate-950 border-white shadow-md'
                        : 'bg-[#0A1A38] text-slate-200 hover:text-white border-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <span>{isSelected ? '✓ चयनित श्रेणी' : 'विवरण देखें'}</span>
                  </button>

                  <button
                    id={`book-now-btn-${category.id}`}
                    type="button"
                    onClick={() => onQuickBook(category.id)}
                    className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 text-white bg-gradient-to-r ${category.themeColor.gradient} hover:brightness-110 shadow-lg`}
                  >
                    <span>{lang === 'hi' ? 'बुक करें' : 'Book Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
