import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock banks data
const BANKS = [
  { id: "1", name: "PAYCOM(OPAY)" },
  { id: "2", name: "First Bank" },
  { id: "3", name: "Zenith Bank" },
  { id: "4", name: "GTBank" },
  { id: "5", name: "UBA" },
  { id: "6", name: "Access Bank" },
];

// Key for storing bank account status
const BANK_ACCOUNT_STATUS_KEY = "billnov_has_bank_account";

export default function AddBankAccountScreen() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [showBankSelection, setShowBankSelection] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock user data - would come from authentication context in a real app
  const userName = "JOHN KALU AKUMA ALI";

  const handleAddAccount = () => {
    if (!accountNumber.trim() || accountNumber.length < 10) {
      // Simple validation
      alert("Please enter a valid account number");
      return;
    }

    // Show processing state
    setIsProcessing(true);

    // Simulate API call to add account
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleDone = async () => {
    try {
      // Save the bank account status
      await AsyncStorage.setItem(BANK_ACCOUNT_STATUS_KEY, "true");
    } catch (error) {
      console.log("Error saving bank account status:", error);
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Info Notice */}
          <View style={styles.noticeContainer}>
            <Text style={styles.noticeText}>
              You can only add an account that matches the name below
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Account Name Field - Readonly */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Account Name</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={userName}
                editable={false}
              />
            </View>

            {/* Bank Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bank</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowBankSelection(true)}
              >
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownText}>{selectedBank.name}</Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Account Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Account Number</Text>
              <TextInput
                style={styles.input}
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder="Enter account number"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !accountNumber.trim() ? styles.submitButtonDisabled : null,
            ]}
            onPress={handleAddAccount}
            disabled={!accountNumber.trim() || isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Add Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bank Selection Modal */}
      <Modal
        visible={showBankSelection}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBankSelection(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity onPress={() => setShowBankSelection(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.bankList}>
              {BANKS.map((bank) => (
                <TouchableOpacity
                  key={bank.id}
                  style={[
                    styles.bankItem,
                    selectedBank.id === bank.id
                      ? styles.bankItemSelected
                      : null,
                  ]}
                  onPress={() => {
                    setSelectedBank(bank);
                    setShowBankSelection(false);
                  }}
                >
                  <Text style={styles.bankItemText}>{bank.name}</Text>
                  {selectedBank.id === bank.id && (
                    <Ionicons name="checkmark" size={20} color="#001871" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent={true} animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            </View>
            <Text style={styles.successTitle}>Success</Text>
            <Text style={styles.successMessage}>
              Bank account added successfully
            </Text>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  noticeContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#001871",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  noticeText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 14,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: "#F5F5F5",
    color: "#333333",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333",
  },
  submitButton: {
    backgroundColor: "#001871",
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  bankList: {
    padding: 16,
  },
  bankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  bankItemSelected: {
    backgroundColor: "#F0F4FF",
  },
  bankItemText: {
    fontSize: 16,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.98)",
    justifyContent: "center",
    alignItems: "center",
  },
  successModalContent: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#001871",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
