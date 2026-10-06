export interface PackageItem {
  id: string;
  name: string;
  amount: string;
  bonus?: string;
  price: number;
  currencySymbol: string;
  image: string;
  tag?: string;
}

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  email: string;
  dpUrl: string;
  ludoId?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  accountLabel: string;
  rules: string[];
}
