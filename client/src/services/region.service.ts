import api from "./api";

export const getRegions = async () => {
    const response = await api.get("/regions");
    return response.data;
};

export const createRegion = async (data: {
    name: string;
    description: string;
}) => {
    const response = await api.post("/regions", data);

    return response.data;
};

export const updateRegion = async (
    id: string,
    data: {
        name: string;
        description: string;
    }
) => {
    const response = await api.put(`/regions/${id}`, data);

    return response.data;
};

export const deleteRegion = async (id: string) => {
    const response = await api.delete(`/regions/${id}`);

    return response.data;
};