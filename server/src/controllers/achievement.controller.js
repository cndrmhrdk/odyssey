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

module.exports = {
    getMyAchievements,
};