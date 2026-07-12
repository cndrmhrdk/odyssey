import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getAchievementById, updateAchievement, } from "../../services/achievement.service";
import toast from "react-hot-toast";

const AdminEditAchievementPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [requirement, setRequirement] = useState(0);

    useEffect(() => {
        const fetchAchievement = async () => {
            try {
                const result = await getAchievementById(id!);

                setTitle(result.data.title);
                setDescription(result.data.description);
                setType(result.data.type);
                setRequirement(result.data.requirement);
            } catch (error) {
                console.error(error);
                toast.error("Gagal mengambil data achievement");
            }
        };

        fetchAchievement();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateAchievement(id!, {
                title,
                description,
                type,
                requirement,
            });

            toast.success("Achievement berhasil diupdate");

            navigate("/admin/achievements");
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengupdate achievement");
        }
    };

    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-black text-white">
                        ✏️ Edit Achievement
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Perbarui informasi achievement yang tersedia di game.
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:border-cyan-400 outline-none"
                            placeholder="Masukkan judul achievement"
                            required
                        />

                    </div>

                    <div>

                        <label className="block text-cyan-300 mb-2">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white resize-none focus:border-cyan-400 outline-none"
                            placeholder="Masukkan deskripsi achievement"
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
                                <option value="">Pilih Type</option>

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
                        className="px-8 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold transition"
                    >
                        💾 Save Changes
                    </button>

                </div>

            </form>

        </AdminLayout>
    );
};

export default AdminEditAchievementPage;