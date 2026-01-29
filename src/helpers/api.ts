import { supabase } from "../provider/supabaseClient";
import { logout } from "./auth";
// import { getValidGoogleToken } from "./auth";

const BACKEND_URL : string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
async function getTokens() {
  const session = await supabase.auth.getSession();

  const token = session.data.session?.access_token || null;

  let googleToken = session.data.session?.provider_token || null;
  if (!googleToken) {
    logout();
    throw new Error("Missing Google provider token");
  }

  return { token, googleToken };
}

export async function UserData(){
const { token, googleToken } = await getTokens();
    if (!token) {
        throw new Error("Not authenticated");
    }
    // console.log("Fetching /me with token:", token);
    // console.log("Using Google provider token:", googleToken);
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
  tableName: string,
  columns: string[],
  rows: string[][],
) {
  if (!sheetId || !selectedSheet || !tableName) return;

  const { token, googleToken } = await getTokens();

  const res = await fetch(`${BACKEND_URL}/sync/create-table`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify({
      sheetId,         
      sheetTab: selectedSheet, 
      tableName,
      columns,
      rows,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create table");
  }
  return data;
}


export async function checkSheet(sheetId: string, sheetTab: string) {
  const { token, googleToken } = await getTokens();

  const params = new URLSearchParams({ sheetId, sheetTab });

  const res = await fetch(`${BACKEND_URL}/api/check-sheet?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken
    }
  });

  return res.json();
}

export async function SyncTable(sheetId:string , sheetTab: string){
  const { token, googleToken } = await getTokens();
  const res = await fetch(`${BACKEND_URL}/sync/sync-table`,{
    method: "POST",
        headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify({ sheetId, sheetTab})
  });
  return res.json();
}

export async function addRow(tableName: string, rowData: Record<string, any>) {
  const { token, googleToken } = await getTokens();
  const res = await fetch(`${BACKEND_URL}/api/table/${tableName}/row`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify(rowData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add row");
  }
  return res.json();
}

export async function addColumn(tableName: string, columnName: string) {
  const { token, googleToken } = await getTokens();
  const res = await fetch(`${BACKEND_URL}/api/table/${tableName}/column`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify({ columnName }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add column");
  }
  return res.json();
}

export async function updateRow(tableName: string, id: number | string, updates: Record<string, any>) {
  const { token, googleToken } = await getTokens();
  const res = await fetch(`${BACKEND_URL}/api/table/${tableName}/row/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "provider-token": googleToken,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update row");
  }
  return res.json();
}

// Generic API helper for PUT/POST/GET
export const api = {
  get: async (endpoint: string) => {
    const { token, googleToken } = await getTokens();
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "provider-token": googleToken,
      },
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `API Error: ${res.statusText}`);
    }
    return res.json();
  },
  
  put: async (endpoint: string, body: any) => {
    const { token, googleToken } = await getTokens();
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "provider-token": googleToken,
      },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || error.message || "Request failed");
    }
    return res.json();
  }
};