import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyQuest, startQuest, completeQuest } from "../../services/quest.service";
import MainLayout from "../../components/layout/MainLayout";

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

    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

const QuestPage = () => {
    const navigate = useNavigate();

    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuest = async () => {
        try {
            const result = await getMyQuest();

            setQuests(result.data);
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil quest");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuest();
    }, []);

    const handleStartQuest = async (questId: string) => {
        try {
            const result = await startQuest(questId);

            alert(result.message);

            fetchQuest();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal memulai quest");
        }
    };

    const handleCompleteQuest = async (questId: string) => {
        try {
            const result = await completeQuest(questId);

            alert(result.message);

            fetchQuest();
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal menyelesaikan quest");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Quest</h1>

            {quests.map((quest) => (
                <div key={quest.id} style={{border: "1px solid gray", borderRadius: "8px", padding: "16px", marginBottom: "16px",}}>
                    <h2>{quest.title}</h2>
                    <p>{quest.description}</p>
                    <p>Region : {quest.region.name}</p>
                    <p>Difficulty : {quest.difficulty}</p>
                    <p>XP Reward : {quest.reward?.xpReward}</p>
                    <p>Coin Reward : {quest.reward?.coinReward}</p>
                    <p>Status : {quest.status}</p>
                    {quest.status === "NOT_STARTED" && (
                        <button onClick={() => handleStartQuest(quest.id)}>Start Quest</button>
                    )}

                    {quest.status === "IN_PROGRESS" && (
                        <button onClick={() => handleCompleteQuest(quest.id)}>Complete Quest</button>
                    )}

                    {quest.status === "COMPLETED" && (
                        <button disabled>Completed</button>
                    )}
                </div>
            ))}
        </MainLayout>
    );
};

export default QuestPage;