const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievement.controller");
const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware");

router.get("/", achievementController.getAllAchievements);
router.get("/my", verifyToken, achievementController.getMyAchievements);
router.post("/", verifyToken, authorizeRole("ADMIN"), achievementController.createAchievement);
router.put("/:id", verifyToken, authorizeRole("ADMIN"), achievementController.updateAchievement);
router.delete("/:id", verifyToken, authorizeRole("ADMIN"), achievementController.deleteAchievement);

module.exports = router;