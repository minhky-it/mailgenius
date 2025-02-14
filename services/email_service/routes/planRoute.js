const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middleware/authentication.js");
const PlanController = require("../controllers/planController.js");

router.get("/", authenticationMiddleware, PlanController.getPlan);

module.exports = router;