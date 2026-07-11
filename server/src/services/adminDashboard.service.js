const prisma = require("../config/prisma");

const getDashboard = async () => {
    const totalRegion = await prisma.region.count();

    const totalQuest = await prisma.quest.count();

    const totalAchievement = await prisma.achievement.count();

    const totalPlayer = await prisma.user.count({
        where: {
            role: {
                name: "PLAYER",
            },
        },
    });

    return {
        totalRegion,
        totalQuest,
        totalAchievement,
        totalPlayer,
    };
};

module.exports = {
    getDashboard,
};