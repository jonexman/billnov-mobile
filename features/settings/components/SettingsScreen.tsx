import { useAuth } from "@/features/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../context/SettingsContext";
import { SettingItem, UserProfileData } from "../types";
import SettingSection from "./SettingSection";

export function SettingsScreen() {
  const { signOut } = useAuth();
  const {
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    biometricAuth,
    setBiometricAuth,
    hasBankAccount,
  } = useSettings();

  const [showBankModal, setShowBankModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Sample user profile data
  const userProfile: UserProfileData = {
    name: "John",
    avatarUrl: undefined, // Using placeholder image instead
    membershipLevel: "Vvip",
    isNewMember: true,
  };

  // Settings sections
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          icon: "person",
          label: "Personal Information",
          iconColor: "#001871",
          type: "link",
        },
        {
          id: "bank",
          icon: "card",
          label: "Bank Accounts",
          iconColor: "#4CAF50",
          type: "link",
        },
        {
          id: "verification",
          icon: "shield-checkmark",
          label: "KYC Verification",
          iconColor: "#00C1D4",
          type: "link",
        },
        {
          id: "security",
          icon: "lock-closed",
          label: "Security Settings",
          iconColor: "#FFB900",
          type: "link",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          icon: "notifications",
          label: "Notifications",
          iconColor: "#FF5722",
          type: "toggle",
          value: notifications,
          onToggle: () => setNotifications(!notifications),
        },
        {
          id: "biometric",
          icon: "finger-print",
          label: "Biometric Authentication",
          iconColor: "#4CAF50",
          type: "toggle",
          value: biometricAuth,
          onToggle: () => setBiometricAuth(!biometricAuth),
        },
        {
          id: "darkMode",
          icon: "moon",
          label: "Dark Mode",
          iconColor: "#673AB7",
          type: "toggle",
          value: darkMode,
          onToggle: () => setDarkMode(!darkMode),
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          id: "help",
          icon: "help-circle",
          label: "Help Center",
          iconColor: "#2196F3",
          type: "link",
        },
        {
          id: "terms",
          icon: "document-text",
          label: "Terms of Service",
          iconColor: "#607D8B",
          type: "link",
        },
        {
          id: "privacy",
          icon: "shield",
          label: "Privacy Policy",
          iconColor: "#795548",
          type: "link",
        },
      ],
    },
  ];

  const handleSettingPress = (item: SettingItem) => {
    if (item.type === "toggle") {
      item.onToggle?.();
    } else {
      // Handle navigation for different links
      if (item.id === "profile") {
        router.push("/profile");
      } else if (item.id === "bank") {
        router.push("/bank-accounts");
      } else if (item.id === "verification") {
        if (!hasBankAccount) {
          // Show the bank account modal only if user doesn't have a bank account
          setShowBankModal(true);
        } else {
          router.push("/verification/level1");
        }
      } else if (item.id === "security") {
        router.push("/security");
      }
      // Add other navigation links here as needed
    }
  };

  const handleAddBankAccount = () => {
    setShowBankModal(false);
    // Navigate to add bank account screen
    router.push("/add-bank-account");
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log("Logging out...");

      // Call the signOut method from auth context
      const success = await signOut();

      if (success) {
        console.log("Logout successful");
        // AuthGuard will automatically redirect to login screen
      } else {
        console.error("Logout failed");
        Alert.alert(
          "Logout Failed",
          "An error occurred while logging out. Please try again."
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Logout Error",
        "An unexpected error occurred while logging out."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Upgrade Banner */}
          <View style={styles.upgradeBanner}>
            <View style={styles.upgradeIconContainer}>
              <Ionicons name="star" size={24} color="#5C4033" />
            </View>
            <View style={styles.upgradeTextContainer}>
              <Text style={styles.upgradeTitle}>Upgrade to level 1</Text>
              <Text style={styles.upgradeDescription}>
                Enjoy more benefits when you verify your account
              </Text>
            </View>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => router.push("/verification/level1")}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>Settings</Text>

          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("@/assets/images/profile-placeholder.png")}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <View style={styles.membershipBadge}>
              <Text style={styles.membershipText}>
                {userProfile.membershipLevel}
              </Text>
              {userProfile.isNewMember && (
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>NEW</Text>
                </View>
              )}
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section) => (
            <SettingSection
              key={section.title}
              section={section}
              onItemPress={handleSettingPress}
            />
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            <Ionicons
              name={isLoggingOut ? "hourglass" : "log-out"}
              size={20}
              color="#F44336"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bank Account Modal */}
      <Modal
        visible={showBankModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowBankModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bank Account Required</Text>
            <Text style={styles.modalDescription}>
              Please add your bank details to proceed with KYC verification
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setShowBankModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddBankAccount}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333333",
  },
  profileCard: {
    backgroundColor: "#001871", // Primary color
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: "#00CED1",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  membershipText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  newTag: {
    backgroundColor: "#FF6347",
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newTagText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
  },
  upgradeBanner: {
    backgroundColor: "#FFF9C4",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  upgradeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  upgradeDescription: {
    fontSize: 12,
    color: "#666",
  },
  upgradeButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "80%",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  modalDescription: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  closeButton: {
    borderRightWidth: 1,
    borderRightColor: "#EEEEEE",
  },
  addButton: {},
  closeButtonText: {
    color: "#FF6347",
    fontWeight: "600",
  },
  addButtonText: {
    color: "#001871",
    fontWeight: "600",
  },
});

export default SettingsScreen;
