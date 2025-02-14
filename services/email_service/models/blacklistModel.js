const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    reason: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

module.exports = Blacklist;