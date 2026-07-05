const prisma = require("../config/prisma");

const getAllRegions = async () => {
    return await prisma.region.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });
};

module.exports = {
    getAllRegions,
};