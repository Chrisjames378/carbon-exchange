import {
  MarketplaceOption,
  EcoActionOption,
  LedgerEntry,
  UserProfile,
  WeeklyChallenge,
  AchievementBadge,
  LearnArticle
} from './types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_882910',
  name: 'Alex Rivera',
  email: 'alex.rivera@atmosphere.eco',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  joinedDate: 'May 2026',
  level: 3,
  levelName: 'Eco Sentinel',
  xp: 420,
  nextLevelXp: 600,
  streakDays: 5,
  lastLoginDate: new Date().toISOString().split('T')[0],
  claimedDailyBonusToday: false,
  totalCO2SavedKg: 42.5,
  treesPlantedCount: 1
};

export const INITIAL_WEEKLY_CHALLENGES: WeeklyChallenge[] = [
  {
    id: 'quest-co2-10kg',
    title: 'Offset 10kg CO₂ This Week',
    description: 'Log zero-emission commutes or renewable solar activities totaling at least 10kg CO₂ saved.',
    targetValue: 10,
    currentValue: 6.5,
    unit: 'kg CO₂',
    rewardCredits: 45,
    isClaimed: false,
    iconName: 'TrendingDown',
    category: 'co2'
  },
  {
    id: 'quest-actions-3',
    title: 'Eco Activity Streak',
    description: 'Log at least 3 verified eco actions in your activity registry this week.',
    targetValue: 3,
    currentValue: 2,
    unit: 'actions',
    rewardCredits: 30,
    isClaimed: false,
    iconName: 'CheckCircle2',
    category: 'actions'
  },
  {
    id: 'quest-plant-tree',
    title: 'Forest Guardian',
    description: 'Redeem credits to plant 1 Native Tree seedling in a certified New Zealand reserve.',
    targetValue: 1,
    currentValue: 1,
    unit: 'tree',
    rewardCredits: 50,
    isClaimed: false,
    iconName: 'Trees',
    category: 'tree'
  },
  {
    id: 'quest-learn-article',
    title: 'Eco Scholar Quest',
    description: 'Read an educational article in the Atmosphere Learn Academy & answer the knowledge check.',
    targetValue: 1,
    currentValue: 0,
    unit: 'article',
    rewardCredits: 20,
    isClaimed: false,
    iconName: 'BookOpen',
    category: 'learn'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-first-tree',
    title: 'First Tree Planted',
    description: 'Funded your first Native Kauri / Totara tree seedling in New Zealand reserves.',
    iconName: 'Trees',
    unlocked: true,
    unlockedDate: 'Aug 02, 2026',
    progress: 1,
    maxProgress: 1,
    rewardCredits: 50,
    category: 'impact',
    isClaimed: true
  },
  {
    id: 'badge-1000-credits',
    title: '1,000 Credits Earned',
    description: 'Accumulated a total lifetime balance of 1,000 verified Atmosphere Carbon Credits.',
    iconName: 'Award',
    unlocked: false,
    progress: 325,
    maxProgress: 1000,
    rewardCredits: 100,
    category: 'impact',
    isClaimed: false
  },
  {
    id: 'badge-7day-streak',
    title: '7-Day Eco Streak',
    description: 'Logged into the Atmosphere platform and recorded activity for 7 consecutive days.',
    iconName: 'Zap',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    rewardCredits: 40,
    category: 'streak',
    isClaimed: false
  },
  {
    id: 'badge-cashout-champion',
    title: 'First Cash Payout',
    description: 'Successfully redeemed carbon credits for a PayPal fiat transfer or gift card.',
    iconName: 'Wallet',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardCredits: 35,
    category: 'redemption',
    isClaimed: false
  },
  {
    id: 'badge-master-scholar',
    title: 'Climate Mastermind',
    description: 'Completed all 4 foundational educational modules in the Learn Academy.',
    iconName: 'GraduationCap',
    unlocked: false,
    progress: 1,
    maxProgress: 4,
    rewardCredits: 60,
    category: 'learning',
    isClaimed: false
  }
];

