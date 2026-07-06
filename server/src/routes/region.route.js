const express = require("express");

const router = express.Router();

const regionController = require("../controllers/region.controller");
const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");
const { createRegionSchema, updateRegionSchema } = require("../validations/region.validation");

router.get("/", regionController.getAllRegions);
router.post("/", verifyToken, authorizeRole("ADMIN"), validate(createRegionSchema), regionController.createRegion);
router.put("/:id", verifyToken, authorizeRole("ADMIN"), validate(updateRegionSchema), regionController.updateRegion);
router.delete("/:id", verifyToken, authorizeRole("ADMIN"), regionController.deleteRegion);

module.exports = router;