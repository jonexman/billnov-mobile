import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // For now, just navigate to home
    router.replace("../(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="px-6 py-8 flex-1">
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
          <View className="flex-1">
            <Text className="text-primary text-lg font-medium text-center mb-1">
              Log In
            </Text>
            <View className="h-1 bg-primary mx-auto w-6 rounded-full" />
          </View>
          <TouchableOpacity
            className="flex-1"
            onPress={() => router.push("./signup")}
          >
            <Text className="text-gray-400 text-lg font-medium text-center">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 mb-6"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text className="text-gray-600 mb-1">Password</Text>
          <View className="flex-row bg-white border border-gray-300 rounded-lg mb-2 items-center">
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

          <TouchableOpacity className="self-end mb-6">
            <Text className="text-gray-500">Forgot password</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-full items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-base">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
