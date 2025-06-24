/**
 * Feature Registry Service
 *
 * This service manages the registration and discovery of feature modules.
 * It provides a centralized way to access features and their configurations.
 */

import {
  FeatureConfig,
  FeatureModule,
  FeatureRegistry,
} from "../types/feature";

class FeatureRegistryService {
  private features: FeatureRegistry = {};
  private featureConfigs: Record<string, FeatureConfig> = {};

  /**
   * Register a feature module
   * @param feature The feature module to register
   */
  registerFeature(feature: FeatureModule): void {
    if (this.features[feature.id]) {
      console.warn(
        `Feature with ID ${feature.id} is already registered. Overwriting.`
      );
    }

    this.features[feature.id] = feature;

    // Initialize with default config if none exists
    if (!this.featureConfigs[feature.id]) {
      this.featureConfigs[feature.id] = {
        enabled: feature.enabled ?? true,
      };
    }

    console.log(`Feature "${feature.name}" (${feature.id}) registered.`);
  }

  /**
   * Unregister a feature module
   * @param featureId The ID of the feature to unregister
   */
  unregisterFeature(featureId: string): void {
    if (!this.features[featureId]) {
      console.warn(`Feature with ID ${featureId} is not registered.`);
      return;
    }

    delete this.features[featureId];
    console.log(`Feature ${featureId} unregistered.`);
  }

  /**
   * Get a feature module by ID
   * @param featureId The ID of the feature to get
   * @returns The feature module or undefined if not found
   */
  getFeature(featureId: string): FeatureModule | undefined {
    return this.features[featureId];
  }

  /**
   * Get all registered feature modules
   * @returns An array of all registered feature modules
   */
  getAllFeatures(): FeatureModule[] {
    return Object.values(this.features);
  }

  /**
   * Get all enabled feature modules
   * @returns An array of all enabled feature modules
   */
  getEnabledFeatures(): FeatureModule[] {
    return Object.values(this.features).filter(
      (feature) =>
        this.featureConfigs[feature.id]?.enabled ?? feature.enabled ?? true
    );
  }

  /**
   * Check if a feature is enabled
   * @param featureId The ID of the feature to check
   * @returns True if the feature is enabled, false otherwise
   */
  isFeatureEnabled(featureId: string): boolean {
    const feature = this.features[featureId];
    if (!feature) return false;

    return this.featureConfigs[featureId]?.enabled ?? feature.enabled ?? true;
  }

  /**
   * Set the configuration for a feature
   * @param featureId The ID of the feature to configure
   * @param config The configuration for the feature
   */
  setFeatureConfig(featureId: string, config: FeatureConfig): void {
    this.featureConfigs[featureId] = {
      ...this.featureConfigs[featureId],
      ...config,
    };
  }

  /**
   * Get the configuration for a feature
   * @param featureId The ID of the feature to get the configuration for
   * @returns The feature configuration or undefined if not found
   */
  getFeatureConfig(featureId: string): FeatureConfig | undefined {
    return this.featureConfigs[featureId];
  }

  /**
   * Enable a feature
   * @param featureId The ID of the feature to enable
   */
  enableFeature(featureId: string): void {
    if (!this.features[featureId]) {
      console.warn(`Feature with ID ${featureId} is not registered.`);
      return;
    }

    this.featureConfigs[featureId] = {
      ...this.featureConfigs[featureId],
      enabled: true,
    };

    console.log(`Feature ${featureId} enabled.`);
  }

  /**
   * Disable a feature
   * @param featureId The ID of the feature to disable
   */
  disableFeature(featureId: string): void {
    if (!this.features[featureId]) {
      console.warn(`Feature with ID ${featureId} is not registered.`);
      return;
    }

    this.featureConfigs[featureId] = {
      ...this.featureConfigs[featureId],
      enabled: false,
    };

    console.log(`Feature ${featureId} disabled.`);
  }
}

// Export a singleton instance
export const featureRegistry = new FeatureRegistryService();

// Export the class for testing or custom instances
export default FeatureRegistryService;
