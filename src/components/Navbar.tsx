import React, { useState } from 'react';
import { UserProfile } from '../types';
import { userStorage, UserAccount } from '../userStorage';
import { X, User, Mail, Shield, Sparkles, LogOut, Lock, Bell, Check, Upload, AlertCircle } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLoginSuccess: (account: UserAccount) => void;
  onLogout: () => void;
  onOpenSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onUpdateUser,
  onLoginSuccess,
  onLogout,
  onOpenSidebar
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Auth Form State
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [regAvatar, setRegAvatar] = useState('/images/emoji-character.png');
  const [customAvatarUploaded, setCustomAvatarUploaded] = useState('');
  const [authError, setAuthError] = useState('');

  // Profile Settings Form State
  const [editName, setEditName] = useState(user.name);
  const [editLudoId, setEditLudoId] = useState(user.ludoId || '8492041');
  const [selectedAvatar, setSelectedAvatar] = useState(user.dpUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const avatarPresets = [
    '/images/emoji-character.png',
    '/images/horse-3d-character-2.png',
    '/images/horse-character-3d.png',
    '/images/dices-3d.png'
  ];

  const handleDpClick = () => {
    if (user.isLoggedIn) {
      setEditName(user.name);
      setEditLudoId(user.ludoId || '8492041');
      setSelectedAvatar(user.dpUrl);
      setShowProfileModal(true);
    } else {
      setAuthError('');
      setShowAuthModal(true);
    }
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isRegistration: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (isRegistration) {
          setCustomAvatarUploaded(result);
          setRegAvatar(result);
        } else {
          setSelectedAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'signup') {
      const res = userStorage.register(nameInput, emailInput, passInput, regAvatar);
      if (!res.success) {
        setAuthError(res.error || 'Registration failed');
        return;
      }
      onLoginSuccess(res.user!);
      setShowAuthModal(false);
      resetAuthForm();
    } else {
      const res = userStorage.login(emailInput, passInput);
      if (!res.success) {
        setAuthError(res.error || 'Login failed');
        return;
      }
      onLoginSuccess(res.user!);
      setShowAuthModal(false);
      resetAuthForm();
    }
  };

  const resetAuthForm = () => {
    setEmailInput('');
    setPassInput('');
    setNameInput('');
    setAuthError('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: editName,
      ludoId: editLudoId,
      dpUrl: selectedAvatar
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowProfileModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 ludo-soft-navbar transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LEFT: DP Holder */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDpClick}
              className="group relative flex items-center rounded-full bg-white p-[2px] shadow-md hover:scale-105 transition-transform"
              title={user.isLoggedIn ? "Open Profile Settings" : "Login / Register"}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#eefbf4] flex items-center justify-center border border-emerald-300">
                <img
                  src={user.isLoggedIn ? user.dpUrl : '/images/horse-character-3d.png'}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-emerald-950 p-1 rounded-full text-[10px] font-black border border-white shadow">
                {user.isLoggedIn ? 'VIP' : '?'}
              </div>
            </button>
            <div className="hidden sm:block">
              {user.isLoggedIn ? (
                <div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5 drop-shadow-sm">
                    {user.name}
                    <span className="bg-emerald-900/60 text-white text-[10px] px-2 py-0.5 rounded-full border border-emerald-300/40">
                      ID: {user.ludoId || '8492041'}
                    </span>
                  </div>
                  <div className="text-xs text-amber-200 font-bold">Click DP to edit profile</div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthError('');
                    setShowAuthModal(true);
                  }}
                  className="text-sm font-black text-emerald-900 hover:brightness-105 transition-all flex items-center gap-1.5 ludo-btn-silver px-4 py-1.5 shadow-md"
                >
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>

          {/* MIDDLE: 3D Yalla Ludo Logo (Enlarged with lower dice extending down outside the navbar) */}
          <div className="flex items-center justify-center relative">
            <a href="#" className="flex items-center gap-2 group translate-y-3 sm:translate-y-4">
              <img
                src="/images/yallaludo-logo-3d.png"
                alt="Yalla Ludo 3D Logo"
                className="h-20 sm:h-24 md:h-28 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-all duration-300"
              />
            </a>
          </div>

          {/* RIGHT: Notifications Icon & 3D Settings Icon */}
          <div className="flex items-center space-x-2.5">
            
            {/* Notification Icon Button */}
            <button
              onClick={() => setShowNotificationsModal(true)}
              className="p-2.5 rounded-2xl bg-[#1ba076] hover:bg-[#158c66] border border-emerald-200/50 text-white shadow-md active:translate-y-0.5 hover:scale-105 transition-all"
              title="Notifications & Updates"
            >
              <Bell className="w-6 h-6" />
            </button>

            {/* 3D Settings Icon Button */}
            <button
              onClick={onOpenSidebar}
              className="p-1.5 rounded-2xl bg-[#1ba076] hover:bg-[#158c66] border border-emerald-200/50 shadow-md active:translate-y-0.5 hover:scale-105 transition-all group"
              title="Open Navigation Menu"
            >
              <img
                src="/images/settings-3d-icon.png"
                alt="3D Settings Icon"
                className="w-9 h-9 object-contain drop-shadow group-hover:rotate-45 transition-transform duration-300"
              />
            </button>

          </div>

        </div>
      </header>

      {/* NOTIFICATIONS POP-UP CARD */}
      {showNotificationsModal && (
        <div
          onClick={() => setShowNotificationsModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md ludo-soft-popup p-5 shadow-2xl cursor-default"
          >
            
            <img
              src="/images/emoji-character.png"
              alt="Yalla Mascot"
              className="absolute -top-7 right-12 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
            />

            <button
              type="button"
              onClick={() => setShowNotificationsModal(false)}
              aria-label="Close Notifications"
              className="absolute top-4 right-4 ludo-popup-close-btn"
            >
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>

            <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm mb-4">
              Notifications
            </h3>

            <div className="ludo-soft-inner-card p-4 space-y-3 mb-4">
              <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-emerald-950">New Mega Deal Promo!</div>
                  <div className="text-[11px] text-emerald-700 font-medium">Get up to 17% extra bonus Gold Coins & Diamonds this weekend.</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-emerald-950">Instant Voucher Delivery Active</div>
                  <div className="text-[11px] text-emerald-700 font-medium">Automated 24/7 voucher code delivery system is running with 0% delay.</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-full py-3 ludo-btn-silver font-black uppercase text-sm tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE SETTINGS POP-UP CARD */}
      {showProfileModal && (
        <div
          onClick={() => setShowProfileModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md ludo-soft-popup p-5 shadow-2xl cursor-default"
          >
            
            <img
              src="/images/emoji-character.png"
              alt="Yalla Mascot"
              className="absolute -top-7 right-12 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
            />

            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              aria-label="Close Profile Settings"
              className="absolute top-4 right-4 ludo-popup-close-btn"
            >
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>

            <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm mb-4">
              Profile Settings
            </h3>

            <div className="ludo-soft-inner-card p-4 space-y-4 mb-4">
              
              {/* DP Selection */}
              <div>
                <label className="block text-xs font-extrabold text-emerald-900 uppercase mb-2">
                  Choose Avatar Profile Picture
                </label>
                <div className="grid grid-cols-4 gap-2.5 mb-2">
                  {avatarPresets.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(img)}
                      className={`relative aspect-square w-full rounded-2xl overflow-hidden p-1 border-2 transition-all flex items-center justify-center ${
                        selectedAvatar === img
                          ? 'border-emerald-600 bg-emerald-100 scale-105 shadow ring-2 ring-emerald-400'
                          : 'border-emerald-200 bg-white hover:border-emerald-400'
                      }`}
                    >
                      <img src={img} alt="Avatar option" className="w-full h-full object-contain p-0.5" />
                      {selectedAvatar === img && (
                        <div className="absolute top-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <label className="flex items-center justify-center gap-2 p-2 bg-white border border-dashed border-emerald-400 rounded-xl cursor-pointer hover:border-emerald-600 text-xs font-bold text-emerald-800 transition-colors shadow-sm">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Upload Custom Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCustomFileUpload(e, false)}
                  />
                </label>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-xs font-extrabold text-emerald-900 uppercase mb-1">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-emerald-600" />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 ludo-soft-input text-sm"
                  />
                </div>
              </div>

              {/* Yalla Ludo ID */}
              <div>
                <label className="block text-xs font-extrabold text-emerald-900 uppercase mb-1">
                  Yalla Ludo Game ID
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 w-4 h-4 text-emerald-600" />
                  <input
                    type="text"
                    value={editLudoId}
                    onChange={(e) => setEditLudoId(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 ludo-soft-input text-sm"
                  />
                </div>
              </div>

              {/* Linked Email */}
              <div>
                <label className="block text-xs font-extrabold text-emerald-900 uppercase mb-1">
                  Linked Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-emerald-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-9 pr-3 py-2 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-mono cursor-not-allowed"
                  />
                </div>
              </div>

            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="w-full py-3 ludo-btn-green font-black uppercase text-sm tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" /> Saved Successfully!
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setShowProfileModal(false);
                }}
                className="w-full py-2.5 ludo-btn-silver font-black text-xs uppercase tracking-wider text-rose-700 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN / SIGNUP POP-UP CARD */}
      {showAuthModal && (
        <div
          onClick={() => {
            setShowAuthModal(false);
            setAuthError('');
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm ludo-soft-popup p-5 shadow-2xl cursor-default"
          >
            
            <img
              src="/images/emoji-character.png"
              alt="Yalla Mascot"
              className="absolute -top-7 right-12 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
            />

            <button
              type="button"
              onClick={() => {
                setShowAuthModal(false);
                setAuthError('');
              }}
              aria-label="Close Authentication"
              className="absolute top-4 right-4 ludo-popup-close-btn"
            >
              <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
            </button>

            <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-sm mb-4">
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </h3>

            {authError && (
              <div className="mb-3 p-2.5 bg-rose-100 border border-rose-300 rounded-xl text-xs text-rose-800 flex items-start gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div className="ludo-soft-inner-card p-4 space-y-3 mb-4">
              
              {authMode === 'signup' && (
                <>
                  <div className="flex rounded-xl overflow-hidden border border-emerald-300 shadow-sm bg-white">
                    <div className="bg-[#24a87e] text-white px-3 py-2.5 flex items-center gap-1 font-bold text-xs shrink-0">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Player display name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs font-semibold text-emerald-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-emerald-900 uppercase mb-1">
                      Choose Avatar:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {avatarPresets.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRegAvatar(img)}
                          className={`aspect-square w-full rounded-xl p-1 border-2 flex items-center justify-center transition-all ${
                            regAvatar === img ? 'border-emerald-600 bg-emerald-100 scale-105 shadow' : 'border-emerald-200 bg-white hover:border-emerald-400'
                          }`}
                        >
                          <img src={img} alt="Avatar" className="w-full h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex rounded-xl overflow-hidden border border-emerald-300 shadow-sm bg-white">
                <div className="bg-[#24a87e] text-white px-3 py-2.5 flex items-center gap-1 font-bold text-xs shrink-0">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <input
                  type="email"
                  placeholder="ijakhapak@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs font-semibold text-emerald-950 focus:outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 ludo-soft-input text-xs"
                />
              </div>

              <p className="text-[10px] text-center text-emerald-800 leading-tight pt-1">
                By continuing, you agree to Yalla Ludo's <span className="font-bold underline text-emerald-950">Terms of Service</span> and <span className="font-bold underline text-emerald-950">Privacy Policy</span>
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAuthSubmit}
                  className="w-full py-2.5 ludo-btn-silver font-black text-sm uppercase tracking-wide"
                >
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </button>
              </div>

            </div>

            <div className="flex items-center justify-between px-2 text-xs font-bold text-white">
              <a href="#" className="underline hover:text-amber-200">Forgot Password?</a>
              {authMode === 'login' ? (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError('');
                  }}
                  className="underline hover:text-amber-200"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className="underline hover:text-amber-200"
                >
                  Login
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
