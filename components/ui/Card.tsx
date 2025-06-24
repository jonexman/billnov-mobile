import { borderRadius, colors, shadows } from "@/shared/constants/theme";
import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

export type CardVariant = "default" | "elevated" | "outlined";

interface CardProps extends ViewProps {
  variant?: CardVariant;
  cardStyle?: ViewStyle;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  cardStyle,
  children,
  ...rest
}) => {
  // Get styles based on variant
  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      padding: 16,
    };

    // Variant styles
    const variantStyles: Record<CardVariant, ViewStyle> = {
      default: {
        backgroundColor: colors.neutral.white,
      },
      elevated: {
        backgroundColor: colors.neutral.white,
        ...shadows.md,
      },
      outlined: {
        backgroundColor: colors.neutral.white,
        borderWidth: 1,
        borderColor: colors.neutral.gray300,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <View style={[getCardStyles(), cardStyle]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    padding: 16,
  },
});
