import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
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
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen dimensions for carousel
const { width } = Dimensions.get("window");

// Mock data
const mockUser = {
  firstName: "Jonexman",
  lastName: "Doe",
  balance: 500000.0,
};

// Mock market data
const marketData = [
  {
    id: "1",
    name: "USDT",
    symbol: "USDT",
    price: 1562.22,
    change: 0.05,
    volume: "93.6Tn",
    currency: "NGN",
    iconName: "disc" as keyof typeof Ionicons.glyphMap,
    iconColor: "#26A17B",
  },
  {
    id: "2",
    name: "Bitcoin",
    symbol: "BTC",
    price: 158776210.08,
    change: -0.8,
    volume: "68.4Tn",
    currency: "NGN",
    iconName: "logo-bitcoin" as keyof typeof Ionicons.glyphMap,
    iconColor: "#F7931A",
  },
  {
    id: "3",
    name: "Ethereum",
    symbol: "ETH",
    price: 245845.23,
    change: 1.2,
    volume: "34.1Tn",
    currency: "NGN",
    iconName: "logo-bitcoin" as keyof typeof Ionicons.glyphMap,
    iconColor: "#627EEA",
  },
  {
    id: "4",
    name: "Litecoin",
    symbol: "LTC",
    price: 25845.34,
    change: 2.34,
    volume: "18.2Tn",
    currency: "NGN",
    iconName: "disc" as keyof typeof Ionicons.glyphMap,
    iconColor: "#345D9D",
  },
];

// Promo data
const promoData = [
  {
    id: "1",
    title: "Save on Fees",
    description: "Enjoy 50% off on trading fees for the next 30 days",
    iconName: "cash-outline" as keyof typeof Ionicons.glyphMap,
    bgColor: "#DEF1FF",
    iconColor: "#0077FF",
    buttonText: "Learn More",
  },
  {
    id: "2",
    title: "Refer & Earn",
    description: "Invite friends and earn up to ₦50,000 in rewards",
    iconName: "gift-outline" as keyof typeof Ionicons.glyphMap,
    bgColor: "#FFECDE",
    iconColor: "#FF7A00",
    buttonText: "Invite Now",
  },
  {
    id: "3",
    title: "Join Premium",
    description: "Unlock advanced features with BillNov Premium",
    iconName: "star-outline" as keyof typeof Ionicons.glyphMap,
    bgColor: "#E8DFFF",
    iconColor: "#6C36FF",
    buttonText: "Upgrade",
  },
];

