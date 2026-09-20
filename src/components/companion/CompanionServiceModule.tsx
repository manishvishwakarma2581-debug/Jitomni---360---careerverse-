import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Radio, 
  Search, 
  CheckCircle2, 
  HeartHandshake, 
  Award, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  FileText,
  Car,
  Bike,
  Bell,
  Zap
} from 'lucide-react';
import { 
  CompanionCategoryType, 
  CompanionBooking, 
  CompanionWorker, 
  BookingStatus, 
  Language,
  SovereignTaskServiceId,
  CompanionVehicleMode
} from '../../types';
import { companionCategories, verifiedCompanionWorkersPool, sovereignSafetyProtocols } from '../../data/companionData';
import { CompanionServiceSelector } from './CompanionServiceSelector';
import { CompanionBookingEngine } from './CompanionBookingEngine';
import { CompanionMatchingRadar } from './CompanionMatchingRadar';
import { CompanionLiveTrackingMap } from './CompanionLiveTrackingMap';
import { CompanionSOSModal } from './CompanionSOSModal';
import { CompanionWorkerPortal } from './CompanionWorkerPortal';
import { CompanionAdminPanel } from './CompanionAdminPanel';
import { RideTravelBookingHub } from './RideTravelBookingHub';
import { CompanionNotificationCenter } from './CompanionNotificationCenter';
import { HumaraMedicalSathiHub } from './HumaraMedicalSathiHub';
import { RewaCityLiveMap } from './RewaCityLiveMap';
import { AIDemandTaskEngine } from './AIDemandTaskEngine';
import { ServiceProviderRegistrationModal } from './ServiceProviderRegistrationModal';
import { RewaMapLocationPin, AIParsedTaskResult } from '../../types';

interface CompanionServiceModuleProps {
  lang: Language;
}

