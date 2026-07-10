import api from "./api";

// export const getAllQuest = async () => {
//     const response = await api.get("/quests");

//     return response.data;
// };

export const getMyQuest = async () => {
    const response = await api.get("/quests/my");

    return response.data;
};

export const startQuest = async (questId: string) => {
    const response = await api.post(`/quests/${questId}/start`);

    return response.data;
};

export const completeQuest = async (questId: string) => {
    const response = await api.patch(`/quests/${questId}/complete`);

    return response.data;
};