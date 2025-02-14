const Exception = require("../exceptions/exception.js");
const Support = require("../supports/index.js");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel.js");
const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");
const UserStatus = require("../models/UserStatusModel.js");
const { USER_STATUS, USER_ROLE } = require("../enum/index.js");
const createUserPaymentProducer = require("../kafka_client/paymentTopic.js");

const login = async (email, password) => {
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Exception(
				`${Exception.USER_NOT_FOUND} | Invalid email or password`,
			);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Exception(
				`${Exception.USER_NOT_FOUND} | Invalid email or password`,
			);
		}

		// remove passwords from user
		delete user.password;
		// create payment if not existing
		await createUserPaymentProducer(user, Support.generateRequestId());
		return {
			user,
			access_token: Support.generate_access(user),
			refresh_token: Support.generate_refresh(user),
		};
	} catch (error) {
		throw new Exception(`${Exception.LOGIN_FAILED} | ${error.message}`);
	}
};

const findUserByEmail = async (email) => {
	try {
	} catch (error) {
		throw new Exception(`${Exception.FIND_USER_FAILED} | ${error.message}`);
	}
};

const register = async ({ email, password }) => {
	try {
		let user = await User.findOne({ email });
		if (user) {
			throw new Exception(`Error in register service | Email already exists`);
		}

		const hashpwd = bcrypt.hashSync(password, 10);
		user = new User({
			email,
			password: hashpwd,
			role: USER_ROLE.USER,
		});

		// remove passwords from password
		delete user.password;
		// save user to database
		const result = await user.save();

		// send to payment service then create payment
		await createUserPaymentProducer(result, Support.generateRequestId());

		const user_status = new UserStatus({
			user_id: result._id,
			status: USER_STATUS.INACTIVE,
		});
		await user_status.save();

		const filePath = path.join(__dirname, "../template_html/verify_email.html");
		const subject = "Verify Your Account - MainGenius Authenticated Service";

		let htmlTemplate = await fs.readFile(filePath);
		const jwt = await Support.generate_jwt5m(user);
		const verifyLink = `https://handy-maggot-creative.ngrok-free.app/verify?jwt=${jwt}`;

		htmlTemplate = htmlTemplate
			.toString()
			.replace("${NAME}", user.name)
			.replace("${LINK}", verifyLink);

		const body = htmlTemplate;
		await Support.sendEmail({ subject, body, email });
		return result;
	} catch (error) {
		throw new Exception(`${Exception.REGISTER_FAILED} | ${error.message}`);
	}
};

const resetPassword = async (email) => {
	try {
		const user = await User.findOne({ email }).lean();

		if (!user) {
			throw new Exception(
				`${Exception.USER_NOT_FOUND} | User not found with this email`,
			);
		}
		const filePath = path.join(
			__dirname,
			"../template_html/reset_password.html",
		);
		// generate reset password email
		const subject = "Reset Password - MailGenius Authenticated Service";
		let htmlTemplate = await fs.readFile(filePath);
		const token = await Support.generate_jwt3days(user);
		const resetLink = `https://handy-maggot-creative.ngrok-free.app/recover?jwt=${token}`;
		htmlTemplate = htmlTemplate
			.toString()
			.replace("${NAME}", user.name)
			.replace("${RESET_LINK}", resetLink);

		const body = htmlTemplate;
		const send = await Support.sendEmail({ subject, body, email });
		return send;
	} catch (error) {
		throw new Exception(`Error in reset password service | ${error.message}`);
	}
};

const verifyRstPwd = async (token) => {
	try {
		const payload = jwt.verify(token);
		const decodedHeader = jwt.decode(token, { complete: true }).header;

		if (decodedHeader?.tag != "Reset Password") {
			throw new Exception(`Invalid token from Tag flag`);
		}
		const user = await User.findOne({ email: payload.email }).lean();
		if (!user) {
			throw new Exception(`User not found with this email`);
		}

		return user;
	} catch (error) {
		throw new Exception(
			`Error in verify reset password token | ${error.message}`,
		);
	}
};

const updateRsTPassword = async (token, password) => {
	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		const decodedHeader = jwt.decode(token, { complete: true }).header;

		if (decodedHeader?.tag != "Reset Password") {
			throw new Exception(`Invalid token from Tag flag`);
		}
		const user = await User.findOne({ email: payload.email });
		if (!user) {
			throw new Exception(`User not found with this email`);
		}

		const hashpwd = bcrypt.hashSync(password, 10);
		user.password = hashpwd;
		await user.save();
		return user;
	} catch (error) {
		throw new Exception(
			`Error in update reset password service | ${error.message}`,
		);
	}
};

const changePassword = async (token, oldPassword, newPassword) => {
	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		const email = payload.email;
		const user = await User.findOne({ email });

		if (!user) {
			throw new Exception(` User not found with this email`);
		}

		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			throw new Exception(`Invalid old password`);
		}
		const hashpwd = bcrypt.hashSync(newPassword, 10);
		user.password = hashpwd;
		await user.save();
		return true;
	} catch (error) {
		throw new Exception(`Error in change password service | ${error.message}`);
	}
};

const updateProfile = async (token, name, phone) => {
	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		const email = payload.email;
		const user = await User.findOne({ email });

		if (!user) {
			throw new Exception(` User not found with this email`);
		}

		user.name = name;
		user.phone = phone;
		await user.save();
		return user;
	} catch (error) {
		throw new Exception(`Error in change profile service | ${error.message}`);
	}
};

const AuthenticateService = {
	login,
	register,
	findUserByEmail,
	resetPassword,
	updateRsTPassword,
	changePassword,
	updateProfile,
};

module.exports = AuthenticateService;