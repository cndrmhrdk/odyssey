const prisma = require("../config/prisma");

const getLeaderboard = async () => {
    const characters = await prisma.character.findMany({
        orderBy: [
            {
                level: "desc",
            },
            {
                xp: "desc",
            },
        ],
        select: {
            id: true,
            nickname: true,
            level: true,
            xp: true,
            coin: true,
            avatar: true,
            title: true,
        },
    });

    return characters.map((character, index) => ({
        rank: index + 1,
        ...character,
    }));
};

module.exports = {
    getLeaderboard,
};