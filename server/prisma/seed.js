const prisma = require("../src/config/prisma");
const seedRole = require("./seed/role.seed");
const seedRegion = require("./seed/region.seed");
const seedQuest = require("./seed/quest.seed");
const seedAchievement = require("./seed/achievement.seed");

async function main(){
    await seedRole();
    await seedRegion();
    await seedQuest();
    await seedAchievement();
}

main()
    .then(() => {
        console.log("Semua seed berhasil dijalankan");
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });