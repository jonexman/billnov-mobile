import {
  Expense,
  FloatingActionButton,
  Income,
  formatCurrency,
  getWeekRanges,
  useExpenses,
  useIncomes,
} from "@/features/expenses";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

interface TransactionGroup {
  dateKey: string;
  date: Date;
  expenses: Expense[];
  incomes: Income[];
}

function ExpensesContent() {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const monthsRef = useRef<FlatList>(null);

  // Scroll to current month when component mounts
  useEffect(() => {
    if (monthsRef.current) {
      monthsRef.current.scrollToIndex({
        index: currentMonth,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, []);

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

      if (expenses.some((e) => e.id === transaction.id)) {
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

    groupedTransactions.forEach((group: TransactionGroup) => {
      const date = new Date(group.dateKey);
      if (
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      ) {
        group.expenses.forEach((expense: Expense) => {
          totalExpenses += expense.amount;
        });

        group.incomes.forEach((income: Income) => {
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

  // Get week ranges for the selected month
  const weekRanges = getWeekRanges(selectedMonth, selectedYear);

  // Handle month selection
  const handleMonthSelect = (index: number) => {
    // If we're going past December, increment the year
    if (index > 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
      if (monthsRef.current) {
        monthsRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }
    // If we're going before January, decrement the year
    else if (index < 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
      if (monthsRef.current) {
        monthsRef.current.scrollToIndex({
          index: 11,
          animated: true,
        });
      }
    }
    // Otherwise just update the month
    else {
      setSelectedMonth(index);
      if (monthsRef.current) {
        monthsRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  };

  // Handle viewable months change
  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const centerItem = viewableItems[Math.floor(viewableItems.length / 2)];
        if (
          centerItem &&
          centerItem.index !== null &&
          centerItem.index !== selectedMonth
        ) {
          setSelectedMonth(centerItem.index);
        }
      }
    }
  ).current;

  // Generate month names for the horizontal scroll
  const getMonthsForScroll = () => {
    const months = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Add previous 6 months, current month, and next 5 months
    for (let i = -6; i <= 5; i++) {
      let monthIndex = currentMonth + i;
      let year = currentYear;

      if (monthIndex < 0) {
        monthIndex = 12 + monthIndex;
        year = currentYear - 1;
      } else if (monthIndex > 11) {
        monthIndex = monthIndex - 12;
        year = currentYear + 1;
      }

      months.push({
        index: monthIndex,
        year,
        name: new Date(year, monthIndex).toLocaleString("default", {
          month: "short",
        }),
      });
    }

    return months;
  };

  const months = getMonthsForScroll();

  // Render month item
  const renderMonthItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const isSelected = selectedMonth === index;
    const isPast = index < currentMonth && selectedYear === currentYear;
    const isFuture = index > currentMonth && selectedYear === currentYear;

    return (
      <TouchableOpacity
        style={[styles.monthTab, isSelected && styles.selectedMonthTab]}
        onPress={() => handleMonthSelect(index)}
      >
        <Text
          style={[
            styles.monthTabText,
            isSelected && styles.selectedMonthTabText,
            isPast && styles.pastMonthText,
            isFuture && styles.futureMonthText,
          ]}
        >
          {item} {selectedYear}
        </Text>
        {isSelected && <View style={styles.selectedMonthIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with balance card */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#f5f7ff", "#e8eeff"]}
          style={styles.balanceCard}
        >
          <View style={styles.balanceCardHeader}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.balanceTitle}>
              {MONTHS[selectedMonth]} {selectedYear} Balance
            </Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.chartButton}
                onPress={handleNavigateToAnalytics}
              >
                <Ionicons name="stats-chart" size={22} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={handleNavigateToOptions}
              >
                <Ionicons name="ellipsis-vertical" size={22} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.balanceAmount}>
            {monthSummary.balance >= 0 ? "+" : ""}
            {formatCurrency(monthSummary.balance)}
          </Text>

          {/* Month tabs */}
          <FlatList
            ref={monthsRef}
            data={MONTHS}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderMonthItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.monthTabsContainer}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 100,
            }}
            onEndReached={() => {
              // When reaching the end (December), we can add logic to load next year
              if (selectedMonth === 11) {
                handleMonthSelect(0);
              }
            }}
            onEndReachedThreshold={0.1}
            initialScrollIndex={currentMonth}
            getItemLayout={(data, index) => ({
              length: 80, // approximate width of each month item
              offset: 80 * index,
              index,
            })}
          />

          {/* Income and Expense summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="trending-up" size={18} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={styles.incomeAmount}>
                  +{formatCurrency(monthSummary.totalIncome)}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <View style={[styles.summaryIconContainer, styles.expenseIcon]}>
                <Ionicons name="trending-down" size={18} color="#F44336" />
              </View>
              <View>
                <Text style={styles.summaryLabel}>Expenses</Text>
                <Text style={styles.expenseAmount}>
                  -{formatCurrency(monthSummary.totalExpenses)}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Transaction list */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Week groups */}
        {weekRanges.map((week, index) => (
          <View key={index} style={styles.dateGroup}>
            <Text style={styles.dateGroupLabel}>{week.label}</Text>
          </View>
        ))}

        {/* Transactions for selected month */}
        {monthTransactions.length > 0 ? (
          monthTransactions.map((group) => {
            const date = new Date(group.dateKey);
            const day = date.getDate();
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "long",
            });

            const totalExpenses = group.expenses.reduce(
              (sum, expense) => sum + expense.amount,
              0
            );
            const totalIncomes = group.incomes.reduce(
              (sum, income) => sum + income.amount,
              0
            );

            return (
              <View key={group.dateKey} style={styles.transactionGroup}>
                <View style={styles.dateHeader}>
                  <Text style={styles.dateText}>
                    {MONTHS[date.getMonth()]} {day} {dayName}
                  </Text>
                  <View style={styles.amountContainer}>
                    {totalIncomes > 0 && (
                      <Text style={styles.incomeTotalText}>
                        +{formatCurrency(totalIncomes)}
                      </Text>
                    )}
                    {totalExpenses > 0 && (
                      <Text style={styles.expenseTotalText}>
                        -{formatCurrency(totalExpenses)}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Incomes */}
                {group.incomes.map((income) => (
                  <View key={income.id} style={styles.transactionItem}>
                    <View style={styles.transactionIconContainer}>
                      <Ionicons name="cash-outline" size={24} color="#4CAF50" />
                    </View>

                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionTitle}>
                        {income.description}
                      </Text>
                    </View>

                    <View style={styles.transactionAmount}>
                      <Text style={styles.incomeText}>
                        +{formatCurrency(income.amount)}
                      </Text>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#4CAF50"
                      />
                    </View>
                  </View>
                ))}

                {/* Expenses */}
                {group.expenses.map((expense) => (
                  <View key={expense.id} style={styles.transactionItem}>
                    <View style={styles.transactionIconContainer}>
                      <Ionicons name="cart-outline" size={24} color="#F44336" />
                    </View>

                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionTitle}>
                        {expense.description}
                      </Text>
                    </View>

                    <View style={styles.transactionAmount}>
                      <Text style={styles.expenseText}>
                        -{formatCurrency(expense.amount)}
                      </Text>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#4CAF50"
                      />
                    </View>
                  </View>
                ))}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#CCC" />
            <Text style={styles.emptyStateText}>
              No transactions for {MONTHS[selectedMonth]} {selectedYear}
            </Text>
          </View>
        )}

        {/* Bottom padding for FAB */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </SafeAreaView>
  );
}

export default function ExpensesScreen() {
  return <ExpensesContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#f8f9fa",
  },
  balanceCard: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  balanceCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
  },
  chartButton: {
    padding: 8,
    marginRight: 4,
  },
  menuButton: {
    padding: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  monthTabsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  monthTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    position: "relative",
    minWidth: 80,
  },
  selectedMonthTab: {
    backgroundColor: "transparent",
  },
  monthTabText: {
    fontSize: 14,
    color: "#666",
  },
  selectedMonthTabText: {
    color: "#333",
    fontWeight: "bold",
  },
  pastMonthText: {
    color: "#999",
  },
  futureMonthText: {
    color: "#999",
  },
  selectedMonthIndicator: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: "#4A89F3",
    borderRadius: 1.5,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 16,
    overflow: "hidden",
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expenseIcon: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateGroup: {
    paddingVertical: 12,
    alignItems: "center",
  },
  dateGroupLabel: {
    fontSize: 14,
    color: "#999",
  },
  transactionGroup: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    flex: 1,
  },
  amountContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  incomeTotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  expenseTotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F44336",
    marginTop: 2,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: "#333",
  },
  transactionAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  incomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginRight: 8,
  },
  expenseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F44336",
    marginRight: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
  bottomPadding: {
    height: 100,
  },
});
