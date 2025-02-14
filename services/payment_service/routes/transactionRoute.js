const express = require('express');
const TransactionController = require("../controllers/transactionController.js");
const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.get('/views', authenticationMiddleware, TransactionController.views);
module.exports = router;