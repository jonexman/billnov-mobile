import { colors } from "@/shared/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperText?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  helperText,
  required = false,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  // Determine if the input should show as a password field
  const isPassword = secureTextEntry !== undefined;

  return (
    <StyledView className={`mb-4 ${containerClassName}`}>
      {label && (
        <StyledView className="flex-row items-center mb-1">
          <StyledText
            className={`text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
            {required && <StyledText className="text-error"> *</StyledText>}
          </StyledText>
        </StyledView>
      )}

      <StyledView
        className={`
          flex-row items-center bg-white border rounded-md px-4 h-12
          ${isFocused ? "border-primary" : "border-gray-300"} 
          ${error ? "border-error" : ""}
        `}
      >
        {leftIcon && (
          <StyledView className="mr-2">
            <Ionicons
              name={leftIcon}
              size={20}
              color={
                error
                  ? colors.error.main
                  : isFocused
                  ? colors.primary.main
                  : colors.neutral.gray600
              }
            />
          </StyledView>
        )}

        <StyledTextInput
          className={`
            flex-1 h-full text-gray-900 text-base
            ${leftIcon ? "pl-1" : ""} 
            ${rightIcon || isPassword ? "pr-1" : ""} 
            ${inputClassName}
          `}
          placeholderTextColor={colors.neutral.gray500}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />

        {isPassword && (
          <StyledTouchableOpacity
            className="ml-2 p-1"
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color={colors.neutral.gray600}
            />
          </StyledTouchableOpacity>
        )}

        {rightIcon && !isPassword && (
          <StyledTouchableOpacity
            className="ml-2 p-1"
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={colors.neutral.gray600}
            />
          </StyledTouchableOpacity>
        )}
      </StyledView>

      {(error || helperText) && (
        <StyledText
          className={`text-sm mt-1 ${error ? "text-error" : "text-gray-600"}`}
        >
          {error || helperText}
        </StyledText>
      )}
    </StyledView>
  );
};
