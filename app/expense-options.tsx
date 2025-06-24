import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More Options</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Management</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleAddCategory}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
            >
              <Ionicons name="pricetag-outline" size={24} color="#4A89F3" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Add Category</Text>
              <Text style={styles.menuItemDescription}>
                Create custom expense categories
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleAddBudget}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#E8F5E9" }]}
            >
              <Ionicons name="wallet-outline" size={24} color="#4CAF50" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Add Budget</Text>
              <Text style={styles.menuItemDescription}>
                Set spending limits by category
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Settings</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleExportData}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#FFF3E0" }]}
            >
              <Ionicons name="download-outline" size={24} color="#FF9800" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Export Data</Text>
              <Text style={styles.menuItemDescription}>
                Download your financial data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#E0F2F1" }]}
            >
              <Ionicons name="settings-outline" size={24} color="#009688" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Settings</Text>
              <Text style={styles.menuItemDescription}>
                Configure expense preferences
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
});
