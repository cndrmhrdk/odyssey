const prisma = require("../config/prisma");

const createCharacter = async (userId, nickname) => {
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
            nickname,
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

    if(!character) {
        throw new Error("Character belum dibuat");
    }

    return character;
}

module.exports = {
    createCharacter,
    getMyCharacter,
};