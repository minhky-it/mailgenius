const seoController = require("../controllers/seoController.js");
const express = require("express");
const authenticationMiddleware = require("../middleware/authentication.js");
const router = express.Router();

router.get("/check", authenticationMiddleware, seoController.crawl);
router.get("/check-speed", authenticationMiddleware, seoController.checkPageSpeed);
router.get("/trending", authenticationMiddleware, seoController.trending);
module.exports = router