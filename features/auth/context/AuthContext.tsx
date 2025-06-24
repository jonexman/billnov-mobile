/**
 * Auth Context
 *
 * This context provides authentication state and methods for the entire application.
 * It uses Supabase for authentication and manages user sessions.
 */

import supabase, {
  getCurrentSession,
  getCurrentUser,
  signOut,
} from "@/shared/services/supabase";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the auth context
interface AuthContextType {
  // Auth state
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Auth methods
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: any | null; data: any | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: any | null; data: any | null }>;
  signInWithOAuth: (
    provider: "google" | "apple" | "facebook"
  ) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<boolean>;
  resetPassword: (
    email: string
  ) => Promise<{ error: any | null; data: any | null }>;
  updatePassword: (
    password: string
  ) => Promise<{ error: any | null; data: any | null }>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state
  useEffect(() => {
    // Get the initial session
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        // Get current session
        const currentSession = await getCurrentSession();
        setSession(currentSession);

        // Get current user
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setIsLoading(false);
    });

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      return response;
    } catch (error) {
      console.error("Error signing up:", error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return response;
    } catch (error) {
      console.error("Error signing in:", error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with OAuth provider
  const signInWithOAuth = async (provider: "google" | "apple" | "facebook") => {
    setIsLoading(true);

    try {
      const response = await supabase.auth.signInWithOAuth({
        provider,
      });

      return response;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true);

    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "billnov://reset-password",
      });

      return response;
    } catch (error) {
      console.error("Error resetting password:", error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    setIsLoading(true);

    try {
      const response = await supabase.auth.updateUser({
        password,
      });

      return response;
    } catch (error) {
      console.error("Error updating password:", error);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signInWithOAuth,
    signOut: async () => {
      setIsLoading(true);
      const result = await signOut();
      setIsLoading(false);
      return result;
    },
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Export the provider and hook
export default {
  AuthProvider,
  useAuth,
};
