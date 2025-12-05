export function SheetPreview({ data }: { data: string[][] }) {
  if (!data || data.length === 0) return null;

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="border p-2 rounded-xl bg-white shadow  mx-auto overflow-x-auto max-w-4xl border-5 border-black">
      <table className="min-w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-2 border">{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((col, c) => (
                <td key={c} className="p-2 border text-sm">
                  {col || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
