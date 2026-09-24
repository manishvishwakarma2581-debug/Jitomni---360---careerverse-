import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Store, 
  Utensils, 
  ShoppingBag, 
  Car, 
  Wrench, 
  Pill, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  PhoneCall, 
  Radio, 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  ExternalLink,
  DollarSign,
  Layers,
  Settings
} from 'lucide-react';
import { 
  TiedUpProvider, 
  TrojanOrder, 
  ProviderCategory, 
  CityCodeConfig 
} from './trojanTypes';
import { TrojanStorage } from './trojanStorage';
import { TrojanRealtime } from './supabaseClient';
import { trojanAudio } from './trojanAudio';

interface ProviderTieUpPortalProps {
  onSwitchToCustomer?: () => void;
  onSwitchToWorker?: () => void;
  onSwitchToAdmin?: () => void;
}

export const ProviderTieUpPortal: React.FC<ProviderTieUpPortalProps> = ({
  onSwitchToCustomer,
  onSwitchToWorker,
  onSwitchToAdmin,
}) => {
  const [providers, setProviders] = useState<TiedUpProvider[]>(() => TrojanStorage.getProviders());
  const [cities] = useState<CityCodeConfig[]>(() => TrojanStorage.getCities());

  // Active Selected Provider to view Dashboard
  const [selectedProviderId, setSelectedProviderId] = useState<string>(() => {
    const list = TrojanStorage.getProviders();
    return list[0]?.id || 'PRV-RWA-01';
  });

  const currentProvider = providers.find((p) => p.id === selectedProviderId) || providers[0];

  // Tab View: 'dashboard' vs 'register_form'
  const [activeView, setActiveView] = useState<'dashboard' | 'register_form'>('dashboard');

  // Registration Form State
  const [businessName, setBusinessName] = useState<string>('');
  const [category, setCategory] = useState<ProviderCategory>('food_restaurant');
  const [cityCode, setCityCode] = useState<string>('JS-RWA');
  const [address, setAddress] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [agreedCommission, setAgreedCommission] = useState<number>(20);
  const [integrationMode, setIntegrationMode] = useState<'manual_panel' | 'api_webhook'>('manual_panel');
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [regSuccessMsg, setRegSuccessMsg] = useState<string>('');

  // Orders State
  const [orders, setOrders] = useState<TrojanOrder[]>(() => TrojanStorage.getOrders());

  // Listen for Realtime events
  useEffect(() => {
    const handleSync = () => {
      setOrders(TrojanStorage.getOrders());
      setProviders(TrojanStorage.getProviders());
    };

    const unsubscribe = TrojanRealtime.subscribe((msg) => {
      handleSync();
      if (msg.type === 'NEW_ORDER' || msg.type === 'ORDER_CASCADED_PROVIDER') {
        trojanAudio.playIncomingTaskAlert();
      }
    });

    return () => unsubscribe();
  }, []);

  // Filter orders relevant to this provider
  // 1. Cascaded orders assigned to this provider or matching its category/city
  // 2. Pan-India forwarded orders dispatched to partner syndicates
  const incomingOrders = orders.filter(
    (o) => (o.status === 'cascaded_to_provider' || o.status === 'pending_routing' || o.status === 'forwarded_to_partner') &&
    (
      o.assignedProviderId === currentProvider.id || 
      (!o.assignedProviderId && (o.location.cityCode === currentProvider.cityCode || currentProvider.cityCode === 'JS-PAN')) ||
      o.fulfillmentType === 'pan_india_forwarded' ||
      o.isPanIndiaForwarded
    )
  );

  const activeAcceptedOrders = orders.filter(
    (o) => (o.status === 'provider_accepted' || o.status === 'in_progress') &&
    (o.assignedProviderId === currentProvider.id || o.forwardedPartnerInfo?.partnerName === currentProvider.businessName)
  );

  const completedOrders = orders.filter(
    (o) => o.status === 'completed' && 
    (o.assignedProviderId === currentProvider.id || o.forwardedPartnerInfo?.partnerName === currentProvider.businessName)
  );

  // Handle Provider Accept Order
  const handleAcceptOrder = (orderId: string) => {
    const target = orders.find(o => o.orderId === orderId);
    let success = false;
    if (target?.fulfillmentType === 'pan_india_forwarded' || target?.isPanIndiaForwarded) {
      success = TrojanStorage.acceptOrderByForwardedPartner(orderId, currentProvider.businessName);
    } else {
      success = TrojanStorage.acceptOrderByProvider(orderId, currentProvider.id);
    }

    if (success) {
      trojanAudio.playSuccessAlert();
      setOrders(TrojanStorage.getOrders());
      setProviders(TrojanStorage.getProviders());
    }
  };

  // Handle Form Registration
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !address || !ownerName) {
      alert('कृपया सभी आवश्यक विवरण भरें!');
      return;
    }

    const cityName = cities.find((c) => c.code === cityCode)?.cityName || 'Rewa';
    const newProv = TrojanStorage.registerProvider({
      businessName,
      category,
      cityCode,
      cityName,
      address,
      ownerName,
      phone,
      email: email || undefined,
      agreedCommissionPercent: agreedCommission,
      integrationMode,
      webhookUrl: integrationMode === 'api_webhook' ? webhookUrl : undefined,
    });

    trojanAudio.playSuccessAlert();
    setProviders(TrojanStorage.getProviders());
    setSelectedProviderId(newProv.id);
    setRegSuccessMsg(`बधाई! '${businessName}' का टाइ-अप सफलतापूर्वक हो गया। आपकी पार्टनर आईडी: ${newProv.id} है।`);
    
    setTimeout(() => {
      setActiveView('dashboard');
      setRegSuccessMsg('');
      // reset form
      setBusinessName('');
      setAddress('');
      setOwnerName('');
      setPhone('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* TROJAN BRIDGE HERO BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#040C1A] border-2 border-[#FFD700]/50 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#FFD700] text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>TROJAN BRIDGE PARTNER PORTAL</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                ✓ 80% Net Payout Guarantee
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
              सेवा प्रदाता टाइ-अप पोर्टल (Tie Up With Us — Get More Orders)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              रेस्टोरेंट, किराना स्टोर, मेडिकल, टैक्सी या होम सर्विस प्रोवाइडर: JITOMNI 360 के लाखों ग्राहकों से सीधे अतिरिक्त ऑर्डर्स प्राप्त करें। कोई भारी 35% कमीशन नहीं, सिर्फ 15-20% फ्लैट कमीशन।
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'dashboard' ? 'register_form' : 'dashboard')}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              {activeView === 'dashboard' ? (
                <>
                  <Store className="w-4 h-4" />
                  <span>+ नया पार्टनर रजिस्टर करें</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>← पार्टनर डैशबोर्ड देखें</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Current Provider Switcher Bar (when in dashboard view) */}
        {activeView === 'dashboard' && currentProvider && (
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-[#FFD700] text-[#FFD700]">
                {currentProvider.category === 'food_restaurant' && <Utensils className="w-5 h-5" />}
                {currentProvider.category === 'grocery_kirana' && <ShoppingBag className="w-5 h-5" />}
                {currentProvider.category === 'ride_transport' && <Car className="w-5 h-5" />}
                {currentProvider.category === 'home_service' && <Wrench className="w-5 h-5" />}
                {currentProvider.category === 'medical_pharma' && <Pill className="w-5 h-5" />}
                {currentProvider.category === 'courier_logistics' && <Truck className="w-5 h-5" />}
              </div>

              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{currentProvider.businessName}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[#FFD700] font-mono text-[10px]">
                    {currentProvider.id}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {currentProvider.cityName} ({currentProvider.cityCode}) · कमीशन: {currentProvider.agreedCommissionPercent}% (आप पाते हैं {100 - currentProvider.agreedCommissionPercent}%)
                </div>
              </div>
            </div>

            {/* Selector to switch active provider */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-mono">पार्टनर चुनें:</span>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#FFD700]"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.businessName} ({p.cityName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: REGISTRATION FORM */}
      {activeView === 'register_form' && (
        <div className="rounded-3xl bg-[#0A1931] border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FFD700]" />
              <span>पार्टनर टाइ-अप रजिस्ट्रेशन फॉर्म (Get More Orders)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              अपनी दुकान या सेवा को JITOMNI 360 ऑन-डिमांड ब्रिज से जोड़ें और तुरंत ऑर्डर्स पाएं
            </p>
          </div>

          {regSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{regSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitRegistration} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">दुकान / बिज़नेस का नाम *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. श्री कृष्णा भोजनालय / वर्मा किराना स्टोर"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">सेवा श्रेणी (Service Category) *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProviderCategory)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="food_restaurant">🍱 रेस्टोरेंट व फूड डिलीवरी (Zomato मॉडल)</option>
                  <option value="grocery_kirana">🛒 10-मिनट किराना व सुपरमार्ट (Blinkit मॉडल)</option>
                  <option value="ride_transport">🛺 ऑटो, कैब व ट्रांसपोर्ट (Ola मॉडल)</option>
                  <option value="home_service">🔧 होम सर्विसेज, प्लंबर, इलेक्ट्रीशियन (UC मॉडल)</option>
                  <option value="medical_pharma">💊 मेडिकल व 24x7 फार्मेसी</option>
                  <option value="courier_logistics">📦 लोकल पार्सल व कूरियर (Dunzo मॉडल)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">शहर कोड (City Code) *</label>
                <select
                  value={cityCode}
                  onChange={(e) => setCityCode(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                >
                  {cities.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}: {c.cityName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">मालिक / संचालक का नाम *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. महेश वर्मा"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">मोबाइल नंबर (Order SMS/Call) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">दुकान का पूरा पता व लैंडमार्क *</label>
              <input
                type="text"
                required
                placeholder="दुकान नं., चौराहा / बाजार, रीवा"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">सहमति कमीशन (Default 20%)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={10}
                    max={25}
                    value={agreedCommission}
                    onChange={(e) => setAgreedCommission(Number(e.target.value))}
                    className="w-full accent-[#FFD700]"
                  />
                  <span className="font-mono font-black text-sm text-[#FFD700] w-12 text-right">
                    {agreedCommission}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  आप पाएंगे: <strong className="text-emerald-400">{100 - agreedCommission}%</strong>, JITOMNI रखेगा: {agreedCommission}%
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ऑर्डर रिसीव मोड (Integration Mode)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntegrationMode('manual_panel')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      integrationMode === 'manual_panel'
                        ? 'bg-[#FFD700]/20 border-[#FFD700] text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    मैनुअल पैनल
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntegrationMode('api_webhook')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      integrationMode === 'api_webhook'
                        ? 'bg-[#FFD700]/20 border-[#FFD700] text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    API / Webhook
                  </button>
                </div>
              </div>
            </div>

            {integrationMode === 'api_webhook' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1">Webhook URL (Order POST payload)</label>
                <input
                  type="url"
                  placeholder="https://yourstore.com/api/jitomni-webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <span>टाइ-अप सबमिट करें व ऑर्डर्स प्राप्त करना शुरू करें ➔</span>
            </button>
          </form>
        </div>
      )}

      {/* VIEW 2: PROVIDER DASHBOARD (LIVE INCOMING ORDERS & SETTLEMENTS) */}
      {activeView === 'dashboard' && currentProvider && (
        <div className="space-y-4">
          {/* LIVE INCOMING ORDERS FROM JITOMNI 360 CUSTOMERS */}
          <div className="rounded-3xl bg-[#0A1931] border-2 border-[#FFD700] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="text-base font-black text-white">
                  लाइव इनकमिंग ऑर्डर्स (JITOMNI 360 Bridge Orders)
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-mono font-bold text-xs border border-[#FFD700]/40">
                {incomingOrders.length} नए अनुरोध
              </span>
            </div>

            {incomingOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-xl">
                  📡
                </div>
                <p className="text-xs">फिलहाल इस शहर/कैटेगरी में कोई नया पेंडिंग ऑर्डर नहीं है।</p>
                <p className="text-[11px] text-slate-500">
                  (ग्राहक ऐप से किराना, भोजन या रिपेयर ऑर्डर करें — यह तुरंत यहाँ लाइव दिखेगा)
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {incomingOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#FFD700] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-white text-xs">#{order.orderId}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono text-[10px] font-bold">
                            {order.mainCategory.toUpperCase()}
                          </span>
                          {(order.fulfillmentType === 'pan_india_forwarded' || order.isPanIndiaForwarded) && (
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold">
                              🌐 PAN-INDIA FORWARDED
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-sm mt-0.5">{order.serviceTitle}</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">ग्राहक भुगतान:</span>
                        <span className="text-lg font-black text-white font-mono">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Ordered Items / Requirements */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                      <div className="text-[11px] text-slate-400 font-bold uppercase">ऑर्डर विवरण व निर्देश:</div>
                      <p className="text-slate-200">{order.taskDetails}</p>
                      {order.items && order.items.length > 0 && (
                        <div className="mt-2 space-y-1 pt-2 border-t border-slate-900">
                          {order.items.map((it) => (
                            <div key={it.id} className="flex justify-between text-slate-300">
                              <span>• {it.name} (x{it.quantity})</span>
                              <span className="font-mono">₹{it.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span>{order.location.address} (ग्राहक: {order.customerName})</span>
                    </div>

                    {/* SETTLEMENT CARD (Shows Commission Cut by JITOMNI) */}
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                          पारदर्शी सेटलमेंट (80/20 Bridge Model)
                        </span>
                        <div className="flex items-center gap-3 text-slate-300 mt-0.5">
                          <span>कुल ऑर्डर: ₹{order.totalAmount}</span>
                          <span className="text-red-400">JITOMNI 20%: -₹{Math.round(order.totalAmount * 0.20)}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 block">आपको मिलेगा (Net Payout):</span>
                        <span className="text-lg font-black text-emerald-400">
                          ₹{order.totalAmount - Math.round(order.totalAmount * 0.20)}
                        </span>
                      </div>
                    </div>

                    {/* Accept / Reject Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAcceptOrder(order.orderId)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>ऑर्डर स्वीकार करें (Accept Order)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert('ऑर्डर रिजेक्ट किया गया। सिस्टम अन्य नजदीकी पार्टनर को फॉरवर्ड करेगा।')}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 font-bold text-xs"
                      >
                        अस्वीकार (Reject)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIVE & COMPLETED ORDERS OF THIS PROVIDER */}
          {activeAcceptedOrders.length > 0 && (
            <div className="rounded-3xl bg-[#0A1931] border border-slate-800 p-5 shadow-xl space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>तैयारी / प्रोसेसिंग में ऑर्डर्स ({activeAcceptedOrders.length})</span>
              </h3>

              <div className="space-y-2">
                {activeAcceptedOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">#{ord.orderId} · {ord.serviceTitle}</span>
                      <span className="text-[11px] text-slate-400 font-mono">पता: {ord.location.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">
                        {ord.status.toUpperCase()}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`ऑर्डर #${ord.orderId} 'डिलीवरी हेतु तैयार' चिह्नित किया गया।`)}
                        className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        पिकअप हेतु तैयार ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINANCIAL SETTLEMENT LEDGER (80/20 MODEL) */}
          <div className="rounded-3xl bg-[#0A1931] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#FFD700]" />
                <span>पार्टनर सेटलमेंट लेजर (Settlement Ledger — 80% Payout)</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                दैनिक सेटलमेंट (T+1 Daily NEFT)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">JITOMNI से प्राप्त कुल ऑर्डर्स</span>
                <div className="text-2xl font-black text-white font-mono">
                  {currentProvider.totalOrdersReceived}
                </div>
                <span className="text-[10px] text-slate-400">ग्राहक आपके नाम के बिना सीधे JITOMNI से मंगाते हैं</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">आपको भुगतान की गई कुल राशि (80%)</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{currentProvider.totalSettlementPaid.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-500/80">सीधे बैंक खाते में ट्रांसफर</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">JITOMNI ब्रिज कमीशन (20%)</span>
                <div className="text-2xl font-black text-[#FFD700] font-mono">
                  ₹{currentProvider.totalPlatformKept.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">मार्केटिंग व तकनीकी बुनियादी ढांचा</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
