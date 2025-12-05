import { usePreviewSheet, useCreateSync, useCheckTable } from "@/hooks/query";
import { extractSheetId } from "@/helpers/helperFuncs";
import { useState } from "react";
import { SheetPreview } from "./SheetPreview";
import { ColumnMapping } from "./ColumnMapping";

export function CreateSync() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [tableName, setTableName] = useState("");
  const [mapping, setMapping] = useState({});

  const previewQuery = usePreviewSheet(sheetId);
  const createConfig = useCreateSync();
  const tableCheck = useCheckTable(sheetId);

  const handleExtract = () => {
    const id = extractSheetId(sheetUrl);
    if (!id) return alert("Invalid URL");

    setSheetId(id);

    // wait for React state to update
    // setTimeout(() => {
    //   previewQuery.refetch();
    //   tableCheck.refetch();
    // }, 0);
  };

  const handleCreate = () => {
    createConfig.mutate({
      sheetId,
      sheetRange: "Sheet1!A1:Z999",
      tableName,
      mapping
    });
  };

  return (
    <div className="p-10 text-black min-h-[calc(100vh-120px)] border-6 border-black rounded-2xl mx-10">

      <h1 className="text-4xl text-center font-bold mb-6">Create Sync Configuration</h1>

      <div className="mb-6 max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* <label className="block font-medium mb-2 text-center">Google Sheet URL</label> */}

        <input
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="Paste Google Sheet URL"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleExtract}
          className=" w-[20%] bg-black text-white p-2 rounded"
        >
          Preview
        </button>
      </div>

      {previewQuery.data?.rows && (
        <>
          <SheetPreview data={previewQuery.data.rows} />
{/* 
          <div className="max-w-xl mx-auto mt-6">
            <label className="block mb-2 font-medium">Database Table Name</label>
            <input
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="example: users"
              className="border p-2 rounded w-full"
            />
          </div> */}

          { tableCheck.data && (
            <div className="text-center mt-3 font-medium">
              {tableCheck.data.exists ? (
                <span className="text-yellow-600">⚠ Table already exists — update mapping</span>
              ) : (
                <span className="text-green-600">✔ Table will be created automatically</span>
              )}
            </div>
          )}

          {/* <ColumnMapping
            columns={previewQuery.data.columns}
            mapping={mapping}
            setMapping={setMapping}
          /> */}

          {/* <button
            onClick={handleCreate}
            className="mt-6 w-full bg-black text-white p-3 rounded font-bold"
          >
            {tableCheck.data?.exists ? "Update Sync Config" : "Create Sync Config"}
          </button> */}
        </>
      )}
    </div>
  );
}
