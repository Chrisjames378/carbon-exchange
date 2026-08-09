import React from 'react';
import { UserProfile, WeeklyChallenge, AchievementBadge } from '../types';
import {
  Trophy,
  Zap,
  Calendar,
  CheckCircle2,
  Lock,
  Award,
  Sparkles,
  TrendingDown,
  Trees,
  BookOpen,
  Wallet,
  GraduationCap,
  Flame,
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface GamificationHubProps {
  user: UserProfile;
  challenges: WeeklyChallenge[];
  achievements: AchievementBadge[];
  onClaimDailyBonus: () => void;
  onClaimChallenge: (challengeId: string) => void;
  onClaimAchievement: (achievementId: string) => void;
}

const renderChallengeIcon = (iconName: string) => {
  switch (iconName) {
    case 'TrendingDown':
      return <TrendingDown className="w-5 h-5 text-emerald-400" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="w-5 h-5 text-teal-400" />;
    case 'Trees':
      return <Trees className="w-5 h-5 text-emerald-400" />;
    case 'BookOpen':
      return <BookOpen className="w-5 h-5 text-amber-400" />;
    default:
      return <Trophy className="w-5 h-5 text-emerald-400" />;
  }
};

const renderBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Trees':
      return <Trees className="w-6 h-6 text-emerald-400" />;
    case 'Award':
      return <Award className="w-6 h-6 text-amber-400" />;
    case 'Zap':
      return <Zap className="w-6 h-6 text-amber-300" />;
    case 'Wallet':
      return <Wallet className="w-6 h-6 text-indigo-400" />;
    case 'GraduationCap':
      return <GraduationCap className="w-6 h-6 text-purple-400" />;
    default:
      return <Star className="w-6 h-6 text-emerald-400" />;
  }
};

export const GamificationHub: React.FC<GamificationHubProps> = ({
  user,
  challenges,
  achievements,
  onClaimDailyBonus,
  onClaimChallenge,
  onClaimAchievement
}) => {
  const levelProgress = Math.min(100, Math.round((user.xp / user.nextLevelXp) * 100));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Gamification Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Eco Quests & Gamification
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {user.streakDays}-Day Active Streak
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Earn Bonus Credits & Level Up
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete weekly carbon offset quests, maintain your daily activity streak, and unlock achievement badges to earn extra carbon credits.
            </p>

            {/* Level & XP Progress Bar */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-amber-300 flex items-center gap-1">
                  Level {user.level}: {user.levelName}
                </span>
                <span className="text-slate-400">{user.xp} / {user.nextLevelXp} XP</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Daily Login Card */}
          <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-slate-900/90 w-full lg:w-72 space-y-3 text-center shrink-0">
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Daily Eco Login Bonus</h3>
              <p className="text-[11px] text-slate-400">Log in daily to maintain your streak multiplier.</p>
            </div>

            {user.claimedDailyBonusToday ? (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bonus Claimed Today (+15 CR)</span>
              </div>
            ) : (
              <button
                onClick={onClaimDailyBonus}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                id="claim-daily-bonus-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim +15 Bonus Credits</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Challenges & Quests */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Weekly Challenges & Eco Quests
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete these 7-day targets to claim immediate bonus carbon credits.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
            Resets in 3 days
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((quest) => {
            const isCompleted = quest.currentValue >= quest.targetValue;
            const progressPct = Math.min(100, Math.round((quest.currentValue / quest.targetValue) * 100));

            return (
              <div
                key={quest.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/30 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                        {renderChallengeIcon(quest.iconName)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{quest.title}</h4>
                        <p className="text-xs text-slate-400">{quest.description}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                      +{quest.rewardCredits} CR
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-emerald-400">
                        {quest.currentValue} / {quest.targetValue} {quest.unit}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 p-0.5">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {quest.isClaimed ? (
                    <button
                      disabled
                      className="w-full py-2 bg-slate-900 border border-slate-800 text-slate-500 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Reward Claimed</span>
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => onClaimChallenge(quest.id)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Claim +{quest.rewardCredits} Credits</span>
                    </button>
                  ) : (
                    <div className="w-full py-2 bg-slate-900/60 border border-slate-800/80 text-slate-400 font-semibold text-xs rounded-xl text-center">
                      In Progress ({progressPct}%)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievement Badges Showcase */}
      <section className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Milestone Achievement Badges
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Unlock permanent badges by demonstrating consistent environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {achievements.map((badge) => {
            const isUnlocked = badge.unlocked;
            const progressPct = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 relative overflow-hidden transition-all ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-950/60 border-slate-800 opacity-75'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isUnlocked
                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {renderBadgeIcon(badge.iconName)}
                    </div>
                    {isUnlocked ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Unlocked
                      </span>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-white">{badge.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Target</span>
                    <span className="font-bold text-slate-200">
                      {badge.progress}/{badge.maxProgress}
                    </span>
                  </div>

                  {isUnlocked && !badge.isClaimed ? (
                    <button
                      onClick={() => onClaimAchievement(badge.id)}
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Claim +{badge.rewardCredits} CR</span>
                    </button>
                  ) : isUnlocked && badge.isClaimed ? (
                    <span className="text-[10px] text-emerald-400 font-semibold block text-center">
                      ✓ Claimed +{badge.rewardCredits} CR
                    </span>
                  ) : (
                    <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-800">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
