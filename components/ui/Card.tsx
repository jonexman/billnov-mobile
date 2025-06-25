import { styled } from "nativewind";
import React from "react";
import { View, ViewProps } from "react-native";

// Create styled component
const StyledView = styled(View);

export type CardVariant = "default" | "elevated" | "outlined";

interface CardProps extends ViewProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  className = "",
  children,
  ...rest
}) => {
  // Get classes based on variant
  const getCardClasses = (): string => {
    // Base classes
    let classes = "rounded-md p-4";

    // Variant classes
    if (variant === "default") classes += " bg-white";
    else if (variant === "elevated") classes += " bg-white shadow-md";
    else if (variant === "outlined")
      classes += " bg-white border border-gray-300";

    return classes;
  };

  return (
    <StyledView className={`${getCardClasses()} ${className}`} {...rest}>
      {children}
    </StyledView>
  );
};
