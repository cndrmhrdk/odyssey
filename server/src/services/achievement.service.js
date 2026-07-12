const prisma = require("../config/prisma");
// const { get } = require("../routes");

const checkQuestAchievement = async (characterId) => {
    console.log("===== CHECK ACHIEVEMENT =====");

    const completedQuest = await prisma.questProgress.count({
        where: {
            characterId,
            status: "COMPLETED",
        },
    });

    console.log("Completed Quest:", completedQuest);

    const achievements = await prisma.achievement.findMany({
        where: {
            type: "QUEST",
            requirement: {
                lte: completedQuest,
            },
        },
    });

    console.log("Achievement ditemukan:", achievements.length);

    for (const achievement of achievements) {
        console.log("Checking:", achievement.title);

        const existingAchievement =
            await prisma.characterAchievement.findUnique({
                where: {
                    characterId_achievementId: {
                        characterId,
                        achievementId: achievement.id,
                    },
                },
            });

        console.log("Existing:", existingAchievement);

        if (existingAchievement) continue;

        console.log("INSERT:", achievement.title);

        await prisma.characterAchievement.create({
            data: {
                characterId,
                achievementId: achievement.id,
            },
        });

        console.log("BERHASIL INSERT");
    }
};

const getMyAchievements = async (userId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if(!character) {
        throw new Error("Character belum dibuat");
    }

    const achievements = await prisma.characterAchievement.findMany({
        where: {
            characterId: character.id,
        },
        include: {
            achievement: true,
        },
        orderBy: {
            unlockedAt: "asc",
        },
    });


    return achievements;    
};

const getAllAchievements = async () => {
    return await prisma.achievement.findMany({
        orderBy: {
            requirement: "asc",
        },
    });
};

const getAchievementById = async (id) => {
    const achievement = await prisma.achievement.findUnique({
        where: {
            id,
        },
    });

    if (!achievement) {
        throw new Error("Achievement tidak ditemukan");
    }

    return achievement;
};

const createAchievement = async ({title, description, type, requirement,}) => {
    const existingAchievement = await prisma.achievement.findFirst({
        where: {
            title,
        },
    });

    if(existingAchievement) {
        throw new Error("Achievement sudah ada");
    }

    const achievement = await prisma.achievement.create({
        data: {
            title,
            description,
            type,
            requirement,
        },
    });

    return achievement;
};

const updateAchievement = async (id, {title, description, type, requirement,}) => {
    const achievement = await prisma.achievement.findUnique({
        where: {
            id,
        },
    });

    if(!achievement) {
        throw new Error("Achievement tidak ditemukan");
    }

    if(title && title !== achievement.title) {
        const existingAchievement = await prisma.achievement.findFirst({
            where: {
                title,
            },
        });

        if(existingAchievement) {
            throw new Error("Judul achievement sudah digunakan");
        }
    }

    const updatedAchievement = await prisma.achievement.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            type,
            requirement,
        }
    });

    return updatedAchievement;
};

const deleteAchievement = async (id) => {
    const achievement = await prisma.achievement.findUnique({
        where: {
            id,
        },
    });

    if(!achievement) {
        throw new Error("Achievement tidak ditemukan");
    }

    const totalUnlocked = await prisma.characterAchievement.count({
        where: {
            achievementId: id,
        },
    });

    if(totalUnlocked > 0) {
        throw new Error("Achievement tidak dapat dihapus karena sudah dimiliki player");
    }

    await prisma.achievement.delete({
        where: {
            id,
        },
    });
};

module.exports = {
    checkQuestAchievement,
    getMyAchievements,
    getAllAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
};