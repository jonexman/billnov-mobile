# BillNov Mobile App

BillNov is a mobile finance application built with React Native and Expo, offering cryptocurrency management, expense tracking, and financial services.

## Features

- **Cryptocurrency Management**: Buy, sell, and manage multiple cryptocurrencies
- **Expense Tracking**: Record and analyze expenses with categorization
- **Bank Account Management**: Connect and manage bank accounts
- **Referral System**: Invite friends and earn rewards
- **User Verification**: Multi-level verification system for security

## Project Structure

```
billnov-mobile/
├── app/                 # Main app screens (Expo Router)
│   ├── (tabs)/          # Bottom tab screens
│   ├── auth/            # Authentication screens
│   ├── onboarding/      # Onboarding screens
│   └── verification/    # User verification screens
├── assets/              # Static assets
├── components/          # Reusable components
│   ├── ui/              # UI components (buttons, inputs, cards)
│   └── ...              # Other components
├── constants/           # Constants and configuration
├── features/            # Feature-specific modules
│   └── expenses/        # Expense tracking feature
│       ├── components/  # Feature-specific components
│       ├── context/     # State management
│       ├── types/       # Type definitions
│       └── utils/       # Utility functions
├── hooks/               # Custom React hooks
├── shared/              # Shared utilities and constants
│   ├── components/      # Shared components
│   └── constants/       # Shared constants
└── types/               # Global type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/billnov-mobile.git
cd billnov-mobile
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

3. Start the development server:

```sh
npm start
# or
yarn start
```

4. Use the Expo Go app to scan the QR code to open the app on your device, or press 'a' to open in an Android emulator or 'i' for iOS simulator.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the component structure: UI components in `components/ui`, features in `features/`
- Use the theme system from `shared/constants/theme.ts`

### Component Structure

- Create reusable UI components in `components/ui/`
- Feature-specific components should be placed in their respective feature folders
- Use the provided themes and UI components instead of creating one-off styles

### State Management

The app uses React Context for state management. Feature-specific contexts should be placed in the respective feature folder.

### Navigation

The app uses Expo Router for navigation. Routes are defined in the `app` directory.

### Theming

Use the theme system from `shared/constants/theme.ts` for consistent styling:

```tsx
import { colors, spacing, typography } from "@/shared/constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.background,
    padding: spacing.md,
  },
  text: {
    color: colors.neutral.gray900,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
  },
});
```

## UI Component Library

The app includes a set of reusable UI components:

### Button

```tsx
import { Button } from "@/components/ui";

<Button
  title="Press Me"
  variant="primary" // primary, secondary, outline, ghost
  size="md" // sm, md, lg
  onPress={handlePress}
  isLoading={false}
  fullWidth={false}
/>;
```

### Input

```tsx
import { Input } from "@/components/ui";

<Input
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  leftIcon="mail"
  error={emailError}
/>;
```

### Card

```tsx
import { Card } from "@/components/ui";

<Card variant="elevated">
  <Text>Card Content</Text>
</Card>;
```

## Scripts

- `npm start` - Start the development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run web` - Start the app on web
- `npm run lint` - Run linting
- `npm run reset-project` - Reset the project cache

## License

[MIT License](LICENSE)
