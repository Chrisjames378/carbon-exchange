import React, { useState } from 'react';
import { MarketplaceOption, OptionCategory } from '../types';
import {
  Wallet,
  Trees,
  ShoppingBag,
  Crown,
  Waves,
  ShieldCheck,
  Store,
  Search,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface MarketplaceGridProps {
  options: MarketplaceOption[];
  userCredits: number;
  onSelectOption: (option: MarketplaceOption) => void;
}

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'Wallet':
      return <Wallet className="w-6 h-6" />;
    case 'Trees':
      return <Trees className="w-6 h-6" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-6 h-6" />;
    case 'Crown':
      return <Crown className="w-6 h-6" />;
    case 'Waves':
      return <Waves className="w-6 h-6" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-6 h-6" />;
    default:
      return <Store className="w-6 h-6" />;
  }
};

const getThemeClasses = (theme: MarketplaceOption['colorTheme']) => {
  switch (theme) {
    case 'indigo':
      return {
        bgIcon: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        textRate: 'text-indigo-300',
        btnBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
        borderHover: 'hover:border-indigo-500/50',
        badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      };
    case 'emerald':
      return {
        bgIcon: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        textRate: 'text-emerald-300',
        btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
        borderHover: 'hover:border-emerald-500/50',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      };
    case 'amber':
      return {
        bgIcon: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        textRate: 'text-amber-300',
        btnBg: 'bg-amber-600 hover:bg-amber-500 text-white',
        borderHover: 'hover:border-amber-500/50',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };
    case 'purple':
      return {
        bgIcon: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        textRate: 'text-purple-300',
        btnBg: 'bg-purple-600 hover:bg-purple-500 text-white',
        borderHover: 'hover:border-purple-500/50',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      };
    case 'cyan':
      return {
        bgIcon: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        textRate: 'text-cyan-300',
        btnBg: 'bg-cyan-600 hover:bg-cyan-500 text-white',
        borderHover: 'hover:border-cyan-500/50',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      };
    case 'teal':
    default:
      return {
        bgIcon: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
        textRate: 'text-teal-300',
        btnBg: 'bg-teal-600 hover:bg-teal-500 text-white',
        borderHover: 'hover:border-teal-500/50',
        badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
      };
  }
};

export const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  options,
  userCredits,
  onSelectOption
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OptionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: OptionCategory; label: string }[] = [
    { key: 'all', label: 'All Offers' },
    { key: 'cash', label: 'Cash Out' },
    { key: 'reforestation', label: 'Reforestation' },
    { key: 'voucher', label: 'Gift Cards' },
    { key: 'pro', label: 'Pro Memberships' },
    { key: 'impact', label: 'Climate Impact' }
  ];

  const filteredOptions = options.filter(opt => {
    const matchesCategory = selectedCategory === 'all' || opt.category === selectedCategory;
    const matchesSearch =
      opt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            Cash-In & Redemption Marketplace
          </h2>
          <p className="text-xs text-slate-400">
            Convert your climate credits directly into cash, native forest trees, e-vouchers, or certificates.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search redemption options..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 border border-emerald-400/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredOptions.length === 0 ? (
          <div className="col-span-full glass-card p-8 rounded-2xl text-center space-y-2 border border-slate-800">
            <p className="text-sm font-semibold text-slate-300">No matching redemption offers found</p>
            <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          filteredOptions.map((opt) => {
            const theme = getThemeClasses(opt.colorTheme);
            const canAfford = userCredits >= opt.creditCost;

            return (
              <div
                key={opt.id}
                className={`glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800/80 ${theme.borderHover} glass-card-hover relative group`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className={`p-3 rounded-xl border ${theme.bgIcon} shadow-sm`}>
                      {renderIcon(opt.iconName)}
                    </div>
                    {opt.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${theme.badgeBg}`}>
                        {opt.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Rate:</span>
                    <span className={`font-semibold ${theme.textRate}`}>{opt.rateText}</span>
                  </div>

                  <button
                    onClick={() => onSelectOption(opt)}
                    className={`w-full py-2.5 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${theme.btnBg}`}
                    id={`redeem-btn-${opt.id}`}
                  >
                    <span>Redeem {opt.creditCost} Credits</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
