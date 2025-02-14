const jwt = require("jsonwebtoken");
const HttpStatusCode = require("../exceptions/HttpStatusCode.js");
const User = require("../models/UserModel.js");
// Middleware to authenticate JWT token before accessing protected routes
const authenticationMiddleware = async (req, res, next) => {
	try {
		let token = req.headers["authorization"];
		if (!token) {
			return res.status(401).json({
				error: "Token is required",
				message: "Authentication is required",
			});
		}
		// Extract token from "Bearer <token>"
		token = token.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				error: "Token is missing",
				message: "Authorization token is missing from the request",
			});
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (decoded.exp < Date.now() / 1000) {
			return res.status(HttpStatusCode.ACCESS_TOKEN_EXPIRED).json({
				error: "Token is expired",
				message: "Token is expired. Please give refresh token",
			});
		}
		// If all checks pass, add user to request object for use in protected routes
		req.user = await User.findOne({ email: decoded.email }).select("-password");
		next();
	} catch (error) {
		const statusCode = error.name === "TokenExpiredError" ? 428 : 401;
		return res.status(statusCode).json({
			error: "Internal Server Error",
			messages: `Failed to authenticate | ${error.message}`,
		});
	}
};

module.exports = authenticationMiddleware;
