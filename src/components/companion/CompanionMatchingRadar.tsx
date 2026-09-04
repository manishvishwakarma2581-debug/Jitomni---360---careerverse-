import React, { useState, useEffect } from 'react';
import { ShieldCheck, Star, Clock, MapPin, Phone, CheckCircle2, Award, Sparkles, Navigation, ArrowRight, UserCheck, RefreshCw } from 'lucide-react';
import { CompanionBooking, CompanionWorker, Language } from '../../types';
import { verifiedCompanionWorkersPool } from '../../data/companionData';

interface CompanionMatchingRadarProps {
  pendingBooking: Partial<CompanionBooking>;
  onConfirmCompanion: (worker: CompanionWorker) => void;
  onBackToEdit: () => void;
  lang: Language;
}

export const CompanionMatchingRadar: React.FC<CompanionMatchingRadarProps> = ({
  pendingBooking,
  onConfirmCompanion,
  onBackToEdit,
  lang,
}) => {
  const [scanning, setScanning] = useState(true);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  // Filter companions according to requirements
  const matchedWorkers = verifiedCompanionWorkersPool.filter((worker) => {
    if (pendingBooking.genderPreference && pendingBooking.genderPreference !== 'any') {
      if (worker.gender !== pendingBooking.genderPreference) return false;
    }
    return true;
  });

  // Display scan pulse for 1.2s to give authentic real-time matching experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      if (matchedWorkers.length > 0) {
        setSelectedWorkerId(matchedWorkers[0].id);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header & Search Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#07132B] via-[#091D3E] to-[#040C1A] border-2 border-[#FFD700]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Police & Aadhaar Verified
            </span>
            <span className="text-xs text-amber-300 font-mono">Radius: 5.0 km</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {scanning ? 'नजदीकी वेरिफाइड साथी खोजे जा रहे हैं...' : 'उपलब्ध प्रमाणित साथी मैच (Verified Gig Companions)'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Task: <strong className="text-white">{pendingBooking.address || 'Local Task'}</strong> • Duration:{' '}
            <strong className="text-amber-400">{pendingBooking.durationHours || 4} Hours</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToEdit}
            className="px-3.5 py-2 rounded-xl bg-black/40 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold"
          >
            ← विवरण बदलें
          </button>
        </div>
      </div>

      {/* Radar Scanning Visual State */}
      {scanning && (
        <div className="py-16 text-center space-y-4">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-cyan-500/50 animate-pulse" />
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
              <Navigation className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <div>
            <div className="text-base font-black text-white">डिजिटल पुलिस रिकॉर्ड व जीपीएस स्कैनिंग...</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Verifying CID clearance • Calculating route distance • Checking availability
            </div>
          </div>
        </div>
      )}

      {/* Matched Companion Profiles Cards */}
      {!scanning && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{matchedWorkers.length} प्रमाणित साथी आपकी आवश्यकता के अनुकूल पाए गए:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All police dossiers active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedWorkers.map((worker) => {
              const isSelected = selectedWorkerId === worker.id;

              return (
                <div
                  key={worker.id}
                  id={`worker-card-${worker.id}`}
                  onClick={() => setSelectedWorkerId(worker.id)}
                  className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#091D3E] via-[#051126] to-black border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] ring-2 ring-[#FFD700]/50'
                      : 'bg-[#07132B]/70 hover:bg-[#0A1A38] border-slate-700/60'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{worker.badgeTitle}</span>
                    </span>

                    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-black/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{worker.rating}</span>
                      <span className="text-slate-400 text-[10px]">({worker.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Worker Main Profile Row */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={worker.photoUrl}
                        alt={worker.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" title="Available Now" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-white truncate">{worker.name}</h4>
                        <span className="text-xs text-slate-400">({worker.age}y, {worker.gender})</span>
                      </div>

                      {/* Police ID Badge */}
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-bold">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Police ID: {worker.policeVerificationId}</span>
                      </div>

                      {/* Distance & ETA */}
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-300">
                        <span className="flex items-center gap-1 text-cyan-300 font-medium">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{worker.distanceKm} km away</span>
                        </span>
                        <span className="flex items-center gap-1 text-amber-300 font-medium">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{worker.etaMinutes} mins ETA</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specialization & Languages */}
                  <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs space-y-1.5">
                    <p className="text-slate-200 line-clamp-2 leading-relaxed">
                      <strong>विशिष्टता: </strong>
                      {worker.specialization[lang] || worker.specialization.hi}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>
                        🗣️ बोलचाल: <strong className="text-slate-200">{worker.languages.join(', ')}</strong>
                      </span>
                      <span>
                        ⭐ पूर्ण कार्य: <strong className="text-emerald-400">{worker.tasksCompleted} Tasks</strong>
                      </span>
                    </div>
                  </div>

                  {/* Hourly Rate & Confirm Button */}
                  <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400">Hourly Charge</div>
                      <div className="text-base font-black text-[#FFD700] font-mono">
                        ₹{worker.hourlyRate}/hr
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${worker.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-black/60 text-cyan-300 hover:text-white border border-cyan-500/40 hover:bg-cyan-950/60 transition-all text-xs"
                        title="Direct Call to Companion"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onConfirmCompanion(worker);
                        }}
                        className="py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-1.5"
                      >
                        <span>साथी कन्फर्म करें</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
