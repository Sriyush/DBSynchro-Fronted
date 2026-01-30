import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Syncit } from "./screens/Syncit";
import { UserDashboard } from "./screens/userDashboard";
import { Settings } from "./screens/Settings";
import { TableDetail } from "./screens/TableDetail";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { FAQ } from "./screens/FAQ";
import { Privacy } from "./screens/Privacy";
import { NotFound } from "./screens/NotFound";

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/privacy" element={<Privacy/>} />
            <Route path="/syncit" element={
                <ProtectedRoute>
                    <Syncit/>
                </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <UserDashboard/>
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute>
                    <Settings/>
                </ProtectedRoute>
            } />
            <Route path="/table/:tableName" element={
                <ProtectedRoute>
                    <TableDetail/>
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}
