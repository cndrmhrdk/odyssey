const achievementService = require("../services/achievement.service");

const getMyAchievements = async (req, res, next) => {
    try {
        const achievements = await achievementService.getMyAchievements(
            req.user.id,
        );

        return res.status(200).json({
            success: true,
            data: achievements,
        });
    } catch (error) {
        next(error);
    }
};

const getAllAchievements = async (req, res, next) => {
    try {
        const achievements = await achievementService.getAllAchievements();

        return res.status(200).json({
            success: true,
            data: achievements,
        });
    } catch (error) {
        next(error);
    }
};

const createAchievement = async (req, res, next) => {
    try {
        const achievement = await achievementService.createAchievement(req.body);

        return res.status(201).json({
            success: true,
            message: "Achievement berhasil dibuat",
            data: achievement,
        });
    } catch (error) {
        next(error);
    }
};

const updateAchievement = async (req, res, next) => {
    try {
        const achievement = await achievementService.updateAchievement(
            req.params.id,
            req.body,
        );

        return res.status(200).json({
            success: true,
            message: "Achievement berhasil diperbarui",
            data: achievement,
        });
    } catch (error) {
        next(error);
    }
};

const deleteAchievement = async (req, res, next) => {
    try {
        const achievement = await achievementService.deleteAchievement(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Achievement berhasil dihapus",
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMyAchievements,
    getAllAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
};