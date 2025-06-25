import { WalletCard, WalletProvider, useWallet } from "@/features/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledFlatList = styled(FlatList);

function WalletDetailsContent() {
  const { state, toggleBalanceVisibility } = useWallet();
  const { wallets, currency, balanceMasked, totalBalance, btcEquivalent } =
    state;

  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    router.back();
  };

  // Filter wallets based on search query
  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StyledView className="flex-1">
      <StyledView className="px-6 pt-4 pb-2">
        <StyledView className="flex-row items-center mb-6">
          <StyledTouchableOpacity onPress={handleBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#333" />
          </StyledTouchableOpacity>
          <StyledText className="text-xl font-bold">Wallet</StyledText>
        </StyledView>

        <StyledText className="text-lg font-bold mb-4">
          All Wallet balances
        </StyledText>

        <StyledView className="bg-gray-50 rounded-xl p-5 mb-6">
          <StyledView className="flex-row items-center justify-between mb-1">
            <StyledText className="text-blue-900/70 uppercase font-medium text-xs">
              NET WALLET BALANCE
            </StyledText>
            <StyledTouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons
                name={balanceMasked ? "eye-off" : "eye"}
                size={18}
                color="#001871"
              />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="mb-1">
            <StyledText className="text-lg font-bold flex-row items-center">
              {balanceMasked
                ? `${currency} ****`
                : `${currency} ${totalBalance.toLocaleString()}`}
            </StyledText>
            <StyledText className="text-gray-500 text-xs">
              {balanceMasked ? "0.0000****" : `${btcEquivalent.toFixed(8)} BTC`}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-end">
            <StyledTouchableOpacity className="px-3 py-1 border border-gray-300 rounded-full flex-row items-center">
              <StyledText className="text-gray-800 mr-1 font-medium">
                {currency}
              </StyledText>
              <Ionicons name="chevron-down" size={14} color="gray" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        <StyledText className="font-bold mb-4">My balance</StyledText>

        {/* Search Bar */}
        <StyledView className="bg-gray-100 rounded-full px-4 py-2.5 mb-4 flex-row items-center">
          <Ionicons name="search" size={18} color="gray" />
          <StyledTextInput
            className="flex-1 ml-2"
            placeholder="Search wallet"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </StyledView>
      </StyledView>

      {/* Wallet List */}
      <StyledFlatList
        data={filteredWallets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <WalletCard wallet={item} showDetails={true} />
        )}
        ListEmptyComponent={
          <StyledView className="items-center py-6">
            <StyledText className="text-gray-400">No wallets found</StyledText>
          </StyledView>
        }
      />
    </StyledView>
  );
}

export default function WalletDetailsScreen() {
  return (
    <WalletProvider>
      <StyledSafeAreaView className="flex-1 bg-gray-50">
        <StatusBar style="dark" />
        <WalletDetailsContent />
      </StyledSafeAreaView>
    </WalletProvider>
  );
}
