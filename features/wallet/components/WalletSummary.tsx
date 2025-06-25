import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useWallet } from "../context/WalletContext";
import { formatCurrency } from "../utils/helpers";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface WalletSummaryProps {
  onCurrencyChange?: () => void;
  onDetailsPress?: () => void;
}

export const WalletSummary: React.FC<WalletSummaryProps> = ({
  onCurrencyChange,
  onDetailsPress,
}) => {
  const { state, toggleBalanceVisibility } = useWallet();
  const { totalBalance, btcEquivalent, currency, balanceMasked } = state;

  return (
    <StyledView className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <StyledView className="flex-row items-center justify-between mb-2">
        <StyledText className="text-gray-500 uppercase text-xs font-medium">
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

      <StyledView className="mb-2">
        <StyledText className="text-xl font-bold">
          {balanceMasked ? "******" : formatCurrency(totalBalance, currency)}
        </StyledText>

        <StyledText className="text-gray-500 text-xs mt-1">
          {balanceMasked ? "0.0000****" : `${btcEquivalent.toFixed(8)} BTC`}
        </StyledText>
      </StyledView>

      <StyledView className="flex-row justify-between items-center mt-2">
        <StyledTouchableOpacity
          className="bg-gray-100 px-3 py-1 rounded-full"
          onPress={onDetailsPress}
        >
          <StyledText className="text-gray-700">See Details</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="px-3 py-1 border border-blue-800 rounded-full flex-row items-center"
          onPress={onCurrencyChange}
        >
          <StyledText className="text-blue-800 mr-1 font-medium">
            {currency}
          </StyledText>
          <Ionicons name="chevron-down" size={14} color="#001871" />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};
