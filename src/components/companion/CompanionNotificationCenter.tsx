import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Wallet,
  Clock,
  MapPin,
  X,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { CompanionNotification, Language } from '../../types';

interface CompanionNotificationCenterProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (actionType: string) => void;
}

export const CompanionNotificationCenter: React.FC<CompanionNotificationCenterProps> = ({
  lang,
  isOpen,
  onClose,
  onSelectAction
}) => {
  const [notifications, setNotifications] = useState<CompanionNotification[]>([
    {
      id: 'NOTIF-01',
      type: 'wallet_credit',
      title: '💰 ऑटो बिल व वॉलेट क्रेडिट संपन्न (Auto Split)',
      message: 'टास्क JIT-CMP-84910 पूर्ण: 20% (₹72) प्लेटफॉर्म चार्ज व 80% (₹288) साथी पूजा विश्वकर्मा के वॉलेट में सीधे जमा। UPI का झंझट खत्म!',
      timestamp: new Date().toISOString(),
      read: false,
      importance: 'high'
    },
    {
      id: 'NOTIF-02',
      type: 'start_checkin',
      title: '📸 START चेक-इन वेरिफाइड (Photo + GPS Locked)',
      message: 'पूजा विश्वकर्मा ने AIIMS भोपाल OPD गेट 2 पर फोटो व लाइव GPS चेक-इन दर्ज किया।',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      read: false,
      importance: 'normal'
    },
    {
      id: 'NOTIF-03',
      type: 'rule_applied',
      title: '🎁 4 KM फ्री राइड नियम लागू',
      message: 'लोकल डिलीवरी व सुरक्षित यात्रा साथी में पहले 4 KM का ₹0 शुल्क नियम स्वतः लागू।',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      read: true,
      importance: 'normal'
    }
  ]);
  const [unreadCount, setUnreadCount] = useState<number>(2);
  const [activeFilter, setActiveFilter] = useState<'all' | 'wallet' | 'checkin' | 'alerts'>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchNotifications = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/companion/notifications');
      if (res.ok) {
        const data = await res.json();
        if (data.notifications) {
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount || 0);
        }
      }
    } catch (e) {
      console.warn('Fallback to local notifications', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/companion/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (e) {
      console.warn('Mark read fallback', e);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  if (!isOpen) return null;

  const filteredList = notifications.filter((item) => {
    if (activeFilter === 'wallet') {
      return item.type === 'wallet_credit' || item.type === 'bill_generated';
    }
    if (activeFilter === 'checkin') {
      return item.type === 'start_checkin' || item.type === 'end_checkin';
    }
    if (activeFilter === 'alerts') {
      return item.importance === 'urgent' || item.type === 'waiting_alert';
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#07132B] border-2 border-slate-700 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-[#0B1E3B] to-[#07132B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700]">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>गतिविधि सूचना केंद्र (Activity Notifications)</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    {unreadCount} नई
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                START/END चेक-इन, ऑटो-बिल व 10%-20% वॉलेट क्रेडिट की लाइव सूचनाएं
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchNotifications}
              disabled={isRefreshing}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="p-3 bg-[#050E20] border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#FFD700] text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              सभी ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('wallet')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'wallet'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60'
              }`}
            >
              💰 बिल व वॉलेट
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('checkin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'checkin'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              📸 फोटो/GPS चेक-इन
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('alerts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'alerts'
                  ? 'bg-red-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-red-300 hover:bg-slate-800/60'
              }`}
            >
              🚨 अलर्ट्स
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline whitespace-nowrap font-medium px-2 py-1"
            >
              सब पढ़ें मार्क करें
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredList.map((item) => {
            const isWallet = item.type === 'wallet_credit' || item.type === 'bill_generated';
            const isCheckin = item.type === 'start_checkin' || item.type === 'end_checkin';
            const isRule = item.type === 'rule_applied';
            const isHighImportance = item.importance === 'high' || item.importance === 'urgent';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.read
                    ? 'bg-[#0B1E3B]/60 border-slate-800 text-slate-300'
                    : 'bg-[#0B1E3B] border-amber-500/50 shadow-md shadow-amber-500/5 text-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isWallet
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isCheckin
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : isRule
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isWallet ? (
                      <Wallet className="w-5 h-5" />
                    ) : isCheckin ? (
                      <Camera className="w-5 h-5" />
                    ) : isRule ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <ShieldAlert className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold truncate">{item.title}</h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.timestamp).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}</span>
                      {isHighImportance && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                          महत्वपूर्ण
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">इस श्रेणी में कोई सूचना नहीं है।</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#050E20] border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono">जितोमनी 360° रियल-टाइम एक्टिविटी लॉग</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
