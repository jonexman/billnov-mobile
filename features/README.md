# Feature-Based Architecture

This directory contains all the features of the application organized in a modular, feature-based architecture. Each feature is designed to be self-contained with minimal dependencies on other features.

## Structure

Each feature follows a similar structure:

```
features/
├── feature-name/
│   ├── components/     # UI components specific to this feature
│   ├── context/        # State management for this feature
│   ├── hooks/          # Custom hooks for this feature
│   ├── types/          # TypeScript types and interfaces
│   ├── utils/          # Helper functions and utilities
│   ├── api/            # API calls and data fetching
│   ├── screens/        # Screen components (if applicable)
│   └── index.ts        # Public API for the feature
└── index.ts            # Re-exports all features
```

## Guidelines

1. **Independence**: Features should be as independent as possible. They should not directly import from other features.

2. **Communication**: Features should communicate through:

   - Props
   - Context
   - Events
   - Well-defined interfaces

3. **Encapsulation**: Each feature should hide its implementation details and only expose what's necessary through its `index.ts` file.

4. **Reusability**: Common functionality should be extracted to shared utilities or components.

5. **Testing**: Each feature should be testable in isolation.

## Existing Features

- **Expenses**: Manages expense tracking, budgeting, and financial analytics
- **Auth**: Handles user authentication and authorization
- **Wallet**: Manages cryptocurrency wallets and transactions
- **Profile**: User profile management
- **Settings**: App settings and preferences
- **Verification**: User verification processes
- **Referral**: Referral program management

## Adding a New Feature

1. Create a new directory under `features/`
2. Set up the standard structure (components, context, hooks, etc.)
3. Implement the feature's functionality
4. Export the public API through `index.ts`
5. Add the feature to the main `features/index.ts` file

## Best Practices

- Keep feature-specific components within the feature directory
- Use shared components for common UI elements
- Avoid circular dependencies between features
- Document public APIs for each feature
- Write tests for critical functionality
