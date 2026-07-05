const prisma = require("../config/prisma");

const getProfile = async (userId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if(!character) {
        throw new Error("Character belum dibuat");
    }

    const completedQuest = await prisma.questProgress.count({
        where: {
            characterId: character.id,
            status: "COMPLETED",
        },
    });

    const achievementCount = await prisma.characterAchievement.count({
        where: {
            characterId: character.id,
        },
    });

    const currentQuest = await prisma.questProgress.findMany({
        where: {
            characterId: character.id,
            status: "IN_PROGRESS",
        },
        include: {
            quest: true,
        },
    });

    return {
        character,
        completedQuest,
        achievementCount,
        currentQuest,
    }
};

module.exports = {
    getProfile,
};