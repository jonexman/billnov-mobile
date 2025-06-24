import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ExpenseOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ExpenseOptionsModal: React.FC<ExpenseOptionsModalProps> = ({
  visible,
  onClose,
}) => {
  const handleAddCategory = () => {
    // In a real app, we'd either navigate to a category screen or show another modal
    // For now we'll just log the action
    console.log("Add category clicked");
    onClose();
    // Uncomment when you have the category screen ready
    // router.push("/categories");
  };

  const handleAddBudget = () => {
    // In a real app, we'd either navigate to a budget screen or show another modal
    // For now we'll just log the action
    console.log("Add budget clicked");
    onClose();
    // Uncomment when you have the budget screen ready
    // router.push("/budgets");
  };

  const handleExportData = () => {
    console.log("Export data clicked");
    onClose();
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Options</Text>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleAddCategory}
              >
                <Ionicons
                  name="pricetag-outline"
                  size={24}
                  color="#4A89F3"
                  style={styles.menuIcon}
                />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemText}>Add Category</Text>
                  <Text style={styles.menuItemDescription}>
                    Create custom expense categories
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleAddBudget}
              >
                <Ionicons
                  name="wallet-outline"
                  size={24}
                  color="#4A89F3"
                  style={styles.menuIcon}
                />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemText}>Add Budget</Text>
                  <Text style={styles.menuItemDescription}>
                    Set spending limits by category
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleExportData}
              >
                <Ionicons
                  name="download-outline"
                  size={24}
                  color="#4A89F3"
                  style={styles.menuIcon}
                />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemText}>Export Data</Text>
                  <Text style={styles.menuItemDescription}>
                    Download your financial data
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleSettings}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color="#4A89F3"
                  style={styles.menuIcon}
                />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemText}>Settings</Text>
                  <Text style={styles.menuItemDescription}>
                    Configure expense preferences
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "85%",
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  menuArrow: {
    marginLeft: 8,
  },
});
