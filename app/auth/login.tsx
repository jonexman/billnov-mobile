import Colors from "@/constants/Colors";
import { useAuth } from "@/features/auth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Define colors based on theme
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const primaryColor = Colors[colorScheme].tint;
  const inputBgColor = isDark ? "#1C1C1E" : "#F2F2F7";
  const placeholderColor = isDark ? "#8E8E93" : "#C7C7CC";

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError("Please enter both email and password");
      return;
    }

    try {
      setLoginError(null);
      console.log("Attempting to sign in with:", email);

      // Use the signIn method from the auth context directly
      const { data, error } = await signIn(email, password);

      console.log("Sign in response:", {
        data: data ? "Data exists" : "No data",
        session: data?.session ? "Session exists" : "No session",
        error: error ? error.message : "No error",
      });

      if (error) {
        console.error("Login error:", error);

        // More detailed error messaging based on error type
        if (error.message?.includes("Invalid login")) {
          setLoginError(
            "Invalid email or password. Please check your credentials."
          );
        } else if (error.message?.includes("Email not confirmed")) {
          setLoginError("Please verify your email address before logging in.");
        } else {
          setLoginError(
            error.message || "Failed to login. Please check your credentials."
          );
        }
      } else if (!data || !data.session) {
        console.error("No session returned after login");
        setLoginError("Authentication failed. Please try again.");
      } else {
        console.log("Login successful:", data.user?.email);
        // Auth context will handle the redirection via AuthGuard
      }
    } catch (error) {
      console.error("Login exception:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor }]}
    >
      <Stack.Screen
        options={{
          title: "Login",
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/billnov-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: textColor }]}>Welcome Back</Text>
        <Text
          style={[styles.subtitle, { color: isDark ? "#8E8E93" : "#6E6E73" }]}
        >
          Sign in to continue to BillNov
        </Text>

        {loginError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{loginError}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <View
            style={[styles.inputContainer, { backgroundColor: inputBgColor }]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={placeholderColor}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Email"
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View
            style={[styles.inputContainer, { backgroundColor: inputBgColor }]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={placeholderColor}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={placeholderColor}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            <Text style={[styles.forgotPasswordText, { color: primaryColor }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: primaryColor, opacity: isLoading ? 0.7 : 1 },
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.loginButtonText}>Signing in...</Text>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text
              style={[
                styles.signupText,
                { color: isDark ? "#8E8E93" : "#6E6E73" },
              ]}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[styles.signupLink, { color: primaryColor }]}>
                {" Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
  },
  devContainer: {
    marginTop: 40,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    borderStyle: "dashed",
  },
  devTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  devButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  devButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
