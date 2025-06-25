import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useOverview } from "../context/OverviewContext";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface WalletOverviewCardProps {
  onSendPress?: () => void;
  onDepositPress?: () => void;
  onDetailsPress?: () => void;
}

const WalletOverviewCard: React.FC<WalletOverviewCardProps> = ({
  onSendPress,
  onDepositPress,
  onDetailsPress,
}) => {
  const { state, toggleBalanceVisibility } = useOverview();
  const { totalBalance, currency, balanceMasked } = state;

  return (
    <StyledView className="bg-primary rounded-2xl p-5 shadow-lg">
      <StyledView className="flex-row items-center justify-between mb-1">
        <StyledText className="text-white/80 font-medium text-[13px]">
          NET WALLET BALANCE
        </StyledText>
        <StyledTouchableOpacity onPress={toggleBalanceVisibility}>
          <Ionicons
            name={balanceMasked ? "eye-off" : "eye"}
            size={18}
            color="white"
          />
        </StyledTouchableOpacity>
      </StyledView>
      <StyledText className="text-2xl font-bold mb-4 text-white">
        {balanceMasked ? "****" : `${currency}${totalBalance.toLocaleString()}`}
      </StyledText>
      <StyledView className="flex-row mt-2">
        <StyledTouchableOpacity
          className="bg-white/20 py-2.5 px-5 rounded-full mr-3"
          onPress={onSendPress}
        >
          <StyledText className="text-white font-medium">Send</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="bg-white py-2.5 px-5 rounded-full"
          onPress={onDepositPress}
        >
          <StyledText className="text-primary font-medium">Deposit</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      {onDetailsPress && (
        <StyledTouchableOpacity
          className="absolute top-5 right-5"
          onPress={onDetailsPress}
        >
          <Ionicons name="chevron-forward" size={20} color="white" />
        </StyledTouchableOpacity>
      )}
    </StyledView>
  );
};

export default WalletOverviewCard;
