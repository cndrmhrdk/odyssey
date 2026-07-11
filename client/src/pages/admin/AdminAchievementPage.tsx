import { useEffect, useState } from "react";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement, } from "../../services/adminAchievement.service";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

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

    const [editingId, setEditingId] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("QUEST");
    const [requirement, setRequirement] = useState(1);

    const fetchAchievements = async () => {
        try {
            const result = await getAchievements();
            setAchievements(result.data);
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil achievement");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setType("QUEST");
        setRequirement(1);
    };

    const handleSubmit = async () => {
        try {
            let result;

            if (editingId) {
                result = await updateAchievement(editingId, {
                    title,
                    description,
                    type,
                    requirement,
                });
            } else {
                result = await createAchievement({
                    title,
                    description,
                    type,
                    requirement,
                });
            }

            alert(result.message);

            resetForm();
            fetchAchievements();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    const handleEdit = (achievement: Achievement) => {
        setEditingId(achievement.id);
        setTitle(achievement.title);
        setDescription(achievement.description);
        setType(achievement.type);
        setRequirement(achievement.requirement);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus achievement?")) {
            return;
        }

        try {
            const result = await deleteAchievement(id);

            alert(result.message);

            fetchAchievements();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal menghapus");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Manage Achievement</h1>

            <hr />

            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <br /><br />

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <br /><br />

            <select value={type} onChange={(e) => setType(e.target.value)} >
                <option value="QUEST">QUEST</option>
                <option value="LEVEL">LEVEL</option>
            </select>

            <br /><br />

            <input
                type="number"
                value={requirement}
                onChange={(e) => setRequirement(Number(e.target.value))}
            />

            <br /><br />

            <button onClick={handleSubmit}>
                {editingId ? "Update Achievement" : "Tambah Achievement"}
            </button>

            {editingId && (
                <>
                    {" "}
                    <button onClick={resetForm}> Batal </button>
                </>
            )}

            <hr />

            {achievements.map((achievement) => (
                <div key={achievement.id} style={{ border: "1px solid gray", padding: "16px", marginBottom: "16px", }} >
                    <h3>{achievement.title}</h3>

                    <p>{achievement.description}</p>

                    <p>Type : {achievement.type}</p>

                    <p>Requirement : {achievement.requirement}</p>

                    <button onClick={() => handleEdit(achievement)}>
                        Edit
                    </button>

                    {" "}

                    <button onClick={() => handleDelete(achievement.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </MainLayout>
    );
};

export default AdminAchievementPage;