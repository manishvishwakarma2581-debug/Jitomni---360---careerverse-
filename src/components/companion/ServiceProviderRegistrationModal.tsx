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
  FileCheck,
  Bike,
  Wrench,
  HelpCircle,
  DollarSign,
  Send
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
  const [serviceType, setServiceType] = useState<ServiceProviderCategory>('bike_sathi');
  const [phone, setPhone] = useState<string>('');
  const [aadhaarNumber, setAadhaarNumber] = useState<string>('');
  
  // Pan-India City Selection
  const [selectedCity, setSelectedCity] = useState<string>('Rewa');
  const [customCityName, setCustomCityName] = useState<string>('');
  const [selectedLandmark, setSelectedLandmark] = useState<string>('Sanjay Gandhi Memorial Hospital (SGMH)');
  const [address, setAddress] = useState<string>('Near Gate No. 2, OPD Block');
  const [lat, setLat] = useState<number>(24.5375);
  const [lng, setLng] = useState<number>(81.3021);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);

  // Bike Sathi Specific
  const [bikeModel, setBikeModel] = useState<string>('Hero Splendor Plus (100cc)');
  const [bikeNumber, setBikeNumber] = useState<string>('MP 17 MC 4820');
  const [bikeDlNumber, setBikeDlNumber] = useState<string>('MP17-2023-88412');
  const [hasHelmet, setHasHelmet] = useState<boolean>(true);

  // Bina Bike Sathi Specific (Walking/Hospital/Senior/Queuing companion)
  const [sathiSkills, setSathiSkills] = useState<string[]>([
    'हॉस्पिटल ओपीडी पर्ची व लाइन सहायता',
    'बुजुर्गों की देखभाल व बाजार साथी',
    'सरकारी बैंक व कलेक्ट्रेट कतार सहायता'
  ]);
  const [preferredShift, setPreferredShift] = useState<string>('any_shift');

  // Auto Rickshaw Specific
  const [autoType, setAutoType] = useState<string>('CNG Auto Rickshaw (Bajaj Maxima)');
  const [autoNumber, setAutoNumber] = useState<string>('MP 17 R 8812');
  const [autoPermitNumber, setAutoPermitNumber] = useState<string>('RTO-REWA-AUT-2024');

  // Cab Specific
  const [cabVehicleType, setCabVehicleType] = useState<string>('Sedan (Swift Dzire AC)');
  const [cabVehicleNumber, setCabVehicleNumber] = useState<string>('MP 17 TA 4120');
  const [cabDlNumber, setCabDlNumber] = useState<string>('MP17-2022-99812');
  const [cabRatePerKm, setCabRatePerKm] = useState<number>(12);

  // Hotel Specific
  const [hotelName, setHotelName] = useState<string>('');
  const [totalRooms, setTotalRooms] = useState<number>(15);
  const [proximityStationKm, setProximityStationKm] = useState<number>(1.8);
  const [proximityHospitalKm, setProximityHospitalKm] = useState<number>(0.5);
  const [startingPrice, setStartingPrice] = useState<number>(650);
  const [hotelAmenities, setHotelAmenities] = useState<string[]>([
    'AC Rooms',
    'Lift / Wheelchair Access',
    '24x7 Room Service',
    'Free Wi-Fi'
  ]);

  // Gig Worker Specific
  const [gigTrade, setGigTrade] = useState<string>('इलेक्ट्रीशियन व वायरमैन');
  const [gigExperienceYears, setGigExperienceYears] = useState<number>(4);
  const [gigDailyRate, setGigDailyRate] = useState<number>(600);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registeredResult, setRegisteredResult] = useState<ServiceProviderRegistration | null>(null);

  if (!isOpen) return null;

  // Major Indian Cities list for quick 1-click selection
  const indianCities = [
    'Rewa',
    'Bhopal',
    'Indore',
    'Jabalpur',
    'Prayagraj',
    'Varanasi',
    'Lucknow',
    'Patna',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Jaipur',
    'Other (अन्य भारतीय शहर)'
  ];

  // Rewa Famous Landmarks List
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
      setGpsStatusMsg('जीपीएस ब्राउज़र में उपलब्ध नहीं है। कृपया शहर व लैंडमार्क चुनें।');
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
        setGpsStatusMsg(`📍 लाइव जीपीएस कैप्चर हुआ: ${detectedLat}° N, ${detectedLng}° E (सटीकता: ±${Math.round(pos.coords.accuracy)}m)`);
      },
      (err) => {
        setIsDetectingGps(false);
        setGpsStatusMsg(`डिफ़ॉल्ट जीपीएस सक्रिय (${lat}° N, ${lng}° E)`);
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

    const effectiveCity = selectedCity.startsWith('Other') 
      ? (customCityName.trim() || 'India') 
      : selectedCity;

    setIsSubmitting(true);

    const payload = {
      fullNameOrBusiness: fullNameOrBusiness.trim(),
      serviceType,
      phone: phone.trim(),
      aadhaarNumber: cleanAadhaar,
      location: {
        address: address.trim() || `${effectiveCity} Center`,
        landmark: selectedLandmark,
        city: effectiveCity,
        lat,
        lng
      },
      bikeDetails: serviceType === 'bike_sathi' ? {
        bikeModel,
        bikeNumber,
        bikeDlNumber,
        hasHelmet
      } : undefined,
      binaBikeDetails: serviceType === 'bina_bike_sathi' ? {
        sathiSkills,
        preferredShift
      } : undefined,
      autoDetails: serviceType === 'auto_rickshaw' ? {
        autoType,
        autoNumber,
        autoPermitNumber
      } : undefined,
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
      } : undefined,
      gigDetails: serviceType === 'gig_worker' ? {
        trade: gigTrade,
        experienceYears: gigExperienceYears,
        dailyRate: gigDailyRate
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#06142E] via-[#040E24] to-[#020713] rounded-3xl border-2 border-[#FFD700] shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0B1E3B] via-[#071738] to-[#040E24] border-b border-[#FFD700]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl shadow-inner">
              🇮🇳
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-black tracking-widest border border-[#FFD700]/40 uppercase">
                  PAN-INDIA ON-DEMAND SOVEREIGN NETWORK
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  80% - 90% Direct Payout
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white tracking-wide mt-0.5">
                साथी / होटल / ऑटो / कैब वेंडर ऑनबोर्डिंग (Partner Registration)
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
        <div className="p-4 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
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
                  आपका आवेदन जिटोम्नी 360° सुपर एडमिन सत्यापन डेस्क पर पहुंच गया है। आधार व आवश्यक सुरक्षा ऑडिट के बाद आपकी प्रोफाइल लाइव मैप व बुकिंग इंजन पर सक्रिय हो जाएगी।
                </p>
              </div>

              {/* Registration Docket */}
              <div className="p-4 rounded-xl bg-black/70 border border-emerald-500/30 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">पंजीकरण टोकन ID:</span>
                  <span className="text-[#FFD700] font-bold">{registeredResult.id}</span>
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
                  <span className="text-slate-400">शहर व लोकेशन:</span>
                  <span className="text-slate-200">{registeredResult.location.city} ({registeredResult.location.landmark})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">वर्तमान स्थिति:</span>
                  <span className="text-amber-400 font-bold">⏳ PENDING VERIFICATION (2-4 घंटे में एक्टिव)</span>
                </div>
              </div>

              {/* How Bookings Will Arrive Info Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-[#FFD700]/30 text-left space-y-2">
                <h4 className="text-xs font-black text-[#FFD700] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span>आपको बुकिंग कैसे मिलेगी? (Next Steps to Start Earning):</span>
                </h4>
                <ol className="text-xs text-slate-300 space-y-1.5 list-decimal pl-4">
                  <li>सत्यापन होते ही आपको SMS/WhatsApp पर पुष्टि मैसेज प्राप्त होगा।</li>
                  <li>ऐप में <strong>"रॉयल साथी (Royal Sathi Worker)"</strong> टैब खोलकर अपनी ड्यूटी <strong>"ऑनलाइन (ON DUTY)"</strong> करें।</li>
                  <li>जब भी कोई ग्राहक आपके 5 से 10 किमी दायरे में बुक करेगा, आपकी स्क्रीन पर लाउड बीप के साथ <strong>90 सेकंड का टाइमर</strong> चलेगा।</li>
                  <li><strong>"स्वीकार करें (ACCEPT)"</strong> दबाएं, ग्राहक से स्टार्ट OTP लें, सेवा पूरी कर एंड OTP डालें और 80%-90% कमाई तुरंत अपने बैंक में लें!</li>
                </ol>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setRegisteredResult(null);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all"
                >
                  लाइव पोर्टल देखें (Open Live App)
                </button>
              </div>
            </div>
          ) : (
            /* ONBOARDING FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* How It Works Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-amber-500/10 border border-[#FFD700]/30 flex items-start gap-3 text-xs">
                <Info className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="text-white">अखिल भारतीय सेवा (All-India Service Guarantee):</strong>
                  <p className="text-slate-300">
                    आप भारत के किसी भी शहर/कस्बे से हों, आप तुरंत साथी, ऑटो, होटल, कैब या गिग कारीगर के रूप में रजिस्टर हो सकते हैं। 0% छुपा कमीशन, पारदर्शी दैनिक/प्रति-टास्क कमाई।
                  </p>
                </div>
              </div>

              {/* 1. Category Selector Cards */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#FFD700] uppercase tracking-wider flex items-center justify-between">
                  <span>1. आप किस रूप में जुड़ना चाहते हैं? (Select Category) *</span>
                  <span className="text-[11px] text-emerald-400 font-bold">80% - 90% Direct Pay</span>
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {/* Bike Sathi */}
                  <button
                    type="button"
                    onClick={() => setServiceType('bike_sathi')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'bike_sathi'
                        ? 'bg-amber-500/25 border-[#FFD700] shadow-md ring-2 ring-[#FFD700]/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏍️</div>
                    <div className="text-xs font-black text-white">बाइक साथी</div>
                    <div className="text-[10px] text-slate-300">राइड, पार्सल व टास्क</div>
                  </button>

                  {/* Bina Bike Sathi */}
                  <button
                    type="button"
                    onClick={() => setServiceType('bina_bike_sathi')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'bina_bike_sathi'
                        ? 'bg-blue-600/30 border-blue-400 shadow-md ring-2 ring-blue-400/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚶‍♂️</div>
                    <div className="text-xs font-black text-white">बिना बाइक साथी</div>
                    <div className="text-[10px] text-slate-300">हॉस्पिटल, बुजुर्ग व कतार</div>
                  </button>

                  {/* Hotel Partner */}
                  <button
                    type="button"
                    onClick={() => setServiceType('hotel_partner')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'hotel_partner'
                        ? 'bg-purple-600/30 border-purple-400 shadow-md ring-2 ring-purple-400/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏨</div>
                    <div className="text-xs font-black text-white">होटल व लॉज</div>
                    <div className="text-[10px] text-slate-300">कमरे व स्टे ओनर</div>
                  </button>

                  {/* Auto Rickshaw */}
                  <button
                    type="button"
                    onClick={() => setServiceType('auto_rickshaw')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'auto_rickshaw'
                        ? 'bg-yellow-500/25 border-yellow-400 shadow-md ring-2 ring-yellow-400/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🛺</div>
                    <div className="text-xs font-black text-white">ऑटो रिक्शा चालक</div>
                    <div className="text-[10px] text-slate-300">0% सर्ज लोकल ऑटो</div>
                  </button>

                  {/* Cab / Travel */}
                  <button
                    type="button"
                    onClick={() => setServiceType('cab_vendor')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'cab_vendor'
                        ? 'bg-emerald-600/30 border-emerald-400 shadow-md ring-2 ring-emerald-400/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🚕</div>
                    <div className="text-xs font-black text-white">टूर व कैब वेंडर</div>
                    <div className="text-[10px] text-slate-300">इंटर-सिटी व टैक्सी</div>
                  </button>

                  {/* Gig Worker */}
                  <button
                    type="button"
                    onClick={() => setServiceType('gig_worker')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      serviceType === 'gig_worker'
                        ? 'bg-orange-600/30 border-orange-400 shadow-md ring-2 ring-orange-400/50'
                        : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">🛠️</div>
                    <div className="text-xs font-black text-white">गिग व कुशल वर्कर</div>
                    <div className="text-[10px] text-slate-300">प्लंबर, इलेक्ट्रीशियन</div>
                  </button>
                </div>
              </div>

              {/* 2. Core Personal Inputs: Name, Phone, Aadhaar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200">
                    पूरा नाम / व्यावसायिक नाम <span className="text-red-400">*</span>
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
                    मोबाइल नंबर (WhatsApp / Call) <span className="text-red-400">*</span>
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

              {/* 3. Category-Specific Fields */}
              
              {/* BIKE SATHI */}
              {serviceType === 'bike_sathi' && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-[#FFD700]/40 space-y-3">
                  <div className="text-xs font-bold text-[#FFD700] flex items-center gap-1.5">
                    <Bike className="w-4 h-4" />
                    <span>बाइक साथी विवरण (Two-Wheeler Details)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">मोटरसाइकिल / स्कूटर मॉडल</label>
                      <input
                        type="text"
                        value={bikeModel}
                        onChange={(e) => setBikeModel(e.target.value)}
                        placeholder="Hero Splendor / Activa"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">गाड़ी नंबर (RC Number)</label>
                      <input
                        type="text"
                        value={bikeNumber}
                        onChange={(e) => setBikeNumber(e.target.value.toUpperCase())}
                        placeholder="MP 17 MC 4820"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ड्राइविंग लाइसेंस (DL Number)</label>
                      <input
                        type="text"
                        value={bikeDlNumber}
                        onChange={(e) => setBikeDlNumber(e.target.value.toUpperCase())}
                        placeholder="MP17-2023-XXXX"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BINA BIKE SATHI */}
              {serviceType === 'bina_bike_sathi' && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/40 space-y-3">
                  <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" />
                    <span>बिना बाइक साथी सेवाएं (Walking & In-Person Companion Tasks)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    आप बिना किसी वाहन के पैदल या स्थानीय साधन से मरीजों, बुजुर्गों, छात्रों व बैंक कतारों में सहायता करेंगे (₹99 - ₹199/घंटा या ₹450-₹800/दिन)।
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">उपलब्ध शिफ्ट (Preferred Availability)</label>
                      <select
                        value={preferredShift}
                        onChange={(e) => setPreferredShift(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      >
                        <option value="any_shift">दिन व रात दोनों में उपलब्ध (24x7 Ready)</option>
                        <option value="day_only">केवल दिन में (सुबह 8 से शाम 7)</option>
                        <option value="night_hospital">केवल रात में हॉस्पिटल अटेंडेंट (शाम 8 से सुबह 8)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">प्रमुख कार्य दक्षता</label>
                      <input
                        type="text"
                        readOnly
                        value="हॉस्पिटल OPD पर्ची, बुजुर्ग देखभाल, बैंक कतार, बाजार सामान"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AUTO RICKSHAW */}
              {serviceType === 'auto_rickshaw' && (
                <div className="p-4 rounded-2xl bg-yellow-950/20 border border-yellow-500/40 space-y-3">
                  <div className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                    <span>🛺</span>
                    <span>ऑटो रिक्शा विवरण (City Auto Specifications - 0% Surge)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">ऑटो प्रकार (Auto Fuel Type)</label>
                      <select
                        value={autoType}
                        onChange={(e) => setAutoType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      >
                        <option value="CNG Auto Rickshaw (Bajaj Maxima)">CNG Auto Rickshaw (3-Seater)</option>
                        <option value="Electric E-Rickshaw Cart">Electric E-Rickshaw (4-Seater)</option>
                        <option value="Diesel Auto Rickshaw">Diesel Auto Rickshaw</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ऑटो पंजीयन क्रमांक (Vehicle No)</label>
                      <input
                        type="text"
                        value={autoNumber}
                        onChange={(e) => setAutoNumber(e.target.value.toUpperCase())}
                        placeholder="MP 17 R 8812"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">परमिट या लाइसेंस नंबर</label>
                      <input
                        type="text"
                        value={autoPermitNumber}
                        onChange={(e) => setAutoPermitNumber(e.target.value.toUpperCase())}
                        placeholder="RTO-PERMIT-2024"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HOTEL PARTNER */}
              {serviceType === 'hotel_partner' && (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/40 space-y-3">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>होटल / लॉज विनिर्देश (Hotel Stay Specifications)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">होटल / लॉज का नाम</label>
                      <input
                        type="text"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        placeholder="Hotel Samdariya / Ganga Guest House"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">कुल कमरे (Total Rooms)</label>
                      <input
                        type="number"
                        value={totalRooms}
                        onChange={(e) => setTotalRooms(parseInt(e.target.value, 10) || 10)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">रेलवे स्टेशन से दूरी (Km)</label>
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
                        onChange={(e) => setStartingPrice(parseInt(e.target.value, 10) || 650)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CAB & TRAVEL VENDOR */}
              {serviceType === 'cab_vendor' && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Car className="w-4 h-4" />
                    <span>कैब व ट्रैवल ऑपरेटर (Taxi & Outstation Details)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">वाहन का प्रकार</label>
                      <select
                        value={cabVehicleType}
                        onChange={(e) => setCabVehicleType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      >
                        <option value="Sedan (Swift Dzire AC)">Sedan (Swift Dzire AC)</option>
                        <option value="Innova Crysta (Medical & Tour)">Innova Crysta (7-Seater AC)</option>
                        <option value="Hatchback (WagonR AC)">Hatchback (WagonR AC)</option>
                        <option value="Tempo Traveller (12-Seater)">Tempo Traveller (12-Seater)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">गाड़ी पंजीयन क्रमांक</label>
                      <input
                        type="text"
                        value={cabVehicleNumber}
                        onChange={(e) => setCabVehicleNumber(e.target.value.toUpperCase())}
                        placeholder="MP 17 TA 4120"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">ड्राइविंग लाइसेंस (DL)</label>
                      <input
                        type="text"
                        value={cabDlNumber}
                        onChange={(e) => setCabDlNumber(e.target.value.toUpperCase())}
                        placeholder="MP17-2022-XXXX"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* GIG WORKER */}
              {serviceType === 'gig_worker' && (
                <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/40 space-y-3">
                  <div className="text-xs font-bold text-orange-300 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" />
                    <span>गिग वर्कर व कुशल कारीगर विवरण (Trade & Daily Rate)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300">कार्य ट्रेड (Skill/Trade)</label>
                      <select
                        value={gigTrade}
                        onChange={(e) => setGigTrade(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      >
                        <option value="इलेक्ट्रीशियन व वायरमैन">इलेक्ट्रीशियन व वायरमैन</option>
                        <option value="प्लंबर व सेनेटरी कारीगर">प्लंबर व सेनेटरी कारीगर</option>
                        <option value="बढ़ई / कारपेंटर">बढ़ई / कारपेंटर</option>
                        <option value="राजमिस्त्री व टाइल्स कारीगर">राजमिस्त्री व टाइल्स कारीगर</option>
                        <option value="पेंटर व पुट्टी कारीगर">पेंटर व पुट्टी कारीगर</option>
                        <option value="एसी / फ्रिज रिपेयरिंग">एसी / फ्रिज रिपेयरिंग</option>
                        <option value="डीप होम क्लीनिंग">डीप होम क्लीनिंग व हाउसकीपिंग</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">अनुभव (वर्ष)</label>
                      <input
                        type="number"
                        value={gigExperienceYears}
                        onChange={(e) => setGigExperienceYears(parseInt(e.target.value, 10) || 1)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300">दैनिक दिहाड़ी / चार्ज (₹)</label>
                      <input
                        type="number"
                        value={gigDailyRate}
                        onChange={(e) => setGigDailyRate(parseInt(e.target.value, 10) || 500)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Pan-India Location Selector */}
              <div className="p-4 rounded-2xl bg-[#071738]/80 border border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-[#FFD700] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>2. कार्यक्षेत्र / शहर व पता (Service City & Location) *</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleDetectLiveGps}
                    disabled={isDetectingGps}
                    className="px-3 py-1 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-black flex items-center gap-1.5 transition-all shadow-md w-fit"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                    <span>{isDetectingGps ? 'कैप्चरिंग...' : '📍 लाइव GPS कैप्चर करें'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300">शहर चुनें (Select City)</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 font-bold"
                    >
                      {indianCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCity.startsWith('Other') ? (
                    <div>
                      <label className="text-[11px] text-slate-300">अपने शहर का नाम लिखें</label>
                      <input
                        type="text"
                        value={customCityName}
                        onChange={(e) => setCustomCityName(e.target.value)}
                        placeholder="जैसे: सतना / उज्जैन / गोरखपुर"
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] text-slate-300">प्रमुख लैंडमार्क (Landmark / Ward)</label>
                      {selectedCity === 'Rewa' ? (
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
                      ) : (
                        <input
                          type="text"
                          value={selectedLandmark}
                          onChange={(e) => setSelectedLandmark(e.target.value)}
                          placeholder="मुख्य अस्पताल, रेलवे स्टेशन या चौराहा"
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] text-slate-300">विस्तृत पता (Street / Office Address)</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="वार्ड नंबर, गली, दुकान या स्टैंड"
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

              {/* 5. Booking & Earning Explanation Drawer */}
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>रजिस्ट्रेशन के बाद आपको बुकिंग और भुगतान कैसे मिलेगा? (How Bookings & Payouts Work):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-300 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-white block mb-0.5">1. वेरिफिकेशन व आईडी:</strong>
                    आधार व मोबाइल नंबर चेक होने के 2 से 4 घंटे में आपका 'रॉयल साथी / वेंडर टोकन' एक्टिव हो जाएगा।
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-white block mb-0.5">2. 90-सेकंड ऑर्डर अलर्ट:</strong>
                    ग्राहक जब भी आपके शहर या 5-10 किमी दायरे में बुक करेगा, रिंगटोन बजेगी और स्क्रीन पर दूरी व कमाई दिखेगी।
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-white block mb-0.5">3. 80-90% तत्काल भुगतान:</strong>
                    स्टार्ट व एंड OTP दर्ज करते ही 80% से 90% राशि आपके जिटोम्नी वॉलेट में क्रेडिट हो जाएगी, जिसे तुरंत बैंक में निकाल सकते हैं।
                  </div>
                </div>
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
                  <span>100% सुरक्षित • शून्य कमीशन कटौती धोखाधड़ी • आधिकारिक जिटोम्नी नेटवर्क</span>
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
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#FFD700] to-amber-500 hover:from-amber-400 hover:to-[#FFD700] text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 w-1/2 sm:w-auto cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>जमा हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <span>पंजीकरण जमा करें (Register Now)</span>
                        <Send className="w-3.5 h-3.5" />
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
