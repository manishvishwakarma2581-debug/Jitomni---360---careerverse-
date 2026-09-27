import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  X, 
  Calendar, 
  Users, 
  Filter, 
  QrCode, 
  Bed, 
  Wifi, 
  Coffee, 
  Car, 
  PlusCircle, 
  Check, 
  Share2, 
  Download, 
  Printer, 
  Compass, 
  AlertCircle,
  Zap,
  Heart
} from 'lucide-react';
import { 
  HotelProperty, 
  HotelStayCategory, 
  HotelBookingRecord, 
  HotelRoomType,
  INITIAL_HOTELS_POOL, 
  ALL_INDIAN_HOTEL_CITIES 
} from '../../data/hotelData';
import { Language } from '../../types';

interface HotelBookingHubProps {
  lang: Language;
  initialSelectedCity?: string;
  initialSelectedHotelId?: string;
  onOpenSOSModal?: () => void;
}

export const HotelBookingHub: React.FC<HotelBookingHubProps> = ({
  lang: _lang,
  initialSelectedCity = 'Rewa',
  initialSelectedHotelId,
  onOpenSOSModal
}) => {
  // Top Active View Tab: 'search' | 'my_bookings' | 'partner_register'
  const [activeTab, setActiveTab] = useState<'search' | 'my_bookings' | 'partner_register'>('search');

  // Search & Filter State
  const [selectedCity, setSelectedCity] = useState<string>(initialSelectedCity);
  const [selectedCategory, setSelectedCategory] = useState<HotelStayCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookingType, setBookingType] = useState<'nightly' | 'hourly_transit'>('nightly');

  // Dates state
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(todayStr);
  const [checkOutDate, setCheckOutDate] = useState<string>(tomorrowStr);
  const [transitHours, setTransitHours] = useState<number>(4);
  const [guestCount, setGuestCount] = useState<number>(2);

  // Master Hotels Pool (Local storage with initial fallback)
  const [hotelsList, setHotelsList] = useState<HotelProperty[]>(() => {
    const saved = localStorage.getItem('jitomni_hotels_pool');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_HOTELS_POOL;
  });

  // User's Bookings Pool
  const [myBookings, setMyBookings] = useState<HotelBookingRecord[]>(() => {
    const saved = localStorage.getItem('jitomni_hotel_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Active Booking Modal State
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<HotelProperty | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<HotelRoomType | null>(null);

  // Guest input form in modal
  const [guestName, setGuestName] = useState<string>('राजेश कुमार');
  const [guestPhone, setGuestPhone] = useState<string>('+91 98261 55902');
  const [guestAadhaar, setGuestAadhaar] = useState<string>('XXXX-XXXX-9842');
  const [specialRequest, setSpecialRequest] = useState<string>('मरीज के लिए ग्राउंड फ्लोर या लिफ्ट एक्सेस वाला कमरा दें।');
  const [paymentOption, setPaymentOption] = useState<'upi' | 'pay_at_hotel'>('pay_at_hotel');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);

  // Completed Booking Voucher Modal
  const [activeVoucher, setActiveVoucher] = useState<HotelBookingRecord | null>(null);

  // Hotelier Partner Registration Form State
  const [regHotelName, setRegHotelName] = useState<string>('');
  const [regCategory, setRegCategory] = useState<HotelProperty['category']>('near_hospital');
  const [regCity, setRegCity] = useState<string>('Rewa');
  const [regAddress, setRegAddress] = useState<string>('');
  const [regLandmark, setRegLandmark] = useState<string>('');
  const [regHospitalName, setRegHospitalName] = useState<string>('संजय गांधी स्मृति अस्पताल (SGMH)');
  const [regHospitalKm, setRegHospitalKm] = useState<number>(0.5);
  const [regStationName, setRegStationName] = useState<string>('रीवा रेलवे स्टेशन');
  const [regStationKm, setRegStationKm] = useState<number>(2.0);
  const [regPhone, setRegPhone] = useState<string>('');
  const [regStartingPrice, setRegStartingPrice] = useState<number>(699);
  const [regTotalRooms, setRegTotalRooms] = useState<number>(12);
  const [regAmenities, setRegAmenities] = useState<string[]>([
    '24x7 एसी (AC)',
    'फ्री वाईफाई',
    'गर्म पानी (Geyser)',
    'लिफ्ट सुविधा',
    'अस्पताल सहायता'
  ]);
  const [regSubmittedSuccess, setRegSubmittedSuccess] = useState<boolean>(false);

  // Sync with initialSelectedHotelId if passed
  useEffect(() => {
    if (initialSelectedHotelId) {
      const match = hotelsList.find((h) => h.id === initialSelectedHotelId);
      if (match) {
        setSelectedHotelForBooking(match);
        setSelectedRoomType(match.roomTypes[0] || null);
      }
    }
  }, [initialSelectedHotelId, hotelsList]);

  // Persist hotels & bookings to localStorage
  const saveHotels = (newList: HotelProperty[]) => {
    setHotelsList(newList);
    localStorage.setItem('jitomni_hotels_pool', JSON.stringify(newList));
  };

  const saveBookings = (newBookings: HotelBookingRecord[]) => {
    setMyBookings(newBookings);
    localStorage.setItem('jitomni_hotel_bookings', JSON.stringify(newBookings));
  };

  // Filtered Hotels
  const filteredHotels = useMemo(() => {
    return hotelsList.filter((hotel) => {
      // City Match (case insensitive match)
      if (selectedCity && selectedCity !== 'All India' && hotel.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Category Match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'near_hospital' && hotel.category !== 'near_hospital') return false;
        if (selectedCategory === 'near_station' && hotel.category !== 'near_station') return false;
        if (selectedCategory === 'budget' && hotel.startingPrice > 999) return false;
        if (selectedCategory === 'luxury' && hotel.category !== 'luxury') return false;
        if (selectedCategory === 'dharamshala' && hotel.category !== 'dharamshala') return false;
        if (selectedCategory === 'transit_hourly' && !hotel.roomTypes.some(r => r.pricePerHourTransit)) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = 
          hotel.name.toLowerCase().includes(q) ||
          hotel.address.toLowerCase().includes(q) ||
          hotel.landmark.toLowerCase().includes(q) ||
          hotel.hospitalName.toLowerCase().includes(q) ||
          hotel.stationName.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      return true;
    });
  }, [hotelsList, selectedCity, selectedCategory, searchQuery]);

  // Calculate Nights
  const calculateNights = () => {
    const d1 = new Date(checkInDate).getTime();
    const d2 = new Date(checkOutDate).getTime();
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  // Open Booking Modal for a Hotel
  const handleOpenBooking = (hotel: HotelProperty, room?: HotelRoomType) => {
    setSelectedHotelForBooking(hotel);
    setSelectedRoomType(room || hotel.roomTypes[0] || null);
  };

  // Handle Confirm Booking
  const handleConfirmBooking = () => {
    if (!selectedHotelForBooking || !selectedRoomType) return;
    if (!guestName.trim() || !guestPhone.trim()) {
      alert('कृपया अतिथि का नाम एवं मोबाइल नंबर दर्ज करें।');
      return;
    }

    setIsSubmittingBooking(true);

    const nights = bookingType === 'nightly' ? calculateNights() : 1;
    const roomRate = bookingType === 'nightly' 
      ? selectedRoomType.pricePerNight 
      : (selectedRoomType.pricePerHourTransit || 299);
    
    const totalRoomCharge = roomRate * nights;
    const platformFee = 0; // 0% platform fee for customer
    const taxGst = Math.round(totalRoomCharge * 0.05); // 5% GST
    const totalPayable = totalRoomCharge + platformFee + taxGst;

    const newBookingId = `JIT-HTL-${Math.floor(10000 + Math.random() * 90000)}`;
    const otpCode = String(Math.floor(1000 + Math.random() * 9000));

    const newRecord: HotelBookingRecord = {
      bookingId: newBookingId,
      hotelId: selectedHotelForBooking.id,
      hotelName: selectedHotelForBooking.name,
      hotelCity: selectedHotelForBooking.city,
      hotelPhone: selectedHotelForBooking.phone,
      hotelAddress: selectedHotelForBooking.address,
      roomTypeId: selectedRoomType.id,
      roomTypeName: selectedRoomType.name,
      checkInDate: checkInDate,
      checkOutDate: bookingType === 'nightly' ? checkOutDate : checkInDate,
      checkInTime: selectedHotelForBooking.checkInTime,
      checkOutTime: selectedHotelForBooking.checkOutTime,
      bookingType: bookingType,
      transitHours: bookingType === 'hourly_transit' ? transitHours : undefined,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      guestAadhaarMasked: guestAadhaar.trim(),
      guestCount: guestCount,
      roomCount: 1,
      totalNights: nights,
      roomRate: roomRate,
      totalRoomCharge: totalRoomCharge,
      platformFee: platformFee,
      taxGst: taxGst,
      totalPayable: totalPayable,
      paymentStatus: paymentOption === 'upi' ? 'paid_online' : 'pay_at_hotel',
      paymentMethod: paymentOption,
      bookingStatus: 'confirmed',
      otpCheckIn: otpCode,
      qrVerificationPayload: `JITOMNI-HOTEL-PASS|ID:${newBookingId}|HOTEL:${selectedHotelForBooking.name}|GUEST:${guestName}|OTP:${otpCode}|PAYMENT:${paymentOption === 'upi' ? 'PAID_ONLINE' : 'PAY_AT_HOTEL'}`,
      createdAt: new Date().toISOString(),
      specialRequests: specialRequest
    };

    setTimeout(() => {
      const updated = [newRecord, ...myBookings];
      saveBookings(updated);
      setIsSubmittingBooking(false);
      setSelectedHotelForBooking(null);
      setActiveVoucher(newRecord);
    }, 700);
  };

  // Handle Hotel Partner Onboarding Submit
  const handleRegisterHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regHotelName.trim() || !regPhone.trim() || !regAddress.trim()) {
      alert('कृपया होटल का नाम, फोन और पता भरें।');
      return;
    }

    const newHotel: HotelProperty = {
      id: `htl-custom-${Date.now()}`,
      name: regHotelName.trim(),
      city: regCity,
      state: 'Madhya Pradesh',
      address: regAddress.trim(),
      landmark: regLandmark.trim() || 'शहर केंद्र के पास',
      category: regCategory,
      rating: 5.0,
      reviewsCount: 1,
      distanceHospitalKm: regHospitalKm,
      hospitalName: regHospitalName,
      distanceStationKm: regStationKm,
      stationName: regStationName,
      phone: regPhone.trim(),
      whatsapp: regPhone.trim(),
      startingPrice: regStartingPrice,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80'],
      amenities: regAmenities,
      isVerified: true,
      verifiedBadge: 'JITOMNI Verified Direct Partner',
      description: `होटल पार्टनर द्वारा पंजीकृत संपत्ति। ${regTotalRooms} सुसज्जित कमरे उपलब्ध हैं।`,
      checkInTime: '12:00 PM',
      checkOutTime: '11:00 AM',
      roomTypes: [
        {
          id: `rt-${Date.now()}-1`,
          name: 'डीलक्स एसी रूम (Deluxe AC Room)',
          capacity: 2,
          bedType: 'Double Bed',
          pricePerNight: regStartingPrice,
          pricePerHourTransit: Math.round(regStartingPrice * 0.4),
          features: ['AC', 'Free WiFi', 'Attached Washroom', 'Power Backup'],
          isAvailable: true,
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=80'
        }
      ]
    };

    const updated = [newHotel, ...hotelsList];
    saveHotels(updated);
    setRegSubmittedSuccess(true);
    setTimeout(() => {
      setActiveTab('search');
      setSelectedCity(newHotel.city);
      setRegSubmittedSuccess(false);
      // Reset form
      setRegHotelName('');
      setRegPhone('');
      setRegAddress('');
      setRegLandmark('');
    }, 1800);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* SOVEREIGN PAN-INDIA HOTEL HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#040C1A] border-2 border-[#FFD700] p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Building2 className="w-3.5 h-3.5 fill-slate-950" />
                <span>PAN-INDIA HOTEL & STAY HUB</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>100% VERIFIED STAYS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-400/30">
                0% SURGE • NO HIDDEN FEES
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight">
              अखिल भारतीय होटल, लॉज, सेवा सदन व विश्रामालय बुकिंग
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              अस्पतालों (SGMH, AIIMS), रेलवे स्टेशनों व तीर्थ स्थलों के निकटतम 100% वेरिफाइड कमरों की तत्काल बुकिंग। मरीजों के परिजनों के लिए विशेष रियायती दरें, 4-घंटे ट्रांजिट रूम और सुरक्षित फैमिली लॉज।
            </p>
          </div>

          {/* Quick SOS & Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenSOSModal && (
              <button
                type="button"
                onClick={onOpenSOSModal}
                className="px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-black text-xs flex items-center gap-1.5 shadow-lg border border-red-400/40 animate-pulse"
                title="इमरजेंसी सहायता"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>SOS हेल्प</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('partner_register')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>होटल पार्टनर बनें</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* TOP NAVIGATION TABS */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/30'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>होटल खोजें व बुक करें ({filteredHotels.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('my_bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              activeTab === 'my_bookings'
                ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/30'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>मेरी बुकिंग्स व वाउचर</span>
            {myBookings.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-mono font-black">
                {myBookings.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('partner_register')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              activeTab === 'partner_register'
                ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 border-[#FFD700] shadow-lg shadow-[#FFD700]/30'
                : 'bg-[#07132B] text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>होटल / लॉज मालिक पार्टनर पोर्टल</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Aadhaar Verified Check-In</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: SEARCH & BOOK HOTELS */}
      {/* ========================================================================= */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          {/* SEARCH & FILTER CONTROLS CARD */}
          <div className="rounded-2xl bg-[#07132B] border border-[#FFD700]/40 p-4 sm:p-5 shadow-xl space-y-4">
            {/* Top row: City Picker + Booking Mode (Nightly vs Hourly Transit) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* City Selection */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  शहर चुनें (Select City)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#FFD700] absolute left-3 top-2.5" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="All India">🇮🇳 पूरे भारत में खोजें (All India)</option>
                    {ALL_INDIAN_HOTEL_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stay Mode (Nightly vs Hourly Transit) */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  बुकिंग का प्रकार (Booking Type)
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setBookingType('nightly')}
                    className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                      bookingType === 'nightly'
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🌙 24-घंटे स्टे
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('hourly_transit')}
                    className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                      bookingType === 'hourly_transit'
                        ? 'bg-emerald-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⏳ 4-घंटे ट्रांजिट
                  </button>
                </div>
              </div>

              {/* Check-In Date */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  चेक-इन तिथि (Check-In Date)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* Check-Out Date / Transit Duration */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  {bookingType === 'nightly' ? 'चेक-आउट तिथि (Check-Out)' : 'ट्रांजिट अवधि (Transit Duration)'}
                </label>
                {bookingType === 'nightly' ? (
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Clock className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                    <select
                      value={transitHours}
                      onChange={(e) => setTransitHours(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#FFD700]"
                    >
                      <option value={3}>3 घंटे फ्रेश-अप (₹249)</option>
                      <option value={4}>4 घंटे फ्रेश-अप (₹299)</option>
                      <option value={6}>6 घंटे विश्राम (₹399)</option>
                      <option value={8}>8 घंटे डे-यूज (₹499)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: Text Search + Quick Category Filters */}
            <div className="flex flex-col md:flex-row items-center gap-3 pt-2 border-t border-slate-800">
              <div className="relative w-full md:w-1/3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="होटल का नाम, अस्पताल या लैंडमार्क खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full md:w-2/3 py-1">
                {[
                  { id: 'all', label: 'सभी स्टे (All)', icon: '🏨' },
                  { id: 'near_hospital', label: 'अस्पताल के निकट (Near Hospital)', icon: '🏥' },
                  { id: 'near_station', label: 'रेलवे स्टेशन पास (Near Station)', icon: '🚂' },
                  { id: 'budget', label: 'बजट होटल (Under ₹999)', icon: '💰' },
                  { id: 'dharamshala', label: 'सेवा सदन व धर्मशाला', icon: '🛕' },
                  { id: 'transit_hourly', label: 'ट्रांजिट फ्रेश-अप (Hourly)', icon: '⏳' },
                  { id: 'luxury', label: 'लग्जरी व डीलक्स', icon: '🌟' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as HotelStayCategory)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HOTELS LISTING GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHotels.length === 0 ? (
              <div className="col-span-full py-12 text-center rounded-2xl bg-[#07132B]/60 border border-slate-800 p-8 space-y-3">
                <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">
                  चयनित फिल्टर के अनुसार कोई होटल नहीं मिला
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  कृपया शहर बदलें या "सभी स्टे" श्रेणी चुनें, अथवा स्थानीय होटल को हमारे साथ रजिस्टर करने के लिए आमंत्रित करें।
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedCity('All India'); }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                >
                  फिल्टर हटाएं (Reset Filters)
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#040E24] border border-[#FFD700]/30 hover:border-[#FFD700] transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
                >
                  {/* Hotel Image & Top Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E24] via-transparent to-black/50" />

                    {/* Verified & Category Badge */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[#FFD700] text-[10px] font-black border border-[#FFD700]/40 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>{hotel.city}</span>
                      </span>

                      {hotel.category === 'near_hospital' && (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow">
                          🏥 अस्पताल 800m
                        </span>
                      )}

                      {hotel.category === 'dharamshala' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black shadow">
                          🛕 धर्मार्थ सेवा
                        </span>
                      )}
                    </div>

                    {/* Star Rating */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-black flex items-center gap-1 border border-slate-700">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-[9px] text-slate-400">({hotel.reviewsCount})</span>
                    </div>

                    {/* Starting Price Pill */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-lg">
                      {bookingType === 'hourly_transit' 
                        ? `₹${hotel.roomTypes[0]?.pricePerHourTransit || 299} / 4-घंटे`
                        : `₹${hotel.startingPrice} / रात`
                      }
                    </div>
                  </div>

                  {/* Hotel Info Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-black text-white leading-snug line-clamp-1 group-hover:text-[#FFD700] transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-slate-300 flex items-start gap-1 leading-snug line-clamp-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{hotel.address}</span>
                      </p>

                      {/* Distance tags */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="text-xs">🏥</span>
                          <span className="truncate">{hotel.hospitalName.split(' ')[0]}: <strong>{hotel.distanceHospitalKm} km</strong></span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="text-xs">🚂</span>
                          <span className="truncate">स्टेशन: <strong>{hotel.distanceStationKm} km</strong></span>
                        </div>
                      </div>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-slate-300 font-medium"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-amber-300">
                            +{hotel.amenities.length - 3} और
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                      <a
                        href={`tel:${hotel.phone}`}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 flex items-center justify-center shrink-0 transition-colors"
                        title="होटल रिसेप्शन से बात करें"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleOpenBooking(hotel)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#FFD700]/20 transition-all"
                      >
                        <span>कमरा चुनें व बुक करें</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: MY BOOKINGS & QR VOUCHERS */}
      {/* ========================================================================= */}
      {activeTab === 'my_bookings' && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-[#07132B] border border-slate-800 p-4 sm:p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#FFD700]" />
                <span>आपकी होटल बुकिंग्स व डिजिटल चेक-इन वाउचर</span>
              </h2>
              <p className="text-xs text-slate-400">
                होटल रिसेप्शन पर यही वाउचर या चेक-इन OTP दिखाएं। त्वरित एंट्री सुनिश्चित है।
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
            >
              <Search className="w-3 h-3" />
              <span>नया होटल बुक करें</span>
            </button>
          </div>

          {myBookings.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#07132B]/60 border border-slate-800 p-8 space-y-3">
              <Bed className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">
                अभी आपकी कोई सक्रिय होटल बुकिंग नहीं है
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                रीवा, भोपाल, इंदौर या दिल्ली में अस्पताल व रेलवे स्टेशन के पास स्वच्छ कमरे बुक करने के लिए "होटल खोजें" पर क्लिक करें।
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 font-black text-xs"
              >
                होटल सूची देखें
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myBookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="rounded-2xl bg-[#0A1931] border-2 border-emerald-500/40 p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                        {b.bookingStatus === 'confirmed' ? '✓ CONFIRMED' : b.bookingStatus}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[#FFD700] font-mono text-[10px] font-bold">
                        ID: {b.bookingId}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                        {b.bookingType === 'nightly' ? `${b.totalNights} Night(s)` : `${b.transitHours} Hours Transit`}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white">{b.hotelName}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{b.hotelAddress} ({b.hotelCity})</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                      <span>अतिथि: <strong>{b.guestName}</strong> ({b.guestCount} व्यक्ति)</span>
                      <span>•</span>
                      <span>कमरा: <strong>{b.roomTypeName}</strong></span>
                      <span>•</span>
                      <span>चेक-इन: <strong>{b.checkInDate}</strong></span>
                    </div>
                  </div>

                  {/* Price & Check-In OTP Box */}
                  <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">चेक-इन OTP</div>
                      <div className="text-lg font-mono font-black text-[#FFD700] tracking-widest">{b.otpCheckIn}</div>
                      <div className="text-xs font-bold text-emerald-400">₹{b.totalPayable} ({b.paymentStatus === 'paid_online' ? 'Paid' : 'Pay At Hotel'})</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveVoucher(b)}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase flex items-center gap-1.5 shadow-md"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>वाउचर खोलें</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: HOTELIER PARTNER ONBOARDING PORTAL */}
      {/* ========================================================================= */}
      {activeTab === 'partner_register' && (
        <div className="rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#040E24] border-2 border-[#FFD700]/50 p-5 sm:p-7 shadow-2xl space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
              HOTELIER & LODGE PARTNERSHIP
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              होटल, लॉज, होमस्टे या धर्मशाला संचालक: JITOMNI 360 नेटवर्क से जुड़ें
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              पूरे भारत से अस्पताल में इलाज कराने आने वाले परिवारों, तीर्थ यात्रियों और ट्रेन मुसाफिरों को सीधे आपके होटल के कमरे उपलब्ध कराएं। <strong>0% हिडन कमीशन</strong>, दैनिक सीधा भुगतान और 100% सत्यापित ग्राहक।
            </p>
          </div>

          {regSubmittedSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-white">बधाई! आपका होटल सफलतापूर्वक पंजीकृत हो गया है।</h3>
              <p className="text-xs text-slate-300">
                आपकी संपत्ति अब JITOMNI 360 ऐप के होटल बुकिंग डायरेक्टरी में सक्रिय (Live) है। ग्राहक तत्काल बुकिंग कर सकेंगे।
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterHotel} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hotel Name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    होटल / संपत्ति का नाम (Hotel / Lodge Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. होटल विंध्या इन"
                    value={regHotelName}
                    onChange={(e) => setRegHotelName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    स्टे श्रेणी (Category) *
                  </label>
                  <select
                    value={regCategory}
                    onChange={(e) => setRegCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="near_hospital">🏥 अस्पताल के निकट विश्राम गृह (Near Hospital)</option>
                    <option value="near_station">🚂 रेलवे स्टेशन के पास होटल (Near Station)</option>
                    <option value="budget">💰 बजट होटल (Budget Hotel)</option>
                    <option value="luxury">🌟 लग्जरी / एक्जीक्यूटिव (Luxury / Executive)</option>
                    <option value="dharamshala">🛕 सेवा सदन व धर्मशाला (Dharamshala)</option>
                    <option value="homestay">🏡 फैमिली होमस्टे (Family Homestay)</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    शहर (City) *
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  >
                    {ALL_INDIAN_HOTEL_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    रिसेप्शन / मैनेजर का मोबाइल नंबर (Booking Phone) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    पूरा पता व लैंडमार्क (Complete Address & Landmark) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. सिरमौर चौराहा, अस्पताल रोड, रीवा"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Hospital Proximity */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    निकटतम अस्पताल की दूरी (किमी)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={regHospitalKm}
                    onChange={(e) => setRegHospitalKm(parseFloat(e.target.value) || 0.5)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Station Proximity */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    रेलवे स्टेशन से दूरी (किमी)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={regStationKm}
                    onChange={(e) => setRegStationKm(parseFloat(e.target.value) || 2)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Starting Price */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    शुरुआती कमरा किराया प्रति रात (₹ Starting Price) *
                  </label>
                  <input
                    type="number"
                    required
                    min="200"
                    value={regStartingPrice}
                    onChange={(e) => setRegStartingPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Total Rooms */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    कुल उपलब्ध कमरों की संख्या (Total Rooms)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={regTotalRooms}
                    onChange={(e) => setRegTotalRooms(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('search')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  रद्द करें
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>पंजीकरण पूर्ण करें व होटल लाइव करें</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOKING MODAL (ROOM SELECTION & DETAILS) */}
      {/* ========================================================================= */}
      {selectedHotelForBooking && selectedRoomType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#040E24] border-2 border-[#FFD700] w-full max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                  RESERVE YOUR STAY • 0% SURGE GUARANTEED
                </span>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  {selectedHotelForBooking.name}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{selectedHotelForBooking.address}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHotelForBooking(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Room Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                कमरे का प्रकार चुनें (Select Room Type)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedHotelForBooking.roomTypes.map((room) => {
                  const isSelected = selectedRoomType.id === room.id;
                  const price = bookingType === 'hourly_transit' 
                    ? (room.pricePerHourTransit || 299) 
                    : room.pricePerNight;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomType(room)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-black text-white">{room.name}</div>
                          <div className="text-[11px] text-slate-300">{room.bedType} • {room.capacity} अतिथि</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-[#FFD700]">₹{price}</div>
                          <div className="text-[9px] text-slate-400">
                            {bookingType === 'hourly_transit' ? '4-घंटे' : 'प्रति रात'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Details Form */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                अतिथि विवरण (Guest Details)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    अतिथि का पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    मोबाइल नंबर (Mobile Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    आधार संख्या (Masked Aadhaar) *
                  </label>
                  <input
                    type="text"
                    value={guestAadhaar}
                    onChange={(e) => setGuestAadhaar(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    अतिथियों की संख्या (Guests Count)
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value={1}>1 व्यक्ति</option>
                    <option value={2}>2 व्यक्ति (Double)</option>
                    <option value={3}>3 व्यक्ति</option>
                    <option value={4}>4 व्यक्ति (Family)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    विशेष आवश्यकता (Special Requests - व्हीलचेयर, ग्राउंड फ्लोर आदि)
                  </label>
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>
            </div>

            {/* Price & Billing Summary Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>
                  {bookingType === 'nightly' ? `${calculateNights()} रात × कमरा किराया` : `${transitHours} घंटे ट्रांजिट स्टे`}
                </span>
                <span className="font-mono font-bold">
                  ₹{bookingType === 'nightly' 
                    ? selectedRoomType.pricePerNight * calculateNights() 
                    : (selectedRoomType.pricePerHourTransit || 299)
                  }
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>JITOMNI प्लेटफॉर्म कमीशन छूट</span>
                <span className="font-mono font-bold">0% (₹0)</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>जीएसटी (5% GST)</span>
                <span className="font-mono">
                  ₹{Math.round((bookingType === 'nightly' 
                    ? selectedRoomType.pricePerNight * calculateNights() 
                    : (selectedRoomType.pricePerHourTransit || 299)) * 0.05)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-black text-white">
                <span>कुल देय राशि (Total Payable)</span>
                <span className="font-mono text-base text-[#FFD700]">
                  ₹{Math.round((bookingType === 'nightly' 
                    ? selectedRoomType.pricePerNight * calculateNights() 
                    : (selectedRoomType.pricePerHourTransit || 299)) * 1.05)}
                </span>
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                भुगतान का माध्यम (Payment Method)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentOption('pay_at_hotel')}
                  className={`p-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    paymentOption === 'pay_at_hotel'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>होटल पर भुगतान (Pay at Hotel)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentOption('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    paymentOption === 'upi'
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>ऑनलाइन यूपीआई (Instant UPI)</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedHotelForBooking(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold hover:bg-slate-800"
              >
                रद्द करें
              </button>

              <button
                type="button"
                disabled={isSubmittingBooking}
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FFD700]/30 flex items-center gap-2 cursor-pointer"
              >
                {isSubmittingBooking ? (
                  <span>वाउचर तैयार किया जा रहा है...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>बुकिंग कन्फर्म करें व वाउचर प्राप्त करें</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VOUCHER MODAL (DIGITAL QR CHECK-IN PASS) */}
      {/* ========================================================================= */}
      {activeVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="rounded-3xl bg-gradient-to-b from-[#0A1931] via-[#07132B] to-[#040C1A] border-2 border-emerald-400 w-full max-w-lg overflow-hidden shadow-2xl p-5 sm:p-6 space-y-5 text-center relative">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVoucher(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success icon & header */}
            <div className="space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest block">
                BOOKING CONFIRMED & VERIFIED
              </span>
              <h3 className="text-lg font-black text-white">
                {activeVoucher.hotelName}
              </h3>
              <p className="text-xs text-slate-300">
                {activeVoucher.hotelAddress} ({activeVoucher.hotelCity})
              </p>
            </div>

            {/* Digital QR Code & OTP Card */}
            <div className="p-4 rounded-2xl bg-white text-slate-950 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="text-left">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">JITOMNI BOOKING ID</div>
                  <div className="text-sm font-mono font-black text-slate-900">{activeVoucher.bookingId}</div>
                </div>

                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">चेक-इन OTP</div>
                  <div className="text-base font-mono font-black text-emerald-700 tracking-wider">
                    {activeVoucher.otpCheckIn}
                  </div>
                </div>
              </div>

              {/* Simulated QR Code Box */}
              <div className="p-3 rounded-xl bg-slate-100 flex flex-col items-center justify-center space-y-1 border border-slate-300">
                <QrCode className="w-28 h-28 text-slate-900" />
                <span className="text-[10px] font-mono text-slate-600 font-bold">
                  रिसेप्शन पर स्कैन हेतु डिजिटल चेक-इन पास
                </span>
              </div>

              {/* Guest Summary in Voucher */}
              <div className="grid grid-cols-2 gap-2 text-left text-xs pt-1 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block">अतिथि का नाम:</span>
                  <strong className="text-slate-900">{activeVoucher.guestName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">चेक-इन तिथि:</span>
                  <strong className="text-slate-900">{activeVoucher.checkInDate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">कमरा श्रेणी:</span>
                  <strong className="text-slate-900">{activeVoucher.roomTypeName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">कुल राशि:</span>
                  <strong className="text-emerald-700">₹{activeVoucher.totalPayable} ({activeVoucher.paymentStatus === 'paid_online' ? 'PAID' : 'Pay at Hotel'})</strong>
                </div>
              </div>
            </div>

            {/* Actions: Call Hotel & Close */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${activeVoucher.hotelPhone}`}
                className="w-1/2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-xs border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>होटल को कॉल करें</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>प्रिंट / सेव वाउचर</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
