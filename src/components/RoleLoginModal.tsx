import React, { useState } from 'react';
import { Building2, GraduationCap, HardHat, ShieldCheck, CheckCircle2, ArrowRight, X, Sparkles, Phone, Lock, FileCheck } from 'lucide-react';
import { AppRole, Language } from '../types';

interface RoleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: AppRole) => void;
  currentRole: AppRole;
  lang: Language;
}

export const RoleLoginModal: React.FC<RoleLoginModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  currentRole,
  lang,
}) => {
  const [selectedRole, setSelectedRole] = useState<AppRole>('company');
  const [step, setStep] = useState<'select' | 'quick-login'>('select');
  const [phone, setPhone] = useState('');
  const [companyGst, setCompanyGst] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
    onSelectRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#07132B] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Top Glow Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                100% No Fake Profiles
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> GST & Test Verified
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>आप कौन हैं? / Who Are You?</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              अपनी सही भूमिका चुनें और वेरिफाइड हायरिंग नेटवर्क से तुरंत जुड़ें
            </p>
          </div>

          <button
            id="close-role-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role 1: Company */}
            <div
              id="role-card-company"
              onClick={() => setSelectedRole('company')}
              className={`cursor-pointer relative p-5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col justify-between ${
                selectedRole === 'company'
                  ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-900/30 ring-2 ring-blue-400/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {selectedRole === 'company' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">🏢 कंपनी (Employer)</h3>
                <p className="text-xs text-blue-400 font-semibold mt-0.5">जॉब निकालने वाला</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  GST वेरिफाइड वैकेंसी निकालें, AI टेस्ट बनाएं, सिर्फ टेस्ट पास टैलेंट पाएं।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <FileCheck className="w-3.5 h-3.5" /> 0% Fake Candidates
              </div>
            </div>

            {/* Role 2: Skilled Job Seeker */}
            <div
              id="role-card-skilled"
              onClick={() => setSelectedRole('skilled')}
              className={`cursor-pointer relative p-5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col justify-between ${
                selectedRole === 'skilled'
                  ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-900/30 ring-2 ring-amber-400/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {selectedRole === 'skilled' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">🎓 स्किल्ड कैंडिडेट</h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">पढ़ा-लिखा (Office / Tech)</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Excel, Tally, Coding का 10 MCQ टेस्ट पास करें और डायरेक्ट कंपनी कॉल पाएं।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-amber-300 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> ऑटो पुश टू कंपनी
              </div>
            </div>

            {/* Role 3: Labour / Blue Collar */}
            <div
              id="role-card-labour"
              onClick={() => setSelectedRole('labour')}
              className={`cursor-pointer relative p-5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col justify-between ${
                selectedRole === 'labour'
                  ? 'bg-emerald-950/50 border-emerald-500 shadow-lg shadow-emerald-900/30 ring-2 ring-emerald-400/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {selectedRole === 'labour' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                  <HardHat className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">👷 लेबर / कारीगर</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">कम पढ़ा-लिखा (Blue Collar)</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  मिस्त्री, मजदूर, ड्राइवर, हेल्पर - 5km के अंदर 1-क्लिक में डायरेक्ट काम और कॉल।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-emerald-300 flex items-center gap-1 font-medium">
                <Phone className="w-3.5 h-3.5" /> नो टेस्ट • नो डिग्री
              </div>
            </div>
          </div>

          {/* Role Summary Banner */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold">
                  {selectedRole === 'company' && 'कंपनी मोड: वैकेंसी पोस्टिंग, AI टेस्ट और वेरिफाइड कैंडिडेट्स इनबॉक्स'}
                  {selectedRole === 'skilled' && 'स्किल्ड मोड: स्किल टेस्ट पास करें -> सीधे कंपनी के डैशबोर्ड पर पहुंचे'}
                  {selectedRole === 'labour' && 'लेबर मोड: बड़ी फोटो, कम लिखाई, पास के ठेकेदार को 1-क्लिक डायरेक्ट कॉल'}
                </p>
                <p className="text-slate-400 text-[11px]">100% सुरक्षित और निःशुल्क वेरिफाइड हायरिंग</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            चयनित: <span className="text-amber-400 font-bold capitalize">{selectedRole}</span>
          </div>

          <button
            id="role-confirm-continue-btn"
            onClick={handleContinue}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <span>डैशबोर्ड खोलें / Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
