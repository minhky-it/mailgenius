const express = require('express');
const authenticationMiddleware = require("../middleware/authentication.js");
const router = express.Router();
const LandingController = require("../controllers/landingController.js");


router.get("/", authenticationMiddleware, LandingController.retrieve);
router.patch("/", authenticationMiddleware, LandingController.patchData);
router.patch("/scratch", authenticationMiddleware, LandingController.scratchDesign);
router.get("/scratch", authenticationMiddleware, LandingController.retrieveDesign);
router.put("/publish", authenticationMiddleware, LandingController.saveHTML);
router.get("/retrive", LandingController.retriveHTML);
module.exports = router;