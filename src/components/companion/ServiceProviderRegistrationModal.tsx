import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Car,
  HeartHandshake,
  UserCheck,
  MapPin,
  Phone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  Navigation,
  FileCheck
} from 'lucide-react';
import { ServiceProviderCategory, ServiceProviderRegistration, Language } from '../../types';

interface ServiceProviderRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onRegisteredSuccess?: (provider: ServiceProviderRegistration) => void;
}

export const ServiceProviderRegistrationModal: React.FC<ServiceProviderRegistrationModalProps> = ({
  isOpen,
  onClose,
  lang,
  onRegisteredSuccess
}) => {
  // Form State
  const [fullNameOrBusiness, setFullNameOrBusiness] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceProviderCategory>('hospital_helper');
  const [phone, setPhone] = useState<string>('');
  const [aadhaarNumber, setAadhaarNumber] = useState<string>('');
  
  // Location State
  const [selectedLandmark, setSelectedLandmark] = useState<string>('Sanjay Gandhi Memorial Hospital (SGMH)');
  const [address, setAddress] = useState<string>('Near Gate No. 2, OPD Block');
  const [lat, setLat] = useState<number>(24.5375);
  const [lng, setLng] = useState<number>(81.3021);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);

  // Cab Specific
  const [cabVehicleType, setCabVehicleType] = useState<string>('Sedan (Swift Dzire AC)');
  const [cabVehicleNumber, setCabVehicleNumber] = useState<string>('MP 17 TA 4120');
  const [cabDlNumber, setCabDlNumber] = useState<string>('MP17-2022-99812');
  const [cabRatePerKm, setCabRatePerKm] = useState<number>(12);

  // Hotel Specific
  const [hotelName, setHotelName] = useState<string>('');
  const [totalRooms, setTotalRooms] = useState<number>(20);
  const [proximityStationKm, setProximityStationKm] = useState<number>(2.5);
  const [proximityHospitalKm, setProximityHospitalKm] = useState<number>(0.8);
  const [startingPrice, setStartingPrice] = useState<number>(800);
  const [hotelAmenities, setHotelAmenities] = useState<string[]>([
    'AC Rooms',
    'Lift / Wheelchair Access',
    '24x7 Room Service'
  ]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registeredResult, setRegisteredResult] = useState<ServiceProviderRegistration | null>(null);

  if (!isOpen) return null;

  // Rewa Famous Landmarks List for 1-Click Accurate Geolocation
  const rewaLandmarks = [
    { name: 'Sanjay Gandhi Memorial Hospital (SGMH)', lat: 24.5375, lng: 81.3021, defaultAddr: 'Civil Lines Road, Near Emergency Gate' },
    { name: 'Rewa Railway Station (Platform 1)', lat: 24.5264, lng: 81.3210, defaultAddr: 'Station Road, Taxi Stand Exit' },
    { name: 'Shilpi Plaza Commercial Complex', lat: 24.5388, lng: 81.2985, defaultAddr: 'Shop No. 12, Ground Floor' },
    { name: 'Civil Lines (Officers Colony)', lat: 24.5420, lng: 81.2940, defaultAddr: 'Near Commissioner Bungalow' },
    { name: 'Kothi Compound (District Hospital)', lat: 24.5340, lng: 81.2990, defaultAddr: 'Opposite Collectorate Office' },
    { name: 'New Bus Stand Rewa, Urrahat', lat: 24.5310, lng: 81.3090, defaultAddr: 'Auto & Bus Terminal Yard' },
    { name: 'APS University Road', lat: 24.5580, lng: 81.3320, defaultAddr: 'University Main Gate Road' }
  ];

  const handleLandmarkChange = (landmarkName: string) => {
    setSelectedLandmark(landmarkName);
    const found = rewaLandmarks.find(lm => lm.name === landmarkName);
    if (found) {
      setLat(found.lat);
      setLng(found.lng);
      setAddress(found.defaultAddr);
    }
  };

  // Live GPS Capture via Browser Geolocation API
  const handleDetectLiveGps = () => {
    if (!navigator.geolocation) {
      setGpsStatusMsg('जीपीएस ब्राउज़र में उपलब्ध नहीं है। कृपया रीवा लैंडमार्क चुनें।');
      return;
    }
    setIsDetectingGps(true);
    setGpsStatusMsg('सटीक लाइव जीपीएस लोकेशन खोजी जा रही है...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detectedLat = Math.round(pos.coords.latitude * 10000) / 10000;
        const detectedLng = Math.round(pos.coords.longitude * 10000) / 10000;
        setLat(detectedLat);
        setLng(detectedLng);
        setIsDetectingGps(false);
        setGpsStatusMsg(`📍 लाइव जीपीएस कैप्चर हुआ: ${detectedLat}° N, ${detectedLng}° E (शुद्धता: ±${Math.round(pos.coords.accuracy)}m)`);
      },
      (err) => {
        setIsDetectingGps(false);
        setGpsStatusMsg('रीवा शहर डिफॉल्ट जीपीएस सक्रिय (24.5362° N, 81.3037° E)');
        setLat(24.5362);
        setLng(81.3037);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Submit Registration Form to Backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullNameOrBusiness.trim()) {
      setErrorMsg('कृपया अपना पूरा नाम या व्यावसायिक नाम दर्ज करें।');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    const cleanAadhaar = aadhaarNumber.replace(/\D/g, '');
    if (cleanAadhaar.length < 12) {
      setErrorMsg('कृपया 12 अंकों का वैध आधार नंबर दर्ज करें।');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullNameOrBusiness: fullNameOrBusiness.trim(),
      serviceType,
      phone: phone.trim(),
      aadhaarNumber: cleanAadhaar,
      location: {
        address,
        landmark: selectedLandmark,
        city: 'Rewa',
        lat,
        lng
      },
      cabDetails: serviceType === 'cab_vendor' ? {
        vehicleType: cabVehicleType,
        vehicleNumber: cabVehicleNumber,
        dlNumber: cabDlNumber,
        seatingCapacity: 4,
        ratePerKm: cabRatePerKm
      } : undefined,
      hotelDetails: serviceType === 'hotel_partner' ? {
        hotelName: hotelName.trim() || fullNameOrBusiness.trim(),
        totalRooms,
        proximityStationKm,
        proximityHospitalKm,
        startingPrice,
        amenities: hotelAmenities
      } : undefined
    };

    try {
      const res = await fetch('/api/companion/providers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegisteredResult(data.provider);
        if (onRegisteredSuccess) {
          onRegisteredSuccess(data.provider);
        }
      } else {
        setErrorMsg(data.message || 'पंजीकरण जमा करने में त्रुटि आई। कृपया पुनः प्रयास करें।');
      }
    } catch (err: any) {
      setErrorMsg('सर्वर से संपर्क नहीं हो सका। कृपया नेटवर्क चेक करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-[#06142E] via-[#040E24] to-[#020713] rounded-3xl border-2 border-amber-500/60 shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0B1E3B] via-[#071738] to-[#040E24] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xl shadow-inner">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black tracking-widest border border-amber-400/40 uppercase">
                  REWA CITY ON-DEMAND NETWORK
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  0% Hidden Charge
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                साथी / वेंडर ऑनबोर्डिंग पंजीकरण (Register as Sathi / Provider)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {registeredResult ? (
            /* SUCCESS CARD STATE */
            <div className="p-6 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/60 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center text-3xl mx-auto animate-bounce">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">
                  पंजीकरण सफलतापूर्वक दर्ज हुआ!
                </h3>
                <p className="text-sm text-emerald-200 max-w-xl mx-auto">
                  आपका आवेदन जिटोम्नी रीवा एडमिन सत्यापन डेस्क पर पहुंच गया है। आधार व रीवा पुलिस क्लीयरेंस ऑडिट के बाद आपकी प्रोफाइल रीवा लाइव मैप पर सक्रिय हो जाएगी।
                </p>
              </div>

              {/* Registration Docket */}
              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">रजिस्ट्रेशन डॉकेट ID:</span>
                  <span className="text-amber-400 font-bold">{registeredResult.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">नाम / व्यावसायिक नाम:</span>
                  <span className="text-white font-bold">{registeredResult.fullNameOrBusiness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">सेवा श्रेणी:</span>
                  <span className="text-emerald-300 font-bold uppercase">{registeredResult.serviceType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">लोकेशन (रीवा):</span>
                  <span className="text-slate-200">{registeredResult.location.landmark}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">वर्तमान स्थिति:</span>
                  <span className="text-amber-400 font-bold">⏳ PENDING ADMIN AUDIT</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setRegisteredResult(null);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all"
                >
                  रीवा लाइव मैप देखें (View Map)
                </button>
              </div>
            </div>
          ) : (
            /* ONBOARDING FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selector Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. सेवा श्रेणी चुनें (Select Service Type)</span>
                  <span className="text-red-400">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {/* Hospital Helper */}
                  <button
                    type="button"
                    onClick={() => setServiceType('hospital_helper')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'hospital_helper'
                        ? 'bg-blue-600/30 border-blue-400 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/40'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏥</div>
                    <div className="text-xs font-black text-white">हॉस्पिटल हेल्पर</div>
                    <div className="text-[10px] text-slate-300">Hospital OPD & Bedside Sathi</div>
                  </button>

                  {/* Elderly Care */}
                  <button
                    type="button"
                    onClick={() => setServiceType('elderly_care')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'elderly_care'
                        ? 'bg-emerald-600/30 border-emerald-400 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">👵</div>
                    <div className="text-xs font-black text-white">बुजुर्ग देखभाल साथी</div>
                    <div className="text-[10px] text-slate-300">Elderly & Patient Companion</div>
                  </button>

                  {/* Cab Vendor */}
                  <button
                    type="button"
                    onClick={() => setServiceType('cab_vendor')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'cab_vendor'
                        ? 'bg-amber-600/30 border-amber-400 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/40'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚖</div>
                    <div className="text-xs font-black text-white">कैब व टैक्सी वेंडर</div>
                    <div className="text-[10px] text-slate-300">Cab / Taxi / Auto Driver</div>
                  </button>

                  {/* Hotel Partner */}
                  <button
                    type="button"
                    onClick={() => setServiceType('hotel_partner')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      serviceType === 'hotel_partner'
                        ? 'bg-purple-600/30 border-purple-400 shadow-md shadow-purple-500/20 ring-2 ring-purple-400/40'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏨</div>
                    <div className="text-xs font-black text-white">होटल / लॉज पार्टनर</div>
                    <div className="text-[10px] text-slate-300">Hotel & Lodge Stay Owner</div>
                  </button>
                </div>
              </div>

              {/* Core Inputs: Name, Phone, Aadhaar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200">
                    पूरा नाम / व्यवसाय नाम <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullNameOrBusiness}
                    onChange={(e) => setFullNameOrBusiness(e.target.value)}
                    placeholder="जैसे: Ramesh Patel / Hotel Samdariya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200">
                    मोबाइल नंबर (OTP / WhatsApp) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98261 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                    <span>12-अंक आधार नंबर <span className="text-red-400">*</span></span>
                    <span className="text-[10px] text-emerald-400 font-mono">UIDAI Encrypted</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={aadhaarNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      // format as XXXX XXXX XXXX
                      if (v.length <= 12) {
                        const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                        setAadhaarNumber(formatted);
                      }
                    }}
                    placeholder="5821 4410 9921"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-mono tracking-wider focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Service Inputs (Cab vs Hotel) */}
              {serviceType === 'cab_vendor' && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Car className="w-4 h-4" />
                    <span>कैब / टैक्सी विवरण (Vehicle & Commercial Permit)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">वाहन का प्रकार (Vehicle Type)</label>
                      <select
                        value={cabVehicleType}
                        onChange={(e) => setCabVehicleType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Sedan (Swift Dzire AC)">Sedan (Swift Dzire AC)</option>
                        <option value="Innova Crysta (Medical Transit)">Innova Crysta (Medical Transit)</option>
                        <option value="Hatchback (WagonR AC)">Hatchback (WagonR AC)</option>
                        <option value="CNG Auto Rickshaw (3-Seater)">CNG Auto Rickshaw (3-Seater)</option>
                        <option value="E-Rickshaw City Cart">E-Rickshaw City Cart</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300">वाहन पंजीयन क्रमांक (MP 17 ...)</label>
                      <input
                        type="text"
                        value={cabVehicleNumber}
                        onChange={(e) => setCabVehicleNumber(e.target.value.toUpperCase())}
                        placeholder="MP 17 TA 4120"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300">ड्राइविंग लाइसेंस (DL Number)</label>
                      <input
                        type="text"
                        value={cabDlNumber}
                        onChange={(e) => setCabDlNumber(e.target.value.toUpperCase())}
                        placeholder="MP17-2020-XXXX"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {serviceType === 'hotel_partner' && (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/40 space-y-3">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>होटल / लॉज विनिर्देश (Hotel Stay Specifications)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">उपलब्ध कमरे (Total Rooms)</label>
                      <input
                        type="number"
                        value={totalRooms}
                        onChange={(e) => setTotalRooms(parseInt(e.target.value, 10) || 10)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300">अस्पताल से दूरी (SGMH Km)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={proximityHospitalKm}
                        onChange={(e) => setProximityHospitalKm(parseFloat(e.target.value) || 1)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300">स्टेशन से दूरी (Railway Km)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={proximityStationKm}
                        onChange={(e) => setProximityStationKm(parseFloat(e.target.value) || 2)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300">प्रारंभिक दर (₹ / रात्रि)</label>
                      <input
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(parseInt(e.target.value, 10) || 800)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Live Location & Rewa Landmark Selector */}
              <div className="p-4 rounded-2xl bg-[#071738]/80 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>2. रीवा शहर में आपका लाइव स्थान (Rewa City Location)</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleDetectLiveGps}
                    disabled={isDetectingGps}
                    className="px-3 py-1 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-black flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                    <span>{isDetectingGps ? 'कैप्चरिंग...' : '📍 लाइव GPS कैप्चर करें'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300">रीवा प्रमुख लैंडमार्क (Landmark)</label>
                    <select
                      value={selectedLandmark}
                      onChange={(e) => handleLandmarkChange(e.target.value)}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      {rewaLandmarks.map((lm) => (
                        <option key={lm.name} value={lm.name}>
                          {lm.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300">सटीक पता / दुकान / वार्ड (Detailed Address)</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="वार्ड नंबर, गली, दुकान या लैंडमार्क"
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {gpsStatusMsg && (
                  <div className="text-[11px] text-amber-200 font-mono flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{gpsStatusMsg}</span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>सत्यापन के बाद आपकी सेवाएं रीवा लाइव मैप पर दिखाई देंगी।</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all w-1/2 sm:w-auto"
                  >
                    रद्द करें
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 w-1/2 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>जमा हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <span>पंजीकरण जमा करें (Register Now)</span>
                        <span>➔</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
