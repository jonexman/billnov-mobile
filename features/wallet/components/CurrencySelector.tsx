import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWallet } from "../context/WalletContext";
import { mockConversionRates } from "../utils/mockData";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

interface CurrencySelectorProps {
  visible: boolean;
  onClose: () => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  visible,
  onClose,
}) => {
  const { state, changeCurrency } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");

  // Available currencies
  const currencies = Object.keys(mockConversionRates);

  // Filter currencies based on search query
  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle currency selection
  const handleSelectCurrency = (currency: string) => {
    changeCurrency(currency);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 bg-black/50 justify-end">
        <StyledView className="bg-white rounded-t-xl h-2/3">
          <StyledView className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <StyledText className="text-lg font-bold">
              Select Currency
            </StyledText>
            <StyledTouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </StyledTouchableOpacity>
          </StyledView>

          {/* Search bar */}
          <StyledView className="p-4">
            <StyledView className="bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
              <Ionicons name="search" size={18} color="gray" />
              <StyledTextInput
                className="flex-1 ml-2"
                placeholder="Search currency"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </StyledView>
          </StyledView>

          {/* Currency list */}
          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <StyledTouchableOpacity
                className={`p-4 border-b border-gray-100 flex-row justify-between items-center ${
                  state.currency === item ? "bg-blue-50" : ""
                }`}
                onPress={() => handleSelectCurrency(item)}
              >
                <StyledView className="flex-row items-center">
                  <StyledView className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                    <StyledText className="font-bold">{item[0]}</StyledText>
                  </StyledView>
                  <StyledText className="font-medium">{item}</StyledText>
                </StyledView>

                {state.currency === item && (
                  <Ionicons name="checkmark-circle" size={20} color="#001871" />
                )}
              </StyledTouchableOpacity>
            )}
            ListEmptyComponent={
              <StyledView className="p-4 items-center">
                <StyledText className="text-gray-400">
                  No currencies found
                </StyledText>
              </StyledView>
            }
          />
        </StyledView>
      </StyledView>
    </Modal>
  );
};
