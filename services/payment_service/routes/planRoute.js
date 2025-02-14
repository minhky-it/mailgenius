const express = require('express');
const PlanController = require("../controllers/planController.js");
const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.get('/views', PlanController.getPlans);
router.get('/view', PlanController.getPlanById);
router.post('/buy', authenticationMiddleware, PlanController.buyAPlan);
module.exports = router;