import React, { createContext, ReactNode, useContext, useState } from "react";
import { OverviewContextType, OverviewState } from "../types";
import {
  mockMarketData,
  mockOverviewTransactions,
  mockPromoData,
} from "../utils/mockData";

// Create the context with a default undefined value
const OverviewContext = createContext<OverviewContextType | undefined>(
  undefined
);

// Initial state
const initialState: OverviewState = {
  totalBalance: 500000.0,
  currency: "₦",
  balanceMasked: true,
  recentTransactions: mockOverviewTransactions,
  marketData: mockMarketData,
  promoData: mockPromoData,
};

// Provider component
export const OverviewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<OverviewState>(initialState);

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      balanceMasked: !prevState.balanceMasked,
    }));
  };

  // Get recent transactions with optional limit
  const getRecentTransactions = (limit?: number) => {
    const sortedTransactions = [...state.recentTransactions].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    return limit ? sortedTransactions.slice(0, limit) : sortedTransactions;
  };

  // Get market data with optional filter
  const getMarketData = (filter?: string) => {
    if (!filter) return state.marketData;

    switch (filter) {
      case "top-gainers":
        return [...state.marketData].sort((a, b) => b.change - a.change);
      case "top-losers":
        return [...state.marketData].sort((a, b) => a.change - b.change);
      default:
        return state.marketData;
    }
  };

  // Context value
  const value: OverviewContextType = {
    state,
    toggleBalanceVisibility,
    getRecentTransactions,
    getMarketData,
  };

  return (
    <OverviewContext.Provider value={value}>
      {children}
    </OverviewContext.Provider>
  );
};

// Custom hook to use the context
export const useOverview = (): OverviewContextType => {
  const context = useContext(OverviewContext);
  if (context === undefined) {
    throw new Error("useOverview must be used within an OverviewProvider");
  }
  return context;
};
