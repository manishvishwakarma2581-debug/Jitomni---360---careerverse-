import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  CreditCard, 
  ShoppingBag, 
  Wrench, 
  HeartHandshake, 
  Utensils, 
  Plus, 
  Minus, 
  ChevronRight, 
  Navigation, 
  FileText,
  AlertTriangle,
  Zap,
  Lock,
  Compass,
  Globe
} from 'lucide-react';
import { 
  TrojanOrder, 
  ServiceMainCategory, 
  SubCategoryType, 
  CityCodeConfig, 
  OrderItem 
} from './trojanTypes';
import { TrojanStorage } from './trojanStorage';
import { TrojanRealtime } from './supabaseClient';
import { trojanAudio } from './trojanAudio';

interface CustomerAppPanelProps {
  onOrderCreated?: (order: TrojanOrder) => void;
  onOpenWorkerApp?: () => void;
  onOpenProviderPortal?: () => void;
  onOpenAdminPanel?: () => void;
}

// Quick Kirana Catalog
const KIRANA_ITEMS = [
  { id: 'k1', name: 'आशीर्वाद चक्की आटा (5kg)', price: 235, unit: '5 kg', img: '🌾', category: 'Pantry' },
  { id: 'k2', name: 'अमूल ताज़ा दूध (1L Pouch)', price: 68, unit: '1 Litre', img: '🥛', category: 'Dairy' },
  { id: 'k3', name: 'फॉर्च्यून रिफाइंड सोयाबीन तेल (1L)', price: 145, unit: '1 Litre', img: '🌻', category: 'Pantry' },
  { id: 'k4', name: 'टाटा आयोडाइज्ड नमक (1kg)', price: 28, unit: '1 kg', img: '🧂', category: 'Pantry' },
  { id: 'k5', name: 'मैगी 2-मिनट नूडल्स (4-Pack)', price: 56, unit: '280g', img: '🍜', category: 'Snacks' },
  { id: 'k6', name: 'ताज़ा अमूल मक्खन / बटर (100g)', price: 58, unit: '100g', img: '🧈', category: 'Dairy' },
  { id: 'k7', name: 'प्रीमियम असम चाय पत्ती (250g)', price: 120, unit: '250g', img: '☕', category: 'Snacks' },
  { id: 'k8', name: 'फर्स्ट-एड डिटॉल व बैंड-एड किट', price: 95, unit: '1 Kit', img: '🩹', category: 'Pharma' },
];

