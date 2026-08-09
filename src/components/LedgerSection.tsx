import React, { useState } from 'react';
import { LedgerEntry } from '../types';
import { Receipt, Search, Download, Award, CheckCircle2, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';

interface LedgerSectionProps {
  ledger: LedgerEntry[];
  onViewCertificate: (entry: LedgerEntry) => void;
}

export const LedgerSection: React.FC<LedgerSectionProps> = ({ ledger, onViewCertificate }) => {
  const [filterType, setFilterType] = useState<'all' | 'redemption' | 'earning'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLedger = ledger.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Title', 'Detail', 'Credits Change', 'Status', 'Certificate ID'];
    const rows = ledger.map((item) => [
      item.id,
      item.date,
      item.type,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.detail.replace(/"/g, '""')}"`,
      item.cost > 0 ? `-${item.cost}` : `+${Math.abs(item.cost)}`,
      item.status,
      item.certificateId || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `atmosphere_eco_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-400" />
            Cash-Out Ledger & Impact History
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Verra & Gold Standard compliant immutable record of earned and redeemed eco credits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            title="Download CSV Statement"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFilterType('redemption')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            filterType === 'redemption'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Redemptions & Cash Outs
        </button>
        <button
          onClick={() => setFilterType('earning')}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            filterType === 'earning'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Earned Eco Credits
        </button>
      </div>

      {/* Ledger List */}
      <div id="ledger-list" className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {filteredLedger.length === 0 ? (
          <p className="text-slate-400 italic text-xs py-4 text-center bg-slate-900/40 rounded-xl border border-slate-800">
            No history logged yet. Choose an option above to redeem or earn credits.
          </p>
        ) : (
          filteredLedger.map((entry) => {
            const isRedemption = entry.cost > 0;
            return (
              <div
                key={entry.id}
                className="bg-slate-900/60 hover:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/90 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      isRedemption
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {isRedemption ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-slate-100">{entry.title}</p>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">{entry.detail}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{entry.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {entry.certificateId && (
                    <button
                      onClick={() => onViewCertificate(entry)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 text-[11px] font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>Certificate</span>
                    </button>
                  )}

                  <span
                    className={`font-black text-sm tracking-tight ${
                      isRedemption ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {isRedemption ? `-${entry.cost}` : `+${Math.abs(entry.cost)}`} Credits
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
