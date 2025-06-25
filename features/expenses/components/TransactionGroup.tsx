import { Expense, Income } from "@/features/expenses";
import { styled } from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import { TransactionItem } from "./TransactionItem";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);

interface TransactionGroupProps {
  date: Date;
  expenses: Expense[];
  incomes: Income[];
  onTransactionPress?: (transaction: Expense | Income) => void;
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
  date,
  expenses,
  incomes,
  onTransactionPress,
}) => {
  // Format the date as "Day, Month Date"
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Sort all transactions by time (most recent first)
  const allTransactions = [...expenses, ...incomes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate total for the day
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const netAmount = totalIncomes - totalExpenses;

  return (
    <StyledView className="mb-4">
      {/* Date header */}
      <StyledView className="flex-row justify-between items-center mb-2 px-4">
        <StyledText className="text-sm font-medium text-gray-500">
          {formattedDate}
        </StyledText>
        <StyledText
          className={`text-sm font-medium ${
            netAmount >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {netAmount >= 0 ? "+" : "-"}₦{Math.abs(netAmount).toLocaleString()}
        </StyledText>
      </StyledView>

      {/* Transactions list */}
      <StyledView className="bg-white rounded-xl px-4 py-1 shadow-sm">
        {allTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={onTransactionPress}
          />
        ))}
      </StyledView>
    </StyledView>
  );
};
