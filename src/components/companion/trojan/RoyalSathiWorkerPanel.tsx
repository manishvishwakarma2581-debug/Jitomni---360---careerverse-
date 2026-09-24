import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Navigation, 
  Camera, 
  Wallet, 
  ArrowUpRight, 
  Bell, 
  Check, 
  X, 
  Lock, 
  RefreshCw,
  Sparkles,
  Upload,
  Radio
} from 'lucide-react';
import { TrojanOrder, RoyalSathiWorker } from './trojanTypes';
import { TrojanStorage } from './trojanStorage';
import { TrojanRealtime } from './supabaseClient';
import { trojanAudio } from './trojanAudio';

interface RoyalSathiWorkerPanelProps {
  onSwitchToCustomer?: () => void;
  onSwitchToProvider?: () => void;
  onSwitchToAdmin?: () => void;
}

export const RoyalSathiWorkerPanel: React.FC<RoyalSathiWorkerPanelProps> = ({
  onSwitchToCustomer,
  onSwitchToProvider,
  onSwitchToAdmin,
}) => {
  const [sathis, setSathis] = useState<RoyalSathiWorker[]>(() => TrojanStorage.getSathis());
  const [activeRoyalId, setActiveRoyalId] = useState<string>(() => TrojanStorage.getActiveSathiId());
  
  // Current logged in Sathi worker
  const currentSathi = sathis.find((s) => s.royalId === activeRoyalId) || sathis[0];

  // Orders State
  const [orders, setOrders] = useState<TrojanOrder[]>(() => TrojanStorage.getOrders());

  // Incoming Notification (90s window)
  const [incomingOrder, setIncomingOrder] = useState<TrojanOrder | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(90);

  // Active Task In Progress for this Sathi
  const activeTask = orders.find(
    (o) => (o.assignedSathiId === currentSathi.royalId || (o.status === 'in_progress' && o.assignedSathiId === currentSathi.royalId)) &&
    (o.status === 'sathi_accepted' || o.status === 'in_progress')
  );

  // OTP Inputs
  const [inputStartOtp, setInputStartOtp] = useState<string>('');
  const [inputEndOtp, setInputEndOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [otpSuccess, setOtpSuccess] = useState<string>('');

  // Photo Proof Upload state
  const [proofPhoto, setProofPhoto] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);

  // Wallet Payout simulation
  const [withdrawSuccess, setWithdrawSuccess] = useState<string>('');

  // Listen for real-time events
  useEffect(() => {
    // Check if there is any pending order for this city
    const checkIncoming = () => {
      const freshOrders = TrojanStorage.getOrders();
      setOrders(freshOrders);

      // Find an order waiting for Sathi in our city or unassigned
      const pending = freshOrders.find(
        (o) => o.status === 'notified_sathi' && (!o.assignedSathiId || o.assignedSathiId === currentSathi.royalId)
      );

      if (pending) {
        setIncomingOrder(pending);
        // Calculate remaining seconds if expiresAt is set
        if (pending.sathiBroadcastExpiresAt) {
          const diff = Math.max(0, Math.floor((new Date(pending.sathiBroadcastExpiresAt).getTime() - Date.now()) / 1000));
          setCountdownSeconds(diff > 0 ? diff : 90);
        } else {
          setCountdownSeconds(90);
        }
        trojanAudio.playIncomingTaskAlert();
      } else {
        setIncomingOrder(null);
      }
    };

    checkIncoming();

    const unsubscribe = TrojanRealtime.subscribe((msg) => {
      checkIncoming();
      setSathis(TrojanStorage.getSathis());
    });

    return () => unsubscribe();
  }, [currentSathi.royalId]);

  // 90-second countdown timer for incoming task
  useEffect(() => {
    if (!incomingOrder) return;

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-cascade to provider when Sathi 90s times out
          TrojanStorage.cascadeOrderToProvider(incomingOrder.orderId);
          setIncomingOrder(null);
          return 0;
        }
        if (prev <= 15) {
          trojanAudio.playUrgentBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingOrder]);

  // Handle Accept Order
  const handleAcceptOrder = () => {
    if (!incomingOrder) return;
    const success = TrojanStorage.acceptOrderBySathi(incomingOrder.orderId, currentSathi.royalId);
    if (success) {
      trojanAudio.playSuccessAlert();
      setIncomingOrder(null);
      setOrders(TrojanStorage.getOrders());
    }
  };

  // Handle Reject Order (Immediately cascades to Provider Bridge)
  const handleRejectOrder = () => {
    if (!incomingOrder) return;
    TrojanStorage.cascadeOrderToProvider(incomingOrder.orderId);
    setIncomingOrder(null);
  };

  // Handle Verify Start OTP
  const handleVerifyStartOtp = () => {
    if (!activeTask) return;
    setOtpError('');
    setOtpSuccess('');

    const res = TrojanStorage.startTask(activeTask.orderId, inputStartOtp);
    if (res.success) {
      trojanAudio.playSuccessAlert();
      setOtpSuccess(res.message);
      setInputStartOtp('');
      setOrders(TrojanStorage.getOrders());
    } else {
      setOtpError(res.message);
    }
  };

  // Handle Verify End OTP & Complete
  const handleVerifyEndOtp = () => {
    if (!activeTask) return;
    setOtpError('');
    setOtpSuccess('');

    const res = TrojanStorage.completeTask(activeTask.orderId, inputEndOtp, proofPhoto || undefined);
    if (res.success) {
      trojanAudio.playSuccessAlert();
      setOtpSuccess(res.message);
      setInputEndOtp('');
      setProofPhoto(null);
      setOrders(TrojanStorage.getOrders());
      setSathis(TrojanStorage.getSathis());
    } else {
      setOtpError(res.message);
    }
  };

  // Simulate Photo Upload
  const handleSimulatePhotoUpload = () => {
    setIsUploadingPhoto(true);
    setTimeout(() => {
      setProofPhoto('https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80');
      setIsUploadingPhoto(false);
    }, 600);
  };

  // Simulate Instant Bank Withdrawal
  const handleWithdrawWallet = () => {
    setWithdrawSuccess(`₹${currentSathi.walletBalance} आपके बैंक खाते (${currentSathi.bankAccountMasked}) में तुरंत ट्रांसफर कर दिया गया!`);
    setTimeout(() => {
      setWithdrawSuccess('');
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* SATHI HEADER & POLICE VERIFIED PROFILE */}
      <div className="rounded-3xl bg-[#0A1931] border-2 border-[#FFD700]/50 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-[#FFD700] overflow-hidden relative shadow-lg">
              <img src={currentSathi.photoUrl} alt={currentSathi.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">{currentSathi.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFD700] text-slate-950 font-black text-[10px] font-mono">
                  {currentSathi.royalId}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">100% पुलिस व CID वेरिफाइड</span>
                <span className="text-slate-400">· आधार: {currentSathi.aadharMasked}</span>
              </div>

              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                पुलिस संदर्भ: {currentSathi.policeVerificationRef} · रेटिंग: ⭐ {currentSathi.rating} ({currentSathi.totalTasksCompleted} टास्क)
              </div>
            </div>
          </div>

          {/* Sathi ID Switcher for testing multiple workers */}
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">आईडी बदलें (Worker ID)</span>
            <select
              value={activeRoyalId}
              onChange={(e) => {
                setActiveRoyalId(e.target.value);
                TrojanStorage.setActiveSathiId(e.target.value);
              }}
              className="py-1.5 px-3 rounded-xl bg-slate-900 border border-[#FFD700]/40 text-xs font-bold text-white focus:outline-none focus:border-[#FFD700]"
            >
              {sathis.map((s) => (
                <option key={s.royalId} value={s.royalId}>
                  {s.royalId}: {s.name} ({s.cityName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SUBSCRIPTION & STATUS STRIP (₹299/month status) */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>रॉयल साथी सब्सक्रिप्शन:</span>
                <span className="text-emerald-400 font-mono font-black">{currentSathi.subscriptionPlan} (सक्रिय)</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                वैधता: {currentSathi.subscriptionExpiry} तक · केवल 10% प्लेटफ़ॉर्म शुल्क मॉडल
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => TrojanStorage.renewSathiSubscription(currentSathi.royalId)}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#FFD700] border border-[#FFD700]/30 font-bold text-xs transition-all"
            >
              ₹299 नवीनीकरण
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
              ड्यूटी पर ऑनलाइन
            </span>
          </div>
        </div>
      </div>

      {/* 90-SECOND INCOMING TASK NOTIFICATION MODAL / BANNER */}
      {incomingOrder && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-2 border-[#FFD700] shadow-2xl space-y-4 animate-pulse relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FFD700] text-slate-950 font-black animate-bounce">
                <Bell className="w-5 h-5 fill-slate-950" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#FFD700]">
                  नया टास्क अनुरोध (90 Sec Broadcast)
                </span>
                <h3 className="text-base font-black text-white">{incomingOrder.serviceTitle}</h3>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">स्वीकार करने का समय</span>
              <span className="text-2xl font-black text-[#FFD700] font-mono">
                {countdownSeconds}s
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all duration-1000"
              style={{ width: `${(countdownSeconds / 90) * 100}%` }}
            />
          </div>

          {/* Task Info & Payout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">ग्राहक विवरण:</span>
              <span className="font-bold text-white">{incomingOrder.customerName} ({incomingOrder.customerPhone})</span>
              <span className="text-slate-400 block text-[11px] mt-1">स्थान:</span>
              <span className="text-slate-200">{incomingOrder.location.address}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">कुल बिल:</span>
                <span className="font-mono text-slate-300">₹{incomingOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>JITOMNI 10% शुल्क:</span>
                <span className="font-mono">-₹{incomingOrder.commission.platformFeeAmount}</span>
              </div>
              <div className="flex justify-between font-black text-emerald-400 text-sm pt-1 border-t border-slate-800">
                <span>आपकी सीधी कमाई (90%):</span>
                <span className="font-mono">₹{incomingOrder.commission.payoutToWorkerOrProvider}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleRejectOrder}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <X className="w-4 h-4 text-red-400" />
              <span>रिजेक्ट करें (पार्टनर को जाएगा)</span>
            </button>

            <button
              type="button"
              onClick={handleAcceptOrder}
              className="py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>टास्क स्वीकार करें (Accept)</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE TASK EXECUTION SECTION */}
      {activeTask && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border-2 border-emerald-500/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                सक्रिय कार्य (Task in Progress) · #{activeTask.orderId}
              </span>
              <h3 className="text-base font-black text-white">{activeTask.serviceTitle}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
              {activeTask.status.toUpperCase()}
            </span>
          </div>

          {/* Navigation & Address */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">{activeTask.location.address}</span>
                {activeTask.location.landmark && (
                  <span className="text-[11px] text-slate-400 block">लैंडमार्क: {activeTask.location.landmark}</span>
                )}
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  निर्देश: {activeTask.taskDetails}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${activeTask.customerPhone}`}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>कॉल: {activeTask.customerName}</span>
              </a>

              <button
                type="button"
                onClick={() => alert(`Google Maps नेविगेशन शुरू: ${activeTask.location.address}`)}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>मैप नेविगेशन</span>
              </button>
            </div>
          </div>

          {/* STEP A: START TASK OTP */}
          {activeTask.status === 'sathi_accepted' && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>चरण 1: ग्राहक से स्टार्ट OTP पूछें और दर्ज करें</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">डेमो OTP: {activeTask.startOtp}</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={inputStartOtp}
                  onChange={(e) => setInputStartOtp(e.target.value)}
                  placeholder="4-अंकीय स्टार्ट OTP दर्ज करें"
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleVerifyStartOtp}
                  className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow"
                >
                  वेरीफाई व कार्य शुरू करें ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP B: TASK IN PROGRESS, PHOTO PROOF & END OTP */}
          {activeTask.status === 'in_progress' && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>चरण 2: कार्य पूर्णता का फोटो प्रूफ और एंड OTP</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">डेमो एंड OTP: {activeTask.endOtp}</span>
              </div>

              {/* Photo Proof Upload */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSimulatePhotoUpload}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-[#FFD700]" />
                  <span>{isUploadingPhoto ? 'अपलोड हो रहा है...' : 'कार्य रसीद / फोटो अपलोड करें'}</span>
                </button>

                {proofPhoto && (
                  <div className="flex items-center gap-2">
                    <img src={proofPhoto} alt="Proof" className="w-8 h-8 rounded object-cover border border-emerald-400" />
                    <span className="text-xs text-emerald-400 font-mono">✓ फोटो प्रूफ सुरक्षित सेव हुआ</span>
                  </div>
                )}
              </div>

              {/* End OTP input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  maxLength={4}
                  value={inputEndOtp}
                  onChange={(e) => setInputEndOtp(e.target.value)}
                  placeholder="ग्राहक का समाप्ति एंड OTP"
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleVerifyEndOtp}
                  className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow"
                >
                  कार्य पूर्ण व पेमेंट क्रेडिट करें ✓
                </button>
              </div>
            </div>
          )}

          {otpError && (
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{otpError}</span>
            </div>
          )}

          {otpSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{otpSuccess}</span>
            </div>
          )}
        </div>
      )}

      {/* EARNINGS WALLET & LEDGER */}
      <div className="rounded-3xl bg-[#0A1931] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#FFD700]" />
            <span>रॉयल साथी वॉलेट व 10% मॉडल (Earnings Wallet)</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            खाता: {currentSathi.bankAccountMasked}
          </span>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block">उपलब्ध निकासी बैलेंस (Net Wallet)</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              ₹{currentSathi.walletBalance}
            </div>
            <span className="text-[10px] text-emerald-500/80 font-mono">10% कटौती के बाद शुद्ध बैलेंस</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block">कुल सकल कमाई (Gross)</span>
            <div className="text-2xl font-black text-white font-mono">
              ₹{currentSathi.totalEarningsGross}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">सफलतापूर्वक पूर्ण टास्क: {currentSathi.totalTasksCompleted}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block">JITOMNI प्लेटफ़ॉर्म शुल्क (10%)</span>
            <div className="text-2xl font-black text-[#FFD700] font-mono">
              ₹{currentSathi.totalPlatformCut10}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">कोई हिडन चार्ज या दलाली नहीं</span>
          </div>
        </div>

        {withdrawSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{withdrawSuccess}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleWithdrawWallet}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow hover:brightness-110 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>तुरंत बैंक में ट्रांसफर करें (Instant Payout)</span>
          </button>

          {onSwitchToCustomer && (
            <button
              type="button"
              onClick={onSwitchToCustomer}
              className="text-xs text-slate-400 hover:text-white font-mono"
            >
              ← ग्राहक ऐप पर वापस जाएं
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
