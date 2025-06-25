import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useWallet } from "../context/WalletContext";
import { Transaction } from "../types";
import {
  formatCurrency,
  formatTransactionDate,
  getTransactionIcon,
} from "../utils/helpers";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const { state } = useWallet();
  const { currency, balanceMasked } = state;

  const { name: iconName, color: iconColor } = getTransactionIcon(
    transaction.type
  );

  // Determine if the transaction is incoming or outgoing
  const isIncoming = transaction.type === "receive";

  // Format the amount with a + or - prefix
  const formattedAmount = isIncoming
    ? `+${formatCurrency(transaction.amount, transaction.currency)}`
    : `-${formatCurrency(transaction.amount, transaction.currency)}`;

  // Format the date
  const formattedDate = formatTransactionDate(transaction.timestamp);

  const handlePress = () => {
    if (onPress) {
      onPress(transaction);
    }
  };

  return (
    <StyledTouchableOpacity
      className="flex-row items-center justify-between py-3 border-b border-gray-100"
      onPress={handlePress}
    >
      <StyledView className="flex-row items-center">
        <StyledView
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Ionicons name={iconName as any} size={18} color={iconColor} />
        </StyledView>

        <StyledView>
          <StyledText className="font-medium">
            {transaction.description ||
              transaction.type.charAt(0).toUpperCase() +
                transaction.type.slice(1)}
          </StyledText>
          <StyledText className="text-gray-400 text-xs">
            {formattedDate}
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="items-end">
        <StyledText
          className={`font-bold ${
            isIncoming ? "text-green-600" : "text-red-600"
          }`}
        >
          {balanceMasked ? "******" : formattedAmount}
        </StyledText>

        <StyledView className="flex-row items-center">
          <StyledView
            className={`h-2 w-2 rounded-full mr-1 ${
              transaction.status === "completed"
                ? "bg-green-500"
                : transaction.status === "pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          <StyledText className="text-gray-400 text-xs capitalize">
            {transaction.status}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};
