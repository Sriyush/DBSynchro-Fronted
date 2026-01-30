import { useNavigate } from "react-router-dom";
import PixelBlast from "../PixelBlast";
import { motion, type Variants } from "framer-motion";
import { useUser } from "@/store/ZustandStore";
import { loginWithGoogle } from "@/helpers/auth";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  },
};

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="relative min-h-[calc(100vh-120px)] md:h-[calc(100vh-120px)] mx-4 md:mx-6 mt-4 mb-4 border-4 border-black rounded-[2rem] md:rounded-[3rem] flex items-center justify-center overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">

      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={2}
          color="#000000"
          patternScale={10}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl text-center px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight"
          variants={itemVariants}
        >
          Sync Google Sheets with PostgreSQL Effortlessly
        </motion.h1>

        <motion.p 
          className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Stop building CRUD apps from scratch. Connect your Google Sheet, map your columns, and get a production-ready database instantly.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 text-lg font-bold bg-black text-white border-2 border-black rounded-xl hover:bg-white hover:text-black cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Go to Dashboard →
              </button>
              <button
                onClick={() => navigate("/syncit")}
                className="px-8 py-4 text-lg font-bold bg-white text-black border-2 border-black rounded-xl hover:bg-black hover:text-white cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Start Syncing +
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="px-8 py-4 text-lg font-bold bg-black text-white border-2 border-black rounded-xl hover:bg-white hover:text-black cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Login with Google
            </button>
          )}
        </motion.div>
      </motion.div>

    </section>
  );
}
