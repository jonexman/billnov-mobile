import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AddTransactionModal } from "./AddTransactionModal";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );

  // Use useRef for the animation value to persist between renders
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const openExpenseModal = () => {
    setTransactionType("expense");
    setModalVisible(true);
    setIsOpen(false);

    // Reset animation when closing the menu
    Animated.spring(animation, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const openIncomeModal = () => {
    setTransactionType("income");
    setModalVisible(true);
    setIsOpen(false);

    // Reset animation when closing the menu
    Animated.spring(animation, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // If modal is visible, don't show the FAB
  if (modalVisible) {
    return (
      <AddTransactionModal
        visible={modalVisible}
        onClose={closeModal}
        type={transactionType}
      />
    );
  }

  // Calculate rotation for the plus/close icon
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <>
      {/* Background overlay to close the menu when clicking outside */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <StyledView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.1)",
              zIndex: 100,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Main FAB container - fixed positioning */}
      <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        {/* Menu items */}
        {isOpen && (
          <>
            <StyledTouchableOpacity
              onPress={openIncomeModal}
              style={{
                position: "absolute",
                bottom: 180,
                alignItems: "center",
              }}
            >
              <StyledView
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#28A745",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 5,
                }}
              >
                <Ionicons name="trending-up" size={24} color="#FFFFFF" />
              </StyledView>
              <StyledText
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: "500",
                  color: "#212529",
                }}
              >
                Income
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              onPress={openExpenseModal}
              style={{
                position: "absolute",
                bottom: 100,
                alignItems: "center",
              }}
            >
              <StyledView
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DC3545",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 5,
                }}
              >
                <Ionicons name="trending-down" size={24} color="#FFFFFF" />
              </StyledView>
              <StyledText
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: "500",
                  color: "#212529",
                }}
              >
                Expense
              </StyledText>
            </StyledTouchableOpacity>
          </>
        )}

        {/* Main FAB button */}
        <TouchableOpacity
          onPress={toggleMenu}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#001871", // Primary color from theme
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
        >
          <Animated.View
            style={{
              transform: [{ rotate: rotation }],
              width: 64,
              height: 64,
              borderRadius: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={isOpen ? "close" : "add"}
              size={30}
              color="#FFFFFF"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};
