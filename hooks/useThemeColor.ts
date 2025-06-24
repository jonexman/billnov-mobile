/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "@/shared/constants/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}

// Helper functions to get theme colors directly
export function getPrimaryColor(theme: "light" | "dark" = "light"): string {
  return theme === "light" ? colors.primary.main : colors.primary.light;
}

export function getAccentColor(theme: "light" | "dark" = "light"): string {
  return theme === "light" ? colors.accent.main : colors.accent.light;
}

export function getTextColor(theme: "light" | "dark" = "light"): string {
  return theme === "light" ? colors.neutral.gray900 : colors.neutral.white;
}

export function getBackgroundColor(theme: "light" | "dark" = "light"): string {
  return theme === "light"
    ? colors.neutral.background
    : colors.neutral.backgroundDark;
}

export function getBorderColor(theme: "light" | "dark" = "light"): string {
  return theme === "light" ? colors.neutral.gray300 : colors.neutral.gray700;
}
