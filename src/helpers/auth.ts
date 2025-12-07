import { supabase } from "../provider/supabaseClient";

export function loginWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173",
      scopes: "email profile openid https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly",
    },
  });
}

export function logout() {
  return supabase.auth.signOut();
}
let tokenClient: any;

export function initGoogleSheets() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    callback: (response : any) => {
      localStorage.setItem("google_token", response.access_token);
      console.log("New Google token:", response.access_token);
    }
  });
}
export function refreshGoogleToken() {
  return new Promise((resolve) => {
    tokenClient.callback = (response: any) => {
      localStorage.setItem("google_token", response.access_token);
      resolve(response.access_token);
    };
    tokenClient.requestAccessToken();
  });
}
