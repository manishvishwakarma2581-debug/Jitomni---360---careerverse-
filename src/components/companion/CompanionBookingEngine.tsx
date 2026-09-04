import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, ShieldCheck, Users, Sparkles, CheckCircle2, ChevronRight, AlertCircle, Info, Calculator } from 'lucide-react';
import { CompanionCategoryType, CompanionServiceCategory, Language } from '../../types';
import { companionCategories } from '../../data/companionData';

interface CompanionBookingEngineProps {
  selectedCategory: CompanionCategoryType;
  onCategoryChange: (cat: CompanionCategoryType) => void;
  selectedSubServiceId?: string;
  onSubServiceChange?: (subId: string) => void;
  onSubmitBooking: (bookingData: {
    category: CompanionCategoryType;
    subServiceId?: string;
    selectedDate: string;
    startTime: string;
    durationHours: number;
    requirements: string;
    genderPreference: 'any' | 'female' | 'male';
    workerCount: number;
    address: string;
    landmark: string;
    city: string;
    pincode: string;
    userPhone: string;
    emergencyContact: string;
    hourlyRate: number;
    totalEstimatedAmount: number;
  }) => void;
  lang: Language;
}

export const CompanionBookingEngine: React.FC<CompanionBookingEngineProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedSubServiceId,
  onSubServiceChange,
  onSubmitBooking,
  lang,
}) => {
  // Form State
  const [dateOption, setDateOption] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('Immediate (Next 15-25 mins)');
  const [durationHours, setDurationHours] = useState<number>(4);
  const [requirements, setRequirements] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<'any' | 'female' | 'male'>('any');
  const [workerCount, setWorkerCount] = useState<number>(1);
  const [address, setAddress] = useState<string>('Bhopal Memorial Hospital / Arera Colony E-7');
  const [landmark, setLandmark] = useState<string>('Near Gate No. 2, OPD Block');
  const [city, setCity] = useState<string>('Bhopal');
  const [pincode, setPincode] = useState<string>('462016');
  const [userPhone, setUserPhone] = useState<string>('9826199401');
  const [emergencyContact, setEmergencyContact] = useState<string>('9425011892');
  const [locationAutoDetected, setLocationAutoDetected] = useState(false);

  // Active Category Meta
  const currentCategoryMeta = companionCategories.find((c) => c.id === selectedCategory) || companionCategories[0];
  const hourlyRate = currentCategoryMeta.baseHourlyRate;

  // Price Calculation Math
  const baseSubtotal = hourlyRate * durationHours * workerCount;
  const safetyInsuranceFee = 29; // Sovereign verification & accidental insurance
  const taxAmount = Math.round(baseSubtotal * 0.05); // 5% GST
  const totalEstimatedAmount = baseSubtotal + safetyInsuranceFee + taxAmount;

  // Set prompt in requirement box
  const applyRequirementPrompt = (promptText: string) => {
    setRequirements((prev) => {
      if (!prev) return promptText;
      return `${prev}, ${promptText}`;
    });

    if (promptText.toLowerCase().includes('female')) {
      setGenderPreference('female');
    } else if (promptText.toLowerCase().includes('boys') || promptText.toLowerCase().includes('male')) {
      setGenderPreference('male');
    }

    if (promptText.includes('2 boys') || promptText.includes('2 girls')) {
      setWorkerCount(2);
    }
  };

  const handleUseCurrentLocation = () => {
    setLocationAutoDetected(true);
    setAddress('AIIMS Hospital Road / MP Nagar Zone 1, Near Metro Station');
    setLandmark('Opposite City Center Mall');
    setCity('Bhopal');
    setPincode('462011');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDate =
      dateOption === 'today'
        ? new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : dateOption === 'tomorrow'
        ? new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : customDate;

    onSubmitBooking({
      category: selectedCategory,
      subServiceId: selectedSubServiceId,
      selectedDate,
      startTime,
      durationHours,
      requirements: requirements || `Need verified companion for ${currentCategoryMeta.title[lang]}`,
      genderPreference,
      workerCount,
      address,
      landmark,
      city,
      pincode,
      userPhone,
      emergencyContact,
      hourlyRate,
      totalEstimatedAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Ribbon Selector */}
      <div className="bg-[#07132B] p-3 rounded-2xl border border-slate-700/80 shadow-inner">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {lang === 'hi' ? '1. सेवा श्रेणी पुष्टि करें (Select Category):' : '1. Confirm Service Category:'}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {companionCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`p-3 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2 border ${
                  isSelected
                    ? `bg-white text-slate-950 border-white shadow-md shadow-white/20`
                    : 'bg-black/40 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="truncate">
                  <div className="truncate">{cat.title[lang].split(' ')[1] || cat.title[lang]}</div>
                  <div className="text-[10px] font-mono text-amber-500">₹{cat.baseHourlyRate}/hr</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Form & Pricing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sub-Services Selection */}
          <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-3">
            <label className="block text-xs font-black text-white uppercase tracking-wider">
              {lang === 'hi' ? '2. विशिष्ट कार्य प्रकार (Sub-Service):' : '2. Specific Sub-Service:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentCategoryMeta.subServices.map((sub) => {
                const isSubSelected = selectedSubServiceId === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => onSubServiceChange && onSubServiceChange(sub.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSubSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                        : 'bg-black/30 hover:bg-black/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-xl mt-0.5">{sub.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span className="truncate">{sub.name[lang] || sub.name.hi}</span>
                        <span className="text-[10px] text-amber-400 font-mono">~{sub.recommendedHours}h</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                        {sub.desc[lang] || sub.desc.hi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date, Time & Hourly Duration Engine */}
          <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{lang === 'hi' ? '3. दिनांक एवं समय अवधि (Hourly Basis):' : '3. Date & Hourly Duration:'}</span>
              </label>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                100% Flexible • Cancel anytime
              </span>
            </div>

            {/* Date Options */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDateOption('today')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                  dateOption === 'today'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400'
                    : 'bg-black/40 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                ⚡ आज (Today)
              </button>
              <button
                type="button"
                onClick={() => setDateOption('tomorrow')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                  dateOption === 'tomorrow'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400'
                    : 'bg-black/40 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                📅 कल (Tomorrow)
              </button>
              <button
                type="button"
                onClick={() => setDateOption('custom')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                  dateOption === 'custom'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400'
                    : 'bg-black/40 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                🗓️ अन्य तारीख
              </button>
            </div>

            {dateOption === 'custom' && (
              <div>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-4 py-2 text-white text-xs"
                />
              </div>
            )}

            {/* Start Time Selection */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>शुरुआत का समय (Start Time):</span>
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-black/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
              >
                <option value="Immediate (Next 15-25 mins)">⚡ Immediate Dispatch (Next 15-25 mins)</option>
                <option value="Morning 08:00 AM">Morning 08:00 AM</option>
                <option value="Morning 10:00 AM">Morning 10:00 AM (OPD / Bank Hours)</option>
                <option value="Afternoon 02:00 PM">Afternoon 02:00 PM</option>
                <option value="Evening 06:00 PM">Evening 06:00 PM (Wedding Reception / Park Walk)</option>
                <option value="Night 08:00 PM">Night 08:00 PM (Overnight Hospital Stay)</option>
                <option value="Custom Time">Custom Time</option>
              </select>
            </div>

            {/* Duration Slider & Quick Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-300">
                  {lang === 'hi' ? 'कार्य अवधि (Hours Required):' : 'Duration (Hours Required):'}
                </label>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/40">
                  {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'}
                </span>
              </div>

              {/* Quick duration buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {[1, 2, 3, 4, 6, 8, 12].map((hr) => (
                  <button
                    type="button"
                    key={hr}
                    onClick={() => setDurationHours(hr)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                      durationHours === hr
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                        : 'bg-black/40 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {hr} {hr === 1 ? 'घंटा' : 'घंटे'} ({hr}h)
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 Hour (Quick Errand)</span>
                <span>4 Hours (OPD / Event)</span>
                <span>8 Hours (Full Shift)</span>
                <span>12 Hours (Overnight Stay)</span>
              </div>
            </div>
          </div>

          {/* Specific Requirements & Quick Prompt Pills */}
          <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>{lang === 'hi' ? '4. विशिष्ट आवश्यकताएं (Specific Requirements):' : '4. Specific Requirements:'}</span>
              </label>
              <span className="text-[10px] text-slate-400">Click chips to auto-fill</span>
            </div>

            {/* Quick 1-Click Prompt Chips */}
            <div className="flex flex-wrap gap-2">
              {currentCategoryMeta.quickRequirements.map((promptText, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => applyRequirementPrompt(promptText)}
                  className="text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#FFD700]/20 text-slate-200 hover:text-[#FFD700] border border-white/10 hover:border-[#FFD700]/40 transition-all text-left"
                >
                  + {promptText}
                </button>
              ))}
            </div>

            {/* Requirements Textarea */}
            <div>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="e.g. Need a female companion for hospital stay, must be polite and Hindi-speaking; OR Need 2 boys for wedding stage coordination and guest welcome..."
                className="w-full bg-black/60 border border-slate-600 rounded-xl p-3 text-white text-xs placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Gender Preference & Number of Companions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                  जेंडर प्राथमिकता (Companion Gender):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'any', label: 'कोई भी (Any)' },
                    { id: 'female', label: 'महिला (Female)' },
                    { id: 'male', label: 'पुरुष (Male)' },
                  ].map((g) => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setGenderPreference(g.id as any)}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all border ${
                        genderPreference === g.id
                          ? 'bg-white text-slate-950 border-white shadow-md'
                          : 'bg-black/40 text-slate-300 border-slate-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                  कितने साथी चाहिए (Worker Count):
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                    className="w-9 h-9 rounded-xl bg-black/60 text-white font-bold border border-slate-700 hover:border-slate-500"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-amber-400 px-3">
                    {workerCount} {workerCount === 1 ? 'Companion' : 'Companions'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.min(5, workerCount + 1))}
                    className="w-9 h-9 rounded-xl bg-black/60 text-white font-bold border border-slate-700 hover:border-slate-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact Details */}
          <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? '5. कार्य स्थान व संपर्क (Location & Safety Contacts):' : '5. Location & Safety Contacts:'}</span>
              </label>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1"
              >
                <span>📍</span>
                <span>{locationAutoDetected ? '✓ Live GPS Synced' : 'Auto-Detect GPS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  पूरा पता / अस्पताल का नाम व वार्ड (Complete Address):
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Hamidia Hospital, Medicine Ward 4, Room 12 OR BHEL Jubilee Gate"
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">लैंडमार्क (Landmark):</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Blood Bank / Gate 2"
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">शहर व पिनकोड (City & PIN):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bhopal"
                    className="w-1/2 bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="462001"
                    className="w-1/2 bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  आपका मोबाइल नंबर (Your Phone):
                </label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  इमरजेंसी संपर्क नंबर (Alternate SOS Contact):
                </label>
                <input
                  type="tel"
                  required
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Relative / Family phone"
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Transparent Pricing Card & Match Confirmation */}
        <div className="space-y-5">
          <div className="sticky top-24 rounded-3xl bg-gradient-to-b from-[#091733] to-[#040B18] border-2 border-[#FFD700]/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD700]">
                  TRANSPARENT TARIFF
                </span>
                <h4 className="text-base font-black text-white">मूल्य एवं लागत अनुमान</h4>
              </div>
              <Calculator className="w-5 h-5 text-[#FFD700]" />
            </div>

            {/* Selected Category Summary */}
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">चयनित सेवा:</span>
              <strong className="text-white flex items-center gap-1">
                <span>{currentCategoryMeta.icon}</span>
                <span>{currentCategoryMeta.title[lang].split(' ')[1] || currentCategoryMeta.title[lang]}</span>
              </strong>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 py-3 border-y border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>
                  बेस दर (₹{hourlyRate}/hr × {durationHours}h {workerCount > 1 ? `× ${workerCount} साथी` : ''}):
                </span>
                <span className="font-mono font-bold text-white">₹{baseSubtotal}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>सोवरेन सुरक्षा व ₹2L बीमा:</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">₹{safetyInsuranceFee}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>प्लेटफ़ॉर्म शुल्क (100% युवा को भुगतान):</span>
                <span className="font-mono font-bold text-emerald-400">₹0 (FREE)</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>जीएसटी (5% टैक्स):</span>
                <span className="font-mono">₹{taxAmount}</span>
              </div>
            </div>

            {/* Total Estimated Cost */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-bold">कुल अनुमानित राशि</div>
                <div className="text-[10px] text-emerald-400">No Hidden Charges</div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-amber-400 font-mono">
                  ₹{totalEstimatedAmount}
                </div>
                <div className="text-[10px] text-slate-400">Pay after task OTP</div>
              </div>
            </div>

            {/* Sovereign Verification Badges */}
            <div className="p-3 rounded-xl bg-black/50 border border-emerald-500/30 text-[11px] text-slate-300 space-y-1.5 mb-5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% पुलिस व आधार वेरिफाइड गारंटी</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                सभी साथी मध्य प्रदेश / संबंधित राज्य पुलिस के क्राइम रिकॉर्ड क्लीयरेंस और आधार फेस-ऑथ बायोमेट्रिक से सत्यापित हैं।
              </p>
            </div>

            {/* Submit / Match Companion Button */}
            <button
              id="confirm-find-companion-btn"
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-500 to-amber-600 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/30 hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>नजदीकी साथी खोजें व मैच करें</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Next Step: View verified companion profiles, ratings & live ETA
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