export const CustomerAppPanel: React.FC<CustomerAppPanelProps> = ({
  onOrderCreated,
  onOpenWorkerApp,
  onOpenProviderPortal,
  onOpenAdminPanel,
}) => {
  const [cities] = useState<CityCodeConfig[]>(() => TrojanStorage.getCities());
  const [selectedCityCode, setSelectedCityCode] = useState<string>('JS-RWA');
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const selectedCity = cities.find((c) => c.code === selectedCityCode) || cities[0];

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<ServiceMainCategory>('hourly_sathi');

  // Booking Flow Steps: 'select_service' | 'fill_details' | 'payment_modal' | 'live_tracking'
  const [flowStep, setFlowStep] = useState<'select_service' | 'fill_details' | 'payment_modal' | 'live_tracking'>('select_service');

  // Service Specific Configs
  const [hourlyHours, setHourlyHours] = useState<2 | 4 | 8>(2);
  const [hourlySubtype, setHourlySubtype] = useState<SubCategoryType>('sathi_medical');

  const [taskSubtype, setTaskSubtype] = useState<SubCategoryType>('task_bill_pay');
  const [taskFixedPrice, setTaskFixedPrice] = useState<number>(149);

  // Cart for Quick Commerce
  const [cart, setCart] = useState<Record<string, number>>({});

  // Task Details Input
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('मनीष शर्मा');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 98261 55902');
  const [customerAddress, setCustomerAddress] = useState<string>('मकान नं. 45, सिरमौर चौराहा, रीवा');
  const [landmark, setLandmark] = useState<string>('कृष्णा होटल के पीछे');
  const [paymentMethod, setPaymentMethod] = useState<'upi_mock' | 'cod' | 'razorpay_mock'>('upi_mock');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Active / Tracked Order
  const [activeOrder, setActiveOrder] = useState<TrojanOrder | null>(() => {
    const orders = TrojanStorage.getOrders();
    return orders[0] || null;
  });

  // Real-time synchronization
  useEffect(() => {
    const unsubscribe = TrojanRealtime.subscribe((msg) => {
      if (activeOrder && (
        msg.type === 'ORDER_ACCEPTED_SATHI' || 
        msg.type === 'ORDER_ACCEPTED_PROVIDER' || 
        msg.type === 'TASK_STARTED' || 
        msg.type === 'TASK_COMPLETED' ||
        msg.type === 'ORDER_FORWARDED_PAN_INDIA'
      )) {
        const freshOrders = TrojanStorage.getOrders();
        const updated = freshOrders.find((o) => o.orderId === activeOrder.orderId);
        if (updated) {
          setActiveOrder(updated);
        }
      }
    });
    return () => unsubscribe();
  }, [activeOrder]);

  // Cart item management
  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const cur = prev[id] || 0;
      const next = cur + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = KIRANA_ITEMS.find((k) => k.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  // Price calculations
  const calculateTotal = (): { base: number; safety: number; gst: number; total: number } => {
    let base = 0;
    if (selectedTab === 'hourly_sathi') {
      if (hourlyHours === 2) base = 199;
      else if (hourlyHours === 4) base = 349;
      else base = 599;
    } else if (selectedTab === 'task_based') {
      base = taskFixedPrice;
    } else {
      base = getCartTotal() || 199;
    }

    const safety = 15;
    const gst = 18;
    return {
      base,
      safety,
      gst,
      total: base + safety + gst,
    };
  };

  // Handle Order Placement
  const handleProceedToPayment = () => {
    setFlowStep('payment_modal');
  };

  const handleConfirmOrder = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const { total } = calculateTotal();
      let serviceTitle = '';
      let subCat: SubCategoryType = hourlySubtype;
      let itemsList: OrderItem[] | undefined = undefined;

      if (selectedTab === 'hourly_sathi') {
        serviceTitle = `रॉयल साथी (${hourlyHours} घंटे)`;
        subCat = hourlySubtype;
      } else if (selectedTab === 'task_based') {
        serviceTitle = `टास्क सेवा: ${taskSubtype.replace('task_', '').toUpperCase()}`;
        subCat = taskSubtype;
      } else {
        serviceTitle = '10-मिनट सुपर किराना डिलीवरी';
        subCat = 'quick_kirana';
        itemsList = Object.entries(cart).map(([id, qty]) => {
          const itm = KIRANA_ITEMS.find((k) => k.id === id)!;
          return {
            id,
            name: itm.name,
            quantity: qty,
            price: itm.price,
            unit: itm.unit,
          };
        });
      }

      const cityName = selectedCityCode === 'JS-PAN' && customCityInput.trim() 
        ? customCityInput.trim() 
        : selectedCity.cityName;
      const stateName = selectedCity.state || 'All India';

      const created = TrojanStorage.createOrder({
        customerName,
        customerPhone,
        mainCategory: selectedTab,
        subCategory: subCat,
        serviceTitle,
        taskDetails: taskDescription || 'तत्काल सेवा अनुरोध (Immediate requirement)',
        location: {
          address: customerAddress,
          landmark,
          city: cityName,
          cityCode: selectedCity.code,
          state: stateName,
          zoneType: selectedCity.zoneType,
        },
        items: itemsList,
        hourlyDurationHours: selectedTab === 'hourly_sathi' ? hourlyHours : undefined,
        totalAmount: total,
        paymentMethod,
      });

      setIsProcessingPayment(false);
      setActiveOrder(created);
      setFlowStep('live_tracking');
      trojanAudio.playSuccessAlert();
      if (onOrderCreated) onOrderCreated(created);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* TROJAN BRANDING BANNER: "6 App Delete Karo, 1 App Rakho" */}
      <div className="rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#040C1A] border-2 border-[#FFD700]/50 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#FFD700] text-slate-950 font-black text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>6 APP DELETE KARO, 1 APP RAKHO</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-bold font-mono">
                ✓ 100% Verified Trojan Bridge
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/40">
                🇮🇳 PAN-INDIA COVERED
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              JITOMNI 360 — ऑन-डिमांड साथी व संपूर्ण सुपर ऐप
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Zomato, Blinkit, Urban Company, Ola, Dunzo या 1mg अलग-अलग रखने की ज़रूरत नहीं। 
              बस JITOMNI में बोलें या चुनें — जहाँ हमारे रॉयल साथी हैं वहाँ डायरेक्ट, और पूरे भारत में स्थानीय सत्यापित पार्टनर्स को मांग फॉरवर्ड कर काम तुरंत पूरा कराते हैं!
            </p>
          </div>

          {/* City Selector */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-mono text-[#FFD700] font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FFD700]" />
              <span>सेवा क्षेत्र (Operating Zone)</span>
            </span>
            <select
              value={selectedCityCode}
              onChange={(e) => setSelectedCityCode(e.target.value)}
              className="w-full sm:w-64 py-2 px-3 rounded-xl bg-slate-900 border border-[#FFD700]/40 text-xs font-bold text-white focus:outline-none focus:border-[#FFD700]"
            >
              <optgroup label="🛡️ डायरेक्ट रॉयल साथी हब (Direct Sovereign Hubs)">
                {cities.filter(c => c.zoneType === 'direct_hub').map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.code}: {city.cityName} ({city.state})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🌐 पैन-इंडिया पार्टनर फॉरवर्डिंग (Pan-India Forwarding Zones)">
                {cities.filter(c => c.zoneType === 'pan_india_forward').map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.code}: {city.cityName} ({city.state})
                  </option>
                ))}
              </optgroup>
            </select>

            {selectedCityCode === 'JS-PAN' && (
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="अपना शहर / पिनकोड (उदा. 400001, Agra, Surat)..."
                  value={customCityInput}
                  onChange={(e) => setCustomCityInput(e.target.value)}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-950 border border-blue-400 text-xs text-white placeholder-slate-400 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* 6 Replaced Apps Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] text-slate-400">
          <span className="font-bold text-white whitespace-nowrap">हटाइए इन्हें:</span>
          {[
            { name: 'Zomato/Swiggy', icon: '🍱' },
            { name: 'Blinkit/Zepto', icon: '⚡' },
            { name: 'Urban Company', icon: '🔧' },
            { name: 'Ola/Uber', icon: '🛺' },
            { name: 'Dunzo Delivery', icon: '📦' },
            { name: 'Pharmeasy', icon: '💊' },
          ].map((app, i) => (
            <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 whitespace-nowrap flex items-center gap-1 line-through decoration-red-500 decoration-2">
              <span>{app.icon}</span>
              <span>{app.name}</span>
            </span>
          ))}
          <span className="text-[#FFD700] font-bold whitespace-nowrap ml-1">➔ सब 1 ऐप में!</span>
        </div>
      </div>

      {/* PAN-INDIA REASSURANCE BANNER (When user selects pan_india_forward zone) */}
      {selectedCity.zoneType === 'pan_india_forward' && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-[#0A1931] to-blue-950/70 border border-blue-500/40 flex items-start sm:items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
              <Globe className="w-4 h-4 text-blue-400" />
            </span>
            <div>
              <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                <span>अखिल भारतीय मांग अग्रेषण सक्रिय (Pan-India Demand Forwarding Active)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  100% सेवा गारंटी
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                <strong>{selectedCityCode === 'JS-PAN' && customCityInput ? customCityInput : selectedCity.cityName} ({selectedCity.state})</strong> में आपका ऑर्डर तुरंत स्थानीय पंजीकृत सेवा प्रदाता (Tied-up Service Partner) को भेजा जाएगा। ग्राहक को केवल JITOMNI 360 का विश्वास व सुरक्षा मिलती है।
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[10px] text-blue-300 font-mono font-bold bg-blue-900/40 px-2.5 py-1 rounded-lg border border-blue-500/30 whitespace-nowrap">
            Trojan Commission: 15-20%
          </span>
        </div>
      )}

      {/* BIG SEARCH BAR */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kya Chahiye? Sathi, Auto, Khana, Kirana, Plumber - Sab Milega"
          className="w-full py-4 px-4 pl-12 pr-28 rounded-2xl bg-[#0A1931] border-2 border-[#FFD700]/50 text-sm sm:text-base text-white placeholder-slate-400 shadow-xl focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all font-medium"
        />
        <Search className="w-5 h-5 text-[#FFD700] absolute left-4 top-4.5" />
        
        <button
          type="button"
          onClick={() => {
            if (searchQuery.toLowerCase().includes('khana') || searchQuery.toLowerCase().includes('food')) setSelectedTab('quick_commerce');
            else if (searchQuery.toLowerCase().includes('plumber') || searchQuery.toLowerCase().includes('bill')) setSelectedTab('task_based');
            else setSelectedTab('hourly_sathi');
          }}
          className="absolute right-2.5 top-2.5 py-2 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow"
        >
          खोजें
        </button>
      </div>

      {/* QUICK SUGGESTION PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { label: '🛺 ऑटो/सवारी', action: () => setSelectedTab('task_based') },
          { label: '🍱 शुद्ध भोजन (Zomato)', action: () => setSelectedTab('quick_commerce') },
          { label: '🛒 10-मिनट किराना (Blinkit)', action: () => setSelectedTab('quick_commerce') },
          { label: '👨‍🔧 प्लंबर/इलेक्ट्रीशियन (UC)', action: () => { setSelectedTab('task_based'); setTaskSubtype('task_repair_plumber'); setTaskFixedPrice(249); } },
          { label: '🏥 अस्पताल साथी (Hourly)', action: () => { setSelectedTab('hourly_sathi'); setHourlySubtype('sathi_medical'); } },
          { label: '🧾 बिल भुगतान (₹149)', action: () => { setSelectedTab('task_based'); setTaskSubtype('task_bill_pay'); setTaskFixedPrice(149); } },
        ].map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={chip.action}
            className="py-1.5 px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-[#FFD700] text-slate-200 hover:text-white whitespace-nowrap transition-all text-[11px] font-semibold"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 3 MAIN SERVICES TAB SWITCHER */}
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#07132B] border border-slate-800">
        <button
          type="button"
          onClick={() => { setSelectedTab('hourly_sathi'); setFlowStep('select_service'); }}
          className={`py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
            selectedTab === 'hourly_sathi'
              ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 font-black shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
        >
          <HeartHandshake className="w-5 h-5" />
          <span className="text-xs font-bold leading-tight">घंटे अनुसार साथी</span>
          <span className="text-[10px] font-mono opacity-80">₹199 से शुरू</span>
        </button>

        <button
          type="button"
          onClick={() => { setSelectedTab('task_based'); setFlowStep('select_service'); }}
          className={`py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
            selectedTab === 'task_based'
              ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 font-black shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-xs font-bold leading-tight">टास्क आधारित</span>
          <span className="text-[10px] font-mono opacity-80">निश्चित ₹99 - ₹299</span>
        </button>

        <button
          type="button"
          onClick={() => { setSelectedTab('quick_commerce'); setFlowStep('select_service'); }}
          className={`py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
            selectedTab === 'quick_commerce'
              ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 font-black shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs font-bold leading-tight">10-Min किराना</span>
          <span className="text-[10px] font-mono opacity-80">Blinkit मॉडल</span>
        </button>
      </div>

      {/* SERVICE CONTENT BASED ON SELECTED TAB */}
      {flowStep === 'select_service' && (
        <div className="space-y-4">
          {/* 1. HOURLY SATHI (2hr @199, 4hr @349, 8hr @599) */}
          {selectedTab === 'hourly_sathi' && (
            <div className="p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FFD700]" />
                    <span>घंटे चुनें (Hourly Packages)</span>
                  </h3>
                  <span className="text-[11px] text-[#FFD700] font-mono font-bold">
                    100% पुलिस व आधार वेरिफाइड साथी
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  वरिष्ठ नागरिक सहायता, अस्पताल विज़िट, बैंक/सरकारी दफ्तर, शॉपिंग या पारिवारिक यात्रा
                </p>
              </div>

              {/* 3 Price Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { hours: 2 as const, price: 199, label: '2 घंटे का साथी', desc: 'शॉपिंग, दवा या बैंक कार्य' },
                  { hours: 4 as const, price: 349, label: '4 घंटे (हाफ डे)', desc: 'अस्पताल ओपीडी, सरकारी कार्य', popular: true },
                  { hours: 8 as const, price: 599, label: '8 घंटे (फुल डे)', desc: 'पूरे दिन की व्यक्तिगत सहायता' },
                ].map((pkg) => (
                  <button
                    key={pkg.hours}
                    type="button"
                    onClick={() => setHourlyHours(pkg.hours)}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      hourlyHours === pkg.hours
                        ? 'bg-[#FFD700]/15 border-[#FFD700] shadow-md shadow-[#FFD700]/10'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#FFD700] text-slate-950 font-mono text-[9px] font-black uppercase">
                        लोकप्रिय
                      </span>
                    )}
                    <div className="font-bold text-white text-xs">{pkg.label}</div>
                    <div className="text-xl font-black text-[#FFD700] font-mono mt-1">
                      ₹{pkg.price}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                      {pkg.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Subcategory choices */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">साथी का उद्देश्य चुनें:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'sathi_medical' as const, label: '🏥 अस्पताल व मरीज अटेंडेंट' },
                    { id: 'sathi_senior' as const, label: '👴 बुजुर्ग व सीनियर सिटीजन' },
                    { id: 'sathi_bank_govt' as const, label: '🏛️ बैंक व सरकारी दफ्तर' },
                    { id: 'sathi_shopping' as const, label: '🛍️ खरीदारी व बाजार सहायक' },
                    { id: 'sathi_chaperone' as const, label: '🚆 स्टेशन व यात्रा साथी' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setHourlySubtype(sub.id)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        hourlySubtype === sub.id
                          ? 'bg-slate-800 border-[#FFD700] text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFlowStep('fill_details')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>स्थान व विवरण भरें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 2. TASK BASED (Fixed ₹99 - ₹299) */}
          {selectedTab === 'task_based' && (
            <div className="p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-4">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#FFD700]" />
                  <span>निश्चित दर टास्क (Fixed Rate ₹99 - ₹299)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  कोई मोलभाव नहीं, सीधे निश्चित दर पर काम पूरा कराएं
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'task_bill_pay' as const, title: 'बिजली / पानी बिल जमा कराना', price: 149, icon: '🧾', desc: 'दफ्तर जाकर बिल भरना व रसीद लाना' },
                  { id: 'task_delivery' as const, title: 'दवाई व आवश्यक वस्तु डिलीवरी', price: 99, icon: '💊', desc: 'मेडिकल स्टोर से दवा खरीदकर घर लाना' },
                  { id: 'task_senior_help' as const, title: 'सीनियर सिटीजन तात्कालिक मदद', price: 199, icon: '🤝', desc: 'घर का जरूरी काम, फॉर्म या सहारा' },
                  { id: 'task_doc_pickup' as const, title: 'दस्तावेज व ऑफिस कूरियर पिकअप', price: 179, icon: '📂', desc: 'सुरक्षित दस्तावेज एक पते से दूसरे तक' },
                  { id: 'task_repair_plumber' as const, title: 'इमरजेंसी प्लंबर विजिट (UC मॉडल)', price: 249, icon: '🔧', desc: 'नल, पाइप या लीकेज तत्काल सुधार' },
                  { id: 'task_electrician' as const, title: 'इमरजेंसी इलेक्ट्रीशियन विजिट', price: 249, icon: '💡', desc: 'शॉर्ट सर्किट, स्विच या पंखा रिपेयर' },
                ].map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => {
                      setTaskSubtype(task.id);
                      setTaskFixedPrice(task.price);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      taskSubtype === task.id
                        ? 'bg-[#FFD700]/15 border-[#FFD700] text-white shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{task.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{task.title}</span>
                        <span className="font-mono font-black text-[#FFD700] text-xs">₹{task.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{task.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setFlowStep('fill_details')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>आगे बढ़ें (₹{taskFixedPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3. QUICK COMMERCE (10 Min Kirana - Blinkit Model) */}
          {selectedTab === 'quick_commerce' && (
            <div className="p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>10-मिनट सुपर किराना (Blinkit Trojan Bridge)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    नजदीकी टाइ-अप किराना स्टोर से 10 से 15 मिनट में डिलीवरी
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">कुल कार्ट</span>
                  <span className="text-sm font-black font-mono text-[#FFD700]">₹{getCartTotal()}</span>
                </div>
              </div>

              {/* Kirana Catalog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {KIRANA_ITEMS.map((item) => {
                  const count = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl p-1 rounded bg-slate-800">{item.img}</span>
                        <div>
                          <div className="font-bold text-xs text-white leading-tight">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.unit}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                        <span className="font-mono font-black text-sm text-[#FFD700]">₹{item.price}</span>
                        {count === 0 ? (
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, 1)}
                            className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all"
                          >
                            + जोड़ें
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-slate-800 px-1.5 py-0.5 rounded-lg border border-slate-700">
                            <button
                              type="button"
                              onClick={() => updateCart(item.id, -1)}
                              className="text-slate-300 hover:text-white p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs text-white px-1">{count}</span>
                            <button
                              type="button"
                              onClick={() => updateCart(item.id, 1)}
                              className="text-emerald-400 hover:text-emerald-300 p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={getCartTotal() === 0}
                  onClick={() => setFlowStep('fill_details')}
                  className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    getCartTotal() > 0
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 hover:brightness-110 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>चेकआउट करें (₹{getCartTotal()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: FILL TASK DETAILS & LOCATION */}
      {flowStep === 'fill_details' && (
        <div className="p-5 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFD700]" />
              <span>सेवा स्थान व विवरण</span>
            </h3>
            <button
              type="button"
              onClick={() => setFlowStep('select_service')}
              className="text-xs text-slate-400 hover:text-white font-bold"
            >
              ← वापस बदलें
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">टास्क या निर्देश (Requirements)</label>
              <textarea
                rows={2}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="उदा. अस्पताल OPD कार्ड बनवाना है, या तुरंत बिजली का बिल जमा करना है..."
                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">आपका नाम *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">मोबाइल नंबर (OTP हेतु) *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">पूरा पता (Delivery / Meeting Point) *</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">लैंडमार्क / पहचान का स्थान</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Instant Price Quote Breakdown */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-[#FFD700]/30 space-y-2 text-xs">
            <div className="font-black text-[#FFD700] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              तत्काल बिल विवरण (Instant Price Quote)
            </div>

            {(() => {
              const quote = calculateTotal();
              return (
                <div className="space-y-1 text-slate-300 font-mono">
                  <div className="flex justify-between">
                    <span>मूल सेवा शुल्क (Base Fare):</span>
                    <span>₹{quote.base}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>सुरक्षा व सत्यापन चार्ज:</span>
                    <span>₹{quote.safety}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>प्लेटफ़ॉर्म व जीएसटी:</span>
                    <span>₹{quote.gst}</span>
                  </div>
                  <div className="flex justify-between font-black text-white text-sm pt-2 border-t border-slate-800">
                    <span>कुल देय राशि:</span>
                    <span className="text-[#FFD700]">₹{quote.total}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <button
            type="button"
            onClick={handleProceedToPayment}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>भुगतान व साथी बुक करें</span>
          </button>
        </div>
      )}

      {/* STEP 3: PAYMENT MODAL (RAZORPAY / UPI MOCK) */}
      {flowStep === 'payment_modal' && (
        <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-[#FFD700] space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-black text-white">Razorpay / UPI सुरक्षित गेटवे</h3>
            </div>
            <button
              type="button"
              onClick={() => setFlowStep('fill_details')}
              className="text-xs text-slate-400 hover:text-white"
            >
              रद्द करें ✕
            </button>
          </div>

          <div className="text-center py-2">
            <span className="text-xs text-slate-400 block">कुल भुगतान</span>
            <span className="text-3xl font-black text-[#FFD700] font-mono">
              ₹{calculateTotal().total}
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">भुगतान का माध्यम चुनें:</label>

            <button
              type="button"
              onClick={() => setPaymentMethod('upi_mock')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                paymentMethod === 'upi_mock'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs">
                <span className="text-lg">📲</span>
                <div>
                  <div>UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                  <div className="text-[10px] text-emerald-400 font-mono">0% अतिरिक्त शुल्क</div>
                </div>
              </div>
              <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'upi_mock' ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                paymentMethod === 'cod'
                  ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs">
                <span className="text-lg">💵</span>
                <div>
                  <div>कैश ऑन डिलीवरी (Cash on Delivery)</div>
                  <div className="text-[10px] text-slate-400">कार्य पूर्ण होने पर साथी को दें</div>
                </div>
              </div>
              <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'cod' ? 'text-amber-400' : 'text-slate-600'}`} />
            </button>
          </div>

          <button
            type="button"
            disabled={isProcessingPayment}
            onClick={handleConfirmOrder}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            {isProcessingPayment ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>सुरक्षित भुगतान वेरीफाई हो रहा है...</span>
              </span>
            ) : (
              <span>₹{calculateTotal().total} का भुगतान कन्फर्म करें ➔</span>
            )}
          </button>
        </div>
      )}

      {/* STEP 4: LIVE TRACKING OF ROYAL SATHI / TASK */}
      {flowStep === 'live_tracking' && activeOrder && (
        <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-[#FFD700] space-y-4 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-[#FFD700] font-bold">ऑर्डर आईडी: #{activeOrder.orderId}</span>
              <h3 className="text-sm font-black text-white">{activeOrder.serviceTitle}</h3>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${
              activeOrder.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : activeOrder.status === 'in_progress'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
            }`}>
              {activeOrder.status.toUpperCase()}
            </span>
          </div>

          {/* OTP Box (Crucial for customer security) */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-[#FFD700]/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">स्टार्ट OTP (साथी को काम शुरू करते समय बताएं)</span>
              <span className="text-xl font-black text-[#FFD700] font-mono tracking-widest">
                {activeOrder.startOtp}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">एंड OTP (कार्य समाप्ति पर दें)</span>
              <span className="text-xl font-black text-emerald-400 font-mono tracking-widest">
                {activeOrder.endOtp}
              </span>
            </div>
          </div>

          {/* PAN-INDIA DEMAND FORWARDING DISPATCH CARD (If order is in pan_india_forward zone) */}
          {(activeOrder.fulfillmentType === 'pan_india_forwarded' || activeOrder.isPanIndiaForwarded) && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-blue-950/80 border-2 border-blue-400/60 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    अखिल भारतीय मांग अग्रेषण (Pan-India Demand Forwarding)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                  JITOMNI कमिशन: ₹{activeOrder.commission?.platformFeeAmount || Math.round(activeOrder.totalAmount * 0.20)} ({activeOrder.commission?.platformFeePercent || 20}%)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">असाइन पार्टनर नेटवर्क (Partner Syndicate):</span>
                  <span className="text-white font-bold block mt-0.5">
                    {activeOrder.forwardedPartnerInfo?.partnerName || activeOrder.assignedProviderName || `${activeOrder.location.city} स्थानीय सेवा प्रदाता नेटवर्क`}
                  </span>
                  <span className="text-[10px] text-blue-300 font-mono">
                    {activeOrder.location.city}, {activeOrder.location.state || 'All India'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">डिस्पैच चैनल व स्थिति:</span>
                  <span className="text-emerald-400 font-bold font-mono block mt-0.5">
                    {activeOrder.status === 'provider_accepted' ? '✓ पार्टनर द्वारा स्वीकृत (Acknowledged)' : '⚡ मांग प्रेषित (Dispatched to Partner)'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    माध्यम: {activeOrder.forwardedPartnerInfo?.dispatchChannel === 'api_webhook' ? 'API Webhook (Zero Latency)' : 'Automated WhatsApp Dispatch'}
                  </span>
                </div>
              </div>

              {/* Action: Simulate Partner Accept if still forwarded */}
              {activeOrder.status === 'forwarded_to_partner' && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400">
                    प्रदाता को ऑर्डर मिल गया है। टेस्ट करने हेतु स्वीकार करें:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      TrojanStorage.acceptOrderByForwardedPartner(activeOrder.orderId);
                      const fresh = TrojanStorage.getOrders().find(o => o.orderId === activeOrder.orderId);
                      if (fresh) setActiveOrder(fresh);
                      trojanAudio.playSuccessAlert();
                    }}
                    className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow"
                  >
                    स्थानीय पार्टनर के रूप में स्वीकारें ✓
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Assigned Worker / Partner Details (Trojan Bridge: customer only sees verified JITOMNI badge!) */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-[#FFD700] flex items-center justify-center overflow-hidden">
                {activeOrder.assignedSathiPhoto ? (
                  <img src={activeOrder.assignedSathiPhoto} alt="Sathi" className="w-full h-full object-cover" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-[#FFD700]" />
                )}
              </div>
              <div>
                <div className="font-bold text-white text-xs">
                  {activeOrder.assignedSathiName || activeOrder.assignedProviderName || activeOrder.forwardedPartnerInfo?.partnerName || 'सत्यापित सेवा साथी'}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>
                    {activeOrder.assignedSathiId || 'JITOMNI 360 वेरिफाइड पार्टनर नेटवर्क'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {activeOrder.assignedSathiPhone || activeOrder.assignedProviderPhone || activeOrder.forwardedPartnerInfo?.contactPhone || '+91 98261 XXXXX'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeOrder.assignedSathiPhone || activeOrder.assignedProviderPhone || '112'}`}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>कॉल करें</span>
              </a>
            </div>
          </div>

          {/* Simulated Map Visualizer */}
          <div className="p-4 rounded-xl bg-[#040C1A] border border-slate-800 relative overflow-hidden space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-[#FFD700] animate-bounce" />
                <span>लाइव लोकेशन ट्रैकर (Rewa Smart Matrix)</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">पहुंचने का अनुमान: 8 मिनट</span>
            </div>

            <div className="h-28 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center relative">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-mono text-[11px] font-bold border border-[#FFD700]/30">
                  <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
                  <span>साथी आपके पते की ओर रवाना है</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-xs px-2">
                  {activeOrder.location.address}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Switch / New Booking Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setFlowStep('select_service')}
              className="text-xs text-[#FFD700] hover:underline font-bold"
            >
              + नया ऑर्डर करें
            </button>

            {onOpenWorkerApp && (
              <button
                type="button"
                onClick={onOpenWorkerApp}
                className="text-xs text-slate-400 hover:text-white font-mono"
              >
                वर्कर ऐप में लाइव आर्डर देखें ➔
              </button>
            )}
          </div>
        </div>
      )}

      {/* PERSISTENT BOTTOM BAR FOR ACTIVE ORDER IF BROWSING */}
      {flowStep !== 'live_tracking' && activeOrder && (
        <div className="p-3 rounded-xl bg-[#07132B] border border-[#FFD700]/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="font-bold text-white">सक्रिय ऑर्डर: #{activeOrder.orderId}</span>
              <span className="text-[10px] text-slate-400 block truncate max-w-xs">{activeOrder.serviceTitle}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFlowStep('live_tracking')}
            className="py-1.5 px-3 rounded-lg bg-[#FFD700] text-slate-950 font-black text-xs hover:brightness-110 shadow"
          >
            ट्रैकिंग देखें
          </button>
        </div>
      )}
    </div>
  );
};
