import api from "./api";

export const getQuests = async () => {
    const response = await api.get("/quests");
    return response.data;
};

export const createQuest = async (data: {
    title: string;
    description: string;
    difficulty: string;
    regionId: string;
    xpReward: number;
    coinReward: number;
}) => {
    const response = await api.post("/quests", data);
    return response.data;
};

export const updateQuest = async (
    id: string,
    data: {
        title: string;
        description: string;
        difficulty: string;
        regionId: string;
        xpReward: number;
        coinReward: number;
    }
) => {
    const response = await api.put(`/quests/${id}`, data);
    return response.data;
};

export const deleteQuest = async (id: string) => {
    const response = await api.delete(`/quests/${id}`);
    return response.data;
};