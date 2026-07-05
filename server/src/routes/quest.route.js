const express = require("express");

const router = express.Router();

const questController = require("../controllers/quest.controller");
const { verifyToken } = require("../middlewares/auth.middleware")

router.get("/", questController.getAllQuests);
router.post("/:questId/start", verifyToken, questController.startQuest);
router.patch("/:questId/complete", verifyToken, questController.completeQuest);

module.exports = router;