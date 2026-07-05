const prisma = require("../../src/config/prisma");

async function seedQuest() {
    // Ambil semua region
    const htmlVillage = await prisma.region.findUnique({
        where: {
            name: "HTML Village",
        },
    });

    const cssForest = await prisma.region.findUnique({
        where: {
            name: "CSS Forest",
        },
    });

    const javascriptKingdom = await prisma.region.findUnique({
        where: {
            name: "JavaScript Kingdom",
        },
    });

    if(!htmlVillage || !cssForest || !javascriptKingdom) {
        throw new Error("Region belum ada");
    }

    const quests = [
        {
            title: "Mengenal Tag HTML",
            description: "Pelajari struktur dasar HTML.",
            difficulty: "EASY",
            regionId: htmlVillage.id,
            xpReward: 100,
            coinReward: 50,
        },
        {
            title: "Membuat form HTML",
            description: "Pelajari penggunaan form pada HTML.",
            difficulty: "EASY",
            regionId: htmlVillage.id,
            xpReward: 150,
            coinReward: 75,
        },
        {
            title: "Belajar Flexbox",
            description: "Membuat layout menggunakan Flexbox.",
            difficulty: "EASY",
            regionId: cssForest.id,
            xpReward: 200,
            coinReward: 100,
        },
        {
            title: "CSS Grid Layout",
            description: "Mempelajari Grid Layout.",
            difficulty: "MEDIUM",
            regionId: cssForest.id,
            xpReward: 250,
            coinReward: 125,
        },
        {
            title: "Variable & Tipe Data",
            description: "Belajar variable pada JavaScript.",
            difficulty: "EASY",
            regionId: javascriptKingdom.id,
            xpReward: 300,
            coinReward: 150,
        },
        {
            title: "Function Dasar",
            description: "Belajar membuat function.",
            difficulty: "MEDIUM",
            regionId: javascriptKingdom.id,
            xpReward: 350,
            coinReward: 175,
        },
    ];

    for (const quest of quests) {
        const existingQuest = await prisma.quest.findFirst({
            where: {
                title: quest.title,
            },
        });

        if(existingQuest) continue;

        await prisma.quest.create({
            data: {
                title: quest.title,
                description: quest.description,
                difficulty: quest.difficulty,
                region: {
                    connect: {
                        id: quest.regionId,
                    },
                },
                reward: {
                    create: {
                        xpReward: quest.xpReward,
                        coinReward: quest.coinReward,
                    },
                },
            },
        });
    }

    console.log("Quest berhasil ditambahkan");
}

module.exports = seedQuest;