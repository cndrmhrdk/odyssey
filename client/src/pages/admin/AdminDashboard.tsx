import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboard.service";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import toast from "react-hot-toast";

interface DashboardData {
    totalPlayer: number;
    totalRegion: number;
    totalQuest: number;
    totalAchievement: number;
}

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const result = await getAdminDashboard();
                setData(result.data);
            } catch (error) {
                console.error(error);
                toast.error("Gagal mengambil dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-xl text-white">
                    Loading Dashboard...
                </div>
            </AdminLayout>
        );
    }

    if (!data) {
        return (
            <AdminLayout>
                <div className="text-red-400">
                    Data dashboard tidak ditemukan.
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            {/* HEADER */}

            <div className="mb-8 rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-xl">

                <h1 className="text-4xl font-black text-cyan-300">
                    ⚙ Guild Master Dashboard
                </h1>

                <p className="mt-3 text-slate-300">
                    Kelola seluruh dunia Code Odyssey dari satu tempat.
                </p>

            </div>

            {/* STATISTIC */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl bg-linear-to-br from-cyan-500 to-cyan-700 p-6 shadow-lg">

                    <p className="text-cyan-100">
                        👤 Total Player
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-white">
                        {data.totalPlayer}
                    </h2>

                </div>

                <div className="rounded-2xl bg-linear-to-br from-green-500 to-emerald-700 p-6 shadow-lg">

                    <p className="text-green-100">
                        🌍 Total Region
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-white">
                        {data.totalRegion}
                    </h2>

                </div>

                <div className="rounded-2xl bg-linear-to-br from-orange-500 to-yellow-600 p-6 shadow-lg">

                    <p className="text-yellow-100">
                        📜 Total Quest
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-white">
                        {data.totalQuest}
                    </h2>

                </div>

                <div className="rounded-2xl bg-linear-to-br from-purple-500 to-fuchsia-700 p-6 shadow-lg">

                    <p className="text-purple-100">
                        🏆 Achievement
                    </p>

                    <h2 className="mt-4 text-5xl font-black text-white">
                        {data.totalAchievement}
                    </h2>

                </div>

            </div>

            {/* QUICK ACTION */}

            <div className="mt-10 rounded-3xl bg-slate-900 p-8 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold text-cyan-300">
                    Quick Actions
                </h2>

                <div className="grid gap-5 md:grid-cols-3">

                    <button
                        onClick={() => navigate("/admin/regions")}
                        className="rounded-2xl border border-green-400/40 bg-green-500/10 p-6 text-left transition hover:scale-[1.02] hover:bg-green-500/20"
                    >
                        <div className="text-5xl">
                            🌍
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            Manage Region
                        </h3>

                        <p className="mt-2 text-slate-400">
                            Tambah, edit, atau hapus region.
                        </p>

                    </button>

                    <button
                        onClick={() => navigate("/admin/quests")}
                        className="rounded-2xl border border-cyan-400/40 bg-cyan-500/10 p-6 text-left transition hover:scale-[1.02] hover:bg-cyan-500/20"
                    >
                        <div className="text-5xl">
                            📜
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            Manage Quest
                        </h3>

                        <p className="mt-2 text-slate-400">
                            Kelola seluruh quest pemain.
                        </p>

                    </button>

                    <button
                        onClick={() => navigate("/admin/achievements")}
                        className="rounded-2xl border border-purple-400/40 bg-purple-500/10 p-6 text-left transition hover:scale-[1.02] hover:bg-purple-500/20"
                    >
                        <div className="text-5xl">
                            🏆
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-white">
                            Manage Achievement
                        </h3>

                        <p className="mt-2 text-slate-400">
                            Atur achievement dan reward pemain.
                        </p>

                    </button>

                </div>

            </div>

            {/* STATUS */}

            <div className="mt-8 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6">

                <h3 className="text-xl font-bold text-emerald-300">
                    Server Status
                </h3>

                <p className="mt-3 text-slate-300">
                    🟢 Semua sistem berjalan normal.
                </p>

            </div>

        </AdminLayout>
    );
};

export default AdminDashboardPage;