import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { createAchievement } from "../../services/achievement.service";
import toast from "react-hot-toast";

const AdminCreateAchievementPage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [requirement, setRequirement] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createAchievement({
                title,
                description,
                type,
                requirement,
            });

            toast.success("Achievement berhasil dibuat");

            navigate("/admin/achievements");
        } catch (error) {
            console.error(error);
            toast.error("Gagal membuat achievement");
        }
    };

    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-black text-white">
                        🏆 Create Achievement
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Tambahkan achievement baru yang dapat diperoleh player.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/admin/achievements")}
                    className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
                >
                    ← Kembali
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl p-8"
            >

                <div className="space-y-6">

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Achievement Title
                        </label>

                        <input
                            type="text"
                            placeholder="Contoh : First Adventure"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:border-cyan-400 outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Jelaskan syarat achievement..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white resize-none focus:border-cyan-400 outline-none"
                            required
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block text-cyan-300 mb-2">
                                Achievement Type
                            </label>

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                                required
                            >
                                <option value="">
                                    Pilih Type
                                </option>

                                <option value="QUEST">
                                    🗺️ QUEST
                                </option>

                                <option value="LEVEL">
                                    ⭐ LEVEL
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-cyan-300 mb-2">
                                Requirement
                            </label>

                            <input
                                type="number"
                                value={requirement}
                                onChange={(e) =>
                                    setRequirement(Number(e.target.value))
                                }
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:border-cyan-400 outline-none"
                                placeholder="Contoh : 10"
                                required
                            />

                        </div>

                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-10">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/achievements")}
                        className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold transition"
                    >
                        ➕ Create Achievement
                    </button>

                </div>

            </form>

        </AdminLayout>
    );
};

export default AdminCreateAchievementPage;