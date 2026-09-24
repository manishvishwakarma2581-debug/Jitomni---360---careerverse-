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
  const [adminTab, setAdminTab] = useState<'analytics' | 'routing_logic' | 'orders' | 'sathis' | 'providers' | 'commissions' | 'cities'>('analytics');

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
