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
export async function getValidGoogleToken() {
  const saved = localStorage.getItem("google_provider_token");
  const savedExpiry = localStorage.getItem("google_provider_token_exp");
  const now = Math.floor(Date.now() / 1000);

  // 1. Cached & not expired
  if (saved && savedExpiry && Number(savedExpiry) > now) {
    return saved;
  }

  // 2. Try refreshing Supabase session (but it will NOT give provider_token again)
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error("Failed to refresh Supabase session");

  const googleToken = data.session?.provider_token;
  const expiry = data.session?.expires_at;

  // ⚠️ provider_token usually NOT returned here
  if (googleToken) {
    localStorage.setItem("google_provider_token", googleToken);
    localStorage.setItem("google_provider_token_exp", expiry!.toString());
    return googleToken;
  }

  // 3. provider_token missing → user must re-login with Google
  localStorage.removeItem("google_provider_token");
  localStorage.removeItem("google_provider_token_exp");

  throw new Error("Google token expired — Login again");
}
