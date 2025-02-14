const express = require('express');
const { refreshToken, validateToken, verifyTokenGoogle } = require("../controllers/authorizationController.js");
const router = express.Router();

// public router
router.post("/refresh", refreshToken);
router.post("/validate", validateToken);
router.post("/google/verify", verifyTokenGoogle);

module.exports = router;