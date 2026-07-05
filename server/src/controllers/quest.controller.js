const questService = require("../services/quest.service");

const getAllQuests = async (req, res, next) => {
    try {
        const quests = await questService.getAllQuests();

        return res.status(200).json({
            success: true,
            data: quests,
        });
    } catch (error) {
        next(error);
    }
};

const startQuest = async (req, res, next) => {
    try {
        const quest = await questService.startQuest(
            req.user.id,
            req.params.questId,
        );

        return res.status(201).json({
            success: true,
            message: "Quest dimulai",
            data: quest,
        });
    } catch (error) {
        next(error);
    }
};

const completeQuest = async (req, res, next) => {
    try {
        const result = await questService.completeQuest(
            req.user.id,
            req.params.questId,
        );

        return res.status(200).json({
            success: true,
            message: "Quest selesai",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const createQuest = async (req, res, next) => {
    try {
        const quest = await questService.createQuest(req.body);

        return res.status(201).json({
            success: true,
            message: "Quest berhasil dibuat",
            data: quest,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllQuests,
    startQuest,
    completeQuest,
    createQuest,
};