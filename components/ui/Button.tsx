import { colors } from "@/shared/constants/theme";
import { styled } from "nativewind";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

// Create styled components
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...rest
}) => {
  // Get base and variant classes
  const getButtonClasses = (): string => {
    // Base classes
    let classes = "rounded-md flex-row items-center justify-center";

    // Size classes
    if (size === "sm") classes += " py-2 px-3";
    else if (size === "md") classes += " py-3 px-4";
    else if (size === "lg") classes += " py-4 px-6";

    // Variant classes
    if (variant === "primary") classes += " bg-primary";
    else if (variant === "secondary") classes += " bg-accent";
    else if (variant === "outline")
      classes += " bg-transparent border border-primary";
    else if (variant === "ghost") classes += " bg-transparent";

    // Disabled state
    if (disabled) classes += " opacity-60";

    // Width
    if (fullWidth) classes += " w-full";

    return classes;
  };

  // Get text classes based on variant
  const getTextClasses = (): string => {
    let classes = "text-center font-semibold";

    // Size classes
    if (size === "sm") classes += " text-sm";
    else if (size === "md") classes += " text-base";
    else if (size === "lg") classes += " text-lg";

    // Variant-specific text color
    if (variant === "primary") classes += " text-white";
    else if (variant === "secondary") classes += " text-white";
    else if (variant === "outline" || variant === "ghost")
      classes += " text-primary";

    return classes;
  };

  return (
    <StyledTouchableOpacity
      className={`${getButtonClasses()} ${className}`}
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
          <StyledText
            className={`${getTextClasses()} ${
              leftIcon || rightIcon ? "mx-2" : ""
            }`}
          >
            {title}
          </StyledText>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </StyledTouchableOpacity>
  );
};
