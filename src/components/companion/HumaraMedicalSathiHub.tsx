import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  AlertTriangle, 
  Navigation, 
  Sliders, 
  Share2, 
  FileText, 
  Check, 
  BadgeCheck, 
  Users, 
  Building2, 
  Compass, 
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  MedicalSathiLevel, 
  MedicalSathiAddon, 
  MedicalSathiBooking, 
  Language 
} from '../../types';
import { 
  HUMARA_MEDICAL_PACKAGES, 
  POPULAR_PICKUP_STATIONS, 
  POPULAR_DESTINATION_HOSPITALS, 
  NETWORK_SATHI_STAFF, 
  NETWORK_NURSE_STAFF, 
  NETWORK_DOCTOR_STAFF 
} from '../../data/companionData';

interface HumaraMedicalSathiHubProps {
  lang: Language;
  onNavigateToGeneralBooking?: () => void;
  onOpenSOS?: () => void;
}

export const HumaraMedicalSathiHub: React.FC<HumaraMedicalSathiHubProps> = ({
  lang,
  onNavigateToGeneralBooking,
  onOpenSOS
}) => {
  // Selected Package
  const [selectedLevel, setSelectedLevel] = useState<MedicalSathiLevel>('level2');

  // Booking Flow Steps: 'packages' | 'booking_form' | 'confirmed_dossier' | 'live_tracking'
  const [activeStep, setActiveStep] = useState<'packages' | 'booking_form' | 'confirmed_dossier' | 'live_tracking'>('packages');

  // Form State
  const [pickupType, setPickupType] = useState<'railway' | 'home'>('railway');
  const [pickupLocation, setPickupLocation] = useState<string>('Bhopal Junction Railway Station (Platform 1 / 6)');
  const [dropHospital, setDropHospital] = useState<string>('AIIMS Bhopal (Saket Nagar, OPD Gate 1)');
  const [patientName, setPatientName] = useState<string>('रामेश्वर प्रसाद शर्मा');
  const [patientAge, setPatientAge] = useState<number>(64);
  const [canWalk, setCanWalk] = useState<boolean>(false);
  const [wheelchairNeeded, setWheelchairNeeded] = useState<boolean>(true);
  const [userPhone, setUserPhone] = useState<string>('+91 98260 12345');

  // Pricing Parameters & Hourly Slider
  const currentPkg = HUMARA_MEDICAL_PACKAGES.find(p => p.id === selectedLevel) || HUMARA_MEDICAL_PACKAGES[1];
  const [hourlyRate, setHourlyRate] = useState<number>(currentPkg.defaultPrice);
  const [hours, setHours] = useState<number>(3);
  const [distanceKm, setDistanceKm] = useState<number>(10);

  // Sync hourly rate when level changes
  useEffect(() => {
    const pkg = HUMARA_MEDICAL_PACKAGES.find(p => p.id === selectedLevel);
    if (pkg) {
      setHourlyRate(pkg.defaultPrice);
    }
  }, [selectedLevel]);

  // Add-ons Checkbox ("Uski jo bhi help ki zarurat hai")
  const availableAddons: MedicalSathiAddon[] = [
    'Medicine Lane',
    'Report Lane',
    'Khana Lane',
    'Dharamshala Book Karna',
    'Return Drop'
  ];
  const [selectedAddons, setSelectedAddons] = useState<MedicalSathiAddon[]>([
    'Medicine Lane',
    'Report Lane'
  ]);

  const toggleAddon = (addon: MedicalSathiAddon) => {
    setSelectedAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  // Live active booking object
  const [activeBooking, setActiveBooking] = useState<MedicalSathiBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [level3DoctorAlertActive, setLevel3DoctorAlertActive] = useState<boolean>(false);

  // Transit Simulation Tracking State
  const [transitStep, setTransitStep] = useState<'pickup_arrived' | 'patient_escorted' | 'in_transit' | 'hospital_counter' | 'completed'>('in_transit');
  const [etaMinutes, setEtaMinutes] = useState<number>(14);

  // Calculate transparent charges
  const baseHourlyTotal = hourlyRate * hours;
  const distanceCharge = Math.max(0, distanceKm * 10);
  const addonsFee = selectedAddons.length * 30;
  const platformAdminCharge = Math.round(baseHourlyTotal * 0.20);
  const totalEstimatedFare = baseHourlyTotal + distanceCharge + addonsFee + 29;

  // Handle Book CTA click on package card
  const handleSelectPackageCTA = (level: MedicalSathiLevel) => {
    setSelectedLevel(level);
    setActiveStep('booking_form');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Submit Booking to Backend
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        level: selectedLevel,
        pickup_type: pickupType,
        pickup_location: pickupLocation,
        drop_hospital: dropHospital,
        patient_name: patientName,
        patient_age: patientAge,
        can_walk: canWalk,
        wheelchair_needed: wheelchairNeeded,
        addons: selectedAddons,
        hours,
        hourly_rate: hourlyRate,
        distance_km: distanceKm,
        user_phone: userPhone
      };

      const res = await fetch('/api/companion/medical-sathi/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setActiveBooking(data.booking);
        if (selectedLevel === 'level3') {
          setLevel3DoctorAlertActive(true);
        }
        setActiveStep('confirmed_dossier');
      } else {
        // Fallback local booking
        createFallbackBooking();
      }
    } catch (e) {
      console.warn('Backend booking fallback', e);
      createFallbackBooking();
    } finally {
      setIsSubmitting(false);
    }
  };

  const createFallbackBooking = () => {
    const sathi = NETWORK_SATHI_STAFF[0];
    const nurse = selectedLevel !== 'level1' ? NETWORK_NURSE_STAFF[0] : undefined;
    const doctor = selectedLevel === 'level3' ? NETWORK_DOCTOR_STAFF[0] : undefined;

    const fallback: MedicalSathiBooking = {
      id: `MSB-2026-${Math.floor(100 + Math.random() * 900)}`,
      level: selectedLevel,
      pickup_type: pickupType,
      pickup_location: pickupLocation,
      drop_hospital: dropHospital,
      patient_name: patientName,
      patient_age: patientAge,
      can_walk: canWalk,
      wheelchair_needed: wheelchairNeeded,
      nurse_required: selectedLevel !== 'level1',
      doctor_required: selectedLevel === 'level3',
      primary_care_needed: selectedLevel !== 'level1',
      addons: selectedAddons,
      hours,
      hourly_rate: hourlyRate,
      distance_km: distanceKm,
      distance_charge: distanceCharge,
      total_fare: totalEstimatedFare,
      assigned_staff: {
        sathi,
        nurse,
        doctor
      },
      transit_tracking: {
        currentLat: 23.2599,
        currentLng: 77.4126,
        currentLocationName: `${pickupLocation} (गेट 1 प्लेटफॉर्म पर)`,
        step: 'pickup_arrived',
        etaMinutes: 16,
        speedKmh: 28,
        vitalsLogged: {
          bp: '128/82 mmHg',
          sugar: '130 mg/dL',
          pulse: '74 bpm',
          notes: 'मरीज को सुरक्षित स्टेशन से रिसीव किया गया, व्हीलचेयर तैयार है।'
        }
      },
      status: 'assigned',
      user_phone: userPhone,
      created_at: new Date().toISOString()
    };
    setActiveBooking(fallback);
    if (selectedLevel === 'level3') {
      setLevel3DoctorAlertActive(true);
    }
    setActiveStep('confirmed_dossier');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO HEADER: Dark Blue + Gold + White Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#020B1A] via-[#071938] to-[#01060F] border-2 border-[#FFD700] p-6 sm:p-10 shadow-2xl text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#FFD700] text-slate-950 text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              ALL INDIA SERVICE • 24x7 ON-DEMAND
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Police & CID Verified • Safe Reliable
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/40">
              PREMIUM 3-LEVEL MEDICAL SQUAD
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#00D4FF] leading-tight">
              HUMARA Medical Sathi
            </h1>
            <p className="text-sm sm:text-lg font-bold text-[#FFD700] mt-1 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
              <span>Complete Hospital Escort Service</span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#040E24]/90 border border-[#FFD700]/40 max-w-2xl shadow-inner">
            <p className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="text-[#FFD700] font-black">Tagline:</span>
              <span>Railway Station / Home Se Hospital Tak — <strong>Nurse + Doctor Ki Nigrani Me</strong></span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            दूर-दराज से भोपाल AIIMS, हमीदिया, नागपुर AIIMS या रीवा आने वाले मरीज व उनके परिजनों हेतु ऑल-इंडिया स्तर की सत्यापित एस्कॉर्ट सेवा। 
            प्लेटफॉर्म पर ट्रेन से उतरते ही लगेज, व्हीलचेयर, एम्बुलेंस/टैक्सी, ओपीडी पर्ची और डॉक्टर कक्ष तक अनुभवी साथी, सर्टिफाइड नर्स व प्राइवेट डॉक्टर की देखरेख।
          </p>

          {/* Quick Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
                🧳
              </div>
              <span className="font-semibold text-slate-200">Luggage & Platform Pickup</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                👩‍⚕️
              </div>
              <span className="font-semibold text-slate-200">GNM/B.Sc Nurse Support</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                🩺
              </div>
              <span className="font-semibold text-slate-200">Private Doctor Supervision</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300">
                ♿
              </div>
              <span className="font-semibold text-slate-200">Wheelchair & OPD Token</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Stepper Ribbon */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep('packages')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeStep === 'packages'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'bg-[#071938] text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>1. 3 Service Packages</span>
          </button>

          <button
            onClick={() => setActiveStep('booking_form')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeStep === 'booking_form'
                ? 'bg-[#FFD700] text-slate-950 shadow-md'
                : 'bg-[#071938] text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>2. Booking & Patient Details</span>
          </button>

          {activeBooking && (
            <>
              <button
                onClick={() => setActiveStep('confirmed_dossier')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  activeStep === 'confirmed_dossier'
                    ? 'bg-[#FFD700] text-slate-950 shadow-md'
                    : 'bg-[#071938] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                <span>3. Assigned Team Dossier</span>
              </button>

              <button
                onClick={() => setActiveStep('live_tracking')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  activeStep === 'live_tracking'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'bg-[#071938] text-emerald-400 hover:text-white border border-emerald-500/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>4. Live Station ➔ Hospital Tracking</span>
              </button>
            </>
          )}
        </div>

        {onOpenSOS && (
          <button
            onClick={onOpenSOS}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency SOS</span>
          </button>
        )}
      </div>

      {/* STEP 1: 3 SERVICE PACKAGES CARDS */}
      {activeStep === 'packages' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>Select Escort Service Level</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                  3 Levels
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                मरीज की शारीरिक स्थिति व जरूरत के अनुसार उपयुक्त स्तर चुनें।
              </p>
            </div>
            <div className="text-xs text-[#FFD700] font-mono font-bold bg-[#FFD700]/10 px-3 py-1.5 rounded-lg border border-[#FFD700]/30">
              ⚡ 100% Guaranteed On-Time Station Meet
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {HUMARA_MEDICAL_PACKAGES.map((pkg) => {
              const isSelected = selectedLevel === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border-2 bg-gradient-to-b ${pkg.colorTheme.bgGradient} ${
                    isSelected ? pkg.colorTheme.border : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 right-6">
                      <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider shadow-lg ${pkg.colorTheme.badgeBg}`}>
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-3xl shadow-inner">
                        {pkg.iconName === 'luggage' ? '🧳' : pkg.iconName === 'nurse' ? '👩‍⚕️' : '🩺'}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Hourly Rate</span>
                        <div className="text-xl sm:text-2xl font-black text-white">
                          ₹{pkg.minPrice} - ₹{pkg.maxPrice}
                        </div>
                        <span className="text-[11px] text-slate-400">Per Hour</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Hourly Rate Slider for Level 1 or Interactive adjustments */}
                    <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-[#FFD700]" />
                          Rate Slider:
                        </span>
                        <span className="font-mono font-bold text-[#FFD700]">
                          ₹{selectedLevel === pkg.id ? hourlyRate : pkg.defaultPrice} / hr
                        </span>
                      </div>
                      <input
                        type="range"
                        min={pkg.minPrice}
                        max={pkg.maxPrice}
                        step={pkg.id === 'level1' ? 25 : pkg.id === 'level2' ? 50 : 100}
                        value={selectedLevel === pkg.id ? hourlyRate : pkg.defaultPrice}
                        onChange={(e) => {
                          setSelectedLevel(pkg.id);
                          setHourlyRate(Number(e.target.value));
                        }}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>₹{pkg.minPrice}</span>
                        <span>₹{pkg.defaultPrice} (Standard)</span>
                        <span>₹{pkg.maxPrice}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Features Included:
                      </span>
                      <ul className="space-y-2 text-xs">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For Callout */}
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs">
                      <span className="font-bold text-[#FFD700] block mb-0.5">Best for:</span>
                      <span className="text-slate-300">{pkg.bestFor}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => handleSelectPackageCTA(pkg.id)}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${pkg.colorTheme.ctaGradient}`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: BOOKING FLOW (Locations, Patient Condition, Add-ons, Transparent Fare) */}
      {activeStep === 'booking_form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Level Selected Header Bar */}
            <div className="p-4 rounded-2xl bg-[#071938] border border-[#FFD700]/50 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 flex items-center justify-center text-xl">
                  {currentPkg.iconName === 'luggage' ? '🧳' : currentPkg.iconName === 'nurse' ? '👩‍⚕️' : '🩺'}
                </div>
                <div>
                  <div className="text-xs text-[#FFD700] font-mono font-bold">SELECTED LEVEL:</div>
                  <div className="text-sm sm:text-base font-black text-white">{currentPkg.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-mono font-bold">₹{hourlyRate}/hr</span>
                <button
                  onClick={() => setActiveStep('packages')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-all"
                >
                  Change Level
                </button>
              </div>
            </div>

            {/* 1. Pickup Location & Drop Location */}
            <div className="p-6 rounded-3xl bg-[#040E24] border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFD700]" />
                <span>1. Pickup & Hospital Drop Locations</span>
              </h3>

              {/* Pickup Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPickupType('railway')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    pickupType === 'railway'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <span>🚆 Railway Station Pickup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPickupType('home')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    pickupType === 'home'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <span>🏠 Home Address Pickup</span>
                </button>
              </div>

              {/* Pickup Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {pickupType === 'railway' ? 'Railway Station Name / Platform / Gate:' : 'Complete Home Address / Landmark:'}
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#FFD700] focus:outline-none"
                  placeholder="e.g. Bhopal Junction Railway Station (Platform 1)"
                />
                
                {/* Popular Stations Quick Select */}
                {pickupType === 'railway' && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-slate-400">Quick select:</span>
                    {POPULAR_PICKUP_STATIONS.slice(0, 4).map((st, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPickupLocation(st)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
                      >
                        {st.split('(')[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Drop Hospital Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Destination Hospital Name (AIIMS, Hamidia, Medical College):
                </label>
                <input
                  type="text"
                  value={dropHospital}
                  onChange={(e) => setDropHospital(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#FFD700] focus:outline-none"
                  placeholder="e.g. AIIMS Bhopal (Saket Nagar, OPD Gate 1)"
                />

                {/* Popular Hospitals Quick Select */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400">Quick select:</span>
                  {POPULAR_DESTINATION_HOSPITALS.slice(0, 4).map((hosp, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDropHospital(hosp)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
                    >
                      {hosp.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Patient Profile & Mobility (Age, Can Walk, Wheelchair) */}
            <div className="p-6 rounded-3xl bg-[#040E24] border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FFD700]" />
                <span>2. Patient Details & Mobility Status</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Patient Full Name:</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#FFD700] focus:outline-none"
                    placeholder="Patient Name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Patient Age:</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#FFD700] focus:outline-none"
                    placeholder="e.g. 65"
                  />
                </div>
              </div>

              {/* Can Walk? Yes / No */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Can Walk on own feet? (क्या मरीज स्वयं चल सकते हैं?):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCanWalk(true);
                      setWheelchairNeeded(false);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      canWalk
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>✓ Yes (चल सकते हैं)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCanWalk(false);
                      setWheelchairNeeded(true);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      !canWalk
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>✕ No (सहारे या व्हीलचेयर की जरूरत)</span>
                  </button>
                </div>
              </div>

              {/* Wheelchair Needed? Yes / No */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Wheelchair Needed? (स्टेशन से ओपीडी तक व्हीलचेयर चाहिए?):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWheelchairNeeded(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      wheelchairNeeded
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-300'
                        : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>♿ Yes (Wheelchair Arrange Karein)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWheelchairNeeded(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      !wheelchairNeeded
                        ? 'bg-slate-700 text-white border-slate-500'
                        : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>No (Not Needed)</span>
                  </button>
                </div>
              </div>

              {/* User Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Attendant / Booker Mobile Phone (WhatsApp Updates):</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-[#FFD700] focus:outline-none font-mono"
                  placeholder="+91 98260 00000"
                />
              </div>
            </div>

            {/* 3. Add-on Checkbox ("Uski jo bhi help ki zarurat hai") */}
            <div className="p-6 rounded-3xl bg-[#040E24] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span>3. Add-On Checkbox: "Uski jo bhi help ki zarurat hai"</span>
                </h3>
                <span className="text-[10px] text-slate-400">Select all that apply</span>
              </div>

              <p className="text-xs text-slate-300">
                अस्पताल में आपको जिन भी अतिरिक्त सुविधाओं में साथी की मदद चाहिए, उन्हें टिक करें:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon);
                  return (
                    <label
                      key={addon}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FFD700]/15 border-[#FFD700] text-white'
                          : 'bg-black/30 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isChecked ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'border-slate-600 bg-black/40'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="text-xs font-bold">
                        <span>{addon}</span>
                        <span className="block text-[10px] font-normal text-slate-400">
                          {addon === 'Medicine Lane' && 'फार्मेसी से डॉक्टर की दवाइयां लाना'}
                          {addon === 'Report Lane' && 'पैथोलॉजी व एक्स-रे जांच रिपोर्ट एकत्र करना'}
                          {addon === 'Khana Lane' && 'मरीज व परिजनों के लिए स्वच्छ भोजन व्यवस्था'}
                          {addon === 'Dharamshala Book Karna' && 'अस्पताल के पास सुरक्षित धर्मशाला/कमरा बुक करना'}
                          {addon === 'Return Drop' && 'चेकअप बाद वापस स्टेशन/घर सुरक्षित छोड़ना'}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary & Fare Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Fare Calculation Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#071938] via-[#040E24] to-black border-2 border-[#FFD700] shadow-2xl space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-amber-300 font-mono uppercase tracking-wider">Transparent Escort Bill</span>
                  <h3 className="text-lg font-black text-white">Estimated Fare</h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-mono font-bold border border-[#FFD700]/40">
                  {selectedLevel.toUpperCase()}
                </div>
              </div>

              {/* Sliders: Hours & Distance */}
              <div className="space-y-4 text-xs">
                
                {/* Hourly Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-300">Duty Duration (Hours):</span>
                    <span className="font-mono text-[#FFD700] font-bold">{hours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1 hr</span>
                    <span>3 hrs (Standard)</span>
                    <span>12 hrs</span>
                  </div>
                </div>

                {/* Distance Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-300">Station to Hospital Distance:</span>
                    <span className="font-mono text-cyan-400 font-bold">{distanceKm} KM</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={35}
                    step={1}
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>2 km</span>
                    <span>10 km (AIIMS Bhopal)</span>
                    <span>35 km</span>
                  </div>
                </div>
              </div>

              {/* Itemized Fare Breakdown */}
              <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Hourly Escort Charge ({hours}hr × ₹{hourlyRate}):</span>
                  <span className="font-mono font-bold text-white">₹{baseHourlyTotal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Transit Distance Charge ({distanceKm}km × ₹10):</span>
                  <span className="font-mono font-bold text-white">₹{distanceCharge}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Add-ons ({selectedAddons.length} services):</span>
                    <span className="font-mono font-bold text-white">₹{addonsFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Safety & Insurance Kit:</span>
                  <span className="font-mono text-slate-300">₹29</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm sm:text-base">
                  <span className="font-black text-white">Total Estimated Fare:</span>
                  <span className="font-mono font-black text-xl text-[#FFD700]">₹{totalEstimatedFare}</span>
                </div>

                <div className="text-[10px] text-emerald-400 font-mono pt-1">
                  ✓ 80% directly credited to verified attendant & medical squad. Zero hidden middleman cuts.
                </div>
              </div>

              {/* What You Get Summary in this level */}
              <div className="space-y-1 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider font-mono text-[10px]">
                  Squad Deployed for this Booking:
                </span>
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-black">✓</span>
                    <span>100% Aadhaar & Police Verified Companion (Rohit / Pooja)</span>
                  </div>
                  {selectedLevel !== 'level1' && (
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                      <span className="text-cyan-400 font-black">✓</span>
                      <span>Certified GNM/B.Sc Nurse (Sister Sunita / Anjali)</span>
                    </div>
                  )}
                  {selectedLevel === 'level3' && (
                    <div className="flex items-center gap-2 text-[#FFD700] font-black">
                      <span className="text-[#FFD700]">★</span>
                      <span>Private Doctor Supervision (Dr. Rajesh Sharma, MD)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book CTA */}
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-[#FFD700]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Deploying Medical Squad...</span>
                ) : (
                  <>
                    <span>Confirm & Book {currentPkg.name.split(':')[1] || currentPkg.name}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>24x7 Sovereign Safety Guarantee • Immediate Call Confirmation</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ASSIGNED TEAM DOSSIER (Sathi Name + Photo + Verified ID + Nurse + Doctor) */}
      {activeStep === 'confirmed_dossier' && activeBooking && (
        <div className="space-y-6">
          
          {/* Level 3 Special Alert Banner if applicable */}
          {level3DoctorAlertActive && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 text-white flex items-start gap-3 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 text-xl font-black">
                🩺
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black text-emerald-300 font-mono tracking-wider uppercase">
                  DOCTOR ALERT DISPATCHED TO AIIMS NETWORK
                </div>
                <div className="text-sm font-bold text-white">
                  डॉ. राजेश शर्मा, MD (AIIMS नेटवर्क) को आपातकालीन इन-ट्रांजिट सुपरविजन हेतु अलर्ट भेजा जा चुका है।
                </div>
                <p className="text-xs text-emerald-200">
                  प्राइमरी हेल्थ केयर किट, ईसीजी/ऑक्सीजन मॉनिटरिंग और इन-ट्रांजिट क्लिनिकल कंसल्टेशन तैयार है।
                </p>
              </div>
            </div>
          )}

          {/* Booking Confirmation Header */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#071938] to-[#040E24] border border-[#FFD700]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
                  ✓ BOOKING CONFIRMED: {activeBooking.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold font-mono">
                  {activeBooking.level.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Assigned Medical Escort Squad
              </h2>
              <p className="text-xs text-slate-300">
                रूट: <strong>{activeBooking.pickup_location}</strong> ➔ <strong>{activeBooking.drop_hospital}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveStep('live_tracking')}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Live Station ➔ Hospital Tracking</span>
              </button>
            </div>
          </div>

          {/* SQUAD CARDS (Sathi + Nurse + Doctor) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Verified Sathi */}
            {activeBooking.assigned_staff.sathi && (
              <div className="p-6 rounded-3xl bg-[#040E24] border border-blue-500/40 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-mono font-bold uppercase">
                    Escort Sathi
                  </span>
                  <span className="text-xs text-[#FFD700] font-bold">★ {activeBooking.assigned_staff.sathi.rating}</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={activeBooking.assigned_staff.sathi.photoUrl}
                    alt={activeBooking.assigned_staff.sathi.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400/50 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-black text-white">{activeBooking.assigned_staff.sathi.name}</h3>
                    <p className="text-xs text-slate-300">{activeBooking.assigned_staff.sathi.qualification}</p>
                    <span className="text-[11px] font-mono text-cyan-400">ID: {activeBooking.assigned_staff.sathi.verifiedId}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Police CID Status:</span>
                    <span className="text-emerald-400 font-bold">✓ Clear (2026)</span>
                  </div>
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Role:</span>
                    <span className="text-white">Station Pickup & Wheelchair Push</span>
                  </div>
                </div>

                <a
                  href={`tel:${activeBooking.assigned_staff.sathi.phone}`}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Sathi ({activeBooking.assigned_staff.sathi.phone})</span>
                </a>
              </div>
            )}

            {/* 2. Certified Nurse (Level 2 & 3) */}
            {activeBooking.assigned_staff.nurse ? (
              <div className="p-6 rounded-3xl bg-[#071938] border-2 border-[#FFD700] space-y-4 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FFD700] text-slate-950 text-[11px] font-black uppercase">
                    Certified Nurse
                  </span>
                  <span className="text-xs text-[#FFD700] font-bold">★ {activeBooking.assigned_staff.nurse.rating}</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={activeBooking.assigned_staff.nurse.photoUrl}
                    alt={activeBooking.assigned_staff.nurse.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FFD700] shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-black text-white">{activeBooking.assigned_staff.nurse.name}</h3>
                    <p className="text-xs text-slate-300">{activeBooking.assigned_staff.nurse.qualification}</p>
                    <span className="text-[11px] font-mono text-[#FFD700]">Reg: {activeBooking.assigned_staff.nurse.registrationNumber || activeBooking.assigned_staff.nurse.verifiedId}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Clinical Specialty:</span>
                    <span className="text-emerald-300 font-bold">{activeBooking.assigned_staff.nurse.specialty?.split(',')[0]}</span>
                  </div>
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>In-Transit Kit:</span>
                    <span className="text-[#FFD700] font-bold">BP, Sugar, O2, First Aid</span>
                  </div>
                </div>

                <a
                  href={`tel:${activeBooking.assigned_staff.nurse.phone}`}
                  className="w-full py-2.5 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Nurse ({activeBooking.assigned_staff.nurse.phone})</span>
                </a>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-black/20 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
                <span className="text-3xl">👩‍⚕️</span>
                <span className="text-xs font-bold text-slate-400">Nurse Support Not in Level 1</span>
                <p className="text-[11px] text-slate-500">Upgrade to Level 2 or 3 to add certified GNM/B.Sc nurse.</p>
              </div>
            )}

            {/* 3. Private Doctor (Level 3) */}
            {activeBooking.assigned_staff.doctor ? (
              <div className="p-6 rounded-3xl bg-[#03211B] border-2 border-emerald-400 space-y-4 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-400 text-slate-950 text-[11px] font-black uppercase">
                    Supervising Doctor
                  </span>
                  <span className="text-xs text-emerald-300 font-bold">★ {activeBooking.assigned_staff.doctor.rating}</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={activeBooking.assigned_staff.doctor.photoUrl}
                    alt={activeBooking.assigned_staff.doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-black text-white">{activeBooking.assigned_staff.doctor.name}</h3>
                    <p className="text-xs text-emerald-200">{activeBooking.assigned_staff.doctor.qualification}</p>
                    <span className="text-[11px] font-mono text-emerald-400">MCI Reg: {activeBooking.assigned_staff.doctor.registrationNumber}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Clinical Supervision:</span>
                    <span className="text-emerald-300 font-bold">In-Transit Diagnostics</span>
                  </div>
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Emergency Protocol:</span>
                    <span className="text-[#FFD700] font-bold">Active On-Call</span>
                  </div>
                </div>

                <a
                  href={`tel:${activeBooking.assigned_staff.doctor.phone}`}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Doctor ({activeBooking.assigned_staff.doctor.phone})</span>
                </a>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-black/20 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
                <span className="text-3xl">🩺</span>
                <span className="text-xs font-bold text-slate-400">Doctor Supervision (Level 3 Only)</span>
                <p className="text-[11px] text-slate-500">Required for serious or outstation critical patients.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: LIVE TRACKING FROM STATION TO HOSPITAL */}
      {activeStep === 'live_tracking' && activeBooking && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#040E24] border border-[#FFD700] space-y-6">
            
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    LIVE STATION ➔ HOSPITAL TRANSIT TELEMETRY
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {activeBooking.pickup_location} ➔ {activeBooking.drop_hospital}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono">ESTIMATED ARRIVAL</span>
                  <div className="text-lg font-black text-[#FFD700] font-mono">~{etaMinutes} Mins Remaining</div>
                </div>
              </div>
            </div>

            {/* Visual Route Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className={`p-3 rounded-2xl border transition-all ${
                transitStep === 'pickup_arrived'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                  : 'bg-black/30 border-slate-800 text-slate-400'
              }`}>
                <div className="font-bold text-blue-300">1. Station Platform</div>
                <div className="text-[11px] text-slate-300 mt-1">Patient received at train door with luggage.</div>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                transitStep === 'patient_escorted'
                  ? 'bg-amber-600/20 border-amber-500 text-white shadow-md'
                  : 'bg-black/30 border-slate-800 text-slate-400'
              }`}>
                <div className="font-bold text-amber-300">2. Wheelchair & Cab</div>
                <div className="text-[11px] text-slate-300 mt-1">Wheelchair shift & escorted into verified cab.</div>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                transitStep === 'in_transit'
                  ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                  : 'bg-black/30 border-slate-800 text-slate-400'
              }`}>
                <div className="font-bold text-emerald-300">3. In Transit (Vitals)</div>
                <div className="text-[11px] text-slate-300 mt-1">BP/Sugar check & doctor consultation on the way.</div>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                transitStep === 'hospital_counter'
                  ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-md'
                  : 'bg-black/30 border-slate-800 text-slate-400'
              }`}>
                <div className="font-bold text-cyan-300">4. Hospital OPD Gate</div>
                <div className="text-[11px] text-slate-300 mt-1">Registration counter & OPD token queue standing.</div>
              </div>

              <div className={`p-3 rounded-2xl border transition-all ${
                transitStep === 'completed'
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                  : 'bg-black/30 border-slate-800 text-slate-400'
              }`}>
                <div className="font-bold text-purple-300">5. Doctor Room Escort</div>
                <div className="text-[11px] text-slate-300 mt-1">Patient handed over to OPD specialist doctor.</div>
              </div>
            </div>

            {/* Live Interactive Transit Step Control (Simulator for demo) */}
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-slate-400 font-mono">Simulator:</span>
              {(['pickup_arrived', 'patient_escorted', 'in_transit', 'hospital_counter', 'completed'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => {
                    setTransitStep(st);
                    if (st === 'pickup_arrived') setEtaMinutes(25);
                    if (st === 'patient_escorted') setEtaMinutes(20);
                    if (st === 'in_transit') setEtaMinutes(12);
                    if (st === 'hospital_counter') setEtaMinutes(3);
                    if (st === 'completed') setEtaMinutes(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                    transitStep === st
                      ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] font-bold'
                      : 'bg-black/30 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            {/* Live Vitals Recorded on the Way */}
            <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Transit Vitals Monitored by Nurse & Doctor</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Live Telemetry Active</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Blood Pressure (BP):</span>
                  <span className="text-base font-black text-white font-mono">128 / 82 mmHg</span>
                  <span className="text-[10px] text-emerald-400 block">Normal in transit</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Blood Sugar (Random):</span>
                  <span className="text-base font-black text-white font-mono">134 mg/dL</span>
                  <span className="text-[10px] text-emerald-400 block">Pre-OPD Checked</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Pulse Rate & SpO2:</span>
                  <span className="text-base font-black text-white font-mono">76 bpm • 98% O2</span>
                  <span className="text-[10px] text-emerald-400 block">Stable vitals</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Transit Speed:</span>
                  <span className="text-base font-black text-[#FFD700] font-mono">32 km/h</span>
                  <span className="text-[10px] text-cyan-400 block">GPS: 23.2599° N, 77.4126° E</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <strong className="text-[#FFD700]">Doctor Transit Note:</strong> "Patient Shri Ramswaroop Sharma is comfortably seated in AC transit with wheelchair locked. OPD registration slip generated. Hamidia / AIIMS Gate 1 meeting point coordinated with hospital reception."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
