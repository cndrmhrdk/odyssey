const express = require("express");

const router = express.Router();

const characterController = require("../controllers/character.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, characterController.createCharacter);
router.get("/me", verifyToken, characterController.getMyCharacter);

module.exports = router;