import { useEffect, useState } from "react";
import {
    getMyCharacter,
    createCharacter,
} from "../../services/character.service";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const fetchCharacter = async () => {
        try {
            const result = await getMyCharacter();

            setCharacter(result.data);
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

            alert("Character berhasil dibuat");

            await fetchCharacter();
        } catch (error) {
            console.error(error);
            alert("Gagal membuat character");
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }
    
    return (
        <div>
            <h1>Character</h1>

            {character ? (
                <div>
                    <h2>{character.nickname}</h2>
                    <p>Level : {character.level}</p>
                    <p>XP : {character.xp}</p>
                    <p>Coin : {character.coin}</p>
                    <p>Title : {character.title}</p>
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                </div>
            ) : (
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <br /><br />

                    <input type="text" placeholder="Avatar URL" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>

                    <br /><br />

                    <button type="submit">Create Character</button>

                    <br /><br />

                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                </form>
            )}
        </div>
    );
};

export default CharacterPage;