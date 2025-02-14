const DeliveryService = require("../services/deliveryService.js");

const sendOne = async (req, res) => {
	try {
		const body = req.body;
		const response = await DeliveryService.sendOne(body);
		return res.status(200).json({
			message: "Email sent successfully",
			data: response,
		});
	} catch (e) {
		return res.status(500).json({
			error: "Failed to send email",
			message: `Failed to send email | ${e.message}`,
		});
	}
};

const trackByPixel = async (req, res) => {
	try {
		const { campaign_id, email } = req.query;
		console.log(email);
		const response = await DeliveryService.trackByPixel(campaign_id, email);

		res.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": "0",
		});
		res.end();
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to track by pixel | ${error.message}`,
		});
	}
};

const redirectTracking = async (req, res) => {
	try {
		const { campaign_id, email, url } = req.query;
		const response = await DeliveryService.redirectTracking(campaign_id, email);
		res.redirect(url);
		res.end();
	} catch (error) {
		console.error('Error in redirect tracking:', error);
		return res.status(500).json({
			error: 'Internal Server Error',
			message: `Failed to redirect tracking | ${error.message}`
		});
	}
}

const insertBlacklist = async (req, res) => {
	try {
		const { campaign_id, email, message } = req.body;
		const response = await DeliveryService.insertBlacklist(campaign_id, email, message);

		return res.status(200).json({
			message: "OK",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to add the email to blacklist | ${error.message}`
		});
	}
};


const sendEmail = async (req, res) => {
	try {
		const { campaign_id, html } = req.body;
		const response = await DeliveryService.sendEmail(req.user, campaign_id, html);
		return res.status(200).json({
			message: "Email sent successfully",
			data: response,
		});
	}
	catch (error) {
		return res.status(500).json({
			error: "Failed to send email",
			message: `Failed to send email | ${error.message}`,
		});
	}
}

const sendSchedule = async (req, res) => {
	try {
		const { campaign_id, html, schedule } = req.body;
		const response = await DeliveryService.sendSchedule(req.user, campaign_id, html, schedule);
		return res.status(200).json({
			message: "Successfully scheduled email sending",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to set schedule | ${error.message}`,
		});
	}
}

const getClickedRecipients = async (req, res) => {
	try {
		const { campaign_id } = req.query;
		const response = await DeliveryService.getClickedRecipients(req.user, campaign_id);
		return res.status(200).json({
			message: "Clicked recipients fetched successfully",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to get clicked recipients | ${error.message}`,
		});
	}
}

const DeliveryController = {
	sendOne,
	trackByPixel,
	redirectTracking,
	sendEmail,
	sendSchedule,
	getClickedRecipients,
	insertBlacklist
};

module.exports = DeliveryController;
