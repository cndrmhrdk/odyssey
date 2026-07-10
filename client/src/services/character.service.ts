import api from "./api";

interface CreateCharacterData {
    nickname: string;
    avatar?: string;
}

export const getMyCharacter = async () => {
    const response = await api.get("/characters/me");
    return response.data;
};

export const createCharacter = async (
    data: CreateCharacterData
) => {
    const response = await api.post("/characters", data);

    return response.data;
};