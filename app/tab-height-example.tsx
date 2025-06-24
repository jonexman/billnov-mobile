import {
  TabBarBackground,
  useTabBarHeight,
} from "@/components/ui/TabBarBackground";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define TAB_BAR_HEIGHT constant outside the component
const TAB_BAR_HEIGHT = 60;

// Define tab items with proper typing for icons
type TabItem = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function TabHeightExample() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [currentTab, setCurrentTab] = useState(0);
  const [blurred, setBlurred] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [noTopBorder, setNoTopBorder] = useState(false);

  // Calculate the tab bar height with bottom insets
  const tabBarTotalHeight = useTabBarHeight(TAB_BAR_HEIGHT);

  // Define tabs with proper icon types
  const tabs: TabItem[] = [
    { name: "Home", icon: "home" },
    { name: "Wallet", icon: "wallet" },
    { name: "Profile", icon: "person" },
    { name: "Settings", icon: "settings" },
  ];

  // Background color for the main area
  const backgroundColor = isDark ? "#000000" : "#F2F2F7";
  const textColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "Tab Bar Height Example",
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          paddingBottom: tabBarTotalHeight, // Add padding to avoid content being hidden behind tab bar
          paddingHorizontal: 16,
        }}
      >
        <Text style={[styles.title, { color: textColor }]}>
          Tab Bar Demo with Height Handling
        </Text>
        <Text style={[styles.description, { color: textColor }]}>
          This example shows how to implement a tab bar with correct height
          handling, including safe area insets. The useTabBarHeight hook
          calculates the total height needed for bottom padding.
        </Text>

        <View style={styles.optionsContainer}>
          <View style={styles.optionRow}>
            <Text style={[styles.optionText, { color: textColor }]}>
              Blur Effect
            </Text>
            <Switch
              value={blurred}
              onValueChange={setBlurred}
              trackColor={{
                false: "#767577",
                true: Colors[colorScheme].tint + "70",
              }}
              thumbColor={blurred ? Colors[colorScheme].tint : "#f4f3f4"}
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={[styles.optionText, { color: textColor }]}>
              Transparent Background
            </Text>
            <Switch
              value={transparent}
              onValueChange={setTransparent}
              trackColor={{
                false: "#767577",
                true: Colors[colorScheme].tint + "70",
              }}
              thumbColor={transparent ? Colors[colorScheme].tint : "#f4f3f4"}
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={[styles.optionText, { color: textColor }]}>
              No Top Border
            </Text>
            <Switch
              value={noTopBorder}
              onValueChange={setNoTopBorder}
              trackColor={{
                false: "#767577",
                true: Colors[colorScheme].tint + "70",
              }}
              thumbColor={noTopBorder ? Colors[colorScheme].tint : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Repeated content to demonstrate scrolling */}
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.demoBox}>
            <Text style={[styles.demoText, { color: textColor }]}>
              Scrollable Content {index + 1}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Custom Tab Bar with TabBarBackground component */}
      <TabBarBackground
        blurred={blurred && !transparent}
        blurIntensity={isDark ? 40 : 60}
        noTopBorder={noTopBorder}
        transparent={transparent}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: tabBarTotalHeight,
        }}
      >
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => {
            // Create proper icon names with type safety
            const iconName: keyof typeof Ionicons.glyphMap =
              currentTab === index
                ? tab.icon
                : (`${tab.icon}-outline` as keyof typeof Ionicons.glyphMap);

            return (
              <Pressable
                key={index}
                style={styles.tabItem}
                onPress={() => setCurrentTab(index)}
              >
                <Ionicons
                  name={iconName}
                  size={24}
                  color={
                    currentTab === index
                      ? Colors[colorScheme].tint
                      : isDark
                      ? "#8E8E93"
                      : "#AEAEB2"
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        currentTab === index
                          ? Colors[colorScheme].tint
                          : isDark
                          ? "#8E8E93"
                          : "#AEAEB2",
                      marginTop: 2,
                    },
                  ]}
                >
                  {tab.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* This is the bottom safe area space */}
        <View style={{ height: insets.bottom }} />
      </TabBarBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
    backgroundColor: "rgba(120, 120, 128, 0.08)",
    borderRadius: 12,
    padding: 16,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
  },
  demoBox: {
    backgroundColor: "rgba(120, 120, 128, 0.12)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  demoText: {
    fontSize: 16,
  },
  tabBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
