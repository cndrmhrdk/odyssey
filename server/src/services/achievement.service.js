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

module.exports = {
    checkQuestAchievement,
    getMyAchievements,
};