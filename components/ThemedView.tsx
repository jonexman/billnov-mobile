import { styled } from "nativewind";
import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

// Create styled component
const StyledView = styled(View);

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  className = "",
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <StyledView className={className} style={{ backgroundColor }} {...rest} />
  );
}
