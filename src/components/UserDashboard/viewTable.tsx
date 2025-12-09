import { useViewTable } from "@/hooks/query";

export function ViewTableModal({
  tableName,
  onClose,
}: {
  tableName: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useViewTable(tableName);

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-h-[80vh] overflow-auto w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">{tableName}</h2>
        <button
          onClick={onClose}
          className="text-red-600 font-semibold hover:underline"
        >
          Close
        </button>
      </div>

      {isLoading && <div>Loading table...</div>}
      {isError && <div>Error loading table.</div>}

      {!isLoading && data && (
        <table className="table-auto border w-full text-sm">
          <thead>
            <tr>
              {data.columns.map((col: string) => (
                <th key={col} className="border p-2 bg-gray-100 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.rows.map((row: any, idx: number) => (
              <tr key={idx}>
                {data.columns.map((col: string) => (
                  <td key={col} className="border p-2">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
