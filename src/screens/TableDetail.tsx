import { useParams, Link } from "react-router-dom";
import { useViewTable, useAddRow, useAddColumn, useUpdateRow } from "../hooks/query";
import { ArrowLeft, Plus, Database, Columns, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { motion } from "framer-motion";

export function TableDetail() {
  const { tableName } = useParams<{ tableName: string }>();
  const { data, isLoading, isError, error } = useViewTable(tableName || null);
  
  const addRowMutation = useAddRow(tableName!);
  const addColMutation = useAddColumn(tableName!);
  const updateRowMutation = useUpdateRow(tableName!);

  // State for Add Row
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState<Record<string, string>>({});

  // State for Add Column
  const [isColModalOpen, setIsColModalOpen] = useState(false);
  const [newColName, setNewColName] = useState("");

  // State for Editing
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});

  const handleSaveRow = async () => {
    try {
      await addRowMutation.mutateAsync(newRowData);
      setIsRowModalOpen(false);
      setNewRowData({});
    } catch (e) {
      console.error(e);
      alert("Failed to add row");
    }
  };

  const handleAddColumn = async () => {
    if (!newColName) return;
    try {
      await addColMutation.mutateAsync(newColName);
      setIsColModalOpen(false);
      setNewColName("");
    } catch (e) {
      console.error(e);
      alert("Failed to add column");
    }
  };

  const startEdit = (row: any) => {
    setEditingRowId(row.id);
    setEditData({ ...row });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (editingRowId === null) return;
    try {
      // Filter out ID from updates
      const { id, ...updates } = editData;
      await updateRowMutation.mutateAsync({ id: editingRowId, updates });
      setEditingRowId(null);
    } catch (e) {
      console.error(e);
      alert("Failed to update row");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading table data...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error: {error?.message}</div>;
  if (!data) return <div className="p-10 text-center">Table not found</div>;

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pt-20 px-4 md:px-8 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link to="/dashboard" className="p-2 bg-white border rounded-lg hover:bg-gray-100 transition shrink-0">
            <ArrowLeft size={20} />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 truncate">
              <Database size={24} className="text-blue-600 shrink-0" />
              <span className="truncate">{tableName}</span>
            </h1>
            <p className="text-gray-500 text-sm truncate">{data.rows.length} rows • {data.columns.length} columns</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsColModalOpen(true)}
            className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm font-medium whitespace-nowrap"
          >
            <Columns size={18} />
            <span className="hidden sm:inline">Add Column</span>
            <span className="sm:hidden">Col</span>
          </button>
          <button 
            onClick={() => setIsRowModalOpen(true)}
            className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-lg font-medium whitespace-nowrap"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Row</span>
            <span className="sm:hidden">Row</span>
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-4 w-10 bg-gray-50">#</th>
                {data.columns.map((col: string) => (
                  <th key={col} className="px-6 py-4 font-medium whitespace-nowrap bg-gray-50 min-w-[150px]">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-4 w-20 text-right bg-gray-50 sticky right-0 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.1)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row: any, i: number) => {
                const isEditing = editingRowId === row.id;
                
                return (
                  <tr key={i} className={`border-b transition ${isEditing ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-4 text-gray-400 text-xs">{row.id}</td>
                    
                    {data.columns.map((col: string) => (
                      <td key={col} className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {isEditing && col !== 'id' ? (
                          <input 
                            className="w-full p-1 border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={editData[col] !== undefined ? editData[col] : (row[col] || "")}
                            onChange={(e) => setEditData(prev => ({ ...prev, [col]: e.target.value }))}
                          />
                        ) : (
                          row[col] === null ? <span className="text-gray-400 italic">null</span> : String(row[col])
                        )}
                      </td>
                    ))}

                    <td className={`px-4 py-4 text-right sticky right-0 ${isEditing ? "bg-blue-50" : "bg-white group-hover:bg-gray-50"} shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.1)]`}>
                      {isEditing ? (
                        <div className="flex gap-2 justify-end">
                          <button onClick={saveEdit} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                            <Check size={16} />
                          </button>
                          <button onClick={cancelEdit} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(row)} className="p-1 text-gray-400 hover:text-black">
                          <Edit2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {data.rows.length === 0 && (
                <tr>
                  <td colSpan={data.columns.length + 2} className="px-6 py-10 text-center text-gray-500">
                    No data found in this table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Add Row Modal */}
      <Modal 
        isOpen={isRowModalOpen} 
        onClose={() => setIsRowModalOpen(false)} 
        title="Add New Row"
        type="default"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
          {data.columns.filter((c: string) => c !== 'id').map((col: string) => (
            <div key={col}>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{col}</label>
              <input 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Enter ${col}...`}
                value={newRowData[col] || ""}
                onChange={(e) => setNewRowData(prev => ({ ...prev, [col]: e.target.value }))}
              />
            </div>
          ))}
          <div className="pt-4 flex justify-end gap-2">
            <button onClick={() => setIsRowModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button 
              onClick={handleSaveRow} 
              disabled={addRowMutation.isPending}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {addRowMutation.isPending ? "Saving..." : "Save Row"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Column Modal */}
      <Modal
        isOpen={isColModalOpen}
        onClose={() => setIsColModalOpen(false)}
        title="Add New Column"
        type="default"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Column Name</label>
            <input 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., status, phone_number"
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button onClick={() => setIsColModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button 
              onClick={handleAddColumn}
              disabled={addColMutation.isPending}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {addColMutation.isPending ? "Adding..." : "Add Column"}
            </button>
          </div>
        </div>
      </Modal>

    </motion.div>
  );
}
