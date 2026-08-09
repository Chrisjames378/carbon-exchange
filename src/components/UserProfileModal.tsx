import React from 'react';
import { UserProfile } from '../types';
import {
  X,
  User,
  ShieldCheck,
  Flame,
  Award,
  Trees,
  TrendingDown,
  LogOut,
  Sparkles,
  Calendar
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserProfile;
  totalCredits: number;
  onClose: () => void;
  onSignOut: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  totalCredits,
  onClose,
  onSignOut
}) => {
  if (!isOpen) return null;

  const levelProgress = Math.min(100, Math.round((user.xp / user.nextLevelXp) * 100));

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card bg-slate-950/95 max-w-md w-full p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/40 p-1 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight">{user.name}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Level {user.level}: {user.levelName}
            </span>
          </div>
        </div>

        {/* Level XP Progress */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between font-bold">
            <span className="text-slate-300">Level {user.level} Progress</span>
            <span className="text-amber-300">{user.xp} / {user.nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Lifetime Eco Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Credits Balance
            </span>
            <p className="text-lg font-black text-white">{totalCredits} CR</p>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Active Streak
            </span>
            <p className="text-lg font-black text-amber-300">{user.streakDays} Days</p>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              Total CO₂ Saved
            </span>
            <p className="text-lg font-black text-emerald-400">{user.totalCO2SavedKg} kg</p>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Trees className="w-3.5 h-3.5 text-teal-400" />
              Trees Planted
            </span>
            <p className="text-lg font-black text-teal-300">{user.treesPlantedCount} Trees</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onSignOut}
            className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
