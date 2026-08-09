import React from 'react';
import { AppView, UserProfile } from '../types';
import {
  Coins,
  Trophy,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  User,
  Sparkles,
  Flame,
  Radio,
  Target,
  Bell
} from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  totalCredits: number;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  totalCredits,
  user,
  onOpenAuth,
  onOpenProfile,
  onOpenNotifications
}) => {
  return (
    <header className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div
            onClick={() => setCurrentView('exchange')}
            className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 text-emerald-400 shadow-inner cursor-pointer hover:bg-emerald-500/30 transition-all"
          >
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                onClick={() => setCurrentView('exchange')}
                className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent cursor-pointer"
              >
                Atmosphere Carbon Exchange
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Monetize & Redeem Your Earned Eco Impact Credits</p>
          </div>
        </div>

        {/* User Account & Notifications Bar */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Notification Settings Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 rounded-2xl transition-all shadow-sm cursor-pointer relative"
            title="Notification & Reminder Settings"
            id="btn-notification-settings"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {user ? (
            <button
              onClick={onOpenProfile}
              className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 rounded-2xl transition-all flex items-center gap-2.5 shadow-sm text-xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="text-left hidden xs:block">
                <p className="font-bold text-white text-xs leading-tight">{user.name}</p>
                <p className="text-[10px] text-amber-300 flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5 fill-amber-400" />
                  {user.streakDays}d Streak
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Sign Up</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Bar Tabs */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-800/80 pt-3">
        <button
          onClick={() => setCurrentView('exchange')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            currentView === 'exchange'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 border border-emerald-400/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
          id="nav-tab-exchange"
        >
          <Coins className="w-4 h-4 text-amber-300" />
          <span>Marketplace & Ledger</span>
          <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded-md text-[10px] font-extrabold border border-emerald-500/30">
            {totalCredits} CR
          </span>
        </button>

        <button
          onClick={() => setCurrentView('gamification')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            currentView === 'gamification'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20 border border-amber-400/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
          id="nav-tab-gamification"
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>Quests & Gamification</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </button>

        <button
          onClick={() => setCurrentView('goals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            currentView === 'goals'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 border border-emerald-400/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
          id="nav-tab-goals"
        >
          <Target className="w-4 h-4 text-emerald-300" />
          <span>Climate Goals</span>
        </button>

        <button
          onClick={() => setCurrentView('learn')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            currentView === 'learn'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-900/20 border border-teal-400/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
          id="nav-tab-learn"
        >
          <BookOpen className="w-4 h-4 text-teal-300" />
          <span>Learn Academy</span>
        </button>

        <button
          onClick={() => setCurrentView('pro')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            currentView === 'pro'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-400/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
          id="nav-tab-pro"
        >
          <Radio className="w-4 h-4 text-purple-300" />
          <span>Atmosphere Pro Telemetry</span>
        </button>
      </nav>
    </header>
  );
};

