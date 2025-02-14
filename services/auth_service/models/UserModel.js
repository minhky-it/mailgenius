const mongoose = require('mongoose');
const { USER_ROLE } = require('../enum');
const Support = require('../supports');

const UserSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    name: {
        type: 'string',
        required: true,
        default: `Người dùng ${Math.random().toString(36).substring(2, 10)}`
    },
    password: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: false,
        default: `${Support.generateRequestId()}`,
        unique: true
    },
    profile_avatar: {
        public_id: {
            type: String,
            required: false,
            default: null
        },
        url: {
            type: String,
            required: true,
            default: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhkMmE4aTR6OTR0NHY3cHFwaTlkcXQyMmJrbWg1NjU3ZGo2d2hoYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZXkraFrlIW1D25M6ZJ/giphy.gif'
        }
    },
    address: {
        type: String,
        default: 'User default address'
    },
    role: {
        type: 'string',
        enum: [USER_ROLE.ADMIN, USER_ROLE.DESIGNER, USER_ROLE.USER],
        default: USER_ROLE.USER,
    },
    timestamp: {
        type: 'date',
        default: Date.now
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;