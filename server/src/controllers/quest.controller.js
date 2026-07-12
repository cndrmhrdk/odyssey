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

const getQuestById = async (req, res, next) => {
    try {
        const quest = await questService.getQuestById(req.params.id);

        return res.status(200).json({
            success: true,
            data: quest,
        });
    } catch (error) {
        next(error);
    }
};

const getMyQuests = async (req, res, next) => {
    try {
        const quests = await questService.getMyQuests(req.user.id);

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

const submitAnswer = async (req, res, next) => {
    try {
        const result = await questService.submitAnswer(
            req.user.id,
            req.params.questId,
            req.body.answer,
        );

        return res.status(200).json({
            success: result.success,
            message: result.message,
            data: result.data ?? null,
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
};

const updateQuest = async (req, res, next) => {
    try {
        const quest = await questService.updateQuest(
            req.params.questId,
            req.body,
        );

        return res.status(200).json({
            success: true,
            message: "Quest berhasil diperbarui",
            data: quest,
        });
    } catch (error) {
        next(error);
    }
}

const deleteQuest = async (req, res, next) => {
    try {
        await questService.deleteQuest(req.params.questId);

        return res.status(200).json({
            success: true,
            message: "Quest berhasil dihapus",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllQuests,
    getQuestById,
    getMyQuests,
    startQuest,
    submitAnswer,
    createQuest,
    updateQuest,
    deleteQuest,
};