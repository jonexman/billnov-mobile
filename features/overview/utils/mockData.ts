import { MarketItem, OverviewTransaction, PromoItem } from "../types";

// Mock user data
export const mockUser = {
  firstName: "Jonexman",
  lastName: "Doe",
  balance: 500000.0,
};

// Mock transactions
export const mockOverviewTransactions: OverviewTransaction[] = [
  {
    id: "t1",
    type: "deposit",
    amount: 50000,
    currency: "NGN",
    timestamp: new Date(2023, 5, 15),
    status: "completed",
    description: "Bank transfer",
  },
  {
    id: "t2",
    type: "buy",
    amount: 25000,
    currency: "NGN",
    timestamp: new Date(2023, 5, 14),
    status: "completed",
    description: "BTC purchase",
  },
  {
    id: "t3",
    type: "withdrawal",
    amount: 10000,
    currency: "NGN",
    timestamp: new Date(2023, 5, 12),
    status: "completed",
    description: "Bank withdrawal",
  },
  {
    id: "t4",
    type: "sell",
    amount: 15000,
    currency: "NGN",
    timestamp: new Date(2023, 5, 10),
    status: "completed",
    description: "ETH sale",
  },
  {
    id: "t5",
    type: "transfer",
    amount: 5000,
    currency: "NGN",
    timestamp: new Date(2023, 5, 8),
    status: "pending",
    description: "Transfer to friend",
  },
];

// Mock market data
export const mockMarketData: MarketItem[] = [
  {
    id: "1",
    name: "USDT",
    symbol: "USDT",
    price: 1562.22,
    change: 0.05,
    volume: "93.6Tn",
    currency: "NGN",
    iconName: "disc",
    iconColor: "#26A17B",
  },
  {
    id: "2",
    name: "Bitcoin",
    symbol: "BTC",
    price: 158776210.08,
    change: -0.8,
    volume: "68.4Tn",
    currency: "NGN",
    iconName: "logo-bitcoin",
    iconColor: "#F7931A",
  },
  {
    id: "3",
    name: "Ethereum",
    symbol: "ETH",
    price: 245845.23,
    change: 1.2,
    volume: "34.1Tn",
    currency: "NGN",
    iconName: "logo-bitcoin",
    iconColor: "#627EEA",
  },
  {
    id: "4",
    name: "Litecoin",
    symbol: "LTC",
    price: 25845.34,
    change: 2.34,
    volume: "18.2Tn",
    currency: "NGN",
    iconName: "disc",
    iconColor: "#345D9D",
  },
];

// Promo data
export const mockPromoData: PromoItem[] = [
  {
    id: "1",
    title: "Save on Fees",
    description: "Enjoy 50% off on trading fees for the next 30 days",
    iconName: "cash-outline",
    bgColor: "#DEF1FF",
    iconColor: "#0077FF",
    buttonText: "Learn More",
  },
  {
    id: "2",
    title: "Refer & Earn",
    description: "Invite friends and earn up to ₦50,000 in rewards",
    iconName: "gift-outline",
    bgColor: "#FFECDE",
    iconColor: "#FF7A00",
    buttonText: "Invite Now",
  },
  {
    id: "3",
    title: "Join Premium",
    description: "Unlock advanced features with BillNov Premium",
    iconName: "star-outline",
    bgColor: "#E8DFFF",
    iconColor: "#6C36FF",
    buttonText: "Upgrade",
  },
];

// Quick actions
export const quickActions = [
  { id: "1", name: "Trade", icon: "analytics", color: "#1434A4" },
  { id: "2", name: "Virtual Card", icon: "card", color: "#5ce1e6" },
  { id: "3", name: "Recharge", icon: "flash", color: "#FFD700" },
  { id: "4", name: "More", icon: "grid", color: "#FF6961" },
];
