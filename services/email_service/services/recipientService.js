const Recipient = require("../models/recipientsModel.js");
const Campaign = require("../models/campaignModel.js");

const addToCampaign = async (user, campaign_id, recipients) => {
	try {
		// Find the campaign
		const campaign = await Campaign.findOne({ _id: campaign_id, user_id: user.id });
		if (!campaign) throw new Error("Campaign not found");

		// Add the recipients to the campaign
		const output = [];
		for (let i = 0; i < recipients.length; i++) {
			const recipient = await Recipient.findOne({ campaign_id, email: recipients[i].email });
			if (recipient) {
				output.push(recipient);
				continue;
			}

			const newRecipient = new Recipient({
				campaign_id,
				email: recipients[i].email,
				name: recipients[i].name,
			});
			output.push(newRecipient);
			await newRecipient.save();
		}

		return output;
	} catch (error) {
		throw new Error(
			`Failed to add recipient to campaign | ${error.message} `,
		);
	}
};

const viewList = async (user, campaign_id) => {
	try {
		const campaign = await Campaign.findOne({
			_id: campaign_id,
			user_id: user.id,
		});
		if (!campaign) throw new Error("Campaign not found");

		const recipients = await Recipient.find({ campaign_id });

		return recipients.map(({ _id, email, name }) => ({ _id, email, name }));
	} catch (error) {
		throw new Error(`Failed to view recipient list | ${error.message} `);
	}
};

const removeRecipient = async (user, _id) => {
	try {
		const recipient = await Recipient.findOne({ _id });
		if (!recipient) throw new Error("Recipient not found in campaign");
		const campaign = await Campaign.findOne({
			_id: recipient.campaign_id,
			user_id: user.id,
		});
		if (!campaign) throw new Error("Unauthorized to delete this recipient");
		await recipient.deleteOne();

		return recipient;
	} catch (error) {
		throw new Error(
			`Failed to remove recipient from campaign | ${error.message} `,
		);
	}
};

const patchRecipient = async (user, _id, email, name) => {
	try {
		const recipient = await Recipient.findOne({ _id });
		if (!recipient) throw new Error("Recipient not found in campaign");
		const campaign = await Campaign.findOne({
			_id: recipient.campaign_id,
			user_id: user.id,
		});
		if (!campaign) throw new Error("Unauthorized to edit this recipient");
		recipient.email = email;
		recipient.name = name;
		await recipient.save();
		return recipient;
	} catch (error) {
		throw new Error(
			`Failed to patch recipient in campaign | ${error.message} `,
		);
	}
};
const RecipientService = {
	addToCampaign,
	viewList,
	removeRecipient,
	patchRecipient,
};

module.exports = RecipientService;
