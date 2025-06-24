import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock wallet data
const walletData = {
  totalBalance: 0.0,
  btcEquivalent: 0.0,
  currency: "NGN",
  wallets: [
    {
      id: "1",
      name: "Trading",
      icon: "analytics",
      iconColor: "#6C63FF",
      balance: 0.0,
    },
    {
      id: "2",
      name: "Virtual card",
      icon: "card",
      iconColor: "#4ECDC4",
      balance: 0.0,
      isExpandable: true,
      expanded: false,
    },
    {
      id: "3",
      name: "Loyalty",
      icon: "gift",
      iconColor: "#FF6B6B",
      balance: 0.0,
      isExpandable: true,
      expanded: false,
    },
  ],
};

export default function WalletDetailsScreen() {
  const [balanceMasked, setBalanceMasked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wallets, setWallets] = useState(walletData.wallets);

  const toggleBalanceVisibility = () => {
    setBalanceMasked(!balanceMasked);
  };

  const toggleWalletExpand = (id: string) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === id && wallet.isExpandable
          ? { ...wallet, expanded: !wallet.expanded }
          : wallet
      )
    );
  };

  const handleBack = () => {
    router.back();
  };

  // Filter wallets based on search query
  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={handleBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Wallet</Text>
        </View>

        <Text className="text-lg font-bold mb-4">All Wallet balances</Text>

        <View className="bg-gray-50 rounded-xl p-5 mb-6">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-blue-900/70 uppercase font-medium text-xs">
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

          <View className="mb-1">
            <Text className="text-lg font-bold flex-row items-center">
              {balanceMasked
                ? "NGN ****"
                : `${
                    walletData.currency
                  } ${walletData.totalBalance.toLocaleString()}`}
            </Text>
            <Text className="text-gray-500 text-xs">
              {balanceMasked
                ? "0.0000****"
                : `${walletData.btcEquivalent.toFixed(8)}BTC`}
            </Text>
          </View>

          <View className="flex-row justify-end">
            <TouchableOpacity className="px-3 py-1 border border-gray-300 rounded-full flex-row items-center">
              <Text className="text-gray-800 mr-1 font-medium">
                {walletData.currency}
              </Text>
              <Ionicons name="chevron-down" size={14} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="font-bold mb-4">My balance</Text>

        {/* Search Bar */}
        <View className="bg-gray-100 rounded-full px-4 py-2.5 mb-4 flex-row items-center">
          <Ionicons name="search" size={18} color="gray" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search wallet"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Wallet List */}
        <ScrollView className="mb-4">
          {filteredWallets.map((wallet) => (
            <View key={wallet.id} className="mb-2">
              <TouchableOpacity
                className={`bg-white p-4 rounded-xl flex-row items-center justify-between 
                  ${
                    wallet.isExpandable && wallet.expanded
                      ? "rounded-b-none"
                      : ""
                  }`}
                onPress={() => toggleWalletExpand(wallet.id)}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: `${wallet.iconColor}15` }}
                  >
                    <Ionicons
                      name={wallet.icon as any}
                      size={18}
                      color={wallet.iconColor}
                    />
                  </View>
                  <View>
                    <Text className="font-medium">{wallet.name}</Text>
                    <Text className="text-gray-400 text-sm">Balance</Text>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-bold mr-2">
                    {walletData.currency} {wallet.balance.toLocaleString()}
                  </Text>
                  {wallet.isExpandable && (
                    <Ionicons
                      name={
                        wallet.expanded ? "chevron-down" : "chevron-forward"
                      }
                      size={18}
                      color="gray"
                    />
                  )}
                </View>
              </TouchableOpacity>

              {wallet.isExpandable && wallet.expanded && (
                <View className="bg-white px-4 pb-4 pt-2 rounded-b-xl">
                  <View className="border-t border-gray-100 pt-3">
                    <Text className="text-gray-600">
                      Details about this wallet would appear here.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {filteredWallets.length === 0 && (
            <View className="items-center py-6">
              <Text className="text-gray-400">No wallets found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
