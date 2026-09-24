import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  DollarSign, 
  Phone, 
  Zap, 
  RefreshCw, 
  ChevronRight, 
  ExternalLink,
  Store,
  Car,
  BellRing,
  HelpCircle,
  Users
} from 'lucide-react';
import { BridgeOrder, DemandPartner, AutoDriver } from './royalAutoTypes';
import { RoyalAutoStorage } from './royalAutoStorage';
import { playAcceptSound, playIncomingRideSound } from './audioAlerts';

interface BridgeDemandTowerEngineProps {
  activeOrder?: BridgeOrder | null;
  initialOrderId?: string;
  onOrderUpdated?: (order: BridgeOrder) => void;
  onSelectPartner?: (partner: DemandPartner) => void;
  onSelectDriver?: (driver: AutoDriver) => void;
  onOpenAdminPanel?: () => void;
  onEscalateToAdmin?: () => void;
}

export const BridgeDemandTowerEngine: React.FC<BridgeDemandTowerEngineProps> = ({
  activeOrder,
  initialOrderId,
  onOrderUpdated,
  onSelectPartner,
  onSelectDriver,
  onOpenAdminPanel,
  onEscalateToAdmin,
}) => {
  const [order, setOrder] = useState<BridgeOrder | null>(() => {
    if (activeOrder) return activeOrder;
    const orders = RoyalAutoStorage.getOrders();
    if (initialOrderId) {
      const match = orders.find((o) => o.orderId === initialOrderId);
      if (match) return match;
    }
    return orders[0] || null;
  });
  const [drivers] = useState<AutoDriver[]>(() => RoyalAutoStorage.getDrivers());
  const [partners, setPartners] = useState<DemandPartner[]>(() => RoyalAutoStorage.getDemandPartners());

  // Countdown timer simulation for active order
  const [countdown, setCountdown] = useState<number>(() => {
    return activeOrder?.timers.currentCountdown ?? 90;
  });

  // Sync state if prop changes
  useEffect(() => {
    if (activeOrder) {
      setOrder(activeOrder);
      setCountdown(activeOrder.timers.currentCountdown);
    }
  }, [activeOrder]);

  // Real-time ticking effect
  useEffect(() => {
    if (!order) return;
    if (order.status === 'delivered' || order.status === 'cancelled') return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Timer reached 0: handle cascade
          if (order.priorityLevel === 1 && order.status === 'pending') {
            // Auto-forward Priority 1 (90s) -> Priority 2 (60s)
            handleSimulatePartnerCascade();
          } else if (order.priorityLevel === 2 && order.status === 'assigned_partner') {
            // Priority 2 timeout -> Escalate to Admin
            handleSimulateAdminEscalate();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [order?.orderId, order?.priorityLevel, order?.status]);

  if (!order) {
    return (
      <div className="p-6 rounded-2xl bg-[#07132B] border border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-amber-400">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="text-sm font-bold text-white">डिमांड टॉवर रडार सक्रिय (Demand Tower Idle)</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          वर्तमान में कोई लाइव आर्डर प्रक्रियाधीन नहीं है। नीचे दिए गए मॉड्यूल से नया ऑटो, 9 रॉयल सेवाएं या खाना आर्डर करें।
        </p>
      </div>
    );
  }

  // Suitable demand partners nearby
  const matchingPartners = partners.filter((p) => {
    if (order.type === 'food') return p.type === 'restaurant';
    if (order.type === 'auto') return p.type === 'auto_provider';
    return true;
  });

  // Action: Simulate Royal Worker Accepts (Priority 1 - 90/10 Model)
  const handleSimulateRoyalAccept = () => {
    playAcceptSound();
    const liveDrivers = drivers.filter((d) => d.status === 'active' && d.isPoliceVerified);
    const assignedWorker = liveDrivers[0] || drivers[0];

    const royalSplit = RoyalAutoStorage.calculateCommissionSplit(order.commissionSplit.totalAmount, false);
    const updated: BridgeOrder = {
      ...order,
      status: 'accepted',
      priorityLevel: 1,
      assignedRoyalId: assignedWorker.royalId,
      assignedRoyalName: `${assignedWorker.name} (${assignedWorker.royalId})`,
      timers: {
        ...order.timers,
        currentCountdown: 0,
        activeTimerStage: 'completed',
      },
      commissionSplit: royalSplit,
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    RoyalAutoStorage.updateOrder(order.orderId, updated);
    setOrder(updated);
    setCountdown(0);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Simulate 90s Timeout -> Auto-Forward to Demand Partner (Priority 2 - 80/20 Model)
  const handleSimulatePartnerCascade = () => {
    playIncomingRideSound();
    const targetPartner = matchingPartners[0] || partners[0];
    const partnerSplit = RoyalAutoStorage.calculateCommissionSplit(
      order.commissionSplit.totalAmount,
      true,
      targetPartner.name,
      targetPartner.partnerRoyalId
    );

    const updated: BridgeOrder = {
      ...order,
      status: 'assigned_partner',
      priorityLevel: 2,
      assignedPartnerId: targetPartner.id,
      assignedPartnerName: targetPartner.name,
      assignedPartnerType: targetPartner.type,
      timers: {
        ...order.timers,
        currentCountdown: 60,
        activeTimerStage: 'partner',
      },
      commissionSplit: partnerSplit,
    };

    RoyalAutoStorage.updateOrder(order.orderId, updated);
    setOrder(updated);
    setCountdown(60);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Simulate Demand Partner Accepts (80/20 Model)
  const handleSimulatePartnerAccept = () => {
    playAcceptSound();
    const updated: BridgeOrder = {
      ...order,
      status: 'accepted',
      priorityLevel: 2,
      timers: {
        ...order.timers,
        currentCountdown: 0,
        activeTimerStage: 'completed',
      },
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    RoyalAutoStorage.updateOrder(order.orderId, updated);
    setOrder(updated);
    setCountdown(0);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Simulate Cascade to Next Nearest Partner
  const handleCascadeNextPartner = () => {
    const nextPartner = matchingPartners[1] || matchingPartners[0] || partners[0];
    const partnerSplit = RoyalAutoStorage.calculateCommissionSplit(
      order.commissionSplit.totalAmount,
      true,
      nextPartner.name,
      nextPartner.partnerRoyalId
    );

    const updated: BridgeOrder = {
      ...order,
      status: 'assigned_partner',
      priorityLevel: 2,
      assignedPartnerId: nextPartner.id,
      assignedPartnerName: nextPartner.name,
      assignedPartnerType: nextPartner.type,
      timers: {
        ...order.timers,
        currentCountdown: 60,
        activeTimerStage: 'partner',
      },
      commissionSplit: partnerSplit,
      notes: (order.notes ? `${order.notes} • ` : '') + `[CASCADED]: Forwarded to next partner ${nextPartner.name}`,
    };

    RoyalAutoStorage.updateOrder(order.orderId, updated);
    setOrder(updated);
    setCountdown(60);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  // Action: Simulate Escalate to Super Admin Desk (Priority 3)
  const handleSimulateAdminEscalate = () => {
    const updated = RoyalAutoStorage.escalateOrderToAdmin(
      order.orderId,
      'Internal royal workers & nearest demand partners timed out'
    );
    if (updated) {
      setOrder(updated);
      setCountdown(0);
      if (onOrderUpdated) onOrderUpdated(updated);
      if (onEscalateToAdmin) onEscalateToAdmin();
      else if (onOpenAdminPanel) onOpenAdminPanel();
    }
  };

  // Action: Complete / Mark Delivered
  const handleMarkDelivered = () => {
    const updated: BridgeOrder = {
      ...order,
      status: 'delivered',
      deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    RoyalAutoStorage.updateOrder(order.orderId, updated);
    setOrder(updated);
    if (onOrderUpdated) onOrderUpdated(updated);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0A1931] to-[#07132B] border-2 border-[#D4AF37]/50 p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Header with Live Tower Radar Pulse */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white">JITOMNI 360° डिमांड टॉवर (Demand Tower)</h3>
              <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono font-bold">
                80/20 SOVEREIGN BRIDGE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              आर्डर #{order.orderId} • {order.serviceTitle}
            </p>
          </div>
        </div>

        {/* Live Timer Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              {order.priorityLevel === 1 ? 'Priority 1 (Royal 90s)' : order.priorityLevel === 2 ? 'Priority 2 (Partner 60s)' : 'Admin Escalated'}
            </div>
            <div className="text-sm font-mono font-black text-amber-400">
              {countdown > 0 ? `${countdown}s शेष` : order.status === 'delivered' ? 'संपन्न' : 'समय समाप्त'}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Priority Cascading Pipeline Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* PRIORITY 1: OWN ROYAL WORKER */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          order.priorityLevel === 1 
            ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30'
            : order.priorityLevel > 1
            ? 'bg-slate-900/50 border-slate-800 opacity-70'
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/40">
              Priority 1 (0-90s)
            </span>
            <span className="text-xs font-mono font-black text-emerald-400">90% Worker Cut</span>
          </div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>🛺</span>
            <span>हमारे आंतरिक रॉयल साथी (Own Royal Workers)</span>
          </h4>
          <p className="text-[11px] text-slate-300 mt-1">
            5 किमी दायरे में हमारे यूनिक रॉयल आईडी धारक साथियों को पुश नोटिफिकेशन। 90s का टाइमर।
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">स्टेटस:</span>
            <span className="font-bold text-blue-400">
              {order.priorityLevel === 1 && order.status === 'pending' && '⏳ खोज जारी...'}
              {order.priorityLevel === 1 && order.status === 'accepted' && '✅ रॉयल साथी ने स्वीकारा'}
              {order.priorityLevel > 1 && '⏩ 90s समाप्त • फॉलबैक'}
            </span>
          </div>
        </div>

        {/* PRIORITY 2: NEAREST DEMAND PARTNERS */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          order.priorityLevel === 2 
            ? 'bg-amber-950/40 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]/30'
            : order.priorityLevel > 2
            ? 'bg-slate-900/50 border-slate-800 opacity-70'
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              Priority 2 (60s Bridge)
            </span>
            <span className="text-xs font-mono font-black text-amber-300">80% Partner Cut</span>
          </div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>🏢</span>
            <span>निकटतम टाई-अप पार्टनर (Demand Partners)</span>
          </h4>
          <p className="text-[11px] text-slate-300 mt-1">
            रेस्टोरेंट / ऑटो यूनियन / लोकल एजेंसी को आर्डर दिया। हम 20% ब्रिज शुल्क रखते हैं, 80% पार्टनर का।
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">पार्टनर:</span>
            <span className="font-bold text-amber-400 truncate max-w-[130px]">
              {order.assignedPartnerName || (matchingPartners[0]?.name ?? 'श्री कृष्णा भोजनालय')}
            </span>
          </div>
        </div>

        {/* PRIORITY 3: SUPER ADMIN CONTROL ROOM */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          order.priorityLevel === 3 
            ? 'bg-red-950/40 border-red-500 shadow-lg shadow-red-500/20 ring-2 ring-red-500/30'
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-400/40">
              Priority 3 (Escalated)
            </span>
            <span className="text-xs font-mono font-black text-red-400">Manual Override</span>
          </div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>🏛️</span>
            <span>सुपर एडमिन कंट्रोल डेस्क (Manual Dispatch)</span>
          </h4>
          <p className="text-[11px] text-slate-300 mt-1">
            यदि दोनों स्तर पर आर्डर नहीं स्वीकारा गया, तो एडमिन पैनल पर इमरजेंसी रेड अलर्ट के साथ मैन्युअल असाइन।
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">एस्केलेशन:</span>
            <span className="font-bold text-red-400">
              {order.priorityLevel === 3 ? '🚨 सक्रिय नियंत्रण कक्ष' : 'स्टैंडबाय'}
            </span>
          </div>
        </div>
      </div>

      {/* Verified Demand Partner Notice (Shown to customer if fulfilled by partner) */}
      {order.priorityLevel === 2 && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37]/60 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37] text-slate-950 font-black text-sm">
            <Store className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">सत्यापित टाई-अप पार्टनर द्वारा पूर्ति</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold">
                80/20 SOVEREIGN BRIDGE
              </span>
            </div>
            <p className="text-xs text-[#D4AF37] font-bold">
              Fulfilled by our Verified Demand Partner: {order.assignedPartnerName || 'श्री कृष्णा शुद्ध शाकाहारी भोजनालय'} - ({order.assignedPartnerId || 'JS-RWA-P001'})
            </p>
            <p className="text-[11px] text-slate-300">
              हम इस पार्टनर को आर्डर दे रहे हैं। ग्राहक को 0% सरचार्ज और समय पर डिलीवरी की पूरी गारंटी है।
            </p>
          </div>
        </div>
      )}

      {/* Financial Split Breakdown Table (100% Transparency) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-300 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            <span>पारदर्शी कमीशन एवं आय विभाजन (Commission Split Ledger)</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
            order.commissionSplit.model === '90_10' 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' 
              : 'bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/40'
          }`}>
            MODEL: {order.commissionSplit.model === '90_10' ? '90% WORKER / 10% PLATFORM' : '80% PARTNER / 20% BRIDGE FEE'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">कुल ग्राहक भुगतान</span>
            <span className="text-base font-mono font-black text-white">₹{order.commissionSplit.totalAmount}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/40">
            <span className="text-[10px] text-emerald-400 block">
              {order.commissionSplit.model === '90_10' ? 'रॉयल साथी को (90%)' : 'टाई-अप पार्टनर को (80%)'}
            </span>
            <span className="text-base font-mono font-black text-emerald-400">₹{order.commissionSplit.workerOrPartnerCut}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/40">
            <span className="text-[10px] text-[#D4AF37] block">
              {order.commissionSplit.model === '90_10' ? 'प्लेटफॉर्म शुल्क (10%)' : 'ब्रिज प्लेटफॉर्म शुल्क (20%)'}
            </span>
            <span className="text-base font-mono font-black text-[#D4AF37]">₹{order.commissionSplit.platformCut}</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          {order.commissionSplit.description}
        </p>
      </div>

      {/* Interactive Simulation & Dispatch Controls */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>डिमांड टॉवर टेस्ट सिम्युलेटर (Live Bridge Fallback Simulator)</span>
          </span>
          <span className="text-[10px] text-slate-400">त्वरित टेस्टिंग बटन</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={handleSimulateRoyalAccept}
            className="py-2 px-2.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/50 text-[11px] font-bold transition-all text-left"
          >
            ⚡ 1. रॉयल साथी ने स्वीकारा (90/10)
          </button>

          <button
            type="button"
            onClick={handleSimulatePartnerCascade}
            className="py-2 px-2.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white border border-amber-500/50 text-[11px] font-bold transition-all text-left"
          >
            ⏩ 2. 90s टाइमआउट ➔ पार्टनर को (80/20)
          </button>

          <button
            type="button"
            onClick={handleSimulatePartnerAccept}
            className="py-2 px-2.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/50 text-[11px] font-bold transition-all text-left"
          >
            🤝 3. पार्टनर ने स्वीकारा (80/20)
          </button>

          <button
            type="button"
            onClick={handleSimulateAdminEscalate}
            className="py-2 px-2.5 rounded-lg bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/50 text-[11px] font-bold transition-all text-left"
          >
            🚨 4. एडमिन डेस्क एस्केलेट (Priority 3)
          </button>
        </div>

        {order.status !== 'delivered' && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleMarkDelivered}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>आर्डर पूर्ण मार्क करें (Delivered • OTP: {order.deliveryOtp})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
