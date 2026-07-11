import api from "./api";

export const getAchievements = async () => {
    const response = await api.get("/achievements");
    return response.data;
};

export const createAchievement = async (data: {
    title: string;
    description: string;
    type: string;
    requirement: number;
}) => {
    const response = await api.post("/achievements", data);
    return response.data;
};

export const updateAchievement = async (
    id: string,
    data: {
        title: string;
        description: string;
        type: string;
        requirement: number;
    }
) => {
    const response = await api.put(`/achievements/${id}`, data);
    return response.data;
};

export const deleteAchievement = async (id: string) => {
    const response = await api.delete(`/achievements/${id}`);
    return response.data;
};