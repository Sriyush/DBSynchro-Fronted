import { useNavigate } from "react-router-dom";

export function TableRow({
  table,
}: {
  table: any;
  isOpen: boolean; // Keeping props for compatibility but ignoring them
  onToggle: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow border relative hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{table.tableName}</h3>
          <p className="text-sm text-gray-500">
            Sheet: {table.sheetId} / Tab: {table.sheetTab}
          </p>
        </div>

        <button
          onClick={() => navigate(`/table/${table.tableName}`)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm"
        >
          Manage Table
        </button>
      </div>
    </div>
  );
}
