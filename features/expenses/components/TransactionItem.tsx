import { formatCurrency } from "@/features/expenses";
import { Transaction } from "@/features/expenses/types";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  const { category, amount, description, type, date } = transaction;
  const isExpense = type === "expense";
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const handlePress = () => {
    if (onPress) {
      onPress(transaction);
    }
  };

  return (
    <StyledTouchableOpacity
      className="flex-row items-center py-3 px-1"
      onPress={handlePress}
    >
      {/* Category Icon */}
      <StyledView
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <Ionicons
          name={category.icon as any}
          size={18}
          color={category.color}
        />
      </StyledView>

      {/* Description and Category */}
      <StyledView className="flex-1">
        <StyledText className="text-base font-medium text-gray-800">
          {description}
        </StyledText>
        <StyledText className="text-xs text-gray-500">
          {category.name} • {formattedDate}
        </StyledText>
      </StyledView>

      {/* Amount */}
      <StyledView>
        <StyledText
          className={`text-base font-semibold ${
            isExpense ? "text-red-500" : "text-green-500"
          }`}
        >
          {isExpense ? "-" : "+"}
          {formatCurrency(amount)}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};
