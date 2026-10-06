import React from 'react';
import { PackageItem } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface CurrencySelectorProps {
  activeCurrency: 'coins' | 'diamonds';
  onSelectCurrency: (type: 'coins' | 'diamonds') => void;
  packages: PackageItem[];
  selectedPackage: PackageItem | null;
  onSelectPackage: (pkg: PackageItem) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  activeCurrency,
  onSelectCurrency,
  packages,
  selectedPackage,
  onSelectPackage
}) => {
  return (
    <div className="space-y-8">
      
      {/* SECTION HEADER & SOFT SILHOUETTE BAR */}
      <div className="text-center space-y-4">
        
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border-2 border-emerald-300 shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-black text-emerald-950 uppercase tracking-wider">
            Select Currency
          </h2>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>

        {/* AUTHENTIC YALLA LUDO SOFT SILHOUETTE BAR */}
        <div className="max-w-lg mx-auto ludo-silhouette-bar flex items-center justify-between gap-3">
          
          {/* LEFT: Gold Coins Soft Pill */}
          <button
            onClick={() => onSelectCurrency('coins')}
            className={`flex-1 flex items-center justify-center gap-3 py-2.5 px-5 rounded-full transition-all duration-200 font-black ${
              activeCurrency === 'coins'
                ? 'ludo-pill-active scale-[1.02]'
                : 'ludo-pill-inactive'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center p-1 shrink-0 ${activeCurrency === 'coins' ? 'bg-[#d8f5e7]' : 'bg-white/80'}`}>
              <img
                src="/images/gold-coin-1.png"
                alt="Gold Coins"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow"
              />
            </div>
            <div className="text-left leading-tight">
              <div className="text-base sm:text-lg font-black text-emerald-950">Gold Coins</div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">Game Cash</div>
            </div>
          </button>

          {/* RIGHT: Diamonds Soft Pill */}
          <button
            onClick={() => onSelectCurrency('diamonds')}
            className={`flex-1 flex items-center justify-center gap-3 py-2.5 px-5 rounded-full transition-all duration-200 font-black ${
              activeCurrency === 'diamonds'
                ? 'ludo-pill-active scale-[1.02]'
                : 'ludo-pill-inactive'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center p-1 shrink-0 ${activeCurrency === 'diamonds' ? 'bg-[#d8f5e7]' : 'bg-white/80'}`}>
              <img
                src="/images/diamond-1.png"
                alt="Diamonds"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow"
              />
            </div>
            <div className="text-left leading-tight">
              <div className="text-base sm:text-lg font-black text-emerald-950">Diamonds</div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">Gems Pass</div>
            </div>
          </button>

        </div>

      </div>

      {/* PACKAGE CARDS GRID - SOFT PASTEL CARDS */}
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
            <span>Available {activeCurrency === 'coins' ? 'Gold Coins' : 'Diamond'} Packages</span>
            <span className="text-xs bg-[#24a87e] text-white px-2.5 py-0.5 rounded-full font-bold">
              {packages.length} Items
            </span>
          </h3>
          <span className="text-xs text-emerald-800 font-bold">Click the button on any pack to select / unselect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.id === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`p-4 transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? 'ludo-soft-item-card-selected'
                    : 'ludo-soft-item-card'
                }`}
              >
                {/* Optional Tag */}
                {pkg.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ef4444] text-white font-black text-[10px] uppercase px-3 py-0.5 rounded-full shadow-sm border border-red-300">
                    {pkg.tag}
                  </div>
                )}

                {/* Selection Check Indicator */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 bg-[#24a87e] text-white p-1 rounded-full shadow">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {/* Card Content */}
                <div className="text-center pt-2">
                  <div className="h-24 flex items-center justify-center mb-3">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="max-h-20 object-contain drop-shadow-md transform hover:scale-105 transition-transform"
                    />
                  </div>

                  <h4 className="text-base font-black text-emerald-950 tracking-wide line-clamp-1">
                    {pkg.amount}
                  </h4>

                  {pkg.bonus ? (
                    <span className="inline-block text-[11px] font-bold text-[#188a64] bg-[#eefbf4] px-2.5 py-0.5 rounded-full border border-emerald-300 mt-1">
                      {pkg.bonus}
                    </span>
                  ) : (
                    <span className="inline-block text-[11px] text-emerald-700 font-medium mt-1">
                      Instant Delivery Voucher
                    </span>
                  )}
                </div>

                {/* Price Button Container */}
                <div className="mt-4 pt-3 border-t border-emerald-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs text-emerald-700 font-bold">Price:</span>
                    <span className="text-base font-black text-emerald-950">
                      {pkg.currencySymbol} {pkg.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPackage(pkg);
                    }}
                    className={`w-full py-2.5 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'ludo-btn-green shadow-md scale-[1.02]'
                        : activeCurrency === 'coins'
                          ? 'ludo-btn-yellow shadow-md hover:scale-[1.02]'
                          : 'ludo-btn-blue shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>✓ Selected</span>
                      </>
                    ) : (
                      <span>Select Pack</span>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
