import { supabase } from "../provider/supabaseClient";
// import { getValidGoogleToken } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
async function getTokens() {
  const session = await supabase.auth.getSession();

  const token = session.data.session?.access_token || null;

  let googleToken = session.data.session?.provider_token || null;
  if (!googleToken) {
    throw new Error("Missing Google provider token");
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

export async function viewTable(tableName: string) {
  const { token, googleToken } = await getTokens();

  const res = await fetch(`${BACKEND_URL}/api/table/${tableName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
  });

  if (!res.ok) throw new Error("Failed to load table");

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


export async function handleCreateTable(
  sheetId: string,
  selectedSheet: string,
  columns: string[],
  rows: string[][],
) {
  if (!sheetId || !selectedSheet) return;

  const tableName = prompt(
    "Enter table name:",
    selectedSheet.replace(/\s+/g, "_")
  );

  if (!tableName) return;

  const { token, googleToken } = await getTokens();

  const res = await fetch(`${BACKEND_URL}/sync/create-table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify({
      sheetId,          // 👈 NEW
      sheetTab: selectedSheet, // 👈 NEW
      tableName,
      columns,
      rows,
    }),
  });

  const data = await res.json();
  alert("Table created: " + data.table.tableName);
}
