import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import feature providers and context
import { AuthFeature } from "@/features/auth";
import { ExpenseProvider } from "@/features/expenses";
import { WalletFeature } from "@/features/wallet";
import { FeaturesProvider } from "@/shared/contexts/FeaturesContext";
import { featureRegistry } from "@/shared/services/FeatureRegistry";

import { useColorScheme } from "@/hooks/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Register features
featureRegistry.registerFeature({
  id: "auth",
  name: AuthFeature.name,
  description: AuthFeature.description,
  enabled: true,
});

featureRegistry.registerFeature({
  id: "wallet",
  name: WalletFeature.name,
  description: WalletFeature.description,
  enabled: true,
});

featureRegistry.registerFeature({
  id: "expenses",
  name: "Expenses",
  description: "Expense tracking and management",
  enabled: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

/**
 * Root layout navigator with all feature providers
 * This is where we compose our feature providers to make them available throughout the app
 */
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // Feature configuration
  const featureConfig = {
    auth: { enabled: true },
    wallet: { enabled: true },
    expenses: { enabled: true },
  };

  return (
    // Wrap the app with the Features Provider
    <FeaturesProvider config={featureConfig}>
      {/* Wrap with individual feature providers */}
      <ExpenseProvider>
        {/* TODO: Add other feature providers as they are implemented */}
        {/* <AuthProvider> */}
        {/* <WalletProvider> */}
        <SafeAreaProvider style={{ backgroundColor: "transparent" }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" redirect />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="bank-accounts" />
                <Stack.Screen name="add-bank-account" />
                <Stack.Screen name="verification" />
                <Stack.Screen name="security" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </View>
          </ThemeProvider>
        </SafeAreaProvider>
        {/* </WalletProvider> */}
        {/* </AuthProvider> */}
      </ExpenseProvider>
    </FeaturesProvider>
  );
}
