import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export default function ExpenseOptionsScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleAddCategory = () => {
    console.log("Add category clicked");
    // Uncomment when you have the category screen ready
    // router.push("/categories");
  };

  const handleAddBudget = () => {
    console.log("Add budget clicked");
    // Uncomment when you have the budget screen ready
    // router.push("/budgets");
  };

  const handleExportData = () => {
    console.log("Export data clicked");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Navigate to settings
    router.push("/(tabs)/settings");
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <StyledView className="flex-row items-center px-4 py-4 pt-5 border-b border-gray-100">
        <StyledTouchableOpacity onPress={handleBack} className="p-2 mr-2">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </StyledTouchableOpacity>
        <StyledText className="text-lg font-semibold">More Options</StyledText>
      </StyledView>

      <StyledScrollView className="flex-1">
        <StyledView className="mt-6 px-4">
          <StyledText className="text-base font-semibold text-gray-600 mb-3">
            Transaction Management
          </StyledText>

          <StyledTouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={handleAddCategory}
          >
            <StyledView className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-4">
              <Ionicons name="pricetag-outline" size={24} color="#4A89F3" />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-base font-medium">
                Add Category
              </StyledText>
              <StyledText className="text-sm text-gray-500">
                Create custom expense categories
              </StyledText>
            </StyledView>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={handleAddBudget}
          >
            <StyledView className="w-12 h-12 rounded-full bg-green-50 items-center justify-center mr-4">
              <Ionicons name="wallet-outline" size={24} color="#4CAF50" />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-base font-medium">
                Add Budget
              </StyledText>
              <StyledText className="text-sm text-gray-500">
                Set spending limits by category
              </StyledText>
            </StyledView>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="mt-6 px-4">
          <StyledText className="text-base font-semibold text-gray-600 mb-3">
            Data & Settings
          </StyledText>

          <StyledTouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={handleExportData}
          >
            <StyledView className="w-12 h-12 rounded-full bg-orange-50 items-center justify-center mr-4">
              <Ionicons name="download-outline" size={24} color="#FF9800" />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-base font-medium">
                Export Data
              </StyledText>
              <StyledText className="text-sm text-gray-500">
                Download your financial data
              </StyledText>
            </StyledView>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={handleSettings}
          >
            <StyledView className="w-12 h-12 rounded-full bg-teal-50 items-center justify-center mr-4">
              <Ionicons name="settings-outline" size={24} color="#009688" />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-base font-medium">
                Settings
              </StyledText>
              <StyledText className="text-sm text-gray-500">
                Configure expense preferences
              </StyledText>
            </StyledView>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
