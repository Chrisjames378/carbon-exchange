import React from 'react';
import { Sparkles, Plus, Leaf, TrendingUp, DollarSign, Award } from 'lucide-react';

interface HeroBannerProps {
  totalCredits: number;
  onQuickEarnBonus: () => void;
  onOpenLogEcoModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalCredits,
  onQuickEarnBonus,
  onOpenLogEcoModal,
}) => {
  const estimatedUSD = (totalCredits * 0.10).toFixed(2);
  const estimatedCO2 = (totalCredits * 0.10).toFixed(1);

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-br from-emerald-950/50 via-slate-900/90 to-slate-950 shadow-2xl">
      {/* Subtle background glow effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Verified Eco Balance
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-teal-400" />
              1 CR = $0.10 USD
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span id="total-credits-val" className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
              {totalCredits}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-1">
              Carbon Credits
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              Estimated cash value:{' '}
              <strong id="cash-value-est" className="text-emerald-300 font-bold flex items-center">
                <DollarSign className="w-3.5 h-3.5 inline text-emerald-400" />
                {estimatedUSD} USD
              </strong>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              CO₂ Offset equivalent:{' '}
              <strong id="co2-offset-est" className="text-teal-300 font-bold">
                {estimatedCO2} kg CO₂
              </strong>
            </span>
          </div>
        </div>

        {/* Earn Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
            onClick={onOpenLogEcoModal}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:border-emerald-400 cursor-pointer"
            id="log-eco-activity-btn"
          >
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Log Eco Action</span>
          </button>

          <button
            onClick={onQuickEarnBonus}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 border border-emerald-400/40 hover:shadow-emerald-900/30 cursor-pointer"
            id="quick-earn-bonus-btn"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Log Bonus (+25 Credits)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
