const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    plan_name: {
        type: String,
        required: true
    },
    plan_service: {
        email: {
            limit: {
                daily_send: {
                    type: Number,
                    required: true,
                    default: 0
                },
                total_send: {
                    type: Number,
                    required: true,
                    default: 0
                }
            },
            data: {
                daily: {
                    type: Number,
                    required: false,
                    default: 0
                },
                total: {
                    type: Number,
                    required: false,
                    default: 0
                }
            }
        },
        campaign: {
            limit: {
                daily_create: {
                    type: Number,
                    required: true,
                    default: 0
                },
                total_create: {
                    type: Number,
                    required: true,
                    default: 0
                }
            },
            data: {
                daily: {
                    type: Number,
                    required: false,
                    default: 0
                },
                total: {
                    type: Number,
                    required: false,
                    default: 0
                }
            }
        }
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
    expired_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Plan', planSchema);