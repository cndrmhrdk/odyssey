const prisma = require("../config/prisma");

const getAllRegions = async () => {
    return await prisma.region.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });
};

const createRegion = async ({name, description}) => {
    const existingRegion = await prisma.region.findUnique({
        where: {
            name,
        },
    });

    if(existingRegion) {
        throw new Error("Region sudah ada");
    }

    const region = await prisma.region.create({
        data: {
            name,
            description,
        },
    });

    return region;
};

const updateRegion = async (id, { name, description }) => {
    const region = await prisma.region.findUnique({
        where: {
            id,
        },
    });

    if(!region) {
        throw new Error("Region tidak ada");
    }

    if(name && name !== region.name) {
        const existingRegion = await prisma.region.findUnique({
            where: {
                name,
            },
        });
        
        if(existingRegion) {
            throw new Error("Nama region sudah digunakan");
        }
    }

    const updatedRegion = await prisma.region.update({
        where: {
            id,
        },
        data: {
            name,
            description,
        },
    });

    return updatedRegion;
};

const deleteRegion = async (id) => {
    const region = await prisma.region.findUnique({
        where: {
            id,
        },
    });

    if(!region) {
        throw new Error("Region tidak ada");
    }

    const totalQuest = await prisma.quest.count({
        where: {
            regionId: id,
        },
    });

    if(totalQuest > 0) {
        throw new Error("Region tidak dapat dihapus karena masih memiliki quest");
    }

    await prisma.region.delete({
        where: {
            id,
        },
    });

    return;
};

module.exports = {
    getAllRegions,
    createRegion,
    updateRegion,
    deleteRegion,
};