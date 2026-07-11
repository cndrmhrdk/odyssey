import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../../services/leaderboard.service";
import MainLayout from "../../components/layout/MainLayout";

interface LeaderboardPlayer {
    id: string;
    nickname: string;
    level: number;
    xp: number;
    coin: number;
}

const LeaderboardPage = () => {
    const navigate = useNavigate();

    const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const result = await getLeaderboard();

                setPlayers(result.data);
            } catch (error) {
                console.error(error);
                alert("Gagal mengambil leaderboard");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <h1>Leaderboard</h1>

            <table
                border={1}
                cellPadding={10}
                style={{ borderCollapse: "collapse" }}
            >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Nickname</th>
                        <th>Level</th>
                        <th>XP</th>
                        <th>Coin</th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>{player.nickname}</td>
                            <td>{player.level}</td>
                            <td>{player.xp}</td>
                            <td>{player.coin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MainLayout>
    );
};

export default LeaderboardPage;