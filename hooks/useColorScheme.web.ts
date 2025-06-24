import { useEffect, useState } from "react";

/**
 * A custom hook that detects the user's color scheme preference
 * This implementation avoids the infinite loop issues
 */
export function useColorScheme(): "light" | "dark" {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Only run once on component mount
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setColorScheme(isDarkMode ? "dark" : "light");

    // Set up listener for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? "dark" : "light");
    };

    // Add listener
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else if (mediaQuery?.addListener) {
      // For older browsers
      mediaQuery.addListener(handler);
    }

    // Clean up
    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else if (mediaQuery?.removeListener) {
        mediaQuery.removeListener(handler);
      }
    };
  }, []); // Empty dependency array - only run once

  return colorScheme;
}
