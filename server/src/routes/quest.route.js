const express = require("express");

const router = express.Router();

console.log("Quest routes loaded");

const questController = require("../controllers/quest.controller");
const { verifyToken, authorizeRole } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");
const { createQuestSchema, updateQuestSchema } = require("../validations/quest.validation");

router.get("/", questController.getAllQuests);
router.get("/my", verifyToken, questController.getMyQuests);
router.get( "/:id", verifyToken, questController.getQuestById );
router.post("/", verifyToken, authorizeRole("ADMIN"), validate(createQuestSchema), questController.createQuest);
router.put("/:questId", verifyToken, authorizeRole("ADMIN"), validate(updateQuestSchema), questController.updateQuest);
router.delete("/:questId", verifyToken, authorizeRole("ADMIN"), questController.deleteQuest);
router.post("/:questId/start", verifyToken, questController.startQuest);
router.post( "/:questId/answer", verifyToken, questController.submitAnswer );

module.exports = router;