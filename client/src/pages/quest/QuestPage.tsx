import { useEffect, useState } from "react";
import { getMyQuest, startQuest, completeQuest, } from "../../services/quest.service";
import MainLayout from "../../components/layout/MainLayout";
import toast from "react-hot-toast";

interface Quest {
    id: string;
    title: string;
    description: string;
    difficulty: string;

    region: {
        id: string;
        name: string;
    };

    reward: {
        xpReward: number;
        coinReward: number;
    } | null;

    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

const QuestPage = () => {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuest = async () => {
        try {
            const result = await getMyQuest();
            setQuests(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengambil quest");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuest();
    }, []);

    const handleStartQuest = async (questId: string) => {
        try {
            const result = await startQuest(questId);

            toast.success(result.message);

            fetchQuest();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Gagal memulai quest");
        }
    };

    const handleCompleteQuest = async (questId: string) => {
        try {
            const result = await completeQuest(questId);

            toast.success(result.message);

            fetchQuest();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Gagal menyelesaikan quest");
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="text-center text-white py-20">
                    Loading Quest...
                </div>
            </MainLayout>
        );
    }

    const difficultyColor = (difficulty: string) => {
        switch (difficulty.toUpperCase()) {
            case "EASY":
                return "bg-green-500";
            case "MEDIUM":
                return "bg-yellow-500";
            case "HARD":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case "NOT_STARTED":
                return "bg-gray-600";
            case "IN_PROGRESS":
                return "bg-blue-600";
            case "COMPLETED":
                return "bg-green-600";
            default:
                return "bg-gray-600";
        }
    };

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="rounded-3xl border border-slate-700 bg-linear-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">

                    <h1 className="text-4xl font-black text-yellow-400">
                        📜 QUEST BOARD
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Complete quests, earn XP, coins, and become the strongest adventurer.
                    </p>

                </div>

                {/* Quest List */}
                <div className="grid gap-6">

                    {quests.length === 0 ? (
                        <div className="rounded-2xl bg-slate-800 border border-slate-700 p-10 text-center text-slate-300">
                            Belum ada quest tersedia.
                        </div>
                    ) : (
                        quests.map((quest) => (
                            <div
                                key={quest.id}
                                className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg hover:border-yellow-500 transition"
                            >

                                {/* Judul */}
                                <div className="flex justify-between items-center">

                                    <div>
                                        <h2 className="text-2xl font-bold text-yellow-400">
                                            📜 {quest.title}
                                        </h2>

                                        <p className="text-slate-400 mt-1">
                                            📍 {quest.region.name}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-bold text-white ${difficultyColor(
                                            quest.difficulty
                                        )}`}
                                    >
                                        {quest.difficulty}
                                    </span>

                                </div>

                                {/* Deskripsi */}
                                <p className="mt-5 text-slate-300 leading-relaxed">
                                    {quest.description}
                                </p>

                                {/* Reward */}
                                <div className="flex gap-8 mt-6 text-lg">

                                    <div>
                                        🎖
                                        <span className="ml-2 font-semibold text-yellow-300">
                                            {quest.reward?.xpReward ?? 0} XP
                                        </span>
                                    </div>

                                    <div>
                                        🪙
                                        <span className="ml-2 font-semibold text-yellow-300">
                                            {quest.reward?.coinReward ?? 0} Coin
                                        </span>
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="mt-8 flex justify-between items-center">

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-bold text-white ${statusColor(
                                            quest.status
                                        )}`}
                                    >
                                        {quest.status.replace("_", " ")}
                                    </span>

                                    {quest.status === "NOT_STARTED" && (
                                        <button
                                            onClick={() =>
                                                handleStartQuest(quest.id)
                                            }
                                            className="rounded-xl bg-yellow-500 px-5 py-2 font-bold text-slate-900 hover:bg-yellow-400 transition"
                                        >
                                            ▶ Start Quest
                                        </button>
                                    )}

                                    {quest.status === "IN_PROGRESS" && (
                                        <button
                                            onClick={() =>
                                                handleCompleteQuest(quest.id)
                                            }
                                            className="rounded-xl bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-500 transition"
                                        >
                                            ✔ Complete Quest
                                        </button>
                                    )}

                                    {quest.status === "COMPLETED" && (
                                        <button
                                            disabled
                                            className="rounded-xl bg-slate-700 px-5 py-2 font-bold text-slate-300 cursor-not-allowed"
                                        >
                                            ✓ Completed
                                        </button>
                                    )}

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>
        </MainLayout>
    );
};

export default QuestPage;