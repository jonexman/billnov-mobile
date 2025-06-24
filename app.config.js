import "dotenv/config";

export default {
  expo: {
    name: "BillNov Mobile",
    slug: "billnov-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash-icon.png",
    scheme: "billnov",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.billnov.mobile",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/splash-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.billnov.mobile",
    },
    web: {
      favicon: "./assets/images/splash-icon.png",
    },
    extra: {
      // Load environment variables
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      appEnv: process.env.APP_ENV || "development",
      enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
      enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === "true",
      enableRealtime: process.env.ENABLE_REALTIME === "true",
      eas: {
        projectId: "your-eas-project-id",
      },
    },
    plugins: ["expo-router"],
  },
};
