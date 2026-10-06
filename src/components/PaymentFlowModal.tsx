import React, { useState } from 'react';
import { PackageItem, PaymentMethod } from '../types';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Smartphone, RefreshCw, Sparkles, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageItem;
  email: string;
  selectedPayment: PaymentMethod;
}

export const PaymentFlowModal: React.FC<PaymentFlowModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  email,
  selectedPayment
}) => {
  // Steps: 'checkout' (Split screen), 'processing' (2-3s animated), 'completed' (with code & exciting animation)
  const [step, setStep] = useState<'checkout' | 'processing' | 'completed'>('checkout');

  // Input states for payment form
  const [accountNumber, setAccountNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Generated Voucher details for completion card
  const [generatedVoucher, setGeneratedVoucher] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Validation rules check to activate Pay button
  const isFormValid = () => {
    if (selectedPayment.id === 'visa' || selectedPayment.id === 'mastercard') {
      return accountNumber.replace(/\s/g, '').length >= 15 && cardHolderName.trim().length > 2 && cardExpiry.length >= 4 && cardCvv.length >= 3;
    }
    // Mobile wallets / carrier billing
    return accountNumber.trim().length >= 10;
  };

  const handleConfirmPayment = () => {
    if (!isFormValid()) return;
    setStep('processing');

    // Generate random secret 12-digit voucher code
    const mockCode = 'YL-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedVoucher(mockCode);

    // Professional 2.5 second processing animation before showing completion
    setTimeout(() => {
      setStep('completed');
      
      // Trigger exciting victory confetti explosion animation!
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 2800);
  };

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(generatedVoucher);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl ludo-soft-popup shadow-2xl overflow-hidden my-auto cursor-default"
      >
        
        {/* Top Right Corner Animated Emoji Mascot Decor */}
        <img
          src="/images/emoji-character.png"
          alt="Yalla Mascot"
          className="absolute -top-7 right-14 w-16 h-16 object-contain drop-shadow-xl pointer-events-none z-20 animate-mascot-bob"
        />

        {/* 100% Interactive Circular Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 ludo-popup-close-btn"
        >
          <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
        </button>

        {/* STEP 1: CHECKOUT POP-UP CARD - SOFT THEME SPLIT SCREEN */}
        {step === 'checkout' && (
          <div className="p-5 md:p-7">
            <div className="text-center mb-5">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase drop-shadow-sm">
                Confirm Purchase Details
              </h3>
              <p className="text-xs text-emerald-100 font-bold mt-0.5">Secure 256-Bit Encrypted Payment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* LEFT SECTION: User Info & Order Summary */}
              <div className="md:col-span-5 ludo-soft-inner-card p-4 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider border-b border-emerald-200 pb-2 mb-3">
                    Order Summary
                  </h4>

                  {/* Pack Display */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200 shadow-sm mb-3">
                    <img src={selectedPackage.image} alt="Package" className="w-12 h-12 object-contain drop-shadow" />
                    <div>
                      <div className="text-[10px] text-emerald-700 font-extrabold uppercase">Selected Pack</div>
                      <div className="text-base font-black text-emerald-950">{selectedPackage.amount}</div>
                      {selectedPackage.bonus && (
                        <div className="text-[10px] font-bold text-amber-600">{selectedPackage.bonus}</div>
                      )}
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-emerald-200">
                      <span className="text-emerald-700 font-bold">Delivery Email:</span>
                      <span className="text-emerald-950 font-mono font-bold truncate max-w-[150px]">{email}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-200">
                      <span className="text-emerald-700 font-bold">Payment Method:</span>
                      <span className="text-emerald-950 font-black flex items-center gap-1">
                        <img src={selectedPayment.icon} alt={selectedPayment.name} className="h-4 object-contain" />
                        {selectedPayment.name}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-200">
                      <span className="text-emerald-700 font-bold">Subtotal:</span>
                      <span className="text-emerald-950 font-black">{selectedPackage.currencySymbol} {selectedPackage.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-emerald-700 font-bold">Delivery Fee:</span>
                      <span className="text-[#188a64] font-black">FREE (0.00)</span>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="pt-3 border-t border-emerald-200">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-xs font-black text-emerald-800 uppercase">Total Payable:</span>
                    <span className="text-lg font-black text-emerald-950">
                      {selectedPackage.currencySymbol} {selectedPackage.price.toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>

              {/* RIGHT SECTION: Method Form & Rules */}
              <div className="md:col-span-7 ludo-soft-inner-card p-4 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-3">
                    <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                      <img src={selectedPayment.icon} alt={selectedPayment.name} className="h-5 object-contain" />
                      {selectedPayment.name} Details
                    </h4>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
                      SSL Verified
                    </span>
                  </div>

                  {/* Rules Applied Notice */}
                  <div className="mb-3 p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-800 space-y-1 shadow-sm">
                    <div className="font-bold text-emerald-900 uppercase text-[10px]">Payment Instructions:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-700">
                      {selectedPayment.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Form Inputs based on payment method */}
                  <div className="space-y-2.5">
                    {selectedPayment.id === 'visa' || selectedPayment.id === 'mastercard' ? (
                      <>
                        <div>
                          <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. AHMAD KHAN"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            className="w-full px-3 py-2 ludo-soft-input text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                            {selectedPayment.accountLabel}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="w-full pl-3 pr-9 py-2 ludo-soft-input text-xs font-mono"
                            />
                            <CreditCard className="absolute right-3 top-2.5 w-4 h-4 text-emerald-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              placeholder="12/28"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 ludo-soft-input text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                              CVV Code
                            </label>
                            <input
                              type="password"
                              placeholder="123"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3 py-2 ludo-soft-input text-xs font-mono"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                          {selectedPayment.accountLabel}
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="0300 1234567"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full pl-3 pr-9 py-2.5 ludo-soft-input text-sm font-mono"
                          />
                          <Smartphone className="absolute right-3 top-3 w-4 h-4 text-emerald-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Payment Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={!isFormValid()}
                    className={`w-full py-3 ludo-btn-green font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg ${
                      !isFormValid() ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Pay {selectedPackage.currencySymbol} {selectedPackage.price.toLocaleString()}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL PROCESSING PAGE */}
        {step === 'processing' && (
          <div className="p-8 md:p-12 text-center space-y-5 animate-fadeIn">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 border-t-white animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-emerald-300 border-b-white animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/images/yallaludo-logo-3d.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wide">
                Processing Transaction...
              </h3>
              <p className="text-xs text-emerald-100 mt-1">
                Verifying payment with {selectedPayment.name} & generating voucher code.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 ludo-soft-inner-card text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-emerald-700 font-bold">Payment Gateway:</span>
                <span className="text-emerald-950 font-black">CONNECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 font-bold">Order Token:</span>
                <span className="text-emerald-950 font-black">256-BIT ENCRYPTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 font-bold">Dispatching to:</span>
                <span className="text-[#188a64] font-mono font-black">{email}</span>
              </div>
            </div>

            <p className="text-xs text-white/80 animate-pulse font-bold">
              Please do not close or refresh this page...
            </p>
          </div>
        )}

        {/* STEP 3: COMPLETION CARD */}
        {step === 'completed' && (
          <div className="p-6 md:p-8 text-center space-y-5 animate-fadeIn">
            
            <div className="relative w-16 h-16 mx-auto rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full bg-[#24a87e] rounded-full flex items-center justify-center text-white">
                <CheckCircle2 className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white tracking-wide uppercase drop-shadow-sm">
                Order Completed! 🎉
              </h3>
              <p className="text-xs text-emerald-100 max-w-lg mx-auto mt-1 font-semibold">
                Your purchase of <strong className="text-white underline">{selectedPackage.amount}</strong> was successful. A copy has also been sent to <strong className="text-white">{email}</strong>.
              </p>
            </div>

            {/* Redeem Voucher Card Box */}
            <div className="max-w-xl mx-auto ludo-soft-inner-card p-5 shadow-lg relative">
              <div className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-2">
                Your Secret Yalla Ludo Redeem Voucher Code:
              </div>

              <div className="flex items-center justify-between bg-white rounded-xl border-2 border-emerald-300 p-3 sm:p-3.5 gap-3 shadow-sm">
                <code className="text-base sm:text-xl font-mono font-black text-emerald-950 tracking-wider">
                  {generatedVoucher}
                </code>

                <button
                  onClick={handleCopyVoucher}
                  className="px-4 py-2 ludo-btn-yellow text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
              </div>

              {/* Step-by-Step guide for user */}
              <div className="mt-3 text-left text-xs text-emerald-800 space-y-1 bg-white p-3 rounded-xl border border-emerald-200">
                <div className="font-extrabold text-emerald-950 uppercase text-[10px] mb-0.5">
                  How to redeem in Yalla Ludo app:
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-emerald-700">
                  <li>Open <strong>Yalla Ludo</strong> on your phone.</li>
                  <li>Tap on your Profile icon on the top left corner.</li>
                  <li>Click <strong>Redeem Code</strong> and paste the voucher above.</li>
                  <li>Enjoy your instant Diamonds & Gold Coins!</li>
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 ludo-btn-silver font-black uppercase text-xs tracking-wider shadow"
              >
                Back to Store
              </button>
              <a
                href="https://www.yallaludo.com"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 ludo-btn-green font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" /> Open Official Yalla Ludo
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
