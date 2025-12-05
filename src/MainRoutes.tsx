import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Syncit } from "./screens/Syncit";

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/syncit" element={<Syncit/>} />
            <Route path="/dashboard" element={<div></div>} />
        </Routes>
    )
}