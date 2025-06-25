import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOverview } from "../context/OverviewContext";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface MarketOverviewProps {
  onShowMorePress?: () => void;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ onShowMorePress }) => {
  const { getMarketData } = useOverview();
  const [activeTab, setActiveTab] = useState("top-gainers");

  const marketData = getMarketData(activeTab);

  return (
    <StyledView>
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-gray-800 font-semibold text-lg">
          Market Overview
        </StyledText>
        <StyledTouchableOpacity onPress={onShowMorePress}>
          <StyledView className="flex-row items-center">
            <StyledText className="text-primary font-medium text-sm mr-1">
              All Markets
            </StyledText>
            <Ionicons name="chevron-forward" size={14} color="#001871" />
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {["Top Gainers", "Top Losers", "Favourite", "New"].map((tab, index) => (
          <StyledTouchableOpacity
            key={index}
            className={`py-2 px-4 mr-2 rounded-full ${
              activeTab === tab.toLowerCase().replace(" ", "-")
                ? "bg-primary"
                : "bg-gray-100"
            }`}
            onPress={() => setActiveTab(tab.toLowerCase().replace(" ", "-"))}
          >
            <StyledText
              className={`${
                activeTab === tab.toLowerCase().replace(" ", "-")
                  ? "text-white"
                  : "text-gray-600"
              } font-medium`}
            >
              {tab}
            </StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>

      <StyledView className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <StyledView className="flex-row justify-between py-3.5 px-4 border-b border-gray-100">
          <StyledText className="text-gray-500 font-medium text-sm">
            Coin/Price
          </StyledText>
          <StyledText className="text-gray-500 font-medium text-sm">
            Volume
          </StyledText>
        </StyledView>

        {marketData.map((coin, index) => (
          <StyledTouchableOpacity
            key={coin.id}
            className={`flex-row items-center justify-between py-4 px-4 ${
              index !== marketData.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <StyledView className="flex-row items-center">
              <StyledView
                className="w-10 h-10 rounded-full mr-3.5 items-center justify-center"
                style={{ backgroundColor: `${coin.iconColor}20` }}
              >
                <Ionicons
                  name={coin.iconName as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={coin.iconColor}
                />
              </StyledView>
              <StyledView>
                <StyledText className="font-bold text-base text-gray-800">
                  {coin.symbol}
                </StyledText>
                <StyledText className="text-gray-500 text-sm">
                  {coin.currency} {coin.price.toLocaleString()}
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView
              className={`px-3 py-1.5 rounded-md ${
                coin.change >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <StyledText
                className={`font-medium ${
                  coin.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {coin.volume}
              </StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        ))}

        {/* Show More Button */}
        <StyledTouchableOpacity
          className="py-4 items-center border-t border-gray-100"
          onPress={onShowMorePress}
        >
          <StyledView className="flex-row items-center">
            <StyledText className="text-primary font-medium mr-1">
              Show More
            </StyledText>
            <Ionicons name="chevron-forward" size={14} color="#001871" />
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default MarketOverview;
