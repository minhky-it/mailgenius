const RecipientController = require("../controllers/recipientController.js");
const express = require("express");

const router = express.Router();

router.post("/adds", RecipientController.addToCampaign);
router.get("/views", RecipientController.viewList);
router.delete("/remove", RecipientController.removeRecipient);
router.patch("/edit", RecipientController.patchRecipient);
module.exports = router;