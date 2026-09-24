import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Plus, 
  Minus, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  Info,
  ChevronRight,
  BadgePercent
} from 'lucide-react';
import { DemandPartner, DemandPartnerMenuItem, BridgeOrder } from './royalAutoTypes';
import { RoyalAutoStorage } from './royalAutoStorage';
import { playAcceptSound } from './audioAlerts';

interface FoodBridgeRestaurantHubProps {
  onOrderCreated?: (order: BridgeOrder) => void;
}

export const FoodBridgeRestaurantHub: React.FC<FoodBridgeRestaurantHubProps> = ({
  onOrderCreated,
}) => {
  const [partners] = useState<DemandPartner[]>(() => {
    return RoyalAutoStorage.getDemandPartners().filter((p) => p.type === 'restaurant');
  });

  const [selectedPartner, setSelectedPartner] = useState<DemandPartner>(() => {
    return partners[0] || RoyalAutoStorage.getDemandPartners()[0];
  });

  // Cart state: item id -> quantity
  const [cart, setCart] = useState<Record<string, number>>({
    'SK-01': 1, // default 1 deluxe thali
  });

  const [deliveryAddress, setDeliveryAddress] = useState<string>('सिविल लाइन्स, बंगला नं. 14, रीवा');
  const [customerName, setCustomerName] = useState<string>('सुनील तिवारी (Sunil Tiwari)');
  const [customerPhone, setCustomerPhone] = useState<string>('+91 94250 88219');
  const [orderSuccess, setOrderSuccess] = useState<BridgeOrder | null>(null);

  // Cart operations
  const handleAddItem = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  // Cart totals
  const menuItems = selectedPartner?.menuItems || [];
  const cartItemsList = Object.entries(cart).map(([itemId, qty]) => {
    const item = menuItems.find((m) => m.id === itemId);
    return {
      item,
      qty,
      total: (item?.price || 0) * qty,
    };
  }).filter((x) => x.item && x.qty > 0);

  const subTotal = cartItemsList.reduce((acc, curr) => acc + curr.total, 0);
  const deliveryFee = subTotal > 0 ? 30 : 0;
  const grandTotal = subTotal + deliveryFee;

  // 80/20 Sovereign split calculation
  const partnerCut80 = Math.round(grandTotal * 0.80);
  const platformCut20 = grandTotal - partnerCut80;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (grandTotal === 0) return;

    playAcceptSound();

    const orderItems = cartItemsList.map((c) => ({
      name: c.item?.name || 'Meal Item',
      quantity: c.qty,
      price: c.item?.price || 0,
    }));

    const newOrder = RoyalAutoStorage.createBridgeOrder({
      type: 'food',
      serviceTitle: `${selectedPartner.name} • ${orderItems.map((i) => `${i.name} x${i.quantity}`).join(', ')}`,
      customerId: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      pickup: {
        address: selectedPartner.address,
        lat: 24.5362,
        lng: 81.3037,
      },
      drop: {
        address: deliveryAddress,
        lat: 24.538,
        lng: 81.305,
      },
      totalAmount: grandTotal,
      items: orderItems,
      notes: `Fresh parcel order from ${selectedPartner.name}`,
    });

    // Auto forward directly to this partner in Bridge platform (80/20)
    RoyalAutoStorage.forwardOrderToPartner(newOrder.orderId, selectedPartner);

    setOrderSuccess(newOrder);
    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }
  };

  return (
    <div className="space-y-8">
      {/* Manifesto Banner: The 80/20 Sovereign Food Bridge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/50 via-[#07132B] to-[#0A1931] border-2 border-red-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-black">
            <Store className="w-3.5 h-3.5" />
            <span>BRIDGE PLATFORM • ZERO COOKING CONFLICT</span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono font-black text-xs">
            80% PARTNER • 20% JITOMNI BRIDGE FEE
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          फूड ब्रिज नेटवर्क — हम खाना नहीं बनाते, हम लोकल भोजनालयों को आर्डर देते हैं!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          जोमैटो/स्वीगी जैसे प्लेटफॉर्म 30-35% का भारी कमीशन काटकर छोटे होटलों को दबाते हैं। 
          <strong className="text-white"> JITOMNI का डिमांड टॉवर</strong> शहर के सर्वश्रेष्ठ शुद्ध भोजनालयों और टिफिन प्रदाताओं को सीधे सशक्त बनाता है — 
          <strong className="text-emerald-400"> 80% भुगतान सीधे रेस्टोरेंट को</strong> मिलता है और केवल <strong className="text-[#D4AF37]">20% ब्रिज शुल्क</strong> हमारे नेटवर्क को।
        </p>
      </div>

      {/* Restaurant Selection Pills */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          शहर के सत्यापित टाई-अप भोजनालय (Verified Tie-Up Restaurants)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {partners.map((partner) => (
            <button
              key={partner.id}
              type="button"
              onClick={() => {
                setSelectedPartner(partner);
                setCart({});
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedPartner.id === partner.id
                  ? 'bg-slate-900 border-[#D4AF37] shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37]">{partner.partnerRoyalId}</span>
                <span className="text-xs font-black text-amber-400 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400" /> {partner.rating}
                </span>
              </div>
              <h4 className="text-xs font-black text-white line-clamp-1">{partner.name}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                <span className="truncate">{partner.address}</span>
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Menu & Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-black text-white">{selectedPartner.name} - मेन्यू</h3>
              <p className="text-xs text-slate-400">{selectedPartner.address} • {selectedPartner.distanceKm} किमी</p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OPEN NOW
            </span>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#07132B] border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${item.isVeg ? 'border-emerald-500' : 'border-red-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        </span>
                        <h4 className="text-xs font-black text-white">{item.hindiName}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.name}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
                      <div className="text-xs font-mono font-black text-[#D4AF37]">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Buttons */}
                  <div className="shrink-0">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAddItem(item.id)}
                        className="py-1.5 px-3 rounded-lg bg-[#D4AF37] hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1 shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>जोड़ें</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-black text-xs text-white min-w-[16px] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddItem(item.id)}
                          className="w-6 h-6 rounded bg-[#D4AF37] text-slate-950 hover:brightness-110 flex items-center justify-center font-bold text-xs"
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
        </div>

        {/* Cart & 80/20 Sovereign Checkout (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0A1931] border-2 border-[#D4AF37]/50 shadow-xl space-y-4 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-black text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>आपकी थाली / आर्डर बास्केट</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#D4AF37]">{cartItemsList.length} आइटम्स</span>
            </div>

            {cartItemsList.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <p className="text-xs">बास्केट खाली है। मेन्यू से कोई भी आइटम जोड़ें।</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* List of items */}
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {cartItemsList.map((c) => (
                    <div key={c.item?.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 truncate max-w-[140px]">
                        {c.item?.hindiName} x {c.qty}
                      </span>
                      <span className="font-mono font-bold text-white">₹{c.total}</span>
                    </div>
                  ))}
                </div>

                {/* Bill breakdown */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>आइटम योग:</span>
                    <span className="font-mono text-white">₹{subTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>ब्रिज डिलीवरी शुल्क:</span>
                    <span className="font-mono text-white">₹{deliveryFee}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-[#D4AF37]">
                    <span>कुल बिल (Customer Pay):</span>
                    <span className="font-mono">₹{grandTotal}</span>
                  </div>
                </div>

                {/* 80/20 Sovereign Bridge Highlight */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-[#D4AF37]/50 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-emerald-400">रेस्टोरेंट को सीधा भुगतान (80%):</span>
                    <span className="font-mono font-black text-emerald-400">₹{partnerCut80}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>JITOMNI ब्रिज प्लेटफॉर्म शुल्क (20%):</span>
                    <span className="font-mono text-[#D4AF37]">₹{platformCut20}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    Zero restaurant extortion • Fair 80/20 sovereign model
                  </p>
                </div>

                {/* Checkout form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">डिलीवरी पता *</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full py-2 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-[#D4AF37] hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>डिमांड टॉवर में आर्डर प्रेषित करें (₹{grandTotal})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {orderSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-center space-y-1 text-xs text-emerald-300">
                    <div className="font-black">✓ आर्डर सक्रिय: #{orderSuccess.orderId}</div>
                    <div className="text-[11px] text-slate-300">डिमांड टॉवर में लाइव ट्रैक हो रहा है।</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
