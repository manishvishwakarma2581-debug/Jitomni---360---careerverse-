import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Bike, 
  MapPin, 
  Search, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Clock, 
  Fuel, 
  Zap, 
  Users, 
  Navigation, 
  Sparkles, 
  ArrowRight, 
  PlusCircle, 
  SlidersHorizontal, 
  Compass, 
  AlertTriangle,
  Info,
  BadgeCheck,
  Check,
  Send,
  X
} from 'lucide-react';
import { RideVehiclePartner, VehicleCategoryType, RideBookingRequest, Language } from '../../types';
import { initialRidePartnersPool } from '../../data/companionData';

interface RideTravelBookingHubProps {
  lang: Language;
  onOpenSOSModal?: () => void;
}

export const RideTravelBookingHub: React.FC<RideTravelBookingHubProps> = ({ 
  lang,
  onOpenSOSModal 
}) => {
  // Active top tab: Search & Book Rides vs Register My Vehicle vs Active Trip
  const [activeTab, setActiveTab] = useState<'find_ride' | 'register_vehicle' | 'fare_calc'>('find_ride');

  // Master drivers pool (initialized from mock data, can be added to dynamically)
  const [partnersList, setPartnersList] = useState<RideVehiclePartner[]>(initialRidePartnersPool);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<'all' | VehicleCategoryType | 'women_safe'>('all');
  const [selectedDistanceRange, setSelectedDistanceRange] = useState<'all' | 'local' | 'city' | 'outstation'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'km_max'>('rating');

  // Interactive Route & Fare Estimator State
  const [estimatorPickup, setEstimatorPickup] = useState<string>('MP Nagar Zone 1, Bhopal');
  const [estimatorDrop, setEstimatorDrop] = useState<string>('Bhopal Junction Railway Station');
  const [estimatorDistance, setEstimatorDistance] = useState<number>(8.5);
  const [estimatorVehicle, setEstimatorVehicle] = useState<'bike' | 'car'>('bike');

  // Quick preset locations for 1-click test
  const quickLocations = [
    { name: 'MP Nagar Zone 1', distFromCenter: 0 },
    { name: 'Rani Kamlapati Station (RKMP)', distFromCenter: 4.2 },
    { name: 'Bhopal Junction Railway Station', distFromCenter: 8.5 },
    { name: 'Raja Bhoj Airport', distFromCenter: 18.0 },
    { name: 'BHEL Govindpura', distFromCenter: 9.0 },
    { name: 'Kolar Road / Chuna Bhatti', distFromCenter: 11.5 },
    { name: 'Mandideep Industrial Area', distFromCenter: 24.0 },
    { name: 'Sehore Bypass', distFromCenter: 38.0 },
    { name: 'Indore Highway (Dewas / Indore)', distFromCenter: 195.0 },
  ];

  // Active Ride Booking State (when user clicks "Book Ride")
  const [activeBooking, setActiveBooking] = useState<RideBookingRequest | null>(null);
  const [bookingModalPartner, setBookingModalPartner] = useState<RideVehiclePartner | null>(null);
  const [passengerName, setPassengerName] = useState<string>('');
  const [passengerPhone, setPassengerPhone] = useState<string>('');
  const [pickupInput, setPickupInput] = useState<string>('MP Nagar Zone 1, Bhopal');
  const [dropInput, setDropInput] = useState<string>('Rani Kamlapati Railway Station');
  const [bookingSuccessAlert, setBookingSuccessAlert] = useState<boolean>(false);

  // Vehicle Owner Registration Form State
  const [regName, setRegName] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regWhatsapp, setRegWhatsapp] = useState<string>('');
  const [regVehicleType, setRegVehicleType] = useState<VehicleCategoryType>('bike');
  const [regVehicleName, setRegVehicleName] = useState<string>('');
  const [regVehicleNumber, setRegVehicleNumber] = useState<string>('');
  const [regDlNumber, setRegDlNumber] = useState<string>('');
  const [regOperatingCity, setRegOperatingCity] = useState<string>('Bhopal');
  const [regServiceArea, setRegServiceArea] = useState<string>('');
  const [regMaxKm, setRegMaxKm] = useState<number>(40);
  const [regRatePerKm, setRegRatePerKm] = useState<number>(7);
  const [regBaseFare, setRegBaseFare] = useState<number>(25);
  const [regAcAvailable, setRegAcAvailable] = useState<boolean>(false);
  const [regHelmetProvided, setRegHelmetProvided] = useState<boolean>(true);
  const [regBio, setRegBio] = useState<string>('');
  const [regPlatformPlan, setRegPlatformPlan] = useState<'percentage_10' | 'daily_fleet_pass'>('percentage_10');
  const [regSubmittedSuccess, setRegSubmittedSuccess] = useState<boolean>(false);

  // Filtered & Sorted Partners Pool
  const filteredPartners = useMemo(() => {
    return partnersList.filter(partner => {
      // 1. Search Query across Name, Service Area, Route, Vehicle Name, Number Plate, City
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          partner.name.toLowerCase().includes(q) ||
          partner.serviceArea.toLowerCase().includes(q) ||
          partner.routeCoverage.toLowerCase().includes(q) ||
          partner.vehicleName.toLowerCase().includes(q) ||
          partner.vehicleNumber.toLowerCase().includes(q) ||
          partner.operatingCity.toLowerCase().includes(q) ||
          partner.phone.includes(q);

        if (!matchesQuery) return false;
      }

      // 2. Vehicle Category Filter
      if (selectedVehicleType === 'women_safe') {
        if (!partner.isFemaleDriver) return false;
      } else if (selectedVehicleType !== 'all') {
        if (selectedVehicleType === 'bike') {
          if (partner.vehicleType !== 'bike') return false;
        } else if (selectedVehicleType === 'scooter') {
          if (partner.vehicleType !== 'scooter' && partner.vehicleType !== 'electric_ev') return false;
        } else if (selectedVehicleType === 'car_hatchback') {
          if (partner.vehicleType !== 'car_hatchback') return false;
        } else if (selectedVehicleType === 'car_sedan') {
          if (partner.vehicleType !== 'car_sedan') return false;
        } else if (selectedVehicleType === 'car_suv') {
          if (partner.vehicleType !== 'car_suv') return false;
        } else if (selectedVehicleType === 'electric_ev') {
          if (partner.vehicleType !== 'electric_ev') return false;
        }
      }

      // 3. Distance Range Filter
      if (selectedDistanceRange === 'local' && partner.maxKilometers > 25) {
        // Only <=25 km specialists
      } else if (selectedDistanceRange === 'city' && partner.maxKilometers > 80) {
        // Only city <=80 km
      } else if (selectedDistanceRange === 'outstation') {
        if (partner.maxKilometers < 100) return false; // Only outstation >=100 km
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.ratePerKm - b.ratePerKm;
      if (sortBy === 'km_max') return b.maxKilometers - a.maxKilometers;
      return 0;
    });
  }, [partnersList, searchQuery, selectedVehicleType, selectedDistanceRange, sortBy]);

  // Handle Driver Registration Submit
  const handleRegisterDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regVehicleName.trim() || !regServiceArea.trim()) {
      alert('कृपया नाम, मोबाइल नंबर, वाहन का नाम और सर्विस एरिया अवश्य भरें।');
      return;
    }

    const newPartner: RideVehiclePartner = {
      id: `ride-p-${Date.now().toString().slice(-4)}`,
      name: regName,
      phone: regPhone.startsWith('+91') ? regPhone : `+91 ${regPhone}`,
      whatsapp: regWhatsapp ? (regWhatsapp.startsWith('+91') ? regWhatsapp : `+91 ${regWhatsapp}`) : undefined,
      photoUrl: regVehicleType.includes('car') 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      gender: 'male',
      age: 27,
      vehicleType: regVehicleType,
      vehicleName: regVehicleName,
      vehicleNumber: regVehicleNumber || 'MP 04 REG-PENDING',
      seatingCapacity: regVehicleType === 'car_suv' ? 6 : regVehicleType.includes('car') ? 4 : 1,
      serviceArea: regServiceArea,
      operatingCity: regOperatingCity,
      routeCoverage: `${regServiceArea} (अधिकतम ${regMaxKm} किमी तक)`,
      maxKilometers: Number(regMaxKm),
      ratePerKm: Number(regRatePerKm),
      baseFare: Number(regBaseFare),
      acAvailable: regAcAvailable,
      helmetProvided: regHelmetProvided,
      availableNow: true,
      rating: 5.0,
      reviewsCount: 1,
      tripsCompleted: 1,
      policeVerified: true,
      policeVerificationId: `MP-${regOperatingCity.slice(0,3).toUpperCase()}-VERIF-${Math.floor(1000 + Math.random() * 9000)}`,
      dlNumber: regDlNumber || `MP04-${new Date().getFullYear()}-DL${Math.floor(10000 + Math.random() * 90000)}`,
      rcVerified: true,
      aadhaarVerified: true,
      bio: regBio || `${regServiceArea} में सुरक्षित एवं समय पर यात्रा सेवा।`,
      platformFeePlan: regPlatformPlan,
      totalFareGenerated: 0,
      platformFeePaid: regPlatformPlan === 'daily_fleet_pass' ? (regVehicleType.includes('car') ? 40 : 15) : 0,
      platformFeePending: 0
    };

    setPartnersList(prev => [newPartner, ...prev]);
    setRegSubmittedSuccess(true);
  };

  // Handle Instant Ride Booking Submit
  const handleConfirmRideBooking = () => {
    if (!bookingModalPartner) return;
    if (!passengerName.trim() || !passengerPhone.trim()) {
      alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }

    const estimatedDist = estimatorDistance || 10;
    const estFare = Math.round(bookingModalPartner.baseFare + (bookingModalPartner.ratePerKm * estimatedDist));
    const platFee = Math.max(5, Math.round(estFare * 0.10)); // 10% Platform & Management Fee (Server, SOS, Verification)
    const driverPayout = estFare - platFee; // 90% Direct to Driver
    const randomOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newBooking: RideBookingRequest = {
      id: `RIDE-${Date.now().toString().slice(-6)}`,
      riderName: passengerName,
      riderPhone: passengerPhone,
      pickupLocation: pickupInput,
      dropLocation: dropInput,
      estimatedDistanceKm: estimatedDist,
      vehicleType: bookingModalPartner.vehicleType,
      preferredTiming: 'immediate',
      passengersCount: 1,
      partnerId: bookingModalPartner.id,
      partnerName: bookingModalPartner.name,
      partnerPhone: bookingModalPartner.phone,
      partnerVehicle: `${bookingModalPartner.vehicleName} (${bookingModalPartner.vehicleNumber})`,
      partnerPhoto: bookingModalPartner.photoUrl,
      estimatedFare: estFare,
      driverShareFare: driverPayout,
      platformFee: platFee,
      status: 'driver_arrived',
      rideOtp: randomOtp,
      createdAt: new Date().toLocaleTimeString()
    };

    setActiveBooking(newBooking);
    setBookingModalPartner(null);
    setBookingSuccessAlert(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner - Better than Rapido / 0% Commission */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1F1303] via-[#0D0802] to-black border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/50 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SOVEREIGN TRAVEL • 10% MANAGEMENT FEE • DIRECT CALL
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Police Verified Drivers (Zero Crime Record)
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black border border-blue-500/40">
              ⚡ 90% चालक कमाई • 10% ऐप प्रबंधन व सुरक्षा • नो सर्ज चार्ज
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
            कार व बाइक यात्रा साथी:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              पारदर्शी प्लेटफ़ॉर्म व प्रबंधन शुल्क मॉडल
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            कहीं भी जाना हो — तुरंत बाइक टैक्सी या कार बुक करें! जिनके पास अपनी कार या बाइक है, वे अपना सेवा क्षेत्र (Area), दूरी (Kilometers), दर (Rate/km) और संपर्क नंबर सीधे रजिस्टर कर सकते हैं। 
            कमर्शियल ऐप्स की 30-35% लूट के बजाय जितोमनी केवल <strong>10% न्यूनतम प्लेटफ़ॉर्म व प्रबंधन शुल्क</strong> लेता है, जिससे सर्वर, पुलिस सत्यापन, 24/7 आपातकालीन SOS व टेक संचालन निर्बाध चले — और <strong>90% शुद्ध कमाई सीधे चालक को मिले!</strong>
          </p>

          {/* Key Advantages Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Bike className="w-4 h-4" />
                <span>बाइक टैक्सी (₹6-8/km)</span>
              </div>
              <div className="text-[11px] text-slate-400">ट्रैफिक से तेज, हेलमेट सहित सुरक्षित सफर</div>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Car className="w-4 h-4" />
                <span>कार / कैब (₹11-14/km)</span>
              </div>
              <div className="text-[11px] text-slate-400">AC हैचबैक, सेडान व 7-सीटर फैमिली SUV</div>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>90/10 पारदर्शी विभाजन</span>
              </div>
              <div className="text-[11px] text-slate-400">90% चालक का मेहनताना, 10% ऐप संचालन फंड</div>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Compass className="w-4 h-4" />
                <span>लोकल व आउटस्टेशन</span>
              </div>
              <div className="text-[11px] text-slate-400">2 किमी से लेकर 350 किमी हाईवे तक</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Trip Banner if currently in progress */}
      {activeBooking && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#071F14] to-black border-2 border-emerald-500 shadow-xl space-y-3 animate-pulse">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 uppercase">
                  सक्रिय राइड (Trip In Progress)
                </span>
                <h4 className="text-base font-black text-white mt-1">
                  चालक पहुँच चुका है! {activeBooking.partnerName} ({activeBooking.partnerVehicle})
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">START OTP (चालक को बताएं)</div>
                <div className="text-2xl font-black text-[#FFD700] tracking-widest font-mono">
                  {activeBooking.rideOtp}
                </div>
              </div>

              <a 
                href={`tel:${activeBooking.partnerPhone}`}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30"
              >
                <PhoneCall className="w-4 h-4" />
                <span>कॉल चालक</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (confirm('क्या आप यह यात्रा पूर्ण करना चाहते हैं?')) {
                    setActiveBooking(null);
                    alert('यात्रा सफलतापूर्वक पूर्ण हुई! रेटिंग व समीक्षा दर्ज करने हेतु धन्यवाद।');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
              >
                यात्रा समाप्त करें
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-slate-300 border-t border-emerald-500/20">
            <div>
              <span className="text-slate-400">पिकअप:</span> {activeBooking.pickupLocation}
            </div>
            <div>
              <span className="text-slate-400">ड्रॉप:</span> {activeBooking.dropLocation}
            </div>
            <div>
              <span className="text-slate-400">अनुमानित दूरी:</span> {activeBooking.estimatedDistanceKm} km
            </div>
            <div>
              <span className="text-slate-400">निश्चित किराया:</span>{' '}
              <strong className="text-emerald-400 text-sm">₹{activeBooking.estimatedFare}</strong>{' '}
              <span className="text-[11px] text-slate-400">
                (चालक: ₹{activeBooking.driverShareFare || Math.round(activeBooking.estimatedFare * 0.9)} • ऐप प्रबंधन: ₹{activeBooking.platformFee || Math.round(activeBooking.estimatedFare * 0.1)})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Sub-Navigation: Search Rides vs Register Vehicle vs Fare Calculator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('find_ride')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'find_ride'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>🔍 राइड खोजें व ड्राइवर से संपर्क करें ({filteredPartners.length} चालक लाइव)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register_vehicle')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'register_vehicle'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>🚗🏍️ अपनी Car / Bike रजिस्टर करें (वाहन मालिक पोर्टल)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fare_calc')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'fare_calc'
                ? 'bg-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>📊 दूरी व किराया कैलकुलेटर (Rapido से तुलना)</span>
          </button>
        </div>

        {onOpenSOSModal && (
          <button
            type="button"
            onClick={onOpenSOSModal}
            className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 border border-red-400 shadow-md shadow-red-600/30"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>सफर में आपातकाल: 112 SOS</span>
          </button>
        )}
      </div>

      {/* VIEW 1: SEARCH & BOOK RIDES */}
      {activeTab === 'find_ride' && (
        <div className="space-y-6">
          {/* Universal High-Speed Search Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#07132B] border border-slate-700 shadow-xl space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="एरिया, गंतव्य या शहर खोजें (उदा: MP Nagar, Mandideep, Airport, इंदौर हाईवे, Sehore, BHEL)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-black/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Vehicle Type Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-slate-400 font-bold mr-1">वाहन:</span>
                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedVehicleType === 'all'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  सभी ({partnersList.length})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('bike')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'bike'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>बाइक टैक्सी</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('scooter')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'scooter'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>स्कूटर / EV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('car_hatchback')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'car_hatchback'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>कार (हैचबैक)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('car_sedan')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'car_sedan'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>सेडान (Dzire)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('car_suv')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'car_suv'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>7-सीटर SUV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVehicleType('women_safe')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    selectedVehicleType === 'women_safe'
                      ? 'bg-pink-600 text-white'
                      : 'bg-black/40 text-pink-300 hover:text-white border border-pink-500/40'
                  }`}
                >
                  <span>👩‍🦰 पिंक राइड (महिला पायलट)</span>
                </button>
              </div>

              {/* Distance Radius & Sort */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <select
                  value={selectedDistanceRange}
                  onChange={(e) => setSelectedDistanceRange(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-slate-300 text-xs focus:outline-none"
                >
                  <option value="all">दूरी: सभी किलोमीटर</option>
                  <option value="local">लोकल शहर (≤25 km)</option>
                  <option value="city">उपनगर (≤80 km)</option>
                  <option value="outstation">आउटस्टेशन हाईवे (100-350+ km)</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-slate-300 text-xs focus:outline-none"
                >
                  <option value="rating">क्रम: उच्चतम रेटिंग (4.9+)</option>
                  <option value="price_low">क्रम: सबसे कम किराया (₹/km)</option>
                  <option value="km_max">क्रम: अधिकतम किलोमीटर रेंज</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results Count & Quick Status */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div>
              कुल <strong className="text-white">{filteredPartners.length}</strong> सत्यापित वाहन चालक उपलब्ध हैं
              {searchQuery && <span> &bull; खोज शब्द: &ldquo;{searchQuery}&rdquo;</span>}
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>सभी चालकों का पुलिस व DL सत्यापन सक्रिय</span>
            </div>
          </div>

          {/* Driver Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                id={`driver-card-${partner.id}`}
                className="p-5 rounded-2xl bg-[#07132B]/90 hover:bg-[#0A1A38] border-2 border-slate-700/80 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 group"
              >
                {/* Header: Driver Photo, Verification Badges, Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={partner.photoUrl}
                        alt={partner.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/60 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#07132B]" title="Available Now" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-base font-black text-white">{partner.name}</h4>
                        {partner.isFemaleDriver && (
                          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/40">
                            पिंक पायलट
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <div className="flex items-center gap-1 text-[#FFD700] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#FFD700]" />
                          <span>{partner.rating.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({partner.reviewsCount} समीक्षाएं)</span>
                        </div>
                        <span>&bull;</span>
                        <span className="text-emerald-400 font-mono text-[11px]">{partner.tripsCompleted} ट्रिप पूर्ण</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Badge */}
                  <div className="text-right">
                    <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
                      <span className="text-xs text-slate-400">दर: </span>
                      <strong className="text-sm font-black">₹{partner.ratePerKm}</strong>
                      <span className="text-[10px] text-slate-400">/किमी</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      बेस फेयर: ₹{partner.baseFare}
                    </div>
                    <div className="text-[9px] text-emerald-400 mt-0.5 font-bold">
                      90% चालक • 10% ऐप शुल्क
                    </div>
                  </div>
                </div>

                {/* Vehicle Specs Bar */}
                <div className="p-3 rounded-xl bg-black/40 border border-slate-700/60 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                      {partner.vehicleType.includes('car') ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                    </span>
                    <div>
                      <div className="font-bold text-white">{partner.vehicleName}</div>
                      <div className="text-[11px] font-mono text-slate-400">{partner.vehicleNumber}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px]">
                    {partner.acAvailable && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono">
                        ❄️ AC
                      </span>
                    )}
                    {partner.helmetProvided && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono">
                        🪖 हेलमेट
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                      {partner.seatingCapacity} सीट
                    </span>
                  </div>
                </div>

                {/* Service Area & Kilometers Coverage Highlight */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>सेवा क्षेत्र (Operating Route & Area):</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono border border-amber-500/40">
                        अधिकतम {partner.maxKilometers} km तक
                      </span>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed font-sans">
                      {partner.serviceArea}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      <strong>रूट कवरेज:</strong> {partner.routeCoverage}
                    </div>
                  </div>
                </div>

                {/* Police & DL Verification Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span className="font-mono">{partner.policeVerificationId}</span>
                  </div>
                  <div className="font-mono text-slate-400">
                    DL: {partner.dlNumber}
                  </div>
                </div>

                {/* Direct Action Buttons: Call, WhatsApp, Book */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${partner.phone}`}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all text-center"
                    title={`Call ${partner.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>कॉल</span>
                  </a>

                  {/* Direct WhatsApp */}
                  <a
                    href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`नमस्ते ${partner.name} जी, मुझे आपकी Car/Bike राइड बुक करनी है। क्या आप अभी उपलब्ध हैं?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-green-700/80 hover:bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-green-500/40 shadow-md transition-all text-center"
                    title={`WhatsApp ${partner.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>व्हाट्सऐप</span>
                  </a>

                  {/* Instant Booking */}
                  <button
                    type="button"
                    onClick={() => {
                      setBookingModalPartner(partner);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md shadow-[#FFD700]/30 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>राइड बुक करें</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-[#07132B] border border-slate-700 space-y-4">
              <div className="text-4xl">🔍</div>
              <h4 className="text-lg font-bold text-white">कोई चालक नहीं मिला</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                आपके खोज शब्द &ldquo;{searchQuery}&rdquo; से संबंधित कोई चालक फिलहाल उपलब्ध नहीं है। कृपया दूसरा क्षेत्र खोजें या नीचे अपनी Car/Bike सेवा रजिस्टर करें!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedVehicleType('all');
                  setSelectedDistanceRange('all');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                सभी चालक देखें
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: REGISTER YOUR VEHICLE (FOR VEHICLE OWNERS) */}
      {activeTab === 'register_vehicle' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#07132B] via-[#040C1A] to-black border-2 border-amber-500/50 shadow-2xl space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
                  वाहन मालिक ऑन-बोर्डिंग • 0% कमीशन पार्टनर
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  अपनी Car या Bike सेवा रजिस्टर करें
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  यदि आपके पास कार, बाइक या स्कूटर है, तो अपनी सेवा दूरी, एरिया और फोन नंबर रजिस्टर करें। कोई कमीशन नहीं, यात्री आपको सीधे कॉल करेंगे!
                </p>
              </div>
              <div className="text-4xl hidden sm:block">🚗🏍️</div>
            </div>

            {regSubmittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500 space-y-4 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto text-2xl font-black">
                  ✓
                </div>
                <h4 className="text-lg font-black text-white">
                  बधाई! आपकी वाहन सेवा सफलतापूर्वक रजिस्टर हो गई है!
                </h4>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  आपका वाहन अब जिटोम्नी राइडर पूल में लाइव है। यात्री अब आपके एरिया और किलोमीटर रेंज में सर्च करके सीधे आपके मोबाइल <strong>{regPhone}</strong> पर कॉल व बुकिंग कर सकते हैं।
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('find_ride');
                      setRegSubmittedSuccess(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-yellow-300"
                  >
                    सर्च लिस्ट में अपनी प्रोफाइल देखें →
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegSubmittedSuccess(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 border border-slate-700"
                  >
                    एक और वाहन जोड़ें
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterDriver} className="space-y-5 text-xs">
                {/* 1. Personal & Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <span>1. व्यक्तिगत एवं संपर्क जानकारी</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">चालक का पूरा नाम *</label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="उदा. राहुल शर्मा"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">मोबाइल नंबर (कॉलिंग हेतु) *</label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="उदा. 98261XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">व्हाट्सऐप नंबर (वैकल्पिक)</label>
                      <input
                        type="tel"
                        value={regWhatsapp}
                        onChange={(e) => setRegWhatsapp(e.target.value)}
                        placeholder="उदा. 98261XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Vehicle Details */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <span>2. वाहन का प्रकार एवं विवरण</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">वाहन श्रेणी *</label>
                      <select
                        value={regVehicleType}
                        onChange={(e) => {
                          const val = e.target.value as VehicleCategoryType;
                          setRegVehicleType(val);
                          if (val === 'bike') {
                            setRegRatePerKm(7);
                            setRegBaseFare(25);
                          } else if (val === 'scooter') {
                            setRegRatePerKm(8);
                            setRegBaseFare(25);
                          } else if (val === 'car_hatchback') {
                            setRegRatePerKm(12);
                            setRegBaseFare(70);
                            setRegAcAvailable(true);
                          } else if (val === 'car_sedan') {
                            setRegRatePerKm(13);
                            setRegBaseFare(100);
                            setRegAcAvailable(true);
                          } else if (val === 'car_suv') {
                            setRegRatePerKm(16);
                            setRegBaseFare(150);
                            setRegAcAvailable(true);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="bike">🏍️ मोटरसाइकिल / बाइक टैक्सी</option>
                        <option value="scooter">🛵 स्कूटर (Activa / Jupiter)</option>
                        <option value="electric_ev">⚡ इलेक्ट्रिक 2W / EV</option>
                        <option value="car_hatchback">🚗 कार - हैचबैक (WagonR / Swift)</option>
                        <option value="car_sedan">🚗 कार - सेडान (Dzire / Etios)</option>
                        <option value="car_suv">🚙 7-सीटर SUV (Ertiga / Innova)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">वाहन का नाम / मॉडल *</label>
                      <input
                        type="text"
                        required
                        value={regVehicleName}
                        onChange={(e) => setRegVehicleName(e.target.value)}
                        placeholder="उदा. Hero Splendor Plus / Swift Dzire"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">वाहन नंबर (RC Plate)</label>
                      <input
                        type="text"
                        value={regVehicleNumber}
                        onChange={(e) => setRegVehicleNumber(e.target.value.toUpperCase())}
                        placeholder="उदा. MP 04 ZB 1234"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">ड्राइविंग लाइसेंस (DL) नंबर</label>
                      <input
                        type="text"
                        value={regDlNumber}
                        onChange={(e) => setRegDlNumber(e.target.value.toUpperCase())}
                        placeholder="उदा. MP04-2020-008492"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">प्राथमिक शहर (Operating City)</label>
                      <input
                        type="text"
                        value={regOperatingCity}
                        onChange={(e) => setRegOperatingCity(e.target.value)}
                        placeholder="उदा. भोपाल, इंदौर, जबलपुर, सीहोर..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Service Area & Coverage Kilometers (Crucial User Requirement) */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <span>3. सेवा क्षेत्र एवं अधिकतम किलोमीटर सीमा (कहाँ से कहाँ तक)</span>
                  </h4>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">
                      किस एरिया से कहाँ तक सेवा दे रहे हैं? (Service Route / Locations) *
                    </label>
                    <input
                      type="text"
                      required
                      value={regServiceArea}
                      onChange={(e) => setRegServiceArea(e.target.value)}
                      placeholder="उदा. एमपी नगर, न्यू मार्केट, रानी कमलापति स्टेशन से मंडीदीप व बीएचईएल तक"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[11px] text-slate-400">
                      यह जानकारी सर्च में सबसे ऊपर दिखाई देगी, ताकि सही यात्री आपको कॉल कर सकें।
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">
                        अधिकतम कितने किमी तक सेवा देंगे?
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={5}
                          max={600}
                          value={regMaxKm}
                          onChange={(e) => setRegMaxKm(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                        <span className="text-slate-400 font-bold whitespace-nowrap">KM तक</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">
                        दर प्रति किलोमीटर (₹/km)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={4}
                          max={50}
                          value={regRatePerKm}
                          onChange={(e) => setRegRatePerKm(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                        <span className="text-slate-400 font-bold whitespace-nowrap">₹/km</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">
                        बेस फेयर (न्यूनतम शुल्क)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={10}
                          max={300}
                          value={regBaseFare}
                          onChange={(e) => setRegBaseFare(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                        <span className="text-slate-400 font-bold whitespace-nowrap">₹</span>
                      </div>
                    </div>
                  </div>

                  {/* Facilities Checkboxes */}
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={regHelmetProvided}
                        onChange={(e) => setRegHelmetProvided(e.target.checked)}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      <span>सवारी हेतु हेलमेट उपलब्ध है</span>
                    </label>

                    {regVehicleType.includes('car') && (
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={regAcAvailable}
                          onChange={(e) => setRegAcAvailable(e.target.checked)}
                          className="rounded border-slate-700 text-amber-500 focus:ring-0"
                        />
                        <span>गाड़ी में AC उपलब्ध है</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* 4. App Management & Platform Fee Plan */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      4. ऐप प्रबंधन एवं प्लेटफ़ॉर्म शुल्क मॉडल (Platform & Management Fee Plan)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                      No 30% Commercial Cut
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label 
                      onClick={() => setRegPlatformPlan('percentage_10')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        regPlatformPlan === 'percentage_10'
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-black/40 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-amber-300">10% प्रति-राइड प्रबंधन शुल्क (Standard)</span>
                        <input
                          type="radio"
                          name="feePlan"
                          checked={regPlatformPlan === 'percentage_10'}
                          onChange={() => setRegPlatformPlan('percentage_10')}
                          className="text-amber-500 focus:ring-0"
                        />
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        प्रत्येक पूर्ण ट्रिप पर <strong>90% सीधी कमाई आपकी</strong> और केवल 10% ऐप सर्वर, लाइव ट्रैकिंग व 24/7 SOS सुरक्षा प्रबंधन फंड में।
                      </p>
                    </label>

                    <label 
                      onClick={() => setRegPlatformPlan('daily_fleet_pass')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        regPlatformPlan === 'daily_fleet_pass'
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-black/40 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-cyan-300">
                          दैनिक फ़्लीट पास ({regVehicleType.includes('car') ? '₹40/दिन' : '₹15/दिन'})
                        </span>
                        <input
                          type="radio"
                          name="feePlan"
                          checked={regPlatformPlan === 'daily_fleet_pass'}
                          onChange={() => setRegPlatformPlan('daily_fleet_pass')}
                          className="text-cyan-500 focus:ring-0"
                        />
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        दिन भर में जितनी मर्जी राइड करें, <strong>100% किराया आपका!</strong> केवल एक निश्चित दैनिक पास शुल्क।
                      </p>
                    </label>
                  </div>

                  <div className="text-[10px] text-slate-400 leading-normal bg-black/40 p-2.5 rounded-lg border border-slate-800">
                    💡 <strong>पारदर्शिता नोट:</strong> कमर्शियल कंपनियाँ ड्राइवरों से 30% से 35% लूटती हैं। जितोमनी पर लिया जाने वाला यह 10% शुल्क केवल प्लेटफ़ॉर्म सर्वर, पुलिस चरित्र वेरिफिकेशन व 24/7 आपातकालीन SOS के सतत प्रबंधन हेतु उपयोग होता है।
                  </div>
                </div>

                {/* 5. Aadhaar & Police Clearance Declarations */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>सॉवरेन सुरक्षा प्रतिज्ञा (Sovereign Trust Agreement):</span>
                  </div>
                  <p>
                    मैं प्रमाणित करता हूँ कि मेरे वाहन का बीमा व प्रदूषण वैध है, और मेरा कोई आपराधिक रिकॉर्ड नहीं है। मैं यात्रियों के साथ सम्मानजनक व्यवहार और निर्धारित दर से अधिक किराया न लेने की शपथ लेता हूँ।
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-[#FFD700] to-yellow-500 text-slate-950 font-black text-sm hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>मेरी सेवा तुरंत सक्रिय करें (Go Live on Jitomni)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: FARE CALCULATOR & COMPARISON (Rapido / Ola vs Jitomni 0% Commission) */}
      {activeTab === 'fare_calc' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#07132B] via-[#040C1A] to-black border-2 border-cyan-500/50 shadow-2xl space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40">
                FAIR FARE CALCULATOR • RAPIDO & OLA COMPARISON
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                दूरी व किराया कैलकुलेटर: देखें अपनी सीधी बचत!
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                कमर्शियल ऐप्स (Rapido, Ola, Uber) ड्राइवरों से 25% से 35% कमीशन काटते हैं और पीक ऑवर में सर्ज प्राइसिंग जोड़ते हैं। जिटोम्नी में 0% कमीशन से आपको मिलता है सबसे सस्ता किराया!
              </p>
            </div>

            {/* Pickup and Drop Presets / Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-bold">पिकअप स्थान (Pickup)</label>
                <input
                  type="text"
                  value={estimatorPickup}
                  onChange={(e) => setEstimatorPickup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">ड्रॉप गंतव्य (Drop Destination)</label>
                <input
                  type="text"
                  value={estimatorDrop}
                  onChange={(e) => setEstimatorDrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Quick Location Pills */}
            <div className="space-y-1.5 text-xs">
              <span className="text-slate-400 font-bold">त्वरित दूरी टेस्ट करें:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {quickLocations.map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => {
                      setEstimatorDrop(loc.name);
                      setEstimatorDistance(loc.distFromCenter || 8.5);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-black/50 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white whitespace-nowrap text-[11px]"
                  >
                    {loc.name} ({loc.distFromCenter} km)
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider & Vehicle Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/50 border border-slate-800 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1 text-slate-300">
                  <span>यात्रा दूरी (Distance in KM):</span>
                  <span className="text-cyan-400 font-mono text-sm">{estimatorDistance} किमी</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={250}
                  step={0.5}
                  value={estimatorDistance}
                  onChange={(e) => setEstimatorDistance(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setEstimatorVehicle('bike')}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 border transition-all ${
                    estimatorVehicle === 'bike'
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-black/40 text-slate-300 border-slate-700'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>बाइक टैक्सी (₹7/km)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEstimatorVehicle('car')}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 border transition-all ${
                    estimatorVehicle === 'car'
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-black/40 text-slate-300 border-slate-700'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>कार कैब (₹12/km)</span>
                </button>
              </div>
            </div>

            {/* Comparative Pricing Results Card */}
            {(() => {
              const jitomniBase = estimatorVehicle === 'bike' ? 25 : 70;
              const jitomniRate = estimatorVehicle === 'bike' ? 7 : 12;
              const jitomniTotal = Math.round(jitomniBase + (jitomniRate * estimatorDistance));

              const otherBase = estimatorVehicle === 'bike' ? 35 : 100;
              const otherRate = estimatorVehicle === 'bike' ? 11 : 18;
              const otherTotal = Math.round(otherBase + (otherRate * estimatorDistance) + 20); // including platform fee & commission markup
              const savings = Math.max(15, otherTotal - jitomniTotal);

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Jitomni Fair Fare */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-black border-2 border-emerald-500 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        जितोमनी 90/10 सॉवरेन मॉडल
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">नो सर्ज प्राइसिंग</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                      ₹{jitomniTotal}
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>चालक की सीधी कमाई (90%):</span>
                        <strong className="text-emerald-400 font-mono">₹{Math.round(jitomniTotal * 0.9)}</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>ऐप प्रबंधन व सुरक्षा फंड (10%):</span>
                        <strong className="text-amber-400 font-mono">₹{Math.round(jitomniTotal * 0.1)}</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      यह 10% शुल्क सर्वर इंफ्रास्ट्रक्चर, पुलिस चरित्र सत्यापन, और 24/7 आपातकालीन SOS रिस्पॉन्स टीम के सुचारू संचालन हेतु लिया जाता है।
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('find_ride');
                        setSearchQuery(estimatorDrop.split(' ')[0] || '');
                      }}
                      className="w-full mt-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>इस रूट के लिए चालक देखें</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Commercial Apps with 30% cut */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 to-black border border-red-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/40">
                        Rapido / Ola / Uber (कमर्शियल)
                      </span>
                      <span className="text-xs text-red-400 font-bold">30-35% कमीशन कटौती</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-black text-slate-400 font-mono line-through">
                      ₹{otherTotal}
                    </div>

                    <p className="text-xs text-red-300 font-bold">
                      जितोमनी पर आपकी कुल बचत: ₹{savings} (लगभग {Math.round((savings / otherTotal) * 100)}% सस्ता!)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      अन्य ऐप्स में सर्ज प्राइसिंग, हिडन चार्जेस और कैंसिलेशन पेनल्टी जोड़ी जाती है जिससे ड्राइवर और सवारी दोनों का शोषण होता है।
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* POPUP MODAL: INSTANT RIDE BOOKING */}
      {bookingModalPartner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#07132B] border-2 border-amber-500/60 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  {bookingModalPartner.vehicleType.includes('car') ? <Car className="w-5 h-5" /> : <Bike className="w-5 h-5" />}
                </span>
                <div>
                  <h4 className="text-base font-black text-white">राइड बुक करें (Confirm Ride)</h4>
                  <p className="text-xs text-slate-400">
                    चालक: {bookingModalPartner.name} ({bookingModalPartner.vehicleName})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBookingModalPartner(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-bold">यात्री का नाम *</label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="अपना पूरा नाम दर्ज करें"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">यात्री का मोबाइल नंबर *</label>
                <input
                  type="tel"
                  required
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  placeholder="उदा. 98261XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">पिकअप स्थान</label>
                  <input
                    type="text"
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">ड्रॉप गंतव्य</label>
                  <input
                    type="text"
                    value={dropInput}
                    onChange={(e) => setDropInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Fare Calculation Snapshot */}
              {(() => {
                const totalEst = Math.round(bookingModalPartner.baseFare + (bookingModalPartner.ratePerKm * estimatorDistance));
                const platFee = Math.max(5, Math.round(totalEst * 0.10));
                const driverShare = totalEst - platFee;

                return (
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>अनुमानित दूरी:</span>
                      <span className="font-mono text-white">{estimatorDistance} km</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>दर (₹{bookingModalPartner.ratePerKm}/km + बेस ₹{bookingModalPartner.baseFare}):</span>
                      <span className="font-mono text-emerald-400">नो सर्ज</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300 pt-1 border-t border-slate-800">
                      <span>चालक हिस्सा (90% Driver Share):</span>
                      <span className="font-mono text-emerald-300 font-bold">₹{driverShare}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>ऐप प्रबंधन व सुरक्षा (10% Platform Fee):</span>
                      <span className="font-mono text-amber-300 font-bold">₹{platFee}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-amber-400 pt-1.5 border-t border-slate-700">
                      <span>कुल देय किराया (Total Fare):</span>
                      <span className="text-base font-mono">₹{totalEst}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                      💡 10% प्रबंधन शुल्क सर्वर, मैप्स और 24/7 SOS सुरक्षा नेटवर्क के संचालन हेतु लिया जाता है।
                    </div>
                  </div>
                );
              })()}

              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>बुकिंग करते ही 4-अंकीय Start OTP व ड्राइवर लाइव लोकेशन प्राप्त होगी।</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingModalPartner(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                रद्द करें
              </button>

              <button
                type="button"
                onClick={handleConfirmRideBooking}
                className="flex-1 py-2.5 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-1.5"
              >
                <span>राइड कन्फर्म करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
