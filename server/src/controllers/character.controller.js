const characterService = require("../services/character.service");
const { createCharacterSchema } = require("../validations/character.validation");

const createCharacter = async (req, res, next) => {
    try {
        const data = createCharacterSchema.parse(req.body);

        const character = await characterService.createCharacter(
            req.user.id,
            data
        );

        return res.status(201).json({
            success: true,
            message: "Character berhasil dibuat",
            data: character,
        });
    } catch (error) {
        next(error);
    }
};

const getMyCharacter = async (req, res, next) => {
    const character = await characterService.getMyCharacter(
        req.user.id
    );

    return res.status(200).json({
        success: true,
        data: character,
    });
};

module.exports = {
    createCharacter,
    getMyCharacter,
};