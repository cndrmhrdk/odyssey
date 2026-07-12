const bcrypt = require("bcrypt");
const prisma = require("../../src/config/prisma");

async function seedPlayer() {
    const playerRole = await prisma.role.findFirst({
        where: {
            name: "PLAYER",
        },
    });

    const existingPlayer = await prisma.user.findUnique({
        where: {
            email: "akuplayer@gmail.com",
        },
    });

    if (existingPlayer) {
        console.log("palyer sudah ada");
        return;
    }

    const hashedPassword = await bcrypt.hash("player123", 10);

    await prisma.user.create({
        data: {
            username: "akuakuaku",
            email: "akuplayer@gmail.com",
            password: hashedPassword,
            roleId: playerRole.id,
        },
    });

    console.log("Player berhasil dibuat");
}

module.exports = seedPlayer;