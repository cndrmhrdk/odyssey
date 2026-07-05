const prisma = require("../../src/config/prisma");

const seedAchievement = async () => {
    const achievements = [
        {
            title: "First Quest",
            description: "Selesaikan quest pertama",
            requirement: 1,
            type: "QUEST",
        },
        {
            title: "Adventurer",
            description: "Selesaikan 5 quest",
            requirement: 5,
            type: "QUEST",
        },
        {
            title: "Veteran",
            description: "Selesaikan 10 quest",
            requirement: 10,
            type: "QUEST",
        },
        {
            title: "Level 5",
            description: "Capai level 5",
            requirement: 5,
            type: "LEVEL",
        },
    ];

    for (const achievement of achievements) {
        const existing = await prisma.achievement.findFirst({
            where: {
                title: achievement.title,
            },
        });

        if(existing) continue;
        
        await prisma.achievement.create({
            data: achievement,
        });
    }

    console.log("Achievement berhasil ditambahkan");
};

module.exports = seedAchievement;