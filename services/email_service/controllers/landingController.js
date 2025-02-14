const LandingService = require("../services/landingService.js");

const retrieve = async (req, res) => {
	try {
		const user = req.user;
		const response = await LandingService.retrieve(user);
		return res.status(200).json({
			message: "Landing page retrieved successfully",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to retrieve | ${error.message}`,
		});
	}
};

const retriveHTML = async (req, res) => {
	try {
		const { id } = req.query;
		const response = await LandingService.retrieveHTML(id);
		return res.status(200).json({
			message: "Landing page retrieved successfully",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to retrieve | ${error.message}`,
		});
	}
};

const patchData = async (req, res) => {
	try {
		const user = req.user;
		const fields = req.body;

		const response = await LandingService.patch(user, fields);

		return res.status(200).json({
			message: `Landing page updated data`,
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to patch data | ${error.message}`,
		});
	}
};

const scratchDesign = async (req, res) => {
	try {
		const user = req.user;
		const data = req.body;
		const response = await LandingService.scratchDesign(user, data);
		return res.status(200).json({
			message: "Saved",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to patch sratch | ${error.message}`,
		});
	}
};

const retrieveDesign = async (req, res) => {
	try {
		const user = req.user;
		const response = await LandingService.retrieveDesign(user);

		return res.status(200).json({
			message: "Getting data successfully",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to retrieving scratch design | ${error.message}`,
		});
	}
};

const saveHTML = async (req, res) => {
	try {
		const user = req.user;
		const { html } = req.body;
		const response = await LandingService.saveHTML(user, html);
		return res.status(200).json({
			message: "HTML saved",
			data: response,
		});
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to save HTML | ${error.message}`,
		});
	}
};
const LandingController = {
	retrieve,
	patchData,
	scratchDesign,
	retrieveDesign,
	saveHTML,
	retriveHTML
};

module.exports = LandingController;
