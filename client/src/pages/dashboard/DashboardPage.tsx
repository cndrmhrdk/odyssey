import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Sword,
    Trophy,
    Coins,
    Star,
    Shield,
    Sparkles,
} from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { getProfile } from "../../services/profile.service";

import logo from "../../assets/code_odyssey_logo.png";

interface Profile {
    character: {
        nickname: string;
        level: number;
        xp: number;
        coin: number;
    };

    completedQuest: number;

    achievementCount: number;

    currentQuest: {
        id: string;
        quest: {
            title: string;
        };
    }[];
}

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        if (user?.role.name === "ADMIN") {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                setProfile(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user?.role.name === "PLAYER") {
            fetchProfile();
        }
    }, [user]);

    if (!user) {
        return <p className="text-white">Loading...</p>;
    }

    if (user.role.name === "ADMIN") {
        return <p>Redirect...</p>;
    }

    return (
        <MainLayout>
            {profile && (
                <div className="space-y-8">

                    {/* HERO */}

                    <section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-10 shadow-2xl">

                        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl"></div>

                        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl"></div>

                        <div className="relative flex flex-col md:flex-row items-center gap-8">

                            <img
                                src={logo}
                                alt="logo"
                                className="w-32 h-32 rounded-2xl border-4 border-yellow-400 shadow-xl"
                            />

                            <div className="flex-1">

                                <p className="uppercase tracking-[6px] text-yellow-400 text-sm">
                                    Welcome Adventurer
                                </p>

                                <h1 className="mt-2 text-5xl font-black tracking-widest">
                                    CODE ODYSSEY
                                </h1>

                                <p className="mt-4 text-slate-300 text-lg">
                                    Continue your journey and become the
                                    strongest adventurer.
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-800/70 border border-slate-700 px-8 py-6">

                                <p className="text-slate-400">
                                    Current Player
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {user.username}
                                </h2>

                                <p className="text-yellow-400 mt-3">
                                    {profile.character.nickname}
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* STATS */}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 hover:border-yellow-400 transition">

                            <Star
                                className="text-yellow-400"
                                size={34}
                            />

                            <p className="mt-5 text-slate-400">
                                LEVEL
                            </p>

                            <h2 className="text-5xl font-black mt-2">
                                {profile.character.level}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 hover:border-blue-400 transition">

                            <Sparkles
                                className="text-blue-400"
                                size={34}
                            />

                            <p className="mt-5 text-slate-400">
                                XP
                            </p>

                            <h2 className="text-5xl font-black mt-2">
                                {profile.character.xp}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 hover:border-yellow-400 transition">

                            <Coins
                                className="text-yellow-300"
                                size={34}
                            />

                            <p className="mt-5 text-slate-400">
                                COIN
                            </p>

                            <h2 className="text-5xl font-black mt-2">
                                {profile.character.coin}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 hover:border-green-400 transition">

                            <Trophy
                                className="text-green-400"
                                size={34}
                            />

                            <p className="mt-5 text-slate-400">
                                ACHIEVEMENT
                            </p>

                            <h2 className="text-5xl font-black mt-2">
                                {profile.achievementCount}
                            </h2>

                        </div>

                    </div>

                    {/* QUEST + SUMMARY */}

                    <div className="grid lg:grid-cols-2 gap-8">

                        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

                            <div className="flex items-center gap-3 mb-6">

                                <Sword className="text-red-400" />

                                <h2 className="text-2xl font-bold">
                                    Active Quest
                                </h2>

                            </div>

                            {profile.currentQuest.length === 0 ? (

                                <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">

                                    No active quest.

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {profile.currentQuest.map((item) => (

                                        <div
                                            key={item.id}
                                            className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:border-blue-400 transition"
                                        >

                                            <p className="font-semibold text-lg">

                                                ⚔ {item.quest.title}

                                            </p>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

                            <div className="flex items-center gap-3 mb-6">

                                <Shield className="text-cyan-400" />

                                <h2 className="text-2xl font-bold">
                                    Character Summary
                                </h2>

                            </div>

                            <div className="space-y-6">

                                <div className="flex justify-between">

                                    <span className="text-slate-400">
                                        Nickname
                                    </span>

                                    <span className="font-semibold">
                                        {profile.character.nickname}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-400">
                                        Completed Quest
                                    </span>

                                    <span className="font-semibold">
                                        {profile.completedQuest}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-400">
                                        Achievement
                                    </span>

                                    <span className="font-semibold">
                                        {profile.achievementCount}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-400">
                                        Rank
                                    </span>

                                    <span className="text-yellow-400 font-bold">
                                        Adventurer
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </MainLayout>
    );
};

export default DashboardPage;