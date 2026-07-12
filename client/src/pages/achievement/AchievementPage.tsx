import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getMyAchievements } from "../../services/achievement.service";
import toast from "react-hot-toast";

interface Achievement {
    id: string;
    unlockedAt: string;

    achievement: {
        id: string;
        title: string;
        description: string;
        type: string;
        requirement: number;
    };
}

const AchievementPage = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAchievements = async () => {
        try {
            const result = await getMyAchievements();
            setAchievements(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengambil achievement");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="text-white text-xl">
                    Loading Achievement...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="rounded-3xl bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 p-8 shadow-xl">
                    <h1 className="text-4xl font-extrabold text-white">
                        🏆 Achievement Hall
                    </h1>

                    <p className="mt-2 text-yellow-100">
                        Semua pencapaian yang telah berhasil kamu buka.
                    </p>
                </div>

                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="rounded-2xl bg-slate-800 p-6 border border-yellow-500">
                        <p className="text-gray-400 text-sm">
                            Achievement Unlocked
                        </p>

                        <h2 className="text-4xl font-bold text-yellow-400 mt-2">
                            {achievements.length}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-800 p-6 border border-purple-500">
                        <p className="text-gray-400 text-sm">
                            Completion
                        </p>

                        <h2 className="text-4xl font-bold text-purple-400 mt-2">
                            Explorer
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-800 p-6 border border-cyan-500">
                        <p className="text-gray-400 text-sm">
                            Latest Unlock
                        </p>

                        <h2 className="text-lg font-bold text-cyan-300 mt-2">
                            {achievements.length > 0
                                ? new Date(
                                    achievements[0].unlockedAt
                                ).toLocaleDateString()
                                : "-"}
                        </h2>
                    </div>

                </div>

                {/* List Achievement */}

                {achievements.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 border border-slate-700 p-12 text-center">

                        <div className="text-6xl mb-4">
                            🔒
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            Belum Ada Achievement
                        </h2>

                        <p className="text-gray-400 mt-2">
                            Selesaikan quest dan naikkan level untuk membuka achievement.
                        </p>

                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">

                        {achievements.map((item) => (

                            <div
                                key={item.id}
                                className="rounded-2xl border border-yellow-500 bg-slate-800 p-6 shadow-lg hover:scale-[1.02] transition"
                            >

                                <div className="flex items-center justify-between">

                                    <h2 className="text-2xl font-bold text-yellow-300">
                                        🏅 {item.achievement.title}
                                    </h2>

                                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                                        UNLOCKED
                                    </span>

                                </div>

                                <p className="mt-4 text-gray-300">
                                    {item.achievement.description}
                                </p>

                                <div className="mt-6 grid grid-cols-2 gap-4">

                                    <div className="rounded-xl bg-slate-700 p-3">
                                        <p className="text-xs text-gray-400">
                                            TYPE
                                        </p>

                                        <p className="font-semibold text-white">
                                            {item.achievement.type}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-700 p-3">
                                        <p className="text-xs text-gray-400">
                                            REQUIREMENT
                                        </p>

                                        <p className="font-semibold text-white">
                                            {item.achievement.requirement}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-6 border-t border-slate-700 pt-4">

                                    <p className="text-sm text-green-400">
                                        ✅ Unlocked at
                                    </p>

                                    <p className="text-white">
                                        {new Date(item.unlockedAt).toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </MainLayout>
    );
};

export default AchievementPage;