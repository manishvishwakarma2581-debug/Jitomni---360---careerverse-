import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { KISAN_WEATHER_ADVISORIES, KisanWeatherAdvisory } from '../../data/kisanData';

interface KisanWeatherWidgetProps {
  lang: Language;
}

export const KisanWeatherWidget: React.FC<KisanWeatherWidgetProps> = ({ lang }) => {
  const [selectedZoneIdx, setSelectedZoneIdx] = useState<number>(0);
  const activeZone: KisanWeatherAdvisory = KISAN_WEATHER_ADVISORIES[selectedZoneIdx];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031C11] via-[#02130B] to-[#000000] border-2 border-emerald-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
              <CloudRain className="w-4 h-4 text-emerald-400" />
              <span>लाइव मौसम व एग्रो-मेट एडवाइजरी (IMD & ICAR Network)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
              मौसम पूर्वानुमान एवं साप्ताहिक कृषि रक्षा सलाह
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              वर्षा, तापमान, हवा की गति और आर्द्रता के आधार पर कब स्प्रे करें, कब सिंचाई रोकें और आंधी-ओलावृष्टि से फसलों को कैसे बचाएं।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-bold">अपना कृषि क्षेत्र चुनें:</span>
            <select
              value={selectedZoneIdx}
              onChange={(e) => setSelectedZoneIdx(Number(e.target.value))}
              className="bg-[#010D08] border border-emerald-400 rounded-xl px-3 py-2 text-xs font-bold text-emerald-300 focus:outline-none"
            >
              {KISAN_WEATHER_ADVISORIES.map((z, idx) => (
                <option key={idx} value={idx} className="bg-[#010D08] text-white">
                  {z.zone}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current Zone Weather Telemetry Dashboard */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#02130B] border-2 border-emerald-500/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                {activeZone.states}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${
                activeZone.riskAlert === 'सामान्य'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                  : activeZone.riskAlert === 'सावधानी'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-400/40'
                  : 'bg-red-500/20 text-red-400 border border-red-400/40 animate-pulse'
              }`}>
                ⚠️ अलर्ट: {activeZone.riskAlert}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {activeZone.zone}
            </h3>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-slate-400 block">वर्षा पूर्वानुमान:</span>
            <span className="text-sm font-black text-cyan-300">{activeZone.rainfallForecast}</span>
          </div>
        </div>

        {/* 4 Sensor Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-1">
            <Thermometer className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[11px] text-slate-400 block">अधिकतम / न्यूनतम तापमान</span>
            <span className="text-xl font-black text-white">{activeZone.temperature}</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-1">
            <Droplets className="w-6 h-6 text-cyan-400 mx-auto" />
            <span className="text-[11px] text-slate-400 block">आपेक्षिक आर्द्रता (Humidity)</span>
            <span className="text-xl font-black text-cyan-300">{activeZone.humidity}</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-1">
            <Wind className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="text-[11px] text-slate-400 block">हवा की गति (Wind Speed)</span>
            <span className="text-xl font-black text-emerald-300">{activeZone.windSpeed}</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-[11px] text-slate-400 block">स्प्रे उपयुक्तता इंडेक्स</span>
            <span className="text-xl font-black text-purple-300">
              {activeZone.cropAdvisory.some(c => c.spraySafe) ? '🟢 सुरक्षित' : '🔴 अभी स्प्रे न करें'}
            </span>
          </div>
        </div>

        {/* Crop-by-Crop Specific Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>प्रमुख फसलों के लिए तत्काल कृषि कार्य (Crop-Specific Recommendations):</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeZone.cropAdvisory.map((cropAdv, i) => (
              <div key={i} className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-emerald-300">{cropAdv.crop}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    cropAdv.spraySafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {cropAdv.spraySafe ? '✓ स्प्रे कर सकते हैं' : '✕ स्प्रे रोकें'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cropAdv.recommendation}
                </p>

                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">सिंचाई आवश्यकता:</span>
                  <span className={cropAdv.irrigationNeeded ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                    {cropAdv.irrigationNeeded ? '💧 सिंचाई करें' : 'पर्याप्त नमी है'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
