import { Transaction, WalletBalance } from "../types";
import { mockConversionRates } from "./mockData";

/**
 * Format currency amount with proper symbol and decimal places
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  maximumFractionDigits: number = 2
): string => {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NGN: "₦",
    BTC: "₿",
    ETH: "Ξ",
  };

  const symbol = currencySymbols[currency] || "";

  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  })}`;
};

/**
 * Convert amount from one currency to another
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  // In a real app, this would call an API or use a library
  // For now, we'll use our mock conversion rates
  const fromRate =
    mockConversionRates[fromCurrency as keyof typeof mockConversionRates] || 1;
  const toRate =
    mockConversionRates[toCurrency as keyof typeof mockConversionRates] || 1;

  return (amount / fromRate) * toRate;
};

/**
 * Calculate total balance across all wallets
 */
export const calculateTotalBalance = (wallets: WalletBalance[]): number => {
  return wallets.reduce((total, wallet) => total + wallet.balance, 0);
};

/**
 * Format date for transaction display
 */
export const formatTransactionDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // If yesterday, show "Yesterday"
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Otherwise show date
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Group transactions by date
 */
export const groupTransactionsByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp).toDateString();

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  });

  return grouped;
};

/**
 * Mask sensitive information (like balances)
 */
export const maskSensitiveInfo = (text: string): string => {
  return text.replace(/[0-9]/g, "*");
};

/**
 * Get icon name and color for transaction type
 */
export const getTransactionIcon = (
  type: Transaction["type"]
): { name: string; color: string } => {
  switch (type) {
    case "buy":
      return { name: "trending-up", color: "#4CAF50" };
    case "sell":
      return { name: "trending-down", color: "#F44336" };
    case "transfer":
      return { name: "arrow-forward", color: "#FF9800" };
    case "receive":
      return { name: "arrow-down", color: "#2196F3" };
    default:
      return { name: "swap-horizontal", color: "#9E9E9E" };
  }
};
