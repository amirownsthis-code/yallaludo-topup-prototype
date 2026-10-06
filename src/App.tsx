import React, { useState, useEffect } from 'react';
import { UserProfile, PackageItem, PaymentMethod } from './types';
import { GOLD_COIN_PACKAGES, DIAMOND_PACKAGES, PAYMENT_METHODS } from './data';
import { userStorage, UserAccount } from './userStorage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BannerSection } from './components/BannerSection';
import { CurrencySelector } from './components/CurrencySelector';
import { EmailSection } from './components/EmailSection';
import { PaymentSection } from './components/PaymentSection';
import { PaymentFlowModal } from './components/PaymentFlowModal';
import { TransactionHistoryModal } from './components/TransactionHistoryModal';
import { VipRewardsModal } from './components/VipRewardsModal';
import { Footer } from './components/Footer';
import { X, HelpCircle, Info, Mail, Phone, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export function App() {
  // Real initial state: NO ONE is logged in by default on starting the application
  const [user, setUser] = useState<UserProfile>(() => {
    const session = userStorage.getCurrentSession();
    if (session) {
      return {
        isLoggedIn: true,
        name: session.name,
        email: session.email,
        dpUrl: session.dpUrl,
        ludoId: session.ludoId
      };
    }
    return {
      isLoggedIn: false,
      name: 'Guest Player',
      email: '',
      dpUrl: '/images/horse-character-3d.png'
    };
  });

  // Sidebar visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Currency Selection ('coins' | 'diamonds') - default is 'coins'
  const [currencyType, setCurrencyType] = useState<'coins' | 'diamonds'>('coins');

  // Real initial state: NO items selected by default on startup
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  // Email state for receiving voucher code - empty by default on startup
  const [email, setEmail] = useState<string>(() => {
    const session = userStorage.getCurrentSession();
    return session ? session.email : '';
  });

  // Selected Payment Method - null by default until user selects
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  // Payment Flow Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Transaction History Modal State
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // VIP Rewards Modal State
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  // Footer Modal Pages State: 'faq' | 'about' | 'contact' | null
  const [activeFooterModal, setActiveFooterModal] = useState<'faq' | 'about' | 'contact' | null>(null);

  // Contact Form Inputs
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Handle Successful Login / Register from Database
  const handleLoginSuccess = (account: UserAccount) => {
    setUser({
      isLoggedIn: true,
      name: account.name,
      email: account.email,
      dpUrl: account.dpUrl,
      ludoId: account.ludoId
    });
    setEmail(account.email);
  };

  // Handle Logout
  const handleLogout = () => {
    userStorage.logout();
    setUser({
      isLoggedIn: false,
      name: 'Guest Player',
      email: '',
      dpUrl: '/images/horse-character-3d.png'
    });
    setEmail('');
  };

  // Handle User Profile Updates (DP, Name, Ludo ID)
  const handleUpdateUser = (updatedProps: Partial<UserProfile>) => {
    const currentSession = userStorage.getCurrentSession();
    if (currentSession) {
      userStorage.updateUser({
        id: currentSession.id,
        ...updatedProps
      });
    }
    setUser(prev => ({
      ...prev,
      ...updatedProps
    }));
    if (updatedProps.email) {
      setEmail(updatedProps.email);
    }
  };

  // Switch Currency Toggle
  const handleCurrencySwitch = (type: 'coins' | 'diamonds') => {
    setCurrencyType(type);
    setSelectedPackage(null); // Reset selection on tab switch
  };

  // Toggle or select package (Allows unselecting if clicked again)
  const handleTogglePackage = (pkg: PackageItem) => {
    if (selectedPackage?.id === pkg.id) {
      setSelectedPackage(null); // Unselect active pack
    } else {
      setSelectedPackage(pkg);
    }
  };

  // Handle Sidebar navigation item select
  const handleSidebarOptionSelect = (optionName: string) => {
    if (optionName === 'topup') {
      window.scrollTo({ top: 450, behavior: 'smooth' });
    } else if (optionName === 'history') {
      setShowHistoryModal(true);
    } else if (optionName === 'rewards') {
      setShowRewardsModal(true);
    } else if (optionName === 'howitworks') {
      setActiveFooterModal('faq');
    } else if (optionName === 'security') {
      setActiveFooterModal('about');
    } else if (optionName === 'support') {
      setActiveFooterModal('contact');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-[#134e4a]">
      
      {/* 1. FIXED TOP NAVBAR */}
      <Navbar
        user={user}
        onUpdateUser={handleUpdateUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* 2. SIDEBAR MENU OVERLAY */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onOpenAuth={() => {
          const loginBtn = document.querySelector('header button[title="Login / Register"]') as HTMLButtonElement;
          if (loginBtn) loginBtn.click();
        }}
        onOpenProfile={() => {
          const profileBtn = document.querySelector('header button[title="Open Profile Settings"]') as HTMLButtonElement;
          if (profileBtn) profileBtn.click();
        }}
        onLogout={handleLogout}
        onSelectOption={handleSidebarOptionSelect}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pt-28 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 3. HERO BANNER & GAME INFO SECTION */}
          <BannerSection />

          {/* 4. CURRENCY SELECTOR (Silhouette Pill Bar + 4:4:2 Theme Cards for Coins & Diamonds) */}
          <CurrencySelector
            activeCurrency={currencyType}
            onSelectCurrency={handleCurrencySwitch}
            packages={currencyType === 'coins' ? GOLD_COIN_PACKAGES : DIAMOND_PACKAGES}
            selectedPackage={selectedPackage}
            onSelectPackage={handleTogglePackage}
          />

          {/* 5. EMAIL DELIVERY SECTION (With Help Icon Pop-Up Card) */}
          <EmailSection
            email={email}
            onChangeEmail={(val) => setEmail(val)}
            userEmail={user.email}
          />

          {/* 6. PAYMENT METHOD CARDS & BUY NOW BAR */}
          <PaymentSection
            paymentMethods={PAYMENT_METHODS}
            selectedPayment={selectedPayment}
            onSelectPayment={(pm) => {
              if (selectedPayment?.id === pm.id) {
                setSelectedPayment(null);
              } else {
                setSelectedPayment(pm);
              }
            }}
            selectedPackage={selectedPackage}
            email={email}
            onInitiateBuy={() => setIsPaymentModalOpen(true)}
          />

        </div>
      </main>

      {/* 7. POP-UP PAYMENT MODAL (Checkout -> 2s Processing -> Completion with Animation & Mascot) */}
      {selectedPackage && selectedPayment && (
        <PaymentFlowModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          selectedPackage={selectedPackage}
          email={email}
          selectedPayment={selectedPayment}
        />
      )}

      {/* 8. TRANSACTION HISTORY POP-UP MODAL */}
      <TransactionHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        user={user}
        onOpenAuth={() => {
          setShowHistoryModal(false);
          const loginBtn = document.querySelector('header button[title="Login / Register"]') as HTMLButtonElement;
          if (loginBtn) loginBtn.click();
        }}
      />

      {/* 9. VIP DAILY REWARDS POP-UP MODAL */}
      <VipRewardsModal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        user={user}
      />

      {/* 10. FOOTER WITH COPYRIGHT LEFT & FAQ / ABOUT / CONTACT RIGHT */}
      <Footer onOpenModal={(modalName) => setActiveFooterModal(modalName)} />

      {/* MODALS FOR FOOTER PAGES (With Soft Theme & Animated Mascot decor) */}
      {activeFooterModal && (
        <div
          onClick={() => {
            setActiveFooterModal(null);
            setContactSubmitted(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl ludo-soft-popup p-6 md:p-8 shadow-2xl my-auto cursor-default"
          >
            
            {/* Top Right Corner Animated Mascot */}
            <img
              src="/images/emoji-character.png"
              alt="Yalla Mascot"
              className="absolute -top-7 right-14 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
            />

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => {
                setActiveFooterModal(null);
                setContactSubmitted(false);
              }}
              aria-label="Close Modal"
              className="absolute top-4 right-4 ludo-popup-close-btn"
            >
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>

            {/* FAQ MODAL PAGE */}
            {activeFooterModal === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white text-center tracking-wide uppercase drop-shadow-sm">
                  Frequently Asked Questions (FAQ)
                </h3>
                
                <div className="ludo-soft-inner-card p-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <h4 className="text-xs font-black text-emerald-950">Q: How fast will I get my Yalla Ludo voucher?</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      A: Vouchers are delivered instantly to your specified email address within 2-3 seconds after your payment is confirmed by the payment gateway.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <h4 className="text-xs font-black text-emerald-950">Q: How do I redeem the Gold Coins or Diamonds in game?</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      A: Open Yalla Ludo app &gt; Tap Profile Icon &gt; Tap "Redeem Gift Code" &gt; Paste the secret 12-digit code received via email &gt; Click Redeem!
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <h4 className="text-xs font-black text-emerald-950">Q: Which payment methods are accepted in Pakistan & global?</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      A: We accept Easypaisa, JazzCash, Jazz Direct Billing, Zong Carrier Billing, HBL Konnect, as well as Visa and Mastercard debit/credit cards globally.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <h4 className="text-xs font-black text-emerald-950">Q: What if I entered the wrong email address?</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      A: Contact our 24/7 live support with your payment receipt reference, and our support team will re-send your voucher to your updated email address immediately.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setActiveFooterModal(null)}
                    className="px-8 py-2.5 ludo-btn-silver font-black uppercase text-xs tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT US MODAL PAGE */}
            {activeFooterModal === 'about' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm">
                  About Yalla Ludo Store
                </h3>
                
                <div className="ludo-soft-inner-card p-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2 text-xs leading-relaxed text-emerald-800">
                  <p className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <strong className="text-emerald-950 block mb-1 font-black">Official Authorized Direct Top-Up Partner</strong>
                    Yalla Ludo Desktop Store is an authorized digital store providing gamers with instant, safe purchases of Gold Coins and Diamonds for Yalla Ludo.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-[#24a87e] mx-auto mb-1" />
                      <div className="font-extrabold text-emerald-950 text-[11px]">100% Authorized</div>
                      <div className="text-[10px] text-emerald-600">Official digital voucher codes</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
                      <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                      <div className="font-extrabold text-emerald-950 text-[11px]">Instant Dispatch</div>
                      <div className="text-[10px] text-emerald-600">Automated 24/7 delivery server</div>
                    </div>
                  </div>

                  <p className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    We support convenient localized payment options including mobile wallets and direct carrier billing so every player can unlock VIP status, tournaments, and exclusive dice skins effortlessly.
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setActiveFooterModal(null)}
                    className="px-8 py-2.5 ludo-btn-silver font-black uppercase text-xs tracking-wider"
                  >
                    Got It!
                  </button>
                </div>
              </div>
            )}

            {/* CONTACT US MODAL PAGE */}
            {activeFooterModal === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm mb-4">
                  Contact Us & Support
                </h3>
                
                {contactSubmitted ? (
                  <div className="p-8 text-center ludo-soft-inner-card space-y-3 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-[#24a87e] mx-auto animate-bounce" />
                    <h4 className="text-base font-black text-emerald-950">Message Received!</h4>
                    <p className="text-xs text-emerald-700">
                      Our customer support team has received your ticket and will reply to your email address within 5-10 minutes.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setActiveFooterModal(null);
                      }}
                      className="mt-2 px-6 py-2 ludo-btn-green font-black uppercase text-xs tracking-wider"
                    >
                      Return to Store
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="ludo-soft-inner-card p-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2.5 shadow-sm">
                        <Phone className="w-4 h-4 text-[#24a87e]" />
                        <div>
                          <div className="text-[9px] text-emerald-600 uppercase font-extrabold">WhatsApp Helpline</div>
                          <div className="text-xs font-mono font-bold text-emerald-950">+92 300 1234567</div>
                        </div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2.5 shadow-sm">
                        <Mail className="w-4 h-4 text-[#24a87e]" />
                        <div>
                          <div className="text-[9px] text-emerald-600 uppercase font-extrabold">Support Email</div>
                          <div className="text-xs font-mono font-bold text-emerald-950">support@yallaludo-topup.com</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ahmad Khan"
                          className="w-full px-3 py-2 ludo-soft-input text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. player@gmail.com"
                          className="w-full px-3 py-2 ludo-soft-input text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold text-emerald-900 uppercase mb-1">
                          Inquiry / Order ID
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe your issue or order ID..."
                          className="w-full px-3 py-2 ludo-soft-input text-xs"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2 border-t border-emerald-200">
                      <button
                        type="button"
                        onClick={() => setActiveFooterModal(null)}
                        className="px-4 py-2 ludo-btn-silver text-xs font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 ludo-btn-green font-black uppercase text-xs tracking-wider"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
