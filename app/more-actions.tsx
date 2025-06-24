import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen width to calculate grid item width
const { width } = Dimensions.get("window");
const numColumns = 4;
const gridItemWidth = width / numColumns - 16; // Account for margins/padding

// Define the action type
type Action = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
};

// Define the actions
const actions: Action[] = [
  {
    id: "1",
    name: "NGN Deposit",
    icon: "wallet",
    color: "#FFC107",
    bgColor: "#FFF9E6",
  },
  {
    id: "2",
    name: "NGN Withdraw",
    icon: "arrow-down",
    color: "#2196F3",
    bgColor: "#E6F4FF",
  },
  {
    id: "3",
    name: "Invest",
    icon: "trending-up",
    color: "#3F51B5",
    bgColor: "#EFF0F9",
  },
  {
    id: "4",
    name: "Betting",
    icon: "dice",
    color: "#F44336",
    bgColor: "#FFEBEE",
  },
  {
    id: "5",
    name: "Electricity",
    icon: "flash",
    color: "#FF9800",
    bgColor: "#FFF3E0",
  },
  {
    id: "6",
    name: "Cable",
    icon: "radio",
    color: "#1A237E",
    bgColor: "#E8EAF6",
  },
  {
    id: "7",
    name: "Data",
    icon: "cellular",
    color: "#D32F2F",
    bgColor: "#FFEBEE",
  },
  {
    id: "8",
    name: "Recharge",
    icon: "phone-portrait",
    color: "#388E3C",
    bgColor: "#E8F5E9",
  },
  {
    id: "9",
    name: "Internal Transfer",
    icon: "swap-horizontal",
    color: "#E91E63",
    bgColor: "#FCE4EC",
  },
  {
    id: "10",
    name: "Expenses",
    icon: "cash-outline",
    color: "#673AB7",
    bgColor: "#EDE7F6",
  },
  {
    id: "11",
    name: "Account Statement",
    icon: "document-text",
    color: "#FF9800",
    bgColor: "#FFF3E0",
  },
  {
    id: "12",
    name: "Add Bank Account",
    icon: "business",
    color: "#2196F3",
    bgColor: "#E3F2FD",
  },
  {
    id: "13",
    name: "Receive Payment",
    icon: "cash",
    color: "#FF5722",
    bgColor: "#FBE9E7",
  },
  {
    id: "14",
    name: "Leaderboard",
    icon: "trophy",
    color: "#FFC107",
    bgColor: "#FFF8E1",
  },
];

export default function MoreActionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    router.back();
  };

  // Filter actions based on search query
  const filteredActions = actions.filter((action) =>
    action.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActionItem = ({ item }: { item: Action }) => (
    <TouchableOpacity
      style={styles.actionItem}
      onPress={() => {
        if (item.name === "Expenses") {
          router.push("/expenses");
        } else {
          console.log(`Selected action: ${item.name}`);
        }
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.actionText} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>More actions</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search action"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color="#9CA3AF" />
        </View>

        {/* Actions Grid */}
        <FlatList
          data={filteredActions}
          renderItem={renderActionItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#4B5563",
    marginRight: 8,
    fontSize: 16,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  actionItem: {
    width: gridItemWidth,
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    color: "#374151",
    fontSize: 12,
    textAlign: "center",
    width: gridItemWidth - 4, // Ensure text stays within bounds
    flexWrap: "wrap",
  },
});
