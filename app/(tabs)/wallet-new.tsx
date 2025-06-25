import {
  CurrencySelector,
  PinModal,
  TransactionList,
  WalletCard,
  WalletProvider,
  WalletSummary,
  useWallet,
} from "@/features/wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import { useState } from "react";
import {
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

function WalletContent() {
  const { state, getTransactionHistory } = useWallet();
  const { hasPIN, wallets } = state;

  const [activeTab, setActiveTab] = useState("wallet"); // 'wallet' or 'transaction'
  const [transactionType, setTransactionType] = useState<
    "buy" | "sell" | undefined
  >(undefined);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [currencySelectorVisible, setCurrencySelectorVisible] = useState(false);

  const handleCreatePin = () => {
    setPinModalVisible(true);
  };

  const handleSeeDetails = () => {
    router.push("/wallet-details");
  };

  // Get filtered transactions based on selected type
  const transactions = getTransactionHistory(
    transactionType ? { type: transactionType } : undefined
  );

  const renderWalletTab = () => {
    return (
      <StyledScrollView
        className="px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <StyledView className="mb-6">
          <StyledText className="text-2xl font-bold mb-5">Wallets</StyledText>
        </StyledView>

        {/* Wallet Summary */}
        <WalletSummary
          onCurrencyChange={() => setCurrencySelectorVisible(true)}
          onDetailsPress={handleSeeDetails}
        />

        <StyledView>
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-lg font-semibold">
              My balances
            </StyledText>
            <StyledTouchableOpacity onPress={handleSeeDetails}>
              <StyledText className="text-blue-600">See Details</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="flex-row justify-between">
            {wallets.slice(0, 2).map((wallet) => (
              <StyledView key={wallet.id} className="w-[48%]">
                <WalletCard wallet={wallet} />
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        <StyledView className="mt-8 border-t border-gray-200 pt-3">
          <StyledView className="flex-row mb-1">
            <StyledTouchableOpacity className="mr-8 border-b-2 border-blue-800 pb-2">
              <StyledText className="text-blue-800 font-medium">
                Wallet
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity onPress={() => setActiveTab("transaction")}>
              <StyledText className="text-gray-400">
                Transaction history
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {!hasPIN && (
          <StyledView className="items-center justify-center py-12">
            <StyledText className="text-center mb-6 text-gray-600">
              You don&apos;t have a wallet pin yet
            </StyledText>
            <StyledTouchableOpacity
              className="bg-blue-900 py-3 px-10 rounded-full"
              onPress={handleCreatePin}
            >
              <StyledText className="text-white font-medium text-base">
                Create
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}
      </StyledScrollView>
    );
  };

  const renderTransactionTab = () => {
    return (
      <StyledView className="px-6 pt-4 flex-1">
        <StyledView className="mb-4 flex-row items-center">
          <StyledTouchableOpacity
            className="mr-2"
            onPress={() => setActiveTab("wallet")}
          >
            <Ionicons name="arrow-back" size={24} color="#001871" />
          </StyledTouchableOpacity>
          <StyledText className="text-lg font-medium">Wallet</StyledText>
        </StyledView>

        <StyledView className="flex-row mb-4 pb-2 border-b border-gray-200">
          <StyledTouchableOpacity
            className="mr-6"
            onPress={() => setActiveTab("wallet")}
          >
            <StyledText className="text-gray-400">Wallet</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity>
            <StyledText className="text-primary font-medium border-b-2 border-primary pb-2">
              Transaction history
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="bg-gray-100 rounded-full px-4 py-2 mb-6 flex-row items-center">
          <Ionicons name="search" size={18} color="gray" />
          <StyledTextInput placeholder="Search" className="flex-1 ml-2" />
        </StyledView>

        <StyledView className="flex-row bg-gray-100 rounded-full mb-8">
          <StyledTouchableOpacity
            className={`flex-1 py-2 px-4 rounded-full ${
              transactionType === "buy" ? "bg-primary" : ""
            }`}
            onPress={() =>
              setTransactionType(transactionType === "buy" ? undefined : "buy")
            }
          >
            <StyledText
              className={`text-center ${
                transactionType === "buy" ? "text-white" : "text-gray-400"
              }`}
            >
              Buy
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            className={`flex-1 py-2 px-4 rounded-full ${
              transactionType === "sell" ? "bg-primary" : ""
            }`}
            onPress={() =>
              setTransactionType(
                transactionType === "sell" ? undefined : "sell"
              )
            }
          >
            <StyledText
              className={`text-center ${
                transactionType === "sell" ? "text-white" : "text-gray-400"
              }`}
            >
              Sell
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <TransactionList
          transactions={transactions}
          onTransactionPress={(transaction) => {
            console.log("Transaction pressed:", transaction);
          }}
          emptyMessage="No transactions yet!"
        />
      </StyledView>
    );
  };

  return (
    <StyledView className="flex-1">
      {activeTab === "wallet" ? renderWalletTab() : renderTransactionTab()}

      {/* PIN Creation Modal */}
      <PinModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        mode="create"
      />

      {/* Currency Selector Modal */}
      <CurrencySelector
        visible={currencySelectorVisible}
        onClose={() => setCurrencySelectorVisible(false)}
      />
    </StyledView>
  );
}

export default function WalletScreen() {
  return (
    <WalletProvider>
      <StyledSafeAreaView className="flex-1 bg-gray-50">
        <StatusBar style="dark" />
        <WalletContent />
      </StyledSafeAreaView>
    </WalletProvider>
  );
}
