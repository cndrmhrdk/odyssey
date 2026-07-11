const express = require("express");

const router = express.Router();

const adminDashboardController = require("../controllers/adminDashboard.controller");
const { verifyToken, authorizeRole, } = require("../middlewares/auth.middleware");

router.get(
    "/",
    verifyToken,
    authorizeRole("ADMIN"),
    adminDashboardController.getDashboard
);

module.exports = router;