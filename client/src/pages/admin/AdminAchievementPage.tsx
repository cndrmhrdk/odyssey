import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getAchievements, deleteAchievement, } from "../../services/achievement.service";
import toast from "react-hot-toast";

interface Achievement {
    id: string;
    title: string;
    description: string;
    type: string;
    requirement: number;
}

const AdminAchievementPage = () => {
    const navigate = useNavigate();

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAchievements = async () => {
        try {
            const result = await getAchievements();
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

    const handleDelete = async (id: string) => {
        if (!window.confirm("Hapus achievement ini?")) return;

        try {
            await deleteAchievement(id);
            fetchAchievements();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                    "Gagal menghapus achievement"
            );
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-white text-xl">
                    Loading...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-black text-white">
                        🏆 Achievement Management
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Kelola seluruh achievement yang dapat diperoleh player.
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/admin/achievements/create")
                    }
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
                >
                    ➕ Create Achievement
                </button>

            </div>

            {achievements.length === 0 ? (

                <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-12 text-center">

                    <h2 className="text-2xl text-white font-bold">
                        Belum ada Achievement
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Tambahkan achievement pertama untuk game-mu.
                    </p>

                </div>

            ) : (

                <div className="grid lg:grid-cols-2 gap-6">

                    {achievements.map((achievement) => (

                        <div
                            key={achievement.id}
                            className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 hover:border-cyan-400 transition"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <div className="text-5xl mb-4">
                                        🏆
                                    </div>

                                    <h2 className="text-2xl font-bold text-white">
                                        {achievement.title}
                                    </h2>

                                    <p className="text-gray-400 mt-2">
                                        {achievement.description}
                                    </p>

                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="bg-slate-800 rounded-xl p-4">

                                    <p className="text-gray-400 text-sm">
                                        TYPE
                                    </p>

                                    <p className="text-cyan-300 font-bold mt-1">
                                        {achievement.type}
                                    </p>

                                </div>

                                <div className="bg-slate-800 rounded-xl p-4">

                                    <p className="text-gray-400 text-sm">
                                        REQUIREMENT
                                    </p>

                                    <p className="text-yellow-400 font-bold mt-1">
                                        {achievement.requirement}
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/achievements/${achievement.id}/edit`
                                        )
                                    }
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(achievement.id)
                                    }
                                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition"
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </AdminLayout>
    );
};

export default AdminAchievementPage;