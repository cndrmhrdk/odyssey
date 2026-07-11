const express = require("express");

const router = express.Router();
const authRoute = require("./auth.route");
const characterRoute = require("./character.route");
const regionRoute = require("./region.route");
const questRoute = require("./quest.route");
const achievementRoute = require("./achievement.route");
const leaderboardRoute = require("./leaderboard.route");
const profileRoute = require("./profile.route");
const adminDashboardRoute = require("./adminDashboard.route");

router.get("/", (req,res) => {
res.status(200).json({
    success: true,
    message: "Welcome to Code Odyssey API"
});
});

router.use("/auth", authRoute);
router.use("/characters", characterRoute);
router.use("/regions", regionRoute);
router.use("/quests", questRoute);
router.use("/achievements", achievementRoute);
router.use("/leaderboard", leaderboardRoute);
router.use("/profile", profileRoute);
router.use("/admin/dashboard", adminDashboardRoute);

module.exports = router;