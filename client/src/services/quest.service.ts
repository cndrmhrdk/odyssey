import api from "./api";

export const getMyQuest = async () => {
    const response = await api.get("/quests/my");
    return response.data;
};

export const startQuest = async (id: string) => {
    const response = await api.post(`/quests/${id}/start`);
    return response.data;
};

export const completeQuest = async (id: string) => {
    const response = await api.patch(`/quests/${id}/complete`);
    return response.data;
};

// ================= ADMIN =================

export const getAllQuest = async () => {
    const response = await api.get("/quests");
    return response.data;
};

export const getQuestById = async (id: string) => {
    const response = await api.get(`/quests/${id}`);
    return response.data;
};

export const createQuest = async (data: any) => {
    const response = await api.post("/quests", data);
    return response.data;
};

export const updateQuest = async (id: string, data: any) => {
    const response = await api.put(`/quests/${id}`, data);
    return response.data;
};

export const deleteQuest = async (id: string) => {
    const response = await api.delete(`/quests/${id}`);
    return response.data;
};