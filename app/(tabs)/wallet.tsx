import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data
const walletData = {
  totalBalance: 0.0,
  tradingWallet: 0.0,
  cardWallet: 0.0,
  hasPIN: false,
  currency: "USD",
};

export default function WalletScreen() {
  const [balanceMasked, setBalanceMasked] = useState(true);
  const [activeTab, setActiveTab] = useState("wallet"); // 'wallet' or 'transaction'
  const [transactionType, setTransactionType] = useState("buy"); // 'buy' or 'sell'
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinStep, setPinStep] = useState(1); // 1: create, 2: confirm

  const toggleBalanceVisibility = () => {
    setBalanceMasked(!balanceMasked);
  };

  const handleCreatePin = () => {
    setPinModalVisible(true);
  };

  const handleSeeDetails = () => {
    router.push("/wallet-details");
  };

  const renderWalletTab = () => {
    return (
      <ScrollView className="px-6 pt-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-5">Wallets</Text>
        </View>

        <View className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-500 uppercase text-xs font-medium">
              NET WALLET BALANCE
            </Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons
                name={balanceMasked ? "eye-off" : "eye"}
                size={18}
                color="#001871"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-4">
            <Text className="text-xl font-bold mr-2">
              {balanceMasked
                ? "****"
                : `$${walletData.totalBalance.toLocaleString()}`}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </View>

          <View className="flex-row justify-end">
            <TouchableOpacity className="px-3 py-1 border border-blue-800 rounded-full flex-row items-center">
              <Text className="text-blue-800 mr-1 font-medium">
                {walletData.currency}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#001871" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">My balances</Text>
            <TouchableOpacity onPress={handleSeeDetails}>
              <Text className="text-blue-600">See Details</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <View className="bg-white p-5 rounded-xl w-[48%] shadow-sm">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2">
                  <Ionicons name="analytics" size={16} color="#6C63FF" />
                </View>
                <Text className="text-gray-700">Trading</Text>
              </View>
              <Text className="font-bold text-lg">
                {balanceMasked
                  ? "********"
                  : `$${walletData.tradingWallet.toLocaleString()}`}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-green-100 px-1 rounded mr-1">
                  <Ionicons name="arrow-up" size={12} color="green" />
                </View>
                <Text className="text-green-600 text-xs">
                  0.0% Growth this month
                </Text>
              </View>
            </View>

            <View className="bg-white p-5 rounded-xl w-[48%] shadow-sm">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-teal-100 items-center justify-center mr-2">
                  <Ionicons name="card" size={16} color="#4ECDC4" />
                </View>
                <Text className="text-gray-700">Virtual card</Text>
              </View>
              <Text className="font-bold text-lg">
                {balanceMasked
                  ? "********"
                  : `$${walletData.cardWallet.toLocaleString()}`}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-8 border-t border-gray-200 pt-3">
          <View className="flex-row mb-1">
            <TouchableOpacity className="mr-8 border-b-2 border-blue-800 pb-2">
              <Text className="text-blue-800 font-medium">Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("transaction")}>
              <Text className="text-gray-400">Transaction history</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center justify-center py-12">
          <Text className="text-center mb-6 text-gray-600">
            You don&apos;t have a wallet pin yet
          </Text>
          <TouchableOpacity
            className="bg-blue-900 py-3 px-10 rounded-full"
            onPress={handleCreatePin}
          >
            <Text className="text-white font-medium text-base">Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderTransactionTab = () => {
    return (
      <View className="px-6 pt-4">
        <View className="mb-4 flex-row items-center">
          <TouchableOpacity
            className="mr-2"
            onPress={() => setActiveTab("wallet")}
          >
            <Ionicons name="arrow-back" size={24} color="#001871" />
          </TouchableOpacity>
          <Text className="text-lg font-medium">Wallet</Text>
        </View>

        <View className="flex-row mb-4 pb-2 border-b border-gray-200">
          <TouchableOpacity
            className="mr-6"
            onPress={() => setActiveTab("wallet")}
          >
            <Text className="text-gray-400">Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-primary font-medium border-b-2 border-primary pb-2">
              Transaction history
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-100 rounded-full px-4 py-2 mb-6 flex-row items-center">
          <Ionicons name="search" size={18} color="gray" className="mr-2" />
          <TextInput placeholder="Search" className="flex-1" />
        </View>

        <View className="flex-row bg-gray-100 rounded-full mb-8">
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-full ${
              transactionType === "buy" ? "bg-primary" : ""
            }`}
            onPress={() => setTransactionType("buy")}
          >
            <Text
              className={`text-center ${
                transactionType === "buy" ? "text-white" : "text-gray-400"
              }`}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 px-4 rounded-full ${
              transactionType === "sell" ? "bg-primary" : ""
            }`}
            onPress={() => setTransactionType("sell")}
          >
            <Text
              className={`text-center ${
                transactionType === "sell" ? "text-white" : "text-gray-400"
              }`}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center justify-center py-10">
          <Text className="text-gray-400 text-center">No transaction yet!</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View className="flex-1">
        {activeTab === "wallet" ? renderWalletTab() : renderTransactionTab()}
      </View>

      {/* PIN Creation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => setPinModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-white p-6 rounded-xl w-full max-w-sm">
            <Text className="text-xl font-bold text-center mb-6">
              {pinStep === 1 ? "Create Wallet PIN" : "Confirm Your PIN"}
            </Text>

            <Text className="text-gray-600 mb-4">
              {pinStep === 1
                ? "Create a secure 4-digit PIN for your wallet transactions"
                : "Please re-enter your PIN to confirm"}
            </Text>

            <View className="flex-row justify-center space-x-3 my-4">
              {[1, 2, 3, 4].map((digit, index) => (
                <View
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    pinStep === 1
                      ? index < pin.length
                        ? "bg-primary"
                        : "bg-gray-300"
                      : index < confirmPin.length
                      ? "bg-primary"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </View>

            {/* PIN Pad */}
            <View className="my-4">
              {/* Will be implemented with numeric keypad in a real app */}
              <TextInput
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
                value={pinStep === 1 ? pin : confirmPin}
                onChangeText={pinStep === 1 ? setPin : setConfirmPin}
                className="border border-gray-300 rounded-lg p-3 text-center text-lg mb-4"
                placeholder="Enter PIN"
              />
            </View>

            <TouchableOpacity
              className={`py-3 rounded-full items-center mt-4 ${
                (pinStep === 1 && pin.length === 4) ||
                (pinStep === 2 && confirmPin.length === 4)
                  ? "bg-accent"
                  : "bg-gray-300"
              }`}
              onPress={handleCreatePin}
              disabled={
                (pinStep === 1 && pin.length !== 4) ||
                (pinStep === 2 && confirmPin.length !== 4)
              }
            >
              <Text className="text-white font-bold">
                {pinStep === 1 ? "Continue" : "Create PIN"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3 mt-2"
              onPress={() => {
                setPinModalVisible(false);
                setPinStep(1);
                setPin("");
                setConfirmPin("");
              }}
            >
              <Text className="text-gray-600 text-center">Cancel</Text>
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
    backgroundColor: "#f8f9fa",
  },
});
