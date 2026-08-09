import React from 'react';
import { LedgerEntry } from '../types';
import { X, ShieldCheck, Award, Printer, CheckCircle2, Trees, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  entry: LedgerEntry | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  entry,
  onClose
}) => {
  if (!isOpen || !entry) return null;

  const certId = entry.certificateId || `ATM-CERT-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-950 text-slate-100 max-w-lg w-full p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-2xl relative space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border border-emerald-500/30 p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 relative overflow-hidden space-y-5">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Award className="w-7 h-7" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-400">
              Atmosphere Global Eco Ledger
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase">
              Certificate of Eco Impact
            </h2>
            <p className="text-xs text-slate-400">Verra & Gold Standard Compliant Registry Token</p>
          </div>

          <div className="my-4 py-3 border-y border-emerald-500/20 text-center space-y-2">
            <p className="text-xs text-slate-400">This certifies that</p>
            <p className="text-base font-extrabold text-emerald-300 tracking-wide">
              {entry.detail.includes('sent to')
                ? entry.detail.split('sent to')[1].trim()
                : entry.detail.includes('issued to')
                ? entry.detail.split('issued to')[1].trim()
                : 'Verified Atmosphere Account Holder'}
            </p>
            <p className="text-xs text-slate-300">
              has officially retired / redeemed <strong className="text-amber-300">{Math.abs(entry.cost)} Carbon Credits</strong> for:
            </p>
            <p className="text-sm font-bold text-white bg-slate-900/80 py-2 px-3 rounded-xl border border-slate-800">
              {entry.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left text-[11px] bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">Certificate Serial:</span>
              <span className="font-mono font-bold text-emerald-400">{certId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Issuance Date:</span>
              <span className="font-bold text-slate-200">{entry.date}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Verification Registry:</span>
              <span className="font-semibold text-slate-300">Verra #VCS-99214</span>
            </div>
            <div>
              <span className="text-slate-500 block">Audit Status:</span>
              <span className="font-bold text-teal-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                Audited & Immutable
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Atmosphere Carbon Exchange
            </span>
            <span className="font-mono">Hash: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Close Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
