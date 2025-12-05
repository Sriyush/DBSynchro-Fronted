import { AnimatePresence ,motion } from "framer-motion";
import { Navbar } from "./components/common/Navbar";
import { MainRoutes } from "./MainRoutes";
import { useLocation } from "react-router-dom";

export function AppRoutes(){
    const location = useLocation().pathname;
    return (
        <div className="bg-white">
            <Navbar/>
            <AnimatePresence mode="wait">
                <motion.div
                    key={location}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    <MainRoutes/>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}