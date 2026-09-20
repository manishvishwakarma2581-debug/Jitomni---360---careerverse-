import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Filter,
  Phone,
  Star,
  ShieldCheck,
  Building2,
  Car,
  UserCheck,
  Clock,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Info,
  Maximize2,
  Plus
} from 'lucide-react';
import { RewaMapLocationPin, RewaLocationType, Language } from '../../types';

interface RewaCityLiveMapProps {
  lang: Language;
  onBookSathi?: (sathi: RewaMapLocationPin) => void;
  onBookCab?: (cab: RewaMapLocationPin) => void;
  onReserveHotel?: (hotel: RewaMapLocationPin) => void;
  onOpenRegisterModal?: () => void;
}

export const RewaCityLiveMap: React.FC<RewaCityLiveMapProps> = ({
  lang,
  onBookSathi,
  onBookCab,
  onReserveHotel,
  onOpenRegisterModal
}) => {
  // Customer GPS coordinates (default: Rewa City Center / SGMH)
  const [customerLat, setCustomerLat] = useState<number>(24.5362);
  const [customerLng, setCustomerLng] = useState<number>(81.3037);
  const [customerLocationName, setCustomerLocationName] = useState<string>('रीवा सिटी सेंटर (Rewa Center)');
  const [isLocatingUser, setIsLocatingUser] = useState<boolean>(false);
  const [locationStatusMsg, setLocationStatusMsg] = useState<string | null>(null);

  // Filter & Search State
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | RewaLocationType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPin, setSelectedPin] = useState<RewaMapLocationPin | null>(null);
  const [pinsList, setPinsList] = useState<RewaMapLocationPin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Map Zoom State (visual SVG scale)
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Rewa Landmark preset pickers for quick testing
  const presetLocations = [
    { name: 'रीवा रेलवे स्टेशन (Rewa Station)', lat: 24.5264, lng: 81.3210 },
    { name: 'संजय गांधी अस्पताल (SGMH Rewa)', lat: 24.5375, lng: 81.3021 },
    { name: 'शिल्पी प्लाजा मार्केट (Shilpi Plaza)', lat: 24.5388, lng: 81.2985 },
    { name: 'सिविल लाइन्स (Civil Lines Rewa)', lat: 24.5420, lng: 81.2940 },
    { name: 'कोठी कंपाउंड (Kothi Compound)', lat: 24.5340, lng: 81.2990 },
    { name: 'न्यू बस स्टैंड (New Bus Stand Urrahat)', lat: 24.5310, lng: 81.3090 }
  ];

  // Fetch live locations from backend API
  const fetchLocations = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/companion/rewa-map/locations?customerLat=${lat}&customerLng=${lng}&type=${activeTypeFilter}`);
      if (res.ok) {
        const data = await res.json();
        if (data.locations) {
          setPinsList(data.locations);
          if (!selectedPin && data.locations.length > 0) {
            setSelectedPin(data.locations[0]);
          }
        }
      }
    } catch (e) {
      console.warn('Fallback to local map data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(customerLat, customerLng);
  }, [customerLat, customerLng, activeTypeFilter]);

  // Real-time GPS detection using navigator.geolocation
  const handleDetectCustomerGps = () => {
    if (!navigator.geolocation) {
      setLocationStatusMsg('जीपीएस ब्राउज़र में उपलब्ध नहीं है।');
      return;
    }
    setIsLocatingUser(true);
    setLocationStatusMsg('लाइव सैटेलाइट जीपीएस खोजा जा रहा है...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = Math.round(pos.coords.latitude * 10000) / 10000;
        const userLng = Math.round(pos.coords.longitude * 10000) / 10000;
        setCustomerLat(userLat);
        setCustomerLng(userLng);
        setCustomerLocationName(`लाइव जीपीएस (${userLat}° N, ${userLng}° E)`);
        setIsLocatingUser(false);
        setLocationStatusMsg(`✓ लाइव जीपीएस फिक्स! दूरी की गणना अद्यतन की गई (सटीकता: ±${Math.round(pos.coords.accuracy)}m)`);
      },
      (err) => {
        setIsLocatingUser(false);
        setLocationStatusMsg('डिफॉल्ट रीवा अस्पताल केंद्र (24.5375° N, 81.3021° E) का उपयोग कर रहे हैं।');
        setCustomerLat(24.5375);
        setCustomerLng(81.3021);
        setCustomerLocationName('संजय गांधी अस्पताल (SGMH)');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Filtered Pins based on search
  const filteredPins = useMemo(() => {
    return pinsList.filter((pin) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        pin.name.toLowerCase().includes(q) ||
        pin.address.toLowerCase().includes(q) ||
        pin.categoryLabel.toLowerCase().includes(q) ||
        (pin.meta?.vehicleNumber && pin.meta.vehicleNumber.toLowerCase().includes(q));
      return matchesSearch;
    });
  }, [pinsList, searchQuery]);

  // Counts
  const sathiCount = pinsList.filter(p => p.type === 'sathi').length;
  const cabCount = pinsList.filter(p => p.type === 'cab').length;
  const hotelCount = pinsList.filter(p => p.type === 'hotel').length;

  // Map coordinate transformation for SVG projection
  // Rewa bounds roughly: Lat: 24.51 to 24.57, Lng: 81.28 to 81.34
  const mapBounds = {
    minLat: 24.5200,
    maxLat: 24.5600,
    minLng: 81.2850,
    maxLng: 81.3350
  };

  const projectToMap = (lat: number, lng: number) => {
    const xPercent = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const yPercent = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    // Bound inside 5% to 95%
    const boundedX = Math.max(6, Math.min(94, xPercent));
    const boundedY = Math.max(6, Math.min(94, yPercent));
    return { x: boundedX, y: boundedY };
  };

  const customerMapPos = projectToMap(customerLat, customerLng);

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner & Control Strip */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#040E24] via-[#071938] to-[#040E24] border-2 border-amber-500/50 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black tracking-widest border border-amber-400/40 uppercase">
              REWA CITY • 24x7 REAL-TIME RADAR MAP
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{pinsList.length} सत्यापित पिन लाइव</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🗺️ रीवा शहर लाइव मैप — एक्टिव साथी, कैब व होटल</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            संजय गांधी अस्पताल, रीवा रेलवे स्टेशन, शिल्पी प्लाजा व सिविल लाइन्स के आसपास वास्तविक समय में उपलब्ध सत्यापित साथी, 0% कमीशन कैब व निकटतम होटल/लॉज की स्थिति देखें।
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Live GPS Button */}
          <button
            type="button"
            onClick={handleDetectCustomerGps}
            disabled={isLocatingUser}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs border border-blue-400 shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Navigation className={`w-4 h-4 ${isLocatingUser ? 'animate-spin' : ''}`} />
            <span>{isLocatingUser ? 'जीपीएस खोज रहे हैं...' : '📍 मेरा लाइव GPS लें'}</span>
          </button>

          {/* Sathi/Vendor Register Onboarding Button */}
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>साथी / वेंडर बनें (Register)</span>
          </button>
        </div>
      </div>

      {/* Preset Location Quick Selector */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-bold flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>त्वरित स्थान सेट करें:</span>
        </span>
        {presetLocations.map((loc) => (
          <button
            key={loc.name}
            type="button"
            onClick={() => {
              setCustomerLat(loc.lat);
              setCustomerLng(loc.lng);
              setCustomerLocationName(loc.name);
              setLocationStatusMsg(`स्थान सेट किया गया: ${loc.name}`);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
              customerLat === loc.lat && customerLng === loc.lng
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {locationStatusMsg && (
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-amber-200 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{locationStatusMsg}</span>
        </div>
      )}

      {/* Filters Strip & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#07132B] border border-slate-800 shadow-md">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTypeFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              activeTypeFilter === 'all'
                ? 'bg-white text-slate-950 border-white shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span>सभी ({pinsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTypeFilter('sathi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              activeTypeFilter === 'sathi'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-slate-900 text-emerald-400 border-emerald-500/40 hover:text-white'
            }`}
          >
            <span>🟢 एक्टिव साथी ({sathiCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTypeFilter('cab')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              activeTypeFilter === 'cab'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900 text-amber-400 border-amber-500/40 hover:text-white'
            }`}
          >
            <span>🚖 उपलब्ध कैब ({cabCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTypeFilter('hotel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              activeTypeFilter === 'hotel'
                ? 'bg-purple-500 text-slate-950 border-purple-400 shadow-md'
                : 'bg-slate-900 text-purple-400 border-purple-500/40 hover:text-white'
            }`}
          >
            <span>🏨 होटल व लॉज ({hotelCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नाम, अस्पताल, वाहन नंबर खोजें..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Main Grid: Visual Map Canvas on Left (65%) + Interactive Detail Cards on Right (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Map Visualizer (Left Column 7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl bg-gradient-to-br from-[#020917] via-[#04122E] to-[#020611] border-2 border-slate-700 shadow-2xl overflow-hidden p-4">
            
            {/* Map Background Grid & Radar Sweep */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* Rewa Major Arterial Roads Simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-600/40" strokeWidth="2" fill="none">
              {/* NH-7 Bypass road */}
              <path d="M 0 120 Q 200 150 450 180 T 800 240" strokeDasharray="6 4" stroke="#475569" strokeWidth="3" />
              {/* Station Road to SGMH */}
              <line x1="80%" y1="75%" x2="40%" y2="35%" stroke="#3b82f6" strokeWidth="2.5" strokeOpacity="0.5" />
              {/* Shilpi Plaza to Civil Lines */}
              <line x1="35%" y1="32%" x2="25%" y2="18%" stroke="#10b981" strokeWidth="2" strokeOpacity="0.5" />
              {/* Radar Rings Centered on User */}
              <circle cx={`${customerMapPos.x}%`} cy={`${customerMapPos.y}%`} r="60" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              <circle cx={`${customerMapPos.x}%`} cy={`${customerMapPos.y}%`} r="120" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.2" />
            </svg>

            {/* Street & Landmark Labels */}
            <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-400 font-bold bg-black/60 px-2 py-1 rounded-md border border-slate-700 backdrop-blur-sm">
              📍 REWA CITY RADAR CANVAS • 24.5362° N, 81.3037° E
            </div>

            <div className="absolute bottom-3 right-4 text-[9px] font-mono text-emerald-400 bg-black/70 px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE GPS RADAR • ACTIVE</span>
            </div>

            {/* Customer Location Pin (Blue Radar Pulse) */}
            <div
              style={{ left: `${customerMapPos.x}%`, top: `${customerMapPos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none"
            >
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping" />
                <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-[10px] font-bold">
                  📍
                </div>
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-md bg-blue-900/90 border border-blue-400 text-white text-[9px] font-black whitespace-nowrap shadow-lg">
                आप यहाँ हैं (Your GPS)
              </div>
            </div>

            {/* Location Pins across Rewa */}
            {filteredPins.map((pin) => {
              const pos = projectToMap(pin.lat, pin.lng);
              const isSelected = selectedPin?.id === pin.id;

              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setSelectedPin(pin)}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all group focus:outline-none ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                  }`}
                  title={`${pin.name} (${pin.distanceKm} km)`}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing ring for active */}
                    {pin.isAvailable && (
                      <span
                        className={`absolute -inset-1.5 rounded-full animate-pulse opacity-75 ${
                          pin.type === 'sathi'
                            ? 'bg-emerald-500/50'
                            : pin.type === 'cab'
                            ? 'bg-amber-500/50'
                            : 'bg-purple-500/50'
                        }`}
                      />
                    )}

                    {/* Pin Icon Bubble */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all ${
                        isSelected
                          ? 'ring-4 ring-white bg-slate-950 scale-110'
                          : 'bg-slate-900'
                      } ${
                        pin.type === 'sathi'
                          ? 'border-emerald-400 text-emerald-300'
                          : pin.type === 'cab'
                          ? 'border-amber-400 text-amber-300'
                          : 'border-purple-400 text-purple-300'
                      }`}
                    >
                      <span className="text-sm">
                        {pin.type === 'sathi' ? '🟢' : pin.type === 'cab' ? '🚖' : '🏨'}
                      </span>
                    </div>

                    {/* Pin Name Tag */}
                    <div
                      className={`mt-1 px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap shadow-lg border backdrop-blur-md transition-all ${
                        isSelected
                          ? 'bg-white text-slate-950 border-amber-400 font-black'
                          : 'bg-black/80 text-slate-200 border-slate-700 group-hover:bg-slate-900'
                      }`}
                    >
                      <span>{pin.name.split(' ')[0]}</span>
                      {pin.distanceKm !== undefined && (
                        <span className="ml-1 text-[8px] opacity-75 font-mono">
                          • {pin.distanceKm}km
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <span>🟢</span>
                <span>सत्यापित साथी (₹120/hr)</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <span>🚖</span>
                <span>उपलब्ध कैब / टैक्सी (0% Surge)</span>
              </span>
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <span>🏨</span>
                <span>होटल व लॉज</span>
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              पिन पर क्लिक करके सीधी बुकिंग या कॉल करें
            </span>
          </div>
        </div>

        {/* Pin Details Drawer & List (Right Column 5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Selected Pin Detailed Action Card */}
          {selectedPin ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#06142E] via-[#040E24] to-[#020713] border-2 border-amber-500/60 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                        selectedPin.type === 'sathi'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : selectedPin.type === 'cab'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      {selectedPin.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {selectedPin.distanceKm !== undefined ? `${selectedPin.distanceKm} km दूर` : 'Rewa'}
                    </span>
                    {selectedPin.etaMinutes && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 text-[10px] font-mono font-bold">
                        ⏱️ ~{selectedPin.etaMinutes} min ETA
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {selectedPin.name}
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{selectedPin.address}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedPin.rating}</span>
                    <span className="text-[10px] text-slate-400">({selectedPin.reviewsCount})</span>
                  </div>
                  <div className="text-xs font-black text-emerald-400 mt-1">
                    {selectedPin.priceLabel}
                  </div>
                </div>
              </div>

              {/* Specialization / Vehicle / Hotel Details */}
              <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 space-y-2 text-xs">
                {selectedPin.type === 'sathi' && (
                  <div className="space-y-1">
                    <div className="text-slate-400 text-[11px]">विशेषज्ञता व सेवा:</div>
                    <div className="text-slate-200">{selectedPin.meta?.specialty}</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold pt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{selectedPin.verifiedBadge}</span>
                    </div>
                  </div>
                )}

                {selectedPin.type === 'cab' && (
                  <div className="space-y-1 font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>वाहन मॉडल:</span>
                      <span className="text-white font-bold">{selectedPin.meta?.vehicleModel}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>पंजीयन क्रमांक:</span>
                      <span className="text-amber-400 font-bold">{selectedPin.meta?.vehicleNumber}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-sans flex items-center gap-1 font-bold pt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{selectedPin.verifiedBadge}</span>
                    </div>
                  </div>
                )}

                {selectedPin.type === 'hotel' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>उपलब्ध कमरे:</span>
                      <span className="text-emerald-400 font-bold font-mono">{selectedPin.meta?.roomsAvailable} Rooms</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>अस्पताल से दूरी:</span>
                      <span className="text-white font-mono">{selectedPin.meta?.hospitalProximityKm} km</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {selectedPin.meta?.amenities?.map((a: string) => (
                        <span key={a} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${selectedPin.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>सीधे कॉल करें</span>
                </a>

                {selectedPin.type === 'sathi' && (
                  <button
                    type="button"
                    onClick={() => onBookSathi && onBookSathi(selectedPin)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1 transition-all"
                  >
                    <span>साथी बुक करें</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {selectedPin.type === 'cab' && (
                  <button
                    type="button"
                    onClick={() => onBookCab && onBookCab(selectedPin)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1 transition-all"
                  >
                    <span>कैब बुक करें</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {selectedPin.type === 'hotel' && (
                  <button
                    type="button"
                    onClick={() => onReserveHotel && onReserveHotel(selectedPin)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-1 transition-all"
                  >
                    <span>कमरा आरक्षित करें</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
              मानचित्र में किसी भी साथी, कैब या होटल पिन का चयन करें।
            </div>
          )}

          {/* Quick List of Nearby Verified Options */}
          <div className="p-4 rounded-3xl bg-[#040E24] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>निकटतम उपलब्ध सेवाएं (Sorted by Proximity)</span>
              <span className="text-[10px] text-amber-400 font-mono">{filteredPins.length} परिणाम</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredPins.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPin(item)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedPin?.id === item.id
                      ? 'bg-blue-950/60 border-blue-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-sm shrink-0">
                      {item.type === 'sathi' ? '🟢' : item.type === 'cab' ? '🚖' : '🏨'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.address}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-amber-400 font-mono">
                      {item.distanceKm} km
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ~{item.etaMinutes} min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
