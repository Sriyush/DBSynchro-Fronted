# 🦇 DBSynchro Frontend

**The Dashboard for Your Data.**

DBSynchro Frontend is the sleek, modern control center for managing your synchronized databases. Built for speed and usability, it lets you view, edit, and manage your Postgres tables that are linked to Google Sheets.

---

## 🚀 Features

*   **User Dashboard:** View all your synced tables in one place.
*   **Table Management:**
    *   **View Data:** Clean, responsive table layout.
    *   **Edit Rows:** Inline editing with instant sync.
    *   **Add Data:** Create new rows and columns on the fly.
*   **Custom Settings:** Configure your own Postgres database connection securely.
*   **Google Integration:** Sign in with Google and browse your Sheets instantly.

## 🛠️ Tech Stack

*   **Framework:** React 19 + Vite (Blazing fast).
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS v4.
*   **State:** Zustand (Global) + React Query (Async).
*   **Icons:** Lucide React.

## ⚡ Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/Sriyush/DBSynchro-Fronted.git
    cd DBSynchro-Fronted
    pnpm install
    ```

2.  **Environment Variables**
    Create a `.env` file:
    ```env
    VITE_SUPABASE_URL=...
    VITE_SUPABASE_ANON_KEY=...
    VITE_BACKEND_URL=http://localhost:4000
    ```

3.  **Run Dev Server**
    ```bash
    pnpm dev
    ```

## 🔮 Future Roadmap

*   [ ] **Pagination:** Handle massive tables efficiently.
*   [ ] **Filtering:** Search and filter rows instantly.
*   [ ] **Realtime:** Live updates using Supabase Realtime.

---

*Built with 🖤 by Sriyush & Clanker.*
