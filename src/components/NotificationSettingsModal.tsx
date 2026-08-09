import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellOff,
  CheckCircle2,
  X,
  Sparkles,
  ShieldAlert,
  Send,
  Calendar,
  Clock,
  Target,
  Flame,
  Volume2
} from 'lucide-react';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendTestEcoNotification,
  sendGoalCheckinNotification,
  sendDailyBonusNotification,
  ReminderConfig,
  DEFAULT_REMINDER_CONFIG
} from '../services/notificationService';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [config, setConfig] = useState<ReminderConfig>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_reminder_config');
      return saved ? JSON.parse(saved) : DEFAULT_REMINDER_CONFIG;
    } catch {
      return DEFAULT_REMINDER_CONFIG;
    }
  });

  useEffect(() => {
    if (isOpen) {
      setPermission(getNotificationPermission());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const supported = isNotificationSupported();

  const handleEnablePermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
    if (res === 'granted') {
      onShowToast('Web Notifications enabled successfully!');
      sendTestEcoNotification();
    } else if (res === 'denied') {
      onShowToast('Notification permission was blocked in browser settings.');
    }
  };

  const handleToggleConfig = (key: keyof ReminderConfig) => {
    const updated = { ...config, [key]: !config[key] };
    setConfig(updated);
    localStorage.setItem('atmosphere_reminder_config', JSON.stringify(updated));
    onShowToast('Reminder preferences updated!');
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hour = parseInt(e.target.value, 10);
    const updated = { ...config, reminderHour: hour };
    setConfig(updated);
    localStorage.setItem('atmosphere_reminder_config', JSON.stringify(updated));
    onShowToast(`Daily reminder time set to ${hour === 0 ? '12 AM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}`);
  };

  const handleSendTest = (type: 'action' | 'bonus' | 'goal') => {
    if (permission !== 'granted') {
      onShowToast('Please enable browser notification permission first.');
      return;
    }

    if (type === 'action') {
      const sent = sendTestEcoNotification();
      if (sent) onShowToast('Sent test Daily Eco Reminder!');
    } else if (type === 'bonus') {
      const sent = sendDailyBonusNotification();
      if (sent) onShowToast('Sent test Daily Bonus Notification!');
    } else if (type === 'goal') {
      const sent = sendGoalCheckinNotification('Weekly 25kg CO₂ Goal', '18.2 / 25.0 kg achieved');
      if (sent) onShowToast('Sent test Climate Goal Notification!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Browser Eco Reminders</h3>
            <p className="text-xs text-slate-400">Web Notifications API for daily actions & climate goals</p>
          </div>
        </div>

        {/* Permission Status Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              {permission === 'granted' ? (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : permission === 'denied' ? (
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <BellOff className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-white">
                  Permission Status:{' '}
                  <span
                    className={`capitalize ${
                      permission === 'granted'
                        ? 'text-emerald-400 font-extrabold'
                        : permission === 'denied'
                        ? 'text-rose-400 font-extrabold'
                        : 'text-amber-400 font-extrabold'
                    }`}
                  >
                    {permission === 'granted' ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Not Requested'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {permission === 'granted'
                    ? 'Desktop and mobile notifications are active.'
                    : permission === 'denied'
                    ? 'Blocked by browser. Unblock in browser settings to receive alerts.'
                    : 'Enable to receive daily eco-action and climate goal reminders.'}
                </p>
              </div>
            </div>

            {permission !== 'granted' && supported && (
              <button
                onClick={handleEnablePermission}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/30 transition-all cursor-pointer shrink-0"
              >
                Enable
              </button>
            )}
          </div>

          {!supported && (
            <p className="text-xs text-rose-400 bg-rose-950/30 p-3 rounded-xl border border-rose-800/40">
              Web Notifications API is not supported in this browser environment.
            </p>
          )}
        </div>

        {/* Reminder Options */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            Reminder Subscriptions
          </h4>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">Daily Eco-Action Reminder</p>
                  <p className="text-[10px] text-slate-400">Prompt to log daily green commute, energy, or recycling</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={config.dailyAction}
                onChange={() => handleToggleConfig('dailyAction')}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">Daily Streak & Bonus Reminder</p>
                  <p className="text-[10px] text-slate-400">Alert when your +25 Eco Credit daily bonus is ready</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={config.dailyBonus}
                onChange={() => handleToggleConfig('dailyBonus')}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs font-bold text-white">Climate Goals Progress Alert</p>
                  <p className="text-[10px] text-slate-400">Updates on active weekly and monthly carbon targets</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={config.climateGoal}
                onChange={() => handleToggleConfig('climateGoal')}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Preferred Daily Reminder Hour</span>
            </div>
            <select
              value={config.reminderHour}
              onChange={handleHourChange}
              className="bg-slate-900 text-white text-xs font-bold border border-slate-700 rounded-lg p-1.5 focus:outline-none focus:border-emerald-500"
            >
              {Array.from({ length: 24 }).map((_, h) => (
                <option key={h} value={h}>
                  {h === 0 ? '12:00 AM' : h === 12 ? '12:00 PM' : h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Test Notification Triggers */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            Test Desktop Notifications
          </h4>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSendTest('action')}
              className="p-2.5 bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer transition-all text-center"
            >
              <Sparkles className="w-4 h-4" />
              <span>Eco Action Test</span>
            </button>

            <button
              onClick={() => handleSendTest('bonus')}
              className="p-2.5 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer transition-all text-center"
            >
              <Flame className="w-4 h-4" />
              <span>Daily Bonus Test</span>
            </button>

            <button
              onClick={() => handleSendTest('goal')}
              className="p-2.5 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer transition-all text-center"
            >
              <Target className="w-4 h-4" />
              <span>Climate Goal Test</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
