/**
 * Settings Feature Module
 *
 * This module handles all application settings functionality including:
 * - User preferences
 * - App configuration
 * - Notification settings
 * - Theme settings
 * - Security settings
 */

// Re-export components
export * from "./components/SettingItem";
export * from "./components/SettingSection";
export * from "./components/SettingsScreen";

// Re-export context and hooks
export * from "./context/SettingsContext";

// Re-export types
export * from "./types";

// Feature metadata
export const SettingsFeature = {
  id: "settings",
  name: "Settings",
  description: "App settings and preferences management",
};
