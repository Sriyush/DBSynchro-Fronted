import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../hooks/query";
import { useUser } from "../store/ZustandStore";
import { Modal } from "../components/common/Modal";

export function Settings() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  
  const [connectionString, setConnectionString] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; type: "success" | "error" | "default"; title: string; message: string }>({
    open: false,
    type: "default",
    title: "",
    message: "",
  });

  const handleSave = async () => {
    if (!connectionString) {
      setModal({ open: true, type: "error", title: "Error", message: "Please enter a connection string" });
      return;
    }

    setLoading(true);
    try {
      await api.put("/api/user/settings", { connectionString });
      
      // Invalidate user query to refetch profile with new settings
      queryClient.invalidateQueries({ queryKey: ["me"] });
      
      setModal({ 
        open: true, 
        type: "success", 
        title: "Saved", 
        message: "Your custom database connection has been updated." 
      });
      setConnectionString("");
    } catch (err: any) {
      setModal({ 
        open: true, 
        type: "error", 
        title: "Failed", 
        message: err.message || "Could not save settings" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your custom database connection.</p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Database Configuration</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postgres Connection String
          </label>
          <input
            type="password"
            value={connectionString}
            onChange={(e) => setConnectionString(e.target.value)}
            placeholder="postgresql://user:password@host:port/dbname"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">
            This string is stored encrypted. We use it to create tables directly in your database.
          </p>
        </div>

        {user?.encryptedConnectionString && (
            <div className="mb-6 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                You currently have a custom database configured.
            </div>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </div>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        type={modal.type}
      >
        <p>{modal.message}</p>
      </Modal>
    </div>
  );
}
