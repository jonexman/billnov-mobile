import {
  borderRadius,
  colors,
  spacing,
  typography,
} from "@/shared/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperText?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
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
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.error,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
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
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon && { paddingLeft: spacing.xs },
            (rightIcon || isPassword) && { paddingRight: spacing.xs },
            inputStyle,
          ]}
          placeholderTextColor={colors.neutral.gray500}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color={colors.neutral.gray600}
            />
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={colors.neutral.gray600}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error ? styles.errorText : null]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.neutral.gray700,
  },
  required: {
    color: colors.error.main,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  focused: {
    borderColor: colors.primary.main,
  },
  error: {
    borderColor: colors.error.main,
  },
  input: {
    flex: 1,
    height: "100%",
    color: colors.neutral.gray900,
    fontSize: typography.fontSizes.md,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSizes.sm,
    marginTop: spacing.xs,
    color: colors.neutral.gray600,
  },
  errorText: {
    color: colors.error.main,
  },
});
