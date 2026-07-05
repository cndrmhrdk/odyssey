const prisma = require("../../src/config/prisma");

async function seedRole() {
  const roles = ["ADMIN", "PLAYER"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role,
      },
      update: {},
      create: {
        name: role,
      },
    });
  }

  console.log("Role berhasil dibuat");
}

module.exports = seedRole;
