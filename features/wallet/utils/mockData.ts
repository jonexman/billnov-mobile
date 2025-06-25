import { Transaction, WalletBalance } from "../types";

// Mock wallet balances
export const mockWallets: WalletBalance[] = [
  {
    id: "trading",
    name: "Trading",
    icon: "analytics",
    iconColor: "#6C63FF",
    balance: 0.0,
    isExpandable: false,
  },
  {
    id: "virtual-card",
    name: "Virtual Card",
    icon: "card",
    iconColor: "#4ECDC4",
    balance: 0.0,
    isExpandable: true,
    expanded: false,
  },
  {
    id: "loyalty",
    name: "Loyalty",
    icon: "gift",
    iconColor: "#FF6B6B",
    balance: 0.0,
    isExpandable: true,
    expanded: false,
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "buy",
    amount: 0.05,
    currency: "BTC",
    status: "completed",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    description: "Bought Bitcoin",
    fee: 0.001,
    from: "USD Wallet",
    to: "BTC Wallet",
  },
  {
    id: "tx2",
    type: "sell",
    amount: 0.02,
    currency: "ETH",
    status: "completed",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    description: "Sold Ethereum",
    fee: 0.0005,
    from: "ETH Wallet",
    to: "USD Wallet",
  },
  {
    id: "tx3",
    type: "transfer",
    amount: 100,
    currency: "USD",
    status: "pending",
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    description: "Transfer to external wallet",
    fee: 1.5,
    from: "USD Wallet",
    to: "External",
  },
  {
    id: "tx4",
    type: "receive",
    amount: 0.1,
    currency: "BTC",
    status: "completed",
    timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    description: "Received from exchange",
    from: "Exchange",
    to: "BTC Wallet",
  },
];

// Currency conversion rates (mock)
export const mockConversionRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  NGN: 460,
  BTC: 0.000038,
  ETH: 0.00055,
};

// Default wallet state
export const defaultWalletState = {
  totalBalance: 0.0,
  btcEquivalent: 0.0,
  currency: "USD",
  hasPIN: false,
  wallets: mockWallets,
  transactions: mockTransactions,
  balanceMasked: true,
};
