import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Gift, Sparkles, Check, Crown, Flame, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VipRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

interface DailyRewardItem {
  day: number;
  type: 'coins' | 'diamonds' | 'mega';
  title: string;
  amount: string;
  image: string;
  claimed: boolean;
  isToday: boolean;
}

export const VipRewardsModal: React.FC<VipRewardsModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const [claimedToday, setClaimedToday] = useState(false);
  const [claimedRewardName, setClaimedRewardName] = useState('');

  const [rewardDays, setRewardDays] = useState<DailyRewardItem[]>([
    {
      day: 1,
      type: 'coins',
      title: 'Day 1',
      amount: '5,000 Coins',
      image: '/images/gold-coin-1.png',
      claimed: true,
      isToday: false
    },
    {
      day: 2,
      type: 'coins',
      title: 'Day 2',
      amount: '10,000 Coins',
      image: '/images/gold-coins-stack.png',
      claimed: true,
      isToday: false
    },
    {
      day: 3,
      type: 'diamonds',
      title: 'Day 3 (Today)',
      amount: '25 Diamonds',
      image: '/images/diamond-1.png',
      claimed: false,
      isToday: true
    },
    {
      day: 4,
      type: 'coins',
      title: 'Day 4',
      amount: '25,000 Coins',
      image: '/images/gold-coins-bag.png',
      claimed: false,
      isToday: false
    },
    {
      day: 5,
      type: 'diamonds',
      title: 'Day 5',
      amount: '50 Diamonds',
      image: '/images/diamonds-bag.png',
      claimed: false,
      isToday: false
    },
    {
      day: 6,
      type: 'coins',
      title: 'Day 6',
      amount: '60,000 Coins',
      image: '/images/gold-coins-treasure.png',
      claimed: false,
      isToday: false
    },
    {
      day: 7,
      type: 'mega',
      title: 'Day 7 (Mega Chest)',
      amount: '150,000 Coins + 100 Gems',
      image: '/images/diamonds-treasure.png',
      claimed: false,
      isToday: false
    }
  ]);

  if (!isOpen) return null;

  const handleClaimToday = () => {
    if (claimedToday) return;

    const todayItem = rewardDays.find((r) => r.isToday);
    const rewardLabel = todayItem ? todayItem.amount : 'Daily Reward';

    setClaimedToday(true);
    setClaimedRewardName(rewardLabel);

    setRewardDays((prev) =>
      prev.map((item) => (item.isToday ? { ...item, claimed: true } : item))
    );

    // Trigger Victory Celebration Confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl ludo-soft-popup p-5 sm:p-7 shadow-2xl my-auto cursor-default"
      >
        {/* Animated Mascot */}
        <img
          src="/images/emoji-character.png"
          alt="Yalla Mascot"
          className="absolute -top-7 right-14 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
        />

        {/* 100% Interactive Circular Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close VIP Rewards"
          className="absolute top-4 right-4 ludo-popup-close-btn"
        >
          <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-white">
            <Gift className="w-7 h-7 text-amber-300" />
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide drop-shadow-sm">
              VIP Daily Rewards
            </h3>
            <span className="bg-amber-400 text-emerald-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow border border-white">
              FREE
            </span>
          </div>
          <p className="text-xs text-emerald-100 font-semibold mt-1">
            Check-in daily to unlock streak bonuses, free gold coins & gems!
          </p>
        </div>

        {/* Inner Card Container */}
        <div className="ludo-soft-inner-card p-4 sm:p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* VIP Level Banner */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-800 to-[#188a64] text-white rounded-2xl shadow flex flex-col sm:flex-row items-center justify-between gap-3 border border-emerald-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center p-2 shadow-md">
                <Crown className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black tracking-wide">
                    {user.isLoggedIn ? user.name : 'Guest Player'}
                  </h4>
                  <span className="bg-amber-300 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    VIP TIER 1
                  </span>
                </div>
                <p className="text-xs text-emerald-100">
                  Daily Streak: <strong className="text-amber-300">3 Days in a row 🔥</strong>
                </p>
              </div>
            </div>

            {/* Streak Multiplier */}
            <div className="flex items-center gap-2 bg-emerald-900/60 px-3.5 py-1.5 rounded-xl border border-emerald-400/40">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-extrabold uppercase text-amber-200">
                1.5x Streak Multiplier
              </span>
            </div>
          </div>

          {/* 7-Day Rewards Calendar Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                7-Day Check-in Streak Calendar
              </h4>
              <span className="text-[11px] text-emerald-700 font-bold">Resets every Sunday 00:00 UTC</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {rewardDays.map((item) => (
                <div
                  key={item.day}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center justify-between relative shadow-sm ${
                    item.isToday
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 scale-105'
                      : item.claimed
                        ? 'bg-emerald-50/70 border-emerald-300 opacity-85'
                        : 'bg-white border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  {/* Status Badge */}
                  {item.claimed ? (
                    <div className="absolute top-1.5 right-1.5 bg-[#24a87e] text-white p-0.5 rounded-full shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : item.isToday ? (
                    <div className="absolute -top-2 bg-amber-500 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-full shadow">
                      TODAY
                    </div>
                  ) : null}

                  <span className="text-[10px] font-black text-emerald-900 uppercase">
                    {item.title}
                  </span>

                  <div className="my-2 h-12 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.amount}
                      className="max-h-10 object-contain drop-shadow"
                    />
                  </div>

                  <span className="text-[11px] font-black text-emerald-950 leading-tight">
                    {item.amount}
                  </span>

                  <span
                    className={`mt-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      item.claimed
                        ? 'bg-emerald-200 text-emerald-900'
                        : item.isToday
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.claimed ? 'Claimed' : item.isToday ? 'Ready' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Big Action Claim Box */}
          <div className="p-4 bg-white rounded-2xl border-2 border-emerald-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Today's Special Bonus: Day 3
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                {claimedToday
                  ? `🎉 You claimed ${claimedRewardName}! Come back tomorrow for 25,000 Coins!`
                  : 'Ready to claim: 25 Free Diamonds delivered directly to your profile!'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClaimToday}
              disabled={claimedToday}
              className={`px-8 py-3 font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 ${
                claimedToday
                  ? 'ludo-btn-silver text-emerald-800 opacity-90 cursor-default'
                  : 'ludo-btn-yellow hover:scale-105 active:scale-95'
              }`}
            >
              {claimedToday ? (
                <>
                  <Check className="w-5 h-5 stroke-[3] text-[#188a64]" />
                  <span>Claimed for Today</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>Claim Today's Bonus</span>
                </>
              )}
            </button>
          </div>

          {/* VIP Benefits Accordion Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
              <Award className="w-4 h-4 text-[#24a87e] mx-auto mb-1" />
              <div className="text-[11px] font-black text-emerald-950">Daily Coins Bonus</div>
              <div className="text-[10px] text-emerald-700">Free top-up credits</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-[11px] font-black text-emerald-950">Free Gem Bundles</div>
              <div className="text-[10px] text-emerald-700">Weekly mystery drops</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
              <Crown className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-[11px] font-black text-emerald-950">Exclusive Room Passes</div>
              <div className="text-[10px] text-emerald-700">VIP tournament entry</div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>VIP Rewards are 100% Free</span>
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 ludo-btn-silver font-black uppercase text-xs tracking-wider"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
