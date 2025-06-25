import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useWallet } from "../context/WalletContext";
import { WalletBalance } from "../types";
import { formatCurrency } from "../utils/helpers";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface WalletCardProps {
  wallet: WalletBalance;
  onPress?: () => void;
  showDetails?: boolean;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  onPress,
  showDetails = false,
}) => {
  const { state, toggleWalletExpand } = useWallet();
  const { currency, balanceMasked } = state;

  const handlePress = () => {
    if (wallet.isExpandable) {
      toggleWalletExpand(wallet.id);
    }

    if (onPress) {
      onPress();
    }
  };

  return (
    <StyledView className="mb-2">
      <StyledTouchableOpacity
        className={`bg-white p-4 rounded-xl flex-row items-center justify-between 
          ${wallet.isExpandable && wallet.expanded ? "rounded-b-none" : ""}`}
        onPress={handlePress}
      >
        <StyledView className="flex-row items-center">
          <StyledView
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${wallet.iconColor}15` }}
          >
            <Ionicons
              name={wallet.icon as any}
              size={18}
              color={wallet.iconColor}
            />
          </StyledView>
          <StyledView>
            <StyledText className="font-medium">{wallet.name}</StyledText>
            <StyledText className="text-gray-400 text-sm">Balance</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex-row items-center">
          <StyledText className="font-bold mr-2">
            {balanceMasked
              ? "******"
              : formatCurrency(wallet.balance, currency)}
          </StyledText>
          {wallet.isExpandable && (
            <Ionicons
              name={wallet.expanded ? "chevron-down" : "chevron-forward"}
              size={18}
              color="gray"
            />
          )}
        </StyledView>
      </StyledTouchableOpacity>

      {wallet.isExpandable && wallet.expanded && showDetails && (
        <StyledView className="bg-white px-4 pb-4 pt-2 rounded-b-xl">
          <StyledView className="border-t border-gray-100 pt-3">
            <StyledText className="text-gray-600">
              Details about this wallet would appear here.
            </StyledText>
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};
