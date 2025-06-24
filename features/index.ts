/**
 * Features Module Index
 *
 * This file serves as the central export point for all feature modules in the app.
 * Each feature should be organized as a self-contained module with its own:
 * - Components
 * - Hooks
 * - Context/State management
 * - Types
 * - Utils
 *
 * Features should be independent and only communicate through well-defined interfaces.
 */

// Re-export all features
export * from "./auth";
export * from "./expenses";
export * from "./wallet";
// TODO: Add other features as they are implemented
// export * from './profile';
// export * from './settings';
// export * from './verification';
// export * from './referral';
