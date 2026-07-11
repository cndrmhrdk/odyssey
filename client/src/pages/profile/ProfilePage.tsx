import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profile.service";
import MainLayout from "../../components/layout/MainLayout";

interface QuestProgress {
    id: string;
    quest: {
        id: string;
        title: string;
    };
}

interface Character {
    id: string;
    nickname: string;
    level: number;
    xp: number;
    coin: number;
    avatar: string | null;
    title: string | null;
}

interface ProfileData {
    character: Character;
    completedQuest: number;
    achievementCount: number;
    currentQuest: QuestProgress[];
}

const ProfilePage = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();

                setProfile(result.data);
            } catch (error) {
                console.error(error);
                alert("Gagal mengambil profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!profile) {
        return <p>Profile tidak ditemukan.</p>;
    }

    return (
        <MainLayout>
            <h1>My Profile</h1>
            <p> <strong>Nickname :</strong> {profile.character.nickname} </p>
            <p> <strong>Level :</strong> {profile.character.level} </p>
            <p> <strong>XP :</strong> {profile.character.xp} </p>
            <p> <strong>Coin :</strong> {profile.character.coin} </p>
            <p> <strong>Title :</strong>{" "} {profile.character.title ?? "-"} </p>
            <p> <strong>Completed Quest :</strong>{" "} {profile.completedQuest} </p>
            <p> <strong>Achievement :</strong>{" "} {profile.achievementCount} </p>
            
            <h2>Current Quest</h2>

            {profile.currentQuest.length === 0 ? (
                <p>Tidak ada quest yang sedang dikerjakan.</p>
            ) : (
                <ul>
                    {profile.currentQuest.map((item) => (
                        <li key={item.id}>
                            {item.quest.title}
                        </li>
                    ))}
                </ul>
            )}
        </MainLayout>
    );
};

export default ProfilePage;