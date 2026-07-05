const express = require("express");

const router = express.Router();

const questController = require("../controllers/quest.controller");
const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware")

router.get("/", questController.getAllQuests);
router.post("/", verifyToken, authorizeRole("ADMIN"), questController.createQuest);
router.post("/:questId/start", verifyToken, questController.startQuest);
router.patch("/:questId/complete", verifyToken, questController.completeQuest);

module.exports = router;