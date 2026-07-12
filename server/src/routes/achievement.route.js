const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievement.controller");
const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");
const { createAchievementSchema, updateAchievementSchema } = require("../validations/achievement.validation");

router.get("/", achievementController.getAllAchievements);
router.get("/my", verifyToken, achievementController.getMyAchievements);
router.get( "/:id", verifyToken, authorizeRole("ADMIN"), achievementController.getAchievementById );
router.post("/", verifyToken, authorizeRole("ADMIN"), validate(createAchievementSchema), achievementController.createAchievement);
router.put("/:id", verifyToken, authorizeRole("ADMIN"), validate(updateAchievementSchema), achievementController.updateAchievement);
router.delete("/:id", verifyToken, authorizeRole("ADMIN"), achievementController.deleteAchievement);

module.exports = router;