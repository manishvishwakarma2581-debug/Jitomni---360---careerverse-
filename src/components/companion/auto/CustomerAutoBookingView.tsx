import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Star, 
  QrCode, 
  AlertTriangle, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Award,
  Zap,
  Info,
  DollarSign,
  Car,
  UserCheck
} from 'lucide-react';
import { AutoDriver, AutoRide, AutoRideType } from './royalAutoTypes';
import { RoyalAutoStorage, POPULAR_INDIAN_CITIES } from './royalAutoStorage';
import { AutoLiveRouteMap } from './AutoLiveRouteMap';
import { DriverDigitalCard } from './DriverDigitalCard';
import { AISafetyAndChatModal } from './AISafetyAndChatModal';

interface CustomerAutoBookingViewProps {
  onOpenDriverApp?: (royalId: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenOnboarding?: () => void;
}

export const CustomerAutoBookingView: React.FC<CustomerAutoBookingViewProps> = ({
  onOpenDriverApp,
  onOpenAdminPanel,
  onOpenOnboarding,
}) => {
  // Master drivers and rides state from storage
  const [drivers, setDrivers] = useState<AutoDriver[]>(() => RoyalAutoStorage.getDrivers());
  const [selectedCity, setSelectedCity] = useState<string>('Rewa');

  // Customer Mode: 'home' | 'book_flow' | 'scan_id_flow' | 'active_ride'
  const [viewState, setViewState] = useState<'home' | 'book_flow' | 'scan_id_flow' | 'active_ride'>('home');

  // Booking Form parameters
  const [rideType, setRideType] = useState<AutoRideType>('instant');
  const [rentalHours, setRentalHours] = useState<number>(2); // 2, 4, 8 hours
  const [pickupInput, setPickupInput] = useState<string>('रीवा रेलवे स्टेशन (Rewa Railway Station)');
  const [dropInput, setDropInput] = useState<string>('संजय गांधी मेमोरियल हॉस्पिटल (SGMH Medical College)');
  const [distanceKm, setDistanceKm] = useState<number>(4.2);
  const [estimatedMins, setEstimatedMins] = useState<number>(12);

  // Selected or Matched Driver for booking
  const [assignedDriver, setAssignedDriver] = useState<AutoDriver | null>(null);

  // Active Ride Object
  const [activeRide, setActiveRide] = useState<AutoRide | null>(null);
  const [rideProgress, setRideProgress] = useState<number>(30);

  // Scan ID state
  const [scanQuery, setScanQuery] = useState<string>('');
  const [scannedDriver, setScannedDriver] = useState<AutoDriver | null>(null);
  const [showDigitalCardModal, setShowDigitalCardModal] = useState<boolean>(false);

  // Safety & SOS Modal state
  const [safetyModalOpen, setSafetyModalOpen] = useState<boolean>(false);
  const [safetyModalMode, setSafetyModalMode] = useState<'sos' | 'ai_check' | 'ai_chat'>('sos');

  // Current City info
  const currentCityInfo = useMemo(() => {
    return POPULAR_INDIAN_CITIES.find((c) => c.name === selectedCity) || POPULAR_INDIAN_CITIES[0];
  }, [selectedCity]);

  // Verified & Online drivers in selected city
  const activeNearbyDrivers = useMemo(() => {
    return drivers.filter(
      (d) =>
        (d.cityName === selectedCity || d.cityCode === currentCityInfo.code) &&
        d.status === 'active' &&
        d.isPoliceVerified
    );
  }, [drivers, selectedCity, currentCityInfo]);

  // Dynamic Fare Calculation (Base ₹30 + ₹12/km, Zero Surge)
  const fareDetails = useMemo(() => {
    return RoyalAutoStorage.calculateFare(rideType, distanceKm, rentalHours);
  }, [rideType, distanceKm, rentalHours]);

  // Handler: Scan / Search Royal ID
  const handleSearchRoyalId = (idToSearch?: string) => {
    const query = (idToSearch || scanQuery).trim().toUpperCase();
    if (!query) return;

    const found = drivers.find(
      (d) =>
        d.royalId.toUpperCase() === query ||
        d.autoNumber.toUpperCase().replace(/\s/g, '').includes(query.replace(/\s/g, ''))
    );

    if (found) {
      setScannedDriver(found);
    } else {
      alert(`⚠️ रॉयल आईडी '${query}' का कोई रिकॉर्ड नहीं मिला। कृपया सही आईडी दर्ज करें। (उदा: JS-RWA-0001)`);
    }
  };

  // Handler: Book an Auto (assigns nearest verified driver)
  const handleConfirmBooking = (preferredDriver?: AutoDriver) => {
    const driverToAssign = preferredDriver || activeNearbyDrivers[0] || drivers[0];
    if (!driverToAssign) {
      alert('वर्तमान में इस शहर में कोई सक्रिय रॉयल ऑटो उपलब्ध नहीं है।');
      return;
    }

    const startOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const rideId = `RIDE-${driverToAssign.cityCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRide: AutoRide = {
      rideId,
      rideType,
      customerId: 'CUST-DEMO-991',
      customerName: 'सुनील कुमार (Sunil Kumar)',
      customerPhone: '+91 98261 44012',
      driverRoyalId: driverToAssign.royalId,
      driverName: driverToAssign.name,
      driverPhone: driverToAssign.phone,
      driverAutoNumber: driverToAssign.autoNumber,
      driverPhoto: driverToAssign.photoUrl,
      pickup: {
        address: pickupInput,
        lat: currentCityInfo.defaultLat,
        lng: currentCityInfo.defaultLng,
      },
      drop: {
        address: dropInput,
        lat: currentCityInfo.defaultLat + 0.02,
        lng: currentCityInfo.defaultLng + 0.02,
      },
      rentalPackageHours: rideType === 'rental' ? rentalHours : undefined,
      fare: fareDetails.fare,
      distanceKm,
      estimatedMins,
      status: 'in_progress',
      startOtp,
      sosTriggered: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMode: 'upi',
      paymentStatus: 'pending',
      commissionAmount: 10,
    };

    RoyalAutoStorage.addRide(newRide);
    setAssignedDriver(driverToAssign);
    setActiveRide(newRide);
    setRideProgress(25);
    setViewState('active_ride');
  };

  // Handler: Complete Ride
  const handleCompleteRide = () => {
    if (!activeRide) return;
    RoyalAutoStorage.updateRide(activeRide.rideId, {
      status: 'completed',
      paymentStatus: 'paid',
    });
    alert(`✅ यात्रा सफलतापूर्वक संपन्न हुई! कुल किराया: ₹${activeRide.fare} (₹10 प्लेटफॉर्म शुल्क कटा, ड्राइवर को मिला ₹${activeRide.fare - 10})`);
    setActiveRide(null);
    setViewState('home');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Ribbon */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>रॉयल ऑटो एग्जीक्यूटिव • ON-DEMAND AUTO RICKSHAW</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
              0% SURGE • 100% VERIFIED ID
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Rapido व Ola से बेहतर: यूनिक Royal ID & 24x7 SOS सुरक्षा
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            हर ऑटो चालक <strong>UIDAI आधार + पुलिस रिकॉर्ड सत्यापित</strong> है। न कोई मनमाना किराया, न सर्ज चार्ज। बैठते ही QR स्कैन करें या तुरंत बुक करें।
          </p>
        </div>

        {/* City Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-[#D4AF37]/50 text-xs text-white">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {POPULAR_INDIAN_CITIES.map((c) => (
                <option key={c.code} value={c.name} className="bg-[#0A1931] text-white">
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {onOpenOnboarding && (
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <span>+ चालक जुड़ें (₹0 Commission)</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW STATE: HOME SCREEN (Two Primary Buttons: Book Auto Now & Scan Auto ID) */}
      {viewState === 'home' && (
        <div className="space-y-6">
          {/* Big Two Buttons Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* BUTTON 1: Book Auto Now */}
            <div
              onClick={() => setViewState('book_flow')}
              className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1E3B] via-[#07132B] to-[#040C1A] border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] shadow-xl hover:shadow-[#D4AF37]/20 transition-all hover:scale-[1.01] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all" />

              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg">
                  🛺
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                  {activeNearbyDrivers.length} ऑटो पास में एक्टिव
                </span>
              </div>

              <div className="mt-5 space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                  बुक ऑटो अभी (Book Auto Now)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  पिकअप और ड्रॉप चुनें। तुरंत नजदीकी 100% वेरिफाइड ऑटो 3 मिनट में आपके पास पहुंचेगा।
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-[#D4AF37] font-bold">
                <span>इंस्टेंट राइड या फुल डे रेंटल →</span>
                <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">
                  ₹30 बेस + ₹12/किमी
                </span>
              </div>
            </div>

            {/* BUTTON 2: Scan Auto ID */}
            <div
              onClick={() => setViewState('scan_id_flow')}
              className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#120F2A] via-[#09152B] to-[#040C1A] border-2 border-blue-500/50 hover:border-blue-400 shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.01] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-lg">
                  <QrCode className="w-9 h-9 text-white" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-500/40">
                  UNIQUE ROYAL ID
                </span>
              </div>

              <div className="mt-5 space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-blue-300 transition-colors">
                  ऑटो आईडी स्कैन करें (Scan Auto ID)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  सड़क पर खड़े ऑटो का QR कोड स्कैन करें या <strong>JS-{currentCityInfo.code}-XXXX</strong> आईडी डालें और फुल प्रोफाइल जांचें।
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-blue-300 font-bold">
                <span>Aadhaar + CID पुलिस रिकॉर्ड जांचें →</span>
                <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">
                  100% पारदर्शी
                </span>
              </div>
            </div>
          </div>

          {/* Quick Verified Autos Showcase in Selected City */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>📍 {selectedCity} में पास के वेरिफाइड रॉयल ऑटो चालक</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-mono font-bold">
                    GPS LIVE
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  सीधे किसी भी ड्राइवर की आईडी पर क्लिक करके उनकी प्रोफाइल देखें या उन्हें बुक करें।
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewState('book_flow')}
                className="text-xs font-bold text-[#D4AF37] hover:underline"
              >
                सभी देखें →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeNearbyDrivers.slice(0, 3).map((driver) => (
                <div
                  key={driver.royalId}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37] transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={driver.photoUrl}
                      alt={driver.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#D4AF37]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-white truncate">{driver.name}</div>
                      <div className="text-[11px] font-mono text-[#D4AF37] font-bold">
                        {driver.royalId}
                      </div>
                      <div className="text-[10px] text-slate-400">{driver.autoNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.5 rounded text-[11px] font-bold text-[#D4AF37]">
                        <Star className="w-3 h-3 fill-[#D4AF37]" />
                        <span>{driver.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                        ● 3 min दूर
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1 text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      आधार + पुलिस वेरिफाइड
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setScannedDriver(driver);
                        setViewState('scan_id_flow');
                      }}
                      className="text-xs text-[#D4AF37] font-bold hover:underline"
                    >
                      प्रोफाइल →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW STATE: SCAN / ENTER AUTO ID */}
      {viewState === 'scan_id_flow' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewState('home')}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
            >
              ← मुख्य मेनू पर लौटें
            </button>
            <span className="text-xs font-mono text-[#D4AF37] font-bold">
              UNIQUE ROYAL ID VERIFIER
            </span>
          </div>

          {/* Search Box */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-blue-500/50 space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-400" />
                <span>ऑटो ड्राइवर रॉयल आईडी दर्ज करें या खोजें</span>
              </h3>
              <p className="text-xs text-slate-300">
                प्रत्येक अधिकृत ऑटो पर चिपके स्टिकर से रॉयल आईडी (उदा: <strong>JS-RWA-0001</strong> या <strong>JS-JBP-0015</strong>) यहां दर्ज करें।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={scanQuery}
                  onChange={(e) => setScanQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchRoyalId()}
                  placeholder="रॉयल आईडी या ऑटो नंबर दर्ज करें (उदा: JS-RWA-0001)..."
                  className="w-full py-3 px-4 pl-10 rounded-2xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="button"
                onClick={() => handleSearchRoyalId()}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>आईडी रिकॉर्ड खोजें</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-slate-400">त्वरित टेस्ट आईडी:</span>
              {drivers.slice(0, 4).map((d) => (
                <button
                  key={d.royalId}
                  type="button"
                  onClick={() => {
                    setScanQuery(d.royalId);
                    handleSearchRoyalId(d.royalId);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 font-mono font-bold"
                >
                  {d.royalId} ({d.name.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Scanned Driver Profile Card */}
          {scannedDriver && (
            <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37] shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-slate-800 shrink-0">
                    <img
                      src={scannedDriver.photoUrl}
                      alt={scannedDriver.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[9px] font-black text-center py-0.5">
                      100% VERIFIED
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white">{scannedDriver.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-xs font-black">
                        {scannedDriver.royalId}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      ऑटो नंबर:{' '}
                      <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                        {scannedDriver.autoNumber}
                      </span>{' '}
                      • {scannedDriver.cityName} ({scannedDriver.cityCode})
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <span className="flex items-center gap-1 text-[#D4AF37] font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        {scannedDriver.rating.toFixed(1)} / 5.0
                      </span>
                      <span className="text-slate-400">• कुल राइड्स: {scannedDriver.totalRides}</span>
                      <span className="text-slate-400">• टी-शर्ट: {scannedDriver.tShirtSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDigitalCardModal(true)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>डिजिटल कार्ड व स्टिकर देखें</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmBooking(scannedDriver)}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/30"
                  >
                    <span>इन्हें ही बुक करें (Book This Driver)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 5-Point Verification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>आधार सत्यापन (UIDAI)</span>
                  </div>
                  <div className="text-white font-mono text-[11px]">
                    XXXX-XXXX-{scannedDriver.aadharNumber.slice(-4)}
                  </div>
                  <div className="text-[10px] text-emerald-300">बायोमेट्रिक/OTP सत्यापित</div>
                </div>

                <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <Award className="w-4 h-4" />
                    <span>पुलिस वेरिफिकेशन (CID)</span>
                  </div>
                  <div className="text-white font-mono text-[11px]">
                    थाना रिकॉर्ड: 100% स्वच्छ
                  </div>
                  <div className="text-[10px] text-blue-300">
                    {scannedDriver.isPoliceVerified ? 'सत्यापित प्रमाण पत्र संलग्न' : 'सत्यापन प्रक्रियाधीन'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>ड्राइविंग लाइसेंस (Parivahan)</span>
                  </div>
                  <div className="text-white font-mono text-[11px] truncate">
                    {scannedDriver.licenseNumber}
                  </div>
                  <div className="text-[10px] text-slate-400">कमर्शियल LMV अधिकृत</div>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Digital Card */}
          {showDigitalCardModal && scannedDriver && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
              <DriverDigitalCard
                driver={scannedDriver}
                onClose={() => setShowDigitalCardModal(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* VIEW STATE: BOOK FLOW (Instant Ride & Rental / Full Day Sathi) */}
      {viewState === 'book_flow' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewState('home')}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
            >
              ← मुख्य मेनू पर लौटें
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRideType('instant')}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-black transition-all ${
                  rideType === 'instant'
                    ? 'bg-[#D4AF37] text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-300 border border-slate-700'
                }`}
              >
                ⚡ इंस्टेंट राइड (Point to Point)
              </button>
              <button
                type="button"
                onClick={() => setRideType('rental')}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-black transition-all ${
                  rideType === 'rental'
                    ? 'bg-[#D4AF37] text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-300 border border-slate-700'
                }`}
              >
                ⏱️ रेंटल / फुल डे साथी (Hourly Sathi)
              </button>
            </div>
          </div>

          {/* Route Map */}
          <AutoLiveRouteMap
            pickupAddress={pickupInput}
            dropAddress={dropInput}
            progressPercent={15}
          />

          {/* Booking Inputs & Fixed Fare Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1 & 2: Locations & Settings */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0A1931] border border-[#D4AF37]/40 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>📍 पिकअप और ड्रॉप स्थान</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({selectedCity} शहर के प्रमुख केंद्र)
                </span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    पिकअप स्थान (Pickup Location)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pickupInput}
                      onChange={(e) => setPickupInput(e.target.value)}
                      placeholder="पिकअप पता या लैंडमार्क..."
                      className="w-full py-2.5 px-3 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute left-3.5 top-3.5 ring-4 ring-emerald-500/20" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    ड्रॉप स्थान (Drop Location)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={dropInput}
                      onChange={(e) => setDropInput(e.target.value)}
                      placeholder="गंतव्य का पता..."
                      className="w-full py-2.5 px-3 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute left-3.5 top-3.5 ring-4 ring-red-500/20" />
                  </div>
                </div>

                {/* Popular Landmark Quick Selectors */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 block mb-1.5">
                    त्वरित लैंडमार्क चयन:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCityInfo.keyLandmarks.map((landmark) => (
                      <button
                        key={landmark}
                        type="button"
                        onClick={() => {
                          setDropInput(landmark);
                          setDistanceKm(Math.round((3 + Math.random() * 8) * 10) / 10);
                          setEstimatedMins(Math.round(8 + Math.random() * 20));
                        }}
                        className="py-1 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 hover:border-[#D4AF37]/50"
                      >
                        {landmark}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rental Hour Selector (if mode is rental) */}
                {rideType === 'rental' && (
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-[#D4AF37] block">
                      ⏱️ रेंटल अवधि चुनें (घंटे):
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { hours: 2, km: '15 किमी', fare: '₹350' },
                        { hours: 4, km: '30 किमी', fare: '₹650' },
                        { hours: 8, km: '60 किमी', fare: '₹1,200' },
                      ].map((pkg) => (
                        <button
                          key={pkg.hours}
                          type="button"
                          onClick={() => setRentalHours(pkg.hours)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            rentalHours === pkg.hours
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-black text-white">{pkg.hours} घंटे पैकेज</div>
                          <div className="text-[10px] text-slate-300">{pkg.km} शामिल</div>
                          <div className="text-xs font-mono font-bold text-[#D4AF37] mt-1">
                            {pkg.fare}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Column 3: Transparent Fare Card & One-Click Book */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1E3B] to-[#040C1A] border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-[#D4AF37] font-black uppercase">
                    AI TRANSPARENT FARE
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                    NO SURGE GUARANTEE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>अनुमानित दूरी (Distance):</span>
                    <span className="font-mono text-white font-bold">{distanceKm} km</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>अनुमानित समय (ETA):</span>
                    <span className="font-mono text-white font-bold">{estimatedMins} mins</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>बेस किराया (Base Rate):</span>
                    <span className="font-mono text-white">₹{fareDetails.baseFare}</span>
                  </div>
                  {rideType === 'instant' && (
                    <div className="flex justify-between text-slate-300">
                      <span>दूरी चार्ज (@ ₹12/km):</span>
                      <span className="font-mono text-white">₹{fareDetails.distanceCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-300">
                    <span>प्लेटफॉर्म चार्ज (Flat):</span>
                    <span className="font-mono text-white">₹{fareDetails.platformCommission}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">कुल देय राशि</span>
                    <span className="text-2xl font-mono font-black text-[#D4AF37]">
                      ₹{fareDetails.fare}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2 py-1 rounded">
                    नकद या UPI
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleConfirmBooking()}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:brightness-110 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ऑटो बुक करें (Confirm Ride)</span>
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  🔒 100% वेरिफाइड चालक • 24x7 SOS पुलिस हेल्पलाइन 112
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW STATE: ACTIVE RIDE IN PROGRESS */}
      {viewState === 'active_ride' && activeRide && assignedDriver && (
        <div className="space-y-6">
          {/* Active Ride Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h3 className="text-sm font-black text-white">
                  सक्रिय राइड जारी (Ride in Progress)
                </h3>
                <p className="text-xs text-emerald-300 font-mono">
                  RIDE ID: {activeRide.rideId} • किराया: ₹{activeRide.fare}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSafetyModalMode('ai_chat');
                  setSafetyModalOpen(true);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 font-bold hover:bg-slate-800"
              >
                🤖 AI सपोर्ट
              </button>

              <button
                type="button"
                onClick={() => {
                  setSafetyModalMode('sos');
                  setSafetyModalOpen(true);
                }}
                className="py-1.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/40 animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>RED SOS (112)</span>
              </button>
            </div>
          </div>

          {/* Interactive Map with deviation triggers */}
          <AutoLiveRouteMap
            pickupAddress={activeRide.pickup.address}
            dropAddress={activeRide.drop.address}
            driverName={assignedDriver.name}
            driverAutoNo={assignedDriver.autoNumber}
            driverRoyalId={assignedDriver.royalId}
            isRideActive={true}
            progressPercent={rideProgress}
            onDeviateRoute={() => {
              setSafetyModalMode('ai_check');
              setSafetyModalOpen(true);
            }}
            onSimulateStop={() => {
              setSafetyModalMode('ai_check');
              setSafetyModalOpen(true);
            }}
          />

          {/* Driver Details Card & OTP */}
          <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-[#D4AF37] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={assignedDriver.photoUrl}
                  alt={assignedDriver.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <h3 className="text-base font-black text-white">{assignedDriver.name}</h3>
                  <div className="text-xs font-mono text-[#D4AF37] font-bold">
                    {assignedDriver.royalId} • {assignedDriver.autoNumber}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    रेटिंग: {assignedDriver.rating.toFixed(1)}★ • भाषा: {assignedDriver.languages.join(', ')}
                  </div>
                </div>
              </div>

              {/* OTP Box */}
              <div className="p-3 rounded-2xl bg-[#071938] border border-[#D4AF37]/50 text-center sm:text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">
                  START RIDE OTP (ड्राइवर को बताएं)
                </span>
                <span className="text-2xl font-mono font-black text-[#D4AF37] tracking-widest">
                  {activeRide.startOtp}
                </span>
              </div>
            </div>

            {/* Bottom Complete / Cancel controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>लाइव GPS ट्रैकिंग कंट्रोल रूम से सक्रिय है।</span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenDriverApp && (
                  <button
                    type="button"
                    onClick={() => onOpenDriverApp(assignedDriver.royalId)}
                    className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-[#D4AF37] hover:bg-slate-800"
                  >
                    🛺 ड्राइवर ऐप खोलें (Simulate Driver)
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCompleteRide}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>राइड पूरी करें (End Trip)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety & SOS Modal Component */}
      <AISafetyAndChatModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
        mode={safetyModalMode}
        rideId={activeRide?.rideId}
        driverRoyalId={assignedDriver?.royalId}
        driverName={assignedDriver?.name}
        locationAddress={activeRide?.drop.address || 'Rewa Main Route'}
        userType="customer"
        onConfirmSOS={(reason, audioRecorded) => {
          RoyalAutoStorage.triggerSOS({
            ticketId: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
            rideId: activeRide?.rideId || 'UNKNOWN',
            driverRoyalId: assignedDriver?.royalId || 'JS-RWA-0001',
            driverName: assignedDriver?.name || 'चालक',
            customerName: 'अमित कुमार',
            customerPhone: '+91 94251 09281',
            triggeredBy: 'customer',
            reason,
            location: {
              lat: currentCityInfo.defaultLat,
              lng: currentCityInfo.defaultLng,
              address: activeRide?.pickup.address || 'Rewa Bypass',
            },
            audioRecordingSimulated: audioRecorded,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'active',
            nearestPoliceStation: `${selectedCity} कोतवाली थाना (1.4 km)`,
          });
        }}
      />
    </div>
  );
};
