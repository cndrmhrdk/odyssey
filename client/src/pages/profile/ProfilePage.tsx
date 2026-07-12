import { useEffect, useState } from "react";
import { getProfile } from "../../services/profile.service";
import MainLayout from "../../components/layout/MainLayout";
import toast from "react-hot-toast";

interface QuestProgress {
    id: string;
    quest: {
        id: string;
        title: string;
    };
}

interface Character {
    id: string;
    nickname: string;
    level: number;
    xp: number;
    coin: number;
    avatar: string | null;
    title: string | null;
}

interface ProfileData {
    character: Character;
    completedQuest: number;
    achievementCount: number;
    currentQuest: QuestProgress[];
}

const ProfilePage = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                setProfile(result.data);
            } catch (error) {
                console.error(error);
                toast.error("Gagal mengambil profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="text-white text-xl">
                    Loading Profile...
                </div>
            </MainLayout>
        );
    }

    if (!profile) {
        return (
            <MainLayout>
                <div className="text-red-400">
                    Profile tidak ditemukan.
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="rounded-3xl border border-cyan-500/30 bg-slate-900 p-8 shadow-xl">
                    <h1 className="text-4xl font-black text-cyan-300">
                        👤 Adventurer Profile
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Semua informasi perjalananmu di Code Odyssey.
                    </p>
                </div>

                {/* Character Card */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Avatar */}
                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl flex flex-col items-center">

                        <div className="h-36 w-36 rounded-full bg-linear-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-6xl border-4 border-cyan-400">

                            {profile.character.avatar ? (
                                <img
                                    src={profile.character.avatar}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                "🧙"
                            )}

                        </div>

                        <h2 className="mt-6 text-3xl font-black text-white">
                            {profile.character.nickname}
                        </h2>

                        <p className="mt-2 rounded-full bg-yellow-500/20 px-4 py-1 text-yellow-300">
                            {profile.character.title ?? "Novice Adventurer"}
                        </p>

                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-2 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

                        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
                            Character Statistics
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="rounded-xl bg-slate-800 p-5">
                                <p className="text-slate-400">⭐ Level</p>
                                <h3 className="mt-2 text-3xl font-black text-green-400">
                                    {profile.character.level}
                                </h3>
                            </div>

                            <div className="rounded-xl bg-slate-800 p-5">
                                <p className="text-slate-400">✨ XP</p>
                                <h3 className="mt-2 text-3xl font-black text-yellow-300">
                                    {profile.character.xp}
                                </h3>
                            </div>

                            <div className="rounded-xl bg-slate-800 p-5">
                                <p className="text-slate-400">🪙 Coin</p>
                                <h3 className="mt-2 text-3xl font-black text-orange-300">
                                    {profile.character.coin}
                                </h3>
                            </div>

                            <div className="rounded-xl bg-slate-800 p-5">
                                <p className="text-slate-400">🏆 Achievement</p>
                                <h3 className="mt-2 text-3xl font-black text-purple-300">
                                    {profile.achievementCount}
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Summary */}
                <div className="grid gap-8 lg:grid-cols-2">

                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

                        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
                            Adventure Summary
                        </h2>

                        <div className="space-y-5">

                            <div className="rounded-xl bg-slate-800 p-5 flex justify-between">
                                <span className="text-slate-300">
                                    Quest Completed
                                </span>

                                <span className="font-bold text-green-400">
                                    {profile.completedQuest}
                                </span>
                            </div>

                            <div className="rounded-xl bg-slate-800 p-5 flex justify-between">
                                <span className="text-slate-300">
                                    Achievement Earned
                                </span>

                                <span className="font-bold text-yellow-300">
                                    {profile.achievementCount}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Current Quest */}
                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

                        <h2 className="mb-6 text-2xl font-bold text-cyan-300">
                            📜 Current Quest
                        </h2>

                        {profile.currentQuest.length === 0 ? (

                            <div className="rounded-xl bg-slate-800 p-5 text-slate-400">
                                Tidak ada quest yang sedang dikerjakan.
                            </div>

                        ) : (

                            <div className="space-y-4">

                                {profile.currentQuest.map((item) => (

                                    <div
                                        key={item.id}
                                        className="rounded-xl bg-slate-800 p-5 hover:bg-slate-700 transition"
                                    >
                                        <div className="font-bold text-white">
                                            {item.quest.title}
                                        </div>

                                        <div className="text-sm text-cyan-300 mt-2">
                                            Status : In Progress
                                        </div>
                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </MainLayout>
    );
};

export default ProfilePage;