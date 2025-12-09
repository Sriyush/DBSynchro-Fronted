import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useViewTable } from "@/hooks/query";
import type { TableInfo } from "@/types/types";

export function TableList({ tables }: { tables: TableInfo[] | undefined }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {tables?.map((t) => {
        const isOpen = open === t.tableName;
        const { data, isLoading } = useViewTable(isOpen ? t.tableName : "");

        return (
          <motion.div
            key={t.id}
            layout
            transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
            className="bg-white rounded-xl shadow p-4 border cursor-pointer"
            onClick={() => setOpen(isOpen ? null : t.tableName)}
          >
            {/* HEADER */}
            <motion.div layout className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{t.tableName}</h3>
                <p className="text-sm text-gray-500">
                  Sheet: {t.sheetTab} ({t.sheetId.slice(0, 6)}…)
                </p>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                ▼
              </motion.span>
            </motion.div>

            {/* EXPANDING SECTION */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 border-t pt-4"
                >
                  {isLoading && <p>Loading table...</p>}

                  {data && (
                    <div className="overflow-auto max-h-80">
                      <table className="w-full text-sm border">
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
          </motion.div>
        );
      })}
    </div>
  );
}
