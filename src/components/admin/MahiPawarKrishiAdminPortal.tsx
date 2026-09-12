import React, { useState } from 'react';
import {
  Sprout,
  TrendingUp,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mic,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  FileText,
  Sparkles,
  HelpCircle,
  Truck,
  Wind,
} from 'lucide-react';
import { Language, MainTab } from '../../types';
import { JitomniEmblemLogo } from '../JitomniEmblemLogo';

interface MahiPawarKrishiAdminPortalProps {
  lang: Language;
  onNavigateTab: (tab: MainTab) => void;
}

interface MandiItem {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface EquipmentItem {
  id: string;
  name: string;
  ratePerHour: number;
  locationCluster: string;
  operatorIncluded: boolean;
  status: 'available' | 'booked';
}

export const MahiPawarKrishiAdminPortal: React.FC<MahiPawarKrishiAdminPortalProps> = ({
  lang,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<'mandi' | 'crop_doctor' | 'chc_machinery' | 'schemes' | 'samadhan'>('mandi');

  // Mandi Data State
  const [mandiItems, setMandiItems] = useState<MandiItem[]>([
    { id: '1', crop: 'गेहूं (Wheat - शरबती)', mandi: 'सीहोर (Sehore)', state: 'मध्य प्रदेश', minPrice: 2850, maxPrice: 3400, modalPrice: 3150, trend: 'up', lastUpdated: 'आज 09:30 AM' },
    { id: '2', crop: 'सोयाबीन (Soybean - पीला)', mandi: 'उज्जैन (Ujjain)', state: 'मध्य प्रदेश', minPrice: 4200, maxPrice: 4850, modalPrice: 4620, trend: 'stable', lastUpdated: 'आज 10:15 AM' },
    { id: '3', crop: 'चना (Gram/Chana)', mandi: 'इंदौर (Indore)', state: 'मध्य प्रदेश', minPrice: 5600, maxPrice: 6200, modalPrice: 5950, trend: 'up', lastUpdated: 'आज 11:00 AM' },
    { id: '4', crop: 'सरसों (Mustard)', mandi: 'ग्वालियर (Gwalior)', state: 'मध्य प्रदेश', minPrice: 5100, maxPrice: 5750, modalPrice: 5480, trend: 'down', lastUpdated: 'आज 08:45 AM' },
    { id: '5', crop: 'कपास (Cotton)', mandi: 'खंडवा (Khandwa)', state: 'मध्य प्रदेश', minPrice: 6800, maxPrice: 7500, modalPrice: 7200, trend: 'up', lastUpdated: 'आज 10:40 AM' },
  ]);

  // Farm Equipment State
  const [equipments, setEquipments] = useState<EquipmentItem[]>([
    { id: 'e1', name: 'महिंद्रा 575 DI (45 HP) + रोटावेटर', ratePerHour: 450, locationCluster: 'सीहोर व रायसेन क्लस्टर', operatorIncluded: true, status: 'available' },
    { id: 'e2', name: 'एग्री-स्प्रेयर ड्रोन (16L टैंक, ऑटो GPS)', ratePerHour: 350, locationCluster: 'उज्जैन व देवास क्लस्टर', operatorIncluded: true, status: 'available' },
    { id: 'e3', name: 'लेजर लैंड लेवलर (सटीक समतलीकरण)', ratePerHour: 550, locationCluster: 'होशंगाबाद नर्मदापुरम', operatorIncluded: true, status: 'booked' },
  ]);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePriceUpdate = (id: string, newModalPrice: number) => {
    setMandiItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, modalPrice: newModalPrice, lastUpdated: 'अभी अपडेट किया' } : item
      )
    );
    showToast('✓ मंडी भाव सफलतापूर्वक अपडेट किया गया!');
  };

  const toggleEquipmentStatus = (id: string) => {
    setEquipments((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'available' ? 'booked' : 'available' }
          : item
      )
    );
    showToast('✓ उपकरण उपलब्धता स्टेटस अपडेट हुआ!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sovereign Header for Mahi Pawar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#01140E] via-[#04281B] to-[#01140E] border-2 border-emerald-500 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-2xl bg-black/60 border border-emerald-500/40 shadow-xl">
              <Sprout className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                  DIRECTORATE OF AGRICULTURE & KRISHI 360°
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[11px] font-bold">
                  स्वतंत्र प्रशासनिक अधिकार (AUTONOMOUS DESK)
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1">
                माहि पवार • कृषि 360° सॉवरेन कंट्रोल हब
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5 font-sans">
                "खेती से समृद्धि तक" • मंडी भाव, फसल डॉक्टर डायग्नोसिस, CHC मशीनरी व किसान समाधान का संपूर्ण प्रबंधन
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('agri')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-emerald-200" />
              <span>पब्लिक कृषि 360° व्यू</span>
            </button>

            <button
              onClick={() => onNavigateTab('super-admin')}
              className="px-4 py-2.5 rounded-2xl bg-black/70 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm hover:bg-[#0c1f3d] transition-all flex items-center gap-2"
            >
              <span>मनीष विश्वकर्मा सुपर एडमिन</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-500/30">
          <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/30">
            <span className="text-[11px] text-slate-400 font-mono">सक्रिय मंडियां लाइव</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">52 मंडियां</div>
            <span className="text-[10px] text-teal-300">दैनिक भाव लाइव अपडेट</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-teal-500/30">
            <span className="text-[11px] text-slate-400 font-mono">CHC मशीनरी फ्लीट</span>
            <div className="text-xl sm:text-2xl font-black text-teal-300 mt-0.5">18 उपकरण</div>
            <span className="text-[10px] text-emerald-300">ड्रोन, रोटावेटर व कंबाइन</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/30">
            <span className="text-[11px] text-slate-400 font-mono">किसान समाधान हेल्पडेस्क</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">14 पेंडिंग</div>
            <span className="text-[10px] text-slate-300">फोटो व वॉइस नोट्स समाधान</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-blue-500/30">
            <span className="text-[11px] text-slate-400 font-mono">ICAR एग्रो डिग्री मॉड्यूल्स</span>
            <div className="text-xl sm:text-2xl font-black text-blue-300 mt-0.5">6/6 सेमेस्टर</div>
            <span className="text-[10px] text-slate-300">100% सिलेबस मैप्ड</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'mandi', label: '🌾 दैनिक मंडी भाव व MSP पब्लिशर', icon: TrendingUp },
          { id: 'crop_doctor', label: '🔬 फसल डॉक्टर AI डायग्नोसिस रिव्यू', icon: Sparkles },
          { id: 'chc_machinery', label: '🚜 CHC मशीनरी व ड्रोन रेंटिंग', icon: Truck },
          { id: 'schemes', label: '📜 सरकारी योजनाएं व मौसम अलर्ट्स', icon: Wind },
          { id: 'samadhan', label: '🎙️ किसान वॉइस समाधान डेस्क', icon: Mic },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-[#03140F] text-slate-300 hover:text-white border border-emerald-950'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MANDI RATE PUBLISHER */}
      {activeTab === 'mandi' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>लाइव मंडी भाव कंट्रोल पैनल (माहि पवार द्वारा प्रमाणित)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                यहाँ से अपडेट किया गया भाव तुरंत पूरे देश के किसानों के कृषि 360° डैशबोर्ड पर रिफ्लेक्ट होगा।
              </p>
            </div>

            <button
              onClick={() => showToast('नया फसल भाव जोड़ने का डायलॉग खुला')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ नई फसल / मंडी जोड़ें</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-950 bg-[#02100B]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-emerald-950 text-slate-400 font-mono bg-black/40">
                  <th className="py-3 px-4">फसल (Crop)</th>
                  <th className="py-3 px-4">मंडी एवं राज्य</th>
                  <th className="py-3 px-4">न्यूनतम - अधिकतम भाव</th>
                  <th className="py-3 px-4">मॉडल भाव (Modal / Qtl)</th>
                  <th className="py-3 px-4">ट्रेंड</th>
                  <th className="py-3 px-4">अंतिम अपडेट</th>
                  <th className="py-3 px-4 text-right">क्विक एक्शन</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/60">
                {mandiItems.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-950/30">
                    <td className="py-3 px-4 font-bold text-white">{item.crop}</td>
                    <td className="py-3 px-4 text-slate-300">
                      {item.mandi}
                      <span className="block text-[10px] text-slate-400">{item.state}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-400 text-sm font-mono">
                      ₹{item.modalPrice} / क्विंटल
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.trend === 'up'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : item.trend === 'down'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.trend === 'up' ? '▲ तेजी' : item.trend === 'down' ? '▼ मंदी' : '▬ स्थिर'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] font-mono">{item.lastUpdated}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handlePriceUpdate(item.id, item.modalPrice + 50)}
                        className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] font-bold"
                      >
                        +₹50 भाव
                      </button>
                      <button
                        onClick={() => handlePriceUpdate(item.id, item.modalPrice - 50)}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold"
                      >
                        -₹50 भाव
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CROP DOCTOR REVIEW */}
      {activeTab === 'crop_doctor' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#02100B] border border-emerald-950">
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>फसल डॉक्टर AI प्रिस्क्रिप्शन रिव्यू डेस्क</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              किसान द्वारा अपलोड की गई पत्तियों और तनों की फोटो का AI निदान यहाँ आता है। माहि पवार जी इसे अंतिम रूप देकर रासायनिक व जैविक दवाइयों का सटीक अनुपात अप्रूव करती हैं।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    पेंडिंग रिव्यू
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">किसान: जगदीश पाटीदार (धार, MP)</span>
                </div>
                <h4 className="text-sm font-black text-white">सोयाबीन - पीला मोज़ेक वायरस (Yellow Mosaic)</h4>
                <p className="text-xs text-slate-300">
                  AI डायग्नोसिस: व्हाइटफ्लाई (सफेद मक्खी) द्वारा जनित।
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-200">
                  <strong>माहि पवार अप्रूव्ड प्रिस्क्रिप्शन:</strong> थायमेथोक्सम (Thiamethoxam 25% WG) 100 ग्राम प्रति एकड़ या नीम का तेल (10,000 PPM) 2.5 मिली प्रति लीटर पानी।
                </div>
                <button
                  onClick={() => showToast('✓ किसान को WhatsApp व SMS पर प्रिस्क्रिप्शन प्रेषित!')}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                >
                  ✓ अप्रूव कर किसान को भेजें
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    पेंडिंग रिव्यू
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">किसान: रामकिशन मीना (कोटा, राज.)</span>
                </div>
                <h4 className="text-sm font-black text-white">गेहूं - रतुआ रोग (Yellow Rust / भूरा गेरुई)</h4>
                <p className="text-xs text-slate-300">
                  AI डायग्नोसिस: पत्तियों पर पीले धब्बे, फफूंद जनित।
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-200">
                  <strong>माहि पवार अप्रूव्ड प्रिस्क्रिप्शन:</strong> प्रोपिकोनाजोल 25% EC (टिल्ट) 200 मिली प्रति 200 लीटर पानी प्रति एकड़ छिड़काव।
                </div>
                <button
                  onClick={() => showToast('✓ किसान को WhatsApp व SMS पर प्रिस्क्रिप्शन प्रेषित!')}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                >
                  ✓ अप्रूव कर किसान को भेजें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHC FARM MACHINERY */}
      {activeTab === 'chc_machinery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>कस्टम हायरिंग सेंटर (CHC) मशीनरी व ड्रोन फ्लीट</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                छोटे और सीमांत किसानों को किफायती प्रति घंटा दर पर कृषि यंत्र उपलब्ध कराने का मैनेजमेंट।
              </p>
            </div>

            <button
              onClick={() => showToast('नया कृषि यंत्र जोड़ने का विकल्प खुला')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ नया कृषि यंत्र जोड़ें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {equipments.map((eq) => (
              <div
                key={eq.id}
                className="p-5 rounded-2xl bg-[#02100B] border border-emerald-950 hover:border-emerald-800 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      eq.status === 'available'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {eq.status === 'available' ? '● उपलब्ध (Available)' : '● बुक है (Booked)'}
                  </span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    ₹{eq.ratePerHour}/घंटा
                  </span>
                </div>

                <h4 className="text-sm font-black text-white">{eq.name}</h4>
                <p className="text-xs text-slate-400">क्लस्टर: {eq.locationCluster}</p>

                <div className="pt-3 border-t border-emerald-950 flex items-center justify-between text-xs">
                  <span className="text-teal-300">
                    {eq.operatorIncluded ? '✓ ऑपरेटर शामिल' : 'ड्राइवर किसान का'}
                  </span>
                  <button
                    onClick={() => toggleEquipmentStatus(eq.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold border border-emerald-800 text-xs"
                  >
                    स्टेटस बदलें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCHEMES & WEATHER */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#02100B] border border-emerald-950 space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Wind className="w-5 h-5 text-emerald-400" />
              <span>सरकारी सब्सिडी योजनाएं व मौसम एडवाइजरी ब्रॉडकास्ट</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    सब्सिडी अलर्ट
                  </span>
                  <span className="text-xs font-mono text-slate-400">लास्ट डेट: 30 सितंबर</span>
                </div>
                <h4 className="text-sm font-black text-white">ड्रिप एवं स्प्रिंकलर सिंचाई योजना (80% अनुदान)</h4>
                <p className="text-xs text-slate-400">
                  लघु एवं सीमांत किसानों को टपक सिंचाई संयंत्र हेतु ₹45,000 तक की वित्तीय सहायता।
                </p>
                <button
                  onClick={() => showToast('✓ योजना अलर्ट 10,000+ किसानों को ब्रॉडकास्ट!')}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs mt-2"
                >
                  📢 किसानों को पुश नोटिफिकेशन भेजें
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    मौसम चेतावनी
                  </span>
                  <span className="text-xs font-mono text-slate-400">अगले 48 घंटे</span>
                </div>
                <h4 className="text-sm font-black text-white">मालवा-निमाड़ में ओलावृष्टि व तेज हवा की चेतावनी</h4>
                <p className="text-xs text-slate-400">
                  फसलों को सुरक्षित करने व पकी हुई उपज को तिरपाल से ढकने हेतु तत्काल किसान परामर्श।
                </p>
                <button
                  onClick={() => showToast('✓ मौसम चेतावनी अलर्ट किसानों के फोन पर भेजा गया!')}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs mt-2"
                >
                  🚨 आपातकालीन मौसम अलर्ट भेजें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SAMADHAN VOICE DESK */}
      {activeTab === 'samadhan' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#02100B] border border-emerald-950 space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-emerald-400" />
              <span>किसान वॉइस समाधान व सीधी परामर्श हेल्पडेस्क</span>
            </h3>
            <p className="text-xs text-slate-300">
              वे ग्रामीण किसान जो लिखना नहीं जानते, वे अपनी स्थानीय बोली (मालवी, बुंदेली, निमाड़ी) में वॉइस नोट भेजते हैं। माहि पवार जी इसे सुनकर सीधे ऑडियो या कॉल पर मार्गदर्शन देती हैं।
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white flex items-center gap-2">
                  <span>🎙️ किसान सुंदरलाल पाटीदार (शाजापुर)</span>
                  <span className="text-xs text-slate-400 font-mono">(00:42 सेकंड ऑडियो)</span>
                </span>
                <span className="text-xs text-amber-400 font-bold">● नया वॉइस सवाल</span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "मैडम जी राम-राम, म्हारा खेत मा कपास की पत्तियां मुड़ री है और लाल पड़ री है। का उपाय करनो चावे?"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => showToast('ऑडियो बज रहा है...')}
                  className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>▶ ऑडियो सुनें</span>
                </button>
                <button
                  onClick={() => showToast('वॉइस रिकॉर्डर खुला: माहि पवार रिप्लाई रिकॉर्ड कर रही हैं...')}
                  className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Mic className="w-4 h-4" />
                  <span>वॉइस नोट से उत्तर दें</span>
                </button>
                <button
                  onClick={() => showToast('कॉल कनेक्ट की जा रही है...')}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>सीधी कॉल मिलाएं</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
