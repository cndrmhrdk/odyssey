import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import CharacterPage from "../pages/character/CharacterPage";
import QuestPage from "../pages/quest/QuestPage";
import AchievementPage from "../pages/achievement/AchievementPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage/>
                    </ProtectedRoute>}/>
                <Route path="/character" element={
                    <ProtectedRoute>
                        <CharacterPage/>
                    </ProtectedRoute>}/>
                <Route path="/quest" element={
                    <ProtectedRoute>
                        <QuestPage/>
                    </ProtectedRoute>}/>
                <Route path="/achievements" element={
                    <ProtectedRoute>
                        <AchievementPage/>
                    </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;