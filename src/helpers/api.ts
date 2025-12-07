import type { CreateSync } from "@/types/types";
import { supabase } from "../provider/supabaseClient";
import { refreshGoogleToken } from "./auth";
// import { loginWithGoogle } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
async function getTokens() {
  const session = await supabase.auth.getSession();

  const token = session.data.session?.access_token || null;
  let googleToken = session.data.session?.provider_token ;

  // If missing → ask Google for new token
  if (!googleToken) {
    const refreshed = await refreshGoogleToken();
    googleToken = typeof refreshed === "string" ? refreshed : null;
  }

  return { token, googleToken };
}



export async function UserData(){
const { token, googleToken } = await getTokens();
    if (!token) {
        throw new Error("Not authenticated");
    }
    console.log("Fetching /me with token:", token);
    console.log("Using Google provider token:", googleToken);
    const res = await fetch(`${BACKEND_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "provider-token": `${googleToken}`
        },
    });

    if (!res.ok) throw new Error("Failed to fetch /me");

    return res.json();
}
export async function runSync(id: number) {
const { token, googleToken } = await getTokens();
    const res = await fetch(`${BACKEND_URL}/sync/run/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "provider-token": `${googleToken}`
        },
    });
    return res.json();
}

export async function previewSheet(sheetId: string ,tab?: string ) {
const { token, googleToken } = await getTokens();
  const params = new URLSearchParams({ sheetId });
  if (tab && tab.trim() !== "default") params.append("tab", tab);

    const res = await fetch(`${BACKEND_URL}/api/preview?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "provider-token": `${googleToken}`
        },  

    })

    return res.json();
}

export async function createSync(body: CreateSync) {   
    const { token, googleToken } = await getTokens(); 
    
    const res = await fetch(`${BACKEND_URL}/sync/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "provider-token": `${googleToken}`
        },
        body: JSON.stringify(body),
    });
    return res.json();
}

export async function fetchSheet(sheetId: string, ) {
    const { token, googleToken } = await getTokens();
    
    const res = await fetch(`${BACKEND_URL}/api/check/${sheetId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "provider-token": `${googleToken}`
        },
        body: JSON.stringify(sheetId),

    })

    return res.json();
}