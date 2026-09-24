import React, { useState, useMemo } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Star, 
  DollarSign, 
  QrCode, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Printer, 
  MapPin, 
  Eye, 
  FileText,
  RefreshCw,
  Ban,
  PhoneCall,
  Clock
} from 'lucide-react';
import { AutoDriver, AutoRide, AutoSOSTicket, DemandPartner, BridgeOrder } from './royalAutoTypes';
import { RoyalAutoStorage, POPULAR_INDIAN_CITIES } from './royalAutoStorage';
import { DriverDigitalCard } from './DriverDigitalCard';

interface RoyalAutoAdminPanelProps {
  onRefreshData?: () => void;
}

export const RoyalAutoAdminPanel: React.FC<RoyalAutoAdminPanelProps> = () => {
  const [drivers, setDrivers] = useState<AutoDriver[]>(() => RoyalAutoStorage.getDrivers());
  const [rides, setRides] = useState<AutoRide[]>(() => RoyalAutoStorage.getRides());
  const [sosTickets, setSosTickets] = useState<AutoSOSTicket[]>(() => RoyalAutoStorage.getSOSTickets());
  const [partners, setPartners] = useState<DemandPartner[]>(() => RoyalAutoStorage.getDemandPartners());
  const [orders, setOrders] = useState<BridgeOrder[]>(() => RoyalAutoStorage.getOrders());

  // Active Tab inside Admin Panel: 'drivers' | 'bridge_orders' | 'partners' | 'rides' | 'revenue' | 'qr_generator' | 'sos'
  const [adminTab, setAdminTab] = useState<'drivers' | 'bridge_orders' | 'partners' | 'rides' | 'revenue' | 'qr_generator' | 'sos'>('drivers');

  // Filters
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected driver for modal view
  const [selectedDriver, setSelectedDriver] = useState<AutoDriver | null>(null);

  // Manual Dispatch selection state
  const [manualDispatchOrderId, setManualDispatchOrderId] = useState<string | null>(null);

  // New Partner Modal State
  const [showAddPartnerModal, setShowAddPartnerModal] = useState<boolean>(false);
  const [newPartnerName, setNewPartnerName] = useState<string>('');
  const [newPartnerType, setNewPartnerType] = useState<'restaurant' | 'auto_provider' | 'local_agency'>('restaurant');
  const [newPartnerCity, setNewPartnerCity] = useState<string>('Rewa');
  const [newPartnerPhone, setNewPartnerPhone] = useState<string>('');
  const [newPartnerAddress, setNewPartnerAddress] = useState<string>('');

  // Refresh data from storage
  const handleReload = () => {
    setDrivers(RoyalAutoStorage.getDrivers());
    setRides(RoyalAutoStorage.getRides());
    setSosTickets(RoyalAutoStorage.getSOSTickets());
    setPartners(RoyalAutoStorage.getDemandPartners());
    setOrders(RoyalAutoStorage.getOrders());
  };

  // Toggle police verification
  const handleTogglePolice = (royalId: string) => {
    RoyalAutoStorage.togglePoliceVerification(royalId);
    handleReload();
  };

  // Toggle driver block/unblock
  const handleToggleBlock = (royalId: string) => {
    RoyalAutoStorage.toggleDriverBlock(royalId);
    handleReload();
  };

  // Resolve SOS ticket
  const handleResolveSOS = (ticketId: string) => {
    const updated = sosTickets.map((t) =>
      t.ticketId === ticketId ? { ...t, status: 'resolved' as const } : t
    );
    RoyalAutoStorage.saveSOSTickets(updated);
    setSosTickets(updated);
  };

  // Filtered drivers list
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (filterCity !== 'all' && d.cityCode !== filterCity) return false;
      if (filterStatus === 'verified' && !d.isPoliceVerified) return false;
      if (filterStatus === 'pending' && d.isPoliceVerified) return false;
      if (filterStatus === 'blocked' && d.status !== 'blocked') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.royalId.toLowerCase().includes(q) ||
          d.autoNumber.toLowerCase().includes(q) ||
          d.phone.includes(q)
        );
      }
      return true;
    });
  }, [drivers, filterCity, filterStatus, searchQuery]);

  // Aggregate Revenue Calculations
  // Joining Fee: Rs 1499 per driver
  // Monthly Subscription: Rs 299 per driver
  // Platform Commission: Rs 10 flat per ride
  const totalJoiningFees = drivers.filter((d) => d.joiningFeePaid).length * 1499;
  const totalSubscriptions = drivers.filter((d) => d.subscriptionPaid).length * 299;
  const totalRidesCommission = rides.reduce((sum, r) => sum + (r.commissionAmount || 10), 0);
  const totalGrossRevenue = totalJoiningFees + totalSubscriptions + totalRidesCommission;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#031533] via-[#051E48] to-[#041026] border-2 border-[#D4AF37] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-xs font-black">
              SUPER CONTROL ROOM
            </span>
            <span className="text-xs text-slate-400 font-mono">PAN-INDIA 100+ CITIES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            रॉयल ऑटो एग्जीक्यूटिव — एडमिन हेडक्वार्टर
          </h2>
          <p className="text-xs text-[#D4AF37] font-semibold">
            ड्राइवर वेरिफिकेशन, ₹10 फ्लैट कमीशन लेजर, क्यूआर स्टिकर एवं 24x7 SOS मॉनिटर
          </p>
        </div>

        <button
          type="button"
          onClick={handleReload}
          className="py-2 px-3.5 rounded-xl bg-slate-900 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>डेटा रीफ्रेश करें</span>
        </button>
      </div>

      {/* Admin KPI Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0A1931] border border-[#D4AF37]/40 space-y-1">
          <span className="text-slate-400 text-xs font-medium">कुल पंजीकृत चालक</span>
          <div className="text-2xl font-mono font-black text-white">{drivers.length}</div>
          <span className="text-[10px] text-emerald-400">
            {drivers.filter((d) => d.isPoliceVerified).length} पुलिस वेरिफाइड
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-medium">कुल पूर्ण हुई राइड्स</span>
          <div className="text-2xl font-mono font-black text-white">{rides.length}</div>
          <span className="text-[10px] text-[#D4AF37]">₹10/राइड पारदर्शी मॉडल</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-medium">कुल प्लेटफॉर्म आय</span>
          <div className="text-2xl font-mono font-black text-[#D4AF37]">
            ₹{totalGrossRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-300">ज्वाइनिंग + सब + कमीशन</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A1931] border border-red-500/40 space-y-1">
          <span className="text-slate-400 text-xs font-medium">सक्रिय SOS आपात अलर्ट</span>
          <div className="text-2xl font-mono font-black text-red-400">
            {sosTickets.filter((t) => t.status === 'active').length}
          </div>
          <span className="text-[10px] text-red-300">पुलिस 112 से समन्वय</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'drivers', label: '🛺 चालक 3-स्तरीय सत्यापन', badge: drivers.length },
          { id: 'bridge_orders', label: '🗼 डिमांड टॉवर व ऑर्डर्स', badge: orders.length },
          { id: 'partners', label: '🏢 डिमांड पार्टनर्स (80/20)', badge: partners.length },
          { id: 'rides', label: '🚗 राइड इतिहास', badge: rides.length },
          { id: 'revenue', label: '💰 आय लेजर (90/10 & 80/20)', badge: '₹' },
          { id: 'qr_generator', label: '🖨️ ऑटो QR स्टिकर्स', badge: 'PRINT' },
          { id: 'sos', label: '🚨 SOS कंट्रोल रूम (112)', badge: sosTickets.length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAdminTab(tab.id as any)}
            className={`py-2 px-4 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 border ${
              adminTab === tab.id
                ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 border-[#D4AF37] shadow-md'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                adminTab === tab.id ? 'bg-slate-950 text-[#D4AF37]' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: ALL DRIVERS TABLE */}
      {adminTab === 'drivers' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="नाम, रॉयल आईडी, फोन या ऑटो नंबर खोजें..."
                className="w-full py-2 px-3 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
              >
                <option value="all">सभी शहर (All Cities)</option>
                {POPULAR_INDIAN_CITIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
              >
                <option value="all">सभी स्थिति (All Status)</option>
                <option value="verified">सत्यापित (Police Verified)</option>
                <option value="pending">लंबित (Pending Review)</option>
                <option value="blocked">ब्लॉक (Blocked)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#0A1931] overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-[#07132B] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">रॉयल आईडी</th>
                  <th className="p-3">चालक का नाम</th>
                  <th className="p-3">ऑटो / RC नंबर</th>
                  <th className="p-3">आधार (Digilocker)</th>
                  <th className="p-3">लाइसेंस</th>
                  <th className="p-3">पुलिस CID सत्यापन</th>
                  <th className="p-3">सब्सक्रिप्शन (₹299)</th>
                  <th className="p-3">ग्राहक ऐप स्थिति</th>
                  <th className="p-3 text-right">कार्यवाही</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredDrivers.map((driver) => {
                  const isAppLive = driver.isAadharVerified && driver.isPoliceVerified && driver.subscriptionPaid && driver.status !== 'blocked';
                  return (
                    <tr key={driver.royalId} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3">
                        <span className="font-mono font-black text-[#D4AF37] bg-slate-900 px-2 py-0.5 rounded border border-[#D4AF37]/40">
                          {driver.royalId}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={driver.photoUrl}
                            alt={driver.name}
                            className="w-8 h-8 rounded-lg object-cover border border-[#D4AF37]"
                          />
                          <div>
                            <div className="font-bold text-white">{driver.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{driver.phone} • {driver.cityName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                          {driver.autoNumber}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>..{driver.aadharNumber.slice(-4)}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-300">
                        {driver.licenseNumber}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => handleTogglePolice(driver.royalId)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1 ${
                            driver.isPoliceVerified
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          }`}
                          title="Click to toggle Police Verification status"
                        >
                          {driver.isPoliceVerified ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>सत्यापित (CID OK)</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>लंबित (Approve)</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          driver.subscriptionPaid
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}>
                          {driver.subscriptionPaid ? 'ACTIVE ₹299' : 'EXPIRED'}
                        </span>
                      </td>
                      <td className="p-3">
                        {isAppLive ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>LIVE ON APP</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span>HIDDEN (WAITING)</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedDriver(driver)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-slate-700"
                            title="View Digital ID Card & Sticker"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(driver.royalId)}
                            className={`p-1.5 rounded-lg border ${
                              driver.status === 'blocked'
                                ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            }`}
                            title={driver.status === 'blocked' ? 'Unblock Driver' : 'Block Driver'}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 1: ALL DRIVERS TABLE */}
      {adminTab === 'drivers' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="नाम, रॉयल आईडी, फोन या ऑटो नंबर खोजें..."
                className="w-full py-2 px-3 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">सभी शहर (All Cities)</option>
                {POPULAR_INDIAN_CITIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">सभी सत्यापन स्थिति</option>
                <option value="verified">सत्यापित (Verified)</option>
                <option value="pending">लंबित (Pending Review)</option>
                <option value="blocked">ब्लॉक (Blocked)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#0A1931] overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-[#07132B] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">रॉयल आईडी</th>
                  <th className="p-3">चालक का नाम</th>
                  <th className="p-3">ऑटो / RC नंबर</th>
                  <th className="p-3">आधार (Digilocker)</th>
                  <th className="p-3">लाइसेंस</th>
                  <th className="p-3">पुलिस CID सत्यापन</th>
                  <th className="p-3">सब्सक्रिप्शन (₹299)</th>
                  <th className="p-3">ग्राहक ऐप स्थिति</th>
                  <th className="p-3 text-right">कार्यवाही</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredDrivers.map((driver) => {
                  const isAppLive = driver.isAadharVerified && driver.isPoliceVerified && driver.subscriptionPaid && driver.status !== 'blocked';
                  return (
                    <tr key={driver.royalId} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3">
                        <span className="font-mono font-black text-[#D4AF37] bg-slate-900 px-2 py-0.5 rounded border border-[#D4AF37]/40">
                          {driver.royalId}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={driver.photoUrl}
                            alt={driver.name}
                            className="w-8 h-8 rounded-lg object-cover border border-[#D4AF37]"
                          />
                          <div>
                            <div className="font-bold text-white">{driver.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{driver.phone} • {driver.cityName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                          {driver.autoNumber}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>..{driver.aadharNumber.slice(-4)}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-300">
                        {driver.licenseNumber}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => handleTogglePolice(driver.royalId)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1 ${
                            driver.isPoliceVerified
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          }`}
                          title="Click to toggle Police Verification status"
                        >
                          {driver.isPoliceVerified ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>सत्यापित (CID OK)</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>लंबित (Approve)</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          driver.subscriptionPaid
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}>
                          {driver.subscriptionPaid ? 'ACTIVE ₹299' : 'EXPIRED'}
                        </span>
                      </td>
                      <td className="p-3">
                        {isAppLive ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>LIVE ON APP</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span>HIDDEN (WAITING)</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedDriver(driver)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-slate-700"
                            title="View Digital ID Card & Sticker"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(driver.royalId)}
                            className={`p-1.5 rounded-lg border ${
                              driver.status === 'blocked'
                                ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            }`}
                            title={driver.status === 'blocked' ? 'Unblock Driver' : 'Block Driver'}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DEMAND TOWER & BRIDGE ORDERS MATRIX */}
      {adminTab === 'bridge_orders' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">डिमांड टॉवर व ब्रिज ऑर्डर्स (80/20 & 90/10 Matrix)</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  AUTO-CASCADING ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Priority 1: Own Royal Worker (90s) ➔ Priority 2: Demand Partner (60s) ➔ Priority 3: Super Admin Escalation
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-red-500/20 text-red-400 px-3 py-1 rounded-lg border border-red-500/40 font-bold">
                {orders.filter((o) => o.status === 'escalated').length} एस्केलेटेड आर्डर्स
              </span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#0A1931] overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-[#07132B] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">आर्डर आईडी / सेवा</th>
                  <th className="p-3">ग्राहक विवरण</th>
                  <th className="p-3">पिकअप व ड्रॉप</th>
                  <th className="p-3">प्राथमिकता स्तर</th>
                  <th className="p-3">असाइनमेंट & स्प्लिट</th>
                  <th className="p-3">स्थिति</th>
                  <th className="p-3 text-right">मैन्युअल कार्यवाही</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((order) => {
                  const isEscalated = order.status === 'escalated' || order.priorityLevel === 3;
                  return (
                    <tr key={order.orderId} className={`hover:bg-slate-900/60 transition-colors ${isEscalated ? 'bg-red-950/20' : ''}`}>
                      <td className="p-3">
                        <div className="font-mono font-bold text-white">#{order.orderId}</div>
                        <div className="text-[11px] text-[#D4AF37] font-semibold">{order.serviceTitle}</div>
                        <div className="text-[10px] text-slate-400">प्रकार: {order.type}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-white">{order.customerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{order.customerPhone}</div>
                      </td>
                      <td className="p-3 max-w-xs">
                        <div className="truncate text-slate-300">P: {order.pickup.address}</div>
                        <div className="truncate text-slate-400">D: {order.drop.address}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          order.priorityLevel === 1
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : order.priorityLevel === 2
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                        }`}>
                          P{order.priorityLevel}: {order.priorityLevel === 1 ? 'ROYAL (90s)' : order.priorityLevel === 2 ? 'PARTNER (60s)' : 'ESCALATED'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-white font-mono">₹{order.totalAmount || order.commissionSplit.totalAmount}</div>
                        <div className="text-[10px] text-emerald-400">
                          {order.commissionSplit.model === '80_20' || order.commissionSplit.isPartnerFulfillment ? 'Partner 80%: ₹' : 'Worker 90%: ₹'}
                          {order.commissionSplit.workerOrPartnerCut}
                        </div>
                        <div className="text-[10px] text-[#D4AF37]">
                          Platform Fee: ₹{order.commissionSplit.platformCut}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'escalated'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                            : order.status === 'delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {isEscalated ? (
                          <div className="relative inline-block">
                            <button
                              type="button"
                              onClick={() => setManualDispatchOrderId(manualDispatchOrderId === order.orderId ? null : order.orderId)}
                              className="py-1 px-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] flex items-center gap-1 shadow"
                            >
                              <span>मैन्युअल असाइन करें</span>
                            </button>

                            {manualDispatchOrderId === order.orderId && (
                              <div className="absolute right-0 top-8 z-30 w-60 rounded-xl bg-slate-900 border-2 border-[#D4AF37] p-3 shadow-2xl space-y-2 text-left">
                                <div className="text-[10px] font-black text-[#D4AF37] uppercase">
                                  किसी साथी या पार्टनर को आर्डर सौंपें:
                                </div>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                  <div className="text-[10px] text-slate-400 font-bold">आंतरिक साथी (90%):</div>
                                  {drivers.slice(0, 3).map((d) => (
                                    <button
                                      key={d.royalId}
                                      type="button"
                                      onClick={() => {
                                        RoyalAutoStorage.updateOrder(order.orderId, {
                                          status: 'accepted',
                                          priorityLevel: 1,
                                          assignedRoyalId: d.royalId,
                                          assignedRoyalName: d.name,
                                          assignedWorkerName: d.name,
                                        });
                                        handleReload();
                                        setManualDispatchOrderId(null);
                                        alert(`आर्डर #${order.orderId} को सफलतापूर्वक आंतरिक साथी ${d.name} (${d.royalId}) को असाइन किया गया!`);
                                      }}
                                      className="w-full text-left p-1.5 rounded hover:bg-slate-800 text-[11px] text-white flex justify-between"
                                    >
                                      <span>{d.name.split(' ')[0]}</span>
                                      <span className="font-mono text-[#D4AF37]">{d.royalId}</span>
                                    </button>
                                  ))}

                                  <div className="text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-800">टाई-अप पार्टनर (80%):</div>
                                  {partners.slice(0, 3).map((p) => (
                                    <button
                                      key={p.id}
                                      type="button"
                                      onClick={() => {
                                        RoyalAutoStorage.forwardOrderToPartner(order.orderId, p);
                                        RoyalAutoStorage.updateOrder(order.orderId, { status: 'accepted' });
                                        handleReload();
                                        setManualDispatchOrderId(null);
                                        alert(`आर्डर #${order.orderId} को सफलतापूर्वक डिमांड पार्टनर ${p.name} को 80/20 मॉडल पर असाइन किया गया!`);
                                      }}
                                      className="w-full text-left p-1.5 rounded hover:bg-slate-800 text-[11px] text-white flex justify-between"
                                    >
                                      <span className="truncate">{p.name}</span>
                                      <span className="font-mono text-emerald-400">80%</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {order.assignedRoyalName || order.assignedWorkerName || order.assignedPartnerName || 'ऑटो-डिस्पैच'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DEMAND PARTNERS DIRECTORY */}
      {adminTab === 'partners' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-white">डिमांड पार्टनर्स डायरेक्टरी (80/20 Sovereign Network)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                टाई-अप भोजनालय, ऑटो यूनियन व स्थानीय सेवा प्रदाता जो ओवरफ्लो आर्डर्स 80% कमाई पर स्वीकारते हैं
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddPartnerModal(true)}
              className="py-2 px-3.5 rounded-xl bg-[#D4AF37] hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
            >
              <span>+ नया डिमांड पार्टनर जोड़ें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-5 rounded-2xl bg-[#0A1931] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-slate-900 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {partner.partnerRoyalId}
                    </span>
                    <h4 className="text-sm font-black text-white mt-1">{partner.name}</h4>
                    <p className="text-xs text-slate-400">{partner.cityName} ({partner.cityCode})</p>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {partner.type.toUpperCase()}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{partner.address}</span>
                  </p>
                  <p className="flex items-center gap-1 text-slate-400 font-mono">
                    <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{partner.phone}</span>
                  </p>
                </div>

                {/* Financial Ledger Mini Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">पार्टनर की कुल कमाई (80%)</span>
                    <span className="font-mono font-black text-emerald-400">
                      ₹{partner.totalEarned80?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">सफल आर्डर्स</span>
                    <span className="font-mono font-bold text-white">
                      {partner.totalOrdersCompleted || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RIDE HISTORY & RS 10 COMMISSION LEDGER */}
      {adminTab === 'rides' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0A1931] border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">सवारी इतिहास एवं कमीशन लेजर</h3>
              <p className="text-xs text-[#D4AF37]">
                प्रति राइड मात्र ₹10 का फ्लैट प्लेटफॉर्म शुल्क (Ola/Uber की 30% लूट के विपरीत)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">कुल कमीशन संचित:</span>
              <div className="text-xl font-mono font-black text-[#D4AF37]">
                ₹{totalRidesCommission}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0A1931] overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-[#07132B] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">राइड आईडी</th>
                  <th className="p-3">चालक (रॉयल आईडी)</th>
                  <th className="p-3">ग्राहक</th>
                  <th className="p-3">पिकअप व ड्रॉप</th>
                  <th className="p-3">किराया</th>
                  <th className="p-3">प्लेटफॉर्म शुल्क</th>
                  <th className="p-3">चालक भुगतान</th>
                  <th className="p-3">स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rides.map((ride) => (
                  <tr key={ride.rideId} className="hover:bg-slate-900/60">
                    <td className="p-3 font-mono font-bold text-white">{ride.rideId}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#D4AF37] font-mono">{ride.driverRoyalId}</div>
                      <div className="text-[10px] text-slate-400">{ride.driverName}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-bold">{ride.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ride.customerPhone}</div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="truncate text-slate-300">P: {ride.pickup.address}</div>
                      <div className="truncate text-slate-400">D: {ride.drop.address}</div>
                    </td>
                    <td className="p-3 font-mono font-black text-white">₹{ride.fare}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">
                      ₹{ride.commissionAmount || 10}
                    </td>
                    <td className="p-3 font-mono text-[#D4AF37] font-bold">
                      ₹{ride.fare - (ride.commissionAmount || 10)}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                        {ride.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REVENUE BREAKDOWN */}
      {adminTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-[#0A1931] border border-[#D4AF37] space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold">
                1. DRIVER ONBOARDING FEE
              </span>
              <div className="text-3xl font-mono font-black text-white">
                ₹{totalJoiningFees.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ₹1,499 प्रति चालक (यूनिक रॉयल आईडी, क्यूआर स्टिकर, 2 टी-शर्ट्स व पुलिस वेरिफिकेशन शुल्क शामिल)।
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0A1931] border border-blue-500/50 space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase font-bold">
                2. MONTHLY APP SUBSCRIPTION
              </span>
              <div className="text-3xl font-mono font-black text-white">
                ₹{totalSubscriptions.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ₹299/माह प्रति चालक (24x7 जीपीएस सर्वर, SOS पुलिस हेल्पलाइन 112 एवं प्राथमिकता कस्टमर सपोर्ट)।
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0A1931] border border-emerald-500/50 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                3. FLAT RIDE COMMISSION
              </span>
              <div className="text-3xl font-mono font-black text-white">
                ₹{totalRidesCommission.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ₹10 प्रति राइड फ्लैट। शेष 100% किराया सीधे ऑटो चालक की जेब में जाता है।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QR GENERATOR & PRINT-READY AUTO STICKER */}
      {adminTab === 'qr_generator' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0A1931] border border-[#D4AF37]/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[#D4AF37]" />
                  <span>ऑटो ग्लास व रियर बॉडी प्रिंट-रेडी स्टिकर</span>
                </h3>
                <p className="text-xs text-slate-300">
                  चालक को भौतिक रूप से प्रिंट करके देने हेतु यहां से रॉयल आईडी कार्ड व क्यूआर स्टिकर निकालें।
                </p>
              </div>
              <select
                value={selectedDriver?.royalId || drivers[0]?.royalId}
                onChange={(e) => {
                  const d = drivers.find((x) => x.royalId === e.target.value);
                  if (d) setSelectedDriver(d);
                }}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-[#D4AF37] font-mono font-bold"
              >
                {drivers.map((d) => (
                  <option key={d.royalId} value={d.royalId}>
                    {d.royalId} - {d.name} ({d.autoNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Showcase the Card of selected driver */}
            <div className="pt-4">
              <DriverDigitalCard driver={selectedDriver || drivers[0]} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SOS EMERGENCY CONTROL ROOM */}
      {adminTab === 'sos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
              <div>
                <h3 className="text-sm font-black text-white">
                  आपातकालीन नियंत्रण कक्ष (SOS Incident Desk)
                </h3>
                <p className="text-xs text-red-200">
                  डायल 112 पुलिस एवं कंट्रोल रूम से रियल-टाइम सिंक
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono text-xs font-bold animate-pulse">
              LIVE DISPATCH MONITOR
            </span>
          </div>

          <div className="space-y-3">
            {sosTickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className={`p-4 rounded-2xl border transition-all ${
                  ticket.status === 'active'
                    ? 'bg-[#15070B] border-red-500/80 shadow-lg shadow-red-500/20'
                    : 'bg-[#0A1931] border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-red-400 text-sm">
                      {ticket.ticketId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                      RIDE: {ticket.rideId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-mono font-bold">
                      DRIVER: {ticket.driverRoyalId}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                      ticket.status === 'active'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    STATUS: {ticket.status.toUpperCase()}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">अलर्ट कारण:</span>
                    <span className="text-white font-bold">{ticket.reason}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">जीपीएस स्थान:</span>
                    <span className="text-white flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      {ticket.location.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">नजदीकी पुलिस थाना:</span>
                    <span className="text-emerald-300 font-mono font-bold">
                      {ticket.nearestPoliceStation}
                    </span>
                  </div>
                </div>

                {ticket.status === 'active' && (
                  <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleResolveSOS(ticket.ticketId)}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      स्थिति सुरक्षित: समाधान चिह्नित करें (Resolve)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR DIGITAL ID CARD */}
      {selectedDriver && adminTab !== 'qr_generator' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <DriverDigitalCard
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        </div>
      )}

      {/* POPUP MODAL TO ADD NEW DEMAND PARTNER */}
      {showAddPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#0A1931] border-2 border-[#D4AF37] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-white">नया डिमांड पार्टनर जोड़ें (80/20 Network)</h3>
              <button
                type="button"
                onClick={() => setShowAddPartnerModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPartnerName || !newPartnerPhone) return;

                const city = POPULAR_INDIAN_CITIES.find((c) => c.name === newPartnerCity) || { name: newPartnerCity, code: 'RWA' };
                const count = partners.length + 1;
                const partnerRoyalId = `JS-${city.code}-P${String(count).padStart(3, '0')}`;

                RoyalAutoStorage.addDemandPartner({
                  id: `PRT-${city.code}-${Date.now().toString().slice(-4)}`,
                  partnerRoyalId,
                  name: newPartnerName,
                  type: newPartnerType,
                  cityName: city.name,
                  cityCode: city.code,
                  address: newPartnerAddress || `${city.name} मुख्य बाजार`,
                  phone: newPartnerPhone,
                  rating: 4.8,
                  distanceKm: 2.0,
                  isOpen: true,
                  isVerified: true,
                  photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
                  activeOrdersCount: 0,
                  totalOrdersCompleted: 0,
                  totalEarned80: 0,
                  qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JITOMNI-PARTNER-${partnerRoyalId}`,
                });

                handleReload();
                setShowAddPartnerModal(false);
                setNewPartnerName('');
                setNewPartnerPhone('');
                setNewPartnerAddress('');
                alert(`डिमांड पार्टनर "${newPartnerName}" सफलता पूर्वक जोड़ा गया! आईडी: ${partnerRoyalId}`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-bold mb-1">प्रतिष्ठान / यूनियन का नाम *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. श्री कृष्णा रेस्टोरेंट / रीवा ऑटो यूनियन"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">पार्टनर श्रेणी</label>
                  <select
                    value={newPartnerType}
                    onChange={(e) => setNewPartnerType(e.target.value as any)}
                    className="w-full py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="restaurant">रेस्टोरेंट (Food)</option>
                    <option value="auto_provider">ऑटो यूनियन / प्रोवाइडर</option>
                    <option value="local_agency">स्थानीय सेवा एजेंसी</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">शहर</label>
                  <select
                    value={newPartnerCity}
                    onChange={(e) => setNewPartnerCity(e.target.value)}
                    className="w-full py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    {POPULAR_INDIAN_CITIES.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">संपर्क फोन नंबर *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={newPartnerPhone}
                  onChange={(e) => setNewPartnerPhone(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">स्थान / पता *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सिरमौर चौराहा, रीवा"
                  value={newPartnerAddress}
                  onChange={(e) => setNewPartnerAddress(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="text-emerald-400 font-bold">80/20 Sovereign Bridge Model:</span>
                <p>पार्टनर को आर्डर का 80% स्वतः प्राप्त होगा, 20% JITOMNI ब्रिज प्लेटफॉर्म शुल्क रहेगा।</p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPartnerModal(false)}
                  className="py-2 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-[#D4AF37] text-slate-950 font-black shadow"
                >
                  पार्टनर पंजीकृत करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
