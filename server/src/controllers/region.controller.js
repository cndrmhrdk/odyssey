const regionService = require("../services/region.service");

const getAllRegions = async (req, res, next) => {
    try {
        const regions = await regionService.getAllRegions();

        return res.status(200).json({
            success: true,
            data: regions,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRegions,
};