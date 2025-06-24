import { TextStyle } from "react-native";

// Theme constants

// Color palette
export const colors = {
  // Primary colors
  primary: {
    main: "#001871",
    light: "#2a4089",
    dark: "#00105c",
    contrast: "#FFFFFF",
  },

  // Secondary/accent colors
  accent: {
    main: "#00C1D4",
    light: "#33CDDD",
    dark: "#00969A",
    contrast: "#FFFFFF",
  },

  // Neutral colors
  neutral: {
    white: "#FFFFFF",
    background: "#F8F9FA",
    backgroundDark: "#1A1C21",
    gray100: "#F1F3F5",
    gray200: "#E9ECEF",
    gray300: "#DEE2E6",
    gray400: "#CED4DA",
    gray500: "#ADB5BD",
    gray600: "#6C757D",
    gray700: "#495057",
    gray800: "#343A40",
    gray900: "#212529",
    black: "#000000",
  },

  // Semantic colors
  success: {
    main: "#28A745",
    light: "#48B461",
    dark: "#1E7E34",
    contrast: "#FFFFFF",
  },

  warning: {
    main: "#FFC107",
    light: "#FFCD39",
    dark: "#D6A206",
    contrast: "#212529",
  },

  error: {
    main: "#DC3545",
    light: "#E35D69",
    dark: "#BD2130",
    contrast: "#FFFFFF",
  },

  info: {
    main: "#17A2B8",
    light: "#45B4C6",
    dark: "#117A8B",
    contrast: "#FFFFFF",
  },
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },

  fontWeights: {
    regular: "400" as TextStyle["fontWeight"],
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
    extraBold: "800" as TextStyle["fontWeight"],
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Default theme
export const defaultTheme = {
  dark: false,
  colors: {
    primary: colors.primary.main,
    background: colors.neutral.background,
    card: colors.neutral.white,
    text: colors.neutral.gray900,
    border: colors.neutral.gray300,
    notification: colors.accent.main,
  },
};

// Dark theme
export const darkTheme = {
  dark: true,
  colors: {
    primary: colors.primary.main,
    background: colors.neutral.backgroundDark,
    card: colors.neutral.gray800,
    text: colors.neutral.white,
    border: colors.neutral.gray700,
    notification: colors.accent.main,
  },
};
