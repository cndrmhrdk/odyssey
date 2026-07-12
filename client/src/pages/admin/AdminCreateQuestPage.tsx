import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { createQuest } from "../../services/quest.service";
import { getRegions } from "../../services/region.service";
import toast from "react-hot-toast";

interface Region {
    id: string;
    name: string;
}

const AdminCreateQuestPage = () => {
    const navigate = useNavigate();

    const [regions, setRegions] = useState<Region[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [regionId, setRegionId] = useState("");

    const [xpReward, setXpReward] = useState(0);
    const [coinReward, setCoinReward] = useState(0);

    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const result = await getRegions();

                setRegions(result.data);

                if (result.data.length > 0) {
                    setRegionId(result.data[0].id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRegion();
    }, []);

    const handleSubmit = async () => {
        try {
            await createQuest({
                title,
                description,
                difficulty,
                regionId,
                xpReward: Number(xpReward),
                coinReward: Number(coinReward),
            });

            toast.success("Quest berhasil dibuat");

            navigate("/admin/quests");
        } catch (error) {
            console.error(error);

            toast.error("Gagal membuat quest");
        }
    };

    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-black text-white">
                        ⚔️ Create New Quest
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Tambahkan quest baru ke dunia Code Odyssey.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/admin/quests")}
                    className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
                >
                    ← Kembali
                </button>

            </div>

            <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl p-8">

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Quest Title
                        </label>

                        <input
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:border-cyan-400 outline-none"
                            placeholder="Misal : Defeat Goblin King"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Difficulty
                        </label>

                        <select
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="EASY">🟢 Easy</option>
                            <option value="MEDIUM">🟡 Medium</option>
                            <option value="HARD">🔴 Hard</option>
                        </select>

                    </div>

                </div>

                <div className="mt-6">

                    <label className="block text-cyan-300 mb-2">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white resize-none"
                        placeholder="Masukkan deskripsi quest..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Region
                        </label>

                        <select
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                            value={regionId}
                            onChange={(e) => setRegionId(e.target.value)}
                        >
                            {regions.map((region) => (
                                <option
                                    key={region.id}
                                    value={region.id}
                                >
                                    {region.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            XP Reward
                        </label>

                        <input
                            type="number"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                            placeholder="500"
                            value={xpReward}
                            onChange={(e) =>
                                setXpReward(Number(e.target.value))
                            }
                        />

                    </div>

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Coin Reward
                        </label>

                        <input
                            type="number"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                            placeholder="200"
                            value={coinReward}
                            onChange={(e) =>
                                setCoinReward(Number(e.target.value))
                            }
                        />

                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-10">

                    <button
                        onClick={() => navigate("/admin/quests")}
                        className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold transition"
                    >
                        ➕ Create Quest
                    </button>

                </div>

            </div>

        </AdminLayout>
    );
};

export default AdminCreateQuestPage;