const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievement.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/my", verifyToken, achievementController.getMyAchievements);

module.exports = router;