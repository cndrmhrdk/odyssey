import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAchievements } from "../../services/achievement.service";

interface Achievement {
    id: string;
    unlockedAt: string;

    achievement: {
        id: string;
        title: string;
        description: string;
        type: string;
        requirement: number;
    };
}

const AchievementPage = () => {
    const navigate = useNavigate();

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAchievements = async () => {
        try {
            const result = await getMyAchievements();
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>My Achievements</h1>

            {achievements.length === 0 ? (
                <p>Belum ada achievement.</p>
            ) : (
                achievements.map((item) => (
                    <div key={item.id} style={{border: "1px solid gray", borderRadius: "8px", padding: "16px", marginBottom: "16px",}}>
                        <h2>{item.achievement.title}</h2>
                        <p>{item.achievement.description}</p>
                        <p>Type : {item.achievement.type}</p>
                        <p>Requirement : {item.achievement.requirement}</p>
                        <p>Unlocked :{" "} {new Date(item.unlockedAt).toLocaleString()}</p>
                    </div>
                ))
            )}

            <button onClick={() => navigate("/dashboard")}>
                Kembali ke Dashboard
            </button>
        </div>
    );
};

export default AchievementPage;