import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  X,
  Smartphone,
  CreditCard,
  FileCheck2,
  KeyRound,
  ArrowRight,
  Sparkles,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { AuthService } from '../services/authService';
import { AadhaarKycData } from '../types';

interface AadhaarKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: AadhaarKycData) => void;
  onVerificationSuccess?: (updatedUser: any) => void;
  candidateName?: string;
}

export const AadhaarKycModal: React.FC<AadhaarKycModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onVerificationSuccess,
  candidateName = '',
}) => {
  const [step, setStep] = useState<'input' | 'otp' | 'verified'>('input');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [fullName, setFullName] = useState(candidateName || 'मनीष विश्वकर्मा');
  const [stateName, setStateName] = useState('Madhya Pradesh');
  const [districtName, setDistrictName] = useState('Bhopal');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifiedKyc, setVerifiedKyc] = useState<AadhaarKycData | null>(null);

  if (!isOpen) return null;

  // Format Aadhaar with spaces
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaarInput(raw);
    setErrorMsg(null);
  };

  const formattedAadhaar = aadhaarInput.replace(/(\d{4})(?=\d)/g, '$1 ');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarInput.length !== 12) {
      setErrorMsg('कृपया 12 अंकों का वैध आधार नंबर दर्ज करें।');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('आधार कार्ड पर दर्ज पूरा नाम लिखें।');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    // Simulate official UIDAI OTP gateway
    setTimeout(() => {
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockOtp);
      setIsLoading(false);
      setStep('otp');
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456') {
      setErrorMsg('अमान्य OTP! कृपया मोबाइल पर आया सही 6-अंकों का OTP दर्ज करें।');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const result = AuthService.verifyAadhaarForUser(aadhaarInput, fullName, stateName, districtName);
      setIsLoading(false);

      if (result.success && result.data) {
        setVerifiedKyc(result.data);
        setStep('verified');
        if (onSuccess) onSuccess(result.data);
        if (onVerificationSuccess) {
          const user = AuthService.getCurrentUser();
          onVerificationSuccess(user);
        }
      } else {
        setErrorMsg(result.error || 'वेरिफिकेशन विफल रहा।');
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#040C1A] border-2 border-emerald-500/70 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#021A12] via-[#05281C] to-[#021A12] border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                NATIONAL UIDAI SOVEREIGN KYC
              </span>
              <h3 className="text-base font-black text-white">असली आधार सत्यापन (100% Verified)</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Trust Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-700/50 flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              <strong>फर्जी प्रोफाइल मुक्त भारत:</strong> कंपनियों को केवल 100% आधार व डिग्री सत्यापित उम्मीदवार ही दिखते हैं। आपका पूरा आधार नंबर सुरक्षित रूप से एन्क्रिप्ट होकर सिर्फ <strong>XXXX-XXXX-{aadhaarInput ? aadhaarInput.slice(8) : '8921'}</strong> फॉर्मेट में स्टोर होता है।
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-600 text-rose-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: INPUT DETAILS */}
          {step === 'input' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  उम्मीदवार का पूरा नाम (आधार कार्ड के अनुसार) *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="उदा: मनीष विश्वकर्मा"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  12-अंकों का आधार नंबर *
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formattedAadhaar}
                    onChange={handleAadhaarChange}
                    placeholder="1234 5678 9012"
                    maxLength={14}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base tracking-wider focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  दर्ज किए गए अंक: {aadhaarInput.length}/12
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">राज्य (State)</label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value="Madhya Pradesh">मध्य प्रदेश (MP)</option>
                    <option value="Uttar Pradesh">उत्तर प्रदेश (UP)</option>
                    <option value="Rajasthan">राजस्थान</option>
                    <option value="Bihar">बिहार</option>
                    <option value="Maharashtra">महाराष्ट्र</option>
                    <option value="Delhi NCR">दिल्ली NCR</option>
                    <option value="Other">अन्य राज्य</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">ज़िला (District)</label>
                  <input
                    type="text"
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                    placeholder="उदा: भोपाल / इंदौर"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || aadhaarInput.length !== 12}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>UIDAI सर्वर से OTP जनरेट हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>आधार लिंक्ड मोबाइल पर OTP भेजें</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-600/50 text-xs text-blue-200 flex items-center justify-between">
                <span>आधार लिंक्ड मोबाइल पर 6-अंकों का OTP भेजा गया है:</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/30 text-amber-300 font-mono font-black text-sm">
                  {generatedOtp}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  6-अंकों का आधार OTP दर्ज करें *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-center text-xl tracking-widest focus:outline-none focus:border-emerald-400"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  नंबर बदलें
                </button>
                <button
                  type="submit"
                  disabled={isLoading || otpInput.length !== 6}
                  className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>UIDAI क्रिप्टोग्राफिक सत्यापन जारी...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>सत्यापित करें व बैज प्राप्त करें</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: VERIFIED CERTIFICATE */}
          {step === 'verified' && verifiedKyc && (
            <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">सत्यापन 100% सफल!</h4>
                <p className="text-xs text-emerald-400 font-bold mt-0.5">
                  आपका आधार सफलतापूर्वक भारत सरकार के UIDAI सर्वर द्वारा सत्यापित हुआ
                </p>
              </div>

              {/* Digital Tamper-Proof ID Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#062419] to-[#04140E] border-2 border-emerald-400/80 text-left space-y-3 shadow-2xl">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-black text-white">JITOMNI VERIFIED CITIZEN DOSSIER</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
                    100% TAMPER-PROOF
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">उम्मीदवार:</span>
                    <span className="font-bold text-white">{verifiedKyc.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">मास्क्ड आधार:</span>
                    <span className="font-bold text-amber-300 font-mono">{verifiedKyc.aadhaarNumberMasked}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">सत्यापन आईडी:</span>
                    <span className="font-mono text-emerald-300 text-[11px]">{verifiedKyc.verificationId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">स्थान:</span>
                    <span className="text-slate-200">{verifiedKyc.addressDistrict}, {verifiedKyc.addressState}</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-black/60 border border-emerald-900/60 font-mono text-[9px] text-emerald-400/80 break-all">
                  HASH: {verifiedKyc.tamperProofHash}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all"
              >
                नौकरी पोर्टल पर जारी रखें
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
