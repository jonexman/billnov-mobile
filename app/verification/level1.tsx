import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Level1VerificationScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const userDetails = {
    name: "JOHN KALU AKUMA ALI",
  };

  const accountLimits = [
    { label: "Daily withdrawal limit", value: "NGN 200,000.00" },
    { label: "Monthly withdrawal limit", value: "NGN 1,000,000.00" },
    { label: "Crypto withdrawal limit", value: "10 BTC" },
    { label: "Crypto deposit", value: "Unlimited" },
    { label: "Transactions", value: "Unlimited" },
  ];

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setShowOtpModal(true);
  };

  const handleVerifyOtp = () => {
    setShowOtpModal(false);
    setIsVerified(true);
  };

  const handleProceedToLevel2 = () => {
    router.push("/verification/level2");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level 1-Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Phone verification</Text>

        {/* Level 1 Verification Card */}
        <View style={styles.verificationCard}>
          <Text style={styles.levelLabel}>Level 1</Text>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <View style={styles.separator} />

          <View style={styles.phoneVerificationContainer}>
            <Text style={styles.phoneLabel}>Phone number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+234</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                editable={!isVerified}
              />
            </View>

            {isVerified ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.sendOtpButton}
                onPress={handleSendOtp}
              >
                <Text style={styles.sendOtpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Account Limits */}
        <View style={styles.limitsCard}>
          {accountLimits.map((limit, index) => (
            <View key={index} style={styles.limitRow}>
              <Text style={styles.limitLabel}>{limit.label}</Text>
              <Text style={styles.limitValue}>{limit.value}</Text>
            </View>
          ))}
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.proceedButton,
            isVerified ? styles.proceedButtonActive : {},
          ]}
          onPress={handleProceedToLevel2}
          disabled={!isVerified}
        >
          <Text style={styles.proceedButtonText}>Proceed to level 2</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* OTP Verification Modal */}
      <Modal visible={showOtpModal} transparent={true} animationType="slide">
        <View style={styles.otpModalOverlay}>
          <View style={styles.otpModalContent}>
            <View style={styles.otpModalHeader}>
              <TouchableOpacity
                onPress={() => setShowOtpModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.otpContentContainer}>
              <Text style={styles.otpTitle}>176 649</Text>
              <Text style={styles.otpWarning}>
                Don't share your OTP with anyone
              </Text>

              <TouchableOpacity style={styles.copyOtpButton}>
                <Text style={styles.copyOtpButtonText}>Copy OTP</Text>
                <Image
                  source={require("../../assets/images/copy-code.png")}
                  style={styles.copyIcon}
                />
              </TouchableOpacity>

              <Text style={styles.otpInstructions}>
                Enter the 6-digit code sent to your phone number
              </Text>

              <View style={styles.otpInputContainer}>
                {[...Array(6)].map((_, index) => (
                  <View key={index} style={styles.otpDigitBox}>
                    <Text style={styles.otpDigit}>•</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <TouchableOpacity>
                  <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#001871",
    marginBottom: 16,
  },
  verificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 16,
  },
  phoneVerificationContainer: {
    marginBottom: 16,
  },
  phoneLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 14,
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendOtpButton: {
    backgroundColor: "#B3B6E0",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  sendOtpButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  verifiedText: {
    color: "#4CAF50",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  limitsCard: {
    backgroundColor: "#FFF9C4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  limitLabel: {
    fontSize: 14,
    color: "#333333",
  },
  limitValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  proceedButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  proceedButtonActive: {
    backgroundColor: "#B3B6E0",
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  otpModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  otpModalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    height: "80%",
  },
  otpModalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  otpContentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  otpTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  otpWarning: {
    fontSize: 14,
    color: "#e74c3c",
    marginBottom: 24,
  },
  copyOtpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  copyOtpButtonText: {
    fontSize: 14,
    marginRight: 8,
  },
  copyIcon: {
    width: 16,
    height: 16,
  },
  otpInstructions: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  otpDigitBox: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  otpDigit: {
    fontSize: 24,
  },
  verifyButton: {
    backgroundColor: "#B3B6E0",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#666666",
  },
  resendLink: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "500",
  },
});
