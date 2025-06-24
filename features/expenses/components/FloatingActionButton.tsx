import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AddTransactionModal } from "./AddTransactionModal";

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

  return (
    <View style={styles.container}>
      {/* Background overlay to close the menu when clicking outside */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        </TouchableWithoutFeedback>
      )}

      {/* Menu items */}
      {isOpen && (
        <>
          <View style={styles.menuItem}>
            <TouchableOpacity
              onPress={openIncomeModal}
              style={styles.incomeButton}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="trending-up" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.menuItemText}>Income</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItem}>
            <TouchableOpacity
              onPress={openExpenseModal}
              style={styles.expenseButton}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="trending-down" size={20} color="#F44336" />
              </View>
              <Text style={styles.menuItemText}>Expense</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Main FAB button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.mainButton}>
        <Animated.View style={styles.mainButtonInner}>
          <Ionicons name="close" size={24} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A89F3",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 2,
  },
  mainButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  incomeButton: {
    position: "absolute",
    top: -180,
    right: 0,
    alignItems: "center",
  },
  expenseButton: {
    position: "absolute",
    top: -100,
    right: 0,
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
});