export const INITIAL_LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'learn-carbon-credits-101',
    title: 'Demystifying Carbon Credits & Standards',
    subtitle: 'How Verra VCS & Gold Standard guarantee real, measurable climate impact.',
    category: 'Carbon Credits',
    readTime: '4 min read',
    author: 'Dr. Elena Rostova, Climate Economist',
    description: 'Learn how verified carbon credits represent one metric ton of greenhouse gas reduction and why registry standards are essential.',
    fullContent: [
      'A carbon credit is a measurable, verifiable certificate representing the prevention, reduction, or sequestration of one metric ton of carbon dioxide equivalent (CO₂e) from the Earth atmosphere.',
      'To prevent double-counting and greenwashing, independent registry standards like Verra (Verified Carbon Standard) and Gold Standard conduct rigorous third-party audits on every mitigation project.',
      'When you earn or redeem credits on Atmosphere Carbon Exchange, your micro-credits are backed by certified carbon retirement tokens. These ensure that every single credit redeemed translates directly into real, audited climate action.'
    ],
    keyTakeaways: [
      '1 Carbon Credit = 100g to 1,000kg CO₂ equivalent offset depending on scale.',
      'Verra & Gold Standard enforce strict additionality and permanence checks.',
      'Tokenized micro-credits enable everyday consumers to monetize individual sustainable choices.'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed frame link format
    videoDuration: '3:20 Video Overview',
    externalLink: {
      url: 'https://verra.org/programs/verified-carbon-standard/',
      name: 'Verra Verified Carbon Standard Official Site',
      source: 'verra.org'
    },
    rewardCredits: 15,
    isCompleted: false,
    quiz: {
      question: 'What does 1 official standard carbon credit represent in global climate registries?',
      options: [
        '10 kilograms of plastic waste removed',
        '1 metric ton of CO₂ equivalent prevented or sequestered',
        '1 megawatt hour of natural gas consumed',
        '1 native tree planted in a city park'
      ],
      correctIndex: 1,
      explanation: '1 official standard carbon credit equals 1 metric ton (1,000 kg) of CO₂e offset or prevented.'
    }
  },
  {
    id: 'learn-nz-native-trees',
    title: 'New Zealand Native Forests: Kauri, Totara & Kahikatea',
    subtitle: 'Why planting native trees in New Zealand creates resilient biodiversity & carbon sinks.',
    category: 'NZ Reforestation',
    readTime: '5 min read',
    author: 'Tane Mahuta Research Institute',
    description: 'Explore why endemic trees like Kauri, Totara, and Kahikatea store massive amounts of carbon over hundreds of years while restoring indigenous ecosystems.',
    fullContent: [
      'New Zealand native trees are legendary for their longevity and structural density. Species such as Kauri (Agathis australis), Totara (Podocarpus totara), and Kahikatea (Dacrycarpus dacrydioides) can live for over 1,000 years.',
      'Unlike exotic pine monocultures that are harvested every 25 years, native forests form permanent carbon sinks. They lock away atmospheric CO₂ in deep root networks, trunks, and forest canopy soils permanently.',
      'When you redeem 50 Carbon Credits on Atmosphere for a Native Tree, seedling nurseries in New Zealand plant and nurture native species in protected ecological reserves with GPS mapping and predator control.'
    ],
    keyTakeaways: [
      'Native NZ species lock away carbon for centuries rather than short-rotation pine cycles.',
      'Kauri and Totara build rich soil ecosystems that prevent soil erosion and river siltation.',
      'Trees That Count and NZ reserves track seedling survival rates with certified GPS coordinates.'
    ],
    externalLink: {
      url: 'https://www.treesthatcount.co.nz/',
      name: 'Trees That Count New Zealand Native Planting Registry',
      source: 'treesthatcount.co.nz'
    },
    rewardCredits: 20,
    isCompleted: false,
    quiz: {
      question: 'Why are native NZ species like Kauri and Totara superior long-term carbon sinks compared to pine monocultures?',
      options: [
        'They grow 10 times faster than any other tree in the world',
        'They form permanent, multi-century forests that are never clear-felled',
        'They do not require any water or sunlight to grow',
        'They emit oxygen directly into underground soil aquifers'
      ],
      correctIndex: 1,
      explanation: 'Native species live for centuries and form permanent ecological reserves that are never clear-cut for timber.'
    }
  },
  {
    id: 'learn-co2-emissions-impact',
    title: 'Understanding CO₂ Footprints: From Commutes to Micro-Offsets',
    subtitle: 'Quantifying daily emissions and how small behavioral shifts compound rapidly.',
    category: 'Climate Science',
    readTime: '3 min read',
    author: 'Atmosphere Research Team',
    description: 'Break down average daily greenhouse gas emissions from transport, energy usage, and food systems, and see how simple choices earn credits.',
    fullContent: [
      'The average global citizen generates approximately 4.5 metric tons of CO₂ per year. In developed nations like New Zealand and the US, that number reaches 10 to 15 tons per capita.',
      'A standard petrol car emits roughly 0.21 kg of CO₂ per kilometer driven. Swapping a 15 km daily drive for an electric bike or electric train removes 3.15 kg of CO₂ per day — equal to 31.5 Atmosphere Carbon Credits.',
      'Small, consistent daily habits build high-impact cumulative reductions over time. Gamification and micro-rewards make these daily choices tangible and financialized.'
    ],
    keyTakeaways: [
      'A petrol vehicle emits ~0.21 kg CO₂ per kilometer.',
      'Switching to public EV transit or cycling saves over 100 kg CO₂ per month.',
      'Atmosphere Carbon Exchange converts every kilogram of CO₂ saved into spendable credit balance.'
    ],
    externalLink: {
      url: 'https://www.ipcc.ch/report/ar6/syr/',
      name: 'IPCC Sixth Assessment Synthesis Report',
      source: 'ipcc.ch'
    },
    rewardCredits: 15,
    isCompleted: false,
    quiz: {
      question: 'Approximately how much CO₂ is emitted by a standard petrol passenger vehicle per kilometer?',
      options: [
        '0.02 kg CO₂ / km',
        '0.21 kg CO₂ / km',
        '2.10 kg CO₂ / km',
        '10.0 kg CO₂ / km'
      ],
      correctIndex: 1,
      explanation: 'Standard passenger petrol cars emit approximately 0.21 kg (210g) of CO₂ per kilometer.'
    }
  },
  {
    id: 'learn-monetizing-eco-impact',
    title: 'The Economics of Eco Impact: Turning Green Habits into Currency',
    subtitle: 'How decentralized carbon exchanges link consumer choices to real market liquidity.',
    category: 'Impact Economics',
    readTime: '4 min read',
    author: 'Marcus Vance, Fintech & Carbon Markets Lead',
    description: 'Discover how carbon trading platforms create financial liquidity for everyday eco actions, enabling cash payouts via PayPal and retail vouchers.',
    fullContent: [
      'Historically, voluntary carbon markets were restricted to massive corporate conglomerates buying bulk offsets from industrial wind farms.',
      'Atmosphere Carbon Exchange democratizes this asset class by aggregating micro-reductions from thousands of individuals into institutional-grade carbon pools.',
      'Corporate ESG buyers purchase verified carbon pools from Atmosphere, which generates the fiat liquidity backing your $10 PayPal payouts, Patagonia vouchers, and native tree plantings.'
    ],
    keyTakeaways: [
      'Micro-reductions are pooled into institutional carbon offset packages.',
      'Corporate ESG demand creates real cash liquidity for individual eco credits.',
      'Consumers receive direct cash, retail rewards, or environmental impact certificates.'
    ],
    externalLink: {
      url: 'https://www.goldstandard.org/',
      name: 'Gold Standard for the Global Goals Official Site',
      source: 'goldstandard.org'
    },
    rewardCredits: 20,
    isCompleted: false,
    quiz: {
      question: 'How does Atmosphere Carbon Exchange convert individual micro-credits into real PayPal cash payouts?',
      options: [
        'By printing new paper bank notes in local branches',
        'By pooling verified user reductions and selling ESG offset blocks to corporate buyers',
        'By charging high membership fees to all users',
        'By taking government subsidies from central banks'
      ],
      correctIndex: 1,
      explanation: 'Atmosphere pools micro-credits and sells institutional offset packages to corporate ESG buyers, generating fiat liquidity.'
    }
  }
];

