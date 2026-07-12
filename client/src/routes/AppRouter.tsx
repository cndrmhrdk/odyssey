import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import CharacterPage from "../pages/character/CharacterPage";
import QuestPage from "../pages/quest/QuestPage";
import AchievementPage from "../pages/achievement/AchievementPage";
import LeaderboardPage from "../pages/leaderboard/LeaderboardPage";
import ProfilePage from "../pages/profile/ProfilePage";
import AdminRoute from "./AdminRoute";
import AdminRegionPage from "../pages/admin/AdminRegionPage";
import AdminQuestPage from "../pages/admin/AdminQuestPage";
import AdminCreateQuestPage from "../pages/admin/AdminCreateQuestPage";
import AdminEditQuestPage from "../pages/admin/AdminEditQuestPage";
import AdminAchievementPage from "../pages/admin/AdminAchievementPage";
import AdminCreateAchievementPage from "../pages/admin/AdminCreateAchievementPage";
import AdminEditAchievementPage from "../pages/admin/AdminEditAchievementPage";
import AdminDashboardPage from "../pages/admin/AdminDashboard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
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
                <Route path="/leaderboard" element={
                    <ProtectedRoute>
                        <LeaderboardPage/>
                    </ProtectedRoute>}/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>}/>
                <Route path="/admin/regions" element={
                    <AdminRoute>
                        <AdminRegionPage/>
                    </AdminRoute>}/>
                <Route path="/admin/quests" element={
                    <AdminRoute>
                        <AdminQuestPage/>
                    </AdminRoute>}/>
                <Route path="/admin/quests/new" element={
                    <AdminRoute>
                        <AdminCreateQuestPage/>
                    </AdminRoute>}/>
                <Route path="/admin/quests/:id/edit" element={
                    <AdminRoute>
                        <AdminEditQuestPage/>
                    </AdminRoute>}/>
                <Route path="/admin/achievements" element={
                    <AdminRoute>
                        <AdminAchievementPage/>
                    </AdminRoute>}/>
                <Route path="/admin/achievements/create" element={
                    <AdminRoute>
                        <AdminCreateAchievementPage/>
                    </AdminRoute>}/>
                <Route path="/admin/achievements/:id/edit" element={
                    <AdminRoute>
                        <AdminEditAchievementPage/>
                    </AdminRoute>}/>
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                        <AdminDashboardPage/>
                    </AdminRoute>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;