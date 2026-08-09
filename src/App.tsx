/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MarketplaceGrid } from './components/MarketplaceGrid';
import { LedgerSection } from './components/LedgerSection';
import { RedeemModal } from './components/RedeemModal';
import { LogEcoModal } from './components/LogEcoModal';
import { CertificateModal } from './components/CertificateModal';
import { AtmosphereProDashboard } from './components/AtmosphereProDashboard';
import { GamificationHub } from './components/GamificationHub';
import { LearnSection } from './components/LearnSection';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

import {
  INITIAL_MARKETPLACE_OPTIONS,
  INITIAL_LEDGER,
  DEFAULT_USER_PROFILE,
  INITIAL_WEEKLY_CHALLENGES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_LEARN_ARTICLES
} from './data';
import {
  AppView,
  MarketplaceOption,
  LedgerEntry,
  UserProfile,
  WeeklyChallenge,
  AchievementBadge,
  LearnArticle
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('exchange');

  // Load user profile from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // Load credits from localStorage or default to 125
  const [userCredits, setUserCredits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_credits');
      return saved !== null ? parseInt(saved, 10) : 125;
    } catch {
      return 125;
    }
  });

  // Load ledger from localStorage or default to INITIAL_LEDGER
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_ledger');
      return saved ? JSON.parse(saved) : INITIAL_LEDGER;
    } catch {
      return INITIAL_LEDGER;
    }
  });

  // Gamification state
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_challenges');
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_CHALLENGES;
    } catch {
      return INITIAL_WEEKLY_CHALLENGES;
    }
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Learn Articles state
  const [learnArticles, setLearnArticles] = useState<LearnArticle[]>(() => {
    try {
      const saved = localStorage.getItem('atmosphere_learn_articles');
      return saved ? JSON.parse(saved) : INITIAL_LEARN_ARTICLES;
    } catch {
      return INITIAL_LEARN_ARTICLES;
    }
  });

  // Modals state
  const [selectedOption, setSelectedOption] = useState<MarketplaceOption | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedCertEntry, setSelectedCertEntry] = useState<LedgerEntry | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atmosphere_credits', userCredits.toString());
      localStorage.setItem('atmosphere_ledger', JSON.stringify(ledger));
      localStorage.setItem('atmosphere_challenges', JSON.stringify(weeklyChallenges));
      localStorage.setItem('atmosphere_achievements', JSON.stringify(achievements));
      localStorage.setItem('atmosphere_learn_articles', JSON.stringify(learnArticles));
      if (userProfile) {
        localStorage.setItem('atmosphere_user_profile', JSON.stringify(userProfile));
      } else {
        localStorage.removeItem('atmosphere_user_profile');
      }
    } catch (e) {
      console.error('Failed to sync to localStorage:', e);
    }
  }, [userCredits, ledger, weeklyChallenges, achievements, learnArticles, userProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Auth Callbacks
  const handleAuthenticateUser = (newUser: UserProfile) => {
    setUserProfile(newUser);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const handleSignOutUser = () => {
    setUserProfile(null);
    setIsProfileModalOpen(false);
    showToast('Signed out successfully.');
  };

  // Gamification Handler: Claim Daily Bonus
  const handleClaimDailyBonus = () => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }
    if (userProfile.claimedDailyBonusToday) {
      showToast('Daily bonus already claimed today!');
      return;
    }

    const bonusCredits = 15;
    const newTotal = userCredits + bonusCredits;
    setUserCredits(newTotal);

    const bonusEntry: LedgerEntry = {
      id: `ledg-${Date.now()}`,
      title: 'Daily Eco Login Bonus (+15 CR)',
      cost: -bonusCredits,
      detail: `Daily login streak bonus for Day ${userProfile.streakDays + 1}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      type: 'bonus',
      status: 'Verified',
      category: 'bonus'
    };

    setLedger((prev) => [bonusEntry, ...prev]);

    // Update user streak & XP
    setUserProfile((prev) => {
      if (!prev) return prev;
      const newXp = prev.xp + 25;
      const leveledUp = newXp >= prev.nextLevelXp;

      return {
        ...prev,
        claimedDailyBonusToday: true,
        streakDays: prev.streakDays + 1,
        xp: leveledUp ? newXp - prev.nextLevelXp : newXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        levelName: leveledUp ? `Level ${prev.level + 1} Eco Champion` : prev.levelName,
        nextLevelXp: leveledUp ? prev.nextLevelXp + 200 : prev.nextLevelXp
      };
    });

    showToast('Daily Bonus Claimed! +15 Credits & +25 XP added!');
  };

  // Gamification Handler: Claim Weekly Challenge
  const handleClaimChallenge = (challengeId: string) => {
    const challenge = weeklyChallenges.find((c) => c.id === challengeId);
    if (!challenge || challenge.isClaimed) return;

    setUserCredits((prev) => prev + challenge.rewardCredits);

    const bonusEntry: LedgerEntry = {
      id: `ledg-${Date.now()}`,
      title: `Quest Completed: ${challenge.title}`,
      cost: -challenge.rewardCredits,
      detail: challenge.description,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      type: 'bonus',
      status: 'Verified',
      category: 'bonus'
    };

    setLedger((prev) => [bonusEntry, ...prev]);

    setWeeklyChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, isClaimed: true } : c))
    );

    // Update user XP
    setUserProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, xp: prev.xp + 50 };
    });

    showToast(`Quest Completed! +${challenge.rewardCredits} Credits awarded!`);
  };

  // Gamification Handler: Claim Achievement Badge
  const handleClaimAchievement = (achievementId: string) => {
    const badge = achievements.find((a) => a.id === achievementId);
    if (!badge || badge.isClaimed) return;

    setUserCredits((prev) => prev + badge.rewardCredits);

    const bonusEntry: LedgerEntry = {
      id: `ledg-${Date.now()}`,
      title: `Badge Unlocked: ${badge.title}`,
      cost: -badge.rewardCredits,
      detail: badge.description,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      type: 'bonus',
      status: 'Verified',
      category: 'bonus'
    };

    setLedger((prev) => [bonusEntry, ...prev]);

    setAchievements((prev) =>
      prev.map((a) => (a.id === achievementId ? { ...a, isClaimed: true } : a))
    );

    showToast(`Badge Bonus Claimed! +${badge.rewardCredits} Credits!`);
  };

  // Learn Section Handler: Complete Quiz
  const handleCompleteArticleQuiz = (articleId: string, rewardCredits: number) => {
    setLearnArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, isCompleted: true } : a))
    );

    setUserCredits((prev) => prev + rewardCredits);

    const bonusEntry: LedgerEntry = {
      id: `ledg-${Date.now()}`,
      title: 'Atmosphere Learn Module Quiz (+Credits)',
      cost: -rewardCredits,
      detail: 'Completed climate knowledge check module',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      type: 'bonus',
      status: 'Verified',
      category: 'bonus'
    };

    setLedger((prev) => [bonusEntry, ...prev]);

    // Update Scholar Challenge Progress
    setWeeklyChallenges((prev) =>
      prev.map((c) =>
        c.category === 'learn'
          ? { ...c, currentValue: Math.min(c.targetValue, c.currentValue + 1) }
          : c
      )
    );

    showToast(`Knowledge Check Passed! +${rewardCredits} Credits awarded!`);
  };

  // Quick Bonus +25
  const handleQuickEarnBonus = () => {
    const newTotal = userCredits + 25;
    setUserCredits(newTotal);

    const bonusEntry: LedgerEntry = {
      id: `ledg-${Date.now()}`,
      title: 'Eco Bonus Logged (+25 Credits)',
      cost: -25,
      detail: 'Quick bonus earned for verified eco impact',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      type: 'bonus',
      status: 'Verified',
      category: 'bonus'
    };

    setLedger((prev) => [bonusEntry, ...prev]);
    showToast('+25 Carbon Bonus Credits added to your balance!');
  };

  // Execute Redemption
  const handleConfirmRedeem = (entryData: Omit<LedgerEntry, 'id' | 'timestamp'>) => {
    const newEntry: LedgerEntry = {
      ...entryData,
      id: `ledg-${Date.now()}`,
      timestamp: Date.now()
    };

    setUserCredits((prev) => Math.max(0, prev - entryData.cost));
    setLedger((prev) => [newEntry, ...prev]);

    // Check if tree redemption to increment user treesPlantedCount & Forest Guardian quest
    if (entryData.category === 'reforestation') {
      setUserProfile((prev) => (prev ? { ...prev, treesPlantedCount: prev.treesPlantedCount + 1 } : prev));
      setWeeklyChallenges((prev) =>
        prev.map((c) => (c.category === 'tree' ? { ...c, currentValue: Math.min(c.targetValue, c.currentValue + 1) } : c))
      );
    }

    showToast(`Successfully redeemed "${entryData.title}"!`);
  };

  // Log Eco Action
  const handleLogSuccess = (creditsToAdd: number, entryData: Omit<LedgerEntry, 'id' | 'timestamp'>) => {
    const newEntry: LedgerEntry = {
      ...entryData,
      id: `ledg-${Date.now()}`,
      timestamp: Date.now()
    };

    setUserCredits((prev) => prev + creditsToAdd);
    setLedger((prev) => [newEntry, ...prev]);

    // Update challenge progress
    setWeeklyChallenges((prev) =>
      prev.map((c) => {
        if (c.category === 'actions') {
          return { ...c, currentValue: Math.min(c.targetValue, c.currentValue + 1) };
        }
        if (c.category === 'co2') {
          return { ...c, currentValue: Math.min(c.targetValue, c.currentValue + 2.5) };
        }
        return c;
      })
    );

    showToast(`+${creditsToAdd} Eco Credits logged & verified!`);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between min-h-screen max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 animate-in slide-in-from-top-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        totalCredits={userCredits}
        user={userProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Router */}
      {currentView === 'exchange' && (
        <main className="space-y-6 animate-in fade-in duration-200">
          <HeroBanner
            totalCredits={userCredits}
            onQuickEarnBonus={handleQuickEarnBonus}
            onOpenLogEcoModal={() => setIsLogModalOpen(true)}
          />

          <MarketplaceGrid
            options={INITIAL_MARKETPLACE_OPTIONS}
            userCredits={userCredits}
            onSelectOption={(option) => setSelectedOption(option)}
          />

          <LedgerSection
            ledger={ledger}
            onViewCertificate={(entry) => setSelectedCertEntry(entry)}
          />
        </main>
      )}

      {currentView === 'gamification' && (
        <main className="space-y-6 animate-in fade-in duration-200">
          <GamificationHub
            user={userProfile || DEFAULT_USER_PROFILE}
            challenges={weeklyChallenges}
            achievements={achievements}
            onClaimDailyBonus={handleClaimDailyBonus}
            onClaimChallenge={handleClaimChallenge}
            onClaimAchievement={handleClaimAchievement}
          />
        </main>
      )}

      {currentView === 'learn' && (
        <main className="space-y-6 animate-in fade-in duration-200">
          <LearnSection
            articles={learnArticles}
            onCompleteArticleQuiz={handleCompleteArticleQuiz}
          />
        </main>
      )}

      {currentView === 'pro' && (
        <AtmosphereProDashboard
          totalCredits={userCredits}
          onOpenExchange={() => setCurrentView('exchange')}
        />
      )}

      {/* Modals */}
      <RedeemModal
        isOpen={selectedOption !== null}
        option={selectedOption}
        userCredits={userCredits}
        onClose={() => setSelectedOption(null)}
        onConfirmRedeem={handleConfirmRedeem}
      />

      <LogEcoModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onLogSuccess={handleLogSuccess}
      />

      <CertificateModal
        isOpen={selectedCertEntry !== null}
        entry={selectedCertEntry}
        onClose={() => setSelectedCertEntry(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateUser}
      />

      {userProfile && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          user={userProfile}
          totalCredits={userCredits}
          onClose={() => setIsProfileModalOpen(false)}
          onSignOut={handleSignOutUser}
        />
      )}

      {/* Footer */}
      <footer className="mt-8 pt-4 text-center text-xs text-slate-400 border-t border-slate-800/80 space-y-1">
        <p className="font-semibold text-slate-300">
          Atmosphere Carbon Exchange & Marketplace • Verra & Gold Standard Compliant Credit Ledger
        </p>
        <p className="text-[11px] text-slate-500">
          All redemptions, payouts, and tree planting retirements are verified in real time on the global eco ledger.
        </p>
      </footer>
    </div>
  );
}

