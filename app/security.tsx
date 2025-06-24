import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SecurityScreen() {
  const router = useRouter();
  const [enable2FA, setEnable2FA] = useState(false);

  const handleResetPin = () => {
    Alert.alert(
      "Reset PIN",
      "PIN reset functionality would be implemented here"
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "Password change functionality would be implemented here"
    );
  };

  const handleEnable2FA = () => {
    Alert.alert("2FA", "2FA setup functionality would be implemented here");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Account Deleted",
              "Account deletion functionality would be implemented here"
            );
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Reset PIN */}
        <View style={styles.securityCard}>
          <View style={styles.securityCardContent}>
            <View>
              <Text style={styles.cardTitle}>Reset Pin</Text>
              <Text style={styles.cardDescription}>
                Forgot your 4 digit pin? You can reset it now!
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleResetPin}
            >
              <Text style={styles.actionButtonText}>Reset pin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password */}
        <View style={styles.securityCard}>
          <View style={styles.securityCardContent}>
            <View>
              <Text style={styles.cardTitle}>Change Password</Text>
              <Text style={styles.cardDescription}>
                To sign in, your password is required.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.actionButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2FA */}
        <View style={styles.securityCard}>
          <View style={styles.securityCardContent}>
            <View>
              <Text style={styles.cardTitle}>2 Factor Authentication</Text>
              <Text style={styles.cardDescription}>
                Help protect your account from unauthorised access by adding a
                second layer of authentication.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEnable2FA}
            >
              <Text style={styles.actionButtonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2FA Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Enable 2FA on login</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#B3B6E0" }}
            thumbColor={enable2FA ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor="#E0E0E0"
            onValueChange={() => setEnable2FA(!enable2FA)}
            value={enable2FA}
          />
        </View>

        {/* Delete Account */}
        <View style={[styles.securityCard, styles.deleteCard]}>
          <View style={styles.securityCardContent}>
            <View>
              <Text style={styles.deleteTitle}>Delete Account</Text>
              <Text style={styles.deleteDescription}>
                We do our best to give you a great experience - we'll be sad to
                see you leave us
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  securityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  securityCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    maxWidth: "80%",
  },
  actionButton: {
    backgroundColor: "#E6E9FF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: "#001871",
    fontSize: 14,
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  deleteCard: {
    borderColor: "#FFCDD2",
    marginTop: 8,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#F44336",
  },
  deleteDescription: {
    fontSize: 14,
    color: "#F44336",
    maxWidth: "80%",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
