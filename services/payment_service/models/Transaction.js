const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    platform_id: {
        type: String,
        required: false
    },
    request_id: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
});

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);