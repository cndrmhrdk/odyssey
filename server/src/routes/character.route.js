const express = require("express");

const router = express.Router();

const characterController = require("../controllers/character.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");
const { createCharacterSchema, updateCharacterSchema } = require("../validations/character.validation");

router.post("/", verifyToken, validate(createCharacterSchema), characterController.createCharacter);
router.get("/me", verifyToken, characterController.getMyCharacter);
router.put("/me", verifyToken, validate(updateCharacterSchema), characterController.updateCharacter );

module.exports = router;