export const INITIAL_MARKETPLACE_OPTIONS: MarketplaceOption[] = [
  {
    id: 'paypal-cash-5',
    title: '$5.00 PayPal Cash Deposit',
    category: 'cash',
    description: 'Instant micro cash payout transferred directly to your PayPal email account.',
    creditCost: 50,
    cashValueUSD: 5.00,
    iconName: 'Wallet',
    colorTheme: 'indigo',
    rateText: '50 Credits = $5.00 USD',
    badge: 'Quick Cash',
    redemptionType: 'paypal',
    detailsPlaceholder: 'user@paypal.com'
  },
  {
    id: 'paypal-cash-10',
    title: '$10.00 PayPal Cash Transfer',
    category: 'cash',
    description: 'Direct fiat currency cash payout sent directly to your verified PayPal account.',
    creditCost: 100,
    cashValueUSD: 10.00,
    iconName: 'Wallet',
    colorTheme: 'indigo',
    rateText: '100 Credits = $10.00 USD',
    badge: 'Most Popular',
    redemptionType: 'paypal',
    detailsPlaceholder: 'user@paypal.com'
  },
  {
    id: 'paypal-cash-25',
    title: '$25.00 PayPal Express Payout',
    category: 'cash',
    description: 'Higher volume cash payout deposited directly to your PayPal wallet.',
    creditCost: 250,
    cashValueUSD: 25.00,
    iconName: 'Wallet',
    colorTheme: 'indigo',
    rateText: '250 Credits = $25.00 USD',
    badge: 'High Value',
    redemptionType: 'paypal',
    detailsPlaceholder: 'user@paypal.com'
  },
  {
    id: 'paypal-cash-50',
    title: '$50.00 PayPal Pro Cash Vault',
    category: 'cash',
    description: 'Maximum tier cash transfer credited to your verified PayPal email account.',
    creditCost: 500,
    cashValueUSD: 50.00,
    iconName: 'Wallet',
    colorTheme: 'indigo',
    rateText: '500 Credits = $50.00 USD',
    badge: 'Pro Payout',
    redemptionType: 'paypal',
    detailsPlaceholder: 'user@paypal.com'
  },
  {
    id: 'plant-nz-trees',
    title: 'Plant NZ Native Trees',
    category: 'reforestation',
    description: 'Fund real Kauri, Totara & Kahikatea trees planted in certified New Zealand reserves.',
    creditCost: 50,
    iconName: 'Trees',
    colorTheme: 'emerald',
    rateText: '50 Credits = 1 Native Tree',
    badge: 'High Eco Impact',
    redemptionType: 'tree'
  },
  {
    id: 'eco-voucher',
    title: 'Eco Retail e-Gift Card',
    category: 'voucher',
    description: 'Redeem digital gift cards for sustainable partner brands (Patagonia, Allbirds, REI, Icebreaker).',
    creditCost: 150,
    cashValueUSD: 15.00,
    iconName: 'ShoppingBag',
    colorTheme: 'amber',
    rateText: '150 Credits = $15 Voucher',
    partnerBrand: 'Patagonia / Allbirds / REI',
    redemptionType: 'voucher'
  },
  {
    id: 'atmosphere-pro',
    title: 'Atmosphere Pro Month Pass',
    category: 'pro',
    description: 'Convert your credits into 1 Month of full Atmosphere Pro analytics & automated verification.',
    creditCost: 80,
    iconName: 'Crown',
    colorTheme: 'purple',
    rateText: '80 Credits = 1 Month Pro',
    badge: 'Best Value',
    redemptionType: 'pro'
  },
  {
    id: 'ocean-cleanup',
    title: 'Ocean Plastic Cleanup',
    category: 'impact',
    description: 'Intercept and remove 10 kilograms of ocean-bound waste from high-risk coastal watersheds.',
    creditCost: 120,
    iconName: 'Waves',
    colorTheme: 'cyan',
    rateText: '120 Credits = 10 kg Ocean Plastic',
    badge: 'Marine Protection',
    redemptionType: 'ocean'
  },
  {
    id: 'verra-offset-cert',
    title: 'Gold Standard CO₂ Offset',
    category: 'impact',
    description: 'Purchase an audited 200 kg CO₂ equivalent Gold Standard certified retirement token.',
    creditCost: 200,
    iconName: 'ShieldCheck',
    colorTheme: 'teal',
    rateText: '200 Credits = 200 kg Offset',
    badge: 'Verra Certified',
    redemptionType: 'certificate'
  }
];

