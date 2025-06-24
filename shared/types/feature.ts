/**
 * Feature Module Type Definitions
 *
 * This file contains type definitions for the feature module architecture.
 * These types help ensure consistency across feature modules and provide
 * a common interface for feature registration and discovery.
 */

/**
 * Base interface for feature modules
 */
export interface FeatureModule {
  /** Unique identifier for the feature */
  id: string;

  /** Display name of the feature */
  name: string;

  /** Brief description of the feature's functionality */
  description: string;

  /** Version of the feature module */
  version?: string;

  /** Whether the feature is enabled */
  enabled?: boolean;

  /** Optional metadata for the feature */
  metadata?: Record<string, any>;
}

/**
 * Interface for features that provide a UI component
 */
export interface UIFeatureModule extends FeatureModule {
  /** Main component for the feature */
  component: React.ComponentType<any>;

  /** Optional icon for the feature */
  icon?: string;
}

/**
 * Interface for features that provide a service
 */
export interface ServiceFeatureModule extends FeatureModule {
  /** Initialize the service */
  initialize?: () => Promise<void> | void;

  /** Clean up the service */
  cleanup?: () => Promise<void> | void;
}

/**
 * Type for feature configuration
 */
export type FeatureConfig = {
  /** Whether the feature is enabled */
  enabled: boolean;

  /** Feature-specific configuration */
  [key: string]: any;
};

/**
 * Type for feature registry
 */
export type FeatureRegistry = {
  [featureId: string]: FeatureModule;
};

/**
 * Type for feature provider props
 */
export type FeatureProviderProps = {
  /** React children */
  children: React.ReactNode;

  /** Optional feature configuration */
  config?: Record<string, FeatureConfig>;
};
