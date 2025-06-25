/**
 * Wallet Feature Types
 */

export interface WalletBalance {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  balance: number;
  isExpandable?: boolean;
  expanded?: boolean;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "transfer" | "receive";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  description?: string;
  fee?: number;
  from?: string;
  to?: string;
}

export interface WalletState {
  totalBalance: number;
  btcEquivalent: number;
  currency: string;
  hasPIN: boolean;
  wallets: WalletBalance[];
  transactions: Transaction[];
  balanceMasked: boolean;
}

export interface WalletContextType {
  state: WalletState;
  toggleBalanceVisibility: () => void;
  createWalletPIN: (pin: string) => Promise<boolean>;
  verifyWalletPIN: (pin: string) => Promise<boolean>;
  changeWalletPIN: (oldPin: string, newPin: string) => Promise<boolean>;
  changeCurrency: (currency: string) => void;
  getWalletById: (id: string) => WalletBalance | undefined;
  toggleWalletExpand: (id: string) => void;
  getTransactionHistory: (filter?: {
    type?: "buy" | "sell" | "transfer" | "receive";
    walletId?: string;
    startDate?: string;
    endDate?: string;
  }) => Transaction[];
}
