const prisma = require("../config/prisma");

const createCharacter = async (userId, data) => {
    // cek punya character
    const existingCharacter = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if(existingCharacter) {
        throw new Error("Kamu sudah punya karakter");
    }

    // cek nickname
    const existingNickname = await prisma.character.findUnique({
        where: {
            nickname,
        },
    });

    if(existingNickname) {
        throw new Error("Nickname sudah digunakan");
    }

    const character = await prisma.character.create({
        data: {
            userId,
            nickname: data.nickname,
            avatar: data.avatar,
        },
    });

    return character;
};

const getMyCharacter = async (userId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });
};

module.exports = {
    createCharacter,
    getMyCharacter,
};