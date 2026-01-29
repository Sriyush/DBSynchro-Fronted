import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  type?: "default" | "error" | "success";
}

export function Modal({ isOpen, onClose, title, children, type = "default" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5
              ${type === "error" ? "border-l-4 border-red-500" : ""}
              ${type === "success" ? "border-l-4 border-green-500" : ""}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h3 className={`text-lg font-semibold ${type === "error" ? "text-red-600" : type === "success" ? "text-green-600" : "text-gray-900"}`}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>

            {/* Footer (Optional implicit via children, or we can add specific buttons if needed, but mostly children handle it) */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
