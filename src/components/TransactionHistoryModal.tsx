import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, History, Copy, Check, Search, ExternalLink, ShieldCheck, Sparkles, Filter, CreditCard } from 'lucide-react';

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenAuth?: () => void;
}

interface OrderRecord {
  id: string;
  itemType: 'coins' | 'diamonds';
  amount: string;
  bonus?: string;
  price: number;
  currencySymbol: string;
  date: string;
  paymentMethod: string;
  voucherCode: string;
  status: 'COMPLETED' | 'PENDING';
  image: string;
}

export const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenAuth
}) => {
  const [filterType, setFilterType] = useState<'all' | 'coins' | 'diamonds'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Mock initial transactions customized for the user
  const [orders] = useState<OrderRecord[]>([
    {
      id: 'YL-98421',
      itemType: 'coins',
      amount: '400,000 Gold Coins',
      bonus: '+50,000 Bonus',
      price: 1500,
      currencySymbol: 'PKR',
      date: 'Sep 30, 2026 - 10:45 PM',
      paymentMethod: 'Easypaisa',
      voucherCode: 'YL-8492-9120-4491',
      status: 'COMPLETED',
      image: '/images/gold-coins-bag.png'
    },
    {
      id: 'YL-87319',
      itemType: 'diamonds',
      amount: '2,100 Diamonds',
      bonus: '+200 Gems',
      price: 2500,
      currencySymbol: 'PKR',
      date: 'Sep 29, 2026 - 06:12 PM',
      paymentMethod: 'JazzCash',
      voucherCode: 'YL-5931-1029-7734',
      status: 'COMPLETED',
      image: '/images/diamonds-bag.png'
    },
    {
      id: 'YL-74102',
      itemType: 'coins',
      amount: '1,000,000 Gold Coins',
      bonus: '+150,000 Bonus',
      price: 3500,
      currencySymbol: 'PKR',
      date: 'Sep 27, 2026 - 02:30 PM',
      paymentMethod: 'Visa Card',
      voucherCode: 'YL-3391-4402-8819',
      status: 'COMPLETED',
      image: '/images/gold-coins-treasure.png'
    },
    {
      id: 'YL-62914',
      itemType: 'diamonds',
      amount: '550 Diamonds',
      price: 700,
      currencySymbol: 'PKR',
      date: 'Sep 24, 2026 - 09:15 AM',
      paymentMethod: 'Zong Billing',
      voucherCode: 'YL-1940-8823-6612',
      status: 'COMPLETED',
      image: '/images/diamond-1.png'
    }
  ]);

  if (!isOpen) return null;

  const handleCopyCode = (voucher: string, id: string) => {
    navigator.clipboard.writeText(voucher);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterType === 'all' || order.itemType === filterType;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.voucherCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl ludo-soft-popup p-5 sm:p-7 shadow-2xl my-auto cursor-default"
      >
        {/* Animated Mascot Decoration */}
        <img
          src="/images/emoji-character.png"
          alt="Yalla Mascot"
          className="absolute -top-7 right-14 w-16 h-16 object-contain drop-shadow-xl pointer-events-none animate-mascot-bob"
        />

        {/* 100% Interactive Circular Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Transaction History"
          className="absolute top-4 right-4 ludo-popup-close-btn"
        >
          <X className="w-5 h-5 stroke-[2.5] pointer-events-none" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-white">
            <History className="w-6 h-6 text-emerald-200" />
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide drop-shadow-sm">
              Transaction History
            </h3>
          </div>
          <p className="text-xs text-emerald-100 font-semibold mt-1">
            {user.isLoggedIn
              ? `Showing verified purchases & redeem vouchers for ${user.name}`
              : 'Guest player view • Showing recent verified store vouchers'}
          </p>
        </div>

        {/* Inner Card Container */}
        <div className="ludo-soft-inner-card p-4 sm:p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* Controls: Search and Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-emerald-200">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-emerald-200 shadow-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                  filterType === 'all'
                    ? 'bg-[#24a87e] text-white shadow-sm'
                    : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('coins')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1 ${
                  filterType === 'coins'
                    ? 'bg-[#24a87e] text-white shadow-sm'
                    : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <span>Gold Coins</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterType('diamonds')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1 ${
                  filterType === 'diamonds'
                    ? 'bg-[#24a87e] text-white shadow-sm'
                    : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <span>Diamonds</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
              <input
                type="text"
                placeholder="Search order ID / code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-emerald-300 rounded-xl text-emerald-950 font-semibold focus:outline-none focus:border-[#24a87e]"
              />
            </div>

          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 sm:p-4 bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  {/* Left: Image & Details */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#eefbf4] border border-emerald-300 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                      <img src={order.image} alt={order.amount} className="max-h-full object-contain" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          {order.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-emerald-950 mt-0.5">
                        {order.amount}
                        {order.bonus && (
                          <span className="text-[10px] font-bold text-amber-600 ml-1.5">
                            ({order.bonus})
                          </span>
                        )}
                      </h4>

                      <div className="text-[11px] text-emerald-700/90 flex flex-wrap items-center gap-2 mt-0.5">
                        <span>{order.date}</span>
                        <span>•</span>
                        <span className="font-semibold">{order.paymentMethod}</span>
                        <span>•</span>
                        <span className="font-black text-emerald-950">
                          {order.currencySymbol} {order.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Voucher Code & Copy Button */}
                  <div className="w-full sm:w-auto flex flex-col sm:items-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-100">
                    <div className="text-[10px] font-extrabold text-emerald-800 uppercase">
                      Redeem Code Voucher:
                    </div>

                    <div className="flex items-center gap-2 bg-[#eefbf4] px-3 py-1.5 rounded-xl border border-emerald-300">
                      <code className="text-xs sm:text-sm font-mono font-black text-emerald-950 tracking-wide">
                        {order.voucherCode}
                      </code>

                      <button
                        type="button"
                        onClick={() => handleCopyCode(order.voucherCode, order.id)}
                        className="px-2.5 py-1 ludo-btn-yellow text-[10px] font-black uppercase tracking-wider flex items-center gap-1 rounded-md"
                        title="Copy Voucher Code"
                      >
                        {copiedCodeId === order.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <History className="w-10 h-10 text-emerald-400 mx-auto" />
              <div className="text-sm font-black text-emerald-950">No transactions found</div>
              <p className="text-xs text-emerald-700">Try changing your search terms or filter.</p>
            </div>
          )}

          {/* Guide Helper Box */}
          <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#24a87e] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-emerald-950 uppercase text-[10px] block mb-0.5">
                Need to redeem your voucher in game?
              </span>
              <span>
                Open Yalla Ludo &gt; Profile &gt; <strong>Redeem Code</strong> &gt; Paste the 12-digit code above for instant Diamonds and Gold Coins!
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>24/7 Automated Voucher Delivery</span>
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
