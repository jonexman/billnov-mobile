import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Key for storing bank account status
const BANK_ACCOUNT_STATUS_KEY = "billnov_has_bank_account";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  // State to track if user has a bank account
  const [hasBankAccount, setHasBankAccount] = useState(false);

  // Check if user has added a bank account on screen focus
  useEffect(() => {
    const checkBankAccountStatus = async () => {
      try {
        const status = await AsyncStorage.getItem(BANK_ACCOUNT_STATUS_KEY);
        if (status === "true") {
          setHasBankAccount(true);
        }
      } catch (error) {
        console.log("Error reading bank account status:", error);
      }
    };

    checkBankAccountStatus();

    // This would be better with a focus listener, but for simplicity we'll just check on mount
  }, []);

  const handleLogout = () => {
    router.replace("/auth/login");
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

  const handleSettingPress = (item: any) => {
    if (item.type === "toggle") {
      item.onToggle();
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

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        className="flex-row items-center justify-between py-3 border-b border-gray-100"
        onPress={() => handleSettingPress(item)}
      >
        <View className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center mr-3`}
            style={{ backgroundColor: `${item.iconColor}15` }}
          >
            <Ionicons name={item.icon} size={18} color={item.iconColor} />
          </View>
          <Text className="text-gray-800">{item.label}</Text>
        </View>

        {item.type === "toggle" ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: "#D1D1D6", true: "#001871" }}
            thumbColor={"#FFFFFF"}
          />
        ) : (
          <Ionicons name="chevron-forward" size={18} color="gray" />
        )}
      </TouchableOpacity>
    );
  };

  const handleAddBankAccount = () => {
    setShowBankModal(false);
    // Navigate to add bank account screen
    router.push("/add-bank-account");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView className="flex-1">
        <View className="px-6 pt-4 pb-8">
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

          <Text className="text-2xl font-bold mb-6 mt-4">Settings</Text>

          {/* User Profile Card */}
          <View className="bg-primary rounded-xl p-6 mb-8 items-center">
            <View className="h-20 w-20 rounded-full bg-gray-300 mb-3 overflow-hidden">
              <Image
                source={require("../../assets/images/profile-placeholder.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <Text className="text-white text-2xl font-bold mb-1">John</Text>
            <View style={styles.vipBadge}>
              <Text style={styles.vipText}>Vvip</Text>
              <View style={styles.newTag}>
                <Text style={styles.newTagText}>NEW</Text>
              </View>
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section) => (
            <View key={section.title} className="mb-6">
              <Text className="text-gray-500 uppercase text-xs font-medium mb-2">
                {section.title}
              </Text>
              <View className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
                {section.items.map(renderSettingItem)}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            className="mt-4 py-4 px-6 bg-red-50 rounded-xl flex-row items-center justify-center"
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out"
              size={20}
              color="#F44336"
              className="mr-2"
            />
            <Text className="text-red-600 font-medium ml-2">Logout</Text>
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
  vipBadge: {
    backgroundColor: "#00CED1",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  vipText: {
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
