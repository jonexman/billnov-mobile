import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "@/shared/constants/theme";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabBarBackgroundProps {
  style?: ViewStyle;
  blurred?: boolean;
  blurIntensity?: number;
  children?: React.ReactNode;
  noTopBorder?: boolean;
  transparent?: boolean;
}

interface OverflowOptions {
  maxVisibleTabs?: number;
  moreTabLabel?: string;
  moreTabIcon?: string;
  animationDuration?: number;
}

/**
 * Hook to get the height of the tab bar including safe area insets
 * This is useful for scroll views to add padding at the bottom
 *
 * @param tabBarHeight Base height of the tab bar (without insets)
 * @returns The total height of the tab bar including insets
 *
 * ```tsx
 * // Usage example
 * const tabBarPadding = useTabBarHeight();
 * // Use in a ScrollView
 * <ScrollView contentContainerStyle={{ paddingBottom: tabBarPadding }} />
 * ```
 */
export function useTabBarHeight(tabBarHeight: number = 60) {
  const insets = useSafeAreaInsets();
  // Calculate total height (tab bar + bottom inset)
  return tabBarHeight + insets.bottom;
}

/**
 * Hook for handling overflow items in a bottom tab bar
 *
 * @param tabs Array of tab items to display
 * @param options Configuration options for overflow behavior
 * @returns An object containing the visible tabs, more tabs, animation values and helper methods
 *
 * ```tsx
 * // Usage example
 * const {
 *   visibleTabs,
 *   moreTabs,
 *   showMoreTabs,
 *   hideMoreTabs,
 *   isMoreTabsVisible,
 *   moreTabsAnimation
 * } = useBottomTabOverflow(tabs, { maxVisibleTabs: 4 });
 * ```
 */
export function useBottomTabOverflow<T>(
  tabs: T[],
  options: OverflowOptions = {}
) {
  const { maxVisibleTabs = 4, animationDuration = 300 } = options;

  const [isMoreTabsVisible, setIsMoreTabsVisible] = useState(false);
  const moreTabsAnimation = useRef(new Animated.Value(0)).current;

  // Calculate visible and overflow tabs
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const moreTabs =
    maxVisibleTabs < tabs.length ? tabs.slice(maxVisibleTabs) : [];
  const hasOverflow = moreTabs.length > 0;

  // Toggle functions
  const showMoreTabs = () => {
    setIsMoreTabsVisible(true);
    Animated.timing(moreTabsAnimation, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const hideMoreTabs = () => {
    Animated.timing(moreTabsAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      setIsMoreTabsVisible(false);
    });
  };

  // Reset when tabs change
  useEffect(() => {
    if (isMoreTabsVisible) {
      hideMoreTabs();
    }
  }, [tabs.length]);

  return {
    visibleTabs,
    moreTabs,
    hasOverflow,
    showMoreTabs,
    hideMoreTabs,
    isMoreTabsVisible,
    moreTabsAnimation,
  };
}

/**
 * A customizable background component for tab bars with optional blur effect.
 *
 * Basic usage with expo-router bottom tabs:
 * ```tsx
 * import { Tabs } from "expo-router";
 * import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
 * import { TabBarBackground } from "@/components/ui";
 *
 * export default function TabLayout() {
 *   // Custom tab bar with TabBarBackground
 *   const CustomTabBar = (props: BottomTabBarProps) => {
 *     return (
 *       <TabBarBackground blurred={true} blurIntensity={50}>
 *         <BottomTabBar {...props} />
 *       </TabBarBackground>
 *     );
 *   };
 *
 *   return (
 *     <Tabs
 *       screenOptions={{...}}
 *       tabBar={props => <CustomTabBar {...props} />}
 *     >
 *       // Tab screens go here
 *     </Tabs>
 *   );
 * }
 * ```
 *
 * Usage with transparent background:
 * ```tsx
 * <TabBarBackground transparent={true}>
 *   // Your tab bar content
 * </TabBarBackground>
 * ```
 *
 * Usage without blur effect:
 * ```tsx
 * <TabBarBackground blurred={false}>
 *   // Your tab bar content
 * </TabBarBackground>
 * ```
 */
export const TabBarBackground: React.FC<TabBarBackgroundProps> = ({
  style,
  blurred = true,
  blurIntensity = 50,
  children,
  noTopBorder = false,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Determine border styles
  const borderStyles = !noTopBorder
    ? isDark
      ? styles.darkBorder
      : styles.lightBorder
    : {};

  // For fully transparent background
  if (transparent) {
    return (
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom },
          borderStyles,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  // For blurred background
  if (blurred) {
    return (
      <BlurView
        intensity={blurIntensity}
        tint={isDark ? "dark" : "light"}
        style={[
          styles.container,
          { paddingBottom: insets.bottom },
          borderStyles,
          style,
        ]}
      >
        {children}
      </BlurView>
    );
  }

  // For solid background
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom },
        isDark ? styles.darkBackground : styles.lightBackground,
        borderStyles,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  lightBackground: {
    backgroundColor: colors.neutral.white,
  },
  darkBackground: {
    backgroundColor: colors.neutral.gray800,
  },
  lightBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  darkBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray700,
  },
});

export default TabBarBackground;
