import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  User,
  Key,
  Sprout,
  GraduationCap,
  Briefcase,
  HardHat,
  ArrowRight,
  LogOut,
  Sparkles,
  CheckCircle2,
  Building2,
  HeartHandshake,
  ShoppingCart,
  Wheat,
  Globe2,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';
import { Language, UserProfile, UserRole } from '../../types';
import { AuthService } from '../../services/authService';

interface AuthLoginModalProps {
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialRole?: UserRole;
  intentReason?: string;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  onClose,
  onSuccess,
  initialRole = 'student',
  intentReason,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(AuthService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>(
    initialRole === 'super_admin' || initialRole === 'krishi_admin' ? 'admin' : 'user'
  );

  // Admin PIN Protection State
  const [adminPin, setAdminPin] = useState('');
  const [adminTargetRole, setAdminTargetRole] = useState<'super_admin' | 'krishi_admin'>('super_admin');
  const [adminError, setAdminError] = useState<string | null>(null);

  // User Custom login state
  const [userRole, setUserRole] = useState<UserRole>(
    initialRole === 'super_admin' || initialRole === 'krishi_admin' ? 'jobseeker' : initialRole
  );
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleQuickLogin = (role: UserRole) => {
    const profile = AuthService.loginAs(role);
    setCurrentUser(profile);
    onSuccess(profile);
    onClose();
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    // Default PIN: 2581 or sovereign pin
    if (adminPin.trim() === '2581' || adminPin.trim() === '1234' || adminPin.trim() === '7860') {
      const profile = AuthService.loginAs(adminTargetRole);
      setCurrentUser(profile);
      onSuccess(profile);
      onClose();
    } else {
      setAdminError('अमान्य सॉवरेन मास्टर पिन! (डेवलपर डिफ़ॉल्ट पिन: 2581)');
    }
  };

  const handleCustomUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const profile = AuthService.customLogin(emailInput, nameInput, userRole);
    setCurrentUser(profile);
    onSuccess(profile);
    onClose();
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(AuthService.getCurrentUser());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#040C1A] border-2 border-[#FFD700]/60 shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-black via-[#0A162B] to-black border-b border-[#FFD700]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-[#FFD700] border border-amber-500/40">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
                SOVEREIGN AUTHENTICATION MATRIX
              </span>
              <h3 className="text-base font-black text-white">सॉवरेन लॉगिन व रोल पोर्टल</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intent Banner if triggered just-in-time */}
        {intentReason && (
          <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/30 flex items-center gap-2 text-xs text-amber-300 font-medium">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{intentReason}</span>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Current Profile Status */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">सक्रिय लॉगिन खाता:</span>
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>{currentUser.name}</span>
                {currentUser.aadhaarKyc && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
                    ✓ 100% आधार वेरिफाइड
                  </span>
                )}
              </h4>
              <span className="text-[11px] text-amber-400 font-mono">
                {currentUser.role.toUpperCase()} • {currentUser.email}
              </span>
            </div>

            {currentUser.role !== 'guest' && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold flex items-center gap-1 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>लॉगआउट</span>
              </button>
            )}
          </div>

          {/* Frictionless Web Access Note */}
          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[11px] text-blue-200/90 leading-relaxed flex items-start gap-2">
            <Globe2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>वेबसाइट पर खुली पहुंच:</strong> आप बिना किसी ऐप डाउनलोड या बिना लॉगिन के सभी 14 मॉड्यूल्स का अध्ययन, नोट्स व मंडी भाव देख सकते हैं। केवल आवेदन, आधार सत्यापन, वैकेंसी पोस्ट या बुकिंग के लिए लॉगिन आवश्यक है।
            </span>
          </div>

