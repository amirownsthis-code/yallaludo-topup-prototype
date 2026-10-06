import React from 'react';
import { Shield, Sparkles, MessageCircle, HelpCircle, Info, Mail } from 'lucide-react';

interface FooterProps {
  onOpenModal: (modalName: 'faq' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="mt-20 bg-[#eefbf4] border-t-3 border-emerald-300 text-emerald-950 pt-12 pb-8 shadow-lg relative overflow-hidden rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-200">
          
          {/* Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/yallaludo-logo-3d.png"
                alt="Yalla Ludo 3D Logo"
                className="h-14 object-contain drop-shadow"
              />
              <div>
                <div className="text-base font-black text-emerald-950 tracking-wider uppercase">
                  Desktop Top-Up Store
                </div>
                <div className="text-xs text-[#188a64] font-bold">Official Authorized Voucher Vendor</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed pr-4 font-semibold">
              The ultimate desktop top-up website for Yalla Ludo players to buy Gold Coins and Diamonds with instant redeem voucher delivery to your email address.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-emerald-900 shadow-sm">
                <Shield className="w-4 h-4 text-[#24a87e]" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-amber-700 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Instant Voucher Dispatch</span>
              </div>
            </div>
          </div>

          {/* Center Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider border-b border-emerald-200 pb-1">
              Top-Up Products
            </h4>
            <ul className="space-y-2 text-xs font-bold text-emerald-800">
              <li><a href="#" className="hover:text-[#24a87e] transition-colors flex items-center gap-1"><span>•</span> Gold Coins Packages</a></li>
              <li><a href="#" className="hover:text-[#24a87e] transition-colors flex items-center gap-1"><span>•</span> Diamond Gems Bundles</a></li>
              <li><a href="#" className="hover:text-[#24a87e] transition-colors flex items-center gap-1"><span>•</span> VIP Room Passes</a></li>
              <li><a href="#" className="hover:text-[#24a87e] transition-colors flex items-center gap-1"><span>•</span> Tournament Pass Vouchers</a></li>
            </ul>
          </div>

          {/* Right Column: Information & Payment Logos */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider border-b border-emerald-200 pb-1">
              Supported Payment Methods
            </h4>
            
            {/* Payment Method Icons List */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['easypaisa-logo.png', 'jazzcash-logo.png', 'visa-card.png', 'master-card.png', 'Zong-5G-Logo.png', 'konnect-logo.png'].map((img, i) => (
                <div key={i} className="h-8 px-2 bg-white rounded-md border border-emerald-200 flex items-center justify-center shadow-sm">
                  <img src={`/images/${img}`} alt="Payment method" className="max-h-5 max-w-[50px] object-contain" />
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-emerald-900 space-y-1 font-semibold">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <MessageCircle className="w-4 h-4 text-[#24a87e]" /> 24/7 Dedicated Live Support
              </div>
              <p>Email: support@yallaludo-topup.com</p>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: LEFT = ALL RIGHTS RESERVED | RIGHT = FAQ, ABOUT, CONTACT US */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LEFT SIDE: All Rights Reserved Notice */}
          <div className="text-xs text-emerald-900 font-semibold text-center md:text-left space-y-1">
            <div>
              © {new Date().getFullYear()} <strong className="text-emerald-950">Yalla Ludo Top-Up Store</strong>. All Rights Reserved.
            </div>
            <div className="text-[11px] text-emerald-700">
              Yalla Ludo is a registered trademark of its respective owner. All game logos and assets belong to their original owners.
            </div>
          </div>

          {/* RIGHT SIDE: FAQ, ABOUT US, CONTACT US PAGES BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            
            <button
              onClick={() => onOpenModal('faq')}
              className="px-4 py-2 ludo-btn-silver text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-[#24a87e]" />
              <span>FAQ</span>
            </button>

            <button
              onClick={() => onOpenModal('about')}
              className="px-4 py-2 ludo-btn-silver text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Info className="w-4 h-4 text-[#24a87e]" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => onOpenModal('contact')}
              className="px-4 py-2 ludo-btn-silver text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#24a87e]" />
              <span>Contact Us</span>
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};
