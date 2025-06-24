import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
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

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [source, setSource] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sources dropdown options
  const sources = [
    "Social Media",
    "Friend/Family",
    "Search Engine",
    "Advertisement",
    "Other",
  ];

  const handleSignup = () => {
    // For now, just navigate to onboarding
    router.replace("../onboarding/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ScrollView className="flex-1 px-6">
          {/* Logo */}
          <View className="items-center mt-10 mb-8">
            <Image
              source={require("../../assets/images/billnov-logo.png")}
              style={{ width: 180, height: 50 }}
              resizeMode="contain"
            />
          </View>

          {/* Tab Navigation */}
          <View className="flex-row mb-10">
            <TouchableOpacity
              className="flex-1"
              onPress={() => router.push("./login")}
            >
              <Text className="text-gray-400 text-lg font-medium text-center">
                Log In
              </Text>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-primary text-lg font-medium text-center mb-1">
                Sign Up
              </Text>
              <View className="h-1 bg-primary mx-auto w-6 rounded-full" />
            </View>
          </View>

          {/* Form */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Username</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
            />

            <Text className="text-gray-600 mb-1">First name</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
            />

            <Text className="text-gray-600 mb-1">Email</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text className="text-gray-600 mb-1">Phone number</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />

            <Text className="text-gray-600 mb-1">Password</Text>
            <View className="flex-row bg-white border border-gray-300 rounded-lg mb-4 items-center">
              <TextInput
                className="flex-1 p-3"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="px-3"
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-600 mb-1">Referral Code(Optional)</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 mb-4"
              value={referralCode}
              onChangeText={setReferralCode}
              placeholder="Enter your referral code(Optional)"
            />

            <Text className="text-gray-600 mb-1">
              Where did you hear about us
            </Text>
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-lg p-3 mb-6 flex-row justify-between items-center"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text className={source ? "text-black" : "text-gray-400"}>
                {source || "Select your response"}
              </Text>
              <Ionicons
                name={showDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>

            {showDropdown && (
              <View className="bg-white border border-gray-200 rounded-lg mb-4 shadow-sm">
                {sources.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-3 border-b border-gray-100"
                    onPress={() => {
                      setSource(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-full items-center mb-10"
            onPress={handleSignup}
          >
            <Text className="text-white font-bold text-base">Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
