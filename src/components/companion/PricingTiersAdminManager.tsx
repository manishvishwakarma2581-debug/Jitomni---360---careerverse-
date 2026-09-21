import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Search,
  Sparkles,
  Award,
  Layers,
  Info,
  Clock,
  HeartPulse,
  Stethoscope,
  Crown
} from 'lucide-react';
import { ServicePricingTierRow } from '../../../server/db/servicePricingTiers';

interface PricingTiersAdminManagerProps {
  onNotify?: (msg: string) => void;
}

export const PricingTiersAdminManager: React.FC<PricingTiersAdminManagerProps> = ({ onNotify }) => {
  const [tiers, setTiers] = useState<ServicePricingTierRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ServicePricingTierRow>>({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // API Tester State
  const [testServiceType, setTestServiceType] = useState<string>('nurse');
  const [testDuration, setTestDuration] = useState<string>('8hr');
  const [testTier, setTestTier] = useState<string>('business');
  const [testResult, setTestResult] = useState<any>(null);

  // SSMC Filter Testing Tool State
  const [testCollege, setTestCollege] = useState<string>('SSMC Medical College Rewa');
  const [testStaffName, setTestStaffName] = useState<string>('Dr. Anupam Shukla');
  const [testRole, setTestRole] = useState<string>('doctor');
  const [ssmcCheckResult, setSsmcCheckResult] = useState<any>(null);

  const fetchTiers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/pricing/tiers');
      if (res.ok) {
        const data = await res.json();
        if (data.tiers) {
          setTiers(data.tiers);
        }
      }
    } catch (e) {
      console.error('Failed to fetch pricing tiers:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  const handleStartEdit = (tier: ServicePricingTierRow) => {
    setEditingId(tier.id);
    setEditForm({
      middle_price: tier.middle_price,
      business_price: tier.business_price,
      royal_price: tier.royal_price,
      description: tier.description,
      is_active: tier.is_active
    });
    setSaveSuccessMsg(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveTier = async (id: string) => {
    try {
      const res = await fetch(`/api/pricing/tier/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        const data = await res.json();
        setSaveSuccessMsg(`मूल्य सफलतापूर्वक अपडेट हुआ: ${data.tier.description}`);
        if (onNotify) onNotify(`Tier ${id} updated.`);
        setEditingId(null);
        fetchTiers();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (e) {
      console.error('Failed to update tier:', e);
      alert('Failed to save tier. Check server connection.');
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('क्या आप सभी 3-टियर मूल्यों को मूल फ़ैक्टरी मानों पर रीसेट करना चाहते हैं?')) return;
    try {
      const res = await fetch('/api/pricing/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setTiers(data.tiers);
        setSaveSuccessMsg('सभी 3-टियर मूल्य फ़ैक्टरी विनिर्देशों पर रीसेट कर दिए गए हैं।');
      }
    } catch (e) {
      console.error('Failed to reset:', e);
    }
  };

  // Run GET /api/pricing?service_type=...&duration=...&tier=...
  const handleTestPricingQuery = async () => {
    try {
      const res = await fetch(
        `/api/pricing?service_type=${testServiceType}&duration=${testDuration}&tier=${testTier}`
      );
      const data = await res.json();
      setTestResult(data);
    } catch (e) {
      console.error('Test query failed:', e);
    }
  };

  // Run SSMC College Verification Check
  const handleTestSsmcEligibility = async () => {
    try {
      const res = await fetch('/api/admin/verify-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_name: testStaffName,
          role: testRole,
          college: testCollege
        })
      });
      const data = await res.json();
      setSsmcCheckResult(data);
    } catch (e) {
      console.error('SSMC check failed:', e);
    }
  };

  const filteredTiers = tiers.filter((t) => {
    if (filterType === 'all') return true;
    if (filterType === 'nurse') return t.service_type === 'nurse';
    if (filterType === 'doctor') return t.service_type === 'doctor';
    if (filterType === 'exclusive') return t.middle_price === null;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A1931] via-[#0D254C] to-[#120E02] border border-[#D4AF37]/40 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-black text-white">
                3-Tier Pricing Configuration (Middle Class, Business Class, Royal Family)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] font-bold border border-[#D4AF37]/40">
                LIVE IN-DATABASE EDITOR
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              बिना कोड बदले यहां से तीनों टियर (Middle, Business, Royal) की दरें सीधे एडिट करें। 
              यदि Middle Price को <strong>NULL</strong> रखा जाता है, तो वह सेवा मध्यम वर्गीय टियर के लिए स्वतः छिप जाएगी।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>फ़ैक्टरी रीसेट (Reset Default)</span>
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono">फिल्टर:</span>
          {[
            { id: 'all', label: 'All Services (सभी सेवाएं)' },
            { id: 'nurse', label: 'Nursing Shifts (नर्स सेवाएं)' },
            { id: 'doctor', label: 'Doctor Consultations (डॉक्टर सेवाएं)' },
            { id: 'exclusive', label: 'Royal/Business Exclusive (Middle NULL)' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterType === f.id
                  ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-md shadow-[#D4AF37]/20 font-black'
                  : 'bg-[#07132B] text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-slate-400">
          Showing {filteredTiers.length} of {tiers.length} pricing rows
        </div>
      </div>

      {/* Table of 3-Tier Prices */}
      <div className="rounded-2xl bg-[#040E24] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#071938] text-slate-300 font-mono text-[11px] border-b border-slate-800">
                <th className="p-3.5">Service & Duration</th>
                <th className="p-3.5">Middle Class (Grey)</th>
                <th className="p-3.5">Business Class (Blue)</th>
                <th className="p-3.5">Royal Family (Gold)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTiers.map((row) => {
                const isEditing = editingId === row.id;

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-900/40 transition-colors ${
                      isEditing ? 'bg-blue-950/20' : ''
                    }`}
                  >
                    {/* Service & Duration */}
                    <td className="p-3.5 max-w-xs">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="capitalize text-slate-200">{row.service_type}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                          {row.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {row.description}
                      </p>
                    </td>

                    {/* Middle Class Price */}
                    <td className="p-3.5">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="number"
                            value={editForm.middle_price ?? ''}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                middle_price: e.target.value === '' ? null : Number(e.target.value)
                              })
                            }
                            placeholder="NULL (Hide)"
                            className="w-24 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-slate-100 text-xs font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, middle_price: null })}
                            className="block text-[10px] text-amber-400 underline"
                          >
                            Set to NULL
                          </button>
                        </div>
                      ) : row.middle_price !== null ? (
                        <div className="font-mono font-bold text-slate-200 text-sm">
                          ₹{row.middle_price.toLocaleString()}
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 font-mono font-bold">
                          NULL (Exclusive)
                        </span>
                      )}
                    </td>

                    {/* Business Class Price */}
                    <td className="p-3.5">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="number"
                            value={editForm.business_price ?? ''}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                business_price: e.target.value === '' ? null : Number(e.target.value)
                              })
                            }
                            placeholder="NULL (Hide)"
                            className="w-28 px-2 py-1 bg-slate-900 border border-blue-500 rounded text-blue-200 text-xs font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, business_price: null })}
                            className="block text-[10px] text-amber-400 underline"
                          >
                            Set to NULL
                          </button>
                        </div>
                      ) : row.business_price !== null ? (
                        <div className="font-mono font-black text-blue-400 text-sm">
                          ₹{row.business_price.toLocaleString()}
                          {row.travel_applicable && (
                            <span className="text-[10px] text-slate-400 block font-normal">+ Travel</span>
                          )}
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 font-mono font-bold">
                          NULL (Royal Only)
                        </span>
                      )}
                    </td>

                    {/* Royal Family Price */}
                    <td className="p-3.5">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.royal_price ?? ''}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              royal_price: e.target.value === '' ? null : Number(e.target.value)
                            })
                          }
                          className="w-32 px-2 py-1 bg-slate-900 border border-[#D4AF37] rounded text-[#D4AF37] text-xs font-mono"
                        />
                      ) : row.royal_price !== null ? (
                        <div className="font-mono font-black text-[#D4AF37] text-sm">
                          ₹{row.royal_price.toLocaleString()}
                          {row.travel_applicable && (
                            <span className="text-[10px] text-slate-400 block font-normal">+ Travel</span>
                          )}
                          {row.service_type === 'royal_concierge' && (
                            <span className="text-[10px] text-amber-300 block font-normal">₹1.8L - ₹2.5L/mo</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono">NULL</span>
                      )}
                    </td>

                    {/* Active Status */}
                    <td className="p-3.5">
                      {isEditing ? (
                        <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={editForm.is_active}
                            onChange={(e) =>
                              setEditForm({ ...editForm, is_active: e.target.checked })
                            }
                            className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-0"
                          />
                          <span>Active</span>
                        </label>
                      ) : row.is_active ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          सक्रिय
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          निष्क्रिय
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveTier(row.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" />
                            <span>सेव</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs"
                          >
                            रद्द
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(row)}
                          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 hover:border-slate-500 transition-colors"
                        >
                          मूल्य एडिट करें
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: 1. API Pricing Query Simulator & 2. SSMC Not Eligible Filter Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Box 1: API Endpoint Tester */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-blue-500/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span>Live API Query Tester: GET /api/pricing</span>
            </h3>
            <span className="text-[10px] font-mono text-blue-300 px-2 py-0.5 rounded bg-blue-500/20">
              REST Endpoint
            </span>
          </div>

          <p className="text-xs text-slate-300">
            परीक्षण करें: <code>/api/pricing?service_type=nurse&duration=8hr&tier=business</code>
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Service Type:</label>
              <select
                value={testServiceType}
                onChange={(e) => setTestServiceType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
              >
                <option value="nurse">nurse</option>
                <option value="doctor">doctor</option>
                <option value="icu_setup">icu_setup</option>
                <option value="medical_escort">medical_escort</option>
                <option value="royal_concierge">royal_concierge</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Duration:</label>
              <select
                value={testDuration}
                onChange={(e) => setTestDuration(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
              >
                <option value="4hr">4hr</option>
                <option value="8hr">8hr</option>
                <option value="12hr">12hr</option>
                <option value="24hr">24hr</option>
                <option value="1_visit">1_visit</option>
                <option value="monthly_retainer">monthly_retainer</option>
                <option value="per_trip">per_trip</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Customer Tier:</label>
              <select
                value={testTier}
                onChange={(e) => setTestTier(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
              >
                <option value="middle">middle</option>
                <option value="business">business</option>
                <option value="royal">royal</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleTestPricingQuery}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-md shadow-blue-600/30"
          >
            क्वेरी रन करें (Execute GET /api/pricing)
          </button>

          {testResult && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Result Status:</span>
                <span className={testResult.success ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {testResult.success ? '200 OK' : 'Error'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Calculated Price:</span>
                <span className="font-bold text-[#FFD700] text-sm">
                  {testResult.price !== null ? `₹${testResult.price}` : 'NULL (Unavailable for this Tier)'}
                </span>
              </div>
              <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                {testResult.description || testResult.message}
              </div>
            </div>
          )}
        </div>

        {/* Box 2: SSMC Not Eligible Auto-Reject Filter Tester */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-red-500/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>SSMC Not Eligible Verification Filter</span>
            </h3>
            <span className="text-[10px] font-mono text-red-300 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
              AUTO-REJECT SHIELD
            </span>
          </div>

          <p className="text-xs text-slate-300">
            नर्स/डॉक्टर सत्यापन के दौरान यदि उम्मीदवार का कॉलेज <strong>SSMC</strong> (Shyam Shah Medical College / Sanjay Gandhi) से संबद्ध है, 
            तो सिस्टम इसे स्वतः अस्वीकृत कर देगा।
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Staff Name:</label>
              <input
                type="text"
                value={testStaffName}
                onChange={(e) => setTestStaffName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Medical College Name:</label>
              <input
                type="text"
                value={testCollege}
                onChange={(e) => setTestCollege(e.target.value)}
                placeholder="e.g. SSMC Rewa or AIIMS Bhopal"
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTestCollege('SSMC Medical College Rewa')}
              className="text-[10px] px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800"
            >
              Test SSMC Rewa
            </button>
            <button
              onClick={() => setTestCollege('AIIMS New Delhi')}
              className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800"
            >
              Test AIIMS Delhi
            </button>
            <button
              onClick={() => setTestCollege('CMC Vellore')}
              className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800"
            >
              Test CMC Vellore
            </button>
          </div>

          <button
            onClick={handleTestSsmcEligibility}
            className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all shadow-md shadow-red-600/30"
          >
            कॉलेज पात्रता टेस्ट करें (Verify College Eligibility)
          </button>

          {ssmcCheckResult && (
            <div
              className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                ssmcCheckResult.is_eligible
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/60 border-red-500/60 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {ssmcCheckResult.is_eligible ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>APPROVED: METRO/VIP ELIGIBLE</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>REJECTED: SSMC NOT ELIGIBLE</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                {ssmcCheckResult.reason || ssmcCheckResult.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
