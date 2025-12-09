import { AnimatePresence ,motion } from "framer-motion";
import { Navbar } from "./components/common/Navbar";
import { MainRoutes } from "./MainRoutes";
import { useLocation } from "react-router-dom";

export function AppRoutes(){
    // const location = useLocation().pathname;
    return (
        <div className="bg-white">
            <Navbar/>

                    <MainRoutes/>

            
        </div>
    )
}