import React, { useState } from 'react';
import { ECO_ACTIONS_CATALOG } from '../data';
import { LedgerEntry } from '../types';
import { X, Leaf, Sparkles, Bike, Sun, Recycle, Sprout, PlusCircle, Check } from 'lucide-react';

interface LogEcoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogSuccess: (creditsToAdd: number, ledgerEntry: Omit<LedgerEntry, 'id' | 'timestamp'>) => void;
}

const renderEcoIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bike':
      return <Bike className="w-5 h-5 text-emerald-400" />;
    case 'Sun':
      return <Sun className="w-5 h-5 text-amber-400" />;
    case 'Recycle':
      return <Recycle className="w-5 h-5 text-teal-400" />;
    case 'Sprout':
      return <Sprout className="w-5 h-5 text-emerald-300" />;
    default:
      return <Leaf className="w-5 h-5 text-emerald-400" />;
  }
};

export const LogEcoModal: React.FC<LogEcoModalProps> = ({ isOpen, onClose, onLogSuccess }) => {
  const [selectedActionId, setSelectedActionId] = useState<string>('ev-transit');
  const [customTitle, setCustomTitle] = useState('');
  const [customCredits, setCustomCredits] = useState('25');
  const [customCO2, setCustomCO2] = useState('2.5');
  const [isCustomMode, setIsCustomMode] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    let earnedCredits = 25;
    let title = '';
    let detail = '';

    if (isCustomMode) {
      const parsedCredits = parseInt(customCredits, 10) || 25;
      const parsedCO2 = parseFloat(customCO2) || 2.5;
      earnedCredits = parsedCredits;
      title = customTitle.trim() || 'Custom Eco Impact Action';
      detail = `Logged custom eco impact: ${earnedCredits} Credits earned • ${parsedCO2} kg CO₂ offset`;
    } else {
      const action = ECO_ACTIONS_CATALOG.find((a) => a.id === selectedActionId) || ECO_ACTIONS_CATALOG[0];
      earnedCredits = action.creditsEarned;
      title = action.name;
      detail = `${action.description} • ${action.co2SavedKg} kg CO₂ offset logged`;
    }

    onLogSuccess(earnedCredits, {
      title,
      cost: -earnedCredits, // negative cost indicates credit addition in ledger
      detail,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'earning',
      status: 'Verified',
      category: 'earning'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card bg-slate-950/95 max-w-lg w-full p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Log Eco Action & Earn Credits</h3>
            <p className="text-xs text-slate-400">Record everyday green activities to earn verified carbon credits.</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              !isCustomMode ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Preset Activities
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              isCustomMode ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Eco Log
          </button>
        </div>

        {!isCustomMode ? (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {ECO_ACTIONS_CATALOG.map((act) => {
              const isSelected = selectedActionId === act.id;
              return (
                <div
                  key={act.id}
                  onClick={() => setSelectedActionId(act.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                      {renderEcoIcon(act.iconName)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{act.name}</h4>
                      <p className="text-[11px] text-slate-400">{act.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-emerald-400 block">
                      +{act.creditsEarned} CR
                    </span>
                    <span className="text-[10px] text-teal-300">{act.co2SavedKg} kg CO₂</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Eco Activity Name:</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Installed Smart Home Thermostat / Carpooled"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Credits Earned:</label>
                <input
                  type="number"
                  value={customCredits}
                  onChange={(e) => setCustomCredits(e.target.value)}
                  placeholder="25"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">CO₂ Saved (kg):</label>
                <input
                  type="number"
                  value={customCO2}
                  onChange={(e) => setCustomCO2(e.target.value)}
                  placeholder="2.5"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
          id="submit-eco-log-btn"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Log Activity & Earn Credits</span>
        </button>
      </div>
    </div>
  );
};
