import { supabase } from "./supabase.js";

let currentUser = null;

export function getCurrentUser() {
  return currentUser;
}

export async function initAuth() {
  // Get initial session on page load
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
  }

  currentUser = session?.user ?? null;
  console.log("Initial auth state:", currentUser);

  // Listen for auth changes (login, logout, refresh)
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
    console.log("Auth state changed:", currentUser);
  });

  return data.subscription;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
  }
}