export default function HomeScreen() {
  const [balanceMasked, setBalanceMasked] = useState(true);
  const [activeTab, setActiveTab] = useState("top-gainers");
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const promoFlatListRef = useRef<FlatList>(null);

  const toggleBalanceVisibility = () => {
    setBalanceMasked(!balanceMasked);
  };

  const quickActions = [
    { id: "1", name: "Trade", icon: "analytics" as const, color: "#1434A4" },
    { id: "2", name: "Virtual Card", icon: "card" as const, color: "#5ce1e6" },
    { id: "3", name: "Recharge", icon: "flash" as const, color: "#FFD700" },
    { id: "4", name: "More", icon: "grid" as const, color: "#FF6961" },
  ];

  // Handle promo slide change
  const handleViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentPromoIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handlePromoAction = (promoId: string) => {
    // In a real app, these would navigate to different screens or trigger different actions
    console.log(`Promo action clicked: ${promoId}`);
    // You can implement specific actions for each promo type here
  };

  const scrollToPromoIndex = (index: number) => {
    promoFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleShowMore = () => {
    // Navigate to the explore screen
    router.push("/explore");
  };

  const handleNavigateToMore = () => {
    // Navigate to the more actions screen
    router.push("/more-actions");
  };

  // Time of day greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Greeting and Profile */}
        <Animated.View
          className="px-6 pt-3 pb-4"
          entering={FadeInDown.delay(100).duration(700)}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-primary text-lg font-bold">
                    {mockUser.firstName[0]}
                    {mockUser.lastName[0]}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text className="text-gray-500 text-[12px]">
                  {getGreeting()} 👋
                </Text>
                <Text className="text-[14px] text-gray-800">
                  {mockUser.firstName}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center">
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={20}
                    color="#001871"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center">
                  <Ionicons name="notifications" size={20} color="#001871" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Wallet Balance Card */}
        <Animated.View
          className="mx-6 mb-5"
          entering={FadeInDown.delay(200).duration(700)}
        >
          <View className="bg-primary rounded-2xl p-5 shadow-lg">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-white/80 font-medium text-[13px]">
                NET WALLET BALANCE
              </Text>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Ionicons
                  name={balanceMasked ? "eye-off" : "eye"}
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold mb-4 text-white">
              {balanceMasked ? "****" : `₦${mockUser.balance.toLocaleString()}`}
            </Text>
            <View className="flex-row mt-2">
              <TouchableOpacity className="bg-white/20 py-2.5 px-5 rounded-full mr-3">
                <Text className="text-white font-medium">Send</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white py-2.5 px-5 rounded-full">
                <Text className="text-primary font-medium">Deposit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          className="mx-6 mb-6"
          entering={FadeInDown.delay(300).duration(700)}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-semibold text-lg">
              Quick actions
            </Text>
            <TouchableOpacity onPress={handleNavigateToMore}>
              <Text className="text-primary text-sm">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-2xl p-5 shadow-sm flex-row justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="items-center"
                onPress={
                  action.name === "More" ? handleNavigateToMore : undefined
                }
              >
                <View
                  style={{ backgroundColor: `${action.color}15` }}
                  className="w-14 h-14 rounded-xl items-center justify-center mb-2"
                >
                  <Ionicons name={action.icon} size={22} color={action.color} />
                </View>
                <Text className="text-sm text-gray-700 font-medium">
                  {action.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Promo Banner - Carousel */}
        <Animated.View
          className="mx-6 mb-6"
          entering={FadeInDown.delay(400).duration(700)}
        >
          <FlatList
            ref={promoFlatListRef}
            data={promoData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ width: width - 48 }}>
                <View
                  className={`p-5 rounded-2xl`}
                  style={{ backgroundColor: item.bgColor }}
                >
                  <View className="flex-row items-start mb-3">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: `${item.iconColor}30` }}
                    >
                      <Ionicons
                        name={item.iconName}
                        size={24}
                        color={item.iconColor}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold mb-1">
                        {item.title}
                      </Text>
                      <Text className="text-gray-700">{item.description}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="bg-white self-end px-5 py-2.5 rounded-full"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 1.5,
                      elevation: 2,
                    }}
                    onPress={() => handlePromoAction(item.id)}
                  >
                    <Text style={{ color: item.iconColor, fontWeight: "600" }}>
                      {item.buttonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View className="flex-row justify-center mt-3">
            {promoData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToPromoIndex(index)}
                className="mx-1"
              >
                <View
                  className={`rounded-full ${
                    currentPromoIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-gray-300"
                  }`}
                  style={{ height: 8 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Market Section */}
        <Animated.View
          className="mx-6 mb-8"
          entering={FadeInDown.delay(500).duration(700)}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-semibold text-lg">
              Market Overview
            </Text>
            <TouchableOpacity onPress={handleShowMore}>
              <View className="flex-row items-center">
                <Text className="text-primary font-medium text-sm mr-1">
                  All Markets
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#001871" />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {["Top Gainers", "Top Losers", "Favourite", "New"].map(
              (tab, index) => (
                <TouchableOpacity
                  key={index}
                  className={`py-2 px-4 mr-2 rounded-full ${
                    activeTab === tab.toLowerCase().replace(" ", "-")
                      ? "bg-primary"
                      : "bg-gray-100"
                  }`}
                  onPress={() =>
                    setActiveTab(tab.toLowerCase().replace(" ", "-"))
                  }
                >
                  <Text
                    className={`${
                      activeTab === tab.toLowerCase().replace(" ", "-")
                        ? "text-white"
                        : "text-gray-600"
                    } font-medium`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <View className="flex-row justify-between py-3.5 px-4 border-b border-gray-100">
              <Text className="text-gray-500 font-medium text-sm">
                Coin/Price
              </Text>
              <Text className="text-gray-500 font-medium text-sm">Volume</Text>
            </View>

            {marketData.map((coin, index) => (
              <TouchableOpacity
                key={coin.id}
                className={`flex-row items-center justify-between py-4 px-4 ${
                  index !== marketData.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 rounded-full mr-3.5 items-center justify-center"
                    style={{ backgroundColor: `${coin.iconColor}20` }}
                  >
                    <Ionicons
                      name={coin.iconName}
                      size={20}
                      color={coin.iconColor}
                    />
                  </View>
                  <View>
                    <Text className="font-bold text-base text-gray-800">
                      {coin.symbol}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {coin.currency} {coin.price.toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View
                  className={`px-3 py-1.5 rounded-md ${
                    coin.change >= 0 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      coin.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {coin.volume}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Show More Button */}
            <TouchableOpacity
              className="py-4 items-center border-t border-gray-100"
              onPress={handleShowMore}
            >
              <View className="flex-row items-center">
                <Text className="text-primary font-medium mr-1">Show More</Text>
                <Ionicons name="chevron-forward" size={14} color="#001871" />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
