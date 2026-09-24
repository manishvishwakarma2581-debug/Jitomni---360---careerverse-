import React, { useState } from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Building2, 
  Settings, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Radio,
  Layers,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { CustomerAppPanel } from './CustomerAppPanel';
import { RoyalSathiWorkerPanel } from './RoyalSathiWorkerPanel';
import { ProviderTieUpPortal } from './ProviderTieUpPortal';
import { AdminSuperPanel } from './AdminSuperPanel';
import { TrojanOrder } from './trojanTypes';

type TrojanActivePanel = 'customer' | 'worker' | 'provider' | 'admin';

interface TrojanMasterHubProps {
  initialPanel?: TrojanActivePanel;
}

export const TrojanMasterHub: React.FC<TrojanMasterHubProps> = ({
  initialPanel = 'customer',
}) => {
  const [activePanel, setActivePanel] = useState<TrojanActivePanel>(initialPanel);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<TrojanOrder | null>(null);

  const handleOrderCreated = (order: TrojanOrder) => {
    setLastCreatedOrder(order);
  };

  return (
    <div className="w-full space-y-6">
      {/* 4-PANEL MASTER NAVIGATION BAR (TROJAN BRIDGE SUITE) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#07132B] via-[#0A1931] to-[#040C1A] border-2 border-[#FFD700] p-2.5 sm:p-3 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand Header */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FFD700] text-slate-950 font-black shadow-md">
                <Zap className="w-4 h-4 fill-slate-950" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-black uppercase text-[#FFD700] tracking-wider block">
                  TROJAN BRIDGE SUPER APP
                </span>
                <h1 className="text-sm sm:text-base font-black text-white leading-none">
                  JITOMNI 360° ऑन-डिमांड साथी व टास्क
                </h1>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                80/20 & 90/10 LIVE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/40">
                🇮🇳 ALL-INDIA FORWARDING
              </span>
            </div>
          </div>

          {/* The 4 Panels Switcher Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full md:w-auto">
            {/* Panel 1: Customer App */}
            <button
              type="button"
              onClick={() => setActivePanel('customer')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePanel === 'customer'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 shadow-lg font-black scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1. ग्राहक ऐप (Mobile)</span>
            </button>

            {/* Panel 2: Royal Sathi Worker */}
            <button
              type="button"
              onClick={() => setActivePanel('worker')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePanel === 'worker'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 shadow-lg font-black scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>2. रॉयल साथी (90s)</span>
            </button>

            {/* Panel 3: Service Provider Tie-up Portal */}
            <button
              type="button"
              onClick={() => setActivePanel('provider')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePanel === 'provider'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 shadow-lg font-black scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. टाइ-अप पोर्टल (Bridge)</span>
            </button>

            {/* Panel 4: Admin Super Panel */}
            <button
              type="button"
              onClick={() => setActivePanel('admin')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePanel === 'admin'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-400 text-slate-950 shadow-lg font-black scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>4. सुपर एडमिन कंसोल</span>
            </button>
          </div>
        </div>

        {/* Live Status Hint Bar */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-slate-200">सक्रिय दृश्य:</strong>
            {activePanel === 'customer' && ' पैनल 1: ग्राहक इंटरफ़ेस (सर्च बार, 3 मुख्य सेवाएं, तत्काल बुकिंग)'}
            {activePanel === 'worker' && ' पैनल 2: रॉयल साथी ऐप (JS-RWA-XXXX लॉगिन, 90s टाइमर, 10% वॉलेट, ₹299 सब्सक्रिप्शन)'}
            {activePanel === 'provider' && ' पैनल 3: सर्विस प्रोवाइडर टाइ-अप (रेस्टोरेंट/किराना/टैक्सी, 80/20 ब्रिज सेटलमेंट)'}
            {activePanel === 'admin' && ' पैनल 4: सुपर एडमिन कंसोल (इंटेलिजेंट 2-स्टेज राउटिंग, कमीशन कंट्रोल, ऐप रिप्लेसमेंट)'}
          </span>

          <span className="hidden sm:inline text-[#FFD700] font-mono font-bold">
            "6 App Delete Karo, 1 App Rakho"
          </span>
        </div>
      </div>

      {/* RENDER THE SELECTED PANEL */}
      <div className="transition-all duration-200">
        {activePanel === 'customer' && (
          <CustomerAppPanel
            onOrderCreated={handleOrderCreated}
            onOpenWorkerApp={() => setActivePanel('worker')}
            onOpenProviderPortal={() => setActivePanel('provider')}
            onOpenAdminPanel={() => setActivePanel('admin')}
          />
        )}

        {activePanel === 'worker' && (
          <RoyalSathiWorkerPanel
            onSwitchToCustomer={() => setActivePanel('customer')}
            onSwitchToProvider={() => setActivePanel('provider')}
            onSwitchToAdmin={() => setActivePanel('admin')}
          />
        )}

        {activePanel === 'provider' && (
          <ProviderTieUpPortal
            onSwitchToCustomer={() => setActivePanel('customer')}
            onSwitchToWorker={() => setActivePanel('worker')}
            onSwitchToAdmin={() => setActivePanel('admin')}
          />
        )}

        {activePanel === 'admin' && (
          <AdminSuperPanel
            onSwitchToCustomer={() => setActivePanel('customer')}
            onSwitchToWorker={() => setActivePanel('worker')}
            onSwitchToProvider={() => setActivePanel('provider')}
          />
        )}
      </div>
    </div>
  );
};
