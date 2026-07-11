const bcrypt = require("bcrypt");
const prisma = require("../../src/config/prisma");

async function seedAdmin() {
    const adminRole = await prisma.role.findFirst({
        where: {
            name: "ADMIN",
        },
    });

    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: "admin@codeodyssey.com",
        },
    });

    if (existingAdmin) {
        console.log("Admin sudah ada");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@codeodyssey.com",
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });

    console.log("Admin berhasil dibuat");
}

module.exports = seedAdmin;