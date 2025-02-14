const CampaignController = require("../controllers/campaignController.js");
const express = require("express");
const authenticationMiddleware = require("../middleware/authentication.js");
const campaignMiddleware = require("../middleware/campaign.js");
const router = express.Router();

router.post("/create",authenticationMiddleware, campaignMiddleware, CampaignController.create);
router.get("/views",authenticationMiddleware, CampaignController.views);
router.get("/view", authenticationMiddleware, CampaignController.view);
router.get("/types",authenticationMiddleware, CampaignController.viewTypes);
router.delete("/remove",authenticationMiddleware,authenticationMiddleware, CampaignController.remove);
router.patch("/editor",authenticationMiddleware, CampaignController.store);
router.get("/editor",authenticationMiddleware, CampaignController.load);
router.post("/convert",authenticationMiddleware, CampaignController.convertToTableLayout);
router.post("/search",authenticationMiddleware, CampaignController.searchCamps);
router.patch("/update",authenticationMiddleware, CampaignController.update);
module.exports = router;