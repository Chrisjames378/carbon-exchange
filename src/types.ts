export type AppView = 'exchange' | 'pro' | 'gamification' | 'learn';

export type RedemptionType = 'paypal' | 'tree' | 'voucher' | 'pro' | 'ocean' | 'certificate';

export type OptionCategory = 'all' | 'cash' | 'reforestation' | 'voucher' | 'pro' | 'impact';

export interface MarketplaceOption {
  id: string;
  title: string;
  category: OptionCategory;
  description: string;
  creditCost: number;
  cashValueUSD?: number;
  iconName: string;
  colorTheme: 'indigo' | 'emerald' | 'amber' | 'purple' | 'cyan' | 'teal';
  rateText: string;
  badge?: string;
  redemptionType: RedemptionType;
  detailsPlaceholder?: string;
  partnerBrand?: string;
}

export interface LedgerEntry {
  id: string;
  title: string;
  cost: number;
  detail: string;
  date: string;
  timestamp: number;
  type: 'redemption' | 'earning' | 'bonus';
  certificateId?: string;
  status: 'Completed' | 'Processing' | 'Verified';
  category?: string;
}

export interface EcoActionOption {
  id: string;
  name: string;
  description: string;
  creditsEarned: number;
  co2SavedKg: number;
  iconName: string;
  category: 'commute' | 'energy' | 'recycling' | 'conservation';
}

// User Profile & Auth
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  level: number;
  levelName: string;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  lastLoginDate: string; // YYYY-MM-DD
  claimedDailyBonusToday: boolean;
  totalCO2SavedKg: number;
  treesPlantedCount: number;
}

// Gamification
export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  rewardCredits: number;
  isClaimed: boolean;
  iconName: string;
  category: 'co2' | 'actions' | 'tree' | 'learn';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  rewardCredits: number;
  category: 'impact' | 'streak' | 'redemption' | 'learning';
  isClaimed?: boolean;
}

// Learn & Education
export interface LearnArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Carbon Credits' | 'NZ Reforestation' | 'Climate Science' | 'Impact Economics';
  readTime: string;
  author: string;
  description: string;
  fullContent: string[];
  keyTakeaways: string[];
  videoUrl?: string;
  videoDuration?: string;
  externalLink: {
    url: string;
    name: string;
    source: string;
  };
  rewardCredits: number;
  isCompleted?: boolean;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

