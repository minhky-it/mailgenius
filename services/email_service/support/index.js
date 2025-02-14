const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
	host: "smtp.hostinger.com",
	port: 465,
	secure: true,
	auth: {
		user: "advertise@mailgenius.fun",
		pass: "Tdtu@674",
	},
});

const mailOptions = (body) => {
	return {
		from: "advertise@mailgenius.fun",
		to: body.email,
		subject: body.subject,
		html: body.html,
	};
};
const generateRequestId = () => {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
};


module.exports = Support = {
	transporter,
	mailOptions,
    generateRequestId
}