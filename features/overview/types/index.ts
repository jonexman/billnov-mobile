export interface OverviewState {
  totalBalance: number;
  currency: string;
  balanceMasked: boolean;
  recentTransactions: OverviewTransaction[];
  marketData: MarketItem[];
  promoData: PromoItem[];
}

export interface OverviewTransaction {
  id: string;
  type: "deposit" | "withdrawal" | "buy" | "sell" | "transfer";
  amount: number;
  currency: string;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
  description?: string;
}

export interface MarketItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  currency: string;
  iconName: string;
  iconColor: string;
}

export interface PromoItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bgColor: string;
  iconColor: string;
  buttonText: string;
}

export interface QuickAction {
  id: string;
  name: string;
  icon: string;
  color: string;
  onPress?: () => void;
}

export interface OverviewContextType {
  state: OverviewState;
  toggleBalanceVisibility: () => void;
  getRecentTransactions: (limit?: number) => OverviewTransaction[];
  getMarketData: (filter?: string) => MarketItem[];
}
