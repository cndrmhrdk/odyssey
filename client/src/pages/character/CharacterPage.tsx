import { useEffect, useState } from "react";
import { getMyCharacter, createCharacter, updateCharacter } from "../../services/character.service";
import MainLayout from "../../components/layout/MainLayout";
import logo from "../../assets/code_odyssey_logo.png";
import toast from "react-hot-toast";

interface Character {
    id: string;
    nickname: string;
    avatar?: string;
    level: number;
    xp: number;
    coin: number;
    title?: string;
}

const CharacterPage = () => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("");

    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const fetchCharacter = async () => {
        try {
            const result = await getMyCharacter();
            setCharacter(result.data);
            setNickname(result.data.nickname);
            setAvatar(result.data.avatar || "");
            setTitle(result.data.title || "");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacter();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createCharacter({
                nickname,
                avatar,
            });

            toast.success("Character berhasil dibuat");

            fetchCharacter();
        } catch (error) {
            console.error(error);
            toast.error("Gagal membuat character");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateCharacter({ nickname, avatar, title, });

            toast.success("Character berhasil diupdate");

            setIsEditing(false);

            fetchCharacter();
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengupdate character");
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <p className="text-white">Loading...</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>

            {character ? (

                <div className="space-y-8">

                    {/* HERO */}

                    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-10 shadow-2xl">

                        <div className="flex flex-col lg:flex-row items-center gap-10">

                            <img
                                src={character.avatar || logo}
                                alt="Avatar"
                                className="w-48 h-48 rounded-full border-4 border-yellow-400 object-cover shadow-2xl"
                            />

                            <div className="flex-1">

                                <p className="uppercase tracking-[6px] text-yellow-400">
                                    Character Profile
                                </p>

                                <h1 className="text-5xl font-black mt-2">
                                    {character.nickname}
                                </h1>

                                <p className="mt-3 text-slate-400 text-lg">
                                    {character.title || "Beginner Adventurer"}
                                </p>

                                <div className="mt-8">

                                    <div className="flex justify-between text-sm mb-2">

                                        <span>LEVEL {character.level}</span>

                                        <span>{character.xp} XP</span>

                                    </div>

                                    <div className="w-full h-5 rounded-full bg-slate-700 overflow-hidden">

                                        <div
                                            className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-600"
                                            style={{
                                                width: `${Math.min(
                                                    (character.xp % 100),
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STAT */}

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">

                            <p className="text-slate-400">
                                Level
                            </p>

                            <h2 className="text-5xl font-black mt-2 text-yellow-400">
                                {character.level}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">

                            <p className="text-slate-400">
                                XP
                            </p>

                            <h2 className="text-5xl font-black mt-2 text-cyan-400">
                                {character.xp}
                            </h2>
                        </div>
                        <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
                            <p className="text-slate-400">
                                Coin
                            </p>
                            <h2 className="text-5xl font-black mt-2 text-yellow-300">
                                {character.coin}
                            </h2>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button onClick={() => setIsEditing(true)} className="rounded-xl bg-yellow-400 text-slate-900 px-6 py-3 font-bold hover:scale-105 transition" >
                            ✏ Edit Character
                        </button>
                    </div>
                    {isEditing && (
                        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

                            <h2 className="text-2xl font-bold mb-6">
                                Edit Character
                            </h2>

                            <form
                                onSubmit={handleUpdate}
                                className="space-y-5"
                            >

                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3"
                                    placeholder="Nickname"
                                />

                                <input
                                    type="text"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3"
                                    placeholder="Avatar URL"
                                />

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3"
                                    placeholder="Title"
                                />

                                <div className="flex gap-4">

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-cyan-500 px-6 py-3 font-bold"
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="rounded-xl bg-slate-700 px-6 py-3 font-bold"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}
                    {/* DETAIL */}
                    <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Character Information
                        </h2>
                        <div className="space-y-5">
                            <div className="flex justify-between border-b border-slate-800 pb-3">
                                <span className="text-slate-400">
                                    Nickname
                                </span>
                                <span>{character.nickname}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-3">
                                <span className="text-slate-400">
                                    Title
                                </span>
                                <span>
                                    {character.title || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-3">
                                <span className="text-slate-400">
                                    Level
                                </span>
                                <span>{character.level}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-3">
                                <span className="text-slate-400">
                                    XP
                                </span>
                                <span>{character.xp}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">
                                    Coin
                                </span>
                                <span>{character.coin}</span>
                            </div>
                        </div>
                    </div>
                </div>
                

            ) : (

                <div className="max-w-xl mx-auto rounded-3xl bg-slate-900 border border-slate-700 p-10">

                    <h1 className="text-4xl font-black text-center mb-2">
                        Create Character
                    </h1>

                    <p className="text-center text-slate-400 mb-8">
                        Begin your adventure in Code Odyssey
                    </p>

                    <form
                        onSubmit={handleCreate}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            placeholder="Nickname"
                            value={nickname}
                            onChange={(e) =>
                                setNickname(e.target.value)
                            }
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 outline-none focus:border-yellow-400"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Avatar URL (Optional)"
                            value={avatar}
                            onChange={(e) =>
                                setAvatar(e.target.value)
                            }
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 outline-none focus:border-yellow-400"
                        />

                        <button
                            className="w-full rounded-xl bg-linear-to-r from-yellow-400 to-amber-500 py-3 font-bold text-slate-900 hover:scale-105 transition"
                        >
                            Create Character
                        </button>

                    </form>

                </div>

            )}

        </MainLayout>
    );
};

export default CharacterPage;