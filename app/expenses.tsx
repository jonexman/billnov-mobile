import {
  Expense,
  FloatingActionButton,
  Income,
  MonthSelector,
  MonthlySummary,
  TransactionGroup,
  getMonthsForScroll,
  useExpenses,
  useIncomes,
} from "@/features/expenses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

function ExpensesContent() {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleBack = () => {
    router.back();
  };

  const handleNavigateToOptions = () => {
    router.push("/expense-options");
  };

  const handleNavigateToAnalytics = () => {
    router.push("/expenses-analytics");
  };

  // Group transactions by date
  const groupedTransactions = React.useMemo(() => {
    const combined = [...expenses, ...incomes];
    const grouped: Record<
      string,
      { date: Date; expenses: Expense[]; incomes: Income[] }
    > = {};

    combined.forEach((transaction) => {
      const date = new Date(transaction.date);
      const dateKey = date.toISOString().split("T")[0];

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date,
          expenses: [],
          incomes: [],
        };
      }

      if (transaction.type === "expense") {
        grouped[dateKey].expenses.push(transaction as Expense);
      } else {
        grouped[dateKey].incomes.push(transaction as Income);
      }
    });

    return Object.entries(grouped)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      )
      .map(([dateKey, data]) => ({
        dateKey,
        ...data,
      }));
  }, [expenses, incomes]);

  // Calculate total expenses and income for selected month
  const monthSummary = React.useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    groupedTransactions.forEach((group) => {
      const date = new Date(group.dateKey);
      if (
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      ) {
        group.expenses.forEach((expense) => {
          totalExpenses += expense.amount;
        });

        group.incomes.forEach((income) => {
          totalIncome += income.amount;
        });
      }
    });

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [groupedTransactions, selectedMonth, selectedYear]);

  // Filter transactions for selected month
  const monthTransactions = React.useMemo(() => {
    return groupedTransactions.filter((group) => {
      const date = new Date(group.dateKey);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [groupedTransactions, selectedMonth, selectedYear]);

  // Generate months for the selector
  const months = React.useMemo(() => {
    return getMonthsForScroll(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  // Handle month selection
  const handleMonthSelect = (index: number) => {
    // Find the month item that matches the selected index
    const selectedMonthItem = months.find((month) => month.index === index);

    if (selectedMonthItem) {
      setSelectedMonth(selectedMonthItem.index);
      setSelectedYear(selectedMonthItem.year);
    } else {
      // Fallback to the old logic if for some reason we can't find the month
      // If we're going past December, increment the year
      if (index > 11) {
        setSelectedYear((prev) => prev + 1);
        setSelectedMonth(0);
      }
      // If we're going before January, decrement the year
      else if (index < 0) {
        setSelectedYear((prev) => prev - 1);
        setSelectedMonth(11);
      }
      // Otherwise just update the month
      else {
        setSelectedMonth(index);
      }
    }
  };

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="bg-white pt-12 pb-2 px-5 shadow-sm">
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledTouchableOpacity
            onPress={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#333" />
          </StyledTouchableOpacity>

          <StyledText className="text-2xl font-bold">Expenses</StyledText>

          <StyledView className="flex-row">
            <StyledTouchableOpacity
              onPress={handleNavigateToAnalytics}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-2"
            >
              <Ionicons name="bar-chart" size={20} color="#333" />
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              onPress={handleNavigateToOptions}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Month selector */}
        <MonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthSelect={handleMonthSelect}
          months={months}
        />
      </StyledView>

      {/* Main content */}
      <StyledScrollView className="flex-1 px-5 pt-4 pb-24">
        {/* Monthly summary */}
        <MonthlySummary
          totalIncome={monthSummary.totalIncome}
          totalExpenses={monthSummary.totalExpenses}
          balance={monthSummary.balance}
          month={selectedMonth}
          year={selectedYear}
        />

        {/* Transaction groups */}
        {monthTransactions.length > 0 ? (
          monthTransactions.map((group) => (
            <TransactionGroup
              key={group.dateKey}
              date={group.date}
              expenses={group.expenses}
              incomes={group.incomes}
              onTransactionPress={(transaction) => {
                console.log("Transaction pressed:", transaction);
              }}
            />
          ))
        ) : (
          <StyledView className="items-center justify-center py-10 mt-4 bg-white rounded-xl">
            <Ionicons name="document-text-outline" size={48} color="#CCCCCC" />
            <StyledText className="text-gray-400 mt-2">
              No transactions for this month
            </StyledText>
          </StyledView>
        )}

        {/* Add padding at the bottom to prevent content from being hidden behind FAB */}
        <StyledView className="h-20" />
      </StyledScrollView>

      {/* Floating action button */}
      <FloatingActionButton />
    </StyledView>
  );
}

export default function ExpensesScreen() {
  return (
    <StyledSafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <StatusBar style="dark" />
      <ExpensesContent />
    </StyledSafeAreaView>
  );
}
