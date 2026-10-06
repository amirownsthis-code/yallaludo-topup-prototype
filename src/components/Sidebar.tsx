import React from 'react';
import { UserProfile } from '../types';
import { 
  X, LogIn, LogOut, History, Shield, HelpCircle, 
  Gift, CreditCard, ChevronRight, User, Settings, MessageCircle, Sparkles 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  onSelectOption: (optionName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  user,
  onOpenAuth,
  onOpenProfile,
  onLogout,
  onSelectOption
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Sliding Sidebar Panel from right to left */}
        <div className="w-screen max-w-md ludo-soft-sidebar flex flex-col justify-between overflow-y-auto animate-slideLeft">
          
          {/* TOP SECTION: User Header */}
          <div>
            {/* Top Bar Header with Close Button */}
            <div className="p-4 flex items-center justify-between ludo-soft-sidebar-header text-white">
              <div className="flex items-center gap-2">
                <img src="/images/yallaludo-logo-3d.png" alt="Logo" className="h-8 drop-shadow" />
                <span className="font-black text-white text-sm tracking-wide uppercase">Menu & Settings</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Menu"
                className="w-9 h-9 rounded-full bg-[#188a64] hover:bg-[#12694c] border-2 border-emerald-300 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
              </button>
            </div>

            {/* Profile Header Box (Matching User Profile Box from reference screenshot) */}
            <div className="p-5 bg-white border-b-2 border-emerald-200/80 shadow-sm">
              {user.isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#24a87e] p-0.5 bg-emerald-50 shadow">
                      <img src={user.dpUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="absolute bottom-0 right-0 bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 rounded-full border border-amber-500">
                      LV 1
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-emerald-950 tracking-wide flex items-center gap-1.5">
                        {user.name}
                      </h4>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenProfile();
                        }}
                        className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1 transition-colors"
                      >
                        <Settings className="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                      ID: {user.ludoId || '8492041'}
                    </div>
                    <p className="text-[11px] text-emerald-700/80 truncate max-w-[200px] mt-0.5">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-dashed border-emerald-400 flex items-center justify-center mb-3 text-emerald-700">
                    <User className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-black text-emerald-950">Guest Player</h4>
                  <p className="text-xs text-emerald-700/80 mb-3">Log in to view purchase history & sync vouchers</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 ludo-btn-teal font-black text-xs uppercase tracking-wider shadow"
                  >
                    Login / Sign Up Now
                  </button>
                </div>
              )}
            </div>

            {/* NAVIGATION PILL OPTIONS */}
            <div className="p-4 space-y-2">
              <div className="px-2 py-1 text-[11px] font-black text-emerald-800 uppercase tracking-widest">
                Store Navigation
              </div>

              <button
                onClick={() => {
                  onSelectOption('topup');
                  onClose();
                }}
                className="w-full ludo-btn-teal py-3 px-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-white" />
                  <div className="text-left">
                    <div className="text-xs font-black uppercase">Top-Up Store</div>
                    <div className="text-[10px] text-emerald-100">Diamonds & Gold Coins</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              </button>

              {/* TRANSACTION HISTORY OPTION */}
              <button
                type="button"
                onClick={() => {
                  onSelectOption('history');
                  onClose();
                }}
                className="w-full bg-white hover:bg-emerald-50/80 border-2 border-emerald-200/80 hover:border-emerald-400 py-3.5 px-4 rounded-2xl flex items-center justify-between text-emerald-950 shadow-sm transition-all hover:scale-[1.01] active:scale-95 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eefbf4] border border-emerald-300 flex items-center justify-center text-[#188a64] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <History className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide">
                      Transaction History
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      View past orders & vouchers
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* VIP DAILY REWARDS OPTION */}
              <button
                type="button"
                onClick={() => {
                  onSelectOption('rewards');
                  onClose();
                }}
                className="w-full bg-white hover:bg-amber-50/80 border-2 border-amber-200/80 hover:border-amber-400 py-3.5 px-4 rounded-2xl flex items-center justify-between text-emerald-950 shadow-sm transition-all hover:scale-[1.01] active:scale-95 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Gift className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                      <span>VIP Daily Rewards</span>
                      <span className="bg-[#0f4837] text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">
                        FREE
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      Claim bonus coins
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="pt-3 px-2 text-[11px] font-black text-emerald-800 uppercase tracking-widest">
                Help & Information
              </div>

              <button
                onClick={() => {
                  onSelectOption('howitworks');
                  onClose();
                }}
                className="w-full bg-white hover:bg-emerald-50 border border-emerald-200/80 py-2.5 px-3.5 rounded-xl flex items-center justify-between text-emerald-950 shadow-sm transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">Frequently Asked Questions (FAQ)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => {
                  onSelectOption('security');
                  onClose();
                }}
                className="w-full bg-white hover:bg-emerald-50 border border-emerald-200/80 py-2.5 px-3.5 rounded-xl flex items-center justify-between text-emerald-950 shadow-sm transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">About & Security Guarantee</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => {
                  onSelectOption('support');
                  onClose();
                }}
                className="w-full bg-white hover:bg-emerald-50 border border-emerald-200/80 py-2.5 px-3.5 rounded-xl flex items-center justify-between text-emerald-950 shadow-sm transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold">Contact 24/7 Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>

            </div>
          </div>

          {/* BOTTOM SECTION: Signout or Footer info */}
          <div className="p-4 border-t border-emerald-200 bg-white">
            {user.isLoggedIn ? (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-800 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4" /> Sign Out Account
              </button>
            ) : (
              <div className="text-center text-[11px] text-emerald-700/80 font-medium">
                Official Yalla Ludo Desktop Store v2.4
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
