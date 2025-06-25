/**
 * Settings feature type definitions
 */

export type SettingItemType = "toggle" | "link";

export interface SettingItem {
  id: string;
  icon: string;
  label: string;
  iconColor: string;
  type: SettingItemType;
  value?: boolean;
  onToggle?: () => void;
}

export interface SettingSection {
  title: string;
  items: SettingItem[];
}

export interface SettingsContextType {
  // User preferences
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  biometricAuth: boolean;
  setBiometricAuth: (enabled: boolean) => void;

  // Account settings
  hasBankAccount: boolean;

  // Theme settings
  themeColor: string;
  setThemeColor: (color: string) => void;
}

export interface UserProfileData {
  name: string;
  avatarUrl?: string;
  membershipLevel: string;
  isNewMember: boolean;
}
