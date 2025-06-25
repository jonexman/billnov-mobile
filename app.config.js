import "dotenv/config";

// Debug environment variables loading
console.log("Environment variables check:");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "Found" : "Not found");
console.log(
  "SUPABASE_ANON_KEY:",
  process.env.SUPABASE_ANON_KEY ? "Found" : "Not found"
);

// Make sure we have mandatory variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("ERROR: Missing required Supabase environment variables!");
  console.error(
    "Make sure you have a .env file with SUPABASE_URL and SUPABASE_ANON_KEY defined."
  );
}

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
        projectId: "rxygoiprunpxpwxtqpel",
      },
    },
    plugins: ["expo-router"],
  },
};
