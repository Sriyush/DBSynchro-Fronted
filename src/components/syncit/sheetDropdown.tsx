import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function SheetDropdown({
  sheets,
  selectedSheet,
  onSelect,
}: {
  sheets: string[];
  selectedSheet: string | null;
  onSelect: (sheet: string) => void;
}) {
const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);

  // Close when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block ">
      <div
        onClick={toggle}
        className="flex items-center justify-between w-[150px] px-4 py-2 
                   border-2 border-black rounded-lg bg-gray-100 cursor-pointer 
                   hover:bg-black hover:text-white transition"
      >
        <span>{selectedSheet ?? "Select"}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 w-[150px] bg-white border border-gray-300 
                       rounded-lg shadow-md z-30"
          >
            {sheets.map((sheet) => (
              <button
                key={sheet}
                onClick={() => {
                  console.log("Selected sheet:", sheet); // NOW WORKS
                  onSelect(sheet);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-black hover:text-white ${
                  sheet === selectedSheet ? "bg-gray-200" : ""
                }`}
              >
                {sheet}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
