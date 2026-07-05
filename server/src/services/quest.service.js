const prisma = require("../config/prisma");
const { calculateLevel } = require("../helpers/level.helper");
const achievementService = require("../services/achievement.service");

const getAllQuests = async () => {
    return await prisma.quest.findMany({
        include: {
            region: true,
            reward: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
};

const startQuest = async (userId, questId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if(!character) {
        throw new Error("Character belum dibuat");
    }

    const quest = await prisma.quest.findUnique({
        where: {
            id: questId,
        },
    });

    if(!quest) {
        throw new Error("Quest tidak ditemukan");
    }

    const existingProgress = await prisma.questProgress.findUnique({
        where: {
            characterId_questId: {
                characterId: character.id,
                questId: quest.id,
            },
        },
    });

    if(existingProgress) {
        throw  new Error("Quest sudah pernah diambil");
    }

    const progress = await prisma.questProgress.create({
        data: {
            characterId: character.id,
            questId: quest.id,
            status: "IN_PROGRESS",
        },
    });

    return progress;
};

const completeQuest = async (userId,questId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if(!character) {
        throw new Error("Character belum dibuat");
    }

    const progress = await prisma.questProgress.findUnique({
        where: {
            characterId_questId: {
                characterId: character.id,
                questId,
            },
        },
    });


    if(!progress) {
        throw new Error("Quest belum dimulai");
    }

    if(progress.status === "COMPLETED") {
        throw new Error("Quest telah diselesaikan");
    }

    const quest = await prisma.quest.findUnique({
        where: {
            id: questId,
        },
        include: {
            reward: true,
        },
    });

    if(!quest) {
        throw new Error("Quest tidak ditemukan");
    }

    if(!quest.reward) {
        throw new Error("Reward quest belum tersedia");
    }

    const result = await prisma.$transaction(async (tx) => {
        const updatedCharacter = await tx.character.update({
            where: {
                id: character.id,
            },
            data: {
                xp: {
                    increment: quest.reward.xpReward,
                },
                coin: {
                    increment: quest.reward.coinReward,
                },
            },
        });

        const newLevel = calculateLevel(updatedCharacter.xp);

        if(newLevel > updatedCharacter.level) {
            await tx.character.update({
                where: {
                    id: character.id,
                },
                data: {
                    level: newLevel,
                },
            });
        }

        const updatedProgress = await tx.questProgress.update({
            where: {
                characterId_questId: {
                    characterId: character.id,
                    questId,
                },
            },
            data: {
                status: "COMPLETED",
                completedAt: new Date(),
            },
        });

        return {
            character: updatedCharacter,
            progress: updatedProgress,
        };
    });

    await achievementService.checkQuestAchievement(character.id);

    return result;
};

module.exports = {
    getAllQuests,
    startQuest,
    completeQuest,
};
