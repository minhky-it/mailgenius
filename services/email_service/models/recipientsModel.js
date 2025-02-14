const mongoose = require('mongoose');

const recipientsSchema = new mongoose.Schema({
    campaign_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'opened', 'clicked', 'blocked'],
        default: 'pending',
    },
    error_message:{
        type: String,
        default: null,
    },
    opened_at: {
        type: Date,
        default: null,
    },
    clicked_at: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

recipientsSchema.statics.findByCampaignIdandDelete = async function (campaign_id) {
    return this.deleteMany({ campaign_id });
};


const Recipients = mongoose.model('Recipients', recipientsSchema);
module.exports = Recipients;