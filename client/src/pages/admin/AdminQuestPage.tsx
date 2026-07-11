import { useEffect, useState } from "react";
import { createQuest, getQuests, updateQuest, deleteQuest, } from "../../services/adminQuest.service";
import { getRegions } from "../../services/adminRegion.service";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

interface Region {
    id: string;
    name: string;
}

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
}

const AdminQuestPage = () => {
    const navigate = useNavigate();

    const [quests, setQuests] = useState<Quest[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);

    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [regionId, setRegionId] = useState("");
    const [xpReward, setXpReward] = useState(0);
    const [coinReward, setCoinReward] = useState(0);

    const fetchData = async () => {
        try {
            const questResult = await getQuests();
            const regionResult = await getRegions();

            setQuests(questResult.data);
            setRegions(regionResult.data);

            if (regionResult.data.length > 0) {
                setRegionId(regionResult.data[0].id);
            }
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            let result;

            if (editingId) {
                result = await updateQuest(editingId, {
                    title,
                    description,
                    difficulty,
                    regionId,
                    xpReward,
                    coinReward,
                });
            } else {
                result = await createQuest({
                    title,
                    description,
                    difficulty,
                    regionId,
                    xpReward,
                    coinReward,
                });
            }

            alert(result.message);

            setEditingId(null);
            setTitle("");
            setDescription("");
            setDifficulty("EASY");
            setXpReward(0);
            setCoinReward(0);

            fetchData();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Terjadi kesalahan");
        }
    };

    const handleEdit = (quest: Quest) => {
        setEditingId(quest.id);

        setTitle(quest.title);
        setDescription(quest.description);

        setDifficulty(quest.difficulty);

        setRegionId(quest.region.id);

        setXpReward(quest.reward?.xpReward ?? 0);
        setCoinReward(quest.reward?.coinReward ?? 0);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus quest?")) {
            return;
        }

        try {
            const result = await deleteQuest(id);

            alert(result.message);

            fetchData();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal menghapus");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Manage Quest</h1>

            <hr />

            <h2>Tambah Quest</h2>

            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <br />
            <br />

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <br />
            <br />

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>

            <br />
            <br />

            <select value={regionId} onChange={(e) => setRegionId(e.target.value)} >
                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                        {region.name}
                    </option>
                ))}
            </select>

            <br />
            <br />

            <input type="number" placeholder="XP Reward" value={xpReward} onChange={(e) => setXpReward(Number(e.target.value))} />

            <br />
            <br />

            <input type="number" placeholder="Coin Reward" value={coinReward} onChange={(e) => setCoinReward(Number(e.target.value))} />

            <br />
            <br />

            <button onClick={handleSubmit}> {editingId ? "Update Quest" : "Tambah Quest"} </button>

            {editingId && (
                <>
                    {" "}
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setTitle("");
                            setDescription("");
                            setDifficulty("EASY");
                            setXpReward(0);
                            setCoinReward(0);
                        }}>
                        Batal
                    </button>
                </>
            )}

            <hr />

            <h2>Daftar Quest</h2>

            {quests.map((quest) => (
                <div key={quest.id} style={{ border: "1px solid gray", padding: "16px", marginBottom: "16px", }} >
                    <h3>{quest.title}</h3>

                    <p>{quest.description}</p>

                    <p>Region : {quest.region.name}</p>

                    <p>Difficulty : {quest.difficulty}</p>

                    <p>XP : {quest.reward?.xpReward}</p>

                    <p>Coin : {quest.reward?.coinReward}</p>

                    <button onClick={() => handleEdit(quest)}> Edit </button>

                    {" "}

                    <button onClick={() => handleDelete(quest.id)}> Delete </button>
                </div>
            ))}
        </MainLayout>
    );
};

export default AdminQuestPage;