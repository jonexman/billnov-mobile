import { SettingsScreen } from "@/features/settings/components/SettingsScreen";
import { SettingsProvider } from "@/features/settings/context/SettingsContext";
import React from "react";

export default function SettingsTab() {
  return (
    <SettingsProvider>
      <SettingsScreen />
    </SettingsProvider>
  );
}
