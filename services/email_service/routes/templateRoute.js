const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middleware/authentication.js");
const templateController = require("../controllers/templateController.js");

router.post("/create", authenticationMiddleware, templateController.create);
router.patch("/editor", authenticationMiddleware, templateController.store);
router.get("/editor", authenticationMiddleware, templateController.load);
router.post("/search", authenticationMiddleware, templateController.searchTmps);
router.get("/views", authenticationMiddleware, templateController.views);
router.get("/view", authenticationMiddleware, templateController.view);
router.patch("/update", authenticationMiddleware, templateController.update);
router.delete("/remove", authenticationMiddleware, templateController.remove);
module.exports = router;