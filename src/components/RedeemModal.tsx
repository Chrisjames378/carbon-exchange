import React, { useState, useEffect } from 'react';
import { MarketplaceOption, LedgerEntry } from '../types';
import { X, CheckCircle2, AlertTriangle, Wallet, Trees, ShoppingBag, Crown, Waves, ShieldCheck } from 'lucide-react';

interface RedeemModalProps {
  isOpen: boolean;
  option: MarketplaceOption | null;
  userCredits: number;
  onClose: () => void;
  onConfirmRedeem: (entry: Omit<LedgerEntry, 'id' | 'timestamp'>) => void;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  isOpen,
  option,
  userCredits,
  onClose,
  onConfirmRedeem,
}) => {
  const [paypalEmail, setPaypalEmail] = useState('');
  const [treeRecipient, setTreeRecipient] = useState('');
  const [voucherBrand, setVoucherBrand] = useState('Patagonia');
  const [certRecipient, setCertRecipient] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPaypalEmail('');
      setTreeRecipient('');
      setVoucherBrand('Patagonia');
      setCertRecipient('');
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen || !option) return null;

  const canAfford = userCredits >= option.creditCost;
  const remainingCredits = userCredits - option.creditCost;

  const handleConfirm = () => {
    if (!canAfford) {
      setErrorMsg(`Insufficient credits. You need ${option.creditCost} credits, but currently have ${userCredits}.`);
      return;
    }

    let detail = 'Redemption request confirmed';
    const certId = `ATM-${option.redemptionType.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    if (option.redemptionType === 'paypal') {
      const email = paypalEmail.trim();
      if (!email || !email.includes('@')) {
        setErrorMsg('Please enter a valid PayPal account email address.');
        return;
      }
      detail = `Direct cash payout sent to ${email}`;
    } else if (option.redemptionType === 'tree') {
      const name = treeRecipient.trim() || 'New Zealand Reserve';
      detail = `1 Native Kauri/Totara tree seedling dedicated to ${name}`;
    } else if (option.redemptionType === 'voucher') {
      detail = `Digital $15 e-Gift Code for ${voucherBrand} generated`;
    } else if (option.redemptionType === 'pro') {
      detail = '1 Month Pro Pass activated for your Atmosphere account';
    } else if (option.redemptionType === 'ocean') {
      const name = certRecipient.trim() || 'Global Ocean Initiative';
      detail = `10 kg ocean waste removal verified in name of ${name}`;
    } else if (option.redemptionType === 'certificate') {
      const name = certRecipient.trim() || 'Atmosphere Member';
      detail = `200 kg Gold Standard CO₂ Offset certificate issued to ${name}`;
    }

    onConfirmRedeem({
      title: option.title,
      cost: option.creditCost,
      detail,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'redemption',
      certificateId: certId,
      status: 'Completed',
      category: option.category
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card bg-slate-950/95 max-w-md w-full p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{option.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Review your redemption parameter and verify credit balance.
          </p>
        </div>

        {/* Credit Math Box */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Your Current Balance:</span>
            <span className="font-bold text-emerald-400 text-sm">{userCredits} Credits</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Required Credits:</span>
            <span className="font-bold text-amber-400 text-sm">-{option.creditCost} Credits</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-medium">
            <span className="text-slate-300">Remaining Balance:</span>
            <span className={`font-extrabold ${canAfford ? 'text-teal-300' : 'text-rose-400'}`}>
              {remainingCredits} Credits
            </span>
          </div>
        </div>

        {/* Dynamic Inputs Based on Redemption Type */}
        {option.redemptionType === 'paypal' && (
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-300 font-semibold block">PayPal Account Email Address:</label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="user@paypal.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-all text-xs"
              autoFocus
            />
            <p className="text-[10px] text-slate-500">Funds usually deposit within 1-2 business hours.</p>
          </div>
        )}

        {option.redemptionType === 'tree' && (
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-300 font-semibold block">Dedicated Reserve Recipient (Optional):</label>
            <input
              type="text"
              value={treeRecipient}
              onChange={(e) => setTreeRecipient(e.target.value)}
              placeholder="e.g. Jane Doe / New Zealand Reforestation Reserve"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-all text-xs"
            />
            <p className="text-[10px] text-slate-500">Tree certificate will include GPS coordinates of reserve.</p>
          </div>
        )}

        {option.redemptionType === 'voucher' && (
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-300 font-semibold block">Select Eco Brand Partner:</label>
            <select
              value={voucherBrand}
              onChange={(e) => setVoucherBrand(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-all text-xs cursor-pointer"
            >
              <option value="Patagonia">Patagonia ($15 e-Voucher)</option>
              <option value="Allbirds">Allbirds ($15 e-Voucher)</option>
              <option value="REI Co-op">REI Co-op ($15 e-Voucher)</option>
              <option value="Icebreaker">Icebreaker NZ ($15 e-Voucher)</option>
            </select>
          </div>
        )}

        {(option.redemptionType === 'ocean' || option.redemptionType === 'certificate') && (
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-300 font-semibold block">Name on Official Certificate:</label>
            <input
              type="text"
              value={certRecipient}
              onChange={(e) => setCertRecipient(e.target.value)}
              placeholder="Full Name / Organization"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 transition-all text-xs"
            />
          </div>
        )}

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!canAfford}
          className={`w-full py-3.5 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
            canAfford
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
          id="confirm-redeem-btn"
        >
          <span>{canAfford ? 'Confirm & Redeem Now' : 'Insufficient Credit Balance'}</span>
        </button>

        <p className="text-[10px] text-center text-slate-500">
          Redemptions are verified in real-time and recorded in your permanent eco ledger.
        </p>
      </div>
    </div>
  );
};
