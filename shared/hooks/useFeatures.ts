/**
 * Feature Registry Hooks
 *
 * This file provides React hooks for accessing the feature registry.
 */

import { useCallback, useEffect, useState } from "react";
import { featureRegistry } from "../services/FeatureRegistry";
import { FeatureConfig, FeatureModule } from "../types/feature";

/**
 * Hook to access all registered features
 * @returns An array of all registered feature modules
 */
export function useAllFeatures(): FeatureModule[] {
  const [features, setFeatures] = useState<FeatureModule[]>(
    featureRegistry.getAllFeatures()
  );

  // This is a simple implementation. In a real app, you would want to
  // subscribe to changes in the feature registry.
  useEffect(() => {
    // In a real app, this would be a subscription
    setFeatures(featureRegistry.getAllFeatures());
  }, []);

  return features;
}

/**
 * Hook to access all enabled features
 * @returns An array of all enabled feature modules
 */
export function useEnabledFeatures(): FeatureModule[] {
  const [features, setFeatures] = useState<FeatureModule[]>(
    featureRegistry.getEnabledFeatures()
  );

  useEffect(() => {
    // In a real app, this would be a subscription
    setFeatures(featureRegistry.getEnabledFeatures());
  }, []);

  return features;
}

/**
 * Hook to access a specific feature
 * @param featureId The ID of the feature to access
 * @returns The feature module or undefined if not found
 */
export function useFeature(featureId: string): FeatureModule | undefined {
  const [feature, setFeature] = useState<FeatureModule | undefined>(
    featureRegistry.getFeature(featureId)
  );

  useEffect(() => {
    // In a real app, this would be a subscription
    setFeature(featureRegistry.getFeature(featureId));
  }, [featureId]);

  return feature;
}

/**
 * Hook to check if a feature is enabled
 * @param featureId The ID of the feature to check
 * @returns True if the feature is enabled, false otherwise
 */
export function useFeatureEnabled(featureId: string): boolean {
  const [enabled, setEnabled] = useState<boolean>(
    featureRegistry.isFeatureEnabled(featureId)
  );

  useEffect(() => {
    // In a real app, this would be a subscription
    setEnabled(featureRegistry.isFeatureEnabled(featureId));
  }, [featureId]);

  return enabled;
}

/**
 * Hook to access and update a feature's configuration
 * @param featureId The ID of the feature to configure
 * @returns A tuple with the feature configuration and a function to update it
 */
export function useFeatureConfig(
  featureId: string
): [FeatureConfig | undefined, (config: FeatureConfig) => void] {
  const [config, setConfig] = useState<FeatureConfig | undefined>(
    featureRegistry.getFeatureConfig(featureId)
  );

  const updateConfig = useCallback(
    (newConfig: FeatureConfig) => {
      featureRegistry.setFeatureConfig(featureId, newConfig);
      setConfig(featureRegistry.getFeatureConfig(featureId));
    },
    [featureId]
  );

  useEffect(() => {
    // In a real app, this would be a subscription
    setConfig(featureRegistry.getFeatureConfig(featureId));
  }, [featureId]);

  return [config, updateConfig];
}

/**
 * Hook to enable or disable a feature
 * @param featureId The ID of the feature to enable/disable
 * @returns A tuple with the current enabled state and functions to enable/disable the feature
 */
export function useFeatureToggle(
  featureId: string
): [boolean, () => void, () => void] {
  const [enabled, setEnabled] = useState<boolean>(
    featureRegistry.isFeatureEnabled(featureId)
  );

  const enableFeature = useCallback(() => {
    featureRegistry.enableFeature(featureId);
    setEnabled(true);
  }, [featureId]);

  const disableFeature = useCallback(() => {
    featureRegistry.disableFeature(featureId);
    setEnabled(false);
  }, [featureId]);

  useEffect(() => {
    // In a real app, this would be a subscription
    setEnabled(featureRegistry.isFeatureEnabled(featureId));
  }, [featureId]);

  return [enabled, enableFeature, disableFeature];
}
