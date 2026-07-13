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

            question: "Tag HTML manakah yang digunakan untuk membuat heading terbesar pada sebuah halaman?",
            choiceA: "<h6>",
            choiceB: "<h1>",
            choiceC: "<p>",
            choiceD: "<div>",
            correctChoice: "B",

            regionId: htmlVillage.id,
            xpReward: 100,
            coinReward: 50,
        },
        {
            title: "Membuat form HTML",
            description: "Pelajari penggunaan form pada HTML.",
            difficulty: "EASY",

            question: "Tag HTML apa yang digunakan untuk membuat form input dari pengguna?",
            choiceA: "<form>",
            choiceB: "<input>",
            choiceC: "<label>",
            choiceD: "<textarea>",
            correctChoice: "A",

            regionId: htmlVillage.id,
            xpReward: 150,
            coinReward: 75,
        },
        {
            title: "Belajar Flexbox",
            description: "Membuat layout menggunakan Flexbox.",
            difficulty: "EASY",

            question: "Properti CSS apa yang digunakan untuk mengaktifkan Flexbox pada sebuah container?",
            choiceA: "display: block;",
            choiceB: "display: flex;",
            choiceC: "display: inline;",
            choiceD: "display: grid;",
            correctChoice: "B",

            regionId: cssForest.id,
            xpReward: 200,
            coinReward: 100,
        },
        {
            title: "CSS Grid Layout",
            description: "Mempelajari Grid Layout.",
            difficulty: "MEDIUM",

            question: "Properti CSS apa yang digunakan untuk mengaktifkan CSS Grid pada sebuah elemen?",
            choiceA: "display: flex;",
            choiceB: "display: inline-grid;",
            choiceC: "display: grid;",
            choiceD: "position: grid;",
            correctChoice: "C",

            regionId: cssForest.id,
            xpReward: 250,
            coinReward: 125,
        },
        {
            title: "Variable & Tipe Data",
            description: "Belajar variable pada JavaScript.",
            difficulty: "EASY",

            question: "Keyword JavaScript modern yang digunakan untuk membuat variabel yang nilainya dapat diubah adalah...",
            choiceA: "const",
            choiceB: "let",
            choiceC: "function",
            choiceD: "class",
            correctChoice: "B",

            regionId: javascriptKingdom.id,
            xpReward: 300,
            coinReward: 150,
        },
        {
            title: "Function Dasar",
            description: "Belajar membuat function.",
            difficulty: "MEDIUM",

            question: "Apa nilai yang dikembalikan oleh keyword 'return' di dalam sebuah function?",
            choiceA: "Menghapus function",
            choiceB: "Menghentikan browser",
            choiceC: "Mengembalikan hasil dari function kepada pemanggil",
            choiceD: "Menjalankan function dua kali",
            correctChoice: "C",

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
                question: quest.question,
                choiceA: quest.choiceA,
                choiceB: quest.choiceB,
                choiceC: quest.choiceC,
                choiceD: quest.choiceD,
                correctChoice: quest.correctChoice,
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