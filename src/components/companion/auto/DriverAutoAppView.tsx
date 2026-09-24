import React, { useState, useEffect } from 'react';
import { 
  Power, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Phone, 
  QrCode, 
  ArrowRight,
  TrendingUp,
  Award,
  Bell,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { AutoDriver, AutoRide } from './royalAutoTypes';
import { RoyalAutoStorage } from './royalAutoStorage';
import { audioAlertService } from './audioAlerts';
import { DriverDigitalCard } from './DriverDigitalCard';
import { AISafetyAndChatModal } from './AISafetyAndChatModal';

interface DriverAutoAppViewProps {
  initialDriverId?: string;
  onOpenCustomerView?: () => void;
  onOpenAdminPanel?: () => void;
}

export const DriverAutoAppView: React.FC<DriverAutoAppViewProps> = ({
  initialDriverId = 'JS-RWA-0001',
  onOpenCustomerView,
  onOpenAdminPanel,
}) => {
  // Load drivers list from storage
  const [drivers, setDrivers] = useState<AutoDriver[]>(() => RoyalAutoStorage.getDrivers());

  // Current logged in driver
  const [selectedDriverId, setSelectedDriverId] = useState<string>(initialDriverId);

  // Active driver object
  const currentDriver = drivers.find((d) => d.royalId === selectedDriverId) || drivers[0];

  // Online / Offline toggle state
  const [isOnline, setIsOnline] = useState<boolean>(currentDriver?.isOnline ?? true);

  // Today stats
  const [todayEarnings, setTodayEarnings] = useState<number>(currentDriver?.todayEarnings ?? 840);
  const [todayRides, setTodayRides] = useState<number>(currentDriver?.todayRidesCount ?? 7);

  // Incoming Ride Request State (Simulated)
  const [incomingRequest, setIncomingRequest] = useState<{
    customerName: string;
    customerPhone: string;
    pickup: string;
    drop: string;
    distanceKm: number;
    fare: number;
    secondsLeft: number;
  } | null>(null);

  // Active Trip State
  const [activeTrip, setActiveTrip] = useState<{
    rideId: string;
    customerName: string;
    customerPhone: string;
    pickup: string;
    drop: string;
    fare: number;
    startOtp: string;
    status: 'going_to_pickup' | 'otp_verification' | 'driving_to_drop' | 'payment_collection' | 'rated';
    enteredOtp: string;
  } | null>(null);

  // Modal states
  const [showIdCard, setShowIdCard] = useState<boolean>(false);
  const [showSOSModal, setShowSOSModal] = useState<boolean>(false);

  // Sync state if driver changes
  useEffect(() => {
    if (currentDriver) {
      setIsOnline(currentDriver.isOnline);
      setTodayEarnings(currentDriver.todayEarnings);
      setTodayRides(currentDriver.todayRidesCount);
    }
  }, [currentDriver]);

  // Handle Online/Offline toggle with eligibility check
  const handleToggleOnline = () => {
    if (!isOnline) {
      const check = RoyalAutoStorage.isDriverEligibleToGoLive(currentDriver);
      if (!check.eligible) {
        alert(`ड्यूटी ऑनलाइन नहीं की जा सकती:\n\n• ${check.reasons.join('\n• ')}`);
        return;
      }
    }
    const next = !isOnline;
    setIsOnline(next);
    RoyalAutoStorage.updateDriver(currentDriver.royalId, { isOnline: next });
  };

  // Subscription Renewal Handler
  const handleRenewSubscription = () => {
    RoyalAutoStorage.renewDriverSubscription(currentDriver.royalId);
    const updated = RoyalAutoStorage.getDrivers();
    setDrivers(updated);
    alert(`बधाई! ₹299 मासिक सदस्यता 30 दिनों के लिए सक्रिय कर दी गई है। अब आप ऑनलाइन आ सकते हैं।`);
  };

  // Simulate an incoming ride trigger
  const handleTriggerMockRideRequest = () => {
    if (!isOnline) {
      alert('राइड स्वीकार करने के लिए कृपया पहले अपनी स्थिति "ऑनलाइन (Online)" करें।');
      return;
    }
    audioAlertService.playRideRequestBeep();

    setIncomingRequest({
      customerName: 'अमित कुमार (Amit Kumar)',
      customerPhone: '+91 94251 09281',
      pickup: 'Rewa Railway Station Auto Stand',
      drop: 'Sanjay Gandhi Medical Hospital (SGMH)',
      distanceKm: 4.2,
      fare: 180,
      secondsLeft: 90,
    });
  };

  // Accept incoming ride
  const handleAcceptRide = () => {
    if (!incomingRequest) return;
    const startOtp = '5824';
    const rideId = `RIDE-${currentDriver.cityCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    setActiveTrip({
      rideId,
      customerName: incomingRequest.customerName,
      customerPhone: incomingRequest.customerPhone,
      pickup: incomingRequest.pickup,
      drop: incomingRequest.drop,
      fare: incomingRequest.fare,
      startOtp,
      status: 'going_to_pickup',
      enteredOtp: '',
    });

    setIncomingRequest(null);
  };

  // Reject ride
  const handleRejectRide = () => {
    setIncomingRequest(null);
  };

  // Verify OTP and Start Ride
  const handleVerifyOtpAndStart = () => {
    if (!activeTrip) return;
    if (activeTrip.enteredOtp !== activeTrip.startOtp && activeTrip.enteredOtp !== '1234') {
      alert(`⚠️ गलत OTP! ग्राहक से सही OTP पूछें (डेमो OTP: ${activeTrip.startOtp})`);
      return;
    }
    setActiveTrip({ ...activeTrip, status: 'driving_to_drop' });
  };

  // Complete Ride & Collect Payment
  const handleCompleteTrip = () => {
    if (!activeTrip) return;
    setActiveTrip({ ...activeTrip, status: 'payment_collection' });
  };

  // Confirm payment & update driver earnings
  const handleConfirmPayment = () => {
    if (!activeTrip) return;
    const driverCut = activeTrip.fare - 10; // Rs 10 platform fee
    const newEarnings = todayEarnings + driverCut;
    const newRides = todayRides + 1;

    setTodayEarnings(newEarnings);
    setTodayRides(newRides);
    RoyalAutoStorage.updateDriver(currentDriver.royalId, {
      todayEarnings: newEarnings,
      todayRidesCount: newRides,
      totalRides: currentDriver.totalRides + 1,
    });

    setActiveTrip({ ...activeTrip, status: 'rated' });
  };

  const handleFinishEverything = () => {
    setActiveTrip(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Driver Header Ribbon */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentDriver.photoUrl}
              alt={currentDriver.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">{currentDriver.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-xs font-black">
                {currentDriver.royalId}
              </span>
            </div>
            <div className="text-xs text-slate-300">
              ऑटो: <span className="font-mono font-bold text-white">{currentDriver.autoNumber}</span> • {currentDriver.cityName} ({currentDriver.cityCode})
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Aadhaar + CID पुलिस रिकॉर्ड सत्यापित</span>
            </div>
          </div>
        </div>

        {/* Quick Driver Switcher for Testing + Online Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">चालक बदलें:</span>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="bg-slate-900 text-[#D4AF37] font-mono text-xs font-bold border border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none"
            >
              {drivers.map((d) => (
                <option key={d.royalId} value={d.royalId}>
                  {d.royalId} - {d.name.split(' ')[0]} ({d.cityCode})
                </option>
              ))}
            </select>
          </div>

          {/* ONLINE / OFFLINE TOGGLE */}
          <button
            type="button"
            onClick={handleToggleOnline}
            className={`py-2 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
              isOnline
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? 'ड्यूटी पर: ऑनलाइन' : 'ड्यूटी बंद: ऑफलाइन'}</span>
          </button>
        </div>
      </div>

      {/* Subscription & Police Verification Status Banner */}
      {(!currentDriver.isPoliceVerified || !currentDriver.subscriptionPaid) && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-red-950/40 border-2 border-amber-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-amber-300">
                {!currentDriver.isPoliceVerified && '⚠️ पुलिस सीआईडी (Police CID) वेरिफिकेशन लंबित है'}
                {currentDriver.isPoliceVerified && !currentDriver.subscriptionPaid && '⚠️ मासिक सदस्यता (₹299/माह) समाप्त या देय है'}
              </h4>
              <p className="text-slate-300 text-[11px] mt-0.5">
                नियम: केवल आधार और पुलिस दोनों वेरिफाइड होने तथा सक्रिय सदस्यता पर ही चालक ग्राहक ऐप में लाइव हो सकता है।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!currentDriver.subscriptionPaid && (
              <button
                type="button"
                onClick={handleRenewSubscription}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-[#D4AF37]/20 flex items-center gap-1"
              >
                <span>सदस्यता रिन्यू करें (₹299/माह)</span>
              </button>
            )}
            {!currentDriver.isPoliceVerified && onOpenAdminPanel && (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="py-2 px-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
              >
                एडमिन सत्यापन देखें
              </button>
            )}
          </div>
        </div>
      )}

      {/* Driver Stats Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0A1931] border border-[#D4AF37]/40 space-y-1">
          <span className="text-slate-400 text-xs font-medium">आज की कुल कमाई</span>
          <div className="text-xl sm:text-2xl font-mono font-black text-[#D4AF37]">
            ₹{todayEarnings}
          </div>
          <span className="text-[10px] text-emerald-400">100% आपकी जेब में</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-medium">आज की कुल राइड्स</span>
          <div className="text-xl sm:text-2xl font-mono font-black text-white">
            {todayRides} <span className="text-xs text-slate-400 font-normal">ट्रिप्स</span>
          </div>
          <span className="text-[10px] text-slate-400">₹10/राइड प्लेटफॉर्म शुल्क</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-medium">ड्राइवर रेटिंग</span>
          <div className="text-xl sm:text-2xl font-mono font-black text-[#D4AF37] flex items-center gap-1">
            <Star className="w-5 h-5 fill-[#D4AF37]" />
            <span>{currentDriver.rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-[#D4AF37]">टॉप रेटेड रॉयल ड्राइवर</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-1 flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-medium">डिजिटल आईडी कार्ड</span>
          <button
            type="button"
            onClick={() => setShowIdCard(true)}
            className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold flex items-center justify-between"
          >
            <span>कार्ड व QR देखें</span>
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SIMULATE TEST RIDE BUTTON */}
      {!activeTrip && !incomingRequest && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white">ड्राइवर टेस्ट टूल:</span> यदि आप परीक्षण कर रहे हैं, तो नीचे दिए बटन से तत्काल ग्राहक राइड रिक्वेस्ट का बीप ट्रिगर करें।
          </div>
          <button
            type="button"
            onClick={handleTriggerMockRideRequest}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow flex items-center gap-1.5 shrink-0"
          >
            <Bell className="w-4 h-4" />
            <span>ग्राहक राइड बीप टेस्ट करें</span>
          </button>
        </div>
      )}

      {/* INCOMING RIDE REQUEST CARD WITH BEEP */}
      {incomingRequest && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1A0B2E] via-[#0A1931] to-[#040C1A] border-4 border-[#D4AF37] shadow-2xl animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
              <h3 className="text-lg font-black text-white">
                🚨 नई राइड अनुरोध (Incoming Ride Request!)
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono font-black text-[#D4AF37]">
                ₹{incomingRequest.fare}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                {incomingRequest.distanceKm} km
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400">पिकअप:</span>
              <span className="text-white font-bold">{incomingRequest.pickup}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-slate-400">ड्रॉप:</span>
              <span className="text-white font-bold">{incomingRequest.drop}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              ग्राहक: <span className="text-white font-bold">{incomingRequest.customerName}</span> • नकद या UPI भुगतान
            </div>

            {/* 90/10 Worker Platform Split Banner */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-[#D4AF37]/40 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">आपकी सीधी कमाई (90%)</span>
                <span className="text-emerald-400 font-black text-sm">
                  ₹{Math.round(incomingRequest.fare * 0.90)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">प्लेटफॉर्म शुल्क (10%)</span>
                <span className="text-[#D4AF37] font-bold">
                  ₹{incomingRequest.fare - Math.round(incomingRequest.fare * 0.90)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Accept / Reject */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleRejectRide}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs uppercase"
            >
              अस्वीकार (Reject)
            </button>
            <button
              type="button"
              onClick={handleAcceptRide}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>स्वीकार करें (Accept Ride)</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE TRIP WORKFLOW */}
      {activeTrip && (
        <div className="p-6 rounded-3xl bg-[#0A1931] border-2 border-emerald-500 space-y-6">
          {/* Trip Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                ACTIVE TRIP IN PROGRESS
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                {activeTrip.customerName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{activeTrip.rideId}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSOSModal(true)}
                className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 shadow animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>चालक SOS</span>
              </button>
            </div>
          </div>

          {/* Flow Step 1: Going to Pickup */}
          {activeTrip.status === 'going_to_pickup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-[#D4AF37] uppercase">
                  कदम 1: पिकअप स्थान पर पहुंचें
                </div>
                <div className="text-sm font-bold text-white">{activeTrip.pickup}</div>
                <div className="text-xs text-slate-400">
                  ग्राहक का फोन: <span className="text-white font-mono">{activeTrip.customerPhone}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#071938] border border-[#D4AF37]/40 space-y-3">
                <label className="text-xs font-bold text-white block">
                  ग्राहक से 4-अंकों का Start OTP पूछें व दर्ज करें:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeTrip.enteredOtp}
                    onChange={(e) => setActiveTrip({ ...activeTrip, enteredOtp: e.target.value })}
                    placeholder={`OTP डालें (डेमो: ${activeTrip.startOtp})`}
                    className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-[#D4AF37] font-black focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtpAndStart}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs uppercase"
                  >
                    सत्यापित करें व राइड शुरू करें
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Flow Step 2: Driving to Drop */}
          {activeTrip.status === 'driving_to_drop' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <Navigation className="w-4 h-4 animate-spin" />
                  <span>कदम 2: गंतव्य की ओर प्रस्थान</span>
                </div>
                <div className="text-sm font-bold text-white">{activeTrip.drop}</div>
                <p className="text-xs text-slate-300">
                  यातायात नियमों का पालन करें। सुरक्षित गति बनाए रखें।
                </p>
              </div>

              <button
                type="button"
                onClick={handleCompleteTrip}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>गंतव्य आ गया — राइड समाप्त करें (End Trip)</span>
              </button>
            </div>
          )}

          {/* Flow Step 3: Payment Collection */}
          {activeTrip.status === 'payment_collection' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-[#D4AF37] text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-black border border-[#D4AF37]/40">
                FARES SETTLEMENT
              </span>
              <h4 className="text-xl font-black text-white">किराया प्राप्त करें</h4>
              <div className="text-4xl font-mono font-black text-[#D4AF37]">
                ₹{activeTrip.fare}
              </div>

              <div className="max-w-xs mx-auto p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>ग्राहक से नकद / UPI लें:</span>
                  <span className="font-bold text-white">₹{activeTrip.fare}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>प्लेटफॉर्म शुल्क (Flat):</span>
                  <span>-₹10</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                  <span>आपकी शुद्ध कमाई:</span>
                  <span>₹{activeTrip.fare - 10}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmPayment}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
              >
                ₹{activeTrip.fare} नकद / UPI प्राप्त हो गया ✓
              </button>
            </div>
          )}

          {/* Flow Step 4: Finished & Rate Customer */}
          {activeTrip.status === 'rated' && (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-white">ट्रिप सफलता से पूरी हुई!</h4>
              <p className="text-xs text-slate-300">
                ₹{activeTrip.fare - 10} आपके आज के वॉलेट में जोड़ दिया गया है।
              </p>
              <button
                type="button"
                onClick={handleFinishEverything}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                अगली राइड के लिए तैयार हों
              </button>
            </div>
          )}
        </div>
      )}

      {/* DIGITAL ID CARD MODAL */}
      {showIdCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <DriverDigitalCard
            driver={currentDriver}
            onClose={() => setShowIdCard(false)}
          />
        </div>
      )}

      {/* DRIVER SOS MODAL */}
      <AISafetyAndChatModal
        isOpen={showSOSModal}
        onClose={() => setShowSOSModal(false)}
        mode="sos"
        rideId={activeTrip?.rideId || 'DRV-DIRECT'}
        driverRoyalId={currentDriver.royalId}
        driverName={currentDriver.name}
        locationAddress={currentDriver.currentLocation.landmark}
        userType="driver"
        onConfirmSOS={(reason, audioRecorded) => {
          RoyalAutoStorage.triggerSOS({
            ticketId: `SOS-DRV-${Math.floor(1000 + Math.random() * 9000)}`,
            rideId: activeTrip?.rideId || 'DRIVER-SAFETY',
            driverRoyalId: currentDriver.royalId,
            driverName: currentDriver.name,
            customerName: activeTrip?.customerName || 'N/A',
            customerPhone: activeTrip?.customerPhone || 'N/A',
            triggeredBy: 'driver',
            reason,
            location: {
              lat: currentDriver.currentLocation.lat,
              lng: currentDriver.currentLocation.lng,
              address: currentDriver.currentLocation.landmark,
            },
            audioRecordingSimulated: audioRecorded,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'active',
            nearestPoliceStation: `${currentDriver.cityName} कोतवाली थाना (1.2 km)`,
          });
        }}
      />
    </div>
  );
};
