import { useEffect, useState } from "react";
import {
  Appearance,
  useColorScheme as useNativeColorScheme,
} from "react-native";

/**
 * A custom hook that wraps the native useColorScheme to prevent re-render issues
 */
export function useColorScheme(): "light" | "dark" {
  // Get initial color scheme
  const nativeColorScheme = useNativeColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    nativeColorScheme || "light"
  );

  useEffect(() => {
    // Update if native color scheme changes
    if (nativeColorScheme) {
      setColorScheme(nativeColorScheme);
    }

    // Set up listener for appearance changes
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        if (newColorScheme) {
          setColorScheme(newColorScheme);
        }
      }
    );

    // Clean up subscription
    return () => {
      subscription.remove();
    };
  }, [nativeColorScheme]);

  return colorScheme;
}
