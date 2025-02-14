const mongoose = require('mongoose');
const Support = require("../support/index.js");
const StoreCampaignSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    campaign_id: {
        type: String,
        required: true,
    },
    user_path: {
        type: String,
        required: true,
    },
    product_path: {
        type: String,
        required: true,
    },
    transaction_path: {
        type: String,
        required: true,
    },
});

const StoreCampaign = mongoose.model('StoreCampaign', StoreCampaignSchema);

module.exports = StoreCampaign;