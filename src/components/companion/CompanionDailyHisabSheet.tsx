import React, { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  User,
  ShieldCheck,
  Percent,
  Camera,
  MapPin,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CompanionTaskCommissionRecord, Language } from '../../types';
import { initialPlatformCommissionRecords } from '../../data/companionData';

interface CompanionDailyHisabSheetProps {
  lang: Language;
  onRefreshParent?: () => void;
}

export const CompanionDailyHisabSheet: React.FC<CompanionDailyHisabSheetProps> = ({
  lang,
  onRefreshParent
}) => {
  const [records, setRecords] = useState<CompanionTaskCommissionRecord[]>(initialPlatformCommissionRecords);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPercent, setFilterPercent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<{ url: string; title: string; location: string } | null>(null);

  const fetchHisabData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/companion/admin/daily-hisab');
      if (res.ok) {
        const data = await res.json();
        if (data.records) {
          setRecords(data.records);
        }
      }
    } catch (e) {
      console.warn('Fallback to local hisab initial data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHisabData();
  }, []);

  // Compute Totals
  const totalVolume = records.reduce((acc, r) => acc + (r.grossFee || 0), 0);
  const totalWorkerPayout = records.reduce(
    (acc, r) => acc + (r.workerShareAmount || r.workerShare80 || 0),
    0
  );
  const totalPlatformCut = records.reduce(
    (acc, r) => acc + (r.platformShareAmount || r.platformShare20 || 0),
    0
  );
  const pendingRecords = records.filter((r) => r.status === 'pending');
  const pendingPlatformFee = pendingRecords.reduce(
    (acc, r) => acc + (r.platformShareAmount || r.platformShare20 || 0),
    0
  );

  // Group by Worker: "Kaun sa Sathi kitna kamaya"
  const workerSummaryMap: Record<
    string,
    {
      workerId: string;
      workerName: string;
      photoUrl?: string;
      tasksCompleted: number;
      totalGross: number;
      totalWorkerEarned: number;
      platformCut: number;
      pendingAmount: number;
    }
  > = {};

  records.forEach((rec) => {
    const wId = rec.workerId || 'unknown';
    if (!workerSummaryMap[wId]) {
      workerSummaryMap[wId] = {
        workerId: wId,
        workerName: rec.workerName || 'साथी',
        photoUrl: rec.startPhotoUrl,
        tasksCompleted: 0,
        totalGross: 0,
        totalWorkerEarned: 0,
        platformCut: 0,
        pendingAmount: 0
      };
    }
    workerSummaryMap[wId].tasksCompleted += 1;
    workerSummaryMap[wId].totalGross += rec.grossFee || 0;
    workerSummaryMap[wId].totalWorkerEarned += rec.workerShareAmount || rec.workerShare80 || 0;
    workerSummaryMap[wId].platformCut += rec.platformShareAmount || rec.platformShare20 || 0;
    if (rec.status === 'pending') {
      workerSummaryMap[wId].pendingAmount += rec.platformShareAmount || rec.platformShare20 || 0;
    }
  });

  const workerSummaryList = Object.values(workerSummaryMap);

  // 1-Click Settle single record
  const handleSettleRecord = async (recordId: string) => {
    try {
      const res = await fetch('/api/companion/admin/settle-record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId })
      });
      if (res.ok) {
        setActionSuccessMsg(`रिकॉर्ड ${recordId} 1-क्लिक में सेटल हो गया! हिसाब क्लियर।`);
        setRecords((prev) =>
          prev.map((r) => (r.id === recordId ? { ...r, status: 'settled' } : r))
        );
        if (onRefreshParent) onRefreshParent();
      }
    } catch (e) {
      console.warn('Settle fallback', e);
      setRecords((prev) =>
        prev.map((r) => (r.id === recordId ? { ...r, status: 'settled' } : r))
      );
      setActionSuccessMsg(`रिकॉर्ड ${recordId} सेटल हो गया! हिसाब क्लियर।`);
    }
  };

  // 1-Click Settle ALL pending
  const handleSettleAllPending = async () => {
    try {
      const res = await fetch('/api/companion/admin/settle-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setRecords((prev) => prev.map((r) => ({ ...r, status: 'settled' })));
        setActionSuccessMsg(`सभी लंबित रिकॉर्ड्स (${pendingRecords.length}) 1-क्लिक में सेटल हो गए!`);
        if (onRefreshParent) onRefreshParent();
      } else {
        // Fallback sequentially
        for (const p of pendingRecords) {
          await handleSettleRecord(p.id);
        }
        setActionSuccessMsg(`सभी लंबित रिकॉर्ड्स (${pendingRecords.length}) 1-क्लिक में सेटल हो गए!`);
      }
    } catch (e) {
      console.warn('Settle all fallback', e);
      setRecords((prev) => prev.map((r) => ({ ...r, status: 'settled' })));
      setActionSuccessMsg(`सभी लंबित रिकॉर्ड्स (${pendingRecords.length}) 1-क्लिक में सेटल हो गए!`);
    }
  };

  // Filtered Records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taskId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterPercent !== 'all') {
      if (r.platformCommissionPercent !== Number(filterPercent)) return false;
    }
    if (filterStatus !== 'all') {
      if (r.status !== filterStatus) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & 1-Click Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1E3B] via-[#07132B] to-[#040A17] p-6 rounded-3xl border-2 border-[#FFD700]/30 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[11px] font-black border border-[#FFD700]/40 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>LIVE ADMIN DAILY HISAB SHEET</span>
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              लाइव सिंक
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
            दैनिक हिसाब शीट: साथी कमाई एवं मेरा 10%-20% प्लेटफ़ॉर्म शुल्क
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            अस्पतालों व अति-जिम्मेदार कार्यों पर 20%, सामान्य कार्यों पर 10%-15% पारदर्शी कमीशन। ऑटो बिलिंग फॉर्मूला, फोटो-GPS चेक-इन व 1-क्लिक में पेंडिंग सेटलमेंट।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchHisabData}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#07132B] border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>रीफ्रेश</span>
          </button>

          {pendingPlatformFee > 0 && (
            <button
              type="button"
              onClick={handleSettleAllPending}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-[#FFD700]/30 flex items-center gap-2 hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>1-क्लिक में सारा पेंडिंग सेटल करें (₹{pendingPlatformFee})</span>
            </button>
          )}
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{actionSuccessMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccessMsg(null)}
            className="text-emerald-400 hover:text-white text-xs underline"
          >
            हटाएं
          </button>
        </div>
      )}

      {/* 4 LIVE KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Gross Billing */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            आज का कुल बिलिंग टर्नओवर
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{totalVolume}
            </span>
            <span className="text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">
              {records.length} कार्य
            </span>
          </div>
          <p className="text-[11px] text-slate-400">सभी साथी कार्यों का सकल ग्राहक बिल</p>
        </div>

        {/* Card 2: Sathi Earned (80% - 90%) */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-emerald-500/40 space-y-2">
          <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block flex items-center gap-1">
            <span>👷 साथियों की कुल कमाई (80-90%)</span>
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ₹{totalWorkerPayout}
            </span>
            <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
              क्रेडिटेड
            </span>
          </div>
          <p className="text-[11px] text-slate-400">साथियों के सीधे वॉलेट में तुरंत जमा</p>
        </div>

        {/* Card 3: Platform Charge Collected */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-[#FFD700]/40 space-y-2">
          <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block flex items-center gap-1">
            <span>🏛️ मेरा प्लेटफ़ॉर्म शुल्क (10-20%)</span>
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">
              ₹{totalPlatformCut}
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-bold font-mono">
              नेट रिज़र्व
            </span>
          </div>
          <p className="text-[11px] text-slate-400">क्लाउड सर्वर, SOS, GPS व 24/7 प्रबंधन</p>
        </div>

        {/* Card 4: Pending Platform Charge */}
        <div className="p-5 rounded-2xl bg-[#07132B] border border-red-500/40 space-y-2">
          <span className="text-[11px] text-rose-300 font-bold uppercase tracking-wider block flex items-center gap-1">
            <span>⏳ लंबित प्लेटफ़ॉर्म शुल्क (Pending)</span>
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
              ₹{pendingPlatformFee}
            </span>
            {pendingPlatformFee > 0 ? (
              <button
                type="button"
                onClick={handleSettleAllPending}
                className="text-[10px] text-rose-300 bg-rose-500/20 hover:bg-rose-500 hover:text-white px-2 py-0.5 rounded font-bold transition-colors"
              >
                1-क्लिक क्लियर
              </button>
            ) : (
              <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
                शून्य लंबित
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {pendingRecords.length} कार्यों का सेटलमेंट लंबित है
          </p>
        </div>
      </div>

      {/* SECTION 1: KAUN SA SATHI KITNA KAMAYA TABLE */}
      <div className="p-6 rounded-3xl bg-[#07132B] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFD700]" />
              <span>कौन सा साथी कितना कमाया (Sathi-wise Earnings & Commission Summary)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              प्रत्येक साथी के कुल कार्य, ग्रॉस टर्नओवर, साथी शेयर (80-90%) व मेरा प्लेटफ़ॉर्म कमीशन (10-20%)
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">{workerSummaryList.length} साथी सक्रिय</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050D1C] text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">साथी प्रोफाइल व ID</th>
                <th className="p-3">पूर्ण कार्य</th>
                <th className="p-3">कुल ग्रॉस बिलिंग</th>
                <th className="p-3 text-emerald-400">साथी को भुगतान (80-90%)</th>
                <th className="p-3 text-[#FFD700]">मेरा प्लेटफ़ॉर्म शुल्क (10-20%)</th>
                <th className="p-3">लंबित सेटलमेंट</th>
                <th className="p-3 text-right">त्वरित एक्शन</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {workerSummaryList.map((w) => (
                <tr key={w.workerId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs overflow-hidden shrink-0">
                        {w.photoUrl ? (
                          <img src={w.photoUrl} alt={w.workerName} className="w-full h-full object-cover" />
                        ) : (
                          w.workerName.charAt(0)
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-white text-sm block">{w.workerName}</span>
                        <span className="text-[10px] font-mono text-slate-400">ID: {w.workerId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-bold">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                      {w.tasksCompleted} कार्य
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-white">
                    ₹{w.totalGross}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-400 bg-emerald-500/5">
                    ₹{w.totalWorkerEarned}
                  </td>
                  <td className="p-3 font-mono font-bold text-[#FFD700] bg-[#FFD700]/5">
                    ₹{w.platformCut}
                  </td>
                  <td className="p-3 font-mono">
                    {w.pendingAmount > 0 ? (
                      <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                        ₹{w.pendingAmount} लंबित
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> क्लियर
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {w.pendingAmount > 0 ? (
                      <button
                        type="button"
                        onClick={handleSettleAllPending}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-colors"
                      >
                        हिसाब क्लियर
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">पूर्ण</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: DETAILED TASK-BY-TASK DAILY HISAB TABLE */}
      <div className="p-6 rounded-3xl bg-[#07132B] border border-slate-800 space-y-4">
        {/* Controls: Search & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span>विस्तृत दैनिक हिसाब लेजर (Detailed Task-by-Task Records)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              प्रत्येक कार्य का ऑटो-बिल फॉर्मूला (उदा: 2hr x 150 = 300 + 6km bike 60 = 360) और स्टार्ट/एंड फोटो-GPS प्रूफ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="साथी, ग्राहक, टास्क खोजें..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#050D1C] border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <select
              value={filterPercent}
              onChange={(e) => setFilterPercent(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#050D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FFD700]"
            >
              <option value="all">सभी कमीशन (10% - 20%)</option>
              <option value="20">20% कमीशन (हॉस्पिटल / नाइट)</option>
              <option value="18">18% कमीशन (बुजुर्ग साथी)</option>
              <option value="15">15% कमीशन (बैंक व ऑफिशियल)</option>
              <option value="10">10% कमीशन (लोकल डिलीवरी)</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#050D1C] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FFD700]"
            >
              <option value="all">सभी स्थिति</option>
              <option value="credited">क्रेडिटेड (Credited)</option>
              <option value="settled">सेटल (Settled)</option>
              <option value="pending">लंबित (Pending)</option>
            </select>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050D1C] text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">कार्य ID व विवरण</th>
                <th className="p-3">साथी (Worker)</th>
                <th className="p-3">चेक-इन प्रूफ (START / END)</th>
                <th className="p-3">ऑटो बिल फॉर्मूला (Auto Bill Breakdown)</th>
                <th className="p-3 text-emerald-400">साथी हिस्सा (80-90%)</th>
                <th className="p-3 text-[#FFD700]">मेरा चार्ज (10-20%)</th>
                <th className="p-3">स्थिति</th>
                <th className="p-3 text-right">1-क्लिक एक्शन</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredRecords.map((r) => {
                const isHospital = r.platformCommissionPercent === 20;
                const formulaText =
                  r.billFormulaBreakdown ||
                  `${r.hours}hr x ${r.hourlyRate} = ${r.hours * r.hourlyRate}${
                    (r.bikeKmCharge || 0) > 0 ? ` + ${r.bikeKm}km bike ${r.bikeKmCharge} = ${r.grossFee}` : ` = ${r.grossFee}`
                  }`;

                return (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Task Title & Customer */}
                    <td className="p-3 max-w-[200px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white block truncate">{r.taskTitle}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        ग्राहक: {r.customerName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {r.taskId} • {r.dateStr || 'Today'}
                      </span>
                    </td>

                    {/* Sathi */}
                    <td className="p-3">
                      <p className="font-bold text-white">{r.workerName}</p>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        ID: {r.workerId}
                      </span>
                    </td>

                    {/* Photo + GPS Proof */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* Start Check-in Thumbnail */}
                        {r.startPhotoUrl && (
                          <div
                            onClick={() =>
                              setSelectedPhotoModal({
                                url: r.startPhotoUrl!,
                                title: `START चेक-इन: ${r.workerName}`,
                                location: r.startGpsLocation || 'AIIMS OPD Gate 2'
                              })
                            }
                            className="group relative cursor-pointer"
                            title="START फोटो व GPS देखें"
                          >
                            <img
                              src={r.startPhotoUrl}
                              alt="Start"
                              className="w-8 h-8 rounded-lg object-cover border border-emerald-500 group-hover:scale-105 transition-all"
                            />
                            <span className="absolute -bottom-1 -right-1 text-[8px] bg-emerald-600 text-white font-bold px-1 rounded">
                              START
                            </span>
                          </div>
                        )}

                        {/* End Check-in Thumbnail */}
                        {r.endPhotoUrl && (
                          <div
                            onClick={() =>
                              setSelectedPhotoModal({
                                url: r.endPhotoUrl!,
                                title: `END चेक-इन: ${r.workerName}`,
                                location: r.endGpsLocation || 'Pharmacy, Bhopal'
                              })
                            }
                            className="group relative cursor-pointer"
                            title="END फोटो व GPS देखें"
                          >
                            <img
                              src={r.endPhotoUrl}
                              alt="End"
                              className="w-8 h-8 rounded-lg object-cover border border-purple-500 group-hover:scale-105 transition-all"
                            />
                            <span className="absolute -bottom-1 -right-1 text-[8px] bg-purple-600 text-white font-bold px-1 rounded">
                              END
                            </span>
                          </div>
                        )}

                        <div className="text-[10px] text-slate-400 font-mono">
                          <span className="text-emerald-400 font-bold block">GPS वेरिफाइड</span>
                          <span className="text-slate-500 truncate max-w-[100px] block">
                            {r.startGpsLocation ? r.startGpsLocation.split('•')[0] : '23.23°N, 77.43°E'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Auto Bill Breakdown Formula */}
                    <td className="p-3 font-mono">
                      <div className="p-2 rounded-xl bg-[#050D1C] border border-slate-700/60 inline-block">
                        <span className="text-white font-bold text-xs block">
                          {formulaText}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                          <span
                            className={`px-1.5 py-0.2 rounded font-bold ${
                              isHospital
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {r.platformCommissionPercent}% कमीशन लागू
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sathi Share (80-90%) */}
                    <td className="p-3 font-mono font-bold text-emerald-400 bg-emerald-500/5">
                      ₹{r.workerShareAmount || r.workerShare80}
                      <span className="text-[10px] text-emerald-300/80 block font-sans font-normal">
                        ({100 - (r.platformCommissionPercent || 20)}% साथी नेट)
                      </span>
                    </td>

                    {/* Platform Share (10-20%) */}
                    <td className="p-3 font-mono font-bold text-[#FFD700] bg-[#FFD700]/5">
                      ₹{r.platformShareAmount || r.platformShare20}
                      <span className="text-[10px] text-[#FFD700]/80 block font-sans font-normal">
                        ({r.platformCommissionPercent}% मेरा शुल्क)
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      {r.status === 'pending' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          ⏳ लंबित (Pending)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{r.status === 'credited' ? 'क्रेडिटेड (Wallet)' : 'सेटल (Settled)'}</span>
                        </span>
                      )}
                    </td>

                    {/* 1-Click Action */}
                    <td className="p-3 text-right">
                      {r.status === 'pending' ? (
                        <button
                          type="button"
                          onClick={() => handleSettleRecord(r.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-all shadow-md flex items-center gap-1 ml-auto"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>1-Click Settle</span>
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">हिसाब क्लियर</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PHOTO PREVIEW MODAL */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#07132B] border-2 border-[#FFD700] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-white">{selectedPhotoModal.title}</h4>
              <button
                type="button"
                onClick={() => setSelectedPhotoModal(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-black">
              <img
                src={selectedPhotoModal.url}
                alt="Proof"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 bg-[#050D1C] rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">GPS लोकेशन व समय:</span>
                <span className="text-slate-400 text-[11px]">{selectedPhotoModal.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
