const express = require('express');
const AuthenticateController = require('../controllers/authenticationController.js');
const authenticationMiddleware = require("../middleware/authenticateMiddleware.js");
const router = express.Router();

// public router
router.post("/login", AuthenticateController.login);
router.post("/register", AuthenticateController.register);
router.patch("/update-profile", authenticationMiddleware, AuthenticateController.updateProfile);
router.post("/reset-password", AuthenticateController.resetPassword);
router.post("/rst-pwd/verify", AuthenticateController.verifyTokenRstPwd);
router.post("/rst-pwd/renew", AuthenticateController.rstPwdRenew);
router.post("/change-password", authenticationMiddleware, AuthenticateController.changePassword);

module.exports = router;