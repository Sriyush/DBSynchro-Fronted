import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TableRow({
  table,
}: {
  table: any;
  isOpen: boolean; // Keeping props for compatibility but ignoring them
  onToggle: () => void;
}) {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={item}
      className="bg-white p-4 rounded-xl shadow border relative"
      whileHover={{ 
        scale: 1.01, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        borderColor: "#000"
      }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="overflow-hidden w-full">
          <h3 className="font-semibold text-lg truncate">{table.tableName}</h3>
          <p className="text-sm text-gray-500 truncate">
            Sheet: {table.sheetId} / Tab: {table.sheetTab}
          </p>
        </div>

        <button
          onClick={() => navigate(`/table/${table.tableName}`)}
          className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm text-center"
        >
          Manage Table
        </button>
      </div>
    </motion.div>
  );
}
