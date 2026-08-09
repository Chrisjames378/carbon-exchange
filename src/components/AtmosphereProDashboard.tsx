import React, { useState } from 'react';
import {
  Activity,
  Zap,
  TrendingDown,
  ShieldCheck,
  Coins,
  ArrowRight,
  Gauge,
  Sparkles,
  BarChart3,
  Globe,
  Radio,
  CheckCircle2,
  Leaf
} from 'lucide-react';

interface AtmosphereProDashboardProps {
  totalCredits: number;
  onOpenExchange: () => void;
}

export const AtmosphereProDashboard: React.FC<AtmosphereProDashboardProps> = ({
  totalCredits,
  onOpenExchange
}) => {
  const [transitKm, setTransitKm] = useState('45');
  const [solarKwh, setSolarKwh] = useState('120');

  const calcCO2 = (parseFloat(transitKm) || 0) * 0.21 + (parseFloat(solarKwh) || 0) * 0.45;
  const calcCredits = Math.round(calcCO2 * 2);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Atmosphere Pro Hero */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                Atmosphere Pro Platform
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v3.4 Live Telemetry
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Eco Impact & Carbon Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track carbon footprint reductions across smart meters, electric fleets, and solar arrays. Convert verified reductions into monetization credits.
            </p>
          </div>

          <button
            onClick={onOpenExchange}
            className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 border border-emerald-400/30 shrink-0 cursor-pointer"
            id="go-to-exchange-hero-btn"
          >
            <Coins className="w-4.5 h-4.5 text-amber-300" />
            <span>Open Carbon Exchange Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pro Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Monthly CO₂ Avoided</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">412.5 kg</div>
          <p className="text-[11px] text-emerald-400 font-semibold">+18% vs last month</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Exchangeable Credits</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">{totalCredits} CR</div>
          <p className="text-[11px] text-slate-400 font-medium">Value: ~${(totalCredits * 0.10).toFixed(2)} USD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Verified IoT Sensors</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">4 Connected</div>
          <p className="text-[11px] text-teal-300 font-medium">Smart Meter & EV Fleet</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Verification Rating</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">Gold Standard</div>
          <p className="text-[11px] text-slate-400 font-medium">Verra Compliant Node</p>
        </div>
      </div>

      {/* Carbon Reduction Calculator & Live Sensor Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Carbon Calculator */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Carbon Impact Estimator</h3>
          </div>

          <p className="text-xs text-slate-400">
            Estimate your monthly credit earnings based on transit savings and clean energy generation.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">EV / Bike Transit (km/month):</label>
              <input
                type="number"
                value={transitKm}
                onChange={(e) => setTransitKm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Solar Output (kWh/month):</label>
              <input
                type="number"
                value={solarKwh}
                onChange={(e) => setSolarKwh(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">CO₂ Avoided:</span>
              <span className="font-bold text-emerald-400">{calcCO2.toFixed(1)} kg CO₂</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Monthly Credits:</span>
              <span className="font-bold text-amber-300">+{calcCredits} Credits</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
              <span className="text-slate-300">Estimated Value:</span>
              <span className="font-bold text-teal-300">${(calcCredits * 0.10).toFixed(2)} USD</span>
            </div>
          </div>

          <button
            onClick={onOpenExchange}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-300" />
            <span>Monetize Saved Credits Now</span>
          </button>
        </div>

        {/* Live Telemetry Feed */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-white text-base">Verified Sensor Registry</h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All Systems Operational
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Smart Meter Solar Inverter #INV-92</h4>
                  <p className="text-xs text-slate-400">Active generation: 4.2 kW • Verified grid output</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
                +12 CR / Day
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Electric Commute Telemetry Node</h4>
                  <p className="text-xs text-slate-400">Zero-emission transit sync via mobile GPS</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-teal-500/10 text-teal-300 text-xs font-bold rounded-lg border border-teal-500/30">
                +15 CR / Trip
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Home Compost & Waste Diversion</h4>
                  <p className="text-xs text-slate-400">Organic landfill diversion log</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30">
                +10 CR / Week
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
