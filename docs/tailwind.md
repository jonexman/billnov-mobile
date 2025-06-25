# Using Tailwind CSS in BillNov Mobile

This project uses [TailwindCSS](https://tailwindcss.com/) with [NativeWind](https://www.nativewind.dev/) for styling React Native components.

## Setup

The necessary packages are already installed:

- `tailwindcss`: The core Tailwind CSS package
- `nativewind`: The adapter for React Native

## How to Use Tailwind CSS

### Importing Styled Components

For convenience, we've created styled versions of common React Native components. Import them from the shared components:

```tsx
import { StyledView, StyledText } from "@/shared/components/ui";

function MyComponent() {
  return (
    <StyledView className="flex-1 p-4 bg-white">
      <StyledText className="text-xl font-bold text-primary">
        Hello World
      </StyledText>
    </StyledView>
  );
}
```

### Creating Your Own Styled Components

If you need to style a component that's not in the pre-styled list:

```tsx
import { styled } from "nativewind";
import { YourComponent } from "some-library";

const StyledYourComponent = styled(YourComponent);

function MyComponent() {
  return <StyledYourComponent className="p-4 bg-white rounded-md" />;
}
```

### Custom Classes

Our tailwind.config.js includes custom color definitions:

- `primary`: Dark navy blue (#001871)
- `accent`: Turquoise accent color (#00C1D4)

Use these in your className strings:

```tsx
<StyledView className="bg-primary p-4">
  <StyledText className="text-white">White text on primary background</StyledText>
</StyledView>

<StyledTouchableOpacity className="bg-accent p-2 rounded-md">
  <StyledText className="text-white font-bold">Accent Button</StyledText>
</StyledTouchableOpacity>
```

### Conditional Classes

You can conditionally apply classes:

```tsx
<StyledView
  className={`p-4 rounded-md ${isActive ? "bg-primary" : "bg-gray-200"}`}
>
  <StyledText className={isActive ? "text-white" : "text-gray-700"}>
    Dynamic Text
  </StyledText>
</StyledView>
```

### Important Notes

1. Always use the `className` prop, not `style` for Tailwind styles
2. For styles that can't be expressed with Tailwind, use the inline `style` prop alongside className:

```tsx
<StyledView
  className="p-4 rounded-md"
  style={{
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  }}
>
  Content here
</StyledView>
```

3. Remember that some React Native style properties don't have direct Tailwind equivalents. In those cases, use the style prop.

## Available Styled Components

- `StyledView` (from `View`)
- `StyledText` (from `Text`)
- `StyledTextInput` (from `TextInput`)
- `StyledTouchableOpacity` (from `TouchableOpacity`)
- `StyledPressable` (from `Pressable`)
- `StyledScrollView` (from `ScrollView`)
- `StyledImage` (from `Image`)
- `StyledActivityIndicator` (from `ActivityIndicator`)
- `StyledFlatList` (from `FlatList`)

## Further Resources

- [NativeWind Documentation](https://www.nativewind.dev/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
