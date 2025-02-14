const express = require('express');
const vnpayController = require("../controllers/vnpayController.js");
const authenticationMiddleware = require('../middlewares/authentication.js');
const router = express.Router();

router.post(`/create`,authenticationMiddleware, vnpayController.createPayment);
router.get("/return", vnpayController.returnUrl);
router.get("/ipn", vnpayController.getIPN);
module.exports = router;