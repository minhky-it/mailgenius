const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // days
        required: true,
    },
    billing_cycle: {
        type: String,
        required: true,
    },
    features: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    create: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    cancelPolicy: {
        type: String,
        required: true,
    },
});

module.exports = Plan = mongoose.model('Plan', PlanSchema);