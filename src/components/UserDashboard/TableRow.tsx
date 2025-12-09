import { motion, AnimatePresence } from "framer-motion";
import { useViewTable } from "@/hooks/query";
import { TableSkeleton } from "./TableSkeleton";

export function TableRow({
  table,
  isOpen,
  onToggle,
}: {
  table: any;
  isOpen: boolean;
  onToggle: () => void;
}) {
  // Hook is safe here
  const { data, isLoading, isError } = useViewTable(
    isOpen ? table.tableName : null
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow border relative">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{table.tableName}</h3>
          <p className="text-sm text-gray-500">
            Sheet: {table.sheetId} / Tab: {table.sheetTab}
          </p>
        </div>

        <button
          onClick={onToggle}
          className="px-3 py-1 bg-black text-white rounded-xl hover:bg-white hover:text-black border-2 border-black"
        >
          {isOpen ? "Hide" : "View Table"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-4"
          >
            {isLoading && <TableSkeleton />}

            {isError && (
              <div className="text-red-500">Failed to load table.</div>
            )}

            {!isLoading && data && (
              <div className="overflow-auto border rounded-lg">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      {data.columns.map((col: string) => (
                        <th
                          key={col}
                          className="border p-2 bg-gray-100 text-left"
                        >
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
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
