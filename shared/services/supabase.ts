/**
 * Supabase Client Service
 *
 * This service provides a configured Supabase client for use throughout the app.
 * It handles authentication, database queries, storage, and realtime subscriptions.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

// Get environment variables
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || "";
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || "";

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Check your app.config.js or .env file."
  );
}

/**
 * Initialize the Supabase client with AsyncStorage for session persistence
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

/**
 * Custom hook to get the current user
 * @returns The current user or null if not authenticated
 */
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Custom hook to get the current session
 * @returns The current session or null if not authenticated
 */
export const getCurrentSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
};

/**
 * Sign out the current user
 * @returns A promise that resolves when the user is signed out
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

export default supabase;
