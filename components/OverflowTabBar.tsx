import { TabBarBackground } from "@/components/ui";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { colors, spacing, typography } from "@/shared/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Example tab item interface
interface TabItem {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface OverflowTabBarProps {
  tabs: TabItem[];
  activeTabKey?: string;
  maxVisibleTabs?: number;
}

/**
 * An example component that demonstrates how to use the useBottomTabOverflow hook
 * to create a tab bar with overflow functionality
 */
export const OverflowTabBar: React.FC<OverflowTabBarProps> = ({
  tabs,
  activeTabKey,
  maxVisibleTabs = 4,
}) => {
  // Use the hook to handle tab overflow
  const {
    visibleTabs,
    moreTabs,
    hasOverflow,
    showMoreTabs,
    hideMoreTabs,
    isMoreTabsVisible,
    moreTabsAnimation,
  } = useBottomTabOverflow<TabItem>(tabs, { maxVisibleTabs });

  const { width } = Dimensions.get("window");

  // Animation for the overflow menu
  const overlayOpacity = moreTabsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const menuTranslateY = moreTabsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  // Render a single tab item
  const renderTabItem = (tab: TabItem, index: number, isOverflow = false) => {
    const isActive = tab.key === activeTabKey;
    // Use the outline version if provided and not active, otherwise use the regular icon
    const iconName = isActive ? tab.icon : tab.iconOutline || tab.icon;

    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tabItem, isOverflow ? styles.overflowTabItem : null]}
        onPress={() => {
          if (isMoreTabsVisible) {
            hideMoreTabs();
          }
          tab.onPress();
        }}
      >
        <Ionicons
          name={iconName}
          size={24}
          color={isActive ? colors.primary.main : colors.neutral.gray600}
        />
        <Text
          style={[
            styles.tabLabel,
            isActive ? styles.activeTabLabel : null,
            isOverflow ? styles.overflowTabLabel : null,
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Overflow Menu Modal */}
      {isMoreTabsVisible && (
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
            onTouchStart={hideMoreTabs}
          />
          <Animated.View
            style={[
              styles.overflowMenu,
              { transform: [{ translateY: menuTranslateY }] },
            ]}
          >
            <View style={styles.overflowHeader}>
              <Text style={styles.overflowTitle}>More</Text>
              <TouchableOpacity onPress={hideMoreTabs}>
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.neutral.gray700}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.overflowContent}>
              {moreTabs.map((tab, index) => renderTabItem(tab, index, true))}
            </View>
          </Animated.View>
        </View>
      )}

      {/* Main Tab Bar */}
      <TabBarBackground>
        <View style={styles.tabBar}>
          {visibleTabs.map((tab, index) => renderTabItem(tab, index))}

          {/* "More" button if there are overflow items */}
          {hasOverflow && (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={isMoreTabsVisible ? hideMoreTabs : showMoreTabs}
            >
              <Ionicons
                name={
                  isMoreTabsVisible ? "chevron-down" : "ellipsis-horizontal"
                }
                size={24}
                color={colors.neutral.gray600}
              />
              <Text style={styles.tabLabel}>More</Text>
            </TouchableOpacity>
          )}
        </View>
      </TabBarBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.neutral.black,
  },
  overflowMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  overflowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  overflowTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.neutral.gray900,
  },
  overflowContent: {
    padding: spacing.md,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
  },
  overflowTabItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.neutral.gray100,
  },
  tabLabel: {
    fontSize: typography.fontSizes.xs,
    marginTop: spacing.xs,
    color: colors.neutral.gray600,
  },
  activeTabLabel: {
    color: colors.primary.main,
    fontWeight: typography.fontWeights.medium,
  },
  overflowTabLabel: {
    marginTop: 0,
    marginLeft: spacing.md,
    fontSize: typography.fontSizes.md,
  },
});
