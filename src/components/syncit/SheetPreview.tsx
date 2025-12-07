export function SheetPreview({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-auto border-6 border-black rounded-xl p-2">
      <table className="w-full border-collapse ">
        
        {/* Header */}
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th 
                key={col} 
                className="px-4 py-2 border border-black font-bold text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              {row.map((cell, j) => (
                <td 
                  key={j} 
                  className="px-4 py-2 border border-gray-400"
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
