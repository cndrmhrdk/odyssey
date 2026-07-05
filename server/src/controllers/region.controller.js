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

const createRegion = async (req, res, next) => {
    try {
        const region = await regionService.createRegion(req.body);

        return res.status(201).json({
            success: true,
            message: "Region berhasil dibuat",
            data: region,
        });
    } catch (error) {
        next(error);
    }
};

const updateRegion = async (req, res, next) => {
    try {
        const region = await regionService.updateRegion(
            req.params.id,
            req.body,
        );

        return res.status(200).json({
            success: true,
            message: "Region berhasil diperbarui",
            data: region
        });
    } catch (error) {
        next(error);
    }
};

const deleteRegion = async (req, res, next) => {
    try {
        await regionService.deleteRegion(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Region berhasil dihapus",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRegions,
    createRegion,
    updateRegion,
    deleteRegion,
};