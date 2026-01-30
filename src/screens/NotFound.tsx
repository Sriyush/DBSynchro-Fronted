import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 pt-24">
      <div className="max-w-2xl w-full text-center border-4 border-black rounded-[2.5rem] p-12 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
        
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-block mb-6 p-6 bg-black text-white rounded-full"
        >
          <FileQuestion size={64} />
        </motion.div>

        <h1 className="text-8xl font-black mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Page Not Found</h2>
        
        <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md mx-auto">
          The link you followed might be broken, or the page may have been removed. 
          Don't worry, your database is safe.
        </p>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-white hover:text-black border-2 border-black transition-all transform hover:scale-105 shadow-xl"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
