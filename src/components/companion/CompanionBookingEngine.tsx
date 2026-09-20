import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  Info, 
  Calculator,
  Bike,
  User,
  Gift,
  Timer,
  Moon,
  Sun
} from 'lucide-react';
import { 
  CompanionCategoryType, 
  Language, 
  SovereignTaskServiceId, 
  CompanionVehicleMode 
} from '../../types';
import { 
  companionCategories, 
  SOVEREIGN_TASK_SERVICES, 
  calculateSovereignTaskQuote 
} from '../../data/companionData';

interface CompanionBookingEngineProps {
  selectedCategory: CompanionCategoryType;
  onCategoryChange: (cat: CompanionCategoryType) => void;
  selectedSubServiceId?: string;
  onSubServiceChange?: (subId: string) => void;
  selectedTaskId?: SovereignTaskServiceId;
  onTaskIdChange?: (taskId: SovereignTaskServiceId) => void;
  selectedVehicleMode?: CompanionVehicleMode;
  onVehicleModeChange?: (mode: CompanionVehicleMode) => void;
  onSubmitBooking: (bookingData: {
    category: CompanionCategoryType;
    subServiceId?: string;
    serviceTaskId?: SovereignTaskServiceId;
    vehicleMode?: CompanionVehicleMode;
    distanceKm?: number;
    distanceCharge?: number;
    waitingMinutes?: number;
    waitingCharge?: number;
    isNightRide?: boolean;
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
  selectedTaskId,
  onTaskIdChange,
  selectedVehicleMode,
  onVehicleModeChange,
  onSubmitBooking,
  lang,
}) => {
  // Determine active task based on prop or category default
  const defaultTask = SOVEREIGN_TASK_SERVICES.find(t => t.category === selectedCategory) || SOVEREIGN_TASK_SERVICES[1]; // default hospital
  const [currentTaskId, setCurrentTaskId] = useState<SovereignTaskServiceId>(selectedTaskId || defaultTask.id);
  const [vehicleMode, setVehicleMode] = useState<CompanionVehicleMode>(selectedVehicleMode || 'without_bike');

  // Sync if props change
  useEffect(() => {
    if (selectedTaskId && selectedTaskId !== currentTaskId) {
      setCurrentTaskId(selectedTaskId);
    }
  }, [selectedTaskId]);

  useEffect(() => {
    if (selectedVehicleMode && selectedVehicleMode !== vehicleMode) {
      setVehicleMode(selectedVehicleMode);
    }
  }, [selectedVehicleMode]);

  const activeTask = SOVEREIGN_TASK_SERVICES.find(t => t.id === currentTaskId) || SOVEREIGN_TASK_SERVICES[0];

  // If task is ride service, vehicleMode must be with_bike
  useEffect(() => {
    if (activeTask.isRideService && vehicleMode !== 'with_bike') {
      setVehicleMode('with_bike');
    }
  }, [activeTask, vehicleMode]);

  // Form State
  const [dateOption, setDateOption] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('Immediate (Next 15-25 mins)');
  
  // Duration initialized to at least task's min booking
  const [durationHours, setDurationHours] = useState<number>(Math.max(activeTask.minBookingHours, 2));

  // When task changes, ensure duration satisfies minimum booking
  useEffect(() => {
    if (activeTask.minBookingHours > durationHours) {
      setDurationHours(activeTask.minBookingHours);
    }
  }, [activeTask]);

  // Specific rule params
  const [distanceKm, setDistanceKm] = useState<number>(6);
  const [waitingMinutes, setWaitingMinutes] = useState<number>(0);
  const [isNightRide, setIsNightRide] = useState<boolean>(false);

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
  const currentCategoryMeta = companionCategories.find((c) => c.id === activeTask.category) || companionCategories[0];

  // Calculate quote through sovereign calculation engine
  const quote = calculateSovereignTaskQuote({
    taskId: currentTaskId,
    vehicleMode,
    hours: durationHours,
    distanceKm: (activeTask.hasFourKmFreeRule || activeTask.isRideService) ? distanceKm : 0,
    waitingMinutes: activeTask.hasWaitingChargeRule ? waitingMinutes : 0,
    isNightRide,
    workerCount
  });

  const handleSelectTask = (taskId: SovereignTaskServiceId) => {
    setCurrentTaskId(taskId);
    if (onTaskIdChange) onTaskIdChange(taskId);
    const targetTask = SOVEREIGN_TASK_SERVICES.find(t => t.id === taskId);
    if (targetTask) {
      onCategoryChange(targetTask.category);
      if (targetTask.minBookingHours > durationHours) {
        setDurationHours(targetTask.minBookingHours);
      }
      if (targetTask.isRideService) {
        setVehicleMode('with_bike');
      }
    }
  };

  const handleToggleVehicleMode = (mode: CompanionVehicleMode) => {
    setVehicleMode(mode);
    if (onVehicleModeChange) onVehicleModeChange(mode);
  };

  // Set prompt in requirement box
  const applyRequirementPrompt = (promptText: string) => {
    setRequirements((prev) => {
      if (!prev) return promptText;
      return `${prev}, ${promptText}`;
    });

    if (promptText.toLowerCase().includes('female') || promptText.toLowerCase().includes('महिला')) {
      setGenderPreference('female');
    } else if (promptText.toLowerCase().includes('boys') || promptText.toLowerCase().includes('male')) {
      setGenderPreference('male');
    }

    if (promptText.includes('2 boys') || promptText.includes('2 girls') || promptText.includes('2 साथी')) {
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
      category: activeTask.category,
      subServiceId: selectedSubServiceId,
      serviceTaskId: currentTaskId,
      vehicleMode,
      distanceKm: (activeTask.hasFourKmFreeRule || activeTask.isRideService) ? distanceKm : 0,
      distanceCharge: quote.distanceCharge,
      waitingMinutes: activeTask.hasWaitingChargeRule ? waitingMinutes : 0,
      waitingCharge: quote.waitingCharge,
      isNightRide,
      selectedDate,
      startTime,
      durationHours: activeTask.isRideService ? 1 : durationHours,
      requirements: requirements || `Need verified companion for ${activeTask.name[lang] || activeTask.name.hi}`,
      genderPreference,
      workerCount,
      address,
      landmark,
      city,
      pincode,
      userPhone,
      emergencyContact,
      hourlyRate: quote.baseHourlyRate,
      totalEstimatedAmount: quote.grandTotal,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. EIGHT SOVEREIGN TASKS HORIZONTAL PICKER */}
      <div className="bg-[#07132B] p-4 rounded-3xl border-2 border-[#FFD700]/30 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
            <span>1. कार्य का प्रकार चुनें (Select Task 1 to 8):</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">
            8 Official Sovereign Tasks • Guaranteed Tariffs
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SOVEREIGN_TASK_SERVICES.map((task) => {
            const isTaskSelected = currentTaskId === task.id;
            return (
              <button
                type="button"
                key={task.id}
                onClick={() => handleSelectTask(task.id)}
                className={`p-3 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
                  isTaskSelected
                    ? 'bg-gradient-to-br from-amber-500/20 via-black to-[#0A1D3D] border-[#FFD700] ring-2 ring-[#FFD700]/40 shadow-lg'
                    : 'bg-black/40 hover:bg-black/70 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{task.icon}</span>
                  <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${
                    isTaskSelected ? 'bg-[#FFD700] text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{task.taskNumber}
                  </span>
                </div>

                <div>
                  <div className={`text-xs font-black truncate ${isTaskSelected ? 'text-white' : 'text-slate-200'}`}>
                    {task.name[lang] || task.name.hi}
                  </div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold mt-0.5">
                    {task.isRideService ? (
                      'Base ₹30 + ₹10/KM'
                    ) : (
                      <>
                        ₹{vehicleMode === 'with_bike' ? task.withBikeRatePerHour : (task.withoutBikeRatePerHour || 120)}/hr
                      </>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">
                    Min: {task.minBookingHours > 0 ? `${task.minBookingHours}h` : 'Instant'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. VEHICLE MODE TOGGLE: WITHOUT BIKE VS WITH BIKE */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#091B3A] via-[#061226] to-black border border-slate-700 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <span>2. साथी का माध्यम चुनें (Companion Mode):</span>
          </label>
          <span className="text-[11px] text-amber-400 font-bold">
            {vehicleMode === 'with_bike' ? '🏍️ बाइक राइड सुविधा उपलब्ध' : '🚶‍♂️ पैदल / लोकल बस / ऑटो'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={activeTask.isRideService}
            onClick={() => handleToggleVehicleMode('without_bike')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 ${
              vehicleMode === 'without_bike' && !activeTask.isRideService
                ? 'bg-white text-slate-950 border-white shadow-lg'
                : activeTask.isRideService
                ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-black/50 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-xs sm:text-sm">
                🚶‍♂️ बिना बाइक वाला साथी
              </div>
              <div className="text-[11px] mt-0.5 leading-snug">
                पैदल, सरकारी बस या अस्पताल/बैंक वार्ड में साथ रहने हेतु।
              </div>
              <div className="font-mono text-xs font-bold mt-1 text-blue-700">
                दर: ₹{activeTask.withoutBikeRatePerHour || 120}/hour
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleToggleVehicleMode('with_bike')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 ${
              vehicleMode === 'with_bike'
                ? 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 border-[#FFD700] shadow-lg font-black'
                : 'bg-black/50 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="p-2 rounded-xl bg-amber-900/40 text-amber-950">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                <span>🏍️ बाइक वाला साथी (+ राइड सुविधा)</span>
                {activeTask.hasFourKmFreeRule && (
                  <span className="px-1.5 py-0.2 rounded bg-black/80 text-emerald-300 text-[9px] font-mono">
                    0-4 KM FREE
                  </span>
                )}
              </div>
              <div className="text-[11px] mt-0.5 leading-snug">
                दुकान, मंदिर, बाजार या आपको पीछे बिठाकर सुरक्षित गंतव्य तक ले जाने हेतु।
              </div>
              <div className="font-mono text-xs font-black mt-1">
                {activeTask.isRideService ? 'Base ₹30 + ₹10/KM' : `दर: ₹${activeTask.withBikeRatePerHour}/hour`}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Main 2-Column Form & Pricing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Controls & Dynamic Rule Parameters */}
        <div className="lg:col-span-2 space-y-6">

          {/* DYNAMIC RULE 1 SECTION: 4 KM Free Rule for Bike on Tasks 4, 5, 6 OR Task 8 */}
          {(activeTask.hasFourKmFreeRule && vehicleMode === 'with_bike') || activeTask.isRideService ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#061F17] via-[#041410] to-black border-2 border-emerald-500/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <Gift className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>4 KM FREE RULE (बाइक राइड किलोमीटर गणना)</span>
                    </h4>
                    <p className="text-[11px] text-emerald-400 font-medium">
                      पहले 4 KM का कोई पैसा नहीं! 4 KM के बाद ₹10/KM देय होगा।
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-black text-xs border border-emerald-500/40">
                  {distanceKm} KM RIDE
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">अनुमानित यात्रा दूरी (Ride Distance):</span>
                  <span className="font-mono text-white font-bold">{distanceKm} KM</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                
                {/* Visual calculation display */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-black/60 border border-emerald-500/20">
                    <div className="text-[10px] text-slate-400">कुल दूरी</div>
                    <div className="font-bold text-white mt-0.5">{distanceKm} KM</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40">
                    <div className="text-[10px] text-emerald-300 font-bold">पहले 0-4 KM</div>
                    <div className="font-black text-emerald-400 mt-0.5">₹0 (FREE)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/60 border border-emerald-500/20">
                    <div className="text-[10px] text-slate-400">4 KM के बाद</div>
                    <div className="font-bold text-amber-400 mt-0.5">
                      ₹{Math.max(0, distanceKm - 4) * 10}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* DYNAMIC RULE 2 SECTION: Waiting Charge for Hospital (Task 2) & Bank (Task 3) */}
          {activeTask.hasWaitingChargeRule ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1C0F2B] via-[#10071C] to-black border-2 border-purple-500/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    <Timer className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>WAITING CHARGE RULE (अस्पताल/बैंक कतार सुरक्षा)</span>
                    </h4>
                    <p className="text-[11px] text-purple-300 font-medium">
                      पहला 1 घंटा (60 मिनट) बिल्कुल मुफ्त शामिल। 1 घंटे के बाद हर 30 मिनट का ₹50 अतिरिक्त।
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-black text-xs border border-purple-500/40">
                  {waitingMinutes} Mins Wait
                </span>
              </div>

              {/* Waiting selection buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                {[
                  { mins: 0, label: '0 min (Normal)', fee: '₹0' },
                  { mins: 60, label: '60 min (1 hr)', fee: '₹0 शामिल' },
                  { mins: 90, label: '90 min (1.5 hr)', fee: '+₹50' },
                  { mins: 120, label: '120 min (2 hr)', fee: '+₹100' },
                  { mins: 150, label: '150 min (2.5 hr)', fee: '+₹150' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.mins}
                    onClick={() => setWaitingMinutes(item.mins)}
                    className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                      waitingMinutes === item.mins
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md font-bold'
                        : 'bg-black/50 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] font-mono mt-0.5 text-purple-300">{item.fee}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* DYNAMIC RULE 3 SECTION: Night Ride Mode Toggle for Task 8 */}
          {activeTask.isRideService ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1C1605] via-[#120D02] to-black border-2 border-amber-500/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <Moon className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>NIGHT RIDE TARIFF (दिन vs रात दर)</span>
                    </h4>
                    <p className="text-[11px] text-amber-300 font-medium">
                      दिन: Base ₹30 + ₹10/KM | रात (9pm-6am): Base ₹30 + ₹12/KM
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsNightRide(false)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    !isNightRide
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                      : 'bg-black/50 text-slate-300 border-slate-700'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-900" />
                  <div>
                    <div className="text-xs font-black">दिन की राइड (Day Ride)</div>
                    <div className="text-[10px] font-mono">₹10/KM (6:00 AM - 9:00 PM)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNightRide(true)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    isNightRide
                      ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400 shadow-md'
                      : 'bg-black/50 text-slate-300 border-slate-700'
                  }`}
                >
                  <Moon className="w-4 h-4 text-cyan-950" />
                  <div>
                    <div className="text-xs font-black">रात की राइड (Night Ride)</div>
                    <div className="text-[10px] font-mono">₹12/KM (9:00 PM - 6:00 AM)</div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {/* Date, Time & Hourly Duration Engine (For Non-Ride Services) */}
          {!activeTask.isRideService && (
            <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>3. दिनांक एवं समय अवधि (Hourly Duration):</span>
                </label>
                <span className="text-[11px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  न्यूनतम बुकिंग: {activeTask.minBookingHours} घंटे अनिवार्य
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

                {/* Quick duration buttons conforming to minimum */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {[1, 2, 3, 4, 6, 8, 12].map((hr) => {
                    const isDisabled = hr < activeTask.minBookingHours;
                    return (
                      <button
                        type="button"
                        key={hr}
                        disabled={isDisabled}
                        onClick={() => setDurationHours(hr)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                          durationHours === hr
                            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                            : isDisabled
                            ? 'opacity-30 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600'
                            : 'bg-black/40 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {hr}h {isDisabled ? '(Min required)' : ''}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="range"
                  min={activeTask.minBookingHours}
                  max="12"
                  step="1"
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>{activeTask.minBookingHours} Hours (Min)</span>
                  <span>4 Hours (OPD/Event)</span>
                  <span>8 Hours (Shift)</span>
                  <span>12 Hours (Overnight)</span>
                </div>
              </div>
            </div>
          )}

          {/* Specific Requirements & Quick Prompt Pills */}
          <div className="p-5 rounded-2xl bg-[#06142E]/90 border border-slate-700/70 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>4. विशिष्ट आवश्यकताएं (Specific Requirements):</span>
              </label>
              <span className="text-[10px] text-slate-400">Click chips to auto-fill</span>
            </div>

            {/* Quick Prompt Chips */}
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
                placeholder="उदा. अस्पताल वार्ड में 2 घंटे बैठना है व दवा की पर्ची लानी है; या बैंक में सीनियर सिटीजन के साथ फॉर्म भरवाना है..."
                className="w-full bg-black/60 border border-slate-600 rounded-xl p-3 text-white text-xs placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Gender Preference & Companion Count */}
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
                <span>5. कार्य स्थान व संपर्क (Location & Safety Contacts):</span>
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
                  placeholder="उदा. हमीदिया अस्पताल, मेडिसिन वार्ड 4, कमरा 12 या एमपी नगर जोन 1"
                  className="w-full bg-black/60 border border-slate-600 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">लैंडमार्क (Landmark):</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="उदा. ब्लड बैंक के पास / गेट नं. 2"
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

        {/* Right 1 Col: Transparent Tariff Card with Strict 3 Rules & Match Confirmation */}
        <div className="space-y-5">
          <div className="sticky top-24 rounded-3xl bg-gradient-to-b from-[#091733] to-[#040B18] border-2 border-[#FFD700]/50 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD700]">
                  OFFICIAL TARIFF CARD
                </span>
                <h4 className="text-base font-black text-white">मूल्य एवं नियम ब्रेकडाउन</h4>
              </div>
              <Calculator className="w-5 h-5 text-[#FFD700]" />
            </div>

            {/* Selected Task & Vehicle Mode Pill */}
            <div className="p-3 rounded-2xl bg-black/60 border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">चयनित सेवा व माध्यम:</div>
              <div className="flex items-center justify-between">
                <div className="font-black text-white text-xs flex items-center gap-1.5">
                  <span>{activeTask.icon}</span>
                  <span className="truncate">#{activeTask.taskNumber} {activeTask.name[lang] || activeTask.name.hi}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  vehicleMode === 'with_bike' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {vehicleMode === 'with_bike' ? '🏍️ बाइक' : '🚶 बिना बाइक'}
                </span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 py-3 border-y border-slate-800 text-xs">
              {/* Base Fare */}
              <div className="flex items-center justify-between text-slate-300">
                <span>
                  बेस दर (₹{quote.baseHourlyRate}/hr × {quote.effectiveHours}h):
                </span>
                <span className="font-mono font-bold text-white">₹{quote.baseHourlyTotal}</span>
              </div>

              {/* 4 KM Free Bike Ride Charge */}
              {activeTask.hasFourKmFreeRule && vehicleMode === 'with_bike' && (
                <div className="flex items-center justify-between text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-emerald-400" />
                    <span>बाइक राइड ({distanceKm} KM - 4 KM Free):</span>
                  </span>
                  <span className="font-mono font-bold">
                    ₹{quote.distanceCharge} {quote.fourKmDiscount > 0 && `(बचत ₹${quote.fourKmDiscount})`}
                  </span>
                </div>
              )}

              {/* Pure Ride Charge for Task 8 */}
              {activeTask.isRideService && (
                <div className="flex items-center justify-between text-amber-300">
                  <span>राइड चार्ज ({distanceKm} KM @ {isNightRide ? '₹12' : '₹10'}/KM):</span>
                  <span className="font-mono font-bold">₹{quote.distanceCharge}</span>
                </div>
              )}

              {/* Waiting Charge for Tasks 2, 3 */}
              {activeTask.hasWaitingChargeRule && waitingMinutes > 0 && (
                <div className="flex items-center justify-between text-purple-300">
                  <span className="flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    <span>कतार वेटिंग ({waitingMinutes}m):</span>
                  </span>
                  <span className="font-mono font-bold">
                    {quote.waitingCharge > 0 ? `+₹${quote.waitingCharge}` : '₹0 (शामिल)'}
                  </span>
                </div>
              )}

              {/* Safety Fee */}
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>सोवरेन सुरक्षा व ₹2L बीमा:</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">₹{quote.safetyInsuranceFee}</span>
              </div>

              {/* GST Tax */}
              <div className="flex items-center justify-between text-slate-400">
                <span>जीएसटी (5% टैक्स):</span>
                <span className="font-mono">₹{quote.gstTax}</span>
              </div>
            </div>

            {/* Total Estimated Cost */}
            <div className="py-2 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-bold">कुल भुगतान राशि</div>
                <div className="text-[10px] text-emerald-400">100% Zero Commission</div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-amber-400 font-mono">
                  ₹{quote.grandTotal}
                </div>
                <div className="text-[10px] text-slate-400">कार्य पूर्ण होने पर OTP उपरांत दें</div>
              </div>
            </div>

            {/* Sovereign Verification Badges */}
            <div className="p-3 rounded-xl bg-black/50 border border-emerald-500/30 text-[11px] text-slate-300 space-y-1 mb-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% पुलिस व आधार वेरिफाइड</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                सभी साथी अपराध-मुक्त चरित्र सत्यापन व आधार बायोमेट्रिक से सत्यापित हैं। 0% बिचौलिया कमीशन।
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
            <p className="text-[10px] text-center text-slate-400 mt-1">
              Next Step: View verified companion profiles, ratings & live ETA
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
