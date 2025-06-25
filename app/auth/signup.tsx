import { useAuth } from "@/features/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTextInput = styled(TextInput);

export default function SignupScreen() {
  const { signUp } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [source, setSource] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sources dropdown options
  const sources = [
    "Social Media",
    "Friend/Family",
    "Search Engine",
    "Advertisement",
    "Other",
  ];

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate username
    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Validate first name
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call the signUp method from AuthContext
      const { data, error } = await signUp(email, password);

      if (error) {
        Alert.alert("Signup Error", error.message);
        return;
      }

      // If signup is successful, we should store additional user data
      // This would typically be done in a separate users table
      // For now, we'll just navigate to onboarding

      Alert.alert(
        "Signup Successful",
        "Please check your email to confirm your account.",
        [
          {
            text: "OK",
            onPress: () => router.replace("../onboarding/"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StyledSafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <StyledScrollView className="flex-1 px-6">
          {/* Logo */}
          <StyledView className="items-center mt-10 mb-8">
            <Image
              source={require("../../assets/images/billnov-logo.png")}
              style={{ width: 180, height: 50 }}
              resizeMode="contain"
            />
          </StyledView>

          {/* Tab Navigation */}
          <StyledView className="flex-row mb-10">
            <StyledTouchableOpacity
              className="flex-1"
              onPress={() => router.push("./login")}
            >
              <StyledText className="text-gray-400 text-lg font-medium text-center">
                Log In
              </StyledText>
            </StyledTouchableOpacity>
            <StyledView className="flex-1">
              <StyledText className="text-primary text-lg font-medium text-center mb-1">
                Sign Up
              </StyledText>
              <StyledView className="h-1 bg-primary mx-auto w-6 rounded-full" />
            </StyledView>
          </StyledView>

          {/* Form */}
          <StyledView className="mb-4">
            <StyledText className="text-gray-600 mb-1">Username</StyledText>
            <StyledTextInput
              className={`bg-white border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 mb-1`}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) {
                  setErrors({ ...errors, username: "" });
                }
              }}
              placeholder="Enter your username"
              autoCapitalize="none"
            />
            {errors.username ? (
              <StyledText className="text-red-500 text-xs mb-2">
                {errors.username}
              </StyledText>
            ) : (
              <StyledView className="mb-3" />
            )}

            <StyledText className="text-gray-600 mb-1">First name</StyledText>
            <StyledTextInput
              className={`bg-white border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 mb-1`}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (errors.firstName) {
                  setErrors({ ...errors, firstName: "" });
                }
              }}
              placeholder="Enter your first name"
            />
            {errors.firstName ? (
              <StyledText className="text-red-500 text-xs mb-2">
                {errors.firstName}
              </StyledText>
            ) : (
              <StyledView className="mb-3" />
            )}

            <StyledText className="text-gray-600 mb-1">Email</StyledText>
            <StyledTextInput
              className={`bg-white border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 mb-1`}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email ? (
              <StyledText className="text-red-500 text-xs mb-2">
                {errors.email}
              </StyledText>
            ) : (
              <StyledView className="mb-3" />
            )}

            <StyledText className="text-gray-600 mb-1">Phone number</StyledText>
            <StyledTextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />

            <StyledText className="text-gray-600 mb-1">Password</StyledText>
            <StyledView
              className={`flex-row bg-white border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg mb-1 items-center`}
            >
              <StyledTextInput
                className="flex-1 p-3"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <StyledTouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="px-3"
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="gray"
                />
              </StyledTouchableOpacity>
            </StyledView>
            {errors.password ? (
              <StyledText className="text-red-500 text-xs mb-2">
                {errors.password}
              </StyledText>
            ) : (
              <StyledView className="mb-3" />
            )}

            <StyledText className="text-gray-600 mb-1">
              Confirm Password
            </StyledText>
            <StyledView
              className={`flex-row bg-white border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg mb-1 items-center`}
            >
              <StyledTextInput
                className="flex-1 p-3"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: "" });
                  }
                }}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
              />
              <StyledTouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="px-3"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="gray"
                />
              </StyledTouchableOpacity>
            </StyledView>
            {errors.confirmPassword ? (
              <StyledText className="text-red-500 text-xs mb-2">
                {errors.confirmPassword}
              </StyledText>
            ) : (
              <StyledView className="mb-3" />
            )}

            <StyledText className="text-gray-600 mb-1">
              Referral Code (Optional)
            </StyledText>
            <StyledTextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={referralCode}
              onChangeText={setReferralCode}
              placeholder="Enter your referral code (Optional)"
            />

            <StyledText className="text-gray-600 mb-1">
              Where did you hear about us
            </StyledText>
            <StyledTouchableOpacity
              className="bg-white border border-gray-300 rounded-lg p-3 mb-6 flex-row justify-between items-center"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <StyledText className={source ? "text-black" : "text-gray-400"}>
                {source || "Select your response"}
              </StyledText>
              <Ionicons
                name={showDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="gray"
              />
            </StyledTouchableOpacity>

            {showDropdown && (
              <StyledView className="bg-white border border-gray-200 rounded-lg mb-4 shadow-sm">
                {sources.map((item, index) => (
                  <StyledTouchableOpacity
                    key={index}
                    className="p-3 border-b border-gray-100"
                    onPress={() => {
                      setSource(item);
                      setShowDropdown(false);
                    }}
                  >
                    <StyledText>{item}</StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>
            )}
          </StyledView>

          {/* Sign Up Button */}
          <StyledTouchableOpacity
            className={`bg-primary py-4 rounded-full items-center mb-10 ${
              isLoading ? "opacity-70" : ""
            }`}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <StyledText className="text-white font-bold text-base">
                Sign up
              </StyledText>
            )}
          </StyledTouchableOpacity>

          {/* Terms and Privacy */}
          <StyledText className="text-center text-gray-500 text-xs mb-10">
            By signing up, you agree to our{" "}
            <StyledText className="text-primary">Terms of Service</StyledText>{" "}
            and <StyledText className="text-primary">Privacy Policy</StyledText>
          </StyledText>
        </StyledScrollView>
      </StyledSafeAreaView>
    </StyledKeyboardAvoidingView>
  );
}
