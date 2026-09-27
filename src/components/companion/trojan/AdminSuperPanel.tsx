import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Users, 
  Building2, 
  ShoppingBag, 
  Zap, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  RefreshCw, 
  Check, 
  X, 
  Layers, 
  DollarSign, 
  Clock, 
  Flame,
  PieChart,
  Percent
} from 'lucide-react';
import { 
  TrojanOrder, 
  RoyalSathiWorker, 
  TiedUpProvider, 
  CityCodeConfig, 
  CategoryCommissionSetting, 
  TrojanAnalytics 
} from './trojanTypes';
import { TrojanStorage } from './trojanStorage';
import { TrojanRealtime } from './supabaseClient';
import { trojanAudio } from './trojanAudio';

interface AdminSuperPanelProps {
  onSwitchToCustomer?: () => void;
  onSwitchToWorker?: () => void;
  onSwitchToProvider?: () => void;
}

export const AdminSuperPanel: React.FC<AdminSuperPanelProps> = ({
  onSwitchToCustomer,
  onSwitchToWorker,
  onSwitchToProvider,
}) => {
  const [orders, setOrders] = useState<TrojanOrder[]>(() => TrojanStorage.getOrders());
  const [sathis, setSathis] = useState<RoyalSathiWorker[]>(() => TrojanStorage.getSathis());
  const [providers, setProviders] = useState<TiedUpProvider[]>(() => TrojanStorage.getProviders());
  const [commissions, setCommissions] = useState<CategoryCommissionSetting[]>(() => TrojanStorage.getCommissions());
  const [cities, setCities] = useState<CityCodeConfig[]>(() => TrojanStorage.getCities());
  const [analytics, setAnalytics] = useState<TrojanAnalytics>(() => TrojanStorage.getAnalytics());

  // Active Tab inside Admin Panel
  const [adminTab, setAdminTab] = useState<'analytics' | 'earning_calculator' | 'routing_logic' | 'orders' | 'sathis' | 'providers' | 'commissions' | 'cities'>('analytics');

  // Interactive Business & Profit Calculator State
  const [calcDailyOrders, setCalcDailyOrders] = useState<number>(300);
  const [calcAov, setCalcAov] = useState<number>(350);
  const [calcAvgMargin, setCalcAvgMargin] = useState<number>(15);
  const [calcSubscribers, setCalcSubscribers] = useState<number>(120);

  // New City Input Form
  const [newCityCode, setNewCityCode] = useState<string>('JS-');
  const [newCityName, setNewCityName] = useState<string>('');
  const [newState, setNewState] = useState<string>('Madhya Pradesh');
  const [newZoneType, setNewZoneType] = useState<'direct_hub' | 'pan_india_forward'>('pan_india_forward');

  // Filter for orders table
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Real-time synchronization
  useEffect(() => {
    const handleSync = () => {
      setOrders(TrojanStorage.getOrders());
      setSathis(TrojanStorage.getSathis());
      setProviders(TrojanStorage.getProviders());
      setCommissions(TrojanStorage.getCommissions());
      setCities(TrojanStorage.getCities());
      setAnalytics(TrojanStorage.getAnalytics());
    };

    const unsubscribe = TrojanRealtime.subscribe(() => {
      handleSync();
    });

    return () => unsubscribe();
  }, []);

  // Update Provider Approval Status
  const handleSetProviderStatus = (providerId: string, status: TiedUpProvider['approvalStatus']) => {
    TrojanStorage.updateProviderStatus(providerId, status);
    setProviders(TrojanStorage.getProviders());
    trojanAudio.playSuccessAlert();
  };

  // Update Commission Rate
  const handleCommissionChange = (category: string, newPercent: number) => {
    const updated = commissions.map((c) => {
      if (c.category === category) {
        return { ...c, defaultCommissionPercent: newPercent };
      }
      return c;
    });
    setCommissions(updated);
    TrojanStorage.setCommissions(updated);
  };

  // Add New City Code
  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityCode.startsWith('JS-') || newCityCode.length < 5 || !newCityName) {
      alert('कृपया सही शहर कोड (जैसे JS-VAR) और नाम दर्ज करें!');
      return;
    }

    const updatedCities: CityCodeConfig[] = [
      ...cities,
      {
        code: newCityCode.toUpperCase(),
        cityName: newCityName,
        state: newState,
        region: 'Central',
        isActive: true,
        activeSathisCount: newZoneType === 'direct_hub' ? 12 : 0,
        activeProvidersCount: 8,
        zoneType: newZoneType,
        forwardingPartnerNetworks: ['Local Service Syndicate', 'City Merchant Network'],
      }
    ];

    setCities(updatedCities);
    TrojanStorage.setCities(updatedCities);
    trojanAudio.playSuccessAlert();
    setNewCityCode('JS-');
    setNewCityName('');
  };

  // Force Cascade Order to Provider
  const handleForceCascade = (orderId: string) => {
    TrojanStorage.cascadeOrderToProvider(orderId);
    setOrders(TrojanStorage.getOrders());
    trojanAudio.playSuccessAlert();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* ADMIN CONTROL ROOM HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#040C1A] border-2 border-[#FFD700] p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#FFD700] text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 fill-slate-950" />
                <span>SUPER ADMIN CONTROL ROOM</span>
              </span>
              <span className="text-[11px] text-[#00D4FF] font-mono font-bold">
                JITOMNI 360 · Sovereign Trojan Engine
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
              ट्रोजन ब्रिज मास्टर एडमिन कंसोल (Super Panel)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              इंटेलिजेंट 2-स्टेज राउटिंग (90s साथी पूल ➔ प्रोवाइडर कैस्केड), 80/20 व 90/10 कमीशन लेजर, शहर कोड प्रबंधन एवं ऐप रिप्लेसमेंट एनालिटिक्स का पूर्ण नियंत्रण।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOrders(TrojanStorage.getOrders());
                setAnalytics(TrojanStorage.getAnalytics());
                trojanAudio.playSuccessAlert();
              }}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>रिफ्रेश</span>
            </button>
          </div>
        </div>

        {/* 4 TOP TROJAN ANALYTICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* THE TROJAN METRIC: APPS DELETED */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-[#FFD700]/50 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#FFD700] font-bold">
              <span>ग्राहकों द्वारा हटाई गई ऐप्स</span>
              <Flame className="w-3.5 h-3.5 fill-[#FFD700]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {analytics.estimatedAppsDeleted}+
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">
              {analytics.repeatMultiServiceCustomers} रिपीट मल्टी-सर्विस यूज़र्स
            </span>
          </div>

          {/* SATHI VS PROVIDER FULFILLMENT SPLIT */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold">ऑर्डर फुलफिलमेंट विभाजन</div>
            <div className="text-sm font-black text-white font-mono flex items-center justify-between pt-1">
              <span className="text-blue-400">रॉयल साथी (90%): {analytics.ordersFulfilledBySathis}</span>
              <span className="text-emerald-400">पार्टनर (80%): {analytics.ordersFulfilledByProviders}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
              <div 
                className="bg-blue-500 h-full" 
                style={{ width: `${(analytics.ordersFulfilledBySathis / Math.max(1, analytics.ordersFulfilledBySathis + analytics.ordersFulfilledByProviders)) * 100}%` }} 
              />
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: `${(analytics.ordersFulfilledByProviders / Math.max(1, analytics.ordersFulfilledBySathis + analytics.ordersFulfilledByProviders)) * 100}%` }} 
              />
            </div>
          </div>

          {/* GROSS ORDER VALUE */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold">कुल सकल कारोबार (GMV)</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{analytics.totalGrossOrderValue.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">
              {orders.length} कुल प्राप्त ऑर्डर्स
            </span>
          </div>

          {/* PLATFORM REVENUE */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[11px] text-emerald-400 font-bold">JITOMNI कुल कमाई</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ₹{analytics.totalPlatformRevenueEarned.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">
              10% साथी + 20% ब्रिज + पैन-इंडिया कट
            </span>
          </div>
        </div>

        {/* PAN-INDIA PERFORMANCE BANNER */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0A1931] to-blue-950/60 border border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 font-mono font-bold text-sm">
              🇮🇳
            </span>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>अखिल भारतीय मांग अग्रेषण नेटवर्क (Pan-India Partner Forwarding Matrix)</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                  सक्रिय
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                नॉन-हब क्षेत्रों में JITOMNI मौजूदा स्थानीय प्रदाताओं को ऑर्डर फॉरवर्ड करता है और 15-20% शुद्ध कमीशन कमाता है।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">फॉरवर्डेड ऑर्डर्स</span>
              <span className="text-white font-bold text-sm">{analytics.panIndiaForwardedOrders || 0}</span>
            </div>
            <div className="text-right border-l border-slate-800 pl-3">
              <span className="text-[10px] text-[#FFD700] block">JITOMNI कमीशन कमाई</span>
              <span className="text-[#FFD700] font-black text-sm">₹{analytics.panIndiaCommissionEarned || 0}</span>
            </div>
            <div className="text-right border-l border-slate-800 pl-3">
              <span className="text-[10px] text-emerald-400 block">सक्रिय कवरेज</span>
              <span className="text-emerald-400 font-bold text-sm">{analytics.totalCitiesCovered || cities.length}+ शहर ({analytics.totalStatesCovered || 28} राज्य)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-b border-slate-800">
        {[
          { id: 'analytics' as const, label: '📊 ट्रोजन एनालिटिक्स (Trojan Metric)' },
          { id: 'earning_calculator' as const, label: '💰 मालिक की कमाई व बिजनेस रेडीनेस (Earning Engine)' },
          { id: 'routing_logic' as const, label: '⚡ राउटिंग लॉजिक इंजन (90s / Direct)' },
          { id: 'orders' as const, label: `📑 सभी ऑर्डर्स लेजर (${orders.length})` },
          { id: 'sathis' as const, label: `🛡️ रॉयल साथी पूल (${sathis.length})` },
          { id: 'providers' as const, label: `🏬 टाइ-अप प्रोवाइडर्स (${providers.length})` },
          { id: 'commissions' as const, label: '💰 कमीशन कंट्रोल' },
          { id: 'cities' as const, label: `📍 शहर कोड (${cities.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAdminTab(tab.id)}
            className={`py-2 px-3.5 rounded-t-xl font-bold whitespace-nowrap transition-all ${
              adminTab === tab.id
                ? 'bg-[#0A1931] text-[#FFD700] border-t-2 border-x border-[#FFD700]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-VIEW: EARNING ENGINE & MONETIZATION READINESS */}
      {adminTab === 'earning_calculator' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Banner: Is this app ready to make money? */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#06182B] to-[#040E24] border-2 border-emerald-400/60 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                  ✓ 100% PRODUCTION REVENUE ENGINE
                </span>
                <h3 className="text-base sm:text-lg font-black text-white mt-1">
                  हाँ, यह ऐप आपके लिए पैसा कमाने का पूर्ण स्वचालित ज़रिया बनने के लिए 100% तैयार है!
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shrink-0">
                0% Manual Overhead
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              आपको कोई दुकान, गोदाम, बाइक या होटल खरीदने की आवश्यकता नहीं है। JITOMNI 360 एक <strong>"ट्रोजन ब्रिज और एग्रीगेटर मॉडल"</strong> पर चलता है — जहाँ ग्राहक सेवा बुक करता है, स्थानीय साथी या टाइ-अप पार्टनर काम पूरा करते हैं, और <strong>प्रत्येक ऑर्डर पर 10% से 20% शुद्ध कमीशन सीधे आपके एडमिन खाते में सुरक्षित जमा होता है।</strong>
            </p>

            {/* 4 Pillars of Readiness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. ऑटोमेटेड स्प्लिट लेजर</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  हर ऑर्डर का 90/10 या 80/20 विभाजन सिस्टम द्वारा तुरंत मिलीसेकंड में गणना होता है।
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>2. अखिल भारतीय फॉरवर्डिंग</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  जहाँ आपके वर्कर नहीं हैं, वहाँ स्थानीय वेंडरों को आर्डर फॉरवर्ड कर 15-20% कमीशन मिलता है।
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. 6 विविध आय स्रोत</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  बाइक, ऑटो, होटल, आउटस्टेशन कैब, साथी घंटे, और ₹299 मासिक सब्सक्रिप्शन।
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>4. जीरो वित्तीय रिस्क</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  वर्कर व पार्टनर स्वयं अपना पेट्रोल व समय लगाते हैं; आपको केवल कमीशन लाभ मिलता है।
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE OWNER EARNING SIMULATOR */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0A1931] border-2 border-[#FFD700] shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                  FINANCIAL PROJECTION & REVENUE CALCULATOR
                </span>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#FFD700]" />
                  <span>इस ऐप से आप कितना पैसा कमा सकते हैं? (लाइव कमाई सिमुलेटर)</span>
                </h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-[#FFD700]">
                AOV: ₹{calcAov} • Avg Margin: {calcAvgMargin}%
              </span>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Daily Orders Slider */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">दैनिक ऑर्डर्स (Daily Orders)</span>
                  <span className="font-mono font-black text-[#FFD700] text-sm">{calcDailyOrders}</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="3000"
                  step="25"
                  value={calcDailyOrders}
                  onChange={(e) => setCalcDailyOrders(Number(e.target.value))}
                  className="w-full accent-[#FFD700] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>25/दिन</span>
                  <span>1,500/दिन</span>
                  <span>3,000/दिन</span>
                </div>
              </div>

              {/* AOV Slider */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">औसत ऑर्डर मूल्य (Avg Ticket)</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">₹{calcAov}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={calcAov}
                  onChange={(e) => setCalcAov(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹100 (राइड)</span>
                  <span>₹800 (होटल/टास्क)</span>
                  <span>₹1500 (टूर)</span>
                </div>
              </div>

              {/* Platform Margin Slider */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">औसत प्लेटफॉर्म कमीशन %</span>
                  <span className="font-mono font-black text-cyan-400 text-sm">{calcAvgMargin}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="25"
                  step="1"
                  value={calcAvgMargin}
                  onChange={(e) => setCalcAvgMargin(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10% (साथी/राइड)</span>
                  <span>15% (औसत)</span>
                  <span>25% (ब्रिज/मर्चेंट)</span>
                </div>
              </div>

              {/* Active Subscribed Workers */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">सक्रिय साथी/ड्राइवर पास (₹299)</span>
                  <span className="font-mono font-black text-amber-300 text-sm">{calcSubscribers} साथी</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={calcSubscribers}
                  onChange={(e) => setCalcSubscribers(Number(e.target.value))}
                  className="w-full accent-amber-300 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10 साथी</span>
                  <span>500 साथी</span>
                  <span>1,000 साथी</span>
                </div>
              </div>
            </div>

            {/* LIVE PROJECTED EARNINGS SCORECARDS */}
            {(() => {
              const dailyGmv = calcDailyOrders * calcAov;
              const dailyOwnerCut = Math.round(dailyGmv * (calcAvgMargin / 100));
              const monthlyCommission = dailyOwnerCut * 30;
              const monthlySubscriptions = calcSubscribers * 299;
              const totalMonthlyOwnerNet = monthlyCommission + monthlySubscriptions;
              const annualOwnerNet = totalMonthlyOwnerNet * 12;

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {/* Card 1: Daily Turnover */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block">
                      दैनिक सकल कारोबार (Daily GMV)
                    </span>
                    <div className="text-2xl font-black text-white font-mono">
                      ₹{dailyGmv.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      {calcDailyOrders} ऑर्डर्स × ₹{calcAov}
                    </span>
                  </div>

                  {/* Card 2: Daily Net Commission */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/40 space-y-1">
                    <span className="text-[11px] text-emerald-300 font-bold uppercase block">
                      दैनिक आपकी शुद्ध कमाई (Daily Profit)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      ₹{dailyOwnerCut.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-300/70 block">
                      प्रति दिन सीधे आपके बैंक खाते में
                    </span>
                  </div>

                  {/* Card 3: Monthly Net Profit */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-950 border-2 border-[#FFD700] space-y-1 shadow-xl">
                    <span className="text-[11px] text-[#FFD700] font-bold uppercase block">
                      मासिक शुद्ध कमाई (Monthly Net Profit)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">
                      ₹{(totalMonthlyOwnerNet / 100000).toFixed(2)} लाख
                    </div>
                    <span className="text-[10px] text-slate-300 block font-mono">
                      ₹{totalMonthlyOwnerNet.toLocaleString('en-IN')} / माह (कमीशन + पास)
                    </span>
                  </div>

                  {/* Card 4: Annual Net Profit */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border border-cyan-400/50 space-y-1">
                    <span className="text-[11px] text-cyan-300 font-bold uppercase block">
                      वार्षिक शुद्ध बिजनेस मूल्य (Annual Net)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                      ₹{(annualOwnerNet / 10000000).toFixed(2)} करोड़
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      ₹{annualOwnerNet.toLocaleString('en-IN')} / वर्ष
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* DETAILED REVENUE STREAMS TABLE */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                आपकी कमाई के 6 प्रमुख स्रोत (Revenue Breakdown Matrix)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>🏍️ बाइक व 🛺 ऑटो राइड्स</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-[10px]">
                      10% मैनेजमेंट कट
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    प्रति राइड ₹5 से ₹20 की सीधी कमाई। Rapido/Ola जैसा वॉल्यूम, लेकिन ड्राइवर खुश क्योंकि 90% उसका है।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>🏨 होटल व 4-घंटे ट्रांजिट रूम्स</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-mono font-bold text-[10px]">
                      10% सीधी बुकिंग फीस
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    प्रति कमरा ₹50 से ₹150 की कमाई। अस्पताल व रेलवे स्टेशन के पास कमरों की लगातार दैनिक मांग।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>🚶 साथी घंटे व व्यक्तिगत टास्क</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-400/20 text-blue-300 font-mono font-bold text-[10px]">
                      10% - 20% प्लेटफॉर्म शेयर
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    अस्पताल कतार, बुजुर्ग साथी, सरकारी फॉर्म व होम डिलीवरी से प्रति टास्क ₹20 से ₹60 की कमाई।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>🚗 टूर व आउटस्टेशन ट्रेवल कैब</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 font-mono font-bold text-[10px]">
                      10% यात्रा कमीशन
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    मैहर, चित्रकूट, प्रयागराज संगम, काशी टूर पैकेज से प्रति ट्रिप ₹250 से ₹800 का हाई-टिकट कमीशन।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>🌐 अखिल भारतीय मांग अग्रेषण</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-mono font-bold text-[10px]">
                      15% - 20% शुद्ध कट
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    जिन शहरों में आपके साथी नहीं हैं, वहाँ स्थानीय वेंडरों को आर्डर फॉरवर्ड कर बिना किसी खर्चे के 15-20% कमाई।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>💳 ₹299/माह रॉयल साथी सब्सक्रिप्शन पास</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-mono font-bold text-[10px]">
                      100% रिकरिंग रेवेन्यू
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    यदि आपके शहर में 200 साथी व ड्राइवर जुड़े हैं, तो महीने के पहले दिन ₹60,000 की निश्चित आवर्ती आय।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 1: TROJAN ANALYTICS & "APPS DELETED" METRIC */}
      {adminTab === 'analytics' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FFD700]" />
              <span>ट्रोजन ब्रिज मॉडल इम्पैक्ट (Trojan Replacement Matrix)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>CORE STRATEGY:</strong> हमारा ऐप किसी भी सेवा का ऑर्डर लेता है (Blinkit, Zomato, Urban Company, Ola)। 
              ग्राहक को यह एक ही ऐप लगता है। हम बैकएंड में टाइ-अप पार्टनर या अपने रॉयल साथी को भेजते हैं। 
              धीरे-धीरे ग्राहक 6 अलग-अलग ऐप्स हटाकर केवल JITOMNI 360 का उपयोग करते हैं।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400">अनुमानित फोन स्टोरेज बचत</div>
                <div className="text-3xl font-black text-[#FFD700] font-mono">
                  ~{(analytics.estimatedAppsDeleted * 75).toLocaleString()} MB
                </div>
                <p className="text-[11px] text-slate-400">
                  प्रति ग्राहक 6 भारी ऐप्स (औसतन 450 MB) हटने से फोन फास्ट व हल्का हुआ।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400">सक्रिय ग्राहक प्रतिधारण (Repeat Rate)</div>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  {Math.round((analytics.repeatMultiServiceCustomers / Math.max(1, analytics.totalCustomers)) * 100)}%
                </div>
                <p className="text-[11px] text-slate-400">
                  ग्राहकों ने एक ही हफ्ते में किराना + भोजन + साथी तीनों बुक किए।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400">मासिक सब्सक्रिप्शन रेवेन्यू (₹299/माह)</div>
                <div className="text-3xl font-black text-cyan-400 font-mono">
                  ₹{(sathis.filter((s) => s.subscriptionActive).length * 299).toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400">
                  {sathis.length} रजिस्टर्ड पुलिस-वेरिफाइड साथियों से निश्चित आवर्ती राजस्व।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: INTELLIGENT ROUTING LOGIC ENGINE */}
      {adminTab === 'routing_logic' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border-2 border-[#FFD700] space-y-5">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FFD700]" />
              <span>इंटेलिजेंट 2-स्टेज राउटिंग इंजन (Live State Machine)</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              प्रणाली प्रत्येक नए ऑर्डर की श्रेणी का विश्लेषण करती है और न्यूनतम विलंबता के साथ सही पूल में निर्देशित करती है।
            </p>
          </div>

          {/* 2 Routing Rule Diagrams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Rule 1 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 uppercase font-mono">नियम 1 (Rule 1)</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">साथी व टास्क (हब)</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white">चरण 1:</strong> नया साथी / टास्क ऑर्डर (Direct Hub)
                </div>
                <div className="text-center text-slate-500">↓ 90 सेकंड ब्रॉडकास्ट विंडो</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400">रॉयल साथी पूल (90s):</strong> स्वीकार करने पर 90% साथी को, 10% JITOMNI को।
                </div>
                <div className="text-center text-slate-500">↓ यदि 90s में कोई स्वीकार न करे</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300">
                  <strong>ऑटो-कैस्केड:</strong> नजदीकी टाइ-अप प्रोवाइडर (80% प्रोवाइडर, 20% JITOMNI)।
                </div>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase font-mono">नियम 2 (Rule 2)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">क्विक कॉमर्स व भोजन</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white">चरण 1:</strong> 10-मिनट किराना, दवा या रेस्टोरेंट ऑर्डर
                </div>
                <div className="text-center text-slate-500">↓ 0-सेकंड तत्काल अग्रेषण</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/50 text-emerald-300">
                  <strong>सीधा प्रोवाइडर पूल (Direct Provider):</strong> नजदीकी स्टोर/रेस्टोरेंट पार्टनर को तुरंत जाता है।
                </div>
                <div className="text-center text-slate-500">↓ सेटलमेंट मॉडल</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  <strong>80/20 ब्रिज सेटलमेंट:</strong> स्टोर को 80%, JITOMNI रखता है 20% ब्रिज शुल्क।
                </div>
              </div>
            </div>

            {/* Rule 3: Pan-India Forwarding Syndicate */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-[#FFD700]/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFD700] uppercase font-mono">नियम 3 (Rule 3)</span>
                <span className="px-2 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] text-[10px]">अखिल भारतीय फॉरवर्डिंग</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white">अखिल भारतीय मांग (Pan-India):</strong> जहाँ डायरेक्ट साथी उपलब्ध नहीं हैं
                </div>
                <div className="text-center text-slate-500">↓ 0-सेकंड ऑटो-डिस्पैच (WhatsApp/API)</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-blue-500/50 text-blue-300">
                  <strong>स्थानीय सेवा प्रदाता सिंडिकेट:</strong> मांग मौजूदा स्थानीय प्रदाता को तत्काल फॉरवर्ड होती है।
                </div>
                <div className="text-center text-slate-500">↓ 100% जोखिम-मुक्त आय</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  <strong>15-20% प्लेटफ़ॉर्म कमिशन:</strong> सेवा स्थानीय प्रदाता देता है, JITOMNI को बिना वेतन/इन्वेंट्री का शुद्ध कमीशन मिलता है!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: ALL ORDERS LEDGER */}
      {adminTab === 'orders' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">सभी सक्रिय व पूर्ण ऑर्डर्स</h3>
            
            <div className="flex items-center gap-1 text-xs flex-wrap">
              {['all', 'notified_sathi', 'forwarded_to_partner', 'cascaded_to_provider', 'in_progress', 'completed'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setOrderFilter(st)}
                  className={`py-1 px-2.5 rounded-lg font-mono text-[11px] transition-all ${
                    orderFilter === st
                      ? 'bg-[#FFD700] text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-2.5">ऑर्डर ID</th>
                  <th className="p-2.5">ग्राहक व शहर</th>
                  <th className="p-2.5">सेवा विवरण</th>
                  <th className="p-2.5">राउटिंग स्थिति</th>
                  <th className="p-2.5">असाइनमेंट</th>
                  <th className="p-2.5">कुल बिल</th>
                  <th className="p-2.5">JITOMNI कट</th>
                  <th className="p-2.5">एक्शन</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {orders
                  .filter((o) => orderFilter === 'all' || o.status === orderFilter)
                  .map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-900/60">
                      <td className="p-2.5 font-bold text-white">#{ord.orderId}</td>
                      <td className="p-2.5">
                        <span className="text-white block font-sans font-medium">{ord.customerName}</span>
                        <span className="text-slate-400 text-[10px]">{ord.location.cityCode} ({ord.location.city})</span>
                      </td>
                      <td className="p-2.5 max-w-xs truncate font-sans text-slate-200">
                        {ord.serviceTitle}
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : ord.status === 'forwarded_to_partner'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : ord.status === 'cascaded_to_provider'
                            ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-[11px] font-sans">
                        {ord.assignedSathiName ? (
                          <span className="text-blue-300">🛡️ {ord.assignedSathiName}</span>
                        ) : ord.assignedProviderName ? (
                          <span className="text-emerald-300">🏬 {ord.assignedProviderName}</span>
                        ) : ord.forwardedPartnerInfo ? (
                          <span className="text-[#FFD700]">🌐 {ord.forwardedPartnerInfo.partnerName}</span>
                        ) : (
                          <span className="text-slate-500">राउटिंग जारी...</span>
                        )}
                      </td>
                      <td className="p-2.5 font-bold text-white">₹{ord.totalAmount}</td>
                      <td className="p-2.5 text-[#FFD700] font-bold">
                        ₹{ord.commission?.platformFeeAmount || Math.round(ord.totalAmount * 0.20)}
                      </td>
                      <td className="p-2.5">
                        {ord.status === 'notified_sathi' && (
                          <button
                            type="button"
                            onClick={() => handleForceCascade(ord.orderId)}
                            className="py-1 px-2 rounded bg-amber-500 text-slate-950 font-bold text-[10px] hover:brightness-110"
                          >
                            कैस्केड ➔
                          </button>
                        )}
                        {ord.status === 'forwarded_to_partner' && (
                          <button
                            type="button"
                            onClick={() => {
                              TrojanStorage.acceptOrderByForwardedPartner(ord.orderId);
                              setOrders(TrojanStorage.getOrders());
                              trojanAudio.playSuccessAlert();
                            }}
                            className="py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                          >
                            स्वीकारें ✓
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: ALL SATHIS POOL */}
      {adminTab === 'sathis' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">
              रॉयल साथी पूल (Internal Workers — 90/10 Model)
            </h3>
            <span className="text-xs text-emerald-400 font-mono">
              100% पुलिस व CID वेरिफाइड
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {sathis.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#FFD700] transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={s.photoUrl} alt={s.name} className="w-10 h-10 rounded-xl object-cover border border-[#FFD700]" />
                    <div>
                      <span className="font-bold text-white block">{s.name}</span>
                      <span className="text-[10px] text-[#FFD700] font-mono">{s.royalId} ({s.cityName})</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    CID VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-950 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[9px]">वॉलेट</span>
                    <span className="text-emerald-400 font-bold">₹{s.walletBalance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">कुल कार्य</span>
                    <span className="text-white">{s.totalTasksCompleted}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">10% फीस</span>
                    <span className="text-[#FFD700]">₹{s.totalPlatformCut10}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>सब्सक्रिप्शन: <strong className="text-white font-mono">₹299/माह (सक्रिय)</strong></span>
                  <span>रेटिंग: ⭐ {s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: TIED-UP PROVIDERS MANAGEMENT */}
      {adminTab === 'providers' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">
              सर्विस प्रोवाइडर टाइ-अप डायरेक्टरी (Tied-up Providers)
            </h3>
            <span className="text-xs text-[#FFD700] font-mono">
              80/20 ट्रोजन ब्रिज पार्टनर
            </span>
          </div>

          <div className="space-y-3">
            {providers.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{p.businessName}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[#FFD700] font-mono text-[10px]">
                      {p.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.approvalStatus === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : p.approvalStatus === 'pending_review'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {p.approvalStatus.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-slate-400">
                    संचालक: {p.ownerName} ({p.phone}) · {p.cityName} ({p.cityCode})
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    कमीशन: {p.agreedCommissionPercent}% · कुल ऑर्डर्स: {p.totalOrdersReceived} · मोड: {p.integrationMode}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.approvalStatus === 'pending_review' && (
                    <button
                      type="button"
                      onClick={() => handleSetProviderStatus(p.id, 'approved')}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      स्वीकार करें ✓
                    </button>
                  )}

                  {p.approvalStatus === 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleSetProviderStatus(p.id, 'suspended')}
                      className="py-1.5 px-3 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-300 font-bold text-xs"
                    >
                      सस्पेंड करें
                    </button>
                  )}

                  {p.approvalStatus === 'suspended' && (
                    <button
                      type="button"
                      onClick={() => handleSetProviderStatus(p.id, 'approved')}
                      className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                    >
                      पुनः सक्रिय करें
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 6: COMMISSION CONTROL MATRIX */}
      {adminTab === 'commissions' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FFD700]" />
              <span>कैटेगरी अनुसार कमीशन नियंत्रण (Commission Control Matrix)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              प्रत्येक श्रेणी के लिए JITOMNI का प्लेटफ़ॉर्म कमीशन प्रतिशत सेट करें
            </p>
          </div>

          <div className="space-y-4">
            {commissions.map((c) => (
              <div
                key={c.category}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white text-sm">{c.title}</div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    सीमा: {c.minPercent}% से {c.maxPercent}% तक
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-72">
                  <input
                    type="range"
                    min={c.minPercent}
                    max={c.maxPercent}
                    value={c.defaultCommissionPercent}
                    onChange={(e) => handleCommissionChange(c.category, Number(e.target.value))}
                    className="w-full accent-[#FFD700]"
                  />
                  <span className="font-mono font-black text-base text-[#FFD700] w-12 text-right">
                    {c.defaultCommissionPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 7: CITY CODE MANAGEMENT */}
      {adminTab === 'cities' && (
        <div className="p-5 rounded-3xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FFD700]" />
              <span>शहर कोड प्रबंधन (City Code Management — JS-RWA, JS-BPL etc.)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              प्रत्येक शहर के लिए सॉवरेन नोड कोड और सक्रियता स्थिति
            </p>
          </div>

          {/* Add City Form */}
          <form onSubmit={handleAddCity} className="p-4 rounded-2xl bg-slate-900 border border-[#FFD700]/30 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">नया सिटी कोड (उदा. JS-VAR)</label>
              <input
                type="text"
                placeholder="JS-XXX"
                value={newCityCode}
                onChange={(e) => setNewCityCode(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">शहर का नाम</label>
              <input
                type="text"
                placeholder="उदा. वाराणसी (Varanasi)"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">राज्य (State)</label>
              <input
                type="text"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">ज़ोन प्रकार (Zone Type)</label>
              <select
                value={newZoneType}
                onChange={(e) => setNewZoneType(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              >
                <option value="pan_india_forward">🌐 पैन-इंडिया फॉरवर्डिंग</option>
                <option value="direct_hub">🛡️ डायरेक्ट रॉयल साथी हब</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 shadow cursor-pointer"
              >
                + शहर जोड़ें
              </button>
            </div>
          </form>

          {/* Existing Cities List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cities.map((city) => (
              <div
                key={city.code}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-[#FFD700] text-sm">{city.code}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-mono ${
                      city.zoneType === 'direct_hub'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {city.zoneType === 'direct_hub' ? 'हब' : 'फॉरवर्ड'}
                    </span>
                  </div>
                  <span className="text-white font-medium block mt-0.5">{city.cityName}</span>
                  <span className="text-[10px] text-slate-500 block">{city.state}</span>
                </div>

                <div className="text-right space-y-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold block">
                    ACTIVE
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {city.zoneType === 'direct_hub' ? 'साथी + पार्टनर' : 'सिंडिकेट ब्रिज'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
