const express = require('express');
const userController = require('../controllers/userController.js');
const authenticationMiddleware = require('../middleware/authenticateMiddleware.js');
const multer = require("multer");
const upload = multer();

const router = express.Router();

// public router
router.get("/list",authenticationMiddleware, userController.listUser);
router.get("/connections/", authenticationMiddleware, userController.getConnection);
router.get("/:email", userController.findUsers);
router.patch("/patch", authenticationMiddleware, upload.single("profile_avatar"), userController.patchProfile);
module.exports = router;