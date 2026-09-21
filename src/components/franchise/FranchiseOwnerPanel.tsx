import React, { useState } from 'react';
import {
  Building2,
  Users,
  CalendarCheck,
  Wallet,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ShieldCheck,
  UserPlus,
  Send,
  Phone,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Search,
  Filter,
  Eye,
  LogOut,
  Sparkles,
  Lock,
} from 'lucide-react';
import {
  FranchiseCity,
  CityWorker,
  CityBooking,
  WithdrawalRequest,
} from './franchiseTypes';
import { FranchiseStorage } from './franchiseData';
import { Language } from '../../types';

interface FranchiseOwnerPanelProps {
  lang?: Language;
  onLogout?: () => void;
  onOpenCustomerView?: () => void;
}

export const FranchiseOwnerPanel: React.FC<FranchiseOwnerPanelProps> = ({
  lang = 'hi',
  onLogout,
  onOpenCustomerView,
}) => {
  // Load initial data from Storage
  const [cities, setCities] = useState<FranchiseCity[]>(() => FranchiseStorage.getCities());
  const [workers, setWorkers] = useState<CityWorker[]>(() => FranchiseStorage.getWorkers());
  const [bookings, setBookings] = useState<CityBooking[]>(() => FranchiseStorage.getBookings());
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => FranchiseStorage.getWithdrawals());

  // Current Logged-in City (default to Bhopal, can switch to any approved city)
  const [activeCityId, setActiveCityId] = useState<string>('bhopal');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workers' | 'bookings' | 'wallet' | 'marketing'>('dashboard');

  // Modal States
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<CityBooking | null>(null);
  const [activePosterType, setActivePosterType] = useState<'franchise' | 'gig' | 'customer'>('franchise');

  // New Worker Form
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerMobile, setNewWorkerMobile] = useState('');
  const [newWorkerCategory, setNewWorkerCategory] = useState('Home Services');
  const [newWorkerSkill, setNewWorkerSkill] = useState('');

  // Withdrawal Form
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawUpi, setWithdrawUpi] = useState('');
  const [withdrawName, setWithdrawName] = useState('');

  // Get current city
  const currentCity = cities.find((c) => c.id === activeCityId) || cities[0];

  // Filter workers for current city
  const cityWorkers = workers.filter((w) => w.cityId === activeCityId);

  // Filter bookings for current city
  const cityBookings = bookings.filter((b) => b.cityId === activeCityId);

  // Filter withdrawals for current city
  const cityWithdrawals = withdrawals.filter((w) => w.cityId === activeCityId);

  // Calculations for current city
  const todayBookings = cityBookings.filter((b) => b.date === '2026-09-21').length || cityBookings.length;
  const totalEarned70 = cityBookings.reduce((sum, b) => sum + (b.franchiseShare70 || 0), 0);
  const totalTransferredHO30 = cityBookings.reduce((sum, b) => sum + (b.headOfficeShare30 || 0), 0);
  const totalPaidWithdrawals = cityWithdrawals
    .filter((w) => w.status === 'paid' || w.status === 'approved')
    .reduce((sum, w) => sum + w.amount, 0);
  const availableBalance = Math.max(0, totalEarned70 - totalPaidWithdrawals);

  // Handle worker approval
  const handleToggleWorkerStatus = (workerId: string) => {
    const updated = workers.map((w) => {
      if (w.id === workerId) {
        const nextStatus = w.status === 'active' ? 'blocked' : 'active';
        return { ...w, status: nextStatus as any };
      }
      return w;
    });
    setWorkers(updated);
    FranchiseStorage.saveWorkers(updated);
  };

  // Handle Aadhaar/Police verification toggle
  const handleVerifyWorker = (workerId: string, type: 'aadhaar' | 'police') => {
    const updated = workers.map((w) => {
      if (w.id === workerId) {
        if (type === 'aadhaar') return { ...w, aadhaarVerified: !w.aadhaarVerified };
        if (type === 'police') return { ...w, policeVerified: !w.policeVerified };
      }
      return w;
    });
    setWorkers(updated);
    FranchiseStorage.saveWorkers(updated);
  };

  // Handle adding new worker
  const handleAddNewWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName || !newWorkerMobile || !newWorkerSkill) {
      alert('कृपया नाम, मोबाइल नंबर और कौशल भरें।');
      return;
    }

    const newWorker: CityWorker = {
      id: `wrk-${activeCityId}-${Date.now().toString().slice(-4)}`,
      cityId: activeCityId,
      cityName: currentCity.cityName,
      name: newWorkerName,
      mobile: newWorkerMobile,
      serviceCategory: newWorkerCategory,
      skillName: newWorkerSkill,
      experienceYears: 3,
      status: 'active',
      aadhaarVerified: true,
      policeVerified: false,
      rating: 5.0,
      totalTasksCompleted: 0,
      dailyEarningsToday: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newWorker, ...workers];
    setWorkers(updated);
    FranchiseStorage.saveWorkers(updated);
    setIsAddWorkerOpen(false);
    setNewWorkerName('');
    setNewWorkerMobile('');
    setNewWorkerSkill('');
  };

  // Handle assigning worker to booking
  const handleAssignWorker = (workerId: string) => {
    if (!selectedBookingForAssign) return;
    const worker = workers.find((w) => w.id === workerId);
    if (!worker) return;

    const updatedBookings = bookings.map((b) => {
      if (b.id === selectedBookingForAssign.id) {
        return {
          ...b,
          assignedWorkerId: worker.id,
          assignedWorkerName: worker.name,
          assignedWorkerMobile: worker.mobile,
          status: 'assigned' as const,
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    FranchiseStorage.saveBookings(updatedBookings);
    setSelectedBookingForAssign(null);
  };

  // Handle updating booking status
  const handleUpdateBookingStatus = (bookingId: string, status: CityBooking['status']) => {
    const updatedBookings = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    });
    setBookings(updatedBookings);
    FranchiseStorage.saveBookings(updatedBookings);
  };

  // Handle withdrawal submission
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0 || amountNum > availableBalance) {
      alert(`कृपया ₹1 से ₹${availableBalance} तक की मान्य राशि दर्ज करें।`);
      return;
    }

    const newReq: WithdrawalRequest = {
      id: `wth-${activeCityId}-${Date.now().toString().slice(-4)}`,
      cityId: activeCityId,
      cityName: currentCity.cityName,
      amount: amountNum,
      upiIdOrBank: withdrawUpi || `${currentCity.ownerMobile}@upi`,
      accountHolderName: withdrawName || currentCity.ownerName,
      status: 'pending',
      requestedAt: new Date().toLocaleString(),
    };

    const updated = [newReq, ...withdrawals];
    setWithdrawals(updated);
    FranchiseStorage.saveWithdrawals(updated);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount('');
    alert(`₹${amountNum} का विथड्रॉल अनुरोध दर्ज हुआ। 2 से 4 घंटे में रीवा हेड ऑफिस से ट्रांसफर होगा।`);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* 1. TOP STATUS BAR: CITY SELECTION & OWNER IDENTITY */}
      <div className="rounded-2xl bg-gradient-to-r from-[#06142B] via-[#0A1931] to-[#040C1A] border-2 border-[#D4AF37] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-2xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white">
                {currentCity.cityName} — फ्रैंचाइज़ी ओनर पैनल
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 font-mono">
                ● ACTIVE CITY
              </span>
            </div>
            <p className="text-xs text-amber-200">
              ओनर: <strong>{currentCity.ownerName}</strong> • संपर्क: {currentCity.ownerMobile} • हेड ऑफिस: रीवा (म.प्र.)
            </p>
          </div>
        </div>

        {/* City Switcher / Demo Selector */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <label className="text-xs text-slate-400 font-bold whitespace-nowrap">शहर बदलें (Switch City):</label>
          <select
            value={activeCityId}
            onChange={(e) => setActiveCityId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#040D1C] border border-[#D4AF37]/60 text-xs text-white font-bold focus:outline-none"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.cityName} {c.isHeadOffice ? '(HQ)' : ''}
              </option>
            ))}
          </select>

          {onOpenCustomerView && (
            <button
              onClick={onOpenCustomerView}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 whitespace-nowrap"
            >
              कस्टमर व्यू
            </button>
          )}
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>📊</span>
          <span>डैशबोर्ड ओवरव्यू</span>
        </button>

        <button
          onClick={() => setActiveTab('workers')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'workers'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>लोकल वर्कर्स प्रबंधन ({cityWorkers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>शहर की बुकिंग्स ({cityBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'wallet'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>वॉलेट & 70% कमाई</span>
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'marketing'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>मार्केटिंग पोस्टर्स & बोर्ड डिज़ाइन</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* === TAB 1: DASHBOARD === */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* 4 Primary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: My City */}
            <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-[#D4AF37]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">माय सिटी (My City)</span>
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-2xl font-black text-white">{currentCity.cityName}</div>
              <div className="text-[11px] text-amber-300 font-medium">
                {currentCity.officeAddress || 'मेन बाजार, सिविल लाइन्स'}
              </div>
            </div>

            {/* Card 2: Today Bookings */}
            <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-blue-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">आज की कुल बुकिंग्स</span>
                <CalendarCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-blue-400 font-mono">{todayBookings}</div>
              <div className="text-[11px] text-slate-300">
                कुल ऐतिहासिक बुकिंग्स: <strong className="text-white">{cityBookings.length}</strong>
              </div>
            </div>

            {/* Card 3: Total Gig Workers */}
            <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">शहर में एक्टिव गिग वर्कर्स</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono">{cityWorkers.length}</div>
              <div className="text-[11px] text-emerald-300">
                100% आधार & पुलिस वेरिफाइड
              </div>
            </div>

            {/* Card 4: My Earnings 70% */}
            <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-[#D4AF37] space-y-2 bg-gradient-to-br from-[#0A1931] to-[#040C1A]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37]">मेरी कमाई (70% शेयर)</span>
                <Wallet className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                ₹{totalEarned70.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-between">
                <span>उपलब्ध बैलेंस: ₹{availableBalance.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="px-2 py-0.5 rounded bg-[#D4AF37] text-slate-950 text-[10px] font-black"
                >
                  निकासी ➔
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Strip & Today's Orders Quick Glance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Live Bookings Queue */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#061224] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>आज की लाइव बुकिंग्स (Live Dispatch Queue)</span>
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-[#D4AF37] hover:underline font-bold"
                >
                  सभी देखें ({cityBookings.length}) ➔
                </button>
              </div>

              <div className="space-y-3">
                {cityBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-xl bg-[#0A1931] border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{booking.serviceName}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            booking.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : booking.status === 'in_progress'
                              ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                              : booking.status === 'assigned'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        कस्टमर: <strong>{booking.customerName}</strong> ({booking.customerMobile}) • {booking.customerAddress}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        समय: {booking.time} • कुल: ₹{booking.totalAmount} • <strong>70% आपका: ₹{booking.franchiseShare70}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                      {booking.status === 'pending' ? (
                        <button
                          onClick={() => {
                            setSelectedBookingForAssign(booking);
                            setActiveTab('bookings');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-slate-950 text-xs font-black"
                        >
                          वर्कर असाइन करें
                        </button>
                      ) : (
                        <div className="text-right text-xs">
                          <div className="text-slate-400 text-[10px]">असाइंड वर्कर</div>
                          <div className="text-white font-bold">{booking.assignedWorkerName}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Staff & Head Office Status */}
            <div className="p-6 rounded-2xl bg-[#061224] border border-slate-800 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>🎓</span>
                <span>रीवा ट्रेनिंग व स्टाफ सिस्टम</span>
              </h3>

              <div className="p-4 rounded-xl bg-[#0A1931] border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">प्रशिक्षित सपोर्ट गर्ल (1 Girl):</span>
                  <span className="text-emerald-400">1/1 Active</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  कॉल सपोर्ट, आर्डर कन्फर्मेशन और कस्टमर कंप्लेंट डेस्क संभालती हैं।
                </div>

                <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">फील्ड सुपरवाइजर (2 Boys):</span>
                  <span className="text-emerald-400">2/2 On Ground</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  कारीगरों का स्पॉट वेरिफिकेशन, पुलिस वेरिफिकेशन समन्वय और क्वालिटी चेक।
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/40 text-xs space-y-2">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>रीवा हेड ऑफिस सपोर्ट लाइन</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  डायरेक्टर मनीष विश्वकर्मा • सेंट्रल टेक टीम 24x7 एक्टिव
                </div>
                <a
                  href="tel:9399608239"
                  className="inline-block text-[11px] text-[#D4AF37] font-mono font-bold hover:underline"
                >
                  📞 9399608239 (डायरेक्ट हॉटलाइन)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === TAB 2: MANAGE WORKERS (CITY-WISE ONLY) === */}
      {activeTab === 'workers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                लोकल गिग & साथी वर्कर्स ({currentCity.cityName})
              </h3>
              <p className="text-xs text-slate-400">
                आपके शहर के सभी पंजीकृत कारीगर, साथी और सेवा प्रदाता। आप नए वर्कर जोड़ या अप्रूव कर सकते हैं।
              </p>
            </div>

            <button
              onClick={() => setIsAddWorkerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 hover:brightness-110 shadow-lg"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ नया वर्कर जोड़ें (Add Worker)</span>
            </button>
          </div>

          {/* Workers Table / Card List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cityWorkers.map((worker) => (
              <div
                key={worker.id}
                className="p-5 rounded-2xl bg-[#0A1931] border border-slate-700/80 hover:border-[#D4AF37]/60 transition-all space-y-4 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-black text-lg">
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{worker.name}</h4>
                      <div className="text-xs text-[#D4AF37] font-semibold">{worker.skillName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{worker.mobile}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      worker.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {worker.status === 'active' ? 'सक्रिय (Active)' : 'ब्लॉक (Blocked)'}
                  </span>
                </div>

                {/* Verification Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <button
                    onClick={() => handleVerifyWorker(worker.id, 'aadhaar')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border ${
                      worker.aadhaarVerified
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{worker.aadhaarVerified ? 'आधार वेरिफाइड ✓' : 'आधार पेंडिंग'}</span>
                  </button>

                  <button
                    onClick={() => handleVerifyWorker(worker.id, 'police')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border ${
                      worker.policeVerified
                        ? 'bg-blue-950/60 border-blue-500/50 text-blue-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{worker.policeVerified ? 'पुलिस CID वेरिफाइड ✓' : 'पुलिस जांच पेंडिंग'}</span>
                  </button>

                  <span className="text-amber-400 font-mono font-bold ml-auto">
                    ★ {worker.rating} ({worker.totalTasksCompleted} टास्क)
                  </span>
                </div>

                {/* Worker Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <a
                    href={`tel:${worker.mobile}`}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करें</span>
                  </a>

                  <button
                    onClick={() => handleToggleWorkerStatus(worker.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      worker.status === 'active'
                        ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800'
                        : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {worker.status === 'active' ? 'काम रोकें / ब्लॉक करें' : 'पुनः एक्टिव करें'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Worker Modal */}
          {isAddWorkerOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="text-base font-black text-white">
                    नया वर्कर जोड़ें ({currentCity.cityName})
                  </h3>
                  <button
                    onClick={() => setIsAddWorkerOpen(false)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddNewWorker} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">वर्कर का नाम</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राकेश वर्मा"
                      value={newWorkerName}
                      onChange={(e) => setNewWorkerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">मोबाइल नंबर</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="उदा. 9826011223"
                      value={newWorkerMobile}
                      onChange={(e) => setNewWorkerMobile(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">सर्विस श्रेणी (Category)</label>
                    <select
                      value={newWorkerCategory}
                      onChange={(e) => setNewWorkerCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none"
                    >
                      <option value="Home Services">Home Services (इलेक्ट्रीशियन, प्लंबर, AC, कारपेंटर)</option>
                      <option value="Medical & Companion Sathi">Medical & Companion Sathi (अस्पताल साथी, केयरटेकर)</option>
                      <option value="Beauty & Personal Care">Beauty & Personal Care (ब्यूटीशियन, सैलून)</option>
                      <option value="Delivery & Driver">Delivery & Driver (डिलीवरी पार्टनर, ड्राइवर)</option>
                      <option value="Education & Tech">Education & Tech (होम ट्यूटर, कंप्यूटर रिपेयर)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">विशिष्ट कार्य/ट्रेड (Skill/Trade)</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. एसी रिपेयर & इन्वर्टर टेक्नीशियन"
                      value={newWorkerSkill}
                      onChange={(e) => setNewWorkerSkill(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddWorkerOpen(false)}
                      className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 text-xs font-black"
                    >
                      वर्कर सेव करें
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === TAB 3: MANAGE BOOKINGS (CITY-WISE ONLY) === */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                शहर की बुकिंग्स प्रबंधन ({currentCity.cityName})
              </h3>
              <p className="text-xs text-slate-400">
                आपके शहर से आई सभी ऑन-डिमांड कस्टमर रिक्वेस्ट्स। वर्कर असाइन करें और स्टेटस अपडेट करें।
              </p>
            </div>

            <div className="text-xs font-mono text-emerald-400 bg-black/50 px-3 py-1.5 rounded-xl border border-emerald-500/40">
              कुल आर्डर: {cityBookings.length} • 70% ओनर शेयर ऑटो-कैलकुलेटेड
            </div>
          </div>

          <div className="space-y-4">
            {cityBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl bg-[#0A1931] border border-slate-700 hover:border-[#D4AF37]/50 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded">
                      #{booking.id}
                    </span>
                    <h4 className="text-sm font-black text-white">{booking.serviceName}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">({booking.category})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-black uppercase ${
                        booking.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : booking.status === 'in_progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                          : booking.status === 'assigned'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 bg-black/40 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px]">कस्टमर विवरण:</span>
                    <strong className="text-white">{booking.customerName}</strong>
                    <div className="text-[11px] text-slate-400">{booking.customerMobile}</div>
                    <div className="text-[11px] text-slate-400">{booking.customerAddress}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">तारीख & समय:</span>
                    <div className="font-mono">{booking.date} • {booking.time}</div>
                    {booking.otp && (
                      <div className="text-[11px] text-emerald-400 font-mono mt-1">
                        सुरक्षा OTP: <strong>{booking.otp}</strong>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">रेवेन्यू विभाजन (70/30):</span>
                    <div className="text-white font-mono">कुल बिल: ₹{booking.totalAmount}</div>
                    <div className="text-[#D4AF37] font-bold font-mono">
                      आपका 70%: ₹{booking.franchiseShare70}
                    </div>
                    <div className="text-blue-400 font-mono text-[10px]">
                      हेड ऑफिस 30%: ₹{booking.headOfficeShare30}
                    </div>
                  </div>
                </div>

                {/* Worker Assignment and Status Controller */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">असाइंड वर्कर:</span>
                    {booking.assignedWorkerName ? (
                      <span className="text-xs font-bold text-white bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-800">
                        {booking.assignedWorkerName} ({booking.assignedWorkerMobile})
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-400">कोई नहीं (Unassigned)</span>
                    )}

                    <button
                      onClick={() => setSelectedBookingForAssign(booking)}
                      className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-slate-950 text-xs font-black hover:brightness-110"
                    >
                      {booking.assignedWorkerName ? 'वर्कर बदलें' : 'वर्कर असाइन करें ➔'}
                    </button>
                  </div>

                  {/* Status Change Buttons */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">स्टेटस बदलें:</span>
                    <button
                      onClick={() => handleUpdateBookingStatus(booking.id, 'in_progress')}
                      className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 text-[11px] font-bold border border-amber-800 hover:bg-amber-900"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                      className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-[11px] font-bold border border-emerald-800 hover:bg-emerald-900"
                    >
                      Completed ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Worker Assignment Modal */}
          {selectedBookingForAssign && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="text-base font-black text-white">
                    वर्कर चुनें: #{selectedBookingForAssign.id} ({selectedBookingForAssign.serviceName})
                  </h3>
                  <button
                    onClick={() => setSelectedBookingForAssign(null)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-300">
                  {currentCity.cityName} के उपलब्ध सक्रिय कारीगरों में से किसी एक को यह टास्क असाइन करें:
                </p>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {cityWorkers
                    .filter((w) => w.status === 'active')
                    .map((worker) => (
                      <div
                        key={worker.id}
                        className="p-3 rounded-xl bg-[#040D1C] border border-slate-700 hover:border-[#D4AF37] flex items-center justify-between gap-3 cursor-pointer"
                        onClick={() => handleAssignWorker(worker.id)}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{worker.name}</div>
                          <div className="text-[11px] text-[#D4AF37]">{worker.skillName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{worker.mobile}</div>
                        </div>

                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 text-xs font-black hover:brightness-110"
                        >
                          असाइन करें
                        </button>
                      </div>
                    ))}
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => setSelectedBookingForAssign(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    बंद करें
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === TAB 4: WALLET & 70% EARNINGS === */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          {/* Wallet Balance Hero */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06142B] via-[#0A1931] to-[#040C1A] border-2 border-[#D4AF37] space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#D4AF37] tracking-wider uppercase font-mono">
                  FRANCHISE OWNER WALLET (70% DIRECT SHARE)
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                  ₹{availableBalance.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  उपलब्ध निकासी योग्य शेष (Available for Withdrawal)
                </p>
              </div>

              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-black text-xs hover:brightness-110 shadow-xl shadow-[#D4AF37]/30 flex items-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
                <span>निकासी का अनुरोध करें (Withdraw Request)</span>
              </button>
            </div>

            {/* Split Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/80">
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-xs text-slate-400">कुल 70% संचित कमाई</div>
                <div className="text-xl font-black text-[#D4AF37] font-mono mt-1">
                  ₹{totalEarned70.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400">शहर की सभी बुकिंग्स से</div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-xs text-slate-400">हेड ऑफिस 30% ऑटो ट्रांसफर</div>
                <div className="text-xl font-black text-blue-400 font-mono mt-1">
                  ₹{totalTransferredHO30.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400">रीवा हेड ऑफिस रॉयल्टी</div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <div className="text-xs text-slate-400">मासिक ब्रांड शुल्क स्थिति</div>
                <div className="text-xl font-black text-emerald-400 font-mono mt-1">
                  {currentCity.monthlyBrandFeePaid ? 'चुका दिया (PAID)' : 'पेंडिंग (₹3,000)'}
                </div>
                <div className="text-[10px] text-slate-400">सितंबर 2026 तक क्लियर</div>
              </div>
            </div>
          </div>

          {/* Withdrawal Requests Log */}
          <div className="p-6 rounded-2xl bg-[#061224] border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white">निकासी इतिहास (Withdrawal Requests Log)</h4>

            <div className="space-y-3">
              {cityWithdrawals.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#0A1931] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-white font-mono text-sm">₹{item.amount.toLocaleString('en-IN')}</strong>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.status === 'paid' ? 'सफल ट्रांसफर ✓' : 'प्रोसेसिंग में'}
                      </span>
                    </div>
                    <div className="text-slate-400">
                      खाता/UPI: <strong>{item.upiIdOrBank}</strong> ({item.accountHolderName})
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">अनुरोध समय: {item.requestedAt}</div>
                  </div>

                  {item.transactionRef && (
                    <div className="text-right text-[11px] font-mono text-slate-300 bg-black/40 px-3 py-1.5 rounded-lg border border-slate-800">
                      <div>UTR / Ref: {item.transactionRef}</div>
                      <div className="text-emerald-400 font-bold">हेड ऑफिस रीवा द्वारा स्वीकृत</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Withdrawal Modal */}
          {isWithdrawModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="text-base font-black text-white">बैंक/UPI निकासी का अनुरोध</h3>
                  <button
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs">
                    <span className="text-slate-400">उपलब्ध बैलेंस:</span>{' '}
                    <strong className="text-[#D4AF37] font-mono">₹{availableBalance.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">निकासी राशि (₹)</label>
                    <input
                      type="number"
                      required
                      min="100"
                      max={availableBalance}
                      placeholder="उदा. 10000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">UPI ID या बैंक खाता + IFSC</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. 9826112233@upi या SBI A/C 3099..."
                      value={withdrawUpi}
                      onChange={(e) => setWithdrawUpi(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">खाताधारक का नाम</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. अमित कुमार सक्सेना"
                      value={withdrawName}
                      onChange={(e) => setWithdrawName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWithdrawModalOpen(false)}
                      className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 text-xs font-black"
                    >
                      अनुरोध भेजें
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === TAB 5: MARKETING MATERIALS & POSTER DOWNLOADS === */}
      {activeTab === 'marketing' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                मार्केटिंग पोस्टर्स & बोर्ड डिज़ाइन डाउनलोड्स
              </h3>
              <p className="text-xs text-slate-400">
                रॉयल नेवी और गोल्ड थीम पर आधारित प्रिंट-रेडी डिज़ाइन्स। सीधे डाउनलोड करें या प्रिंट करें।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePosterType('franchise')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activePosterType === 'franchise'
                    ? 'bg-[#D4AF37] text-slate-950 font-black'
                    : 'bg-[#0A1931] text-slate-300'
                }`}
              >
                1. ऑफिस साइनबोर्ड
              </button>
              <button
                onClick={() => setActivePosterType('gig')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activePosterType === 'gig'
                    ? 'bg-[#D4AF37] text-slate-950 font-black'
                    : 'bg-[#0A1931] text-slate-300'
                }`}
              >
                2. कारीगर भर्ती पोस्टर
              </button>
              <button
                onClick={() => setActivePosterType('customer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  activePosterType === 'customer'
                    ? 'bg-[#D4AF37] text-slate-950 font-black'
                    : 'bg-[#0A1931] text-slate-300'
                }`}
              >
                3. ग्राहक सेवा पोस्टर
              </button>
            </div>
          </div>

          {/* Visual Poster Preview Container */}
          <div className="p-6 rounded-3xl bg-[#040C1A] border-2 border-[#D4AF37] space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="text-xs font-mono text-[#D4AF37]">
                प्रिंट रेडी प्रिव्यू (High Definition Royal Board 300 DPI)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1 text-slate-200"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>प्रिंट करें</span>
                </button>
                <button
                  onClick={() => alert(`पोस्टर '${activePosterType}' डाउनलोड फ़ाइल तैयार की जा रही है...`)}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 text-xs font-black flex items-center gap-1 hover:brightness-110"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>डाउनलोड PDF/SVG</span>
                </button>
              </div>
            </div>

            {/* Poster 1: Franchise Office Signboard */}
            {activePosterType === 'franchise' && (
              <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-[#06142B] via-[#0A1931] to-[#040C1A] border-4 border-[#D4AF37] text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] text-amber-300 font-mono border-b border-[#D4AF37]/30 pb-2">
                  <span>ISO 9001:2015 CERTIFIED</span>
                  <span className="font-bold">GOVT. OF INDIA MSME RECOGNIZED</span>
                  <span>CENTRAL HQ: REWA (M.P.)</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] tracking-wider font-heading">
                    JITOMNI 360° CAREERVERSE
                  </div>
                  <div className="text-sm sm:text-lg font-black text-cyan-300 uppercase tracking-widest">
                    {currentCity.cityName} OFFICIAL SATHI & GIG SERVICE CENTER
                  </div>
                  <div className="text-xs text-amber-200 font-medium">
                    "एक कॉल पर घर की हर सेवा — बुजुर्ग साथी से लेकर घर के प्लंबर तक"
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 text-[11px] font-bold text-white bg-black/60 rounded-xl border border-slate-700">
                  <div className="p-2 border-r border-slate-700">
                    <div className="text-[#D4AF37]">9 साथी सेवाएं</div>
                    <div className="text-[9px] text-slate-400">बुजुर्ग, अस्पताल, बैंक, गाइड</div>
                  </div>
                  <div className="p-2 border-r border-slate-700">
                    <div className="text-[#D4AF37]">35+ गिग सर्विसेज</div>
                    <div className="text-[9px] text-slate-400">इलेक्ट्रीशियन, AC, ब्यूटी, ट्यूटर</div>
                  </div>
                  <div className="p-2">
                    <div className="text-emerald-400">100% वेरिफाइड</div>
                    <div className="text-[9px] text-slate-400">आधार + पुलिस CID जांच</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-300">
                  <div>
                    कार्यालय: <strong>{currentCity.officeAddress || 'मेन बाजार, सिविल लाइन्स'}</strong>
                  </div>
                  <div className="font-mono font-bold text-[#D4AF37]">
                    हेल्पलाइन: {currentCity.ownerMobile}
                  </div>
                </div>
              </div>
            )}

            {/* Poster 2: Gig Worker Recruitment Poster */}
            {activePosterType === 'gig' && (
              <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#06142B] border-4 border-emerald-500 text-center space-y-4 shadow-2xl">
                <div className="inline-block px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                  {currentCity.cityName} में कारीगरों व डिलीवरी साथियों की बंपर भर्ती!
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  अपने शहर में काम पाएं — ₹15,000 से ₹40,000 महीना कमाएं
                </h3>

                <p className="text-xs text-slate-300">
                  इलेक्ट्रीशियन, प्लंबर, कारपेंटर, एसी मैकेनिक, ड्राइवर, अस्पताल साथी व होम ट्यूटर तुरंत संपर्क करें। <strong>जीरो रजिस्ट्रेशन फीस!</strong>
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-left bg-black/60 p-4 rounded-xl border border-slate-700 font-mono">
                  <div className="text-emerald-300">✓ प्रतिदिन सीधा 80% भुगतान</div>
                  <div className="text-emerald-300">✓ 5 किमी के दायरे में काम</div>
                  <div className="text-emerald-300">✓ पुलिस व आधार फ्री वेरिफिकेशन</div>
                  <div className="text-emerald-300">✓ दुर्घटना बीमा सुरक्षा</div>
                </div>

                <div className="pt-2 text-sm font-bold text-white bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/50 font-mono">
                  कॉल या व्हाट्सएप करें: <strong className="text-[#D4AF37] text-base">{currentCity.ownerMobile}</strong>
                </div>
              </div>
            )}

            {/* Poster 3: Customer Service Poster */}
            {activePosterType === 'customer' && (
              <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#0A1931] border-4 border-blue-500 text-center space-y-4 shadow-2xl">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500 text-white font-black text-xs">
                  {currentCity.cityName} की 24x7 ऑन-डिमांड हेल्पलाइन
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  एक कॉल पर घर की हर सर्विस — 30 मिनट में हाजिर!
                </h3>

                <p className="text-xs text-slate-300">
                  घर में नल टपक रहा हो, बिजली खराब हो, बुजुर्ग माता-पिता को अस्पताल ले जाना हो या घर पर ब्यूटीशियन बुलानी हो।
                </p>

                <div className="p-4 rounded-xl bg-black/60 border border-slate-700 text-xs text-slate-200 font-mono">
                  100% पुलिस वेरिफाइड कारीगर • पारदर्शी दरें • कोई हिडन चार्ज नहीं
                </div>

                <div className="pt-2 text-sm font-bold text-white bg-blue-950/80 p-3 rounded-xl border border-blue-500/50 font-mono">
                  तत्काल बुक करें: <strong className="text-[#D4AF37] text-base">{currentCity.ownerMobile}</strong> या जिटोम्नी ऐप डाउनलोड करें
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
