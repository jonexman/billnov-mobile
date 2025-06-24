import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Level2VerificationScreen() {
  const router = useRouter();
  const [identityType, setIdentityType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [document, setDocument] = useState(null);

  const userDetails = {
    name: "JOHN KALU AKUMA ALI",
  };

  const accountLimits = [
    { label: "Daily withdrawal limit", value: "NGN 2,000,000.00" },
    { label: "Monthly withdrawal limit", value: "NGN 10,000,000.00" },
    { label: "Crypto withdrawal limit", value: "100 BTC" },
    { label: "Crypto deposit", value: "Unlimited" },
    { label: "Transactions", value: "Unlimited" },
  ];

  const identityOptions = [
    "International passport",
    "National ID",
    "Drivers license",
    "Voters Card",
  ];

  const handleSelectIdentity = (type) => {
    setIdentityType(type);
    setShowDropdown(false);
  };

  const handleUploadDocument = () => {
    // In a real app, this would open document picker
    alert("Document upload functionality would be implemented here");
    setDocument("Document uploaded");
  };

  const handleProceedToLevel3 = () => {
    // Navigate to Level 3 verification
    alert("Proceeding to Level 3");
    router.back(); // Just go back for now as we don't have Level 3 yet
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
        <Text style={styles.headerTitle}>Level 2-Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Identity verification</Text>

        {/* Level 2 Verification Card */}
        <View style={styles.verificationCard}>
          <Text style={styles.levelLabel}>Level 2</Text>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <View style={styles.separator} />

          {/* Identity Type Selection */}
          <View style={styles.verificationField}>
            <Text style={styles.fieldLabel}>Identity verification</Text>
            <TouchableOpacity
              style={styles.dropdownField}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text
                style={
                  identityType ? styles.fieldValue : styles.fieldPlaceholder
                }
              >
                {identityType || "Select identity type"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {identityOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectIdentity(option)}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Identity Number Field */}
          <View style={styles.verificationField}>
            <Text style={styles.fieldLabel}>Identity number</Text>
            <TextInput
              style={styles.input}
              value={identityNumber}
              onChangeText={setIdentityNumber}
              placeholder="ID number"
            />
          </View>

          {/* Date of Birth Field */}
          <View style={styles.verificationField}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="DD / MM / YYYY"
              keyboardType="number-pad"
            />
          </View>

          {/* Document Upload Section */}
          <View style={styles.verificationField}>
            <Text style={styles.fieldLabel}>Upload document here</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadDocument}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="image" size={24} color="#6c5ce7" />
                <Text style={styles.uploadButtonText}>upload</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.uploadNote}>
              Upload a government issued ID card.
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewSampleLink}>View sample here</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Limits */}
        <View style={styles.limitsCard}>
          {accountLimits.map((limit, index) => (
            <View key={index} style={styles.limitRow}>
              <Text style={styles.limitLabel}>{limit.label}</Text>
              <Text style={styles.limitValue}>{limit.value}</Text>
            </View>
          ))}
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedToLevel3}
        >
          <Text style={styles.proceedButtonText}>Proceed to level 3</Text>
        </TouchableOpacity>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#001871",
    marginBottom: 16,
  },
  verificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 16,
  },
  verificationField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 14,
    color: "#333333",
  },
  fieldPlaceholder: {
    fontSize: 14,
    color: "#999999",
  },
  dropdownField: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  dropdownMenu: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  uploadIconContainer: {
    alignItems: "center",
  },
  uploadButtonText: {
    fontSize: 12,
    color: "#6c5ce7",
    marginTop: 4,
  },
  uploadNote: {
    fontSize: 12,
    color: "#e74c3c",
    marginBottom: 4,
  },
  viewSampleLink: {
    fontSize: 12,
    color: "#3498db",
  },
  limitsCard: {
    backgroundColor: "#FFF9C4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  limitLabel: {
    fontSize: 14,
    color: "#333333",
  },
  limitValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  proceedButton: {
    backgroundColor: "#B3B6E0",
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
