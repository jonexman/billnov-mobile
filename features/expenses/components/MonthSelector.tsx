import { styled } from "nativewind";
import React, { useRef } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledFlatList = styled(FlatList);

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3; // Show 3 months at a time to fit with year

interface MonthItem {
  index: number;
  year: number;
  name: string;
}

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthSelect: (month: number) => void;
  months: MonthItem[];
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  selectedYear,
  onMonthSelect,
  months,
}) => {
  const monthsRef = useRef<FlatList<MonthItem>>(null);

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
          // This would update the selected month in the parent component
          // onMonthSelect(centerItem.index);
        }
      }
    }
  ).current;

  return (
    <StyledView className="py-2">
      <FlatList<MonthItem>
        ref={monthsRef}
        data={months}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: MonthItem }) => (
          <StyledTouchableOpacity
            className={`items-center justify-center px-2 py-3 mx-1 rounded-full min-w-[100px] ${
              selectedMonth === item.index && selectedYear === item.year
                ? "bg-primary"
                : "bg-gray-100"
            }`}
            onPress={() => onMonthSelect(item.index)}
          >
            <StyledText
              className={`font-medium ${
                selectedMonth === item.index && selectedYear === item.year
                  ? "text-white"
                  : "text-gray-600"
              }`}
            >
              {item.name.toUpperCase()} {item.year}
            </StyledText>
          </StyledTouchableOpacity>
        )}
        keyExtractor={(item: MonthItem) => `${item.year}-${item.index}`}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={months.findIndex(
          (m) => m.index === selectedMonth && m.year === selectedYear
        )}
      />
    </StyledView>
  );
};
