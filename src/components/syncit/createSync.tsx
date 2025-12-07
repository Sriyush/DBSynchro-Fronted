import { usePreviewSheet, useCheckTable } from "@/hooks/query";
import { extractSheetId } from "@/helpers/helperFuncs";
import { useEffect, useState } from "react";
import { SheetPreview } from "./SheetPreview";
import { SheetDropdown } from "./sheetDropdown";
import { useQueryClient } from "@tanstack/react-query";

export function CreateSync() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [selectedSheet, setSelectedSheet] = useState<string | null>(
    null
  );
  const previewQuery = usePreviewSheet(sheetId, selectedSheet ?? undefined);

  // const previewQuery = usePreviewSheet(sheetId);
  const queryClient = useQueryClient();
  const handleExtract = () => {
    const id = extractSheetId(sheetUrl);
    if (!id) return alert("Invalid URL");
    setSheetId(id);

    setSelectedSheet(null);
  };
  const tableCheck = useCheckTable(sheetId);

  useEffect(() => {
    if (!sheetId) return;
    if (!previewQuery.data?.sheets) return;
    if (selectedSheet !== null) return;

    const firstSheet = previewQuery.data.sheets[0];
    setSelectedSheet(firstSheet);
    
  }, [sheetId, previewQuery.data]);
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

      {previewQuery.isLoading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* ==============================
          ERROR MESSAGE
      =============================== */}
      {previewQuery.isError && (
        <div className="text-center text-red-600 font-medium py-4">
          ❌ Error loading sheet: {previewQuery.error?.message}
        </div>
      )}

      {/* ==============================
          SHOW PREVIEW WHEN DATA EXISTS
      =============================== */}
      {previewQuery.data?.rows && !previewQuery.isLoading && (
        <>
        <div className="">

          <SheetPreview columns={previewQuery.data.columns}rows={previewQuery.data.rows} />
        </div>

          {tableCheck.data && (
            <div className="text-center mt-3 font-medium">
              {tableCheck.data.exists ? (
                <span className="text-yellow-600">
                  ⚠ Table already exists — update mapping
                </span>
              ) : (
                <span className="text-green-600">
                  ✔ Table will be created automatically
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
