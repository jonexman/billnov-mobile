import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCategoryAnalytics, useExpenses } from "@/features/expenses";

const { width } = Dimensions.get("window");

export default function ExpensesAnalyticsScreen() {
  const { expenses } = useExpenses();
  const { categoryTotals } = useCategoryAnalytics();
  const [timeframe, setTimeframe] = useState("month");

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      {/* Timeframe selector */}
      <View style={styles.timeframeSelector}>
        <TouchableOpacity
          style={[
            styles.timeframeOption,
            timeframe === "week" && styles.selectedTimeframe,
          ]}
          onPress={() => setTimeframe("week")}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === "week" && styles.selectedTimeframeText,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeframeOption,
            timeframe === "month" && styles.selectedTimeframe,
          ]}
          onPress={() => setTimeframe("month")}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === "month" && styles.selectedTimeframeText,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeframeOption,
            timeframe === "year" && styles.selectedTimeframe,
          ]}
          onPress={() => setTimeframe("year")}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === "year" && styles.selectedTimeframeText,
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Category breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Expense Breakdown</Text>
          {categoryTotals.length > 0 ? (
            <View style={styles.categoryList}>
              {categoryTotals.map((item) => (
                <View key={item.categoryId} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: `${item.categoryColor}20` },
                      ]}
                    >
                      <Ionicons
                        name={item.categoryIcon as any}
                        size={18}
                        color={item.categoryColor}
                      />
                    </View>
                    <Text style={styles.categoryName}>{item.categoryName}</Text>
                    <Text style={styles.categoryAmount}>
                      ${item.total.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.categoryColor,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.percentageText}>
                    {item.percentage.toFixed(1)}%
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No data available</Text>
            </View>
          )}
        </View>

        {/* Monthly comparison */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Monthly Comparison</Text>
          <View style={styles.comparisonChart}>
            {/* This would be a chart in a real implementation */}
            <View style={styles.chartPlaceholder}>
              <Ionicons name="bar-chart-outline" size={48} color="#CCC" />
              <Text style={styles.placeholderText}>Chart placeholder</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  timeframeSelector: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  timeframeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 20,
  },
  selectedTimeframe: {
    backgroundColor: "#4A89F3",
  },
  timeframeText: {
    fontSize: 14,
    color: "#666",
  },
  selectedTimeframeText: {
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  categoryList: {
    gap: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    flex: 1,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
  },
  comparisonChart: {
    alignItems: "center",
  },
  chartPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  placeholderText: {
    marginTop: 8,
    color: "#999",
  },
});
