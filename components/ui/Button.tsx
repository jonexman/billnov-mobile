import { borderRadius, colors, typography } from "@/shared/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  buttonStyle,
  textStyle,
  disabled,
  ...rest
}) => {
  // Get styles based on variant and size
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingVertical: 8, paddingHorizontal: 12 },
      md: { paddingVertical: 12, paddingHorizontal: 16 },
      lg: { paddingVertical: 16, paddingHorizontal: 24 },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary.main,
      },
      secondary: {
        backgroundColor: colors.accent.main,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary.main,
      },
      ghost: {
        backgroundColor: "transparent",
      },
    };

    const disabledStyle: ViewStyle = disabled ? { opacity: 0.6 } : {};

    const widthStyle: ViewStyle = fullWidth ? { width: "100%" } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...disabledStyle,
      ...widthStyle,
    };
  };

  // Get text styles based on variant
  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: "center",
      fontWeight: typography.fontWeights.semibold,
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: { fontSize: typography.fontSizes.sm },
      md: { fontSize: typography.fontSizes.md },
      lg: { fontSize: typography.fontSizes.lg },
    };

    // Variant styles
    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: colors.primary.contrast,
      },
      secondary: {
        color: colors.accent.contrast,
      },
      outline: {
        color: colors.primary.main,
      },
      ghost: {
        color: colors.primary.main,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), buttonStyle]}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "ghost"
              ? colors.primary.main
              : colors.neutral.white
          }
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              getTextStyles(),
              textStyle,
              leftIcon || rightIcon ? { marginHorizontal: 8 } : null,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};
