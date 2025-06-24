import { useRouter, useSegments } from "expo-router";
import { useCallback } from "react";

type NavigationRoutes =
  | "home"
  | "wallet"
  | "referral"
  | "settings"
  | "login"
  | "signup"
  | "profile"
  | "bank-accounts"
  | "add-bank-account"
  | "security"
  | "verification/level1"
  | "verification/level2"
  | "wallet-details"
  | "expenses"
  | "expenses-analytics"
  | "expense-options"
  | "explore"
  | "more-actions";

export function useAppNavigation() {
  const router = useRouter();
  const segments = useSegments();

  // Navigate to a specific route
  const navigateTo = useCallback(
    (route: NavigationRoutes, params?: Record<string, string>) => {
      if (route === "home") {
        router.replace("/(tabs)/");
      } else if (
        route === "wallet" ||
        route === "referral" ||
        route === "settings"
      ) {
        router.replace(`/(tabs)/${route}`);
      } else if (route === "login" || route === "signup") {
        router.replace(`/auth/${route}`);
      } else {
        router.push(`/${route}${params ? createQueryString(params) : ""}`);
      }
    },
    [router]
  );

  // Go back to previous screen
  const goBack = useCallback(() => {
    try {
      router.back();
    } catch (e) {
      // If there's no screen to go back to, go to home
      router.replace("/(tabs)/");
    }
  }, [router]);

  // Check if the current route is active
  const isActive = useCallback(
    (route: NavigationRoutes): boolean => {
      if (
        route === "home" &&
        segments[0] === "(tabs)" &&
        segments.length === 1
      ) {
        return true;
      }

      if (route === "wallet" || route === "referral" || route === "settings") {
        return segments[0] === "(tabs)" && segments[1] === route;
      }

      if (route === "login" || route === "signup") {
        return segments[0] === "auth" && segments[1] === route;
      }

      if (route.includes("/")) {
        const routeParts = route.split("/");
        return segments[0] === routeParts[0] && segments[1] === routeParts[1];
      }

      return segments[0] === route;
    },
    [segments]
  );

  // Helper function to create query string from params
  const createQueryString = (params: Record<string, string>): string => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    return `?${queryParams.toString()}`;
  };

  return {
    navigateTo,
    goBack,
    isActive,
    currentRoute: segments,
  };
}
