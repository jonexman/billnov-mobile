import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  description: string;
  image: any;
}

// Onboarding data
const slides: Slide[] = [
  {
    id: "1",
    title: "Welcome Home",
    description:
      "Enjoy free withdrawals, juicy rates, free health insurance and a list of other gifts and bonuses tailored to you.",
    image: require("../../assets/images/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Anything is Possible",
    description:
      "Easily buy/sell assets, pay bills and spend globally with virtual cards and cryptocurrencies.",
    image: require("../../assets/images/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Fast and Secured Transactions",
    description:
      "Enjoy lightning-fast transactions with military-grade security plus 2FA with Google.",
    image: require("../../assets/images/onboarding-3.png"),
  },
  {
    id: "4",
    title: "24/7 Customer Support",
    description:
      "You'll most likely never need it, but we've got you anytime, any day, on any channel.",
    image: require("../../assets/images/onboarding-4.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleSkip = () => {
    router.replace("../(tabs)");
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // On last slide, navigate to main app
      router.replace("../(tabs)");
    }
  };

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={{ width }} className="items-center justify-center px-8">
        <Image
          source={item.image}
          className="w-56 h-56 mb-12"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {item.title}
        </Text>
        <Text className="text-center text-gray-500">{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row justify-end px-6 py-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-accent font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={{ flex: 1 }}
        snapToInterval={width}
        snapToAlignment="center"
      />

      <View className="px-8 pb-10">
        <View className="flex-row justify-center mb-10">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentIndex ? "bg-primary w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          className="bg-primary py-4 rounded-full items-center"
          onPress={handleNext}
        >
          <Text className="text-white font-medium text-base">
            {currentIndex === slides.length - 1 ? "Get started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
