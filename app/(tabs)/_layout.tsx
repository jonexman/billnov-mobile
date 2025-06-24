import { TabBarBackground } from "@/components/ui";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { TextStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Named component for tab icons
function TabIcon({
  routeName,
  color,
  focused,
}: {
  routeName: string;
  color: string;
  focused: boolean;
}) {
  let iconName: keyof typeof Ionicons.glyphMap = "home";

  if (routeName === "index") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "wallet") {
    iconName = focused ? "wallet" : "wallet-outline";
  } else if (routeName === "referral") {
    iconName = focused ? "people" : "people-outline";
  } else if (routeName === "settings") {
    iconName = focused ? "settings" : "settings-outline";
  }

  return <Ionicons name={iconName} size={22} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  // Custom tab bar with TabBarBackground component
  const CustomTabBar = (props: BottomTabBarProps) => {
    return (
      <TabBarBackground
        transparent={false} // Use solid background instead of transparent
        noTopBorder={true} // Remove the top border to eliminate the color strip
        blurred={false} // Disable blur effect to ensure solid background
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <BottomTabBar
          {...props}
          // Remove any additional padding that might be causing the issue
          style={{
            backgroundColor: "transparent", // Make the actual tab bar transparent
            elevation: 0, // Remove Android elevation
            shadowOpacity: 0, // Remove iOS shadow
            borderTopWidth: 0, // Remove top border
          }}
        />
      </TabBarBackground>
    );
  };

  // Tab options
  const tabOptions = {
    tabBarActiveTintColor: Colors[colorScheme].tint,
    tabBarInactiveTintColor: isDark ? "#8E8E93" : "#AEAEB2",
    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: "500" as TextStyle["fontWeight"],
    },
    tabBarStyle: {
      backgroundColor: "transparent", // Make it transparent to allow TabBarBackground to show
      borderTopColor: "transparent", // Remove the default border top
      elevation: 0, // Remove Android elevation shadow
      shadowOpacity: 0, // Remove iOS shadow
      height: 50,
      borderTopWidth: 0,
    },
    headerShown: false,
    // Set bottom padding to 0 to avoid extra space
    tabBarItemStyle: {
      paddingBottom: 0,
    },
    // Set the container background to transparent
    contentStyle: {
      backgroundColor: "transparent",
    },
  };

  // Icon factory functions
  const getTabIcon = (routeName: string) => {
    const IconComponent = (props: { focused: boolean; color: string }) => (
      <TabIcon routeName={routeName} {...props} />
    );
    IconComponent.displayName = `${routeName}TabIcon`;
    return IconComponent;
  };

  return (
    <Tabs
      screenOptions={tabOptions}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: getTabIcon("index"),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: getTabIcon("wallet"),
        }}
      />
      <Tabs.Screen
        name="referral"
        options={{
          title: "Referral",
          tabBarIcon: getTabIcon("referral"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: getTabIcon("settings"),
        }}
      />
    </Tabs>
  );
}
