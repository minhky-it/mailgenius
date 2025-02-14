const mongoose = require('mongoose');
const Support = require("../support/index.js");
const { CAMPAIGN_TYPE } = require("../enum/index.js");
const CampaignSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: `MailGenius Campaign - ${Support.generateRequestId()}`,
    },
    keyword: {
        type: String,
        required: false,
    },
    subject: {
        type: String,
        required: true,
        default: "Quảng cáo",
    },
    type: {
        type: String,
        enum: [CAMPAIGN_TYPE.EMAIL, CAMPAIGN_TYPE.LANDING, CAMPAIGN_TYPE.FORM],
        default: CAMPAIGN_TYPE.EMAIL,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "Mô tả quảng cáo",
    },
    content: {
        type: Object,
        required: false,
        default: () => ({}),
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archive', 'draft'],
        default: 'draft',
    },
    scheduled_time: {
        type: Date,
        required: false,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    },
});

CampaignSchema.statics.findByIdAndUserToDelete = async (id, user_id) => {
    const campaign = await Campaign.findOne({ _id: id });
    if (!campaign) {
        throw new Error('Campaign not found');
    }
    if (campaign.user_id !== user_id) {
        throw new Error('Unauthorized to delete this campaign');
    }
    await campaign.deleteOne();
    return campaign;
}
const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;