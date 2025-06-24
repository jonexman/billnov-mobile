import { Button, Input } from "@/components/ui";
import { colors, spacing, typography } from "@/shared/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useExpenses, useIncomes } from "../context/ExpenseContext";

export interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  type: "expense" | "income";
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  type,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addExpense } = useExpenses();
  const { addIncome } = useIncomes();

  const handleSubmit = () => {
    if (!amount) {
      return;
    }

    setIsLoading(true);

    try {
      const transactionData = {
        amount: parseFloat(amount),
        description: description || "Untitled",
        categoryId: "default",
        date: new Date().toISOString(),
        isPaid: true,
      };

      if (type === "expense") {
        addExpense(transactionData);
      } else {
        addIncome(transactionData);
      }

      // Reset form and close modal
      setAmount("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerText = type === "expense" ? "Add Expense" : "Add Income";
  const primaryColor =
    type === "expense" ? colors.error.main : colors.success.main;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.neutral.gray700}
                />
              </TouchableOpacity>
              <Text style={styles.title}>{headerText}</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Amount input */}
              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <Input
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  containerStyle={styles.amountInputContainer}
                  inputStyle={styles.amountInput}
                />
              </View>

              {/* Description input */}
              <Input
                label="Description"
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                leftIcon="create-outline"
              />

              {/* Submit button */}
              <Button
                title="Save"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                onPress={handleSubmit}
                fullWidth
                buttonStyle={{ backgroundColor: primaryColor }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.neutral.gray900,
  },
  formContainer: {
    flex: 1,
    padding: spacing.md,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  amountInputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  currencySymbol: {
    fontSize: typography.fontSizes.xl,
    color: colors.neutral.gray700,
    marginRight: spacing.sm,
  },
  amountInput: {
    fontSize: typography.fontSizes.xl,
  },
});
