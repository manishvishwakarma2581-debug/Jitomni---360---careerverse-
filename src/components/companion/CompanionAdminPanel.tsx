import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Wallet,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Flag,
  TrendingUp,
  Search,
  Eye,
  RefreshCw,
  Building2,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Star,
  ExternalLink,
  Percent,
  Car,
  Bike,
  Navigation,
  Info
} from 'lucide-react';
import {
  CompanionWorker,
  CompanionTaskCommissionRecord,
  RidePlatformFeeRecord,
  Language
} from '../../types';
import {
  initialVerifiedWorkers,
  initialPlatformCommissionRecords,
  initialRidePlatformFeeRecords
} from '../../data/companionData';

interface CompanionAdminPanelProps {
  lang: Language;
  onNavigateToWorker?: () => void;
}

export const CompanionAdminPanel: React.FC<CompanionAdminPanelProps> = ({
  lang,
  onNavigateToWorker
}) => {
  // Workers list
  const [workersList, setWorkersList] = useState<CompanionWorker[]>(initialVerifiedWorkers);
  const [selectedWorkerForReview, setSelectedWorkerForReview] = useState<CompanionWorker | null>(null);

  // Commission Records & Platform Financials
  const [commissionRecords, setCommissionRecords] = useState<CompanionTaskCommissionRecord[]>(initialPlatformCommissionRecords);
  const [rideFeeRecords, setRideFeeRecords] = useState<RidePlatformFeeRecord[]>(initialRidePlatformFeeRecords);
  const [platformBalance, setPlatformBalance] = useState<number>(634); // Platform Wallet 20%
  const [activeAdminTab, setActiveAdminTab] = useState<'verification' | 'financials' | 'rating_audit'>('verification');
  const [financialsSubTab, setFinancialsSubTab] = useState<'rides' | 'tasks'>('rides');

  // Filter for workers: 'all' | 'pending' | 'verified' | 'flagged'
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'flagged'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Rating Simulator State (allows testing the <4.0★ auto-flagging directly)
  const [rateWorkerId, setRateWorkerId] = useState<string>('cmp-01');
  const [ratingValue, setRatingValue] = useState<number>(1);
  const [reviewComment, setReviewComment] = useState<string>('Late arrival on hospital night shift duty.');
  const [rateFeedbackMsg, setRateFeedbackMsg] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch backend data
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch workers
      const wRes = await fetch('/api/companion/workers');
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData.workers) {
          setWorkersList(wData.workers);
        }
      }

      // 2. Fetch financials (Task commissions + Ride fees)
      const fRes = await fetch('/api/companion/admin/financials');
      if (fRes.ok) {
        const fData = await fRes.json();
        if (fData.financials) {
          setPlatformBalance(fData.financials.platformWalletBalance);
        }
        if (fData.commissionRecords) {
          setCommissionRecords(fData.commissionRecords);
        }
        if (fData.ridePlatformFeeRecords) {
          setRideFeeRecords(fData.ridePlatformFeeRecords);
        }
      }
    } catch (e) {
      console.warn('Fallback to local admin initial data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Filtered workers list
  const filteredWorkers = workersList.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.phone.includes(searchTerm) ||
      w.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'pending') return w.verificationStatus === 'pending_approval';
    if (statusFilter === 'verified') return w.verificationStatus === 'verified_active';
    if (statusFilter === 'flagged') return w.isFlagged;
    return true;
  });

  // Verification Toggle: Approve (verified_active), Pending (pending_approval), Reject (rejected)
  const handleToggleVerificationStatus = async (
    workerId: string,
    newStatus: 'verified_active' | 'pending_approval' | 'rejected'
  ) => {
    setActionSuccessMsg(null);
    try {
      const res = await fetch('/api/companion/admin/verify-worker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId, newStatus })
      });
      if (res.ok) {
        const d = await res.json();
        setActionSuccessMsg(`सफलतापूर्वक अपडेट किया गया: ${d.message}`);
        // Update local state
        setWorkersList((prev) =>
          prev.map((w) => (w.id === workerId ? { ...w, verificationStatus: newStatus, policeVerified: newStatus === 'verified_active' } : w))
        );
        if (selectedWorkerForReview && selectedWorkerForReview.id === workerId) {
          setSelectedWorkerForReview({ ...selectedWorkerForReview, verificationStatus: newStatus, policeVerified: newStatus === 'verified_active' });
        }
      }
    } catch (e) {
      // Local fallback
      setActionSuccessMsg(`साथी स्थिति को ${newStatus} में परिवर्तित किया गया।`);
      setWorkersList((prev) =>
        prev.map((w) => (w.id === workerId ? { ...w, verificationStatus: newStatus, policeVerified: newStatus === 'verified_active' } : w))
      );
      if (selectedWorkerForReview && selectedWorkerForReview.id === workerId) {
        setSelectedWorkerForReview({ ...selectedWorkerForReview, verificationStatus: newStatus, policeVerified: newStatus === 'verified_active' });
      }
    }
  };

  // Flag toggle
  const handleToggleFlag = async (workerId: string, currentFlagged: boolean) => {
    const newFlag = !currentFlagged;
    try {
      await fetch('/api/companion/admin/flag-worker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId,
          isFlagged: newFlag,
          flagReason: newFlag ? 'मैन्युअल एडमिन समीक्षा फ्लैग' : undefined
        })
      });
    } catch (e) {
      console.warn('Flag toggle fallback', e);
    }
    setWorkersList((prev) =>
      prev.map((w) =>
        w.id === workerId
          ? {
              ...w,
              isFlagged: newFlag,
              flagReason: newFlag ? 'मैन्युअल एडमिन समीक्षा फ्लैग' : undefined
            }
          : w
      )
    );
  };

  // Submit Rating Test (Triggers Backend Calculation and <4.0★ Auto-Flagging)
  const handleSubmitRatingSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateFeedbackMsg(null);

    try {
      const res = await fetch('/api/companion/task/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: rateWorkerId,
          rating: ratingValue,
          customerName: 'Sovereign Audit Client',
          comment: reviewComment
        })
      });

      const d = await res.json();
      if (res.ok) {
        setRateFeedbackMsg(d.message);
        // Refresh local list
        setWorkersList((prev) =>
          prev.map((w) =>
            w.id === rateWorkerId
              ? {
                  ...w,
                  rating: d.newRating,
                  reviewsCount: d.newReviewsCount,
                  isFlagged: d.isFlagged,
                  flagReason: d.flagReason
                }
              : w
          )
        );
      } else {
        setRateFeedbackMsg(d.message || 'रेटिंग दर्ज करने में त्रुटि');
      }
    } catch (e) {
      // Local calculation fallback
      const worker = workersList.find((w) => w.id === rateWorkerId);
      if (worker) {
        const newCount = (worker.reviewsCount || 0) + 1;
        const newRating = Number((((worker.rating * worker.reviewsCount) + ratingValue) / newCount).toFixed(2));
        const newlyFlagged = newRating < 4.0;
        const flagReason = newlyFlagged ? `Auto-Flagged: Rating dropped to ${newRating}★ (< 4.0★ threshold)` : undefined;

        setWorkersList((prev) =>
          prev.map((w) =>
            w.id === rateWorkerId
              ? {
                  ...w,
                  rating: newRating,
                  reviewsCount: newCount,
                  isFlagged: newlyFlagged,
                  flagReason
                }
              : w
          )
        );

        setRateFeedbackMsg(
          newlyFlagged
            ? `रेटिंग अपडेट: नई औसत ${newRating}★ (< 4.0) - खाता स्वचालित रूप से फ्लैग कर दिया गया!`
            : `रेटिंग अपडेट: नई औसत ${newRating}★ दर्ज की गई।`
        );
      }
    }
  };

  // Financial aggregates (Companion Tasks)
  const totalGrossVolume = commissionRecords.reduce((acc, c) => acc + (c.grossFee || 0), 0);
  const totalWorkerPayouts = commissionRecords.reduce((acc, c) => acc + (c.workerShare80 || 0), 0);
  const totalPlatformCommission = commissionRecords.reduce((acc, c) => acc + (c.platformShare20 || 0), 0);

  // Financial aggregates (Car & Bike Rides Fleet)
  const totalRideFareVolume = rideFeeRecords.reduce((acc, r) => acc + (r.totalFare || 0), 0);
  const totalRideDriverPayouts = rideFeeRecords.reduce((acc, r) => acc + (r.driverPayout || 0), 0);
  const totalRidePlatformFees = rideFeeRecords.reduce((acc, r) => acc + (r.platformFee || 0), 0);

  // Combined Platform Operational Reserve
  const combinedPlatformFunds = platformBalance + totalPlatformCommission + totalRidePlatformFees;

  const pendingApprovalsCount = workersList.filter((w) => w.verificationStatus === 'pending_approval').length;
  const flaggedCount = workersList.filter((w) => w.isFlagged).length;

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Admin Header */}
      <div className="bg-[#0B1E3B] border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FFD700]" />
              <h2 className="text-lg font-black text-white">
                जितोमनी सोवरेन एडमिन कंट्रोल पैनल (Sovereign Admin & Audit System)
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                10% Ride Fee & 80/20 Split Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              दस्तावेज सत्यापन (Pending Approval/Active), कार-बाइक 10% प्लेटफ़ॉर्म प्रबंधन फंड, साथी 80/20 कमिशन वॉलेट एवं रेटिंग बैकग्राउंड मॉनिटर।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadAdminData}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#FFD700]' : ''}`} />
              <span>सिंक रीफ्रेश</span>
            </button>
            {onNavigateToWorker && (
              <button
                type="button"
                onClick={onNavigateToWorker}
                className="px-3.5 py-2 rounded-xl bg-[#FFD700] hover:bg-[#ffe033] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20 transition-all"
              >
                <span>साथी पोर्टल देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Global KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800">
          <div className="bg-[#07132B] p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              कुल प्लेटफ़ॉर्म रिज़र्व फंड
            </span>
            <p className="text-xl font-black text-[#FFD700] font-mono">
              ₹{combinedPlatformFunds}
            </p>
            <span className="text-[10px] text-slate-400">टास्क 20% + राइड 10% पूल</span>
          </div>

          <div className="bg-[#07132B] p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
              राइड प्रबंधन शुल्क (10%)
            </span>
            <p className="text-xl font-black text-amber-400 font-mono">
              ₹{totalRidePlatformFees}
            </p>
            <span className="text-[10px] text-slate-400">ड्राइवर पेआउट: ₹{totalRideDriverPayouts}</span>
          </div>

          <div className="bg-[#07132B] p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              साथी टास्क फंड (80/20)
            </span>
            <p className="text-xl font-black text-emerald-400 font-mono">
              ₹{totalWorkerPayouts}
            </p>
            <span className="text-[10px] text-slate-400">श्रमिक वॉलेट में जमा</span>
          </div>

          <div className="bg-[#07132B] p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
              लंबित / फ्लैग खाते
            </span>
            <p className="text-xl font-black text-red-400 font-mono">
              {pendingApprovalsCount} / {flaggedCount}
            </p>
            <span className="text-[10px] text-slate-400">समीक्षा व अलर्ट</span>
          </div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveAdminTab('verification')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeAdminTab === 'verification'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>📑 साथी सत्यापन नियंत्रण (Verification Control)</span>
          {pendingApprovalsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500 text-slate-950 font-bold font-mono">
              {pendingApprovalsCount} Pending
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminTab('financials')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeAdminTab === 'financials'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          <span>💰 80/20 कमिशन व वॉलेट लेजर (Split Ledger)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminTab('rating_audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeAdminTab === 'rating_audit'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>⭐ रेटिंग सिस्टम व फ्लैग्ड खाते (&lt;4.0★ Audit & Test)</span>
          {flaggedCount > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-600 text-white font-bold font-mono">
              {flaggedCount} Flagged
            </span>
          )}
        </button>
      </div>

      {actionSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 1: VERIFICATION CONTROL (Review documents & toggle)  */}
      {/* ============================================================ */}
      {activeAdminTab === 'verification' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B1E3B] p-4 rounded-xl border border-slate-700">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#07132B] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                सभी साथी ({workersList.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'pending'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-[#07132B] text-amber-300 hover:text-white border border-slate-700'
                }`}
              >
                ⏳ लंबित अनुमोदन (Pending: {pendingApprovalsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('verified')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'verified'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-[#07132B] text-emerald-300 hover:text-white border border-slate-700'
                }`}
              >
                🛡️ सत्यापित एक्टिव ({workersList.filter((w) => w.verificationStatus === 'verified_active').length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'flagged'
                    ? 'bg-red-600 text-white font-black'
                    : 'bg-[#07132B] text-red-300 hover:text-white border border-slate-700'
                }`}
              >
                ⚠️ फ्लैग्ड (&lt;4★: {flaggedCount})
              </button>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="नाम, शहर, फोन खोजें..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#07132B] border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Workers Table / Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Workers List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() => setSelectedWorkerForReview(worker)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedWorkerForReview?.id === worker.id
                      ? 'bg-[#0e274d] border-[#FFD700] shadow-md shadow-[#FFD700]/10'
                      : 'bg-[#0B1E3B] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.photoUrl}
                      alt={worker.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                        <span className="text-xs text-slate-400">({worker.city})</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                        {worker.specialization.hi}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>⭐ {worker.rating}</span>
                        <span>•</span>
                        <span>दर: ₹{worker.hourlyRate}/घंटा</span>
                        <span>•</span>
                        <span>पूर्ण कार्य: {worker.tasksCompleted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Quick Toggle */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                        worker.verificationStatus === 'verified_active'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : worker.verificationStatus === 'pending_approval'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-red-500/20 text-red-300 border-red-500/40'
                      }`}
                    >
                      {worker.verificationStatus === 'verified_active'
                        ? 'Active'
                        : worker.verificationStatus === 'pending_approval'
                        ? 'Pending'
                        : 'Rejected'}
                    </span>

                    {worker.isFlagged && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-600/30 text-red-300 border border-red-500">
                        🚩 &lt;4★
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkerForReview(worker);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs"
                      title="दस्तावेज समीक्षा करें"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredWorkers.length === 0 && (
                <div className="text-center py-12 bg-[#0B1E3B] rounded-xl border border-slate-800 p-4">
                  <p className="text-xs text-slate-400">कोई साथी रिकॉर्ड नहीं मिला।</p>
                </div>
              )}
            </div>

            {/* Right: Detailed Document Inspection Panel */}
            <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-5 shadow-xl space-y-5 lg:sticky lg:top-4 h-fit">
              {selectedWorkerForReview ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#FFD700]" />
                      <span>दस्तावेज प्रमाणन समीक्षा (Document Dossier)</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {selectedWorkerForReview.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={selectedWorkerForReview.photoUrl}
                      alt={selectedWorkerForReview.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-600"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{selectedWorkerForReview.name}</h4>
                      <p className="text-xs text-slate-400">
                        {selectedWorkerForReview.phone} • {selectedWorkerForReview.city}
                      </p>
                    </div>
                  </div>

                  {/* 3 Verification Documents Status */}
                  <div className="space-y-3 pt-2">
                    {/* 1. Aadhaar Card */}
                    <div className="p-3 bg-[#07132B] rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>1. आधार कार्ड (UIDAI e-KYC)</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                          {selectedWorkerForReview.documents?.aadhaar?.status || 'verified'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono">
                        नंबर: {selectedWorkerForReview.documents?.aadhaar?.number || 'XXXX-XXXX-4819'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        फाइल: {selectedWorkerForReview.documents?.aadhaar?.docName || 'Aadhaar_Upload.pdf'}
                      </p>
                    </div>

                    {/* 2. Police Verification */}
                    <div className="p-3 bg-[#07132B] rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>2. पुलिस सत्यापन (Police CID Cert)</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            selectedWorkerForReview.verificationStatus === 'verified_active'
                              ? 'text-emerald-400 bg-emerald-500/20'
                              : 'text-amber-400 bg-amber-500/20'
                          }`}
                        >
                          {selectedWorkerForReview.documents?.policeVerification?.status || 'pending'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono">
                        सर्टिफिकेट: {selectedWorkerForReview.documents?.policeVerification?.certNumber || selectedWorkerForReview.policeVerificationId}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        थाना: {selectedWorkerForReview.documents?.policeVerification?.policeStation || 'Saket Nagar PS, Bhopal'}
                      </p>
                    </div>

                    {/* 3. Background Check */}
                    <div className="p-3 bg-[#07132B] rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>3. बैकग्राउंड चेक (Character Audit)</span>
                        </span>
                        <span className="text-[10px] font-bold text-purple-400 bg-purple-500/20 px-1.5 py-0.5 rounded">
                          {selectedWorkerForReview.documents?.backgroundCheck?.status || 'verified'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono">
                        रेफरेंस ID: {selectedWorkerForReview.documents?.backgroundCheck?.certId || 'BG-MP-9941'}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        एजेंसी: {selectedWorkerForReview.documents?.backgroundCheck?.agency || 'Sovereign Integrity Cell'}
                      </p>
                    </div>
                  </div>

                  {/* 1-CLICK VERIFICATION TOGGLE BUTTONS */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      प्रमाणीकरण स्थिति बदलें (Toggle Verification):
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleVerificationStatus(selectedWorkerForReview.id, 'verified_active')
                        }
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>सत्यापित करें (Active)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggleVerificationStatus(selectedWorkerForReview.id, 'pending_approval')
                        }
                        className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending Review</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleVerificationStatus(selectedWorkerForReview.id, 'rejected')
                      }
                      className="w-full py-2 px-3 rounded-xl bg-red-900/50 hover:bg-red-800/80 text-red-200 border border-red-600/50 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>अस्वीकृत करें (Reject Application)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <FileCheck className="w-8 h-8 mx-auto text-slate-500" />
                  <p className="text-xs">
                    समीक्षा करने हेतु बाएं हाथ की सूची में से किसी साथी पर क्लिक करें।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: 80/20 & 90/10 PLATFORM REVENUE & WALLET SYSTEM    */}
      {/* ============================================================ */}
      {activeAdminTab === 'financials' && (
        <div className="space-y-6">
          <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-[#FFD700]" />
                  <span>प्लेटफ़ॉर्म कमिशन व प्रबंधन शुल्क लेजर (Platform Revenue & Fee Engine)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  कार व बाइक चालकों हेतु 90/10 विभाजन (90% ड्राइवर / 10% ऐप प्रबंधन) एवं टास्क साथियों हेतु 80/20 विभाजन।
                </p>
              </div>

              {/* Sub-toggle between Rides and Tasks */}
              <div className="flex items-center gap-2 bg-[#07132B] p-1.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setFinancialsSubTab('rides')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    financialsSubTab === 'rides'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>कार व बाइक (90/10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFinancialsSubTab('tasks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    financialsSubTab === 'tasks'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" />
                  <span>टास्क साथी (80/20)</span>
                </button>
              </div>
            </div>

            {/* RIDES 90/10 MANAGEMENT FEE VIEW */}
            {financialsSubTab === 'rides' && (
              <div className="space-y-6 animate-fadeIn">
                {/* 90/10 Ride Split Visualization Bar */}
                <div className="p-4 bg-[#07132B] rounded-xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Car className="w-4 h-4 text-emerald-400" />
                      <span>🚕 90% चालक की शुद्ध कमाई (Driver Payout)</span>
                    </span>
                    <span className="text-amber-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>🏛️ 10% जितोमनी प्रबंधन व सर्वर शुल्क (App Management Fee)</span>
                    </span>
                  </div>

                  <div className="w-full h-5 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
                    <div className="w-[90%] h-full bg-emerald-500 transition-all flex items-center justify-center text-[10px] font-black text-slate-950 font-mono">
                      90% DRIVER SHARE
                    </div>
                    <div className="w-[10%] h-full bg-amber-400 transition-all flex items-center justify-center text-[10px] font-black text-slate-950 font-mono">
                      10%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block">कुल राइड ग्रॉस वॉल्यूम</span>
                      <span className="text-base font-black text-white font-mono">₹{totalRideFareVolume}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block">चालकों के बैंक खाते में जमा (90%)</span>
                      <span className="text-base font-black text-emerald-400 font-mono">₹{totalRideDriverPayouts}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-300 block">जितोमनी सर्वर व सुरक्षा रिज़र्व (10%)</span>
                      <span className="text-base font-black text-amber-400 font-mono">₹{totalRidePlatformFees}</span>
                    </div>
                  </div>

                  {/* Why 10% Fee banner */}
                  <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-[11px]">10% न्यूनतम प्लेटफ़ॉर्म प्रबंधन शुल्क का उद्देश्य:</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        यह 10% शुल्क <strong>हाई-स्पीड क्लाउड सर्वर, 24/7 आपातकालीन SOS कॉल नेटवर्क, पुलिस बैकग्राउंड वेरिफिकेशन व रियल-टाइम GPS ट्रैकिंग</strong> के दैनिक खर्चों को चलाने के लिए लिया जाता है। अन्य कमर्शियल ऐप्स (Rapido/Ola/Uber) 30-35% तक काटते हैं, जबकि जितोमनी केवल 10% में संपूर्ण सोवरेन सुरक्षा व तकनीकी प्रबंधन उपलब्ध कराता है।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ride Ledger Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Car className="w-4 h-4 text-amber-400" />
                      <span>कार व बाइक राइड्स प्रबंधन शुल्क लेजर (Ride Platform Fee Records)</span>
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {rideFeeRecords.length} Rides Recorded
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#07132B] text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3">राइड / रूट</th>
                          <th className="p-3">चालक व संपर्क</th>
                          <th className="p-3">वाहन प्रकार</th>
                          <th className="p-3">दूरी</th>
                          <th className="p-3">कुल किराया</th>
                          <th className="p-3 text-emerald-400">90% चालक पेआउट</th>
                          <th className="p-3 text-amber-400">10% ऐप शुल्क</th>
                          <th className="p-3">स्थिति</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        {rideFeeRecords.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white flex items-center gap-1.5">
                                <Navigation className="w-3 h-3 text-cyan-400" />
                                <span>{r.route}</span>
                              </p>
                              <span className="text-[10px] font-mono text-slate-500">ID: {r.rideId} • {r.date}</span>
                            </td>
                            <td className="p-3">
                              <p className="font-medium text-slate-200">{r.driverName}</p>
                              <p className="text-[10px] font-mono text-slate-400">{r.driverPhone}</p>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                                {r.vehicleType.replace('_', ' ')}
                              </span>
                              <span className="block text-[10px] font-mono text-slate-400 mt-0.5">{r.vehicleNumber}</span>
                            </td>
                            <td className="p-3 font-mono text-slate-300">
                              {r.distanceKm} km
                            </td>
                            <td className="p-3 font-mono font-bold text-white">
                              ₹{r.totalFare}
                            </td>
                            <td className="p-3 font-mono font-bold text-emerald-400 bg-emerald-500/5">
                              ₹{r.driverPayout}
                            </td>
                            <td className="p-3 font-mono font-bold text-amber-400 bg-amber-500/5">
                              ₹{r.platformFee}
                            </td>
                            <td className="p-3">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TASKS 80/20 SPLIT VIEW */}
            {financialsSubTab === 'tasks' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Split Visualization Bar */}
                <div className="p-4 bg-[#07132B] rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span>👷 80% साथी का हिस्सा (Worker Share)</span>
                    </span>
                    <span className="text-[#FFD700] flex items-center gap-1">
                      <span>🏛️ 20% जितोमनी प्लेटफ़ॉर्म कमिशन (Jitomni Commission)</span>
                    </span>
                  </div>

                  <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden flex">
                    <div className="w-4/5 h-full bg-emerald-500 transition-all flex items-center justify-center text-[9px] font-black text-slate-950 font-mono">
                      80% WORKER
                    </div>
                    <div className="w-1/5 h-full bg-[#FFD700] transition-all flex items-center justify-center text-[9px] font-black text-slate-950 font-mono">
                      20%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block">कुल ग्रॉस टास्क वॉल्यूम</span>
                      <span className="text-base font-black text-white font-mono">₹{totalGrossVolume}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block">श्रमिक वॉलेट्स में जमा (80%)</span>
                      <span className="text-base font-black text-emerald-400 font-mono">₹{totalWorkerPayouts}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#FFD700] block">जितोमनी प्लेटफ़ॉर्म रिज़र्व (20%)</span>
                      <span className="text-base font-black text-[#FFD700] font-mono">₹{totalPlatformCommission}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Ledger Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    हाल के कार्यों का कमिशन विभाजन लेजर (Recent Settled Task Records)
                  </h4>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#07132B] text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3">कार्य / ग्राहक</th>
                          <th className="p-3">साथी का नाम</th>
                          <th className="p-3">अवधि व दर</th>
                          <th className="p-3">कुल बिल</th>
                          <th className="p-3 text-emerald-400">80% साथी वॉलेट</th>
                          <th className="p-3 text-[#FFD700]">20% प्लेटफ़ॉर्म</th>
                          <th className="p-3">स्थिति</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        {commissionRecords.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{c.taskTitle}</p>
                              <p className="text-[10px] text-slate-400">ग्राहक: {c.customerName}</p>
                            </td>
                            <td className="p-3">
                              <span className="font-medium text-slate-300">{c.workerName}</span>
                              <span className="text-[10px] font-mono text-slate-500 block">{c.workerId}</span>
                            </td>
                            <td className="p-3 font-mono">
                              {c.hours}h × ₹{c.hourlyRate}/h
                            </td>
                            <td className="p-3 font-mono font-bold text-white">
                              ₹{c.grossFee}
                            </td>
                            <td className="p-3 font-mono font-bold text-emerald-400 bg-emerald-500/5">
                              ₹{c.workerShare80}
                            </td>
                            <td className="p-3 font-mono font-bold text-[#FFD700] bg-[#FFD700]/5">
                              ₹{c.platformShare20}
                            </td>
                            <td className="p-3">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 3: RATING SYSTEM & AUTO-FLAGGED ACCOUNTS (< 4.0★)     */}
      {/* ============================================================ */}
      {activeAdminTab === 'rating_audit' && (
        <div className="space-y-6">
          <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span>रेटिंग बैकएंड एवं स्वतः फ्लैगिंग प्रणाली (Rating & Auto-Flagging Engine)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                सख्त गुणवत्ता नियंत्रण: जब भी किसी साथी का औसत 4.0 स्टार से नीचे जाता है, सिस्टम खाते को स्वचालित रूप से फ्लैग कर देता है।
              </p>
            </div>

            {/* Flagged Workers List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span>वर्तमान में फ्लैग्ड खाते (&lt; 4.0★ Accounts Under Quality Audit)</span>
              </h4>

              <div className="space-y-3">
                {workersList.filter((w) => w.isFlagged).map((flagged) => (
                  <div
                    key={flagged.id}
                    className="p-4 rounded-xl bg-red-950/40 border border-red-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={flagged.photoUrl}
                        alt={flagged.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-red-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{flagged.name}</h4>
                          <span className="text-xs font-black text-red-300 font-mono bg-red-500/20 px-2 py-0.5 rounded">
                            {flagged.rating}★ (निम्न रेटिंग)
                          </span>
                        </div>
                        <p className="text-xs text-red-200 mt-1 font-medium">
                          कारण: {flagged.flagReason || 'औसत 4.0 स्टार से नीचे चला गया है।'}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          समीक्षाएं: {flagged.reviewsCount} | पूर्ण कार्य: {flagged.tasksCompleted} | फोन: {flagged.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFlag(flagged.id, true)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                      >
                        फ्लैग हटाएं (Clear Flag)
                      </button>
                    </div>
                  </div>
                ))}

                {workersList.filter((w) => w.isFlagged).length === 0 && (
                  <div className="text-center py-6 bg-[#07132B] rounded-xl border border-slate-800 text-slate-400 text-xs">
                    🎉 बहुत बढ़िया! इस समय कोई भी साथी खाता 4.0 स्टार से नीचे नहीं है।
                  </div>
                )}
              </div>
            </div>

            {/* RATING SIMULATOR & TEST HARNESS */}
            <div className="p-5 rounded-xl bg-[#07132B] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>रेटिंग बैकएंड एवं ऑटो-फ्लैग सिम्युलेटर (Live Rating & Flagging Test)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    किसी भी साथी को टेस्ट समीक्षा व स्टार रेटिंग देकर बैकएंड औसत गणना तथा &lt;4.0★ ऑटो-फ्लैगिंग का लाइव परीक्षण करें।
                  </p>
                </div>
              </div>

              {rateFeedbackMsg && (
                <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500 text-blue-200 text-xs flex items-center gap-2 animate-fadeIn">
                  <Star className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span>{rateFeedbackMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmitRatingSimulation} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">साथी चुनें:</label>
                  <select
                    value={rateWorkerId}
                    onChange={(e) => setRateWorkerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                  >
                    {workersList.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} (वर्तमान: {w.rating}★, {w.reviewsCount} समीक्षाएं)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">स्टार रेटिंग दें (1 से 5):</label>
                  <select
                    value={ratingValue}
                    onChange={(e) => setRatingValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white font-bold focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value={1}>⭐ 1 Star (गंभीर शिकायत - रेटिंग गिराएं)</option>
                    <option value={2}>⭐⭐ 2 Stars (देरी से पहुंचे)</option>
                    <option value={3}>⭐⭐⭐ 3 Stars (औसत सेवा)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (अच्छा काम)</option>
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (उत्कृष्ट सेवा)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">ग्राहक फीडबैक टिप्पणी:</label>
                  <input
                    type="text"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>समीक्षा दर्ज करें (Test Rate)</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
