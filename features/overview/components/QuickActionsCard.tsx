import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { QuickAction } from "../types";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface QuickActionsCardProps {
  actions: QuickAction[];
  onViewAllPress?: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  actions,
  onViewAllPress,
}) => {
  return (
    <StyledView>
      <StyledView className="flex-row justify-between items-center mb-4">
        <StyledText className="text-gray-800 font-semibold text-lg">
          Quick actions
        </StyledText>
        {onViewAllPress && (
          <StyledTouchableOpacity onPress={onViewAllPress}>
            <StyledText className="text-primary text-sm">View all</StyledText>
          </StyledTouchableOpacity>
        )}
      </StyledView>
      <StyledView className="bg-white rounded-2xl p-5 shadow-sm flex-row justify-between">
        {actions.map((action) => (
          <StyledTouchableOpacity
            key={action.id}
            className="items-center"
            onPress={action.onPress}
          >
            <StyledView
              style={{ backgroundColor: `${action.color}15` }}
              className="w-14 h-14 rounded-xl items-center justify-center mb-2"
            >
              <Ionicons
                name={action.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color={action.color}
              />
            </StyledView>
            <StyledText className="text-sm text-gray-700 font-medium">
              {action.name}
            </StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledView>
    </StyledView>
  );
};

export default QuickActionsCard;
