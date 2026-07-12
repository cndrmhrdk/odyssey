import api from "./api";

interface CreateCharacterData {
    nickname: string;
    avatar?: string;
}

interface UpdateCharacterData {
    nickname: string;
    avatar?: string;
    title?: string;
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

export const updateCharacter = async (
    data: UpdateCharacterData
) => {
    const response = await api.put("/characters/me", data);
    return response.data;
};