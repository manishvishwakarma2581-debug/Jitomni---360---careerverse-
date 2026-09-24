import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  Award,
  Lock,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { AutoDriver, TShirtSize } from './royalAutoTypes';
import { RoyalAutoStorage, getCityCode, POPULAR_INDIAN_CITIES } from './royalAutoStorage';
import { DriverDigitalCard } from './DriverDigitalCard';

interface DriverOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverRegistered: (driver: AutoDriver) => void;
}

export const DriverOnboardingModal: React.FC<DriverOnboardingModalProps> = ({
  isOpen,
  onClose,
  onDriverRegistered,
}) => {
  // Form Steps: 1: Basic Info, 2: Verification (Aadhaar OTP + License), 3: Success & Digital ID Card
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [autoNumber, setAutoNumber] = useState<string>('');
  const [aadharNumber, setAadharNumber] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');
  const [vehicleRc, setVehicleRc] = useState<string>('');
  const [cityName, setCityName] = useState<string>('Rewa');
  const [address, setAddress] = useState<string>('');
  const [tShirtSize, setTShirtSize] = useState<TShirtSize>('L');
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces'
  );
  const [autoPhotoUrl, setAutoPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
  );

  // Verification step states
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [isAadharVerified, setIsAadharVerified] = useState<boolean>(false);
  const [isLicenseVerified, setIsLicenseVerified] = useState<boolean>(false);
  const [verifyingAadhar, setVerifyingAadhar] = useState<boolean>(false);
  const [verifyingLicense, setVerifyingLicense] = useState<boolean>(false);

  // Error/Alert message
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Generated Driver Object for step 3
  const [generatedDriver, setGeneratedDriver] = useState<AutoDriver | null>(null);

  if (!isOpen) return null;

  // Auto derived city code
  const cityCode = getCityCode(cityName);

  // Step 1 -> Step 2 validation
  const handleProceedToVerification = () => {
    setErrorMessage('');
    if (!name.trim()) return setErrorMessage('कृपया अपना पूरा नाम दर्ज करें।');
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
      return setErrorMessage('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
    }
    if (!autoNumber.trim()) return setErrorMessage('कृपया ऑटो रिक्शा नंबर (उदा: MP 17 RA 4592) दर्ज करें।');
    
    const cleanAadhar = aadharNumber.replace(/[^0-9]/g, '');
    if (cleanAadhar.length !== 12) {
      return setErrorMessage('कृपया 12 अंकों का वैध आधार नंबर दर्ज करें।');
    }

    // AI Duplicate Aadhaar Check
    if (RoyalAutoStorage.checkAadharDuplicate(aadharNumber)) {
      return setErrorMessage(
        '⚠️ AI फ्रॉड सुरक्षा: यह आधार कार्ड पहले से ही एक अन्य रॉयल आईडी से पंजीकृत है! एक आधार से एक ही आईडी बन सकती है।'
      );
    }

    if (!licenseNumber.trim()) return setErrorMessage('कृपया अपना ड्राइविंग लाइसेंस नंबर दर्ज करें।');

    setStep(2);
  };

  // Simulate Aadhaar OTP Send
  const handleSendAadharOTP = () => {
    setOtpSent(true);
    setErrorMessage('');
  };

  // Simulate UIDAI OTP Verify
  const handleVerifyAadharOTP = () => {
    if (!otpInput.trim() || otpInput.length < 4) {
      return setErrorMessage('कृपया 4 या 6 अंकों का OTP दर्ज करें (डेमो: कोई भी 4 अंक जैसे 1234)');
    }
    setVerifyingAadhar(true);
    setTimeout(() => {
      setVerifyingAadhar(false);
      setIsAadharVerified(true);
    }, 1200);
  };

  // Simulate Parivahan License Check
  const handleVerifyLicense = () => {
    setVerifyingLicense(true);
    setTimeout(() => {
      setVerifyingLicense(false);
      setIsLicenseVerified(true);
    }, 1500);
  };

  // Final Submission and Auto Royal ID Generation
  const handleFinalSubmit = () => {
    if (!isAadharVerified) {
      return setErrorMessage('कृपया आगे बढ़ने से पहले आधार OTP वेरिफाई करें।');
    }
    if (!isLicenseVerified) {
      return setErrorMessage('कृपया परिवहन पोर्टल से ड्राइविंग लाइसेंस वेरिफाई करें।');
    }

    // Generate unique Royal ID: JS-[CITY_CODE]-[4 DIGITS]
    const royalId = RoyalAutoStorage.generateRoyalId(cityCode);

    const newDriver: AutoDriver = {
      royalId,
      cityCode,
      cityName,
      name,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      autoNumber: autoNumber.toUpperCase(),
      aadharNumber,
      licenseNumber: licenseNumber.toUpperCase(),
      vehicleRcNumber: vehicleRc || `RC-${autoNumber.replace(/\s+/g, '')}`,
      address: address || `${cityName} मुख्य शहर`,
      photoUrl,
      autoPhotoUrl,
      isAadharVerified: true,
      isLicenseVerified: true,
      isPoliceVerified: false, // Admin manual verification needed
      status: 'pending', // Will be approved in admin panel
      rating: 5.0,
      totalRides: 0,
      currentLocation: {
        lat: 24.5362,
        lng: 81.3037,
        landmark: `${cityName} बस स्टैंड`,
      },
      joiningDate: new Date().toISOString().split('T')[0],
      tShirtSize,
      languages: ['Hindi', 'English (Basic)'],
      isOnline: false,
      todayEarnings: 0,
      todayRidesCount: 0,
      sosStatus: 'safe',
      joiningFeePaid: true,
      subscriptionPaid: true,
    };

    const res = RoyalAutoStorage.addDriver(newDriver);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    setGeneratedDriver(newDriver);
    onDriverRegistered(newDriver);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37] shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
              🛺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  रॉयल ऑटो एग्जीक्यूटिव ऑनबोर्डिंग
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[10px] font-black">
                  ₹0 COMMISSION RIDES
                </span>
              </div>
              <p className="text-xs text-[#D4AF37]">
                अपना ऑटो जोड़ें, यूनिक Royal ID पाएं और सम्मानपूर्वक ₹30,000+/माह कमाएं।
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-[#07132B] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#D4AF37] font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">1</span>
            <span>चालक व वाहन विवरण</span>
          </div>
          <span className="text-slate-600">➔</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#D4AF37] font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">2</span>
            <span>आधार व लाइसेंस सत्यापन</span>
          </div>
          <span className="text-slate-600">➔</span>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">3</span>
            <span>रॉयल आईडी कार्ड व क्यूआर</span>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/60 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  चालक का पूरा नाम (Full Name) *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा: रमेश विश्वकर्मा"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  मोबाइल नंबर (Phone Number) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="उदा: 93996 08239"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  शहर (City) * — कोड: <span className="text-[#D4AF37] font-mono">{cityCode}</span>
                </label>
                <select
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {POPULAR_INDIAN_CITIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name} ({c.code}) - {c.state}
                    </option>
                  ))}
                  <option value="Other">अन्य शहर (Enter Other)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  ऑटो रिक्शा नंबर (Auto Registration No.) *
                </label>
                <input
                  type="text"
                  value={autoNumber}
                  onChange={(e) => setAutoNumber(e.target.value.toUpperCase())}
                  placeholder="उदा: MP 17 RA 4592"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  आधार कार्ड नंबर (Aadhaar 12-Digits) *
                </label>
                <input
                  type="text"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  placeholder="उदा: 8921-4432-1092"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-slate-400">UIDAI डिजिलॉकर से स्वतः सत्यापित होगा</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  ड्राइविंग लाइसेंस नंबर (Driving License) *
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                  placeholder="उदा: MP17 20180045892"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  वाहन आर.सी. नंबर (Vehicle RC Certificate No.) *
                </label>
                <input
                  type="text"
                  value={vehicleRc}
                  onChange={(e) => setVehicleRc(e.target.value.toUpperCase())}
                  placeholder="उदा: RC-MP17-2022-9018"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-slate-400">परिवहन वाहन रजिस्ट्रेशन सत्यापन</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  रॉयल टी-शर्ट साइज (Uniform T-Shirt Size)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['M', 'L', 'XL', 'XXL'] as TShirtSize[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setTShirtSize(sz)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        tShirtSize === sz
                          ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  घर का पता / मोहल्ला (Local Address)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="उदा: वार्ड 12, सिविल लाइन्स, रीवा"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Photos selection */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <img
                  src={photoUrl}
                  alt="Driver Selfie"
                  className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">ड्राइवर फोटो (Selfie)</div>
                  <div className="text-[10px] text-slate-400">रॉयल आईडी कार्ड पर प्रिंट होगी</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <img
                  src={autoPhotoUrl}
                  alt="Auto Photo"
                  className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">ऑटो रिक्शा फोटो</div>
                  <div className="text-[10px] text-slate-400">ग्राहकों को ऐप में दिखेगी</div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleProceedToVerification}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>सत्यापन के लिए आगे बढ़ें (Verify Details)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Live Verification Simulation */}
        {step === 2 && (
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Step 2 Header Card */}
            <div className="p-4 rounded-2xl bg-[#071938] border border-[#D4AF37]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-black uppercase">
                  SOVEREIGN UIDAI & PARIVAHAN API
                </span>
                <h3 className="text-sm font-black text-white mt-0.5">
                  100% प्रामाणिक सुरक्षा सत्यापन
                </h3>
              </div>
              <div className="text-right text-xs font-mono text-slate-300">
                PROPOSED ID: <span className="text-[#D4AF37] font-bold">JS-{cityCode}-NEW</span>
              </div>
            </div>

            {/* Aadhaar Verification Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">1. आधार कार्ड सत्यापन (UIDAI OTP)</h4>
                    <span className="text-[10px] font-mono text-slate-400">{aadharNumber}</span>
                  </div>
                </div>
                {isAadharVerified ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    सत्यापित (Verified)
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    लंबित (Pending OTP)
                  </span>
                )}
              </div>

              {!isAadharVerified && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendAadharOTP}
                      className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>आधार लिंक्ड मोबाइल पर OTP भेजें</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="4-अंकों का OTP डालें (उदा: 1234)"
                        className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyAadharOTP}
                        disabled={verifyingAadhar}
                        className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        {verifyingAadhar ? 'सत्यापित हो रहा है...' : 'OTP सत्यापित करें'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Driving License Verification Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">2. सारथी/परिवहन लाइसेंस रिकॉर्ड</h4>
                    <span className="text-[10px] font-mono text-slate-400">{licenseNumber}</span>
                  </div>
                </div>
                {isLicenseVerified ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    सत्यापित (Valid LMV-Commercial)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyLicense}
                    disabled={verifyingLicense}
                    className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    {verifyingLicense ? 'जाँच हो रही है...' : 'लाइसेंस जांचें'}
                  </button>
                )}
              </div>
            </div>

            {/* Police Verification Notice */}
            <div className="p-3.5 rounded-xl bg-yellow-950/40 border border-yellow-500/40 text-xs space-y-1">
              <div className="flex items-center gap-2 text-yellow-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>3. पुलिस वेरिफिकेशन (Admin CID Check)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                पंजीकरण के बाद सुपर एडमिन पैनल से आपके स्थानीय थाने का रिकॉर्ड सत्यापित किया जाएगा। सत्यापित होते ही आप ग्राहकों को लाइव दिखने लगेंगे।
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ← वापस जाएं
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>पंजीकरण पूर्ण करें व रॉयल आईडी बनाएं</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success & Digital ID Card Showcase */}
        {step === 3 && generatedDriver && (
          <div className="p-6 space-y-5 text-center max-h-[75vh] overflow-y-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 font-mono text-xs font-black">
                UNIQUE ROYAL ID GENERATED
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                बधाई हो, {generatedDriver.name}!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                आपकी यूनिक रॉयल आईडी <strong>{generatedDriver.royalId}</strong> जारी हो चुकी है। अब आप सीधे ड्राइवर ऐप में लॉगिन कर सकते हैं।
              </p>
            </div>

            {/* Digital Card Preview */}
            <div className="my-2">
              <DriverDigitalCard driver={generatedDriver} />
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                होम पर लौटें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
