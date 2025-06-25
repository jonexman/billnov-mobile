import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { useOverview } from "../context/OverviewContext";

// Get screen dimensions for carousel
const { width } = Dimensions.get("window");

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledFlatList = styled(FlatList);

interface PromoCarouselProps {
  onPromoAction?: (promoId: string) => void;
}

const PromoCarousel: React.FC<PromoCarouselProps> = ({ onPromoAction }) => {
  const { state } = useOverview();
  const { promoData } = state;
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const promoFlatListRef = useRef<FlatList>(null);

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

  const scrollToPromoIndex = (index: number) => {
    promoFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handlePromoAction = (promoId: string) => {
    if (onPromoAction) {
      onPromoAction(promoId);
    } else {
      console.log(`Promo action clicked: ${promoId}`);
    }
  };

  return (
    <StyledView>
      <StyledFlatList
        ref={promoFlatListRef}
        data={promoData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView style={{ width: width - 48 }}>
            <StyledView
              className={`p-5 rounded-2xl`}
              style={{ backgroundColor: item.bgColor }}
            >
              <StyledView className="flex-row items-start mb-3">
                <StyledView
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${item.iconColor}30` }}
                >
                  <Ionicons
                    name={item.iconName as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color={item.iconColor}
                  />
                </StyledView>
                <StyledView className="flex-1">
                  <StyledText className="text-lg font-bold mb-1">
                    {item.title}
                  </StyledText>
                  <StyledText className="text-gray-700">
                    {item.description}
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledTouchableOpacity
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
                <StyledText
                  style={{ color: item.iconColor, fontWeight: "600" }}
                >
                  {item.buttonText}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        )}
      />
      <StyledView className="flex-row justify-center mt-3">
        {promoData.map((_, index) => (
          <StyledTouchableOpacity
            key={index}
            onPress={() => scrollToPromoIndex(index)}
            className="mx-1"
          >
            <StyledView
              className={`rounded-full ${
                currentPromoIndex === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-gray-300"
              }`}
              style={{ height: 8 }}
            />
          </StyledTouchableOpacity>
        ))}
      </StyledView>
    </StyledView>
  );
};

export default PromoCarousel;
