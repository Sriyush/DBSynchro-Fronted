import { usePreviewSheet,  useCreateTable, useCheckSheet, useSyncTable} from "@/hooks/query";
import { extractSheetId } from "@/helpers/helperFuncs";
import { useEffect, useState } from "react";
import { SheetPreview } from "./SheetPreview";
import { SheetDropdown } from "./sheetDropdown";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/common/Modal";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutList, Search, Database } from "lucide-react";

export function CreateSync() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default" as "default" | "error" | "success",
  });

  const [tableName, setTableName] = useState("");

  useEffect(() => {
    if (selectedSheet) {
        setTableName(selectedSheet.replace(/\s+/g, "_").toLowerCase());
    }
  }, [selectedSheet]);

  const previewQuery = usePreviewSheet(sheetId, selectedSheet ?? undefined);
  const queryClient = useQueryClient();

  const handleExtract = () => {
    if (!sheetUrl) return; // Don't do anything if input is empty
    const id = extractSheetId(sheetUrl);
    if (!id) {
        setModal({
            isOpen: true,
            title: "Invalid URL",
            message: "Please enter a valid Google Sheet URL.",
            type: "error",
        });
        return;
    }
    setSheetId(id);
    setSelectedSheet(null);
  };

  const syncMutation = useSyncTable(sheetId, selectedSheet ?? "");
  const createTableMutation = useCreateTable(sheetId);
  const checkQuery = useCheckSheet(sheetId, selectedSheet);

  useEffect(() => {
    if (!sheetId) return;
    if (!previewQuery.data?.sheets) return;
    if (selectedSheet !== null) return;

    const firstSheet = previewQuery.data.sheets[0];
    setSelectedSheet(firstSheet);
  }, [sheetId, previewQuery.data]);

  const handleSync = () => {
    syncMutation.mutate(undefined, {
        onSuccess: () => {
            setModal({
                isOpen: true,
                title: "Sync Successful",
                message: "The table has been successfully synced with the latest sheet data.",
                type: "success",
            });
        },
        onError: (err: any) => {
            setModal({
                isOpen: true,
                title: "Sync Failed",
                message: err.message || "An error occurred while syncing.",
                type: "error",
            });
        }
    });
  };

  const handleCreateTable = () => {
    if (!tableName) return;
    createTableMutation.mutate({
        selectedSheet: selectedSheet!,
        tableName: tableName,
        columns: previewQuery.data.columns,
        rows: previewQuery.data.rows,
      }, {
        onSuccess: () => {
            setModal({
                isOpen: true,
                title: "Table Created",
                message: "Your table has been successfully created from the sheet.",
                type: "success",
            });
        },
        onError: (err: any) => {
            setModal({
                isOpen: true,
                title: "Creation Failed",
                message: err.message || "Failed to create table. Please try again.",
                type: "error",
            });
        }
      });
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[98%] border-4 border-black rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden bg-white mb-10">
        
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">Sync New Sheet</h1>
            <p className="text-gray-500 text-base">Paste your URL, preview data, and ship to Postgres.</p>
        </div>

        {/* Input Section */}
        <div className="mb-8 w-full flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-xl text-base outline-none focus:ring-4 focus:ring-black/10 transition-all"
                />
            </div>

            <button
                onClick={handleExtract}
                className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-white hover:text-black border-2 border-black transition-all transform active:scale-95 whitespace-nowrap"
            >
                Preview
            </button>

            {previewQuery.data?.sheets && (
                <div className="md:w-64 min-w-[200px]">
                    <SheetDropdown
                    sheets={previewQuery.data.sheets}
                    selectedSheet={selectedSheet ?? "Select"}
                    onSelect={(s) => {
                        setSelectedSheet(s);
                        queryClient.invalidateQueries({ queryKey: ["preview", sheetId, s] });
                    }}
                    />
                </div>
            )}
        </div>

        {/* Loading State */}
        {previewQuery.isFetching && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent rounded-full"></div>
                <p className="text-gray-500 font-medium">Fetching sheet data...</p>
            </div>
        )}

        {/* Error State */}
        {previewQuery.isError && (
            <div className="text-center bg-red-50 border-2 border-red-500 text-red-600 font-bold p-6 rounded-xl max-w-2xl mx-auto">
                ❌ Error: {previewQuery.error?.message}
            </div>
        )}

        {/* Empty State (Initial) */}
        {!previewQuery.data && !previewQuery.isFetching && !previewQuery.isError && (
            <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                <LayoutList size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No Sheet Loaded</h3>
                <p className="text-gray-400">Enter a URL above to see the magic.</p>
            </div>
        )}

        {/* Data Preview */}
        {previewQuery.data?.rows && !previewQuery.isPending && (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 flex flex-col h-full"
            >
            <div className="border-2 border-black rounded-xl overflow-hidden shadow-sm flex-grow w-full">
                <div className="bg-gray-100 border-b-2 border-black px-6 py-3 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                    <LayoutList size={16} /> Data Preview
                </div>
                <div className="max-h-[60vh] overflow-auto">
                    <SheetPreview
                        columns={previewQuery.data.columns}
                        rows={previewQuery.data.rows}
                    />
                </div>
            </div>

            {/* Actions Area */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-black flex flex-col items-center gap-6">
                
                {checkQuery.isLoading && (
                    <div className="animate-pulse flex items-center gap-2 text-gray-500">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                        Checking database status...
                    </div>
                )}

                {/* Case 1: Table Already Exists */}
                {checkQuery.data?.exists && !checkQuery.isLoading && (
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 text-xl font-bold text-black">
                            <Database size={24} />
                            <span>Table "{tableName}" is already synced.</span>
                        </div>
                        
                        <div className="flex gap-4 justify-center">
                            {checkQuery.data.changed && (
                                <button
                                    onClick={handleSync}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl border-2 border-black hover:bg-white hover:text-blue-600 transition-all shadow-[4px_4px_0px_#000]"
                                >
                                    🔄 Sync Changes
                                </button>
                            )}
                            <button
                                onClick={() => navigate(`/dashboard`)} 
                                className="px-6 py-3 bg-black text-white font-bold rounded-xl border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#000]"
                            >
                                Go to Dashboard →
                            </button>
                        </div>
                    </div>
                )}

                {/* Case 2: New Table Creation */}
                {!checkQuery.data?.exists && !checkQuery.isLoading && (
                    <div className="w-full max-w-md space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Destination Table Name</label>
                            <div className="relative">
                                <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-lg outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-white"
                                    placeholder="my_table_name"
                                />
                            </div>
                            <p className="text-xs text-gray-400">This will be the table name in your Postgres database.</p>
                        </div>

                        <button
                            onClick={handleCreateTable}
                            disabled={createTableMutation.isPending || !tableName}
                            className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {createTableMutation.isPending ? "Creating Table..." : "Create Table & Sync 🚀"}
                        </button>
                    </div>
                )}

            </div>

            </motion.div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        type={modal.type}
      >
        <p className="text-gray-600">{modal.message}</p>
        <div className="mt-6 flex justify-end">
            <button
                onClick={() => {
                    setModal({ ...modal, isOpen: false });
                    if (modal.title === "Table Created") {
                        navigate("/dashboard");
                    }
                }}
                className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
            >
                {modal.title === "Table Created" ? "Go to Dashboard" : "Close"}
            </button>
        </div>
      </Modal>

    </div>
  );
}
