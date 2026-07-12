import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getLeaderboard } from "../../services/leaderboard.service";
import toast from "react-hot-toast";

interface LeaderboardPlayer {
    id: string;
    nickname: string;
    level: number;
    xp: number;
    coin: number;
}

const LeaderboardPage = () => {
    const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const result = await getLeaderboard();
                setPlayers(result.data);
            } catch (error) {
                console.error(error);
                toast.error("Gagal mengambil leaderboard");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="text-white text-xl">
                    Loading Leaderboard...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="rounded-3xl border border-cyan-500/30 bg-slate-900 p-8 shadow-xl">
                    <h1 className="text-4xl font-black text-cyan-300">
                        🏆 Leaderboard
                    </h1>

                    <p className="mt-2 text-slate-300">
                        Lihat siapa petualang terkuat di Code Odyssey.
                    </p>
                </div>

                {/* Top 3 */}
                {players.length >= 3 && (
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Rank 2 */}
                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
                            <div className="text-5xl">🥈</div>

                            <h2 className="mt-4 text-2xl font-bold text-white">
                                {players[1].nickname}
                            </h2>

                            <p className="mt-2 text-slate-300">
                                Level {players[1].level}
                            </p>

                            <p className="text-yellow-400">
                                {players[1].xp} XP
                            </p>
                        </div>

                        {/* Rank 1 */}
                        <div className="rounded-2xl border-2 border-yellow-400 bg-linear-to-b from-yellow-400/20 to-slate-900 p-8 text-center shadow-2xl scale-105">
                            <div className="text-6xl">👑</div>

                            <h2 className="mt-4 text-3xl font-black text-yellow-300">
                                {players[0].nickname}
                            </h2>

                            <p className="mt-2 text-white">
                                Level {players[0].level}
                            </p>

                            <p className="text-yellow-300 font-bold">
                                {players[0].xp} XP
                            </p>

                            <p className="text-orange-300">
                                🪙 {players[0].coin}
                            </p>
                        </div>

                        {/* Rank 3 */}
                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
                            <div className="text-5xl">🥉</div>

                            <h2 className="mt-4 text-2xl font-bold text-white">
                                {players[2].nickname}
                            </h2>

                            <p className="mt-2 text-slate-300">
                                Level {players[2].level}
                            </p>

                            <p className="text-yellow-400">
                                {players[2].xp} XP
                            </p>
                        </div>

                    </div>
                )}

                {/* Ranking Table */}
                <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

                    <div className="border-b border-slate-700 bg-slate-800 px-8 py-5">
                        <h2 className="text-2xl font-bold text-cyan-300">
                            Full Ranking
                        </h2>
                    </div>

                    <table className="w-full">

                        <thead className="bg-slate-800 text-slate-300">
                            <tr>
                                <th className="p-4 text-left">Rank</th>
                                <th className="p-4 text-left">Player</th>
                                <th className="p-4">Level</th>
                                <th className="p-4">XP</th>
                                <th className="p-4">Coin</th>
                            </tr>
                        </thead>

                        <tbody>

                            {players.map((player, index) => (
                                <tr
                                    key={player.id}
                                    className="border-t border-slate-800 hover:bg-slate-800 transition"
                                >
                                    <td className="p-4 font-bold text-cyan-300">
                                        #{index + 1}
                                    </td>

                                    <td className="p-4 text-white font-semibold">
                                        {player.nickname}
                                    </td>

                                    <td className="text-center text-green-400 font-bold">
                                        {player.level}
                                    </td>

                                    <td className="text-center text-yellow-300">
                                        {player.xp}
                                    </td>

                                    <td className="text-center text-orange-300">
                                        🪙 {player.coin}
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </MainLayout>
    );
};

export default LeaderboardPage;