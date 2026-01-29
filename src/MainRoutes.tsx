import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Syncit } from "./screens/Syncit";
import { UserDashboard } from "./screens/userDashboard";
import { Settings } from "./screens/Settings";
import { TableDetail } from "./screens/TableDetail";

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/syncit" element={<Syncit/>} />
            <Route path="/dashboard" element={<UserDashboard/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/table/:tableName" element={<TableDetail/>} />
        </Routes>
    )
}