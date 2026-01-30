import { useUser } from "@/store/ZustandStore";
import { loginWithGoogle } from "@/helpers/auth";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="h-[calc(100vh-80px)] pt-24 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="p-6 bg-gray-50 rounded-full mb-6 border-2 border-black"
        >
          <Lock size={48} />
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-4">Restricted Access</h2>
        <p className="text-gray-500 mb-8 text-lg max-w-md">
          You need to be logged in to access this page. Connect your Google account to continue.
        </p>

        <button
          onClick={loginWithGoogle}
          className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-white hover:text-black border-2 border-black transition-all transform hover:scale-105"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
