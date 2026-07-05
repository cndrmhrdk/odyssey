const profileService = require("../services/profile.service");

const getProfile = async (req, res, next) => {
    try {
        const profile = await profileService.getProfile(
            req.user.id,
        );

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
};