import { Navbar } from "./components/common/Navbar";
import { MainRoutes } from "./MainRoutes";

export function AppRoutes(){
    // const location = useLocation().pathname;
    return (
        <div className="bg-white">
            <Navbar/>

                    <MainRoutes/>

            
        </div>
    )
}