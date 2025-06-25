// Shared UI Components

// We'll move reusable components here (currently in components/ directory)
// These will include components like ThemedText, ThemedView, IconSymbol, etc.

import { styled } from "nativewind";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Create styled components for common React Native components
export const StyledView = styled(View);
export const StyledText = styled(Text);
export const StyledTextInput = styled(TextInput);
export const StyledTouchableOpacity = styled(TouchableOpacity);
export const StyledPressable = styled(Pressable);
export const StyledScrollView = styled(ScrollView);
export const StyledImage = styled(Image);
export const StyledActivityIndicator = styled(ActivityIndicator);
export const StyledFlatList = styled(FlatList);
