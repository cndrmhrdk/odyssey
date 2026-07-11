import { useEffect, useState } from "react";
import { getRegions, createRegion, updateRegion, deleteRegion, } from "../../services/adminRegion.service";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

interface Region {
    id: string;
    name: string;
    description: string;
}

const AdminRegionPage = () => {
    const navigate = useNavigate();

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
            alert("Gagal mengambil region");
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
            alert("Nama region wajib diisi");
            return;
        }

        try {
            if (editingId) {
                const result = await updateRegion(editingId, {
                    name,
                    description,
                });

                alert(result.message);
            } else {
                const result = await createRegion({
                    name,
                    description,
                });

                alert(result.message);
            }

            resetForm();
            fetchRegions();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    const handleEdit = (region: Region) => {
        setEditingId(region.id);
        setName(region.name);
        setDescription(region.description);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus region ini?")) {
            return;
        }

        try {
            const result = await deleteRegion(id);

            alert(result.message);

            fetchRegions();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal menghapus");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Manage Region</h1>

            <div style={{ border: "1px solid gray", padding: "16px", marginBottom: "24px", borderRadius: "8px", }} >
                <h2> {editingId ? "Edit Region" : "Tambah Region"} </h2>

                <input type="text" placeholder="Nama Region" value={name} onChange={(e) => setName(e.target.value)} />

                <br />
                <br />

                <textarea placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value) } />

                <br />
                <br />

                <button onClick={handleSubmit}>
                    {editingId ? "Update Region" : "Tambah Region"}
                </button>

                {editingId && (
                    <>
                        {" "}
                        <button onClick={resetForm}> Batal </button>
                    </>
                )}
            </div>

            <h2>Daftar Region</h2>

            {regions.map((region) => (
                <div key={region.id} style={{ border: "1px solid gray", padding: "16px", marginBottom: "16px", borderRadius: "8px", }} >
                    <h3>{region.name}</h3>
                    <p>{region.description}</p>
                    <button onClick={() => handleEdit(region)} > Edit </button>
                    {" "}
                    <button onClick={() => handleDelete(region.id)} > Delete </button>
                </div>
            ))}
        </MainLayout>
    );
};

export default AdminRegionPage;