import { styled } from "nativewind";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWallet } from "../context/WalletContext";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

interface PinModalProps {
  visible: boolean;
  onClose: () => void;
  mode: "create" | "verify" | "change";
  onSuccess?: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  visible,
  onClose,
  mode,
  onSuccess,
}) => {
  const { createWalletPIN, verifyWalletPIN, changeWalletPIN } = useWallet();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [step, setStep] = useState(1); // 1: enter, 2: confirm
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal is closed
  const handleClose = () => {
    setPin("");
    setConfirmPin("");
    setOldPin("");
    setStep(1);
    setError("");
    setIsLoading(false);
    onClose();
  };

  // Handle PIN creation
  const handleCreatePin = async () => {
    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await createWalletPIN(pin);

      if (success) {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        setError("Failed to create PIN. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle PIN verification
  const handleVerifyPin = async () => {
    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await verifyWalletPIN(pin);

      if (success) {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        setError("Invalid PIN. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle PIN change
  const handleChangePin = async () => {
    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setOldPin(pin);
      setPin("");
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
      setConfirmPin(pin);
      setPin("");
      return;
    }

    if (pin !== confirmPin) {
      setError("New PINs do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await changeWalletPIN(oldPin, pin);

      if (success) {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      } else {
        setError("Failed to change PIN. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get title based on mode and step
  const getTitle = () => {
    if (mode === "create") {
      return step === 1 ? "Create Wallet PIN" : "Confirm Your PIN";
    } else if (mode === "verify") {
      return "Enter Your PIN";
    } else if (mode === "change") {
      if (step === 1 || step === 2) {
        return "Enter Current PIN";
      } else if (step === 3) {
        return "Enter New PIN";
      } else {
        return "Confirm New PIN";
      }
    }
    return "";
  };

  // Get button text based on mode and step
  const getButtonText = () => {
    if (mode === "create") {
      return step === 1 ? "Continue" : "Create PIN";
    } else if (mode === "verify") {
      return "Verify";
    } else if (mode === "change") {
      if (step === 1 || step === 2) {
        return "Continue";
      } else if (step === 3) {
        return "Continue";
      } else {
        return "Change PIN";
      }
    }
    return "Continue";
  };

  // Handle button press based on mode
  const handleButtonPress = () => {
    if (mode === "create") {
      handleCreatePin();
    } else if (mode === "verify") {
      handleVerifyPin();
    } else if (mode === "change") {
      handleChangePin();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <StyledView className="flex-1 bg-black/50 justify-center items-center p-6">
        <StyledView className="bg-white p-6 rounded-xl w-full max-w-sm">
          <StyledText className="text-xl font-bold text-center mb-6">
            {getTitle()}
          </StyledText>

          <StyledText className="text-gray-600 mb-4 text-center">
            {mode === "create"
              ? "Create a secure PIN to protect your wallet"
              : mode === "verify"
              ? "Enter your wallet PIN to continue"
              : "Change your wallet PIN for security"}
          </StyledText>

          {/* PIN Input */}
          <StyledView className="mb-6">
            <StyledTextInput
              className="bg-gray-100 rounded-lg p-4 text-center text-2xl"
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={setPin}
              placeholder="• • • •"
              autoFocus
            />
          </StyledView>

          {/* Error message */}
          {error ? (
            <StyledText className="text-red-500 text-center mb-4">
              {error}
            </StyledText>
          ) : null}

          {/* Action buttons */}
          <StyledView className="flex-row justify-between">
            <StyledTouchableOpacity
              className="bg-gray-200 py-3 px-6 rounded-full"
              onPress={handleClose}
            >
              <StyledText className="font-medium">Cancel</StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className={`bg-blue-900 py-3 px-6 rounded-full flex-row items-center ${
                isLoading ? "opacity-70" : ""
              }`}
              onPress={handleButtonPress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <StyledText className="text-white font-medium">
                  {getButtonText()}
                </StyledText>
              )}
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};
