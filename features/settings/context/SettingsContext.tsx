import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SettingsContextType } from "../types";

// Storage keys
const DARK_MODE_KEY = "billnov_dark_mode";
const NOTIFICATIONS_KEY = "billnov_notifications";
const BIOMETRIC_AUTH_KEY = "billnov_biometric_auth";
const BANK_ACCOUNT_STATUS_KEY = "billnov_has_bank_account";
const THEME_COLOR_KEY = "billnov_theme_color";

// Default settings
const DEFAULT_THEME_COLOR = "#001871";

// Create context with default values
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// Provider component
export function SettingsProvider({ children }: { children: ReactNode }) {
  // State for user preferences
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [notifications, setNotificationsState] = useState<boolean>(true);
  const [biometricAuth, setBiometricAuthState] = useState<boolean>(false);
  const [hasBankAccount, setHasBankAccount] = useState<boolean>(false);
  const [themeColor, setThemeColorState] =
    useState<string>(DEFAULT_THEME_COLOR);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load user preferences
        const storedDarkMode = await AsyncStorage.getItem(DARK_MODE_KEY);
        if (storedDarkMode !== null) {
          setDarkModeState(storedDarkMode === "true");
        }

        const storedNotifications = await AsyncStorage.getItem(
          NOTIFICATIONS_KEY
        );
        if (storedNotifications !== null) {
          setNotificationsState(storedNotifications === "true");
        }

        const storedBiometricAuth = await AsyncStorage.getItem(
          BIOMETRIC_AUTH_KEY
        );
        if (storedBiometricAuth !== null) {
          setBiometricAuthState(storedBiometricAuth === "true");
        }

        const storedBankAccount = await AsyncStorage.getItem(
          BANK_ACCOUNT_STATUS_KEY
        );
        if (storedBankAccount !== null) {
          setHasBankAccount(storedBankAccount === "true");
        }

        const storedThemeColor = await AsyncStorage.getItem(THEME_COLOR_KEY);
        if (storedThemeColor !== null) {
          setThemeColorState(storedThemeColor);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Persist settings when they change
  const setDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(DARK_MODE_KEY, value.toString());
      setDarkModeState(value);
    } catch (error) {
      console.error("Error saving dark mode setting:", error);
    }
  };

  const setNotifications = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, value.toString());
      setNotificationsState(value);
    } catch (error) {
      console.error("Error saving notifications setting:", error);
    }
  };

  const setBiometricAuth = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(BIOMETRIC_AUTH_KEY, value.toString());
      setBiometricAuthState(value);
    } catch (error) {
      console.error("Error saving biometric auth setting:", error);
    }
  };

  const setThemeColor = async (value: string) => {
    try {
      await AsyncStorage.setItem(THEME_COLOR_KEY, value);
      setThemeColorState(value);
    } catch (error) {
      console.error("Error saving theme color setting:", error);
    }
  };

  // Context value
  const value: SettingsContextType = {
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    biometricAuth,
    setBiometricAuth,
    hasBankAccount,
    themeColor,
    setThemeColor,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook to use settings context
export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}

// Export settings provider and hook
export default {
  SettingsProvider,
  useSettings,
};
