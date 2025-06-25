# Migrating to Tailwind CSS

This document outlines the steps to migrate existing components from StyleSheet to Tailwind CSS.

## Migration Plan

1. Start with common UI components
2. Move to shared components
3. Migrate feature-specific components
4. Update screens

## Step-by-Step Migration Process

### 1. Import Styled Components

Replace standard React Native components with their styled versions:

```tsx
// Before
import { View, Text, TouchableOpacity } from "react-native";

// After
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
} from "@/shared/components/ui";
```

### 2. Replace StyleSheet with className

```tsx
// Before
<View style={styles.container}>
  <Text style={styles.title}>Hello World</Text>
</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.neutral.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary.main,
  },
});

// After
<StyledView className="flex-1 p-4 bg-white">
  <StyledText className="text-2xl font-bold text-primary">
    Hello World
  </StyledText>
</StyledView>;
```

### 3. Handle Conditional Styling

```tsx
// Before
<TouchableOpacity
  style={[
    styles.button,
    isActive ? styles.activeButton : styles.inactiveButton,
    disabled && styles.disabledButton,
  ]}
>
  <Text style={styles.buttonText}>Click Me</Text>
</TouchableOpacity>

// After
<StyledTouchableOpacity
  className={`p-3 rounded-md ${
    isActive ? 'bg-primary' : 'bg-gray-200'
  } ${disabled ? 'opacity-50' : ''}`}
>
  <StyledText className="text-white font-medium">Click Me</StyledText>
</StyledTouchableOpacity>
```

### 4. Handle Dynamic Values

For styles that need dynamic values that can't be expressed with Tailwind:

```tsx
// Before
<View
  style={{
    width: dynamicWidth,
    height: calculateHeight(),
    backgroundColor: colors.primary.main,
  }}
/>

// After
<StyledView
  className="bg-primary"
  style={{
    width: dynamicWidth,
    height: calculateHeight(),
  }}
/>
```

### 5. Common Tailwind Equivalents for React Native Styles

| React Native Style          | Tailwind Equivalent                |
| --------------------------- | ---------------------------------- |
| `flex: 1`                   | `flex-1`                           |
| `flexDirection: 'row'`      | `flex-row`                         |
| `justifyContent: 'center'`  | `justify-center`                   |
| `alignItems: 'center'`      | `items-center`                     |
| `margin: 16`                | `m-4`                              |
| `padding: 16`               | `p-4`                              |
| `backgroundColor: '#fff'`   | `bg-white`                         |
| `borderRadius: 8`           | `rounded-lg`                       |
| `fontSize: 16`              | `text-base`                        |
| `fontWeight: 'bold'`        | `font-bold`                        |
| `color: '#000'`             | `text-black`                       |
| `width: '100%'`             | `w-full`                           |
| `height: 50`                | `h-[50px]`                         |
| `opacity: 0.5`              | `opacity-50`                       |
| `shadowColor, shadowOffset` | Use `shadow-sm`, `shadow-md`, etc. |

## Testing After Migration

1. Test the component on both light and dark modes
2. Test on different screen sizes
3. Verify that dynamic behavior (like animations) still works correctly
4. Test conditional styling
5. Check accessibility features

## Tips and Tricks

- Start with simpler components and work your way up to more complex ones
- Keep the StyleSheet version commented out until you're confident the Tailwind version works
- Use the browser devtools with Expo web to debug Tailwind classes
- Remember that not all React Native styles have direct Tailwind equivalents
- When in doubt, use the `style` prop alongside `className`
