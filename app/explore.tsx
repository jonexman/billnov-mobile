import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for cryptocurrencies
const cryptoData = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: 158776210.08,
    change: 2.5,
    chart: require("../assets/images/btc-chart.png"),
    iconName: "logo-bitcoin" as keyof typeof Ionicons.glyphMap,
    iconColor: "#F7931A",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 245845.23,
    change: 1.2,
    chart: require("../assets/images/eth-chart.png"),
    iconName: "logo-bitcoin" as keyof typeof Ionicons.glyphMap,
    iconColor: "#627EEA",
  },
  {
    id: "3",
    name: "Tether",
    symbol: "USDT",
    price: 1562.22,
    change: 0.05,
    chart: require("../assets/images/usdt-chart.png"),
    iconName: "ios-disc" as keyof typeof Ionicons.glyphMap,
    iconColor: "#26A17B",
  },
  {
    id: "ltc",
    name: "Litecoin",
    symbol: "LTC",
    price: 25845.34,
    change: -1.8,
    chart: require("../assets/images/ltc-chart.png"),
    iconName: "disc" as keyof typeof Ionicons.glyphMap,
    iconColor: "#345D9D",
  },
];

// Categories for filtering
const categories = ["All", "Gainers", "Losers", "New", "Stablecoins"];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cryptos based on active category and search query
  const filteredCryptos = cryptoData.filter((crypto) => {
    // Filter by category
    if (activeCategory === "Gainers" && crypto.change <= 0) return false;
    if (activeCategory === "Losers" && crypto.change >= 0) return false;
    if (activeCategory === "Stablecoins" && Math.abs(crypto.change) > 0.1)
      return false;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        crypto.name.toLowerCase().includes(query) ||
        crypto.symbol.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Back Button */}
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={18} color="#333" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Explore Markets</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row bg-gray-100 rounded-full px-4 py-2 mb-4 items-center">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search coins..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`py-2 px-4 mr-2 rounded-full ${
                activeCategory === category ? "bg-primary" : "bg-gray-100"
              }`}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                className={`${
                  activeCategory === category ? "text-white" : "text-gray-600"
                } font-medium`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Crypto List */}
      <ScrollView className="flex-1">
        <View className="px-5 pb-6">
          {filteredCryptos.map((crypto) => (
            <TouchableOpacity
              key={crypto.id}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
            >
              <View
                className="w-10 h-10 rounded-full mr-3 items-center justify-center"
                style={{ backgroundColor: `${crypto.iconColor}20` }}
              >
                <Ionicons
                  name={crypto.iconName}
                  size={24}
                  color={crypto.iconColor}
                />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="font-bold">{crypto.name}</Text>
                  <Text className="text-gray-500 ml-1">({crypto.symbol})</Text>
                </View>
                <Text className="text-gray-800 font-medium">
                  ₦{crypto.price.toLocaleString()}
                </Text>
              </View>

              <View className="items-end">
                <Image
                  source={crypto.chart}
                  className="w-20 h-12 mb-1"
                  resizeMode="contain"
                />
                <Text
                  className={`${
                    crypto.change >= 0 ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {crypto.change >= 0 ? "+" : ""}
                  {crypto.change}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {filteredCryptos.length === 0 && (
            <View className="items-center justify-center py-10">
              <Ionicons name="search" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-2">
                No cryptocurrencies found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
