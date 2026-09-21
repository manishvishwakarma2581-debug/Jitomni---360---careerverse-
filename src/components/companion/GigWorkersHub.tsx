import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  Search,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  Star,
  Filter,
  UserCheck,
  DollarSign,
  Wallet,
  ArrowUpRight,
  Check,
  X,
  Crosshair,
  ChevronRight,
  Sliders,
  Briefcase,
  Plus
} from 'lucide-react';
import {
  ALL_GIG_CATEGORIES,
  GIG_GROUPS,
  PAN_INDIA_LOCATIONS,
  INITIAL_GIG_WORKERS_POOL,
  GigCategoryItem,
  GigWorkerProfile,
  GigBookingRecord
} from '../../data/gigWorkersData';
import { Language } from '../../types';

interface GigWorkersHubProps {
  lang: Language;
}

export const GigWorkersHub: React.FC<GigWorkersHubProps> = ({ lang: _lang }) => {
  // Top-Level 2-in-1 Mode: Customer vs Worker vs Admin
  const [activeMode, setActiveMode] = useState<'customer' | 'worker' | 'admin'>('customer');

  // PAN-INDIA FILTER STATE
  const [selectedState, setSelectedState] = useState<string>('Madhya Pradesh (मध्य प्रदेश)');
  const [selectedCity, setSelectedCity] = useState<string>('Bhopal');
  const [radiusFilter, setRadiusFilter] = useState<number>(5); // 5km default
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [locationDetectedMessage, setLocationDetectedMessage] = useState<string | null>(null);

  // CATEGORY & SEARCH FILTER
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<GigCategoryItem>(ALL_GIG_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // DATA STATE
  const [workersPool, setWorkersPool] = useState<GigWorkerProfile[]>(() => {
    const saved = localStorage.getItem('jitomni_gig_workers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_GIG_WORKERS_POOL;
  });

  const [bookings, setBookings] = useState<GigBookingRecord[]>(() => {
    const saved = localStorage.getItem('jitomni_gig_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'GIG-BOK-1092',
        categoryId: 'electrician',
        categoryName: 'इलेक्ट्रीशियन (Electrician)',
        customerId: 'cust-892',
        customerName: 'Vivek Chourasia',
        customerPhone: '+91 98260 11920',
        address: 'Flat 402, Royal Palms, Arera Colony',
        city: 'Bhopal',
        state: 'Madhya Pradesh (मध्य प्रदेश)',
        landmark: 'Near 10 No. Market SBI',
        serviceDate: 'Today',
        timeSlot: '11:00 AM - 12:00 PM',
        problemDescription: 'MCB repeatedly tripping when AC switches on + kitchen socket burnt',
        workerId: 'gw-01',
        workerName: 'Rameshwar Sahu',
        workerPhone: '+91 98261 44520',
        workerPhoto: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
        totalFare: 350,
        workerEarnings: 280, // 80%
        adminCommission: 70, // 20%
        commissionRate: 0.20,
        startOtp: '4921',
        endOtp: '8832',
        paymentMethod: 'upi',
        paymentStatus: 'paid_via_upi',
        bookingStatus: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'GIG-BOK-1093',
        categoryId: 'plumber',
        categoryName: 'प्लंबर (Plumber)',
        customerId: 'cust-441',
        customerName: 'Pooja Tiwari',
        customerPhone: '+91 94251 77290',
        address: 'B-12, Green City, Kolar Road',
        city: 'Bhopal',
        state: 'Madhya Pradesh (मध्य प्रदेश)',
        landmark: 'Behind D-Mart',
        serviceDate: 'Today',
        timeSlot: '02:30 PM - 03:30 PM',
        problemDescription: 'Bathroom overhead tank pipe leakage and low pressure in tap',
        workerId: 'gw-02',
        workerName: 'Mohammad Imran Ansari',
        workerPhone: '+91 94250 88214',
        workerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        totalFare: 400,
        workerEarnings: 320, // 80%
        adminCommission: 80, // 20%
        commissionRate: 0.20,
        startOtp: '6712',
        endOtp: '1940',
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        bookingStatus: 'in_progress',
        createdAt: new Date(Date.now() - 1800000).toISOString()
      }
    ];
  });

  // Category commission rate state (Admin adjustable, default 20%)
  const [commissionRates, setCommissionRates] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    ALL_GIG_CATEGORIES.forEach((c) => {
      map[c.id] = 0.20;
    });
    return map;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('jitomni_gig_workers', JSON.stringify(workersPool));
  }, [workersPool]);

  useEffect(() => {
    localStorage.setItem('jitomni_gig_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Cities for currently selected state
  const availableCities = useMemo(() => {
    const st = PAN_INDIA_LOCATIONS.find((l) => l.state === selectedState);
    return st ? st.cities : ['All Cities'];
  }, [selectedState]);

  // Update selected city if state changes
  useEffect(() => {
    if (availableCities.length > 0 && !availableCities.includes(selectedCity)) {
      setSelectedCity(availableCities[0]);
    }
  }, [availableCities, selectedCity]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return ALL_GIG_CATEGORIES.filter((c) => {
      const matchGroup = selectedGroup === 'all' || c.groupId === selectedGroup;
      const matchQuery =
        !searchQuery ||
        c.name.hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.popularJobs.some((j) => j.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchGroup && matchQuery;
    });
  }, [selectedGroup, searchQuery]);

  // Filtered Workers for selected category & location
  const filteredWorkers = useMemo(() => {
    return workersPool.filter((w) => {
      const matchCategory =
        w.primaryCategoryId === selectedCategory.id ||
        w.secondaryCategoryIds.includes(selectedCategory.id);
      
      const matchCity =
        selectedCity === 'All Cities' ||
        w.city.toLowerCase() === selectedCity.toLowerCase();

      const matchDistance = radiusFilter === 0 || w.distanceKm <= radiusFilter;

      return matchCategory && matchCity && matchDistance;
    });
  }, [workersPool, selectedCategory, selectedCity, radiusFilter]);

  // BOOKING MODAL STATE
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [targetWorker, setTargetWorker] = useState<GigWorkerProfile | null>(null);
  const [bookingFormData, setBookingFormData] = useState({
    customerName: '',
    customerPhone: '+91 98260 ',
    address: '',
    landmark: '',
    serviceDate: 'Today (Immediate)',
    timeSlot: 'Within 30 Mins',
    problemDescription: '',
    paymentMethod: 'cash' as 'upi' | 'cash',
    hoursCount: 1
  });
  const [lastCreatedBooking, setLastCreatedBooking] = useState<GigBookingRecord | null>(null);

  // WORKER KYC FORM STATE
  const [kycForm, setKycForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    aadhaarNumber: '',
    gender: 'male' as 'male' | 'female' | 'other',
    primaryCategoryId: ALL_GIG_CATEGORIES[0].id,
    experienceYears: 4,
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    city: 'Bhopal',
    area: '',
    chargePerHour: 249,
    upiId: '',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });
  const [kycSuccessMessage, setKycSuccessMessage] = useState<string | null>(null);

  // WORKER EARNINGS DASHBOARD (Current logged-in worker simulation)
  const [activeWorkerId, setActiveWorkerId] = useState<string>(workersPool[0]?.id || 'gw-01');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);
  const [withdrawSuccessMessage, setWithdrawSuccessMessage] = useState<string | null>(null);

  const currentWorker = useMemo(() => {
    return workersPool.find((w) => w.id === activeWorkerId) || workersPool[0];
  }, [workersPool, activeWorkerId]);

  // Worker bookings & stats
  const workerBookings = useMemo(() => {
    return bookings.filter((b) => b.workerId === currentWorker?.id);
  }, [bookings, currentWorker]);

  const workerTotalEarnings = useMemo(() => {
    return workerBookings.reduce((sum, b) => sum + b.workerEarnings, 0);
  }, [workerBookings]);

  // AUTO-DETECT LOCATION HANDLER
  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    setLocationDetectedMessage(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (_position) => {
          setIsDetectingLocation(false);
          // Set to realistic detected city in India
          setSelectedState('Madhya Pradesh (मध्य प्रदेश)');
          setSelectedCity('Bhopal');
          setRadiusFilter(5);
          setLocationDetectedMessage('✅ आपकी सटीक लोकेशन (GPS: 5km रेडियस) ऑटो-डिटेक्ट हो गई है! केवल 5 किमी के नजदीकी वेरिफाइड वर्कर दिखाए जा रहे हैं।');
        },
        (_error) => {
          setIsDetectingLocation(false);
          // Default fallback
          setSelectedState('Madhya Pradesh (मध्य प्रदेश)');
          setSelectedCity('Bhopal');
          setRadiusFilter(5);
          setLocationDetectedMessage('📍 निकटतम हब: भोपाल (5km रेडियस) सेट किया गया है।');
        },
        { timeout: 4000 }
      );
    } else {
      setIsDetectingLocation(false);
      setLocationDetectedMessage('📍 निकटतम हब: भोपाल सेट किया गया है।');
    }
  };

  // OPEN BOOKING MODAL
  const handleOpenBooking = (worker?: GigWorkerProfile) => {
    setTargetWorker(worker || filteredWorkers[0] || workersPool[0]);
    setIsBookingModalOpen(true);
  };

  // SUBMIT BOOKING HANDLER (With 20% commission auto split)
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = targetWorker || filteredWorkers[0] || workersPool[0];
    const totalFare = (worker?.chargePerHour || selectedCategory.typicalRatePerHour) * bookingFormData.hoursCount;
    const commissionRate = commissionRates[selectedCategory.id] || 0.20;
    const adminCommission = Math.round(totalFare * commissionRate);
    const workerEarnings = totalFare - adminCommission; // 80%

    const newBooking: GigBookingRecord = {
      id: `GIG-BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name.hi,
      customerId: `cust-${Math.floor(100 + Math.random() * 900)}`,
      customerName: bookingFormData.customerName || 'नागरिक ग्राहक',
      customerPhone: bookingFormData.customerPhone,
      address: bookingFormData.address || 'Address on record',
      city: selectedCity,
      state: selectedState,
      landmark: bookingFormData.landmark || 'Main Road',
      serviceDate: bookingFormData.serviceDate,
      timeSlot: bookingFormData.timeSlot,
      problemDescription: bookingFormData.problemDescription || `${selectedCategory.name.hi} सर्विस आवश्यकता`,
      workerId: worker.id,
      workerName: worker.name,
      workerPhone: worker.phone,
      workerPhoto: worker.photoUrl,
      totalFare,
      workerEarnings,
      adminCommission,
      commissionRate,
      startOtp: String(Math.floor(1000 + Math.random() * 9000)),
      endOtp: String(Math.floor(1000 + Math.random() * 9000)),
      paymentMethod: bookingFormData.paymentMethod,
      paymentStatus: bookingFormData.paymentMethod === 'upi' ? 'paid_via_upi' : 'pending',
      bookingStatus: 'assigned',
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLastCreatedBooking(newBooking);

    // Increment worker completed jobs
    setWorkersPool((prev) =>
      prev.map((w) =>
        w.id === worker.id ? { ...w, completedJobsCount: w.completedJobsCount + 1 } : w
      )
    );

    setIsBookingModalOpen(false);
  };

  // SUBMIT WORKER KYC HANDLER
  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycForm.name || !kycForm.phone || !kycForm.aadhaarNumber) {
      alert('कृपया नाम, मोबाइल नंबर व आधार कार्ड नंबर अवश्य भरें।');
      return;
    }

    const newWorkerId = `gw-${Date.now().toString().slice(-6)}`;
    const formattedAadhaar = kycForm.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX-XXXX-$3');

    const newWorker: GigWorkerProfile = {
      id: newWorkerId,
      name: kycForm.name.trim(),
      gender: kycForm.gender,
      phone: kycForm.phone.trim(),
      whatsapp: kycForm.whatsapp || kycForm.phone,
      aadhaarNumber: formattedAadhaar || 'XXXX-XXXX-8921',
      aadhaarVerified: true,
      photoUrl: kycForm.photoUrl,
      primaryCategoryId: kycForm.primaryCategoryId,
      secondaryCategoryIds: [],
      experienceYears: Number(kycForm.experienceYears) || 3,
      state: kycForm.state,
      city: kycForm.city,
      area: kycForm.area || 'City Center',
      chargePerHour: Number(kycForm.chargePerHour) || 249,
      chargePerJobMin: Math.round(Number(kycForm.chargePerHour) * 0.8),
      upiId: kycForm.upiId || `${kycForm.phone.replace(/\D/g, '')}@upi`,
      rating: 5.0,
      totalReviews: 1,
      completedJobsCount: 0,
      distanceKm: +(Math.random() * 2 + 0.9).toFixed(1),
      etaMinutes: 15,
      status: 'available',
      verificationBadge: 'gold_verified',
      joinedDate: new Date().toISOString().split('T')[0],
      languages: ['Hindi', 'English'],
      skillsList: ['Certified Specialist', 'Punctual', 'UIDAI Verified'],
      policeVerificationNo: `POL-VER-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setWorkersPool((prev) => [newWorker, ...prev]);
    setActiveWorkerId(newWorkerId);
    setKycSuccessMessage(`🎉 बधाई! आपका आधार KYC और प्रोफाइल सफलतापूर्वक सत्यापित हो गया है। आपका वर्कर कोड: ${newWorkerId} है।`);
  };

  // ADMIN VERIFY / REJECT WORKER
  const handleToggleWorkerVerification = (workerId: string, action: 'verify' | 'reject') => {
    setWorkersPool((prev) =>
      prev.map((w) => {
        if (w.id === workerId) {
          return {
            ...w,
            verificationBadge: action === 'verify' ? 'gold_verified' : 'pending',
            status: action === 'verify' ? 'available' : 'offline'
          };
        }
        return w;
      })
    );
  };

  // ADMIN UPDATE COMMISSION
  const handleUpdateCommission = (categoryId: string, ratePct: number) => {
    setCommissionRates((prev) => ({
      ...prev,
      [categoryId]: ratePct / 100
    }));
  };

  return (
    <section id="gig-workers-pan-india" className="w-full space-y-6 pt-4 border-t-2 border-[#D4AF37]/30">
      {/* 1. MASTER SOVEREIGN HEADER & TAGLINE */}
      <div className="rounded-2xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#07132B] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-2xl text-white relative overflow-hidden">
        {/* Background glow & decorative accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges Ribbon */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>गिग वर्कर्स - ऑल इंडिया 35+ सर्विसेज</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-mono font-bold border border-blue-500/40 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>ISO 9001:2015 & 27001 Certified Network</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>100% आधार व पुलिस वेरिफाइड</span>
              </span>
            </div>

            {/* MANDATORY TAGLINE */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
              &ldquo;एक ऐप पे सब काम —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37]">
                घर का प्लंबर से दादाजी का साथी तक
              </span>
              &rdquo;
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              पूरे भारत के किसी भी शहर में <strong>5 किमी के दायरे</strong> में मौजूद इलेक्ट्रीशियन, प्लंबर, कारपेंटर, एसी मैकेनिक, ब्यूटीशियन, ड्राइवर, होम ट्यूटर और 35+ कुशल कारीगरों को तुरंत बुक करें। 
              पारदर्शी रेट, लाइव ओटीपी सुरक्षा और 24x7 गारंटी।
            </p>
          </div>

          {/* Quick Helpline & Emergency Contact */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:9399608239"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>कॉल करें: 9399608239</span>
            </a>

            <div className="text-[11px] text-center text-slate-400 font-mono">
              24x7 सोवरेन हेल्पलाइन • नो मिडिलमैन कमीशन
            </div>
          </div>
        </div>

        {/* 2. TWO APPS IN ONE APP LOGIC SELECTOR TABS */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto p-1 bg-[#040E24] rounded-xl border border-slate-700 w-full sm:w-auto">
            {/* Tab 1: Customer Mode */}
            <button
              type="button"
              onClick={() => setActiveMode('customer')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeMode === 'customer'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                  : 'bg-transparent text-slate-300 hover:text-white border-transparent'
              }`}
            >
              <span className="text-base">👤</span>
              <span>सर्विस चाहिए (Customer Mode)</span>
            </button>

            {/* Tab 2: Worker KYC Mode */}
            <button
              type="button"
              onClick={() => setActiveMode('worker')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeMode === 'worker'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/30'
                  : 'bg-transparent text-slate-300 hover:text-white border-transparent'
              }`}
            >
              <span className="text-base">👷</span>
              <span>गिग वर्कर बनो - काम चाहिए (Worker KYC & Portal)</span>
            </button>

            {/* Tab 3: Admin Commission Control */}
            <button
              type="button"
              onClick={() => setActiveMode('admin')}
              className={`px-4 py-2.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
                activeMode === 'admin'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-transparent text-slate-400 hover:text-white border-transparent'
              }`}
            >
              <span className="text-base">🏛️</span>
              <span>एडमिन पैनल (20% Split & Approvals)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>लाइव वर्कर: {workersPool.length} | ऑल-इंडिया बुकिंग्स: {bookings.length}</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: CUSTOMER VIEW - "SERVICE CHAHIYE" */}
      {/* ============================================================ */}
      {activeMode === 'customer' && (
        <div className="space-y-6 animate-fadeIn">
          {/* PAN-INDIA CITY & 5KM RADIUS SELECTOR BAR */}
          <div className="p-4 rounded-xl bg-[#0B1E3B] border border-blue-900/60 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Auto-Detect Location Button */}
            <button
              type="button"
              onClick={handleAutoDetectLocation}
              disabled={isDetectingLocation}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
            >
              <Crosshair className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? 'जीपीएस खोज रहा है...' : '📍 ऑटो-डिटेक्ट माय लोकेशन'}</span>
            </button>

            {/* State Selector */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="flex items-center gap-2 bg-[#040E24] px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-slate-400">राज्य:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  {PAN_INDIA_LOCATIONS.map((loc) => (
                    <option key={loc.state} value={loc.state} className="bg-[#0A1931] text-white">
                      {loc.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selector */}
              <div className="flex items-center gap-2 bg-[#040E24] px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                <span className="text-slate-400">शहर:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-[#D4AF37] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="All Cities" className="bg-[#0A1931] text-white">सभी शहर (All Cities)</option>
                  {availableCities.map((c) => (
                    <option key={c} value={c} className="bg-[#0A1931] text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radius Filter Toggle (5km, 10km, 25km, All) */}
              <div className="flex items-center gap-1.5 bg-[#040E24] p-1 rounded-lg border border-slate-700 text-xs">
                <span className="text-[11px] text-slate-400 px-1">दूरी:</span>
                {[
                  { label: '5 किमी', val: 5 },
                  { label: '10 किमी', val: 10 },
                  { label: 'पूरा शहर', val: 0 }
                ].map((r) => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => setRadiusFilter(r.val)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      radiusFilter === r.val
                        ? 'bg-[#D4AF37] text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="सर्विस खोजें (उदा. प्लंबर, AC, कारपेंटर)..."
                className="w-full pl-9 pr-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {/* Location Feedback Toast */}
          {locationDetectedMessage && (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between gap-2 animate-fadeIn">
              <span>{locationDetectedMessage}</span>
              <button
                type="button"
                onClick={() => setLocationDetectedMessage(null)}
                className="text-emerald-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* GROUP FILTER TABS (Group A to F) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GIG_GROUPS.map((grp) => (
              <button
                key={grp.id}
                type="button"
                onClick={() => setSelectedGroup(grp.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedGroup === grp.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 border-[#D4AF37] shadow-md'
                    : 'bg-[#0A1931] text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                {grp.name.hi}
              </button>
            ))}
          </div>

          {/* 35+ GIG CATEGORIES CAROUSEL/GRID */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">✦</span>
                <span>सर्विस चुनें ({filteredCategories.length} उपलब्ध श्रेणियां)</span>
              </h3>
              <span className="text-xs text-slate-400">
                चयनित: <strong className="text-[#D4AF37]">{selectedCategory.name.hi}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredCategories.map((cat) => {
                const isSelected = selectedCategory.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#0E2854] to-[#0A1931] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                        : 'bg-[#071738] hover:bg-[#0B1E3B] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.badge && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                        {cat.badge}
                      </span>
                    )}

                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-black text-white line-clamp-1">
                        {cat.name.hi}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {cat.name.en}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[#D4AF37] font-bold">
                        ₹{cat.typicalRatePerHour}/घं.
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CATEGORY DETAILS & VERIFIED WORKERS LIST */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#071738] to-[#040E24] border border-slate-800 space-y-5">
            {/* Category Banner Summary */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0A1931] border border-[#D4AF37] flex items-center justify-center text-2xl shadow-md">
                  {selectedCategory.icon}
                </div>
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <span>{selectedCategory.name.hi}</span>
                    <span className="text-xs text-slate-400 font-normal">({selectedCategory.groupName.hi})</span>
                  </h4>
                  <p className="text-xs text-slate-300">{selectedCategory.description.hi}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-105"
                >
                  <Zap className="w-4 h-4" />
                  <span>तुरंत बुक करें (Next Available)</span>
                </button>
              </div>
            </div>

            {/* Popular Problems Chips */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                लोकप्रिय काम व समाधान (Popular Requests):
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory.popularJobs.map((job, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#0A1931] border border-slate-700 text-slate-300 text-xs font-medium hover:border-[#D4AF37] cursor-pointer"
                    onClick={() => {
                      setBookingFormData((prev) => ({ ...prev, problemDescription: job }));
                      handleOpenBooking();
                    }}
                  >
                    ✦ {job}
                  </span>
                ))}
              </div>
            </div>

            {/* NEARBY WORKERS LIST (Filtered by 5km radius & city) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    नजदीकी वेरिफाइड कारीगर ({selectedCity} •{' '}
                    {radiusFilter > 0 ? `${radiusFilter} किमी रेडियस` : 'पूरा शहर'}) : {filteredWorkers.length} उपलब्ध
                  </span>
                </h5>
                <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>20% Admin Split Auto-Calculated</span>
                </span>
              </div>

              {filteredWorkers.length === 0 ? (
                <div className="p-8 rounded-xl bg-[#040E24] border border-dashed border-slate-700 text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="text-sm font-bold text-white">
                    {selectedCity} में {radiusFilter} किमी के भीतर कोई कारीगर इस श्रेणी में अभी सक्रिय नहीं है।
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    कृपया दूरी फिल्टर बढ़ाकर <strong>&quot;पूरा शहर&quot;</strong> करें या हमारे 24x7 हेल्पलाइन नंबर पर कॉल करके तत्काल कारीगर मंगवाएं।
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRadiusFilter(0)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      पूरे शहर में खोजें
                    </button>
                    <a
                      href="tel:9399608239"
                      className="px-4 py-2 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs"
                    >
                      कॉल 9399608239
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="p-4 rounded-xl bg-[#07132B] border border-slate-800 hover:border-[#D4AF37]/60 transition-all shadow-md flex flex-col justify-between space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={worker.photoUrl}
                            alt={worker.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-white">{worker.name}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {worker.experienceYears} वर्ष अनुभव • {worker.area}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-black text-[#D4AF37] font-mono">
                            ₹{worker.chargePerHour}/घंटा
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold">
                            {worker.distanceKm} किमी दूर
                          </div>
                        </div>
                      </div>

                      {/* Ratings & Police CID Badge */}
                      <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#040E24] border border-slate-800/80">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{worker.rating}</span>
                          <span className="text-[10px] text-slate-400">({worker.totalReviews})</span>
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono">
                          <Award className="w-3 h-3 text-[#D4AF37]" />
                          <span>आधार: {worker.aadhaarNumber}</span>
                        </div>

                        <div className="text-[10px] text-blue-300 font-mono">
                          ETA: {worker.etaMinutes} मिनट
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {worker.skillsList.slice(0, 3).map((sk, sIdx) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded bg-[#0A1931] text-slate-300 border border-slate-700">
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenBooking(worker)}
                          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>बुक करें (Book Now)</span>
                        </button>

                        <a
                          href={`tel:${worker.phone}`}
                          className="p-2 rounded-lg bg-[#0A1931] hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 transition-all"
                          title="कॉल करें"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE BOOKING TRACKER (IF CUSTOMER HAS ACTIVE JOB) */}
          {lastCreatedBooking && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-2 border-emerald-500/60 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      सक्रिय बुकिंग कन्फर्म • {lastCreatedBooking.id}
                    </div>
                    <div className="text-base font-black text-white">
                      {lastCreatedBooking.categoryName} — कारीगर: {lastCreatedBooking.workerName}
                    </div>
                  </div>
                </div>

                {/* START OTP BADGE */}
                <div className="flex items-center gap-2 bg-[#040E24] px-4 py-2 rounded-xl border-2 border-[#D4AF37] shadow-inner">
                  <span className="text-xs text-slate-300 font-bold">शुरुआत OTP:</span>
                  <span className="text-lg font-mono font-black text-[#D4AF37] tracking-widest">
                    {lastCreatedBooking.startOtp}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#040E24] border border-slate-800">
                  <div className="text-slate-400">कुल किराया:</div>
                  <div className="text-sm font-black text-white font-mono">₹{lastCreatedBooking.totalFare}</div>
                  <div className="text-[10px] text-slate-400">भुगतान: {lastCreatedBooking.paymentMethod.toUpperCase()} (20% Admin Cut Applied)</div>
                </div>

                <div className="p-3 rounded-lg bg-[#040E24] border border-slate-800">
                  <div className="text-slate-400">स्थान व समय:</div>
                  <div className="text-sm font-bold text-white">{lastCreatedBooking.city} ({lastCreatedBooking.timeSlot})</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{lastCreatedBooking.address}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#040E24] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400">कारीगर संपर्क:</div>
                    <div className="text-sm font-bold text-white">{lastCreatedBooking.workerPhone}</div>
                  </div>
                  <a
                    href={`tel:${lastCreatedBooking.workerPhone}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: WORKER PORTAL & KYC - "GIG WORKER BANO - KAAM CHAHIYE" */}
      {/* ============================================================ */}
      {activeMode === 'worker' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Worker Navigation Bar (Profile Switcher & Balance) */}
          <div className="p-4 rounded-xl bg-[#0B1E3B] border border-amber-500/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentWorker?.photoUrl}
                alt={currentWorker?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white">{currentWorker?.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                    गोल्ड वेरिफाइड
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {currentWorker?.city} • UIDAI आधार: {currentWorker?.aadhaarNumber} • दर: ₹{currentWorker?.chargePerHour}/घंटा
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-400">वॉलेट बैलेंस (80% नेट):</div>
                <div className="text-lg font-mono font-black text-[#D4AF37]">
                  ₹{workerTotalEarnings > 0 ? workerTotalEarnings : 1240}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span>UPI में निकालें</span>
              </button>
            </div>
          </div>

          {/* Success / Notification Banner */}
          {kycSuccessMessage && (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-medium flex items-center justify-between gap-2">
              <span>{kycSuccessMessage}</span>
              <button
                type="button"
                onClick={() => setKycSuccessMessage(null)}
                className="text-emerald-400 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {withdrawSuccessMessage && (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-medium flex items-center justify-between gap-2">
              <span>{withdrawSuccessMessage}</span>
              <button
                type="button"
                onClick={() => setWithdrawSuccessMessage(null)}
                className="text-emerald-400 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* WORKER EARNINGS DASHBOARD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#071738] border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">आज की कमाई (Today Earnings):</div>
              <div className="text-xl font-mono font-black text-emerald-400">
                ₹{workerBookings.length > 0 ? workerTotalEarnings : 560}
              </div>
              <div className="text-[10px] text-slate-500">80% सीधे आपके बैंक में</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">कुल पूर्ण कार्य (Total Jobs):</div>
              <div className="text-xl font-mono font-black text-white">
                {(currentWorker?.completedJobsCount || 0) + workerBookings.length}
              </div>
              <div className="text-[10px] text-emerald-400">100% सक्सेस रेट</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">रेटिंग व समीक्षा (Rating):</div>
              <div className="text-xl font-mono font-black text-[#D4AF37] flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span>{currentWorker?.rating || 4.9}</span>
              </div>
              <div className="text-[10px] text-slate-500">{currentWorker?.totalReviews || 120}+ नागरिकों की संतुष्टि</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">प्लेटफ़ॉर्म कमीशन (Admin 20%):</div>
              <div className="text-xl font-mono font-black text-purple-400">20%</div>
              <div className="text-[10px] text-slate-500">बीमा, सुरक्षा व ग्राहक सहायता</div>
            </div>
          </div>

          {/* TWO COLUMNS: KYC REGISTRATION FORM & LIVE INCOMING JOBS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KYC Form */}
            <div className="p-5 rounded-2xl bg-[#07132B] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>नया गिग वर्कर KYC रजिस्ट्रेशन (Aadhaar & Skill)</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">इंस्टेंट अप्रूवल</span>
              </div>

              <form onSubmit={handleKycSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">पूरा नाम (Full Name) *</label>
                    <input
                      type="text"
                      required
                      value={kycForm.name}
                      onChange={(e) => setKycForm({ ...kycForm, name: e.target.value })}
                      placeholder="उदा. महेश कुशवाहा"
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">मोबाइल नंबर (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={kycForm.phone}
                      onChange={(e) => setKycForm({ ...kycForm, phone: e.target.value })}
                      placeholder="+91 98260 XXXXX"
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">12-अंक आधार नंबर (Aadhaar Number) *</label>
                    <input
                      type="text"
                      required
                      maxLength={14}
                      value={kycForm.aadhaarNumber}
                      onChange={(e) => setKycForm({ ...kycForm, aadhaarNumber: e.target.value })}
                      placeholder="1234 5678 9012"
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">प्राथमिक हुनर/सेवा (Primary Skill) *</label>
                    <select
                      value={kycForm.primaryCategoryId}
                      onChange={(e) => setKycForm({ ...kycForm, primaryCategoryId: e.target.value })}
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      {ALL_GIG_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.name.hi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">अनुभव (वर्ष)</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={kycForm.experienceYears}
                      onChange={(e) => setKycForm({ ...kycForm, experienceYears: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">चार्ज प्रति घंटा (₹)</label>
                    <input
                      type="number"
                      min={99}
                      max={1999}
                      value={kycForm.chargePerHour}
                      onChange={(e) => setKycForm({ ...kycForm, chargePerHour: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none font-mono text-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">शहर (City)</label>
                    <input
                      type="text"
                      value={kycForm.city}
                      onChange={(e) => setKycForm({ ...kycForm, city: e.target.value })}
                      placeholder="उदा. भोपाल / रीवा"
                      className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">बैंक खाता या UPI ID (फॉर 80% डेली पेआउट) *</label>
                  <input
                    type="text"
                    required
                    value={kycForm.upiId}
                    onChange={(e) => setKycForm({ ...kycForm, upiId: e.target.value })}
                    placeholder="उदा. 98260XXXXX@upi / name@oksbi"
                    className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900 text-[11px] text-blue-300">
                  🛡️ <strong>सोवरेन सुरक्षा नियम:</strong> हर काम का 80% पैसा तुरंत आपके UPI पर ट्रांसफर होगा, 20% एडमिन कमीशन प्लेटफ़ॉर्म मेंटेनेंस व इंश्योरेंस के लिए सुरक्षित कटेगा।
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>KYC सबमिट करें व काम शुरू करें (Submit KYC)</span>
                </button>
              </form>
            </div>

            {/* Live Job Requests Stream */}
            <div className="p-5 rounded-2xl bg-[#07132B] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>लाइव काम अनुरोध (Incoming Customer Requests)</span>
                </h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl bg-[#040E24] border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-slate-400">{b.id}</span>
                        <div className="font-black text-white text-sm">{b.categoryName}</div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-emerald-400 font-black text-sm">₹{b.workerEarnings}</span>
                        <div className="text-[10px] text-slate-400">आपकी कमाई (80%)</div>
                      </div>
                    </div>

                    <div className="text-slate-300 text-[11px] bg-[#071738] p-2 rounded border border-slate-800">
                      <strong>समस्या:</strong> {b.problemDescription}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>📍 {b.city} ({b.landmark})</span>
                      <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-bold font-mono">
                        OTP: {b.startOtp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 3: ADMIN PANEL - 20% COMMISSION & PAN-INDIA CONTROLS */}
      {/* ============================================================ */}
      {activeMode === 'admin' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Admin Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#071738] border border-purple-500/40 space-y-1">
              <div className="text-xs text-purple-300 font-bold">पंजीकृत कारीगर (Registered):</div>
              <div className="text-2xl font-mono font-black text-white">{workersPool.length}</div>
              <div className="text-[10px] text-emerald-400">ऑल-इंडिया पैन-कार्ड व आधार सत्यापित</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-purple-500/40 space-y-1">
              <div className="text-xs text-purple-300 font-bold">कुल बुकिंग्स (Total Orders):</div>
              <div className="text-2xl font-mono font-black text-white">{bookings.length}</div>
              <div className="text-[10px] text-blue-400">24x7 एक्टिव डिस्पैच</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-purple-500/40 space-y-1">
              <div className="text-xs text-purple-300 font-bold">ग्रॉस टर्नओवर (Gross GMV):</div>
              <div className="text-2xl font-mono font-black text-[#D4AF37]">
                ₹{bookings.reduce((sum, b) => sum + b.totalFare, 0)}
              </div>
              <div className="text-[10px] text-slate-400">नागरिकों द्वारा भुगतान</div>
            </div>

            <div className="p-4 rounded-xl bg-[#071738] border border-purple-500/40 space-y-1">
              <div className="text-xs text-purple-300 font-bold">एडमिन कमीशन (20% Revenue):</div>
              <div className="text-2xl font-mono font-black text-emerald-400">
                ₹{bookings.reduce((sum, b) => sum + b.adminCommission, 0)}
              </div>
              <div className="text-[10px] text-slate-400">20% ऑटो-डिडक्शन लेजर</div>
            </div>
          </div>

          {/* COMMISSION MATRIX CONTROLLER */}
          <div className="p-5 rounded-2xl bg-[#07132B] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>श्रेणीवार कमीशन दर नियंत्रक (Category Commission Rates • Default 20%)</span>
              </h4>
              <span className="text-xs text-slate-400">एडमिन द्वारा कभी भी अपडेट करें</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {ALL_GIG_CATEGORIES.slice(0, 8).map((cat) => {
                const currentRate = Math.round((commissionRates[cat.id] || 0.20) * 100);
                return (
                  <div key={cat.id} className="p-3 rounded-lg bg-[#040E24] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white line-clamp-1">{cat.icon} {cat.name.hi}</span>
                      <span className="font-mono text-[#D4AF37] font-black">{currentRate}%</span>
                    </div>

                    <input
                      type="range"
                      min={10}
                      max={30}
                      step={1}
                      value={currentRate}
                      onChange={(e) => handleUpdateCommission(cat.id, Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>10% (मिनिमम)</span>
                      <span>30% (मैक्सिमम)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WORKER VERIFICATION / APPROVAL QUEUE */}
          <div className="p-5 rounded-2xl bg-[#07132B] border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>कारीगर सत्यापन व स्वीकृति (Worker KYC Verification Queue)</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#040E24] text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">कारीगर</th>
                    <th className="py-2.5 px-3">सेवा</th>
                    <th className="py-2.5 px-3">आधार व मोबाइल</th>
                    <th className="py-2.5 px-3">शहर</th>
                    <th className="py-2.5 px-3">रेट/घंटा</th>
                    <th className="py-2.5 px-3">स्टेटस</th>
                    <th className="py-2.5 px-3 text-right">एक्शन</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {workersPool.map((w) => (
                    <tr key={w.id} className="hover:bg-[#040E24]/60">
                      <td className="py-3 px-3 flex items-center gap-2">
                        <img src={w.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-white">{w.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{w.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium">{w.primaryCategoryId}</td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        <div>{w.phone}</div>
                        <div className="text-slate-400">{w.aadhaarNumber}</div>
                      </td>
                      <td className="py-3 px-3">{w.city}</td>
                      <td className="py-3 px-3 font-mono text-[#D4AF37]">₹{w.chargePerHour}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          w.verificationBadge === 'gold_verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {w.verificationBadge === 'gold_verified' ? 'स्वीकृत (Approved)' : 'पेंडिंग (Pending)'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        {w.verificationBadge !== 'gold_verified' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleWorkerVerification(w.id, 'verify')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                          >
                            स्वीकृत करें
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleWorkerVerification(w.id, 'reject')}
                            className="px-2.5 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-300 font-bold text-[11px]"
                          >
                            सस्पेंड
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: CUSTOMER BOOKING FORM WITH OTP & 20% COMMISSION SPLIT */}
      {/* ============================================================ */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#071738] border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCategory.icon}</span>
                <div>
                  <h3 className="text-base font-black text-white">{selectedCategory.name.hi}</h3>
                  <p className="text-xs text-slate-300">
                    कारीगर: <strong>{targetWorker?.name || 'स्वचालित नजदीकी साथी'}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">आपका नाम (Your Name) *</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.customerName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, customerName: e.target.value })}
                    placeholder="उदा. राहुल वर्मा"
                    className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">मोबाइल नंबर (OTP हेतु) *</label>
                  <input
                    type="tel"
                    required
                    value={bookingFormData.customerPhone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">घर/ऑफिस का पता (Address) *</label>
                <input
                  type="text"
                  required
                  value={bookingFormData.address}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, address: e.target.value })}
                  placeholder="मकान नं., कॉलोनी, वार्ड..."
                  className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">लैंडमार्क (Landmark)</label>
                  <input
                    type="text"
                    value={bookingFormData.landmark}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, landmark: e.target.value })}
                    placeholder="उदा. मंदिर / स्कूल के पास"
                    className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">अनुमानित समय (Hours)</label>
                  <select
                    value={bookingFormData.hoursCount}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, hoursCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value={1}>1 घंटा (मानक)</option>
                    <option value={2}>2 घंटे</option>
                    <option value={4}>4 घंटे (हाफ डे)</option>
                    <option value={8}>8 घंटे (फुल डे)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">समस्या का विवरण (Work Details)</label>
                <textarea
                  rows={2}
                  value={bookingFormData.problemDescription}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, problemDescription: e.target.value })}
                  placeholder="उदा. नल लीकेज, स्विच बोर्ड खराब, एसी कॉलिंग नहीं कर रहा..."
                  className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* LIVE FARE & 20% COMMISSION AUTO-SPLIT BREAKDOWN */}
              <div className="p-3 rounded-xl bg-[#040E24] border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-300">किराया ब्रेकडाउन (Fare & Commission Split):</div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">दर प्रति घंटा:</span>
                  <span className="text-white font-mono">₹{targetWorker?.chargePerHour || selectedCategory.typicalRatePerHour}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">कारीगर का 80% शेयर:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    ₹{Math.round((targetWorker?.chargePerHour || selectedCategory.typicalRatePerHour) * bookingFormData.hoursCount * 0.80)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">प्लेटफ़ॉर्म 20% सोवरेन कमीशन:</span>
                  <span className="text-purple-400 font-mono font-bold">
                    ₹{Math.round((targetWorker?.chargePerHour || selectedCategory.typicalRatePerHour) * bookingFormData.hoursCount * 0.20)}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-slate-700 flex justify-between text-sm font-black">
                  <span className="text-white">कुल देय राशि:</span>
                  <span className="text-[#D4AF37] font-mono">
                    ₹{(targetWorker?.chargePerHour || selectedCategory.typicalRatePerHour) * bookingFormData.hoursCount}
                  </span>
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">भुगतान विकल्प (Payment Method)</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingFormData({ ...bookingFormData, paymentMethod: 'cash' })}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      bookingFormData.paymentMethod === 'cash'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-[#040E24] text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>💵 काम के बाद कैश</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingFormData({ ...bookingFormData, paymentMethod: 'upi' })}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      bookingFormData.paymentMethod === 'upi'
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-[#040E24] text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>📱 ऑनलाइन UPI</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.01]"
              >
                <Check className="w-4 h-4" />
                <span>बुकिंग कन्फर्म करें व OTP पाएं (Generate OTP)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: WORKER WALLET WITHDRAWAL MODAL */}
      {/* ============================================================ */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#071738] border-2 border-emerald-500 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white">वॉलेट निकासी (Withdraw to UPI)</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#040E24] border border-slate-800">
                <div className="text-slate-400">उपलब्ध शुद्ध शेष (80% Earned):</div>
                <div className="text-xl font-mono font-black text-emerald-400">
                  ₹{workerTotalEarnings > 0 ? workerTotalEarnings : 1240}
                </div>
                <div className="text-[10px] text-slate-500">20% एडमिन कमीशन पहले से काटा जा चुका है</div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">निकासी राशि (₹):</label>
                <input
                  type="number"
                  defaultValue={workerTotalEarnings > 0 ? workerTotalEarnings : 1000}
                  className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white font-mono text-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">लक्ष्य UPI ID:</label>
                <input
                  type="text"
                  defaultValue={currentWorker?.upiId || 'worker@upi'}
                  className="w-full px-3 py-2 bg-[#040E24] border border-slate-700 rounded-lg text-white font-mono focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawSuccessMessage('✅ निकासी अनुरोध सफल! ₹' + (workerTotalEarnings > 0 ? workerTotalEarnings : 1000) + ' आपके UPI खाते पर 15 मिनट में जमा कर दिए जाएंगे।');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                तुरंत ट्रांसफर करें (Instant Payout)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