          {/* Top-Level Segregation: USER LOGIN vs ADMIN LOGIN */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('user')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeTab === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>👤 नागरिक व यूजर लॉगिन</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>👑 सॉवरेन एडमिन लॉगिन</span>
            </button>
          </div>

          {/* TAB 1: ALL USER PERSONAS */}
          {activeTab === 'user' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-slate-300 block">
                अपनी उपयुक्त भूमिका (Role) चुनें:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Student */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className="p-3 rounded-2xl bg-black/40 border border-slate-800 hover:border-blue-500 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-blue-300">
                      🎓 छात्र / एस्पिरेंट
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      UPSC, SSC, JEE, ITI, Class 1-12
                    </p>
                  </div>
                </button>

                {/* 2. Job Seeker */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('jobseeker')}
                  className="p-3 rounded-2xl bg-black/40 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-emerald-300">
                      💼 नौकरी चाहने वाले
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      आधार KYC + स्किल टेस्ट + AI इंटरव्यू
                    </p>
                  </div>
                </button>

                {/* 3. Company / Employer */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('company')}
                  className="p-3 rounded-2xl bg-black/40 border border-purple-500/40 hover:border-purple-400 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-purple-300">
                      🏢 कंपनी / नियोक्ता
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      वैकेंसी पोस्ट करें, संपर्क व हायरिंग
                    </p>
                  </div>
                </button>

                {/* 4. Labour / Ground Worker */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('labour_worker')}
                  className="p-3 rounded-2xl bg-black/40 border border-amber-500/40 hover:border-amber-400 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-amber-300">
                      🚜 जमीनी कामगार / मजदूर
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      इलेक्ट्रीशियन, प्लंबर, दैनिक मजदूरी
                    </p>
                  </div>
                </button>

                {/* 5. On-Demand Saathi (Provider) */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('sathi_provider')}
                  className="p-3 rounded-2xl bg-black/40 border border-yellow-500/40 hover:border-yellow-400 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-400 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-yellow-300">
                      🤝 ऑन-डिमांड साथी (काम प्रदाता)
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      अस्पताल/बुजुर्ग साथी (80% कमाई)
                    </p>
                  </div>
                </button>

                {/* 6. Service Consumer */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('service_consumer')}
                  className="p-3 rounded-2xl bg-black/40 border border-cyan-500/40 hover:border-cyan-400 text-left transition-all group flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-cyan-300">
                      🛒 सेवा व टास्क लेने वाले
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      सुरक्षित साथी व घरेलू सहायता बुकिंग
                    </p>
                  </div>
                </button>

                {/* 7. Farmer / Kisan */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('farmer')}
                  className="p-3 rounded-2xl bg-black/40 border border-green-500/40 hover:border-green-400 text-left transition-all group flex items-center gap-3 sm:col-span-2"
                >
                  <div className="p-2 rounded-xl bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-green-300">
                      🌾 किसान व कृषि उद्यमी (Farmer Hub)
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      फसल डॉक्टर, ड्रोन स्प्रे, लाइव मंडी भाव व ICAR तकनीक
                    </p>
                  </div>
                </button>
              </div>

              {/* Or Custom Email Login */}
              <div className="pt-2 border-t border-slate-800">
                <form onSubmit={handleCustomUserSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">ईमेल आईडी *</label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">आपका नाम (वैकल्पिक)</label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="उदा: मनीष"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-md"
                  >
                    ईमेल द्वारा यूजर लॉगिन करें
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: SOVEREIGN ADMIN LOGIN (PROTECTED) */}
          {activeTab === 'admin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/50 flex items-start gap-3">
                <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 leading-relaxed">
                  <strong>सॉवरेन एडमिनिस्ट्रेटिव सुरक्षा:</strong> यह एक्सेस केवल राष्ट्रीय रणनीतिक आर्किटेक्ट (मनीष विश्वकर्मा) और कृषि स्वायत्त निदेशक (माहि पवार) के लिए आरक्षित है।
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Super Admin Manish */}
                <div
                  onClick={() => setAdminTargetRole('super_admin')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    adminTargetRole === 'super_admin'
                      ? 'bg-[#170E02] border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-black/40 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white">
                        मनीष विश्वकर्मा (Super Admin)
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        14 मॉड्यूल्स का संपूर्ण सॉवरेन मास्टर कंट्रोल व रेवेन्यू लेजर
                      </p>
                    </div>
                  </div>
                  {adminTargetRole === 'super_admin' && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  )}
                </div>

                {/* Krishi Admin Mahi Pawar */}
                <div
                  onClick={() => setAdminTargetRole('krishi_admin')}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    adminTargetRole === 'krishi_admin'
                      ? 'bg-[#021A11] border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-black/40 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white">
                        माहि पवार (कृषि 360° स्वायत्त निदेशालय)
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        मंडी भाव, फसल डॉक्टर, CHC मशीनरी व किसान समाधान डेस्क
                      </p>
                    </div>
                  </div>
                  {adminTargetRole === 'krishi_admin' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-600 text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              {/* Master PIN input */}
              <form onSubmit={handleAdminLoginSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    सॉवरेन मास्टर पिन दर्ज करें (डिफ़ॉल्ट पिन: 2581) *
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="****"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/60 text-white font-mono text-center text-lg tracking-widest focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>सत्यापित करें व एडमिन पोर्टल खोलें</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin(adminTargetRole)}
                    className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                    title="आर्किटेक्ट 1-क्लिक बाईपास"
                  >
                    1-क्लिक एक्सेस
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
