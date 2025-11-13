import { getSupabase } from "./supabaseClient";
import { getURL } from "./getURL";

export const handleAuthError = (error, navigate) => {
  // eslint-disable-next-line no-console
  console.error("Authentication error:", error);
  if (!navigate) return;

  const msg = String(error?.message || "");
  if (msg.includes("redirect")) {
    navigate("/auth/error?type=redirect");
  } else if (msg.includes("email")) {
    navigate("/auth/error?type=email");
  } else {
    navigate("/auth/error");
  }
};

export const signUp = async (email, password) => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${getURL()}auth/callback` },
  });
};

export const resetPassword = async (email) => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") };
  }
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}auth/reset-password`,
  });
};

export const signInWithMagicLink = async (email) => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") };
  }
  return await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${getURL()}auth/callback` },
  });
};

export const signInWithOAuth = async (provider) => {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") };
  }
  return await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${getURL()}auth/callback` },
  });
};
