/**
 * Features Context
 *
 * This context provides access to the feature registry throughout the app.
 * It allows components to access and manage features without direct dependency on the registry.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { featureRegistry } from "../services/FeatureRegistry";
import {
  FeatureConfig,
  FeatureModule,
  FeatureProviderProps,
} from "../types/feature";

interface FeaturesContextType {
  // Feature access
  getAllFeatures: () => FeatureModule[];
  getEnabledFeatures: () => FeatureModule[];
  getFeature: (featureId: string) => FeatureModule | undefined;
  isFeatureEnabled: (featureId: string) => boolean;

  // Feature management
  enableFeature: (featureId: string) => void;
  disableFeature: (featureId: string) => void;
  setFeatureConfig: (featureId: string, config: FeatureConfig) => void;
  getFeatureConfig: (featureId: string) => FeatureConfig | undefined;

  // State
  features: FeatureModule[];
  enabledFeatures: FeatureModule[];
  loading: boolean;
}

// Create the context with a default value
const FeaturesContext = createContext<FeaturesContextType | null>(null);

/**
 * Provider component for the features context
 */
export function FeaturesProvider({ children, config }: FeatureProviderProps) {
  const [features, setFeatures] = useState<FeatureModule[]>([]);
  const [enabledFeatures, setEnabledFeatures] = useState<FeatureModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize feature configurations
  useEffect(() => {
    if (config) {
      Object.entries(config).forEach(([featureId, featureConfig]) => {
        featureRegistry.setFeatureConfig(featureId, featureConfig);
      });
    }

    // Update state
    setFeatures(featureRegistry.getAllFeatures());
    setEnabledFeatures(featureRegistry.getEnabledFeatures());
    setLoading(false);
  }, [config]);

  // Context value
  const value: FeaturesContextType = {
    // Feature access
    getAllFeatures: () => {
      const allFeatures = featureRegistry.getAllFeatures();
      setFeatures(allFeatures);
      return allFeatures;
    },

    getEnabledFeatures: () => {
      const enabled = featureRegistry.getEnabledFeatures();
      setEnabledFeatures(enabled);
      return enabled;
    },

    getFeature: (featureId: string) => {
      return featureRegistry.getFeature(featureId);
    },

    isFeatureEnabled: (featureId: string) => {
      return featureRegistry.isFeatureEnabled(featureId);
    },

    // Feature management
    enableFeature: (featureId: string) => {
      featureRegistry.enableFeature(featureId);
      setEnabledFeatures(featureRegistry.getEnabledFeatures());
    },

    disableFeature: (featureId: string) => {
      featureRegistry.disableFeature(featureId);
      setEnabledFeatures(featureRegistry.getEnabledFeatures());
    },

    setFeatureConfig: (featureId: string, config: FeatureConfig) => {
      featureRegistry.setFeatureConfig(featureId, config);

      // Update state if the enabled status changed
      if (config.enabled !== undefined) {
        setEnabledFeatures(featureRegistry.getEnabledFeatures());
      }
    },

    getFeatureConfig: (featureId: string) => {
      return featureRegistry.getFeatureConfig(featureId);
    },

    // State
    features,
    enabledFeatures,
    loading,
  };

  return (
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
}

/**
 * Hook to use the features context
 * @returns The features context
 * @throws Error if used outside of a FeaturesProvider
 */
export function useFeatures(): FeaturesContextType {
  const context = useContext(FeaturesContext);

  if (!context) {
    throw new Error("useFeatures must be used within a FeaturesProvider");
  }

  return context;
}
