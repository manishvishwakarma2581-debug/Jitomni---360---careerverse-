import React, { useState } from 'react';
import { FranchiseCustomerInfo } from './FranchiseCustomerInfo';
import { FranchiseOwnerPanel } from './FranchiseOwnerPanel';
import { SuperAdminFranchisePanel } from './SuperAdminFranchisePanel';
import { Language } from '../../types';
import { Building2, ShieldCheck, Crown, Eye, Users } from 'lucide-react';

interface FranchiseModuleProps {
  lang?: Language;
  initialMode?: 'customer' | 'owner' | 'admin';
}

export const FranchiseModule: React.FC<FranchiseModuleProps> = ({
  lang = 'hi',
  initialMode = 'customer',
}) => {
  const [activeMode, setActiveMode] = useState<'customer' | 'owner' | 'admin'>(initialMode);

  return (
    <div className="min-h-screen bg-[#040C1A] text-slate-100 pb-20">
      {/* 3-Role View Mode Switcher Header */}
      <div className="bg-[#06142B] border-b-2 border-[#D4AF37]/50 sticky top-0 z-40 px-4 py-3 shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-slate-950 flex items-center justify-center font-black text-sm shadow">
              🏛️
            </div>
            <div>
              <span className="text-xs font-black text-white tracking-wide">
                PAN-INDIA FRANCHISE SYSTEM
              </span>
              <span className="text-[10px] text-amber-300 block font-mono">
                Rewa Head Office (Director Manish Vishwakarma) • 70/30 Model
              </span>
            </div>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-black/60 border border-slate-700/80">
            <button
              onClick={() => setActiveMode('customer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeMode === 'customer'
                  ? 'bg-[#D4AF37] text-slate-950 shadow-md shadow-[#D4AF37]/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>पार्ट A: फ्रैंचाइज़ी लो (इन्फो & आवेदन)</span>
            </button>

            <button
              onClick={() => setActiveMode('owner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeMode === 'owner'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>पार्ट B: सिटी ओनर पैनल</span>
            </button>

            <button
              onClick={() => setActiveMode('admin')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeMode === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>पार्ट C: रीवा हेड ऑफिस (सुपर एडमिन)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeMode === 'customer' && (
          <FranchiseCustomerInfo
            lang={lang}
            onOpenOwnerLogin={() => setActiveMode('owner')}
          />
        )}

        {activeMode === 'owner' && (
          <FranchiseOwnerPanel
            lang={lang}
            onLogout={() => setActiveMode('customer')}
            onOpenCustomerView={() => setActiveMode('customer')}
          />
        )}

        {activeMode === 'admin' && (
          <SuperAdminFranchisePanel
            lang={lang}
            onOpenCustomerView={() => setActiveMode('customer')}
            onOpenOwnerPanel={() => setActiveMode('owner')}
          />
        )}
      </div>
    </div>
  );
};
