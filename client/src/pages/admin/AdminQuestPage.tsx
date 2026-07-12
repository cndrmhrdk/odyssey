import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { getAllQuest, deleteQuest, } from "../../services/quest.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Quest {
    id: string;
    title: string;
    difficulty: string;

    region: {
        name: string;
    };

    reward: {
        xpReward: number;
        coinReward: number;
    } | null;
}

const AdminQuestPage = () => {
    const navigate = useNavigate();

    const [quests, setQuests] = useState<Quest[]>([]);

    const loadQuest = async () => {
        try {
            const result = await getAllQuest();
            setQuests(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengambil quest");
        }
    };

    useEffect(() => {
        loadQuest();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus quest ini?")) return;

        try {
            await deleteQuest(id);
            loadQuest();
        } catch (error) {
            toast.error("Gagal menghapus quest");
        }
    };

    const difficultyColor = (difficulty: string) => {
        switch (difficulty.toUpperCase()) {
            case "EASY":
                return "bg-green-500";
            case "MEDIUM":
                return "bg-yellow-500";
            case "HARD":
                return "bg-red-500";
            default:
                return "bg-slate-500";
        }
    };

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-black text-cyan-300">
                        📜 Mission Board
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage every quest inside Code Odyssey.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/admin/quests/new")}
                    className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-900 transition hover:bg-cyan-400"
                >
                    + Create Quest
                </button>

            </div>

            {/* TOTAL */}

            <div className="mb-6 inline-flex rounded-full bg-cyan-500 px-5 py-2 font-bold text-slate-900">
                Total Quest : {quests.length}
            </div>

            {/* QUEST LIST */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {quests.map((quest) => (

                    <div
                        key={quest.id}
                        className="rounded-3xl border border-slate-700 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-2xl"
                    >

                        {/* Title */}

                        <div className="flex items-start justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-cyan-300">
                                    {quest.title}
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    🌍 {quest.region.name}
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-bold text-white ${difficultyColor(
                                    quest.difficulty
                                )}`}
                            >
                                {quest.difficulty}
                            </span>

                        </div>

                        {/* Reward */}

                        <div className="mt-8 rounded-2xl bg-slate-800 p-4">

                            <p className="mb-3 text-sm text-slate-400">
                                Reward
                            </p>

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-xs text-slate-500">
                                        XP
                                    </p>

                                    <p className="text-xl font-bold text-cyan-300">
                                        {quest.reward?.xpReward ?? 0}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xs text-slate-500">
                                        Coin
                                    </p>

                                    <p className="text-xl font-bold text-yellow-400">
                                        {quest.reward?.coinReward ?? 0}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Action */}

                        <div className="mt-6 flex gap-3">

                            <button
                                onClick={() =>
                                    navigate(`/admin/quests/${quest.id}/edit`)
                                }
                                className="flex-1 rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400"
                            >
                                ✏ Edit
                            </button>

                            <button
                                onClick={() => handleDelete(quest.id)}
                                className="flex-1 rounded-xl bg-red-500 py-3 font-bold transition hover:bg-red-400"
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {quests.length === 0 && (
                <div className="mt-12 rounded-3xl border border-dashed border-slate-700 p-12 text-center">

                    <div className="text-6xl">
                        📜
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-white">
                        No Quest Available
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Create your first quest to start building your world.
                    </p>

                </div>
            )}

        </AdminLayout>
    );
};

export default AdminQuestPage;