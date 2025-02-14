const admin = require("firebase-admin");
const service = require("./authenticate_account_service.json");

admin.initializeApp({
    credential: admin.credential.cert(service),
});

module.exports = admin;
