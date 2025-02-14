const mongoose = require('mongoose');
const { USER_STATUS } = require("../enum/index.js");

const UserStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: [USER_STATUS.ACTIVE, USER_STATUS.INACTIVE, USER_STATUS.BANNED],
        default: USER_STATUS.INACTIVE
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const UserStatus = mongoose.model('UserStatus', UserStatusSchema);

module.exports = UserStatus;