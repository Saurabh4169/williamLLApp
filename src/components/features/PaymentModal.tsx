import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Building,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import PhonePortal from '../ui/PhonePortal';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  itemTitle: string;
  itemCode?: string;
  amount: number;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  title = 'Payment & Checkout',
  itemTitle,
  itemCode,
  amount,
  onSuccess,
}) => {
  const { showToast, user } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'ach'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8912');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('842');
  const [cardName, setCardName] = useState(user.name || 'Alex Sterling');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#323232', '#191919', '#A4B3BE', '#C0D0E1', '#FEFEFE'],
        });
      } catch {
        // fallback
      }

      showToast(`Payment successful! $${amount.toFixed(2)} confirmed.`);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    }, 800);
  };

  return (
    <PhonePortal>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="w-full max-w-[360px] max-h-[92%] overflow-y-auto no-scrollbar rounded-[26px] bg-[#FAFBFC] dark:bg-[#18181A] border border-white/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col p-4 sm:p-5 space-y-4"
          style={{
            boxShadow: '0 25px 50px -12px rgba(25, 25, 25, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.95) inset',
          }}
        >
        {/* Header with back arrow, title, and close button */}
        <div className="flex items-center justify-between pb-2 border-b border-[#D8D8D8]/70">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/90 border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <h3 className="font-heading text-sm font-bold text-[#191919]">
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-[#82807A] hover:text-[#191919] flex items-center justify-center active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Notice Banner (Mandatory as per instructions) */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-900 font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Demo only. No real payment is taken.</span>
        </div>

        {/* Order Summary Card */}
        <div className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] block">
            Order Summary
          </span>

          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-heading text-xs font-bold text-[#191919]">
                {itemTitle}
              </h4>
              {itemCode && (
                <span className="text-[10px] font-mono text-[#82807A] mt-0.5 block">
                  Reference: {itemCode}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#82807A] block">Total Amount</span>
              <span className="font-heading text-base font-extrabold text-[#191919]">
                ${amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] px-0.5 block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'card' as const, label: 'Card', icon: CreditCard },
              { id: 'apple' as const, label: 'Apple Pay', icon: Lock },
              { id: 'ach' as const, label: 'Bank Transfer', icon: Building },
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-2 px-2 rounded-[14px] flex flex-col items-center justify-center gap-1 text-center transition-all select-none border active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-xs'
                      : 'liquid-glass-card text-[#323232] border-[#D8D8D8] hover:border-[#A4B3BE]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#323232]'}`} />
                  <span className="text-[10px] font-bold leading-tight">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Fields Form */}
        <form onSubmit={handlePay} className="space-y-3 pt-1">
          {paymentMethod === 'card' && (
            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#82807A] mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 w-4 h-4 text-[#82807A]" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="•••• •••• •••• ••••"
                    required
                    className="w-full h-10 pl-9 pr-3 rounded-[12px] border border-[#D8D8D8] bg-white text-xs font-mono font-medium text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#82807A] mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="w-full h-10 px-3 rounded-[12px] border border-[#D8D8D8] bg-white text-xs font-mono font-medium text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#82807A] mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    required
                    className="w-full h-10 px-3 rounded-[12px] border border-[#D8D8D8] bg-white text-xs font-mono font-medium text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#82807A] mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Cardholder name"
                  required
                  className="w-full h-10 px-3 rounded-[12px] border border-[#D8D8D8] bg-white text-xs font-medium text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'apple' && (
            <div className="p-4 rounded-[16px] bg-white/80 border border-[#D8D8D8] text-center space-y-2">
              <Lock className="w-6 h-6 mx-auto text-[#191919]" />
              <p className="text-xs font-bold text-[#191919]">Apple Pay Express</p>
              <p className="text-[11px] text-[#82807A]">
                Touch ID or double-click side button to confirm payment of ${amount.toFixed(2)}.
              </p>
            </div>
          )}

          {paymentMethod === 'ach' && (
            <div className="p-4 rounded-[16px] bg-white/80 border border-[#D8D8D8] text-center space-y-2">
              <Building className="w-6 h-6 mx-auto text-[#191919]" />
              <p className="text-xs font-bold text-[#191919]">Direct Bank Wire / ACH</p>
              <p className="text-[11px] text-[#82807A]">
                Routing: 071000288 &bull; JPMorgan Chase Chicago Law Trust Account.
              </p>
            </div>
          )}

          {/* Action button: Pay & confirm */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-11 rounded-full btn-glossy-primary font-heading font-bold text-xs text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing transaction...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.2]" />
                  <span>Pay &amp; confirm</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </PhonePortal>
);
};

export default PaymentModal;
