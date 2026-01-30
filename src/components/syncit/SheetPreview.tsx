export function SheetPreview({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-auto w-full">
      <table className="w-full text-left">
        
        {/* Header */}
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map((col) => (
              <th 
                key={col} 
                className="px-6 py-4 font-bold text-gray-700 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => (
                <td 
                  key={j} 
                  className="px-6 py-4 text-gray-600 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
