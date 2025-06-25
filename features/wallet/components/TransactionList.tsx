import { styled } from "nativewind";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { Transaction } from "../types";
import {
  formatTransactionDate,
  groupTransactionsByDate,
} from "../utils/helpers";
import { TransactionItem } from "./TransactionItem";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
  emptyMessage?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionPress,
  emptyMessage = "No transactions yet",
}) => {
  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const grouped = groupTransactionsByDate(transactions);

    // Convert to array format for FlatList
    return Object.entries(grouped).map(([date, txs]) => ({
      date,
      transactions: txs,
    }));
  }, [transactions]);

  // Render empty state
  if (transactions.length === 0) {
    return (
      <StyledView className="items-center justify-center py-10">
        <StyledText className="text-gray-400">{emptyMessage}</StyledText>
      </StyledView>
    );
  }

  return (
    <FlatList
      data={groupedTransactions}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <StyledView className="mb-4">
          <StyledText className="text-gray-500 text-xs font-medium mb-2">
            {formatTransactionDate(item.date)}
          </StyledText>

          <StyledView className="bg-white rounded-xl overflow-hidden">
            {item.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onPress={onTransactionPress}
              />
            ))}
          </StyledView>
        </StyledView>
      )}
    />
  );
};