export const CompanionServiceModule: React.FC<CompanionServiceModuleProps> = ({ lang }) => {
  // Top-level Role switcher: Citizen/Customer vs Companion Worker vs Admin Panel
  const [activeRole, setActiveRole] = useState<'citizen' | 'worker' | 'admin'>('citizen');

  // Current Active Sub-View inside the Citizen Module (default to new 3-Level Medical Sathi)
  const [activeSubView, setActiveSubView] = useState<'medical_sathi' | 'rewa_map' | 'ai_demand' | 'categories' | 'rides' | 'book' | 'radar' | 'tracking' | 'safety'>('medical_sathi');
  
  // Registration Modal for local providers/vendors/sathis
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  
  // Selected Category, Task and Vehicle Mode
  const [selectedCategory, setSelectedCategory] = useState<CompanionCategoryType>('hospital_care');
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string | undefined>('hosp_female_companion');
  const [selectedTaskId, setSelectedTaskId] = useState<SovereignTaskServiceId>('hospital_sahayak');
  const [selectedVehicleMode, setSelectedVehicleMode] = useState<CompanionVehicleMode>('without_bike');

  // Active or Pending Booking Object
  const [currentBooking, setCurrentBooking] = useState<CompanionBooking>({
    id: 'JIT-CMP-84920',
    category: 'hospital_care',
    subServiceId: 'hosp_female_companion',
    selectedDate: 'Today, 24 Oct 2026',
    startTime: 'Immediate (Next 15-20 mins)',
    durationHours: 6,
    requirements: 'Need a female companion for hospital stay (night shift patient support & medicine assistance)',
    genderPreference: 'female',
    workerCount: 1,
    address: 'Bhopal Memorial Hospital & Research Centre, Ward 4 Bed 18',
    landmark: 'Karond Bypass, Near OPD Block Gate 2',
    city: 'Bhopal',
    pincode: '462038',
    userPhone: '+91 98261 99401',
    emergencyContact: '+91 94250 11892',
    status: 'en_route',
    matchedWorker: verifiedCompanionWorkersPool[0], // Pooja Vishwakarma (Gold Verified)
    hourlyRate: 199,
    baseAmount: 1194,
    safetyInsuranceFee: 29,
    taxAmount: 60,
    totalEstimatedAmount: 1283,
    startOtp: '6821',
    endOtp: '4490',
    createdAt: new Date().toISOString(),
    trackingCoordinates: {
      lat: 23.2599,
      lng: 77.4126,
      destinationLat: 23.2981,
      destinationLng: 77.4201,
      speedKmh: 24,
      batteryLevel: 94,
      updatedAt: new Date().toISOString()
    }
  });

  // Emergency SOS Modal State
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  // Activity Notifications Modal State
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(3);

  // Category Selector Handler
  const handleSelectCategory = (cat: CompanionCategoryType, subId?: string) => {
    setSelectedCategory(cat);
    if (subId) setSelectedSubServiceId(subId);
    if (cat === 'hospital_care') {
      setActiveSubView('medical_sathi');
    } else if (cat === 'ride_travel') {
      setActiveSubView('rides');
    } else {
      setActiveSubView('book');
    }
  };

  const handleQuickBook = (cat: CompanionCategoryType) => {
    setSelectedCategory(cat);
    if (cat === 'hospital_care') {
      setActiveSubView('medical_sathi');
    } else if (cat === 'ride_travel') {
      setActiveSubView('rides');
    } else {
      setActiveSubView('book');
    }
  };

  // Booking Form Submission Handler
  const handleBookingSubmit = (formData: any) => {
    const baseAmount = formData.hourlyRate * formData.durationHours * formData.workerCount;
    const safetyInsuranceFee = 29;
    const taxAmount = Math.round((formData.totalEstimatedAmount - 29) * 0.05);

    const newBooking: CompanionBooking = {
      id: `JIT-CMP-${Math.floor(10000 + Math.random() * 90000)}`,
      category: formData.category,
      subServiceId: formData.subServiceId,
      serviceTaskId: formData.serviceTaskId || selectedTaskId,
      vehicleMode: formData.vehicleMode || selectedVehicleMode,
      distanceKm: formData.distanceKm,
      distanceCharge: formData.distanceCharge,
      waitingMinutes: formData.waitingMinutes,
      waitingCharge: formData.waitingCharge,
      isNightRide: formData.isNightRide,
      selectedDate: formData.selectedDate,
      startTime: formData.startTime,
      durationHours: formData.durationHours,
      requirements: formData.requirements,
      genderPreference: formData.genderPreference,
      workerCount: formData.workerCount,
      address: formData.address,
      landmark: formData.landmark,
      city: formData.city,
      pincode: formData.pincode,
      userPhone: formData.userPhone,
      emergencyContact: formData.emergencyContact,
      status: 'searching',
      hourlyRate: formData.hourlyRate,
      baseAmount,
      safetyInsuranceFee,
      taxAmount,
      totalEstimatedAmount: formData.totalEstimatedAmount || (baseAmount + safetyInsuranceFee + taxAmount),
      startOtp: String(Math.floor(1000 + Math.random() * 9000)),
      endOtp: String(Math.floor(1000 + Math.random() * 9000)),
      createdAt: new Date().toISOString()
    };

    setCurrentBooking(newBooking);
    setActiveSubView('radar');
  };

  // Confirm Worker from Radar
  const handleConfirmCompanion = (worker: CompanionWorker) => {
    setCurrentBooking((prev) => ({
      ...prev,
      matchedWorker: worker,
      status: 'dispatched'
    }));
    setActiveSubView('tracking');
  };

  // Update Status in Live Tracking
  const handleUpdateStatus = (newStatus: BookingStatus) => {
    setCurrentBooking((prev) => ({
      ...prev,
      status: newStatus
    }));
  };

  // Direct Book from Rewa Live Map Pin
  const handleBookSathiFromMap = (sathiPin: RewaMapLocationPin) => {
    const baseWorker = verifiedCompanionWorkersPool.find((w) => w.id === sathiPin.id) || verifiedCompanionWorkersPool[0];
    const worker: CompanionWorker = {
      ...baseWorker,
      id: sathiPin.id,
      name: sathiPin.name,
      photoUrl: sathiPin.meta?.photoUrl || baseWorker.photoUrl,
      phone: sathiPin.phone,
      rating: sathiPin.rating,
      reviewsCount: sathiPin.reviewsCount,
      distanceKm: sathiPin.distanceKm || 0.8,
      etaMinutes: sathiPin.etaMinutes || 8
    };

    setCurrentBooking((prev) => ({
      ...prev,
      id: `JIT-RW-${Math.floor(10000 + Math.random() * 90000)}`,
      category: 'hospital_care',
      status: 'confirmed',
      hourlyRate: 120,
      baseAmount: 240,
      totalEstimatedAmount: 240,
      durationHours: 2,
      address: `${sathiPin.address}, Rewa`,
      matchedWorker: worker
    }));
    setActiveSubView('tracking');
  };

  // Direct Dispatch from AI Demand Engine
  const handleAIDispatchTask = (parsed: AIParsedTaskResult, worker?: CompanionWorker) => {
    const defaultWorker = verifiedCompanionWorkersPool[0];
    const assignedWorker = worker || defaultWorker;
    setCurrentBooking((prev) => ({
      ...prev,
      id: parsed.taskToken || `JIT-IND-${Math.floor(10000 + Math.random() * 90000)}`,
      requirements: parsed.taskTitle,
      durationHours: parsed.durationHours,
      hourlyRate: parsed.baseRatePerHour,
      baseAmount: parsed.baseAmount,
      totalEstimatedAmount: parsed.totalEstimatedAmount,
      address: `${parsed.location}, ${parsed.city || 'India'}`,
      status: 'confirmed',
      startOtp: parsed.deliveryOtp || '4821',
      matchedWorker: assignedWorker
    }));
    setActiveSubView('tracking');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fadeIn">
      {/* Sovereign Master Role Switcher */}
      <div className="bg-gradient-to-r from-[#040E24] via-[#071738] to-[#040E24] p-2 rounded-2xl border border-slate-700 shadow-xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 scrollbar-none w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveRole('citizen')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeRole === 'citizen'
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                : 'bg-transparent text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <span>👤 नागरिक सेवा व बुकिंग (Citizen Booking)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('worker')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeRole === 'worker'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                : 'bg-transparent text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <span>👷 साथी / श्रमिक पोर्टल (Worker Hub & 80% Wallet)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeRole === 'admin'
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                : 'bg-transparent text-slate-300 hover:text-white border-transparent'
            }`}
          >
            <span>🏛️ एडमिन कंट्रोल पैनल (Admin System & 20% Split)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Global Notification Bell Trigger */}
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="relative px-3 py-1.5 rounded-xl bg-[#0B1E3B] hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/40 shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
            title="गतिविधि सूचनाएं (Activity Notifications)"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">सूचनाएं</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-black animate-pulse">
              {unreadNotifCount}
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 text-[11px] font-mono text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sovereign Security: UIDAI + Police CID</span>
          </div>
        </div>
      </div>

      {activeRole === 'worker' ? (
        <CompanionWorkerPortal
          lang={lang}
          onNavigateToAdmin={() => setActiveRole('admin')}
        />
      ) : activeRole === 'admin' ? (
        <CompanionAdminPanel
          lang={lang}
          onNavigateToWorker={() => setActiveRole('worker')}
        />
      ) : (
        <div className="space-y-6">
          {/* ALL-INDIA 100+ CITIES & 500+ STATIONS SOVEREIGN LIVE BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-2 border-amber-500/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
            <div className="space-y-1.5 z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span>ONE APP. EVERYTHING YOU NEED. ANYTIME. ANYWHERE.</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>100+ CITIES • 500+ STATIONS LIVE</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-400/30">
                  24/7 ACTIVE & 100% VERIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-4xl">
                पूरे भारत के <strong>100+ शहरों</strong> और <strong>500+ स्टेशनों</strong> पर JITOMNI 360 की प्रीमियम ऑन-डिमांड सेवाएं अब लाइव हैं। ऐप का <strong>'Task Module'</strong> आपके हर काम को चुटकियों में आसान बनाने के लिए तैयार है—पूरी तरह सुरक्षित, वेरिफाइड और 24/7 एक्टिव।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubView('ai_demand')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 z-10"
            >
              <Zap className="w-4 h-4" />
              <span>टास्क मॉड्यूल खोलें (Instant AI Task)</span>
            </button>
          </div>

          {/* Top Navigation Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubView('medical_sathi')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              activeSubView === 'medical_sathi'
                ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/30'
                : 'bg-[#071938] text-[#FFD700] hover:text-white border-[#FFD700]/50'
            }`}
          >
            <span className="text-sm">🏥</span>
            <span>HUMARA मेडिकल साथी (3-Level Escort)</span>
            <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
              NEW
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('rewa_map')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'rewa_map'
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-black'
                : 'bg-[#07132B] text-blue-300 hover:text-white border-blue-500/40'
            }`}
          >
            <span>🗺️ रीवा लाइव मैप (Active Sathis, Cabs & Hotels)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('ai_demand')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'ai_demand'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-black'
                : 'bg-[#07132B] text-emerald-300 hover:text-white border-emerald-500/40'
            }`}
          >
            <span>⚡ AI टास्क व 8 कोर साथी (All-India 500+ Hubs • ₹100 Base)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'categories'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <span>✨ 5 सेवाएं (All Services)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('rides')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'rides'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-[#07132B] text-amber-400 hover:text-white border-amber-500/40'
            }`}
          >
            <div className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              <Bike className="w-3.5 h-3.5" />
            </div>
            <span>🚗 कार व 🏍️ बाइक राइड (0% Commission)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('book')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'book'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-md shadow-[#FFD700]/20'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <span>📝 नया साथी बुक करें (Hourly Booking)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('tracking')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'tracking'
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 animate-pulse'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>📍 लाइव ट्रैकिंग एवं SOS (Active Task)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('safety')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeSubView === 'safety'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>🛡️ पुलिस वेरिफिकेशन गारंटी (Safety Dossier)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Sathi / Vendor Register Quick Onboarding Button */}
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-[#FFD700]/20 flex items-center gap-1.5 transition-all hover:scale-105 whitespace-nowrap border border-amber-300"
          >
            <span>🤝 साथी/वेंडर बनें</span>
          </button>

          {/* Notification Quick Trigger */}
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="px-3 py-2 rounded-xl bg-[#0B1E3B] hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/40 shadow flex items-center gap-1.5 transition-all"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">गतिविधि अलर्ट</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-black">
              {unreadNotifCount}
            </span>
          </button>

          {/* Global Quick SOS Trigger Button */}
          <button
            type="button"
            onClick={() => setIsSOSModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-black text-xs border border-red-400 shadow-md shadow-red-600/40 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
            <span>SOS EMERGENCY (112)</span>
          </button>
        </div>
      </div>

      {/* VIEW 0: HUMARA MEDICAL SATHI 3-LEVEL SERVICE HUB (PREMIUM RAILWAY TO HOSPITAL ESCORT) */}
      {activeSubView === 'medical_sathi' && (
        <HumaraMedicalSathiHub
          lang={lang}
          onNavigateToGeneralBooking={() => setActiveSubView('book')}
          onOpenSOS={() => setIsSOSModalOpen(true)}
        />
      )}

      {/* VIEW: REWA CITY REAL-TIME LIVE MAP */}
      {activeSubView === 'rewa_map' && (
        <RewaCityLiveMap
          lang={lang}
          onBookSathi={handleBookSathiFromMap}
          onBookCab={() => {
            setActiveSubView('rides');
          }}
          onReserveHotel={(hotel) => {
            alert(`होटल ${hotel.name} से संपर्क साधा जा रहा है (फोन: ${hotel.phone})`);
          }}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      )}

      {/* VIEW: AI ADAPTABLE & DEMAND-DRIVEN SATHI ENGINE */}
      {activeSubView === 'ai_demand' && (
        <AIDemandTaskEngine
          lang={lang}
          onDispatchTask={handleAIDispatchTask}
          onNavigateToMap={() => setActiveSubView('rewa_map')}
        />
      )}

      {/* VIEW 1: Service Selection Screen (The 5 Categories with distinct visual anchors) */}
      {activeSubView === 'categories' && (
        <CompanionServiceSelector
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onQuickBook={handleQuickBook}
          onSelectTask={(taskId, mode) => {
            setSelectedTaskId(taskId);
            setSelectedVehicleMode(mode);
            setActiveSubView('book');
          }}
          lang={lang}
        />
      )}

      {/* VIEW: Ride & Travel Booking Hub (Car & Bike Ride - 0% Commission) */}
      {activeSubView === 'rides' && (
        <RideTravelBookingHub
          lang={lang}
          onOpenSOSModal={() => setIsSOSModalOpen(true)}
        />
      )}

      {/* VIEW 2: Booking Engine (Date, Hourly Basis, Requirements, Location, Tariff) */}
      {activeSubView === 'book' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>साथी बुकिंग एवं आवश्यकता विनिर्देश</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                Hourly Booking Engine
              </span>
            </h3>
            <button
              type="button"
              onClick={() => setActiveSubView('categories')}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              ← श्रेणियां देखें
            </button>
          </div>

          <CompanionBookingEngine
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
            selectedSubServiceId={selectedSubServiceId}
            onSubServiceChange={(subId) => setSelectedSubServiceId(subId)}
            selectedTaskId={selectedTaskId}
            onTaskIdChange={(taskId) => setSelectedTaskId(taskId)}
            selectedVehicleMode={selectedVehicleMode}
            onVehicleModeChange={(mode) => setSelectedVehicleMode(mode)}
            onSubmitBooking={handleBookingSubmit}
            lang={lang}
          />
        </div>
      )}

      {/* VIEW 3: Matching Radar (Nearby Gig Workers with Police-Verified Badges) */}
      {activeSubView === 'radar' && (
        <CompanionMatchingRadar
          pendingBooking={currentBooking}
          onConfirmCompanion={handleConfirmCompanion}
          onBackToEdit={() => setActiveSubView('book')}
          lang={lang}
        />
      )}

      {/* VIEW 4: Active Booking Screen (Live Location Tracking Map & Prominent SOS) */}
      {activeSubView === 'tracking' && (
        <CompanionLiveTrackingMap
          booking={currentBooking}
          onTriggerSOS={() => setIsSOSModalOpen(true)}
          onUpdateBookingStatus={handleUpdateStatus}
          lang={lang}
        />
      )}

      {/* VIEW 5: Sovereign Safety & Verification Guarantee Dossier */}
      {activeSubView === 'safety' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#071738] via-[#040C1A] to-black border-2 border-emerald-500/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40">
                SOVEREIGN INTEGRITY & CITIZEN SAFETY
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              100% पुलिस चरित्र सत्यापन एवं त्रि-स्तरीय सुरक्षा कवच
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              जिटोम्नी 360° के अंतर्गत कोई भी सामान्य या असंबंधित व्यक्ति ऑन-डिमांड साथी नहीं बन सकता। प्रत्येक साथी को राज्य पुलिस की सीआईडी / विशेष शाखा से चरित्र प्रमाण पत्र, आधार बायोमेट्रिक फेस-ऑथ और जिटोम्नी के व्यक्तिगत साक्षात्कार के बाद ही ऑन-बोर्ड किया जाता है।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
                <div className="text-2xl">👮‍♂️</div>
                <h4 className="text-base font-black text-white">1. पुलिस चरित्र प्रमाण पत्र</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  संबंधित थाना व सीआईडी द्वारा जारी नॉन-क्रिमिनल बैकग्राउंड रिकॉर्ड। प्रत्येक प्रोफाइल पर पुलिस वेरिफिकेशन नंबर प्रदर्शित होता है।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
                <div className="text-2xl">🆔</div>
                <h4 className="text-base font-black text-white">2. यूआईडीएआई फेस-ऑथ ई-केवाईसी</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  प्रत्येक साथी का आधार नंबर बायोमेट्रिक और फेस रिकॉग्निशन से बंधा होता है। कोई फेक या छद्म प्रोफाइल संभव नहीं।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
                <div className="text-2xl">🛡️</div>
                <h4 className="text-base font-black text-white">3. ₹2,00,000 सुरक्षा बीमा</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  प्रत्येक सक्रिय बुकिंग पर यूजर और साथी दोनों को आकस्मिक सुरक्षा और टास्क दायित्व बीमा सुरक्षा कवर प्रदान किया जाता है।
                </p>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-emerald-200">
                <strong>Emergency Assistance Lines:</strong> Police 112 • Women Safety 1090 • Ambulance 108 • Sovereign Helpline 1800-JITOMNI-SOS
              </div>
              <button
                type="button"
                onClick={() => setActiveSubView('book')}
                className="py-2.5 px-5 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>अभी साथी बुक करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      )}

      {/* Sovereign Emergency SOS Center Modal */}
      <CompanionSOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        booking={currentBooking}
        lang={lang}
      />

      {/* Sovereign Activity Notifications Center */}
      <CompanionNotificationCenter
        lang={lang}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Service Provider / Sathi / Vendor Registration Onboarding Modal */}
      <ServiceProviderRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        lang={lang}
        onRegisteredSuccess={() => {
          setActiveSubView('rewa_map');
        }}
      />
    </div>
  );
};
