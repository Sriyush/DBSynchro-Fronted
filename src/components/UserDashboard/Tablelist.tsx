import { useState } from "react";
import { TableRow } from "./TableRow";
import type { TableInfo } from "@/types/types";

export function TableList({ tables }: { tables: TableInfo[] | undefined }) {
  const [openTable, setOpenTable] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {tables?.map((t) => (
        <TableRow
          key={t.id}
          table={t}
          isOpen={openTable === t.tableName}
          onToggle={() =>
            setOpenTable((prev) => (prev === t.tableName ? null : t.tableName))
          }
        />
      ))}
    </div>
  );
}
