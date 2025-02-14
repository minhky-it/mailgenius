const DeliveryController = require("../controllers/deliveryController.js");
const express = require("express");
const authenticationMiddleware = require("../middleware/authentication.js");
const router = express.Router();

router.post("/send-one", DeliveryController.sendOne);
router.get("/tracking", DeliveryController.trackByPixel);
router.get("/redirect", DeliveryController.redirectTracking);
router.post("/send", authenticationMiddleware, DeliveryController.sendEmail);
router.post("/schedule", authenticationMiddleware, DeliveryController.sendSchedule);
router.get("/clicked", authenticationMiddleware, DeliveryController.getClickedRecipients);
router.post("/blacklist", DeliveryController.insertBlacklist);
module.exports = router;