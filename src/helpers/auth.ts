import { supabase } from "../provider/supabaseClient";

export function loginWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173",
      scopes: "email profile openid https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export function logout() {
  return supabase.auth.signOut();
}