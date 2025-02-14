const express = require('express');
const PaymentController = require("../controllers/paymentController.js");
const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.get('/view', authenticationMiddleware, PaymentController.view);
router.post('/create', authenticationMiddleware, PaymentController.create);
router.post('/confirm', authenticationMiddleware, PaymentController.confirm);
module.exports = router;