import { OverflowTabBar } from "@/components/OverflowTabBar";
import { colors, spacing, typography } from "@/shared/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function OverflowTabExample() {
  const [activeTab, setActiveTab] = useState("home");

  // Sample tab items for the overflow tab bar demo
  const tabs = [
    {
      key: "home",
      label: "Home",
      icon: "home" as keyof typeof Ionicons.glyphMap,
      iconOutline: "home-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("home"),
    },
    {
      key: "wallet",
      label: "Wallet",
      icon: "wallet" as keyof typeof Ionicons.glyphMap,
      iconOutline: "wallet-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("wallet"),
    },
    {
      key: "chart",
      label: "Analytics",
      icon: "stats-chart" as keyof typeof Ionicons.glyphMap,
      iconOutline: "stats-chart-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("chart"),
    },
    {
      key: "notification",
      label: "Notifications",
      icon: "notifications" as keyof typeof Ionicons.glyphMap,
      iconOutline: "notifications-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("notification"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: "person" as keyof typeof Ionicons.glyphMap,
      iconOutline: "person-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("profile"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: "settings" as keyof typeof Ionicons.glyphMap,
      iconOutline: "settings-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("settings"),
    },
    {
      key: "help",
      label: "Help",
      icon: "help-circle" as keyof typeof Ionicons.glyphMap,
      iconOutline: "help-circle-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => setActiveTab("help"),
    },
  ];

  // Render different content based on active tab
  const renderContent = () => {
    const currentTab = tabs.find((tab) => tab.key === activeTab);
    const iconName =
      currentTab?.icon || ("help-circle" as keyof typeof Ionicons.glyphMap);

    return (
      <View style={styles.content}>
        <Ionicons name={iconName} size={64} color={colors.primary.main} />
        <Text style={styles.contentTitle}>
          {currentTab?.label || "Tab"} Content
        </Text>
        <Text style={styles.contentDescription}>
          This is a demo of the OverflowTabBar component using the
          useBottomTabOverflow hook. The tab bar shows a maximum of 4 tabs and
          moves additional tabs to an overflow menu.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "Overflow Tab Bar Demo",
          headerShown: true,
        }}
      />

      {/* Main content area */}
      {renderContent()}

      {/* Overflow Tab Bar at the bottom */}
      <OverflowTabBar tabs={tabs} activeTabKey={activeTab} maxVisibleTabs={4} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  contentTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral.gray900,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  contentDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral.gray700,
    textAlign: "center",
    lineHeight: 24,
  },
});
