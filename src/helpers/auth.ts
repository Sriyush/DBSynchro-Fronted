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

export async function refreshGoogleAccessToken() {
  const refreshToken = localStorage.getItem("google_refresh_token");
  if (!refreshToken) return null;

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const json = await res.json();

  if (json.access_token) {
    localStorage.setItem("google_access_token", json.access_token);
    return json.access_token;
  }

  console.warn("Failed to refresh Google access token:", json);
  return null;
}
export function isGoogleTokenExpired(token: string) {
  const [, payload] = token.split(".");
  if (!payload) return true;

  const decoded = JSON.parse(atob(payload));
  const now = Math.floor(Date.now() / 1000);

  return decoded.exp < now;
}

export async function getValidGoogleToken() {
  let googleToken = localStorage.getItem("google_access_token");

  if (!googleToken || isGoogleTokenExpired(googleToken)) {
    console.log("🔄 Google token expired → refreshing...");
    googleToken = await refreshGoogleAccessToken();
  }

  if (!googleToken) {
    console.error("❌ Missing valid Google access token");
    throw new Error("Google OAuth token missing or expired");
  }

  return googleToken;
}

export function logout() {
  
  return supabase.auth.signOut();
}