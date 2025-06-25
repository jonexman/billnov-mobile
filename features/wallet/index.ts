/**
 * Wallet Feature Module
 *
 * This module handles all cryptocurrency wallet functionality including:
 * - Wallet creation and management
 * - Transaction history
 * - Sending and receiving cryptocurrency
 * - Price charts and market data
 * - Currency conversion
 */

// Re-export types
export * from "./types";

// Re-export context and hooks
export * from "./context/WalletContext";

// Re-export components
export * from "./components/CurrencySelector";
export * from "./components/PinModal";
export * from "./components/TransactionItem";
export * from "./components/TransactionList";
export * from "./components/WalletCard";
export * from "./components/WalletSummary";

// Re-export utilities
export * from "./utils/helpers";
export * from "./utils/mockData";

// Feature metadata
export const WalletFeature = {
  name: "Wallet",
  description: "Cryptocurrency wallet management",
};

// TODO: Implement wallet feature components and functionality
