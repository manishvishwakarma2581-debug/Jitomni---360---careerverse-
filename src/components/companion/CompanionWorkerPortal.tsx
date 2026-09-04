import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileCheck,
  Wallet,
  PhoneCall,
  Navigation,
  KeyRound,
  PlayCircle,
  Flag,
  ArrowRight,
  RefreshCw,
  UserCheck,
  Building2,
  Lock,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  CompanionWorker, 
  CompanionRadarTask, 
  Language,
  CompanionTaskLifecycleStep
} from '../../types';
import { initialAvailableRadarTasks, initialVerifiedWorkers } from '../../data/companionData';

interface CompanionWorkerPortalProps {
  lang: Language;
  onNavigateToAdmin?: () => void;
}

export const CompanionWorkerPortal: React.FC<CompanionWorkerPortalProps> = ({
  lang,
  onNavigateToAdmin
}) => {
  // Workers list in state (synchronized with backend if available)
  const [workersList, setWorkersList] = useState<CompanionWorker[]>(initialVerifiedWorkers);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('cmp-01'); // Default to Pooja (active) or cmp-09 (pending)

  // Current active worker
  const currentWorker = workersList.find((w) => w.id === selectedWorkerId) || workersList[0];

  // Active sub-tab in worker portal: 'radar' | 'lifecycle' | 'onboarding' | 'wallet'
  const [workerTab, setWorkerTab] = useState<'radar' | 'lifecycle' | 'onboarding' | 'wallet'>('radar');

  // Radar tasks list
  const [radarTasks, setRadarTasks] = useState<CompanionRadarTask[]>(initialAvailableRadarTasks);
  const [activeTask, setActiveTask] = useState<CompanionRadarTask | null>(null);

  // Task Lifecycle Step: 'idle' | 'start_travel' | 'reach_location' | 'start_task' | 'complete_task'
  const [currentStep, setCurrentStep] = useState<CompanionTaskLifecycleStep>('idle');
  const [customerOtpInput, setCustomerOtpInput] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [taskElapsedTime, setTaskElapsedTime] = useState<number>(0);
  const [isTaskTimerRunning, setIsTaskTimerRunning] = useState<boolean>(false);
  const [completedTaskSummary, setCompletedTaskSummary] = useState<any | null>(null);

  // Onboarding Form State
  const [onboardForm, setOnboardForm] = useState({
    name: currentWorker.name,
    phone: currentWorker.phone,
    hourlyRate: currentWorker.hourlyRate,
    city: currentWorker.city,
    specialization: currentWorker.specialization.hi,
    aadhaarNumber: currentWorker.documents?.aadhaar?.number || 'XXXX-XXXX-4819',
    aadhaarDocName: currentWorker.documents?.aadhaar?.docName || 'Aadhaar_Card_Front_Back.pdf',
    policeCertNumber: currentWorker.documents?.policeVerification?.certNumber || 'MP-BPL-CID-2026-9901',
    policeStation: currentWorker.documents?.policeVerification?.policeStation || 'Saket Nagar PS, Bhopal',
    policeDocName: currentWorker.documents?.policeVerification?.docName || 'Police_Clearance_Thana.pdf',
    bgCertId: currentWorker.documents?.backgroundCheck?.certId || 'BG-MP-9941',
    bgAgency: currentWorker.documents?.backgroundCheck?.agency || 'Sovereign Integrity e-Verification Cell',
    bgDocName: currentWorker.documents?.backgroundCheck?.docName || 'Criminal_Record_Clearance.pdf',
    upiId: currentWorker.wallet?.upiId || 'worker@okhdfcbank'
  });

  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('2000');
  const [withdrawMsg, setWithdrawMsg] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Sync with backend API
  const fetchWorkers = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/companion/workers');
      if (res.ok) {
        const data = await res.json();
        if (data.workers && data.workers.length > 0) {
          setWorkersList(data.workers);
        }
      }
    } catch (e) {
      console.warn('Backend workers fetch fallback to initial data', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Update onboard form when worker changes
  useEffect(() => {
    setOnboardForm({
      name: currentWorker.name,
      phone: currentWorker.phone,
      hourlyRate: currentWorker.hourlyRate,
      city: currentWorker.city,
      specialization: currentWorker.specialization.hi,
      aadhaarNumber: currentWorker.documents?.aadhaar?.number || 'XXXX-XXXX-4819',
      aadhaarDocName: currentWorker.documents?.aadhaar?.docName || 'Aadhaar_Card_Front_Back.pdf',
      policeCertNumber: currentWorker.documents?.policeVerification?.certNumber || 'MP-BPL-CID-2026-9901',
      policeStation: currentWorker.documents?.policeVerification?.policeStation || 'Saket Nagar PS, Bhopal',
      policeDocName: currentWorker.documents?.policeVerification?.docName || 'Police_Clearance_Thana.pdf',
      bgCertId: currentWorker.documents?.backgroundCheck?.certId || 'BG-MP-9941',
      bgAgency: currentWorker.documents?.backgroundCheck?.agency || 'Sovereign Integrity e-Verification Cell',
      bgDocName: currentWorker.documents?.backgroundCheck?.docName || 'Criminal_Record_Clearance.pdf',
      upiId: currentWorker.wallet?.upiId || 'worker@okhdfcbank'
    });
  }, [currentWorker]);

  // Timer effect for active task
  useEffect(() => {
    let interval: any = null;
    if (isTaskTimerRunning) {
      interval = setInterval(() => {
        setTaskElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTaskTimerRunning]);

  // Handle Accept Radar Task
  const handleAcceptTask = async (task: CompanionRadarTask) => {
    // If worker is pending approval, forbid accepting tasks
    if (currentWorker.verificationStatus === 'pending_approval') {
      setWorkerTab('onboarding');
      return;
    }

    try {
      await fetch('/api/companion/radar/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, workerId: currentWorker.id })
      });
    } catch (e) {
      console.warn('Accept task local fallback', e);
    }

    setActiveTask(task);
    setCurrentStep('start_travel');
    setWorkerTab('lifecycle');
    setCompletedTaskSummary(null);
    setTaskElapsedTime(0);
    setIsTaskTimerRunning(false);
  };

  // Handle Decline Radar Task
  const handleDeclineTask = async (taskId: string) => {
    try {
      await fetch('/api/companion/radar/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      });
    } catch (e) {
      console.warn('Decline task local fallback', e);
    }
    setRadarTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Step 1: Start Travel
  const handleStartTravel = async () => {
    try {
      await fetch('/api/companion/task/lifecycle-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: activeTask?.id,
          workerId: currentWorker.id,
          step: 'start_travel'
        })
      });
    } catch (e) {
      console.warn('Local lifecycle step fallback', e);
    }
    setCurrentStep('reach_location');
  };

  // Step 2: Reach Location & Verify Customer OTP
  const handleVerifyOtpAndArrive = async () => {
    setOtpError(null);
    const expectedOtp = activeTask?.startOtp || '4829';

    if (!customerOtpInput || customerOtpInput.trim() !== expectedOtp.trim()) {
      setOtpError(`अमान्य OTP! ग्राहक से 4-अंकों का स्टार्ट कोड प्राप्त करें (डेमो कोड: ${expectedOtp})`);
      return;
    }

    try {
      const res = await fetch('/api/companion/task/lifecycle-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: activeTask?.id,
          workerId: currentWorker.id,
          step: 'reach_location',
          customerOtp: customerOtpInput.trim()
        })
      });
      if (!res.ok) {
        const d = await res.json();
        setOtpError(d.message || 'OTP सत्यापन विफल');
        return;
      }
    } catch (e) {
      console.warn('Local OTP verify fallback', e);
    }

    setCurrentStep('start_task');
  };

  // Step 3: Start Task
  const handleStartTask = async () => {
    try {
      await fetch('/api/companion/task/lifecycle-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: activeTask?.id,
          workerId: currentWorker.id,
          step: 'start_task'
        })
      });
    } catch (e) {
      console.warn('Local start task fallback', e);
    }

    setCurrentStep('complete_task');
    setIsTaskTimerRunning(true);
  };

  // Step 4: Complete Task (Calculates 80/20 Commission Split)
  const handleCompleteTask = async () => {
    setIsTaskTimerRunning(false);
    const durationHours = activeTask ? activeTask.durationHours : 4;
    const hourlyRate = activeTask ? activeTask.hourlyRate : currentWorker.hourlyRate;
    const grossFee = durationHours * hourlyRate;
    const workerShare80 = Math.round(grossFee * 0.8);
    const platformShare20 = Math.round(grossFee * 0.2);

    let summary = {
      taskId: activeTask?.id || 'TASK-DONE',
      taskTitle: activeTask?.taskTitle || 'Companion Service',
      customerName: activeTask?.customerName || 'Citizen Customer',
      durationHours,
      hourlyRate,
      grossFee,
      workerShare80,
      platformShare20,
      creditedToWallet: workerShare80,
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      const res = await fetch('/api/companion/task/lifecycle-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: activeTask?.id,
          workerId: currentWorker.id,
          step: 'complete_task'
        })
      });
      if (res.ok) {
        const d = await res.json();
        if (d.commissionRecord) {
          summary = d.commissionRecord;
        }
      }
    } catch (e) {
      console.warn('Local commission split fallback', e);
    }

    // Update local worker wallet balance
    setWorkersList((prev) =>
      prev.map((w) => {
        if (w.id === currentWorker.id) {
          const prevBal = w.wallet?.availableBalance || 0;
          return {
            ...w,
            tasksCompleted: (w.tasksCompleted || 0) + 1,
            wallet: {
              ...(w.wallet || {
                pendingWeeklyPayout: 0,
                totalEarnings: 0,
                upiId: 'worker@upi',
                bankAccountNumber: '000000000',
                bankIfsc: 'SBIN0001000',
                bankName: 'State Bank of India'
              }),
              availableBalance: prevBal + workerShare80,
              pendingWeeklyPayout: (w.wallet?.pendingWeeklyPayout || 0) + workerShare80,
              totalEarnings: (w.wallet?.totalEarnings || 0) + workerShare80
            }
          };
        }
        return w;
      })
    );

    setCompletedTaskSummary(summary);
    setCurrentStep('idle');
  };

  // Handle Onboarding / Document Upload Submission
  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccessMsg(null);

    const payload = {
      id: currentWorker.id,
      name: onboardForm.name,
      phone: onboardForm.phone,
      hourlyRate: onboardForm.hourlyRate,
      city: onboardForm.city,
      specialization: {
        hi: onboardForm.specialization,
        en: onboardForm.specialization,
        hinglish: onboardForm.specialization
      },
      aadhaarNumber: onboardForm.aadhaarNumber,
      aadhaarDocName: onboardForm.aadhaarDocName,
      policeCertNumber: onboardForm.policeCertNumber,
      policeStation: onboardForm.policeStation,
      policeDocName: onboardForm.policeDocName,
      bgCertId: onboardForm.bgCertId,
      bgAgency: onboardForm.bgAgency,
      bgDocName: onboardForm.bgDocName,
      upiId: onboardForm.upiId
    };

    try {
      const res = await fetch('/api/companion/worker/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const d = await res.json();
        setUploadSuccessMsg('दस्तावेज सफलतापूर्वक अपलोड किए गए! नीति के अनुसार खाता "Pending Approval" स्थिति में रहेगा जब तक एडमिन द्वारा जांच नहीं की जाती।');
        // Update local state to pending_approval
        setWorkersList((prev) =>
          prev.map((w) =>
            w.id === currentWorker.id
              ? {
                  ...w,
                  verificationStatus: 'pending_approval',
                  policeVerified: false,
                  badgeTitle: '⏳ Verification Pending (In Review)'
                }
              : w
          )
        );
      }
    } catch (e) {
      console.warn('Local onboard fallback', e);
      setUploadSuccessMsg('दस्तावेज सबमिट हो गए हैं। खाता एडमिन अनुमोदन की प्रतीक्षा कर रहा है।');
      setWorkersList((prev) =>
        prev.map((w) =>
          w.id === currentWorker.id
            ? {
                ...w,
                verificationStatus: 'pending_approval',
                policeVerified: false,
                badgeTitle: '⏳ Verification Pending (In Review)'
              }
            : w
        )
      );
    }
  };

  // Handle Wallet Withdrawal Request
  const handleWithdraw = async () => {
    setWithdrawMsg(null);
    const amountNum = Number(withdrawAmount);
    if (!amountNum || amountNum <= 0) return;

    try {
      const res = await fetch('/api/companion/worker/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId: currentWorker.id, amount: amountNum })
      });
      const d = await res.json();
      if (res.ok) {
        setWithdrawMsg(d.message || `₹${amountNum} का साप्ताहिक भुगतान आपके UPI ID पर ट्रांसफर कर दिया गया है।`);
        setWorkersList((prev) =>
          prev.map((w) => {
            if (w.id === currentWorker.id && w.wallet) {
              return {
                ...w,
                wallet: {
                  ...w.wallet,
                  availableBalance: Math.max(0, w.wallet.availableBalance - amountNum)
                }
              };
            }
            return w;
          })
        );
      } else {
        setWithdrawMsg(d.message || 'निकासी विफल हुई।');
      }
    } catch (e) {
      setWithdrawMsg(`₹${amountNum} का निकासी अनुरोध प्रोसेस किया गया।`);
    }
  };

  const isPendingApproval = currentWorker.verificationStatus === 'pending_approval';
  const isFlagged = currentWorker.isFlagged;

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner: Worker Switcher & Status Header */}
      <div className="bg-[#0B1E3B] border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentWorker.photoUrl}
                alt={currentWorker.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FFD700] shadow-md"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0B1E3B] ${
                  currentWorker.verificationStatus === 'verified_active'
                    ? 'bg-emerald-500'
                    : isPendingApproval
                    ? 'bg-amber-400'
                    : 'bg-red-500'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-black text-white">{currentWorker.name}</h2>
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                    currentWorker.verificationStatus === 'verified_active'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isPendingApproval
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}
                >
                  {currentWorker.verificationStatus === 'verified_active' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>वेरिफाइड पार्टनर (Active)</span>
                    </>
                  ) : isPendingApproval ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>सत्यापन प्रक्रियाधीन (Pending Approval)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
                      <span>अस्वीकृत / समीक्षाधीन (Rejected)</span>
                    </>
                  )}
                </span>
                {isFlagged && (
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500 flex items-center gap-1 animate-pulse">
                    <Flag className="w-3 h-3 text-red-400" />
                    <span>रेटिंग अलर्ट (&lt; 4.0★)</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                <span>⭐ {currentWorker.rating} ({currentWorker.reviewsCount} समीक्षाएं)</span>
                <span>•</span>
                <span>कार्य पूर्ण: {currentWorker.tasksCompleted}</span>
                <span>•</span>
                <span className="text-[#FFD700] font-bold">दर: ₹{currentWorker.hourlyRate}/घंटा</span>
              </p>
            </div>
          </div>

          {/* Persona Switcher for Instant Testing */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">टेस्टिंग प्रोफाइल चुनें:</span>
            <select
              aria-label="टेस्टिंग पार्टनर प्रोफाइल चुनें"
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(e.target.value)}
              className="bg-[#07132B] border border-slate-600 text-xs text-white rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#FFD700]"
            >
              {workersList.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.verificationStatus === 'verified_active' ? 'Active' : w.verificationStatus === 'pending_approval' ? 'Pending Approval' : 'Rejected'}{w.isFlagged ? ' - Flagged <4★' : ''})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={fetchWorkers}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="सिंक रिफ्रेश करें"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#FFD700]' : ''}`} />
            </button>
            {onNavigateToAdmin && (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-purple-300" />
                <span>एडमिन पैनल (Approval / 20% Split)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quality Alert Banner if Flagged */}
        {isFlagged && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/70 border border-red-500/80 text-red-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-300">
                ⚠️ गुणवत्ता चेतावनी: {currentWorker.flagReason || 'रेटिंग 4.0 स्टार से नीचे दर्ज की गई है।'}
              </p>
              <p className="text-[11px] text-red-200/90 mt-0.5">
                नियम: किसी भी साथी का औसत 4.0★ से नीचे जाने पर सिस्टम स्वचालित रूप से खाता ऑडिट फ्लैग कर देता है। कृपया ग्राहक संतुष्टि और समयबद्धता का विशेष ध्यान रखें।
              </p>
            </div>
          </div>
        )}

        {/* Pending Approval Strict Warning Banner */}
        {isPendingApproval && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/70 border border-amber-500/80 text-amber-200 text-xs flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-spin" />
            <div className="space-y-1">
              <p className="font-black text-amber-300">
                ⏳ खाता सत्यापन प्रक्रियाधीन है (Account Status: Pending Approval)
              </p>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                सुरक्षा नियम: आपके आधार कार्ड, पुलिस वेरिफिकेशन प्रमाण पत्र और बैकग्राउंड चेक की समीक्षा सोवरेन एडमिन द्वारा की जा रही है। सत्यापन पूर्ण होने तक आप जॉब रडार के कार्यों को स्वीकार नहीं कर सकते।
              </p>
              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD700] hover:underline pt-1"
                >
                  <span>एडमिन पैनल पर जाकर इसे तुरंत एक्टिव (Verify) करें</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Worker Portal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        <button
          type="button"
          onClick={() => setWorkerTab('radar')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            workerTab === 'radar'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>📡 जॉब रडार / लाइव रिक्वेस्ट (Job Radar)</span>
          <span className="w-5 h-5 rounded-full bg-slate-900 text-[#FFD700] text-[10px] flex items-center justify-center font-mono">
            {radarTasks.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setWorkerTab('lifecycle')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            workerTab === 'lifecycle'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>🔄 कार्य जीवन चक्र प्रबंधन (Task Lifecycle)</span>
          {activeTask && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setWorkerTab('onboarding')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            workerTab === 'onboarding'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>📑 ऑनबोर्डिंग एवं दस्तावेज पाइपलाइन (KYC & Documents)</span>
          {isPendingApproval && (
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500 text-slate-950 font-bold">
              Pending
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setWorkerTab('wallet')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
            workerTab === 'wallet'
              ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
              : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>💰 साथी वॉलेट एवं 80% भुगतान (Earnings)</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: JOB RADAR / REQUEST SCREEN (Real-time task popup)       */}
      {/* ============================================================ */}
      {workerTab === 'radar' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#FFD700] animate-pulse" />
                <span>नजदीकी उपलब्ध कार्य रडार (Nearby Job Requests)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                आस-पास के नागरिकों से प्राप्त सत्यापित अनुरोध। कार्य स्वीकार करें और सेवा शुरू करें।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>लाइव GPS रडार एक्टिव</span>
              </span>
            </div>
          </div>

          {/* When pending approval notice */}
          {isPendingApproval && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">कार्य स्वीकार करने की अनुमति लॉक है</p>
                  <p className="text-amber-200/80 mt-0.5">
                    आपका खाता 'Pending Approval' है। एडमिन द्वारा पुलिस एवं आधार प्रमाणन स्वीकृत होने के बाद आप जॉब स्वीकार कर सकेंगे।
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWorkerTab('onboarding')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shrink-0 hover:bg-amber-400 transition-colors"
              >
                दस्तावेज देखें
              </button>
            </div>
          )}

          {/* Available Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {radarTasks.map((task) => {
              // 80/20 split calculations
              const workerShare80 = Math.round(task.totalCustomerFee * 0.8);
              const platformShare20 = Math.round(task.totalCustomerFee * 0.2);

              return (
                <div
                  key={task.id}
                  className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-5 hover:border-[#FFD700]/50 transition-all shadow-lg flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Tag & Distance */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {task.category === 'hospital_care' && '🏥 अस्पताल अटेंडेंट'}
                        {task.category === 'event_wedding' && '🪔 विवाह / इवेंट समन्वय'}
                        {task.category === 'senior_citizen' && '🧓 बुजुर्ग साथी'}
                        {task.category === 'daily_errands' && '🛒 घरेलू कार्य / मंडी'}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-amber-400" />
                        <span>{task.distanceKm} किमी दूर</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#FFD700] transition-colors">
                        {task.taskTitle}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {task.requirements}
                      </p>
                    </div>

                    {/* Location & Customer */}
                    <div className="bg-[#07132B] p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-white font-medium">{task.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        <span>ग्राहक: {task.customerName}</span>
                        <span>अवधि: {task.durationHours} घंटे</span>
                      </div>
                    </div>

                    {/* 80% Earnings Box */}
                    <div className="bg-gradient-to-r from-emerald-950/60 to-emerald-900/40 p-3 rounded-xl border border-emerald-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                          साथी की अनुमानित कमाई (80% शेयर)
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-white">₹{workerShare80}</span>
                          <span className="text-[11px] text-emerald-300/80">
                            (₹{task.hourlyRate}/घंटा × {task.durationHours}h)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">कुल ग्राहक शुल्क</span>
                        <span className="text-xs font-mono font-bold text-slate-300">₹{task.totalCustomerFee}</span>
                        <span className="text-[9px] text-slate-400 block">प्लेटफ़ॉर्म 20%: ₹{platformShare20}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Accept or Decline */}
                  <div className="flex items-center gap-2 pt-4 mt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleDeclineTask(task.id)}
                      className="w-1/3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                    >
                      अस्वीकार (Decline)
                    </button>
                    <button
                      type="button"
                      disabled={isPendingApproval}
                      onClick={() => handleAcceptTask(task)}
                      className={`w-2/3 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md ${
                        isPendingApproval
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-[#FFD700] hover:bg-[#ffe033] text-slate-950 border border-[#FFD700] shadow-[#FFD700]/20 hover:scale-[1.02]'
                      }`}
                    >
                      {isPendingApproval ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>सत्यापन आवश्यक (Locked)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>स्वीकारें एवं यात्रा शुरू करें (Accept)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {radarTasks.length === 0 && (
            <div className="text-center py-12 bg-[#0B1E3B] border border-slate-800 rounded-2xl p-6">
              <Radio className="w-10 h-10 text-slate-500 mx-auto animate-pulse" />
              <h4 className="text-base font-bold text-white mt-3">इस समय रडार पर कोई नया कार्य नहीं है</h4>
              <p className="text-xs text-slate-400 mt-1">
                जैसे ही आपके आसपास कोई नागरिक अनुरोध भेजेगा, रडार स्वतः अपडेट होगा।
              </p>
              <button
                type="button"
                onClick={() => setRadarTasks(initialAvailableRadarTasks)}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 hover:bg-slate-700"
              >
                डेमो टास्क रीलोड करें
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: STEP-BY-STEP TASK LIFECYCLE MANAGEMENT                 */}
      {/* Flow: Start Travel ➡️ Reach Location OTP ➡️ Start ➡️ Complete */}
      {/* ============================================================ */}
      {workerTab === 'lifecycle' && (
        <div className="space-y-6">
          <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-[#FFD700]" />
                  <span>साथी कार्य जीवन चक्र प्रबंधन (Task Lifecycle Tracker)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  सख्त सोवरेन सुरक्षा प्रोटोकॉल: हर चरण पारदर्शी एवं OTP सत्यापित है।
                </p>
              </div>

              {activeTask && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
                    कार्य ID: {activeTask.id}
                  </span>
                </div>
              )}
            </div>

            {/* Stepper Indicator Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  currentStep === 'start_travel'
                    ? 'bg-[#FFD700]/20 border-[#FFD700] text-white shadow-md'
                    : currentStep === 'reach_location' || currentStep === 'start_task' || currentStep === 'complete_task'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#07132B] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">चरण 1</div>
                <div className="text-xs font-black mt-0.5 flex items-center justify-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>यात्रा शुरू (Travel)</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  currentStep === 'reach_location'
                    ? 'bg-[#FFD700]/20 border-[#FFD700] text-white shadow-md'
                    : currentStep === 'start_task' || currentStep === 'complete_task'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#07132B] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">चरण 2</div>
                <div className="text-xs font-black mt-0.5 flex items-center justify-center gap-1">
                  <KeyRound className="w-3 h-3" />
                  <span>OTP सत्यापन (Reach)</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  currentStep === 'start_task'
                    ? 'bg-[#FFD700]/20 border-[#FFD700] text-white shadow-md'
                    : currentStep === 'complete_task'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#07132B] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">चरण 3</div>
                <div className="text-xs font-black mt-0.5 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>कार्य प्रगति (In Task)</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-center transition-all ${
                  currentStep === 'complete_task'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                    : 'bg-[#07132B] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">चरण 4</div>
                <div className="text-xs font-black mt-0.5 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>कार्य पूर्ण (80% Payout)</span>
                </div>
              </div>
            </div>

            {/* Active Task Details & Controls */}
            {activeTask ? (
              <div className="space-y-6">
                <div className="bg-[#07132B] border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-white">{activeTask.taskTitle}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{activeTask.requirements}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400">आपकी 80% कमाई:</span>
                      <p className="text-lg font-black text-emerald-400">₹{activeTask.workerEarnings80}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{activeTask.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                      <span>ग्राहक: {activeTask.customerName} ({activeTask.customerPhone})</span>
                    </div>
                  </div>
                </div>

                {/* STEP-BY-STEP ACTION CARDS */}

                {/* STEP 1: START TRAVEL */}
                {currentStep === 'start_travel' && (
                  <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/50 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
                        <Navigation className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">चरण 1: ग्राहक के स्थान की ओर प्रस्थान करें</h4>
                        <p className="text-xs text-slate-300 mt-1">
                          बटन दबाते ही आपकी लाइव GPS लोकेशन ग्राहक के साथ साझा की जाएगी और उन्हें सूचना मिलेगी कि आप निकल चुके हैं।
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartTravel}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Start Travel (प्रस्थान शुरू करें) ➡️</span>
                    </button>
                  </div>
                )}

                {/* STEP 2: REACH LOCATION & OTP VERIFICATION */}
                {currentStep === 'reach_location' && (
                  <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                        <KeyRound className="w-6 h-6 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">
                          चरण 2: स्थान पर पहुंचें एवं ग्राहक से OTP सत्यापित करें
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          सुरक्षा सुनिश्चित करने के लिए ग्राहक के फोन पर भेजा गया 4-अंकों का Start OTP दर्ज करें।
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#0B1E3B] p-4 rounded-xl border border-slate-700 space-y-3">
                      <label className="text-xs font-bold text-slate-300 block">
                        ग्राहक का 4-अंकों का स्टार्ट OTP दर्ज करें:
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          maxLength={4}
                          value={customerOtpInput}
                          onChange={(e) => setCustomerOtpInput(e.target.value)}
                          placeholder="उदा. 4829"
                          className="w-40 px-4 py-2.5 rounded-xl bg-[#07132B] border border-amber-500/80 text-white text-center text-lg font-mono tracking-widest font-bold focus:outline-none focus:border-[#FFD700]"
                        />
                        <span className="text-[11px] text-amber-300/80">
                          (डेमो टेस्ट कोड: <strong className="font-mono text-white">{activeTask.startOtp}</strong>)
                        </span>
                      </div>

                      {otpError && (
                        <p className="text-xs text-red-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{otpError}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyOtpAndArrive}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Reach Location (OTP सत्यापित करें एवं पहुंच दर्ज करें) ➡️</span>
                    </button>
                  </div>
                )}

                {/* STEP 3: START TASK */}
                {currentStep === 'start_task' && (
                  <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/50 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">चरण 3: सेवा कार्य प्रारंभ करें</h4>
                        <p className="text-xs text-slate-300 mt-1">
                          OTP सफलतापूर्वक सत्यापित हो चुका है! कार्य शुरू करने के लिए नीचे दिए बटन पर क्लिक करें।
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartTask}
                      className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Task (कार्य आरंभ करें) ➡️</span>
                    </button>
                  </div>
                )}

                {/* STEP 4: COMPLETE TASK */}
                {currentStep === 'complete_task' && (
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                          <CheckCircle2 className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">चरण 4: कार्य प्रगति पर है</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            सेवा पूर्ण होने पर नीचे दिए बटन पर क्लिक करें। कुल फीस का 80% स्वतः आपके साथी वॉलेट में जमा हो जाएगा।
                          </p>
                        </div>
                      </div>

                      {/* Live Stopwatch Counter */}
                      <div className="bg-[#07132B] px-3 py-1.5 rounded-xl border border-emerald-500/40 text-right">
                        <span className="text-[10px] text-emerald-300 block">सक्रिय कार्य समय</span>
                        <span className="text-sm font-mono font-black text-white">
                          {Math.floor(taskElapsedTime / 60)}m {taskElapsedTime % 60}s
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#0B1E3B] rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                      <span>अवधि: {activeTask.durationHours} घंटे (दर: ₹{activeTask.hourlyRate}/h)</span>
                      <span className="font-bold text-emerald-400">
                        आपकी कमाई (80%): ₹{activeTask.workerEarnings80}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompleteTask}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Task (कार्य पूर्ण करें एवं 80% भुगतान पाएं) 💰</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 bg-[#07132B] rounded-xl border border-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  वर्तमान में कोई सक्रिय कार्य नहीं चुना गया है। कृपया 'जॉब रडार' से कोई कार्य स्वीकार करें।
                </p>
                <button
                  type="button"
                  onClick={() => setWorkerTab('radar')}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#FFD700] text-slate-950 font-black text-xs"
                >
                  जॉब रडार पर जाएं
                </button>
              </div>
            )}

            {/* Completed Task Summary Receipt */}
            {completedTaskSummary && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border-2 border-emerald-500 shadow-xl space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">🎉 बधाई! कार्य सफलतापूर्वक पूर्ण हुआ</h4>
                    <p className="text-xs text-emerald-300">
                      80/20 विभाजन के अनुसार ₹{completedTaskSummary.workerShare80} आपके वॉलेट में क्रेडिट हो गए हैं।
                    </p>
                  </div>
                </div>

                <div className="bg-[#07132B] p-4 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">कुल ग्राहक बिल</span>
                    <span className="text-sm font-black text-white font-mono">₹{completedTaskSummary.grossFee}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block">साथी शेयर (80%)</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">₹{completedTaskSummary.workerShare80}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">जितोमनी 20% शुल्क</span>
                    <span className="text-sm font-black text-slate-300 font-mono">₹{completedTaskSummary.platformShare20}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">भुगतान स्थिति</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">क्रेडिटेड</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setWorkerTab('wallet')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>वॉलेट बैलेंस एवं साप्ताहिक निकासी देखें →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: ONBOARDING & SECURE DOCUMENT UPLOAD PIPELINE           */}
      {/* Aadhaar, Background Check, Police Verification                */}
      {/* Mandate: Account MUST remain 'Pending Approval' until admin   */}
      {/* ============================================================ */}
      {workerTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#FFD700]" />
                  <span>साथी ऑनबोर्डिंग एवं त्रिस्तरीय सुरक्षा प्रमाणन पाइपलाइन</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  UIDAI आधार, राज्य पुलिस CID चरित्र सत्यापन एवं पृष्ठभूमि सुरक्षा जांच।
                </p>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                    currentWorker.verificationStatus === 'verified_active'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isPendingApproval
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}
                >
                  {currentWorker.verificationStatus === 'verified_active'
                    ? '🛡️ Verified Active'
                    : isPendingApproval
                    ? '⏳ Pending Admin Approval'
                    : '❌ Verification Rejected'}
                </span>
              </div>
            </div>

            {/* Notification alert */}
            {uploadSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* Mandatory Platform Rule Notice */}
            <div className="p-4 rounded-xl bg-[#07132B] border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Info className="w-4 h-4 text-[#FFD700]" />
                <span>सोवरेन सुरक्षा नियम (Zero Fake Profile Policy)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                अस्पताल में भर्ती मरीजों और वरिष्ठ नागरिकों की सुरक्षा सर्वोपरि है। सभी दस्तावेज अपलोड होने के बाद खाता <strong>'Pending Approval'</strong> रहेगा जब तक सोवरेन एडमिन द्वारा प्रत्येक दस्तावेज के सीरियल नंबर और पुलिस स्टेशन रिकॉर्ड की जांच नहीं की जाती।
              </p>
            </div>

            {/* Document Upload Form */}
            <form onSubmit={handleOnboardSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">पूरा नाम (आधार कार्ड के अनुसार):</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.name}
                    onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132B] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">मोबाइल नंबर (OTP लिंक्ड):</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.phone}
                    onChange={(e) => setOnboardForm({ ...onboardForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132B] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">शहर / इलाका:</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.city}
                    onChange={(e) => setOnboardForm({ ...onboardForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132B] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">अपेक्षित प्रति घंटा दर (₹/Hour):</label>
                  <input
                    type="number"
                    min={100}
                    max={500}
                    required
                    value={onboardForm.hourlyRate}
                    onChange={(e) => setOnboardForm({ ...onboardForm, hourlyRate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132B] border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* 3 MANDATORY DOCUMENT UPLOADS */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  सत्यापन हेतु 3 अनिवार्य दस्तावेज (3 Mandatory Verification Documents)
                </h4>

                {/* 1. Aadhaar Card Upload */}
                <div className="p-4 rounded-xl bg-[#07132B] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-black text-white">1. UIDAI आधार कार्ड (Aadhaar Card)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      e-KYC Mandatory
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">आधार नंबर (मास्क्ड):</label>
                      <input
                        type="text"
                        value={onboardForm.aadhaarNumber}
                        onChange={(e) => setOnboardForm({ ...onboardForm, aadhaarNumber: e.target.value })}
                        placeholder="XXXX-XXXX-4819"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">दस्तावेज फाइल (PDF / JPG):</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={onboardForm.aadhaarDocName}
                          onChange={(e) => setOnboardForm({ ...onboardForm, aadhaarDocName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold shrink-0 flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>ब्राउज</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Police Verification Certificate */}
                <div className="p-4 rounded-xl bg-[#07132B] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-white">2. पुलिस वेरिफिकेशन प्रमाण पत्र (Police Verification Certificate)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      CID Clearance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">सर्टिफिकेट नंबर:</label>
                      <input
                        type="text"
                        value={onboardForm.policeCertNumber}
                        onChange={(e) => setOnboardForm({ ...onboardForm, policeCertNumber: e.target.value })}
                        placeholder="MP-BPL-CID-2026-9901"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">जारीकर्ता पुलिस थाना:</label>
                      <input
                        type="text"
                        value={onboardForm.policeStation}
                        onChange={(e) => setOnboardForm({ ...onboardForm, policeStation: e.target.value })}
                        placeholder="Saket Nagar PS, Bhopal"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">दस्तावेज फाइल:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={onboardForm.policeDocName}
                          onChange={(e) => setOnboardForm({ ...onboardForm, policeDocName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold shrink-0 flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>ब्राउज</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Background Check Report */}
                <div className="p-4 rounded-xl bg-[#07132B] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-black text-white">3. बैकग्राउंड चेक रिपोर्ट (Background Check Verification)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      Character Check
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">बैकग्राउंड रेफरेंस ID:</label>
                      <input
                        type="text"
                        value={onboardForm.bgCertId}
                        onChange={(e) => setOnboardForm({ ...onboardForm, bgCertId: e.target.value })}
                        placeholder="BG-MP-9941"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">सत्यापन एजेंसी / लैब:</label>
                      <input
                        type="text"
                        value={onboardForm.bgAgency}
                        onChange={(e) => setOnboardForm({ ...onboardForm, bgAgency: e.target.value })}
                        placeholder="Sovereign Integrity e-Verification Cell"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">दस्तावेज फाइल:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={onboardForm.bgDocName}
                          onChange={(e) => setOnboardForm({ ...onboardForm, bgDocName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold shrink-0 flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>ब्राउज</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI and Bank Details for Weekly 80% Payout */}
              <div className="p-4 rounded-xl bg-[#07132B] border border-slate-800 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>साप्ताहिक 80% भुगतान हेतु बैंक / UPI विवरण (Payout Account)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">UPI ID (त्वरित निकासी):</label>
                    <input
                      type="text"
                      value={onboardForm.upiId}
                      onChange={(e) => setOnboardForm({ ...onboardForm, upiId: e.target.value })}
                      placeholder="name@okhdfcbank"
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">बैंक खाता संख्या:</label>
                    <input
                      type="text"
                      value={currentWorker.wallet?.bankAccountNumber || '5010049281920'}
                      disabled
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-800 text-slate-400 text-xs font-mono cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-amber-300 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>सबमिट करने पर स्टेटस 'Pending Approval' सेट होगा</span>
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FFD700] hover:bg-[#ffe033] text-slate-950 font-black text-xs transition-all shadow-md shadow-[#FFD700]/20 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Upload className="w-4 h-4" />
                  <span>दस्तावेज सबमिट करें (Submit for Admin Verification)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: WORKER WALLET & 80% WEEKLY PAYOUT SYSTEM              */}
      {/* ============================================================ */}
      {workerTab === 'wallet' && (
        <div className="space-y-6">
          <div className="bg-[#0B1E3B] border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#FFD700]" />
                  <span>साथी वॉलेट एवं साप्ताहिक 80% भुगतान केंद्र</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  स्वचालित 80/20 विभाजन: प्रत्येक पूर्ण कार्य की 80% राशि सीधे आपके वॉलेट में क्रेडिट होती है।
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>80% साथी शेयर (Weekly Payout)</span>
              </div>
            </div>

            {withdrawMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{withdrawMsg}</span>
              </div>
            )}

            {/* Wallet Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#07132B] to-[#0B1E3B] border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  उपलब्ध निकासी बैलेंस
                </span>
                <p className="text-2xl font-black text-white font-mono">
                  ₹{currentWorker.wallet?.availableBalance || 0}
                </p>
                <span className="text-[10px] text-emerald-400 font-medium">UPI / IMPS तुरंत उपलब्ध</span>
              </div>

              <div className="bg-gradient-to-br from-[#07132B] to-[#0B1E3B] border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  साप्ताहिक देय राशि (Weekly Pool)
                </span>
                <p className="text-2xl font-black text-amber-400 font-mono">
                  ₹{currentWorker.wallet?.pendingWeeklyPayout || 0}
                </p>
                <span className="text-[10px] text-slate-400">प्रत्येक सोमवार स्वतः भुगतान</span>
              </div>

              <div className="bg-gradient-to-br from-[#07132B] to-[#0B1E3B] border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  कुल संचयी कमाई (Total Earned)
                </span>
                <p className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{currentWorker.wallet?.totalEarnings || 0}
                </p>
                <span className="text-[10px] text-slate-400">{currentWorker.tasksCompleted} कार्य पूर्ण</span>
              </div>
            </div>

            {/* Instant Withdrawal Box */}
            <div className="bg-[#07132B] p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>त्वरित UPI निकासी अनुरोध (Instant Withdrawal)</span>
              </h4>
              <p className="text-xs text-slate-300">
                अपने पंजीकृत UPI खाते <strong className="text-white font-mono">{currentWorker.wallet?.upiId || 'worker@upi'}</strong> में सीधे राशि प्राप्त करें।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    min={100}
                    max={currentWorker.wallet?.availableBalance || 10000}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-40 pl-7 pr-3 py-2 rounded-xl bg-[#0B1E3B] border border-slate-700 text-white text-xs font-mono font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={!currentWorker.wallet?.availableBalance || currentWorker.wallet?.availableBalance <= 0}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md ${
                    !currentWorker.wallet?.availableBalance || currentWorker.wallet?.availableBalance <= 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-emerald-500/20 hover:scale-[1.02]'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>UPI खाते में ट्रांसफर करें</span>
                </button>
              </div>
            </div>

            {/* Commission Policy Clarification */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">जितोमनी 80/20 स्वचालित विभाजन नियम</p>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  प्रत्येक पूर्ण घंटे की कुल फीस में से <strong>80% राशि सीधे साथी को</strong> दी जाती है और <strong>20% जितोमनी सोवरेन प्लेटफ़ॉर्म वॉलेट</strong> में पुलिस बैकग्राउंड वेरिफिकेशन, 24/7 आपातकालीन SOS रिस्पॉन्स नेटवर्क और तकनीकी रखरखाव के लिए रखी जाती है।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
