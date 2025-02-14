const USER_STATUS = Object.freeze({
    "ACTIVE": "active",
    "INACTIVE": "inactive",
    "BANNED": "banned"
});

const USER_ROLE = Object.freeze({
    ADMIN: "admin",
    DESIGNER: "designer",
    USER: "user"
});

module.exports = {
    USER_STATUS,
    USER_ROLE
};