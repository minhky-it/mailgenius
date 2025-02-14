const mongoose = require('mongoose');

const UserConnectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    connections: [
        {
            platform: {
                type: String,
                required: true
            },
            uid: {
                type: String,
                required: true
            }
        }
    ]
});

const UserConnection = mongoose.model('UserConnection', UserConnectionSchema);

module.exports = UserConnection;