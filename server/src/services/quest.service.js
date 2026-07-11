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

const getQuestById = async (id) => {
    return prisma.quest.findUnique({
        where: {
            id,
        },
        include: {
            reward: true,
        },
    });
};

const getMyQuests = async (userId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if (!character) {
        throw new Error("Character belum dibuat");
    }

    const quests = await prisma.quest.findMany({
        include: {
            region: true,
            reward: true,
            progress: {
                where: {
                    characterId: character.id,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return quests.map((quest) => ({
        id: quest.id,
        title: quest.title,
        description: quest.description,
        difficulty: quest.difficulty,
        region: quest.region,
        reward: quest.reward,

        status:
            quest.progress.length > 0 ? quest.progress[0].status : "NOT_STARTED",
    }));
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

const createQuest = async ({title, description, difficulty, regionId, xpReward, coinReward,}) => {
    const region = await prisma.region.findUnique({
        where: {
            id: regionId,
        },
    });

    if(!region) {
        throw new Error("Region tidak ada");
    }

    const existingQuest = await prisma.quest.findFirst({
        where: {
            title,
        },
    });

    if(existingQuest) {
        throw new Error("Quest sudah ada");
    }

    const quest = await prisma.quest.create({
        data: {
            title,
            description,
            difficulty,
            region: {
                connect: {
                    id: region.id,
                },
            },
            reward: {
                create: {
                    xpReward,
                    coinReward,
                },
            },
        },
        include: {
            region: true,
            reward: true,
        },  
    });

    return quest;
};

const updateQuest = async (questId, {title, description, difficulty, regionId, xpReward, coinReward,}) => {
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

    if(regionId) {
        const region = await prisma.region.findUnique({
            where: {
                id: regionId,
            },
        });
    
        if(!region) {
            throw new Error("Region tidak ditemukan");
        }
    }

    if(title && title !== quest.title) {
        const existingQuest = await prisma.quest.findFirst({
            where: {
                title,
            },
        });

        if(existingQuest) {
            throw new Error("Judul quest sudah digunakan");
        }
    }

    const result = await prisma.$transaction(async (tx) => {
        const updatedQuest = await tx.quest.update({
            where: {
                id: questId,
            },
            data: {
                title,
                description,
                difficulty,
                regionId,
            },
        });

        await tx.questReward.update({
            where: {
                questId,
            },
            data: {
                xpReward,
                coinReward,
            },
        });
    
        return updatedQuest;
    });

    return prisma.quest.findUnique({
        where: {
            id: result.id,
        },
        include: {
            region: true,
            reward: true,
        },
    });
};

const deleteQuest = async (questId) => {
    const quest = await prisma.quest.findUnique({
        where: {
            id: questId,
        },
    });

    if(!quest) {
        throw new Error("Quest tidak ditemukan");
    }

    const totalProgress = await prisma.questProgress.count({
        where: {
            questId,
        },
    });

    if(totalProgress > 0) {
        throw new Error("Quest tidak dapat dihapus karena sudah pernah dimainkan");
    }

    await prisma.$transaction(async (tx) => {
        await tx.questReward.delete({
            where: {
                questId,
            },
        });

        await tx.quest.delete({
            where: {
                id: questId,
            },
        });
    });
};

module.exports = {
    getAllQuests,
    getQuestById,
    getMyQuests,
    startQuest,
    completeQuest,
    createQuest,
    updateQuest,
    deleteQuest,
};
