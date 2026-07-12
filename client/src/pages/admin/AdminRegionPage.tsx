import { useEffect, useState } from "react";
import { getRegions, createRegion, updateRegion, deleteRegion, } from "../../services/region.service";
import AdminLayout from "../../components/layout/AdminLayout";
import toast from "react-hot-toast";

interface Region {
    id: string;
    name: string;
    description: string;
}

const AdminRegionPage = () => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const fetchRegions = async () => {
        try {
            const result = await getRegions();
            setRegions(result.data);
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengambil region");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setDescription("");
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Nama region wajib diisi");
            return;
        }

        try {
            if (editingId) {
                const result = await updateRegion(editingId, {
                    name,
                    description,
                });

                toast.success(result.message);
            } else {
                const result = await createRegion({
                    name,
                    description,
                });

                toast.success(result.message);
            }

            resetForm();
            fetchRegions();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    const handleEdit = (region: Region) => {
        setEditingId(region.id);
        setName(region.name);
        setDescription(region.description);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus region ini?")) return;

        try {
            const result = await deleteRegion(id);

            toast.success(result.message);

            fetchRegions();
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Gagal menghapus");
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <p className="text-white">Loading...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="mb-8">

                <h1 className="text-4xl font-black text-cyan-300">
                    🌍 World Management
                </h1>

                <p className="mt-2 text-slate-400">
                    Manage every region inside Code Odyssey.
                </p>

            </div>

            <div className="grid gap-8 xl:grid-cols-3">

                {/* FORM */}

                <div className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-cyan-500/20">

                    <h2 className="mb-6 text-2xl font-bold text-white">

                        {editingId
                            ? "✏ Edit Region"
                            : "➕ Create Region"}

                    </h2>

                    <div className="space-y-5">

                        <div>

                            <label className="mb-2 block text-sm text-slate-300">
                                Region Name
                            </label>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Forest of Dawn"
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-400"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm text-slate-300">
                                Description
                            </label>

                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Write region description..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-400"
                            />

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-900 transition hover:bg-cyan-400"
                        >
                            {editingId
                                ? "Update Region"
                                : "Create Region"}
                        </button>

                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="w-full rounded-xl border border-slate-600 py-3 text-white hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </div>

                {/* LIST */}

                <div className="xl:col-span-2">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-white">
                            Existing Regions
                        </h2>

                        <div className="rounded-full bg-cyan-500 px-4 py-2 font-bold text-slate-900">
                            {regions.length} Regions
                        </div>

                    </div>

                    <div className="space-y-5">

                        {regions.map((region) => (

                            <div
                                key={region.id}
                                className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-cyan-400"
                            >

                                <div className="flex items-start justify-between">

                                    <div>

                                        <h3 className="text-2xl font-bold text-cyan-300">
                                            🌍 {region.name}
                                        </h3>

                                        <p className="mt-3 text-slate-400">
                                            {region.description}
                                        </p>

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() =>
                                                handleEdit(region)
                                            }
                                            className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(region.id)
                                            }
                                            className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:bg-red-400"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default AdminRegionPage;