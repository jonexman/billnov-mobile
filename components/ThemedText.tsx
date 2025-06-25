import { styled } from "nativewind";
import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

// Create styled component
const StyledText = styled(Text);

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

export function ThemedText({
  className = "",
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const getTypeClasses = () => {
    switch (type) {
      case "default":
        return "text-base leading-6";
      case "defaultSemiBold":
        return "text-base leading-6 font-semibold";
      case "title":
        return "text-3xl font-bold leading-8";
      case "subtitle":
        return "text-xl font-bold";
      case "link":
        return "text-base leading-7 text-sky-600";
      default:
        return "text-base leading-6";
    }
  };

  return (
    <StyledText
      className={`${getTypeClasses()} ${className}`}
      style={{ color }}
      {...rest}
    />
  );
}
