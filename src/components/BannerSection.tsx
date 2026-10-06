import React from 'react';
import { ShieldCheck, Zap, Star, Heart, CheckCircle2 } from 'lucide-react';

export const BannerSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden ludo-soft-panel p-6 md:p-8">
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT SIDE: Game Banner Image with Badge & Favorite */}
        <div className="lg:col-span-6 relative group">
          {/* Discount Badge Positioned at the Top OUTSIDE the Banner */}
          <div className="absolute -top-3.5 left-6 bg-[#ef4444] text-white font-black text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg border-2 border-white uppercase tracking-wider z-20">
            UP TO 17% OFF
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-400/60 shadow-lg aspect-[16/10] w-full bg-white">
            <img
              src="/images/banner-1.webp"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/banner-1.png';
              }}
              alt="Yalla Ludo Top-Up Banner"
              className="w-full h-full object-cover object-center"
            />

            {/* Favorite Bookmark Badge */}
            <button 
              className="absolute top-4 right-4 p-2.5 rounded-2xl bg-[#24a87e] hover:bg-[#1ba076] text-white border border-emerald-300 shadow-md transition-transform hover:scale-110 z-10"
              title="Add to Favorites"
            >
              <Heart className="w-5 h-5 fill-amber-300 text-amber-300" />
            </button>

            {/* 3D Character Overlay Accent */}
            <img
              src="/images/horse-3d-character-2.png"
              alt="Yalla Ludo 3D Mascot"
              className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl pointer-events-none z-10"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Game Info & Credentials in Soft Theme */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-950 tracking-tight">
              Yalla Ludo
            </h1>
            <span className="bg-[#24a87e] text-white text-xs px-3.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
              Official Store
            </span>
          </div>

          <p className="text-sm md:text-base text-emerald-900 font-semibold leading-relaxed">
            Fastest and most reliable top-up platform for Yalla Ludo Diamonds and Gold Coins. Instant redeem code voucher delivered directly to your email!
          </p>

          {/* Rating, Sales & Badges Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm">
              <span className="text-amber-500 font-black text-base">5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-emerald-800 font-bold ml-1">(5 Reviews)</span>
            </div>

            {/* Sold Count */}
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm text-emerald-900 text-xs font-black">
              <span className="text-amber-600">🛍️ 316</span> Sold
            </div>

          </div>

          {/* Trust Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[#3b82f6] text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Secure Payment</span>
            </div>

            <div className="flex items-center gap-2 bg-[#f59e0b] text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm">
              <Zap className="w-4 h-4 text-white" />
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* Trustpilot Score Widget */}
          <div className="flex items-center gap-3 pt-3 border-t border-emerald-200">
            <span className="text-xs font-black text-emerald-950 underline tracking-wide">Excellent</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-[#24a87e] flex items-center justify-center rounded-sm shadow-sm">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              ))}
            </div>
            <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Trustpilot Verified
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
