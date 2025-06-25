import { formatCurrency } from "@/features/expenses";
import { styled } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);

interface MonthlySummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  month: number;
  year: number;
}

export const MonthlySummary: React.FC<MonthlySummaryProps> = ({
  totalIncome,
  totalExpenses,
  balance,
  month,
  year,
}) => {
  // Get month name
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  return (
    <StyledView className="bg-white rounded-xl p-5 mb-4 shadow-sm">
      <StyledText className="text-lg font-bold mb-4">
        {monthName} {year} Summary
      </StyledText>

      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-base font-semibold text-gray-800">
          {formatCurrency(balance)}
        </StyledText>
      </StyledView>

      <StyledView className="flex-row justify-between">
        <StyledView className="flex-1 border-r border-gray-100 pr-4">
          <StyledText className="text-xs text-gray-500 mb-1">Income</StyledText>
          <StyledText className="text-base font-semibold text-green-500">
            {formatCurrency(totalIncome)}
          </StyledText>
        </StyledView>

        <StyledView className="flex-1 pl-4">
          <StyledText className="text-xs text-gray-500 mb-1">
            Expenses
          </StyledText>
          <StyledText className="text-base font-semibold text-red-500">
            {formatCurrency(totalExpenses)}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
