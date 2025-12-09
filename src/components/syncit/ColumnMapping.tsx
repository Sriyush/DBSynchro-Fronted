export function ColumnMapping({ columns, setMapping }: any) {
  const handleChange = (col: string, val: string) => {
    setMapping((p: any) => ({ ...p, [col]: val }));
  };

  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Map Columns</h2>

      {columns.map((col: string) => (
        <div key={col} className="flex items-center gap-4 mb-3">
          <span className="w-1/3">{col}</span>
          <input
            placeholder={`DB column for ${col}`}
            onChange={(e) => handleChange(col, e.target.value)}
            className="border p-2 rounded w-2/3"
          />
        </div>
      ))}
    </div>
  );
}
