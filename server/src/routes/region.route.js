const express = require("express");

const router = express.Router();

const regionController = require("../controllers/region.controller");

const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware")

router.get("/", regionController.getAllRegions);
router.post("/", verifyToken, authorizeRole("ADMIN"), regionController.createRegion);
router.put("/:id", verifyToken, authorizeRole("ADMIN"), regionController.updateRegion);
router.delete("/:id", verifyToken, authorizeRole("ADMIN"), regionController.deleteRegion);

module.exports = router;