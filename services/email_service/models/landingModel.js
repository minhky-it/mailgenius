const mongoose = require("mongoose");

const LandingSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: false,
		default: "MailGenius Landing Page",
	},
	description: {
		type: String,
		required: false,
	},
	metadata: {
		type: String,
		required: false,
	},
	keywords: {
		type: String,
		required: false
	},
	content: {
        type: Object,
		required: false,
        default: {},
    },
	status: {
		type: String,
		enum: ["public", "hidden"],
		default: "active",
	},
	html: {
		type: String,
		required: false,
		default: "<html></html>",
	},
	string_url: {
		type: String,
		required: false,
		default: `${process.env.SERVER_FE_URL}/landing?id=invalid`,
	}
});
const LandingModel = mongoose.model("Landing", LandingSchema);
module.exports = LandingModel;
