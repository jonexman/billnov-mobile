/**
 * AuthGuard Component
 *
 * This component protects routes by checking if the user is authenticated.
 * If not, it redirects to the login screen.
 */

import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Determines if the user is authenticated and redirects accordingly
 *
 * @param segments - The current route segments
 * @param isAuthenticated - Whether the user is authenticated
 * @param router - The router instance
 * @returns Whether the user is allowed to access the current route
 */
function useProtectedRoute(
  segments: string[],
  isAuthenticated: boolean,
  router: ReturnType<typeof useRouter>
) {
  const inAuthGroup = segments[0] === "auth";
  const inOnboardingGroup = segments[0] === "onboarding";

  useEffect(() => {
    if (
      // If the user is not signed in and the initial segment is not in the auth or onboarding group
      !isAuthenticated &&
      !inAuthGroup &&
      !inOnboardingGroup
    ) {
      // Redirect to the sign-in page
      router.replace("/auth/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from the sign-in page if the user is signed in
      router.replace("/");
    }
  }, [isAuthenticated, segments, inAuthGroup, inOnboardingGroup, router]);

  return { isProtected: !inAuthGroup && !inOnboardingGroup };
}

/**
 * AuthGuard component that protects routes
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const { isProtected } = useProtectedRoute(segments, isAuthenticated, router);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If the route is not protected, or the user is authenticated, render the children
  return <>{children}</>;
}

export default AuthGuard;
