const mongoose = require('mongoose');

const UserPaymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true
    },
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    memberships: {
        planId: {
            type: String,
            default: null
        },
        planName: {
            type: String,
            default: "Normal"
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        expire: {
            type: Date,
            default: null
        }
    }
});

const UserPayment = mongoose.model('UserPayment', UserPaymentSchema);

module.exports = UserPayment;