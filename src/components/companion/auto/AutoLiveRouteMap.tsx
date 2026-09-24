import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface AutoLiveRouteMapProps {
  pickupAddress: string;
  dropAddress: string;
  driverName?: string;
  driverAutoNo?: string;
  driverRoyalId?: string;
  isRideActive?: boolean;
  progressPercent?: number; // 0 to 100
  onDeviateRoute?: () => void;
  onSimulateStop?: () => void;
}

export const AutoLiveRouteMap: React.FC<AutoLiveRouteMapProps> = ({
  pickupAddress,
  dropAddress,
  driverName,
  driverAutoNo,
  driverRoyalId,
  isRideActive = false,
  progressPercent = 35,
  onDeviateRoute,
  onSimulateStop,
}) => {
  // Animated auto location along route
  const [animProgress, setAnimProgress] = useState(progressPercent);

  useEffect(() => {
    setAnimProgress(progressPercent);
  }, [progressPercent]);

  // Interpolate position along SVG path
  // Start: (80, 220), Mid waypoint: (250, 140), End: (420, 70)
  const t = animProgress / 100;
  // Bezier curve approximation
  const p0 = { x: 70, y: 230 };
  const p1 = { x: 230, y: 110 };
  const p2 = { x: 430, y: 80 };

  const autoX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const autoY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-[#07132B] border-2 border-[#D4AF37]/40 shadow-inner">
      {/* Background Map Grid & Roads Styling */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Styled Roads & Route SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300" preserveAspectRatio="none">
        {/* City Road Network */}
        <line x1="20" y1="280" x2="480" y2="40" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
        <line x1="40" y1="50" x2="460" y2="260" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
        <line x1="10" y1="150" x2="490" y2="150" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
        <line x1="250" y1="10" x2="250" y2="290" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />

        {/* Selected Route Shadow */}
        <path
          d="M 70 230 Q 230 110 430 80"
          fill="none"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Selected Route Active Line */}
        <path
          d="M 70 230 Q 230 110 430 80"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="5"
          strokeDasharray="6 3"
          strokeLinecap="round"
          className="animate-pulse"
        />

        {/* Traveled portion highlight */}
        <path
          d={`M 70 230 Q ${70 + (230 - 70) * t} ${230 + (110 - 230) * t} ${autoX} ${autoY}`}
          fill="none"
          stroke="#10B981"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Pickup Pin */}
        <circle cx={p0.x} cy={p0.y} r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx={p0.x} cy={p0.y} r="18" fill="#10B981" opacity="0.3" className="animate-ping" />

        {/* Drop Pin */}
        <circle cx={p2.x} cy={p2.y} r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx={p2.x} cy={p2.y} r="18" fill="#EF4444" opacity="0.2" />

        {/* Live Auto Icon Position */}
        <g transform={`translate(${autoX - 16}, ${autoY - 16})`}>
          <circle cx="16" cy="16" r="18" fill="#D4AF37" opacity="0.3" className="animate-ping" />
          <circle cx="16" cy="16" r="14" fill="#0A1931" stroke="#D4AF37" strokeWidth="2" />
          <text x="16" y="21" textAnchor="middle" fontSize="13" fill="#D4AF37">
            🛺
          </text>
        </g>
      </svg>

      {/* Floating Map Badges */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
        <span className="px-2.5 py-1 rounded-lg bg-[#0A1931]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[11px] font-black flex items-center gap-1 shadow-md">
          <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>GPS LIVE ROUTE (0% SURGE)</span>
        </span>
        {isRideActive && (
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-400 text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>लाइव राइड गतिमान ({Math.round(animProgress)}%)</span>
          </span>
        )}
      </div>

      {/* Driver Overlay (if assigned) */}
      {driverRoyalId && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs p-2.5 rounded-xl bg-[#0A1931]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-xl flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-lg">
              🛺
            </div>
            <div>
              <div className="text-xs font-black text-white">{driverName || 'Verified Auto'}</div>
              <div className="text-[10px] font-mono text-[#D4AF37] font-bold">
                {driverRoyalId} • {driverAutoNo}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
              3 min दूर
            </span>
          </div>
        </div>
      )}

      {/* AI Route Deviation Tester Trigger (Safety Demo) */}
      {isRideActive && onDeviateRoute && (
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <button
            type="button"
            onClick={onDeviateRoute}
            className="px-2.5 py-1 rounded-lg bg-amber-500/30 hover:bg-amber-500/50 backdrop-blur-md border border-amber-400 text-amber-300 font-bold text-[10px] flex items-center gap-1 shadow"
            title="Simulate route deviation >500m to test AI Safety"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>रूट डेविएशन टेस्ट (&gt;500m)</span>
          </button>

          {onSimulateStop && (
            <button
              type="button"
              onClick={onSimulateStop}
              className="px-2.5 py-1 rounded-lg bg-red-500/30 hover:bg-red-500/50 backdrop-blur-md border border-red-400 text-red-300 font-bold text-[10px] flex items-center gap-1 shadow"
              title="Simulate auto stopping >10 mins in isolated zone"
            >
              <span>अचानक ठहराव टेस्ट (10 Min)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
