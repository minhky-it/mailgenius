const authorizationRouter = require("./authorizationRoute.js");
const authenticationRouter = require("./authenticationRoute.js");
const userManagementRouter = require("./user-managementRoute.js");

module.exports = {
    authorizationRouter,
    authenticationRouter,
    userManagementRouter,
}