export const ECO_ACTIONS_CATALOG: EcoActionOption[] = [
  {
    id: 'ev-transit',
    name: 'Electric / Bike Commute',
    description: 'Replaced a petrol vehicle commute with public electric transit, bicycle, or walking.',
    creditsEarned: 15,
    co2SavedKg: 1.5,
    iconName: 'Bike',
    category: 'commute'
  },
  {
    id: 'solar-energy',
    name: 'Rooftop Solar Output',
    description: 'Logged 10 kWh of clean renewable energy generation to the local grid.',
    creditsEarned: 30,
    co2SavedKg: 3.0,
    iconName: 'Sun',
    category: 'energy'
  },
  {
    id: 'zero-waste',
    name: 'Zero-Waste Recycling',
    description: 'Composted organic kitchen waste and diverted recyclables from municipal landfills.',
    creditsEarned: 10,
    co2SavedKg: 1.0,
    iconName: 'Recycle',
    category: 'recycling'
  },
  {
    id: 'native-planting',
    name: 'Urban Native Garden',
    description: 'Planted native flora and pollinator-friendly shrubs in an urban garden reserve.',
    creditsEarned: 25,
    co2SavedKg: 2.5,
    iconName: 'Sprout',
    category: 'conservation'
  }
];

export const INITIAL_LEDGER: LedgerEntry[] = [
  {
    id: 'ledg-101',
    title: 'Plant NZ Native Tree',
    cost: 50,
    detail: '1 Native Tree seedling registered in NZ Reserve (Kauri #NZ-8842)',
    date: 'Aug 02, 2026',
    timestamp: Date.now() - 86400000 * 7,
    type: 'redemption',
    certificateId: 'ATM-NZT-884219',
    status: 'Completed',
    category: 'reforestation'
  },
  {
    id: 'ledg-100',
    title: 'Weekly Carbon Reduction Bonus',
    cost: -50, // negative cost means earned credits
    detail: 'Log bonus earned for 7 consecutive days of zero-emission transit',
    date: 'Jul 28, 2026',
    timestamp: Date.now() - 86400000 * 12,
    type: 'bonus',
    status: 'Verified',
    category: 'bonus'
  }
];

