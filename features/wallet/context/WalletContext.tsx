import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Transaction,
  WalletBalance,
  WalletContextType,
  WalletState,
} from "../types";
import { defaultWalletState } from "../utils/mockData";

// Create context with default values
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// PIN storage key
const WALLET_PIN_KEY = "wallet_pin";

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Initialize state with default values
  const [state, setState] = useState<WalletState>(defaultWalletState);

  // Toggle balance visibility
  const toggleBalanceVisibility = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      balanceMasked: !prevState.balanceMasked,
    }));
  }, []);

  // Create wallet PIN
  const createWalletPIN = useCallback(async (pin: string): Promise<boolean> => {
    try {
      // In a real app, you would hash the PIN before storing it
      await AsyncStorage.setItem(WALLET_PIN_KEY, pin);

      setState((prevState) => ({
        ...prevState,
        hasPIN: true,
      }));

      return true;
    } catch (error) {
      console.error("Error creating wallet PIN:", error);
      return false;
    }
  }, []);

  // Verify wallet PIN
  const verifyWalletPIN = useCallback(async (pin: string): Promise<boolean> => {
    try {
      const storedPIN = await AsyncStorage.getItem(WALLET_PIN_KEY);
      return storedPIN === pin;
    } catch (error) {
      console.error("Error verifying wallet PIN:", error);
      return false;
    }
  }, []);

  // Change wallet PIN
  const changeWalletPIN = useCallback(
    async (oldPin: string, newPin: string): Promise<boolean> => {
      try {
        // Verify old PIN first
        const isValid = await verifyWalletPIN(oldPin);

        if (!isValid) {
          return false;
        }

        // Store new PIN
        await AsyncStorage.setItem(WALLET_PIN_KEY, newPin);
        return true;
      } catch (error) {
        console.error("Error changing wallet PIN:", error);
        return false;
      }
    },
    [verifyWalletPIN]
  );

  // Change currency
  const changeCurrency = useCallback((currency: string) => {
    setState((prevState) => ({
      ...prevState,
      currency,
    }));
  }, []);

  // Get wallet by ID
  const getWalletById = useCallback(
    (id: string): WalletBalance | undefined => {
      return state.wallets.find((wallet) => wallet.id === id);
    },
    [state.wallets]
  );

  // Toggle wallet expand
  const toggleWalletExpand = useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      wallets: prevState.wallets.map((wallet) =>
        wallet.id === id && wallet.isExpandable
          ? { ...wallet, expanded: !wallet.expanded }
          : wallet
      ),
    }));
  }, []);

  // Get transaction history with optional filtering
  const getTransactionHistory = useCallback(
    (filter?: {
      type?: "buy" | "sell" | "transfer" | "receive";
      walletId?: string;
      startDate?: string;
      endDate?: string;
    }): Transaction[] => {
      if (!filter) {
        return state.transactions;
      }

      return state.transactions.filter((tx) => {
        // Filter by type if specified
        if (filter.type && tx.type !== filter.type) {
          return false;
        }

        // Filter by wallet ID if specified (would need to add walletId to Transaction type)
        // if (filter.walletId && tx.walletId !== filter.walletId) {
        //   return false;
        // }

        // Filter by date range if specified
        if (filter.startDate) {
          const startDate = new Date(filter.startDate);
          const txDate = new Date(tx.timestamp);
          if (txDate < startDate) {
            return false;
          }
        }

        if (filter.endDate) {
          const endDate = new Date(filter.endDate);
          const txDate = new Date(tx.timestamp);
          if (txDate > endDate) {
            return false;
          }
        }

        return true;
      });
    },
    [state.transactions]
  );

  // Create context value
  const contextValue: WalletContextType = {
    state,
    toggleBalanceVisibility,
    createWalletPIN,
    verifyWalletPIN,
    changeWalletPIN,
    changeCurrency,
    getWalletById,
    toggleWalletExpand,
    getTransactionHistory,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};
