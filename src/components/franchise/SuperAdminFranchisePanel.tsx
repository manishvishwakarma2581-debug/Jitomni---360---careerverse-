import React, { useState } from 'react';
import {
  Crown,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  DollarSign,
  TrendingUp,
  Settings,
  Users,
  FileText,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Search,
  Filter,
  ArrowRight,
  Download,
  Phone,
  Printer,
  Sliders,
} from 'lucide-react';
import {
  FranchiseApplication,
  FranchiseCity,
  CityWorker,
  CityBooking,
  FranchiseSettings,
} from './franchiseTypes';
import { FranchiseStorage } from './franchiseData';
import { Language } from '../../types';

interface SuperAdminFranchisePanelProps {
  lang?: Language;
  onOpenCustomerView?: () => void;
  onOpenOwnerPanel?: () => void;
}

export const SuperAdminFranchisePanel: React.FC<SuperAdminFranchisePanelProps> = ({
  lang = 'hi',
  onOpenCustomerView,
  onOpenOwnerPanel,
}) => {
  // Load data from persistent storage
  const [applications, setApplications] = useState<FranchiseApplication[]>(() =>
    FranchiseStorage.getApplications()
  );
  const [cities, setCities] = useState<FranchiseCity[]>(() => FranchiseStorage.getCities());
  const [workers, setWorkers] = useState<CityWorker[]>(() => FranchiseStorage.getWorkers());
  const [bookings, setBookings] = useState<CityBooking[]>(() => FranchiseStorage.getBookings());
  const [settings, setSettings] = useState<FranchiseSettings>(() => FranchiseStorage.getSettings());

  // Navigation tab inside Super Admin
  const [activeAdminTab, setActiveAdminTab] = useState<
    'requests' | 'all_cities' | 'royalty' | 'master_control' | 'reports'
  >('requests');

  // Selected city for detail modal / view
  const [selectedCityForDetail, setSelectedCityForDetail] = useState<FranchiseCity | null>(null);

  // Filter application status
  const [appFilter, setAppFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Master Control Inputs
  const [ownerCommission, setOwnerCommission] = useState(settings.ownerCommissionRate);
  const [hoCommission, setHoCommission] = useState(settings.headOfficeCommissionRate);
  const [monthlyBrandFeeInput, setMonthlyBrandFeeInput] = useState(settings.monthlyBrandFee);
  const [franchiseFeeInput, setFranchiseFeeInput] = useState(settings.franchiseFee);

  // Overall calculations across India
  const totalFranchiseFeesCollected = cities
    .filter((c) => c.franchiseFeePaid)
    .reduce((sum, c) => sum + (c.franchiseFeeAmount || 75000), 0);

  const totalPanIndiaBookings = cities.reduce((sum, c) => sum + (c.totalBookings || 0), 0);
  const totalPanIndiaRevenue = cities.reduce((sum, c) => sum + (c.totalRevenue || 0), 0);
  const totalPanIndiaRoyaltyCollected = Math.round(totalPanIndiaRevenue * (settings.headOfficeCommissionRate / 100));
  const totalPanIndiaWorkers = cities.reduce((sum, c) => sum + (c.totalWorkers || 0), 0);

  // Handle Application Approval
  const handleApproveApplication = (appId: string) => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    const citySlug = targetApp.city.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newCityId = citySlug || `city-${Date.now().toString().slice(-4)}`;

    // Create new city
    const newCity: FranchiseCity = {
      id: newCityId,
      cityName: targetApp.city,
      state: targetApp.state,
      ownerName: targetApp.name,
      ownerMobile: targetApp.mobile,
      ownerEmail: targetApp.email,
      loginPasscode: `${newCityId}75000`,
      status: 'active',
      franchiseFeePaid: true,
      franchiseFeeAmount: 75000,
      joinedDate: new Date().toISOString().split('T')[0],
      isHeadOffice: false,
      totalBookings: 0,
      totalRevenue: 0,
      totalWorkers: 0,
      monthlyBrandFeePaid: true,
      trainedStaffCount: { girls: 1, boys: 2 },
    };

    const updatedCities = [newCity, ...cities];
    setCities(updatedCities);
    FranchiseStorage.saveCities(updatedCities);

    // Update application status
    const updatedApps = applications.map((a) => {
      if (a.id === appId) {
        return { ...a, status: 'approved' as const, feePaid: true, assignedCityId: newCityId };
      }
      return a;
    });
    setApplications(updatedApps);
    FranchiseStorage.saveApplications(updatedApps);

    alert(`बधाई! ${targetApp.name} (${targetApp.city}) की फ्रैंचाइज़ी स्वीकृत हुई और ₹75,000 शुल्क पेड दर्ज किया गया।`);
  };

  // Handle Application Rejection
  const handleRejectApplication = (appId: string) => {
    const updatedApps = applications.map((a) => {
      if (a.id === appId) {
        return { ...a, status: 'rejected' as const };
      }
      return a;
    });
    setApplications(updatedApps);
    FranchiseStorage.saveApplications(updatedApps);
  };

  // Handle Marking Franchise Fee Paid
  const handleToggleFeePaid = (appId: string) => {
    const updatedApps = applications.map((a) => {
      if (a.id === appId) {
        return { ...a, feePaid: !a.feePaid };
      }
      return a;
    });
    setApplications(updatedApps);
    FranchiseStorage.saveApplications(updatedApps);
  };

  // Handle Blocking / Unblocking City
  const handleToggleBlockCity = (cityId: string) => {
    const updatedCities = cities.map((c) => {
      if (c.id === cityId && !c.isHeadOffice) {
        const nextStatus = c.status === 'blocked' ? 'active' : 'blocked';
        return { ...c, status: nextStatus as any };
      }
      return c;
    });
    setCities(updatedCities);
    FranchiseStorage.saveCities(updatedCities);
  };

  // Handle Blocking Worker across India
  const handleToggleBlockWorker = (workerId: string) => {
    const updatedWorkers = workers.map((w) => {
      if (w.id === workerId) {
        const nextStatus = w.status === 'blocked' ? 'active' : 'blocked';
        return { ...w, status: nextStatus as any };
      }
      return w;
    });
    setWorkers(updatedWorkers);
    FranchiseStorage.saveWorkers(updatedWorkers);
  };

  // Handle Saving Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FranchiseSettings = {
      ...settings,
      ownerCommissionRate: Number(ownerCommission),
      headOfficeCommissionRate: Number(hoCommission),
      monthlyBrandFee: Number(monthlyBrandFeeInput),
      franchiseFee: Number(franchiseFeeInput),
    };
    setSettings(updated);
    FranchiseStorage.saveSettings(updated);
    alert('रीवा हेड ऑफिस सेटिंग्स सफलतापूर्वक अपडेट हो गईं!');
  };

  const filteredApps = applications.filter((a) => {
    if (appFilter === 'all') return true;
    return a.status === appFilter;
  });

  return (
    <div className="space-y-8 text-slate-100">
      {/* 1. TOP SOVEREIGN HEADER: REWA HEAD OFFICE */}
      <div className="rounded-3xl bg-gradient-to-r from-[#040C1A] via-[#0A1931] to-[#040C1A] border-2 border-[#D4AF37] p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-3xl shadow-lg">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  रीवा हेड ऑफिस — सुपर एडमिन कंट्रोल रूम (Pan-India HQ)
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 text-xs font-black">
                  DIRECTOR: MANISH VISHWAKARMA
                </span>
              </div>
              <p className="text-xs text-amber-200 mt-0.5">
                संपूर्ण भारत में फ्रैंचाइज़ी आवंटन, 30% रॉयल्टी संग्रह, स्टाफ ट्रेनिंग और गुणवत्ता नियंत्रण।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenOwnerPanel && (
              <button
                onClick={onOpenOwnerPanel}
                className="px-3.5 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-bold border border-blue-600"
              >
                सिटी ओनर पैनल देखें
              </button>
            )}
            {onOpenCustomerView && (
              <button
                onClick={onOpenCustomerView}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
              >
                कस्टमर इन्फो पेज
              </button>
            )}
          </div>
        </div>

        {/* 4 Pan-India High Level Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-700/80">
          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">सक्रिय फ्रैंचाइज़ी शहर</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {cities.filter((c) => c.status === 'active').length} शहर
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">10 प्रमुख मेट्रो व जोन्स</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">कुल फ्रैंचाइज़ी फीस संकलित</div>
            <div className="text-2xl font-black text-[#D4AF37] font-mono mt-0.5">
              ₹{(totalFranchiseFeesCollected / 100000).toFixed(2)} लाख
            </div>
            <div className="text-[10px] text-[#D4AF37]">₹75,000 प्रति शहर</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">हेड ऑफिस 30% रॉयल्टी शेयर</div>
            <div className="text-2xl font-black text-blue-400 font-mono mt-0.5">
              ₹{(totalPanIndiaRoyaltyCollected / 100000).toFixed(2)} लाख
            </div>
            <div className="text-[10px] text-blue-300">ऑटो-कलेक्टेड लेजर</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">अखिल भारतीय एक्टिव वर्कफोर्स</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {totalPanIndiaWorkers}+
            </div>
            <div className="text-[10px] text-slate-400">100% पुलिस वेरिफाइड</div>
          </div>
        </div>
      </div>

      {/* 2. SUPER ADMIN SUB-NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveAdminTab('requests')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'requests'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>फ्रैंचाइज़ी आवेदन ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('all_cities')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'all_cities'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>ऑल सिटीज व्यू & भारत का नक्शा ({cities.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('royalty')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'royalty'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>30% रॉयल्टी & मासिक ₹3,000 इनवॉइस</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('master_control')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'master_control'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>मास्टर कंट्रोल (ब्लॉक/अनब्लॉक/कमीशन)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'reports'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>अखिल भारतीय रिपोर्ट्स & राजस्व</span>
        </button>
      </div>

      {/* 3. TAB 1: FRANCHISE REQUESTS LIST (PART C - REQUIREMENT 1) */}
      {activeAdminTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                इनकमिंग फ्रैंचाइज़ी आवेदन (Franchise Requests List)
              </h3>
              <p className="text-xs text-slate-400">
                यहां आप किसी भी शहर के आवेदन को अप्रूव/रिजेक्ट कर सकते हैं, शहर असाइन कर सकते हैं और ₹75,000 फीस पेड मार्क कर सकते हैं।
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAppFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  appFilter === 'all' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                सभी ({applications.length})
              </button>
              <button
                onClick={() => setAppFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  appFilter === 'pending' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                पेंडिंग
              </button>
              <button
                onClick={() => setAppFilter('approved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  appFilter === 'approved' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                स्वीकृत (Approved)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-2xl bg-[#0A1931] border border-slate-700 hover:border-[#D4AF37]/60 transition-all space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-[#D4AF37] font-bold bg-black/50 px-2 py-0.5 rounded">
                        #{app.id}
                      </span>
                      <h4 className="text-lg font-black text-white">{app.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40">
                        📍 {app.city}, {app.state}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono mt-1">
                      मोबाइल: <strong>{app.mobile}</strong> • ईमेल: {app.email} • आवेदन तिथि: {app.appliedDate}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-black uppercase ${
                        app.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : app.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                      }`}
                    >
                      {app.status === 'approved'
                        ? 'स्वीकृत (Approved)'
                        : app.status === 'rejected'
                        ? 'अस्वीकृत (Rejected)'
                        : 'लंबित (Pending Review)'}
                    </span>

                    <button
                      onClick={() => handleToggleFeePaid(app.id)}
                      className={`text-xs px-3 py-1 rounded-full font-black border ${
                        app.feePaid
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-amber-950 border-amber-500 text-amber-300'
                      }`}
                      title="क्लिक करके स्टेटस बदलें"
                    >
                      {app.feePaid ? '₹75,000 फीस पेड ✓' : '₹75,000 फीस पेंडिंग'}
                    </button>
                  </div>
                </div>

                {/* Reason & Experience Box */}
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 font-bold block">फ्रैंचाइज़ी लेने का कारण व योजना:</span>
                    <p className="text-slate-200 leading-relaxed mt-0.5">{app.reason}</p>
                  </div>
                  {app.experience && (
                    <div className="pt-1 border-t border-slate-800/80 text-slate-400">
                      <strong>पूर्व अनुभव:</strong> {app.experience}
                    </div>
                  )}
                  <div className="text-[11px] text-[#D4AF37] font-semibold">
                    निवेश तत्परता:{' '}
                    {app.investmentReady === 'yes'
                      ? '✓ ₹75,000 तुरंत भुगतान के लिए तैयार'
                      : app.investmentReady === 'need_support'
                      ? '7-10 दिनों में तैयार'
                      : 'लोन/सहायता अपेक्षित'}
                  </div>
                </div>

                {/* Actions: Approve / Reject / Call */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`tel:${app.mobile}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>कॉल करें ({app.mobile})</span>
                  </a>

                  <div className="flex items-center gap-2">
                    {app.status !== 'approved' && (
                      <button
                        onClick={() => handleApproveApplication(app.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 text-xs font-black hover:brightness-110 shadow-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        <span>स्वीकृत करें & शहर बनाएं (Approve & Launch City)</span>
                      </button>
                    )}

                    {app.status !== 'rejected' && (
                      <button
                        onClick={() => handleRejectApplication(app.id)}
                        className="px-3 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800 flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>अस्वीकार करें (Reject)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 2: ALL CITIES VIEW & INDIA MAP (PART C - REQUIREMENT 2) */}
      {activeAdminTab === 'all_cities' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                अखिल भारतीय शहर नेटवर्क (Pan-India Active Franchises)
              </h3>
              <p className="text-xs text-slate-400">
                रीवा सेंट्रल हेड ऑफिस समेत भारत के सभी 10+ सक्रिय शहर, ओनर विवरण और लाइव स्थिति।
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] font-bold">
              👑 सेंट्रल हेड ऑफिस: रीवा (मध्य प्रदेश)
            </div>
          </div>

          {/* Interactive Visual Map Card of India */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06142B] to-[#040C1A] border-2 border-[#D4AF37] space-y-6 shadow-2xl">
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-amber-300 tracking-wider font-mono">
                INTERACTIVE PAN-INDIA HUB NETWORK
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                रीवा हेड ऑफिस से संचालित भारत का सबसे बड़ा ऑन-डिमांड नेटवर्क
              </h4>
            </div>

            {/* India Hub Grid Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((city) => (
                <div
                  key={city.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                    city.isHeadOffice
                      ? 'bg-gradient-to-b from-[#0A1931] to-[#061224] border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20'
                      : city.status === 'blocked'
                      ? 'bg-rose-950/40 border-rose-800'
                      : 'bg-[#0A1931] border-slate-700 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {city.isHeadOffice && (
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-bl-xl font-mono">
                      👑 HEAD OFFICE
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-base font-black text-white">{city.cityName}</h5>
                      <div className="text-xs text-slate-400">{city.state}</div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        city.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {city.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div>
                      ओनर: <strong>{city.ownerName}</strong>
                    </div>
                    <div className="font-mono text-slate-400">📞 {city.ownerMobile}</div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      कुल बुकिंग्स: <strong>{city.totalBookings}</strong> • कारीगर: <strong>{city.totalWorkers}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[#D4AF37] font-mono font-bold">
                      रेवेन्यू: ₹{city.totalRevenue.toLocaleString('en-IN')}
                    </span>

                    {!city.isHeadOffice && (
                      <button
                        onClick={() => handleToggleBlockCity(city.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                          city.status === 'active'
                            ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800'
                            : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {city.status === 'active' ? 'शहर ब्लॉक करें' : 'अनब्लॉक करें'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: ROYALTY COLLECTION & RS 3,000 AUTO INVOICE (PART C - REQUIREMENT 3) */}
      {activeAdminTab === 'royalty' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                30% रॉयल्टी कलेक्शन & मासिक ₹3,000 इनवॉइस लेजर
              </h3>
              <p className="text-xs text-slate-400">
                प्रत्येक शहर की हर बुकिंग से 30% रॉयल्टी ऑटो-क्रेडिट और मासिक ब्रांड फीस की वसूली।
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#D4AF37] bg-black/50 px-3 py-1.5 rounded-xl border border-[#D4AF37]/40">
              कुल संकलित रॉयल्टी: ₹{totalPanIndiaRoyaltyCollected.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#061224] border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white">सिटी-वाइज रॉयल्टी व ब्रांड शुल्क स्थिति</h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0A1931] text-slate-300 uppercase font-mono text-[11px] border-b border-slate-700">
                  <tr>
                    <th className="p-3">शहर (City)</th>
                    <th className="p-3">फ्रैंचाइज़ी ओनर</th>
                    <th className="p-3">कुल बुकिंग्स</th>
                    <th className="p-3">कुल ग्रॉस टर्नओवर</th>
                    <th className="p-3 text-blue-400">30% रॉयल्टी शेयर (HO)</th>
                    <th className="p-3 text-purple-400">मासिक ₹3,000 ब्रांड शुल्क</th>
                    <th className="p-3 text-center">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cities.map((city) => {
                    const cityRoyalty = Math.round(city.totalRevenue * 0.3);
                    return (
                      <tr key={city.id} className="hover:bg-[#0A1931]/60 transition-colors">
                        <td className="p-3 font-bold text-white flex items-center gap-1.5">
                          <span>{city.isHeadOffice ? '👑' : '🏢'}</span>
                          <span>{city.cityName}</span>
                        </td>
                        <td className="p-3 text-slate-300">{city.ownerName}</td>
                        <td className="p-3 font-mono text-slate-200">{city.totalBookings}</td>
                        <td className="p-3 font-mono text-[#D4AF37] font-bold">
                          ₹{city.totalRevenue.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 font-mono text-blue-300 font-bold">
                          ₹{cityRoyalty.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                            {city.monthlyBrandFeePaid ? 'PAID ✓' : 'पेंडिंग (₹3000)'}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() =>
                              alert(
                                `इनवॉइस ID #INV-2026-${city.id.toUpperCase()}: ₹3,000 ब्रांड शुल्क & 30% रॉयल्टी रसीद जनरेट हो गई।`
                              )
                            }
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold"
                          >
                            इनवॉइस डाउनलोड
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: MASTER CONTROL (PART C - REQUIREMENT 4) */}
      {activeAdminTab === 'master_control' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-white">
              हेड ऑफिस मास्टर कंट्रोल (Master Policy & Controls)
            </h3>
            <p className="text-xs text-slate-400">
              कमीशन विभाजन प्रतिशत बदलें, मासिक ब्रांड शुल्क समायोजित करें और किसी भी शहर या कारीगर को अखिल भारतीय स्तर पर ब्लॉक/नियंत्रित करें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Commission Settings Form */}
            <form
              onSubmit={handleSaveSettings}
              className="p-6 rounded-2xl bg-[#0A1931] border-2 border-[#D4AF37]/60 space-y-4"
            >
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>कमीशन व ब्रांड शुल्क दरें</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    फ्रैंचाइज़ी ओनर शेयर (%):
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="90"
                    value={ownerCommission}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setOwnerCommission(val);
                      setHoCommission(100 - val);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-400">डिफ़ॉल्ट 70%</span>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    हेड ऑफिस रीवा रॉयल्टी शेयर (%):
                  </label>
                  <input
                    type="number"
                    readOnly
                    value={hoCommission}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-blue-400 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-400">डिफ़ॉल्ट 30%</span>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    मासिक ब्रांड शुल्क (Fixed ₹):
                  </label>
                  <input
                    type="number"
                    value={monthlyBrandFeeInput}
                    onChange={(e) => setMonthlyBrandFeeInput(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-400">डिफ़ॉल्ट ₹3,000 / महीना</span>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    एकमुश्त फ्रैंचाइज़ी फीस (₹):
                  </label>
                  <input
                    type="number"
                    value={franchiseFeeInput}
                    onChange={(e) => setFranchiseFeeInput(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1C] border border-slate-700 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-400">डिफ़ॉल्ट ₹75,000</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xs hover:brightness-110 shadow-md"
              >
                सेव करें (Update Master Parameters)
              </button>
            </form>

            {/* Nationwide Worker Blocking / Audit */}
            <div className="p-6 rounded-2xl bg-[#0A1931] border border-slate-700 space-y-4">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>अखिल भारतीय वर्कर ब्लॉक / अनब्लॉक मास्टर</span>
              </h4>
              <p className="text-xs text-slate-400">
                यदि किसी कारीगर या साथी के खिलाफ गंभीर शिकायत आती है, तो रीवा हेड ऑफिस से तुरंत ब्लॉक करें।
              </p>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {workers.map((w) => (
                  <div
                    key={w.id}
                    className="p-3 rounded-xl bg-[#040D1C] border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{w.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {w.cityName} • {w.skillName} • 📞 {w.mobile}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleBlockWorker(w.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        w.status === 'active'
                          ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {w.status === 'active' ? 'ब्लॉक करें' : 'सक्रिय करें'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 5: REPORTS & REVENUE ANALYTICS (PART C - REQUIREMENT 5) */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                अखिल भारतीय राजस्व व प्रदर्शन रिपोर्ट (Consolidated Analytics)
              </h3>
              <p className="text-xs text-slate-400">
                सिटी-वाइज रेवेन्यू, कुल फ्रैंचाइज़ी फीस कलेक्शन, और पैन-इंडिया बुकिंग्स का संपूर्ण ऑडिट।
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>रिपोर्ट प्रिंट / एक्सपोर्ट करें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#0A1931] border border-[#D4AF37] space-y-1">
              <div className="text-xs text-slate-400">कुल एकत्रित फ्रैंचाइज़ी फीस</div>
              <div className="text-3xl font-black text-[#D4AF37] font-mono">
                ₹{totalFranchiseFeesCollected.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                {cities.filter((c) => c.franchiseFeePaid).length} सक्रिय शहरों से
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1931] border border-blue-500 space-y-1">
              <div className="text-xs text-slate-400">पैन-इंडिया कुल बुकिंग्स</div>
              <div className="text-3xl font-black text-blue-400 font-mono">
                {totalPanIndiaBookings.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                9 साथी सेवाएं + 35+ गिग सेवाएं
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1931] border border-emerald-500 space-y-1">
              <div className="text-xs text-slate-400">पैन-इंडिया ग्रॉस टर्नओवर</div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                ₹{totalPanIndiaRevenue.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">
                70% ओनर (₹{Math.round(totalPanIndiaRevenue * 0.7).toLocaleString('en-IN')}) • 30% HO (₹{totalPanIndiaRoyaltyCollected.toLocaleString('en-IN')})
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
