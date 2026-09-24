import React, { useState } from 'react';
import { 
  Building2, 
  Store, 
  Car, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  BellRing, 
  QrCode, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Share2, 
  Sparkles, 
  Printer, 
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DemandPartner, BridgeOrder } from './royalAutoTypes';
import { RoyalAutoStorage } from './royalAutoStorage';
import { playIncomingRideSound, playAcceptSound } from './audioAlerts';

interface DemandPartnerPortalViewProps {
  onOrderUpdated?: (order: BridgeOrder) => void;
}

export const DemandPartnerPortalView: React.FC<DemandPartnerPortalViewProps> = ({
  onOrderUpdated,
}) => {
  const [partners, setPartners] = useState<DemandPartner[]>(() => RoyalAutoStorage.getDemandPartners());
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partners[0]?.id || 'PRT-RWA-REST-01');
  const [orders, setOrders] = useState<BridgeOrder[]>(() => RoyalAutoStorage.getOrders());
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const currentPartner = partners.find((p) => p.id === selectedPartnerId) || partners[0];

  // Filter orders related to this partner or open for partner in Priority 2
  const incomingOverflowOrders = orders.filter((o) => {
    return (
      (o.status === 'assigned_partner' && o.assignedPartnerId === currentPartner.id) ||
      (o.status === 'assigned_partner' && !o.assignedPartnerId && o.priorityLevel === 2)
    );
  });

  const activePartnerOrders = orders.filter((o) => {
    return o.assignedPartnerId === currentPartner.id && (o.status === 'accepted' || o.status === 'in_progress');
  });

  const completedPartnerOrders = orders.filter((o) => {
    return o.assignedPartnerId === currentPartner.id && o.status === 'delivered';
  });

  // Action: Accept Overflow Order (80% Partner Cut)
  const handleAcceptOverflowOrder = (orderId: string) => {
    playAcceptSound();
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return;

    const partnerSplit = RoyalAutoStorage.calculateCommissionSplit(
      order.commissionSplit.totalAmount,
      true,
      currentPartner.name,
      currentPartner.partnerRoyalId
    );

    const updated: BridgeOrder = {
      ...order,
      status: 'accepted',
      priorityLevel: 2,
      assignedPartnerId: currentPartner.id,
      assignedPartnerName: currentPartner.name,
      assignedPartnerType: currentPartner.type,
      timers: {
        ...order.timers,
        currentCountdown: 0,
        activeTimerStage: 'completed',
      },
      commissionSplit: partnerSplit,
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    RoyalAutoStorage.updateOrder(orderId, updated);
    setOrders(RoyalAutoStorage.getOrders());

    // Update partner stats
    RoyalAutoStorage.updateDemandPartner(currentPartner.id, {
      totalOrdersCompleted: (currentPartner.totalOrdersCompleted || 0) + 1,
      totalEarned80: (currentPartner.totalEarned80 || 0) + partnerSplit.workerOrPartnerCut,
    });
    setPartners(RoyalAutoStorage.getDemandPartners());

    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Reject / Pass to Next Partner
  const handlePassToNextPartner = (orderId: string) => {
    const nextPartner = partners.find((p) => p.id !== currentPartner.id && p.type === currentPartner.type) || partners[1] || partners[0];
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return;

    const partnerSplit = RoyalAutoStorage.calculateCommissionSplit(
      order.commissionSplit.totalAmount,
      true,
      nextPartner.name,
      nextPartner.partnerRoyalId
    );

    const updated: BridgeOrder = {
      ...order,
      assignedPartnerId: nextPartner.id,
      assignedPartnerName: nextPartner.name,
      assignedPartnerType: nextPartner.type,
      timers: {
        ...order.timers,
        currentCountdown: 60,
        activeTimerStage: 'partner',
      },
      commissionSplit: partnerSplit,
      notes: (order.notes ? `${order.notes} • ` : '') + `[PASSED]: Passed by ${currentPartner.name} to ${nextPartner.name}`,
    };

    RoyalAutoStorage.updateOrder(orderId, updated);
    setOrders(RoyalAutoStorage.getOrders());
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Complete Order
  const handleCompleteOrder = (orderId: string) => {
    const updated: BridgeOrder = {
      ...orders.find((o) => o.orderId === orderId)!,
      status: 'delivered',
      deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    RoyalAutoStorage.updateOrder(orderId, updated);
    setOrders(RoyalAutoStorage.getOrders());
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  return (
    <div className="space-y-8">
      {/* Top Bar: Partner Selector & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0A1931] to-[#07132B] border-2 border-[#D4AF37]/50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#D4AF37] flex items-center justify-center text-2xl text-[#D4AF37]">
            {currentPartner.type === 'restaurant' ? <Store className="w-6 h-6" /> : <Car className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">{currentPartner.name}</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                80/20 VERIFIED PARTNER
              </span>
            </div>
            <p className="text-xs text-[#D4AF37] font-mono">
              रॉयल पार्टनर कोड: {currentPartner.partnerRoyalId} • {currentPartner.cityName} ({currentPartner.cityCode})
            </p>
          </div>
        </div>

        {/* Switch Partner Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold">पार्टनर चुनें:</label>
          <select
            value={selectedPartnerId}
            onChange={(e) => setSelectedPartnerId(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
          >
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.partnerRoyalId}] {p.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="py-2 px-3 rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
          >
            <QrCode className="w-4 h-4" />
            <span>पार्टनर QR</span>
          </button>
        </div>
      </div>

      {/* Overview Stats: 80% Direct Earnings Ledger */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-bold">कुल 80% कमाई</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-mono font-black text-emerald-400">
            ₹{currentPartner.totalEarned80?.toLocaleString() || 0}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">सीधा बैंक/UPI में जमा</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-bold">कुल आर्डर संपन्न</span>
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-xl font-mono font-black text-white">
            {currentPartner.totalOrdersCompleted || 0}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">100% संतुष्ट ग्राहक</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-bold">पार्टनर रेटिंग</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-xl font-mono font-black text-amber-400">
            {currentPartner.rating} / 5.0
          </div>
          <p className="text-[10px] text-slate-400 mt-1">सत्यापित ग्राहक समीक्षा</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-bold">ब्रिज मॉडल</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-mono font-black text-[#D4AF37]">
            80 / 20
          </div>
          <p className="text-[10px] text-slate-400 mt-1">आप 80%, JITOMNI 20%</p>
        </div>
      </div>

      {/* Live Incoming Overflow Demand Section (Priority 2 Cascaded Orders) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-sm font-black text-white">
              लाइव इनकमिंग ओवरफ्लो आर्डर (Incoming Demand from Tower - Priority 2)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">
            {incomingOverflowOrders.length} आर्डर प्रतीक्षा में
          </span>
        </div>

        {incomingOverflowOrders.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center space-y-2">
            <BellRing className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-bold">
              फिलहाल कोई ओवरफ्लो आर्डर लंबित नहीं है। जब 90 सेकंड में कोई आंतरिक साथी व्यस्त होगा, आर्डर यहाँ स्वतः 60 सेकंड टाइमर के साथ आएगा।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomingOverflowOrders.map((order) => {
              const partnerEarnings80 = Math.round(order.commissionSplit.totalAmount * 0.80);
              return (
                <div
                  key={order.orderId}
                  className="p-5 rounded-2xl bg-[#07132B] border-2 border-amber-500/60 shadow-xl space-y-4 relative overflow-hidden"
                >
                  {/* Top timer bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                        PRIORITY 2: OVERFLOW ORDER
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-300">#{order.orderId}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-black text-amber-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-amber-500/40">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>{order.timers.currentCountdown > 0 ? `${order.timers.currentCountdown}s में स्वीकारें` : '60s टाइमआउट'}</span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-white">{order.serviceTitle}</h4>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>पिकअप:</strong> {order.pickup.address}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span><strong>ड्रॉप / गंतव्य:</strong> {order.drop.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* 80% Earnings Guarantee Badge */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">आपकी सीधी शुद्ध कमाई (80%)</span>
                      <span className="text-base font-mono font-black text-emerald-400">₹{partnerEarnings80}</span>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <div>कुल ग्राहक बिल: <strong className="text-white">₹{order.commissionSplit.totalAmount}</strong></div>
                      <div>प्लेटफॉर्म ब्रिज शुल्क: <strong className="text-[#D4AF37]">20%</strong></div>
                    </div>
                  </div>

                  {/* Accept / Pass Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handlePassToNextPartner(order.orderId)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>पास करें (Pass)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAcceptOverflowOrder(order.orderId)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>स्वीकार करें (Accept ₹{partnerEarnings80})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active & Processing Orders */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-white">प्रक्रियाधीन आर्डर (In Progress Orders)</h3>
        {activePartnerOrders.length === 0 ? (
          <p className="text-xs text-slate-400">वर्तमान में कोई आर्डर प्रगति पर नहीं है।</p>
        ) : (
          <div className="space-y-3">
            {activePartnerOrders.map((order) => (
              <div
                key={order.orderId}
                className="p-4 rounded-xl bg-[#07132B] border border-slate-800 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#D4AF37]">#{order.orderId}</span>
                    <span className="text-xs font-bold text-white">{order.serviceTitle}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    ग्राहक: {order.customerName} ({order.customerPhone}) • OTP: <strong className="text-amber-400">{order.deliveryOtp}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right font-mono">
                    <span className="text-xs text-emerald-400 font-bold block">₹{order.commissionSplit.workerOrPartnerCut} (80%)</span>
                    <span className="text-[10px] text-slate-400">स्वीकारा गया</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompleteOrder(order.orderId)}
                    className="py-2 px-3 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs shadow hover:brightness-110"
                  >
                    पूर्ण मार्क करें
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Digital Partner Identity Card Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#07132B] border-2 border-[#D4AF37] p-6 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-[#D4AF37] tracking-widest uppercase">
                DIGITAL PARTNER ID CARD
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-inner mx-auto inline-block">
              <img
                src={currentPartner.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JITOMNI-${currentPartner.partnerRoyalId}`}
                alt="Partner QR"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-black text-white">{currentPartner.name}</h4>
              <p className="text-xs font-mono font-bold text-[#D4AF37]">{currentPartner.partnerRoyalId}</p>
              <p className="text-xs text-slate-400">{currentPartner.address}</p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-4 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>काउंटर पर लगाने हेतु प्रिंट करें</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
