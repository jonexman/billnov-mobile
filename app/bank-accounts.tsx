import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Key for storing bank account status
const BANK_ACCOUNT_STATUS_KEY = "billnov_has_bank_account";

// Mock bank account data
const mockBankAccounts = [
  {
    id: "1",
    bankName: "First Bank",
    accountNumber: "0123456789",
    accountName: "JONEXMAN DOE",
    isDefault: true,
  },
  {
    id: "2",
    bankName: "Zenith Bank",
    accountNumber: "9876543210",
    accountName: "JONEXMAN DOE",
    isDefault: false,
  },
];

export default function BankAccountsScreen() {
  const router = useRouter();
  const [accounts, setAccounts] = useState(mockBankAccounts);

  // Update AsyncStorage when accounts change
  useEffect(() => {
    const updateBankAccountStatus = async () => {
      try {
        // If there are accounts, set the status to true, otherwise false
        await AsyncStorage.setItem(
          BANK_ACCOUNT_STATUS_KEY,
          accounts.length > 0 ? "true" : "false"
        );
      } catch (error) {
        console.log("Error updating bank account status:", error);
      }
    };

    updateBankAccountStatus();
  }, [accounts]);

  const handleAddAccount = () => {
    router.push("/add-bank-account");
  };

  const handleSetDefault = (id: string) => {
    const updatedAccounts = accounts.map((account) => ({
      ...account,
      isDefault: account.id === id,
    }));
    setAccounts(updatedAccounts);
  };

  const handleDeleteAccount = (id: string) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this bank account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const filteredAccounts = accounts.filter(
              (account) => account.id !== id
            );
            setAccounts(filteredAccounts);
          },
        },
      ]
    );
  };

  const renderBankAccount = ({ item }: { item: (typeof accounts)[0] }) => {
    return (
      <View style={styles.accountCard}>
        <View style={styles.accountHeader}>
          <View style={styles.bankIconContainer}>
            <Ionicons name="card-outline" size={24} color="#4CAF50" />
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.bankName}>{item.bankName}</Text>
            <Text style={styles.accountNumber}>
              **** **** {item.accountNumber.slice(-4)}
            </Text>
          </View>
          {item.isDefault && (
            <View style={styles.defaultTag}>
              <Text style={styles.defaultTagText}>Default</Text>
            </View>
          )}
        </View>

        <View style={styles.accountDetails}>
          <Text style={styles.accountDetailLabel}>Account Name</Text>
          <Text style={styles.accountDetailValue}>{item.accountName}</Text>

          <Text style={styles.accountDetailLabel}>Account Number</Text>
          <Text style={styles.accountDetailValue}>{item.accountNumber}</Text>
        </View>

        <View style={styles.actionButtons}>
          {!item.isDefault && (
            <TouchableOpacity
              style={[styles.actionButton, styles.defaultButton]}
              onPress={() => handleSetDefault(item.id)}
            >
              <Text style={styles.defaultButtonText}>Set as Default</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteAccount(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>Bank Accounts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          {accounts.length > 0 ? (
            <FlatList
              data={accounts}
              renderItem={renderBankAccount}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="card-outline" size={64} color="#CCCCCC" />
              <Text style={styles.emptyStateText}>
                No bank accounts added yet
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
            <Ionicons
              name="add-circle"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.addButtonText}>Add New Bank Account</Text>
          </TouchableOpacity>
        </View>
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
  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  accountNumber: {
    fontSize: 14,
    color: "#777777",
  },
  defaultTag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultTagText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
  },
  accountDetails: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  accountDetailLabel: {
    fontSize: 13,
    color: "#777777",
    marginTop: 8,
  },
  accountDetailValue: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  defaultButton: {
    backgroundColor: "#E8F5E9",
  },
  defaultButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
  },
  deleteButtonText: {
    color: "#F44336",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#777777",
    marginTop: 16,
  },
  addButton: {
    backgroundColor: "#001871",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
