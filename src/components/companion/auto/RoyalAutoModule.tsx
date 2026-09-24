import React, { useState } from 'react';
import { 
  Car, 
  Users, 
  ShieldCheck, 
  Award, 
  QrCode, 
  AlertTriangle, 
  Sparkles, 
  PhoneCall, 
  Compass, 
  PlusCircle, 
  SlidersHorizontal,
  Radio,
  Store,
  Crown
} from 'lucide-react';
import { CustomerAutoBookingView } from './CustomerAutoBookingView';
import { DriverAutoAppView } from './DriverAutoAppView';
import { RoyalAutoAdminPanel } from './RoyalAutoAdminPanel';
import { DriverOnboardingModal } from './DriverOnboardingModal';
import { BridgeDemandTowerEngine } from './BridgeDemandTowerEngine';
import { RoyalNineServicesCatalog } from './RoyalNineServicesCatalog';
import { FoodBridgeRestaurantHub } from './FoodBridgeRestaurantHub';
import { DemandPartnerPortalView } from './DemandPartnerPortalView';
import { AutoDriver, BridgeOrder } from './royalAutoTypes';
import { Language } from '../../../types';

interface RoyalAutoModuleProps {
  lang?: Language;
}

export const RoyalAutoModule: React.FC<RoyalAutoModuleProps> = () => {
  // Top Role & Sub-Module Switcher:
  // 'customer' | 'services_9' | 'food_bridge' | 'demand_tower' | 'partner' | 'driver' | 'admin'
  const [activeRole, setActiveRole] = useState<
    'customer' | 'services_9' | 'food_bridge' | 'demand_tower' | 'partner' | 'driver' | 'admin'
  >('customer');

  // Selected driver for driver app view
  const [activeDriverId, setActiveDriverId] = useState<string>('JS-RWA-0001');

  // Active highlighted order for Demand Tower
  const [focusedOrderId, setFocusedOrderId] = useState<string | undefined>(undefined);

  // Onboarding Modal state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Handle new driver registered
  const handleDriverRegistered = (newDriver: AutoDriver) => {
    setActiveDriverId(newDriver.royalId);
  };

  // Handle order created in 9 Royal Services or Food Bridge -> jump to Demand Tower
  const handleOrderCreated = (order: BridgeOrder) => {
    setFocusedOrderId(order.orderId);
    setActiveRole('demand_tower');
  };

  return (
    <div className="space-y-6">
      {/* Sub-Header Role Switcher Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#07132B] border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            type="button"
            onClick={() => setActiveRole('customer')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'customer'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>🚗</span>
            <span>बुक ऑटो (Ride)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('services_9')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'services_9'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>9 रॉयल सेवाएं</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('food_bridge')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'food_bridge'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-red-400" />
            <span>फूड ब्रिज (80/20)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('demand_tower')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'demand_tower'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>डिमांड टॉवर (Cascade)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('partner')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'partner'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>🏢</span>
            <span>पार्टनर पोर्टल (80%)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('driver')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'driver'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>🛺</span>
            <span>रॉयल ड्राइवर ऐप</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeRole === 'admin'
                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>🏛️</span>
            <span>सुपर एडमिन (Head Office)</span>
          </button>
        </div>

        {/* Action: Driver Onboarding Quick Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ नया ऑटो जोड़ें (Join As Driver)</span>
          </button>
        </div>
      </div>

      {/* ACTIVE ROLE / SUB-MODULE VIEW */}
      {activeRole === 'customer' && (
        <CustomerAutoBookingView
          onOpenDriverApp={(driverId) => {
            setActiveDriverId(driverId);
            setActiveRole('driver');
          }}
          onOpenAdminPanel={() => setActiveRole('admin')}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
      )}

      {activeRole === 'services_9' && (
        <RoyalNineServicesCatalog
          onOrderCreated={handleOrderCreated}
        />
      )}

      {activeRole === 'food_bridge' && (
        <FoodBridgeRestaurantHub
          onOrderCreated={handleOrderCreated}
        />
      )}

      {activeRole === 'demand_tower' && (
        <BridgeDemandTowerEngine
          initialOrderId={focusedOrderId}
          onEscalateToAdmin={() => setActiveRole('admin')}
        />
      )}

      {activeRole === 'partner' && (
        <DemandPartnerPortalView />
      )}

      {activeRole === 'driver' && (
        <DriverAutoAppView
          initialDriverId={activeDriverId}
          onOpenCustomerView={() => setActiveRole('customer')}
          onOpenAdminPanel={() => setActiveRole('admin')}
        />
      )}

      {activeRole === 'admin' && <RoyalAutoAdminPanel />}

      {/* DRIVER ONBOARDING MODAL */}
      <DriverOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onDriverRegistered={handleDriverRegistered}
      />
    </div>
  );
};
