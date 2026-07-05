const prisma = require("../../src/config/prisma");

async function seedRegion() {
    const regions = [
        {
            name: "HTML Village",
            description: "Belajar dasar HTML",
        },
        {
            name: "CSS Forest",
            description: "Belajar CSS",
        },
        {
            name: "JavaScript Kingdom",
            description: "Belajar JavaScript",
        },
        {
            name: "React City",
            description: "Belajar React",
        },
        {
            name: "Node Mountain",
            description: "Belajar Node.js",
        },
        {
            name: "Database Cave",
            description: "Belajar SQL & PostgreSQL",
        },
    ];

    for (const region of regions) {
        await prisma.region.upsert({
            where: {
                name: region.name,
            },
            update: {},
            create: region,
        });
    }

    console.log("Region berhasil di tambahkan");    
}

module.exports = seedRegion;