import { useState } from "react";
import { TableRow } from "./TableRow";
import type { TableInfo } from "@/types/types";
import { motion } from "framer-motion";

export function TableList({ tables }: { tables: TableInfo[] | undefined }) {
  const [openTable, setOpenTable] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
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
    </motion.div>
  );
}
