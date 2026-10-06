import React from 'react';
import { PaymentMethod, PackageItem } from '../types';
import { CreditCard, Check, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

interface PaymentSectionProps {
  paymentMethods: PaymentMethod[];
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (pm: PaymentMethod) => void;
  selectedPackage: PackageItem | null;
  email: string;
  onInitiateBuy: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethods,
  selectedPayment,
  onSelectPayment,
  selectedPackage,
  email,
  onInitiateBuy
}) => {
  return (
    <div className="space-y-6">
      
      {/* SECTION TITLE */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-wide uppercase flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#24a87e]" />
            Step 3: Select Payment Method
          </h3>
          <p className="text-xs sm:text-sm text-emerald-900 font-semibold mt-1">
            Choose your preferred payment gateway for instant automated checkout
          </p>
        </div>
      </div>

      {/* PAYMENT METHOD CARDS GRID IN SOFT PASTEL THEME */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {paymentMethods.map((pm) => {
          const isSelected = selectedPayment?.id === pm.id;

          return (
            <div
              key={pm.id}
              className={`p-4 transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'ludo-soft-item-card-selected'
                  : 'ludo-soft-item-card'
              }`}
            >
              {/* Badge if available */}
              {pm.badge && (
                <div className="absolute top-2.5 left-2.5 bg-[#24a87e] text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full shadow-sm">
                  {pm.badge}
                </div>
              )}

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 bg-[#24a87e] text-white p-1 rounded-full shadow">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              {/* Card Icon & Name */}
              <div className="text-center py-3">
                <div className="h-14 flex items-center justify-center mb-2">
                  <img
                    src={pm.icon}
                    alt={pm.name}
                    className="max-h-12 max-w-[85%] object-contain filter drop-shadow-sm"
                  />
                </div>
                <h4 className="text-sm font-black text-emerald-950 tracking-wide">
                  {pm.name}
                </h4>
              </div>

              {/* Selection Status Button */}
              <div className="pt-2 border-t border-emerald-100 text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPayment(pm);
                  }}
                  className={`w-full py-2 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'ludo-btn-green shadow-md scale-[1.02]'
                      : 'ludo-btn-silver shadow-md hover:scale-[1.02]'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Select'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* BUY NOW BAR IN SOFT THEME */}
      <div className="mt-8 rounded-3xl ludo-soft-panel border-3 border-emerald-300 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        
        {/* Package & Payment Summary Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-emerald-300 flex items-center justify-center p-2 shadow-sm shrink-0">
            {selectedPackage ? (
              <img src={selectedPackage.image} alt="Selected Pack" className="max-h-12 object-contain" />
            ) : (
              <ShoppingBag className="w-8 h-8 text-[#24a87e]" />
            )}
          </div>

          <div>
            <div className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              Selected Item & Price:
            </div>
            {selectedPackage ? (
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-emerald-950">
                  {selectedPackage.amount}
                </span>
                <span className="text-base font-black text-[#188a64]">
                  — {selectedPackage.currencySymbol} {selectedPackage.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="text-sm font-bold text-emerald-800">Please select a package above</div>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-900 font-semibold mt-1">
              <span>Email: <strong className="text-emerald-950 underline">{email || 'Not provided'}</strong></span>
              <span>•</span>
              <span>Payment: <strong className="text-emerald-950">{selectedPayment?.name || 'Not selected'}</strong></span>
            </div>
          </div>
        </div>

        {/* BUY NOW BUTTON WITH VIBRANT 3D STYLE */}
        <div className="w-full md:w-auto shrink-0">
          <button
            onClick={onInitiateBuy}
            disabled={!selectedPackage || !email || !selectedPayment}
            className={`w-full md:w-auto px-8 py-4 font-black text-base sm:text-lg uppercase tracking-wide transition-all duration-200 shadow-xl flex items-center justify-center gap-3 ${
              selectedPackage && email && selectedPayment
                ? 'ludo-btn-yellow hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed opacity-70'
            }`}
          >
            <ShieldCheck className="w-6 h-6" />
            <span>
              {selectedPackage
                ? `BUY NOW (${selectedPackage.amount} - ${selectedPackage.currencySymbol} ${selectedPackage.price.toLocaleString()})`
                : 'SELECT PACKAGE TO BUY'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
