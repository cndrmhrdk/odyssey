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
            nickname: data.nickname,
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

const updateCharacter = async (userId, data) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    if (!character) {
        throw new Error("Character belum dibuat");
    }

    if (
        data.nickname &&
        data.nickname !== character.nickname
    ) {
        const existingNickname = await prisma.character.findUnique({
            where: {
                nickname: data.nickname,
            },
        });

        if (existingNickname) {
            throw new Error("Nickname sudah digunakan");
        }
    }

    const updatedCharacter = await prisma.character.update({
        where: {
            id: character.id,
        },
        data: {
            ...(data.nickname !== undefined && {
                nickname: data.nickname,
            }),

            ...(data.avatar !== undefined && {
                avatar: data.avatar,
            }),
        },
    });

    return updatedCharacter;
};

const getMyCharacter = async (userId) => {
    const character = await prisma.character.findUnique({
        where: {
            userId,
        },
    });

    return character;
};

module.exports = {
    createCharacter,
    updateCharacter,
    getMyCharacter,
};