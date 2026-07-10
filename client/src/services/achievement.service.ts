import api from "./api";

export const getMyAchievements = async () => {
    const response = await api.get("/achievements/my");

    return response.data;
};