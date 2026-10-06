import { PackageItem, PaymentMethod } from './types';

export const GOLD_COIN_PACKAGES: PackageItem[] = [
  {
    id: 'coin_1',
    name: 'Starter Gold Pack',
    amount: '400,000 Coins',
    price: 300,
    currencySymbol: 'PKR',
    image: '/images/gold-coin-1.png',
    tag: 'Popular'
  },
  {
    id: 'coin_2',
    name: 'Value Gold Stack',
    amount: '1,200,000 Coins',
    bonus: '+100K Bonus',
    price: 850,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-stack.png',
  },
  {
    id: 'coin_3',
    name: 'Pro Gamer Bag',
    amount: '3,500,000 Coins',
    bonus: '+350K Bonus',
    price: 2400,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-bag.png',
    tag: 'Best Seller'
  },
  {
    id: 'coin_4',
    name: 'VIP Gold Chest',
    amount: '8,000,000 Coins',
    bonus: '+1M Bonus',
    price: 5200,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
  },
  {
    id: 'coin_5',
    name: 'Master Vault Pack',
    amount: '18,500,000 Coins',
    bonus: '+2.5M Bonus',
    price: 11500,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-bag.png',
  },
  {
    id: 'coin_6',
    name: 'Supreme Wealth Sack',
    amount: '40,000,000 Coins',
    bonus: '+5M Bonus',
    price: 24000,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
    tag: 'Hot Value'
  },
  {
    id: 'coin_7',
    name: 'Legendary Royal Treasury',
    amount: '90,000,000 Coins',
    bonus: '+12M Bonus',
    price: 49999,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
    tag: 'Mega Deal'
  },
  {
    id: 'coin_8',
    name: 'Emperor Ultimate Stash',
    amount: '200,000,000 Coins',
    bonus: '+30M Bonus',
    price: 99999,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
    tag: 'Ultimate'
  },
  {
    id: 'coin_9',
    name: 'Mythic Kingdom Box',
    amount: '450,000,000 Coins',
    bonus: '+70M Bonus',
    price: 199999,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
  },
  {
    id: 'coin_10',
    name: 'Infinity Gold Reserve',
    amount: '1,000,000,000 Coins',
    bonus: '+200M Bonus',
    price: 399999,
    currencySymbol: 'PKR',
    image: '/images/gold-coins-treasure.png',
    tag: 'Whale Exclusive'
  }
];

export const DIAMOND_PACKAGES: PackageItem[] = [
  {
    id: 'dia_1',
    name: 'Pocket Diamond Gem',
    amount: '240 Diamonds',
    price: 320,
    currencySymbol: 'PKR',
    image: '/images/diamond-1.png',
  },
  {
    id: 'dia_2',
    name: 'Sparkle Gem Bundle',
    amount: '750 Diamonds',
    bonus: '+50 Bonus',
    price: 950,
    currencySymbol: 'PKR',
    image: '/images/diamonds-2.png',
    tag: 'Popular'
  },
  {
    id: 'dia_3',
    name: 'Crystal Cluster',
    amount: '2,100 Diamonds',
    bonus: '+200 Bonus',
    price: 2600,
    currencySymbol: 'PKR',
    image: '/images/diamonds-3.png',
  },
  {
    id: 'dia_4',
    name: 'Diamond Vault Bag',
    amount: '5,500 Diamonds',
    bonus: '+600 Bonus',
    price: 6500,
    currencySymbol: 'PKR',
    image: '/images/diamonds-bag.png',
    tag: 'Top Value'
  },
  {
    id: 'dia_5',
    name: 'Royal Diamond Chest',
    amount: '12,500 Diamonds',
    bonus: '+1,500 Bonus',
    price: 14200,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
  },
  {
    id: 'dia_6',
    name: 'Grand Jewel Coffer',
    amount: '28,000 Diamonds',
    bonus: '+3,500 Bonus',
    price: 31000,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
    tag: 'Best Value'
  },
  {
    id: 'dia_7',
    name: 'Imperial Diamond Crate',
    amount: '60,000 Diamonds',
    bonus: '+8,000 Bonus',
    price: 64000,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
  },
  {
    id: 'dia_8',
    name: 'Crown Jewel Trove',
    amount: '135,000 Diamonds',
    bonus: '+20,000 Bonus',
    price: 135000,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
    tag: 'Supreme'
  },
  {
    id: 'dia_9',
    name: 'Celestial Diamond Vault',
    amount: '300,000 Diamonds',
    bonus: '+50,000 Bonus',
    price: 285000,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
  },
  {
    id: 'dia_10',
    name: 'Godly Diamond Cache',
    amount: '750,000 Diamonds',
    bonus: '+150,000 Bonus',
    price: 699999,
    currencySymbol: 'PKR',
    image: '/images/diamonds-treasure.png',
    tag: 'VIP Only'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    icon: '/images/easypaisa-logo.png',
    badge: 'Instant',
    accountLabel: 'Easypaisa Mobile Account Number',
    rules: [
      'Enter your registered 11-digit Easypaisa mobile number (e.g., 03001234567).',
      'You will receive an instant push prompt or OTP on your Easypaisa app to authorize payment.',
      'Voucher code will be delivered instantly to your email after verification.'
    ]
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    icon: '/images/jazzcash-logo.png',
    badge: 'Fast',
    accountLabel: 'JazzCash Mobile Account Number',
    rules: [
      'Enter your active JazzCash account number.',
      'Ensure your account has sufficient balance prior to payment.',
      'Confirm the transaction via MPIN on your mobile handset.'
    ]
  },
  {
    id: 'jazz_billing',
    name: 'Jazz Mobile Billing',
    icon: '/images/jazz-mobile-billing.png',
    badge: 'Direct SIM',
    accountLabel: 'Jazz Mobile Number',
    rules: [
      'Amount will be deducted directly from your Jazz Mobile Prepaid / Postpaid balance.',
      'Make sure you have adequate mobile balance before confirming.'
    ]
  },
  {
    id: 'zong',
    name: 'Zong Direct Top-Up',
    icon: '/images/Zong-5G-Logo.png',
    badge: 'SIM Billing',
    accountLabel: 'Zong 4G/5G Mobile Number',
    rules: [
      'Direct carrier billing for all Zong subscribers in Pakistan.',
      'Enter 11-digit Zong mobile number to initiate payment.'
    ]
  },
  {
    id: 'visa',
    name: 'Visa Card',
    icon: '/images/visa-card.png',
    badge: 'International',
    accountLabel: '16-Digit Visa Card Number',
    rules: [
      'Supports Debit and Credit cards issued by any bank worldwide.',
      'Requires 3D-Secure 1-Time Password (OTP) from your bank.'
    ]
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    icon: '/images/master-card.png',
    badge: 'Secure 3D',
    accountLabel: 'Mastercard Card Details',
    rules: [
      'Enter cardholder name, 16-digit card number, expiry date & CVV.',
      'Processed via 256-bit SSL encrypted secure gaming gateway.'
    ]
  },
  {
    id: 'konnect',
    name: 'HBL Konnect',
    icon: '/images/konnect-logo.png',
    accountLabel: 'Konnect Account Number / CNIC',
    rules: [
      'Instant payment using HBL Konnect wallet.',
      'Requires active Konnect account balance.'
    ]
  }
];
