// Generic component props types
import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface WithChildren {
  children: ReactNode;
}

export interface WithStyle {
  style?: StyleProp<ViewStyle>;
}

export interface WithTextStyle {
  textStyle?: StyleProp<TextStyle>;
}

// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  isVerified: boolean;
  verificationLevel: 0 | 1 | 2; // 0: Not verified, 1: Basic, 2: Full
  createdAt: string;
  updatedAt: string;
}

// Bank account types
export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isDefault: boolean;
  createdAt: string;
}

// Wallet types
export interface WalletBalance {
  id: string;
  currency: string;
  amount: number;
  updatedAt: string;
}

// Crypto asset types
export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  change24h: number;
  iconName?: string;
  iconColor?: string;
}

// Transaction types
export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer" | "exchange";
  status: "pending" | "completed" | "failed";
  amount: number;
  currency: string;
  fee?: number;
  description?: string;
  recipientName?: string;
  recipientId?: string;
  createdAt: string;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

// Form field validation
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// API response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}
