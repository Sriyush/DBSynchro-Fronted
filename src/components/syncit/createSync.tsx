import { usePreviewSheet,  useCreateTable, useCheckSheet, useSyncTable} from "@/hooks/query";
import { extractSheetId } from "@/helpers/helperFuncs";
import { useEffect, useState } from "react";
import { SheetPreview } from "./SheetPreview";
import { SheetDropdown } from "./sheetDropdown";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/common/Modal";
import {useNavigate} from "react-router-dom";

export function CreateSync() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [selectedSheet, setSelectedSheet] = useState<string | null>(
    null
  );
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
            // Optional: Redirect or refresh could be handled here or by the user closing the modal
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
    <div className="p-10 text-black min-h-[calc(100vh-120px)] border-6 border-black rounded-2xl mx-10">
      <h1 className="text-4xl text-center font-bold mb-6">
        Create Sync Configuration
      </h1>

      <div className="mb-6 max-w-4xl mx-auto flex items-center gap-2">
        <input
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="Paste Google Sheet URL"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleExtract}
          className="w-[20%] bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border-2 border-black cursor-pointer"
        >
          Preview
        </button>

        {previewQuery.data?.sheets && (
            <SheetDropdown
              sheets={previewQuery.data.sheets}
              selectedSheet={selectedSheet ?? "Select"}
              onSelect={(s) => {
                setSelectedSheet(s);
                queryClient.invalidateQueries({ queryKey: ["preview", sheetId, s] });
              }}
            />
        )}
      </div>

      {previewQuery.isPending && (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
        </div>
      )}


      {previewQuery.isError && (
        <div className="text-center text-red-600 font-medium py-4">
          ❌ Error loading sheet: {previewQuery.error?.message}
        </div>
      )}

      {previewQuery.data?.rows && !previewQuery.isPending && (
        <>
          <SheetPreview
            columns={previewQuery.data.columns}
            rows={previewQuery.data.rows}
          />

          <div className="mt-6 flex flex-col gap-4 items-center w-full justify-center">

            {checkQuery.isLoading && (
              <p className="text-gray-600 text-sm">Checking table status...</p>
            )}

            {checkQuery.data?.exists && !checkQuery.isLoading && (
              <div className="p-3  flex items-center justify-center gap-2 border-4 border-black rounded-lg text-black w-[50%]">
                <p className="font-medium">⚠️ Table already exists for this sheet and tab.</p>
                <button
                  onClick={() => navigate(`/dashboard`)} 
                  className=" px-3 py-2 bg-black text-white rounded-lg border-2 hover:bg-white hover:text-black border-black hover:bg-blue-700"
                >
                  Wanna edit it? →
                </button>
              </div>
            )}

{checkQuery.data?.exists && checkQuery.data.changed && (
  <button
    onClick={handleSync}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
  >
    🔄 Sync Changes
  </button>
)}

            {!checkQuery.data?.exists && (
              <div className="flex flex-col items-center gap-2">
                 <div className="flex items-center gap-2">
                    <label className="font-semibold">Table Name:</label>
                    <input 
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="my_table_name"
                    />
                 </div>
                <button
                    onClick={handleCreateTable}
                    disabled={createTableMutation.isPending || !tableName}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 mx-auto"
                >
                    {createTableMutation.isPending ? "Creating..." : "Create Table"}
                </button>
              </div>
            )}

          </div>
        </>
      )}

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
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
                {modal.title === "Table Created" ? "Go to Dashboard" : "Close"}
            </button>
        </div>
      </Modal>

    </div>
  );
}
