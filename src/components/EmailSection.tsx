import React, { useState } from 'react';
import { Mail, HelpCircle, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EmailSectionProps {
  email: string;
  onChangeEmail: (val: string) => void;
  userEmail?: string;
}

export const EmailSection: React.FC<EmailSectionProps> = ({
  email,
  onChangeEmail,
  userEmail
}) => {
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  return (
    <div className="relative ludo-soft-panel p-6 md:p-8">
      
      {/* Decorative Mascot */}
      <img
        src="/images/emoji-character.png"
        alt="Yalla Mascot"
        className="hidden md:block absolute -top-8 -right-4 w-28 h-28 object-contain drop-shadow-xl pointer-events-none"
      />

      <div className="max-w-3xl">
        
        {/* Title & Help Icon Header */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#24a87e]" />
            <h3 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-wide">
              Step 2: Enter Delivery Email Address
            </h3>
          </div>

          <button
            onClick={() => setShowHowItWorksModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-300 shadow-sm text-xs font-black transition-all hover:scale-105"
            title="How does voucher email delivery work?"
          >
            <HelpCircle className="w-4 h-4 text-[#24a87e]" />
            <span>How it works?</span>
          </button>
        </div>

        {/* Descriptive Line over the input box */}
        <p className="text-xs sm:text-sm text-emerald-900 font-semibold mb-4 leading-relaxed">
          After a successful payment, your Yalla Ludo redeem code voucher will be sent to this email immediately. Make sure it is active and accessible.
        </p>

        {/* Input Box Container in Soft Theme */}
        <div className="relative">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-emerald-600">
              <Mail className="w-5 h-5" />
            </div>
            
            <input
              type="email"
              placeholder="e.g. player@gmail.com"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 bg-white border-2 border-emerald-300 rounded-2xl text-emerald-950 text-base font-semibold placeholder-emerald-700/50 focus:outline-none focus:border-[#24a87e] focus:ring-2 focus:ring-emerald-400/30 transition-all shadow-sm"
            />

            {/* Quick Fill Button if user is logged in */}
            {userEmail && userEmail !== email && (
              <button
                type="button"
                onClick={() => onChangeEmail(userEmail)}
                className="absolute right-3 px-3 py-1.5 rounded-xl ludo-btn-green text-xs font-bold shadow-sm"
              >
                Use My Email
              </button>
            )}
          </div>

          {email && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#24a87e]" />
              <span>Voucher will be delivered to: <strong className="text-emerald-950 underline">{email}</strong></span>
            </div>
          )}
        </div>

      </div>

      {/* POP-UP CARD: How the Voucher Delivery Process Works */}
      {showHowItWorksModal && (
        <div
          onClick={() => setShowHowItWorksModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg ludo-soft-popup p-6 shadow-2xl cursor-default"
          >
            
            <img
              src="/images/emoji-character.png"
              alt="Yalla Mascot"
              className="absolute -top-7 right-12 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
            />

            <button
              type="button"
              onClick={() => setShowHowItWorksModal(false)}
              aria-label="Close Voucher Delivery Guide"
              className="absolute top-4 right-4 ludo-popup-close-btn"
            >
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>

            <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm mb-4">
              Voucher Delivery Guide
            </h3>

            <div className="ludo-soft-inner-card p-4 space-y-3 mb-4">
              
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#24a87e] text-white font-black text-xs flex items-center justify-center shrink-0 shadow">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">Enter Email & Pay</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                    Provide your correct email address and complete payment via your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#24a87e] text-white font-black text-xs flex items-center justify-center shrink-0 shadow">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">Receive Redeem Code Voucher</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                    Within 2-3 seconds after payment, an email containing your secret 12-digit Yalla Ludo Voucher Code will arrive in your inbox.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#24a87e] text-white font-black text-xs flex items-center justify-center shrink-0 shadow">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">Redeem in Yalla Ludo Game</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                    Open Yalla Ludo app &gt; Profile &gt; Redeem Code &gt; Paste code and instantly receive your items!
                  </p>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-200" /> 100% Instant Delivery
              </span>
              <button
                onClick={() => setShowHowItWorksModal(false)}
                className="px-6 py-2.5 ludo-btn-silver font-black uppercase text-xs tracking-wider"
              >
                Got It!
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
