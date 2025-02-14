const mongoose = require('mongoose');
const Support = require("../support/index.js");
const { CAMPAIGN_TYPE } = require("../enum/index.js");
const TemplateSchema = new mongoose.Schema({
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
        default: "Template subject",
    },
    type: {
        type: String,
        enum: [CAMPAIGN_TYPE.EMAIL, CAMPAIGN_TYPE.LANDING, CAMPAIGN_TYPE.FORM],
        default: CAMPAIGN_TYPE.EMAIL,
        required: true,
    },
    content: {
        type: Object,
        required: false,
        default: {},
    },
    status: {
        type: String,
        enum: ['private', 'public'],
        default: 'public',
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

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;