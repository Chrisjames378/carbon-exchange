import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (isSignUp && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      level: 1,
      levelName: 'Eco Starter',
      xp: 100,
      nextLevelXp: 300,
      streakDays: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      claimedDailyBonusToday: false,
      totalCO2SavedKg: 12.5,
      treesPlantedCount: 0
    };

    onAuthenticate(newUser);
    onClose();
  };

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

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {isSignUp ? 'Create Atmosphere Account' : 'Sign In to Atmosphere'}
          </h3>
          <p className="text-xs text-slate-400">
            Securely sync your carbon credit balance & verified eco ledger.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => {
              setIsSignUp(false);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              !isSignUp ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              isSignUp ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@atmosphere.eco"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {error && (
            <p className="text-rose-400 text-[11px] font-medium bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
            id="auth-submit-btn"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-500">
          Encrypted authentication • Atmosphere Global Eco Exchange
        </p>
      </div>
    </div>
  );
};

