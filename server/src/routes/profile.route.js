const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, profileController.getProfile);

module.exports = router;