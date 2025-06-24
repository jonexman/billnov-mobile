/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { colors } from "@/shared/constants/theme";

const tintColorLight = colors.primary.main;
const tintColorDark = colors.accent.main;

export default {
  light: {
    text: colors.neutral.gray900,
    background: colors.neutral.background,
    tint: tintColorLight,
    tabIconDefault: colors.neutral.gray500,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: colors.neutral.white,
    background: colors.neutral.backgroundDark,
    tint: tintColorDark,
    tabIconDefault: colors.neutral.gray600,
    tabIconSelected: tintColorDark,
  },
};
