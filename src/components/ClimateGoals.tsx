import React, { useState } from 'react';
import { ClimateGoal, GoalTimeframe } from '../types';
import {
  Target,
  Plus,
  Calendar,
  CheckCircle2,
  Trash2,
  Flame,
  TrendingUp,
  Award,
  Bike,
  Zap,
  Sprout,
  Leaf,
  Filter,
  Sparkles,
  ChevronRight,
  BarChart3,
  X,
  Edit3
} from 'lucide-react';

interface ClimateGoalsProps {
  goals: ClimateGoal[];
  onAddGoal: (goal: Omit<ClimateGoal, 'id' | 'createdAt' | 'isCompleted'>) => void;
  onUpdateGoalProgress: (goalId: string, addedAmount: number) => void;
  onDeleteGoal: (goalId: string) => void;
  onClaimGoalReward: (goal: ClimateGoal) => void;
}

export const ClimateGoals: React.FC<ClimateGoalsProps> = ({
  goals,
  onAddGoal,
  onUpdateGoalProgress,
  onDeleteGoal,
  onClaimGoalReward
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | GoalTimeframe>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logProgressGoal, setLogProgressGoal] = useState<ClimateGoal | null>(null);
  const [logAmount, setLogAmount] = useState<string>('1.0');

  // Form state for creating a new goal
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTimeframe, setNewTimeframe] = useState<GoalTimeframe>('weekly');
  const [newTargetValue, setNewTargetValue] = useState<string>('20.0');
  const [newUnit, setNewUnit] = useState('kg CO₂');
  const [newCategory, setNewCategory] = useState<ClimateGoal['category']>('co2');

  // Filtered goals
  const filteredGoals = goals.filter((g) => {
    if (activeFilter === 'all') return true;
    return g.timeframe === activeFilter;
  });

  // Calculate high-level summary metrics
  const activeGoalsCount = goals.filter((g) => !g.isCompleted).length;
  const completedGoalsCount = goals.filter((g) => g.isCompleted).length;

  const co2Goals = goals.filter((g) => g.unit === 'kg CO₂');
  const totalCO2Target = co2Goals.reduce((sum, g) => sum + g.targetValue, 0);
  const totalCO2Achieved = co2Goals.reduce((sum, g) => sum + Math.min(g.currentValue, g.targetValue), 0);
  const overallCO2Percent = totalCO2Target > 0 ? Math.min(100, Math.round((totalCO2Achieved / totalCO2Target) * 100)) : 0;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTargetValue || parseFloat(newTargetValue) <= 0) return;

    const targetVal = parseFloat(newTargetValue);
    const estimatedReward = Math.round(targetVal * (newTimeframe === 'daily' ? 5 : newTimeframe === 'weekly' ? 3 : 2));

    onAddGoal({
      title: newTitle.trim(),
      description: newDescription.trim() || `Track your ${newTimeframe} target for ${newTitle.trim()}.`,
      timeframe: newTimeframe,
      targetValue: targetVal,
      currentValue: 0,
      unit: newUnit,
      category: newCategory,
      rewardCredits: Math.max(10, estimatedReward)
    });

    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewTargetValue('20.0');
    setIsModalOpen(false);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logProgressGoal || !logAmount || parseFloat(logAmount) <= 0) return;
    onUpdateGoalProgress(logProgressGoal.id, parseFloat(logAmount));
    setLogProgressGoal(null);
    setLogAmount('1.0');
  };

  const getCategoryIcon = (category: ClimateGoal['category']) => {
    switch (category) {
      case 'commute':
        return <Bike className="w-5 h-5 text-emerald-400" />;
      case 'energy':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'trees':
        return <Sprout className="w-5 h-5 text-teal-400" />;
      case 'co2':
        return <Leaf className="w-5 h-5 text-cyan-400" />;
      default:
        return <Target className="w-5 h-5 text-purple-400" />;
    }
  };

  const getTimeframeBadge = (timeframe: GoalTimeframe) => {
    switch (timeframe) {
      case 'daily':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Daily
          </span>
        );
      case 'weekly':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Weekly
          </span>
        );
      case 'monthly':
        return (
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Monthly
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Climate Targets
              </span>
              <span className="text-xs text-slate-400 font-medium">• Personal Carbon Footprint Tracker</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Climate Reduction Goals
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Set actionable daily, weekly, or monthly carbon footprint targets. Track progress with visual indicators and earn Eco Credits upon goal completion.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-900/30 border border-emerald-400/30 flex items-center gap-2 transition-all cursor-pointer shrink-0"
            id="btn-create-climate-goal"
          >
            <Plus className="w-4 h-4" />
            <span>Set New Climate Goal</span>
          </button>
        </div>

        {/* Stats Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Active Goals</p>
              <p className="text-lg font-black text-white">{activeGoalsCount}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="w-full min-w-0">
              <p className="text-[10px] text-slate-400 uppercase font-bold">CO₂ Target Completion</p>
              <p className="text-lg font-black text-cyan-300">{overallCO2Percent}%</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total CO₂ Saved</p>
              <p className="text-lg font-black text-white">
                {totalCO2Achieved.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ {totalCO2Target.toFixed(1)} kg</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Completed Goals</p>
              <p className="text-lg font-black text-amber-300">{completedGoalsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {(['all', 'daily', 'weekly', 'monthly'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveFilter(tf)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tf
                  ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tf === 'all' ? 'All Goals' : `${tf} Goals`}
            </button>
          ))}
        </div>

        {/* Quick Preset Add Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden lg:inline text-[11px]">Quick presets:</span>
          <button
            onClick={() =>
              onAddGoal({
                title: 'Daily Commute - Zero Emission',
                description: 'Walk or bike for daily commute to avoid vehicle emissions.',
                timeframe: 'daily',
                targetValue: 4.0,
                currentValue: 0,
                unit: 'kg CO₂',
                category: 'commute',
                rewardCredits: 20
              })
            }
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-3 h-3" /> Daily Commute
          </button>
          <button
            onClick={() =>
              onAddGoal({
                title: 'Weekly 30kg CO₂ Offset',
                description: 'Achieve 30kg CO2 emissions reduction this week.',
                timeframe: 'weekly',
                targetValue: 30.0,
                currentValue: 0,
                unit: 'kg CO₂',
                category: 'co2',
                rewardCredits: 60
              })
            }
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-3 h-3" /> Weekly 30kg Goal
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      {filteredGoals.length === 0 ? (
        <div className="glass-card p-10 rounded-3xl border border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-500 mx-auto">
            <Target className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No climate goals found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You don't have any goals in the "{activeFilter}" timeframe yet. Create a custom climate goal to start tracking your reduction progress!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Set Climate Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGoals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
            const isCompleted = goal.isCompleted || goal.currentValue >= goal.targetValue;

            return (
              <div
                key={goal.id}
                className={`glass-card p-5 rounded-2xl border transition-all relative flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-950/90 shadow-lg shadow-emerald-950/20'
                    : 'border-white/10 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                {/* Card Top */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-sm leading-tight">{goal.title}</h4>
                        <span className="text-[10px] text-slate-400 block capitalize">{goal.category} Target</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getTimeframeBadge(goal.timeframe)}
                      <button
                        onClick={() => onDeleteGoal(goal.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-all cursor-pointer"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {goal.description && (
                    <p className="text-xs text-slate-300 line-clamp-2">{goal.description}</p>
                  )}
                </div>

                {/* Progress Bar Section */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">
                      Progress: <strong className="text-white font-black">{goal.currentValue.toFixed(1)}</strong> / {goal.targetValue.toFixed(1)} {goal.unit}
                    </span>
                    <span
                      className={`text-xs font-black ${
                        isCompleted ? 'text-emerald-400' : percent > 50 ? 'text-teal-300' : 'text-slate-300'
                      }`}
                    >
                      {percent}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 relative ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/50'
                          : percent > 60
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                          : 'bg-gradient-to-r from-cyan-600 to-emerald-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between pt-2">
                  {goal.rewardCredits && (
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Reward: +{goal.rewardCredits} Credits
                    </span>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    {!isCompleted ? (
                      <button
                        onClick={() => {
                          setLogProgressGoal(goal);
                          setLogAmount('1.0');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Log Progress
                      </button>
                    ) : (
                      <button
                        onClick={() => onClaimGoalReward(goal)}
                        disabled={goal.isCompleted}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                          goal.isCompleted
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {goal.isCompleted ? 'Target Achieved!' : 'Claim Goal Reward'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Create New Climate Goal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create New Climate Goal</h3>
                <p className="text-xs text-slate-400">Set a carbon reduction target and timeframe</p>
              </div>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Save 20kg CO₂ Commute"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Timeframe *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((tf) => (
                    <button
                      type="button"
                      key={tf}
                      onClick={() => setNewTimeframe(tf)}
                      className={`p-2.5 rounded-xl font-bold capitalize text-center border transition-all cursor-pointer ${
                        newTimeframe === tf
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Reduction *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    required
                    value={newTargetValue}
                    onChange={(e) => setNewTargetValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Unit *</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  >
                    <option value="kg CO₂">kg CO₂ Saved</option>
                    <option value="Trees">Trees Planted</option>
                    <option value="Eco Credits">Eco Credits Earned</option>
                    <option value="Actions">Eco Actions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ClimateGoal['category'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="co2">General Carbon Reduction (CO₂)</option>
                  <option value="commute">Green Commute & Transit</option>
                  <option value="energy">Renewable Energy Conservation</option>
                  <option value="trees">Trees & Reforestation</option>
                  <option value="general">Sustainable Living</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your motivation or specific strategy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Save Climate Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Log Progress toward a Goal */}
      {logProgressGoal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setLogProgressGoal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Log Progress</h3>
                <p className="text-xs text-slate-400">{logProgressGoal.title}</p>
              </div>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Amount to Add ({logProgressGoal.unit}) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  autoFocus
                  value={logAmount}
                  onChange={(e) => setLogAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-base font-bold focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Current: {logProgressGoal.currentValue} / {logProgressGoal.targetValue} {logProgressGoal.unit}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLogProgressGoal(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Update Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
