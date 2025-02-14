const Support = require("../support/index.js");
const Recipient = require("../models/recipientsModel.js");
const Campaign = require("../models/campaignModel.js");
const Blacklist = require("../models/blacklistModel.js");
const moment = require('moment-timezone');
const schedule = require('node-schedule');

const sendOne = async (body) => {
	try {
		await Support.transporter.sendMail(Support.mailOptions(body));
	} catch (error) {
		throw new Error(`Failed to send this email | ${error.message}`);
	}
};

const trackByPixel = async (campaign_id, email) => {
	try {
		console.log(campaign_id, email);
		const recipient = await Recipient.findOneAndUpdate(
			{ campaign_id, email },
			{
				$set: {
					status: "opened",
					opened_at: Date.now(),
				},
			},
			{ new: true }, // Trả về đối tượng sau khi cập nhật
		).exec();
		return recipient;
	} catch (error) {
		throw new Error(`Failed to track delivery by pixel | ${error.message}`);
	}
};

const redirectTracking = async (campaign_id, email) => {
	try {
		console.log(campaign_id, email);
		const recipient = await Recipient.findOneAndUpdate(
			{ campaign_id, email },
			{
				$set: {
					status: "clicked",
					clicked_at: Date.now(),
				},
			},
			{ new: true }, // Trả về đối tượng sau khi cập nhật
		).exec();
		return recipient;
	} catch (error) {
		throw new Error(`Failed to redirect tracking | ${error.message} `);
	}
};

const sendEmail = async (user, campaign_id, html) => {
	try {
		const campaign = await Campaign.findOne({
			_id: campaign_id,
			user_id: user.id,
		});
		

		if (!campaign) throw new Error("Campaign not found");

		campaign.status = "active";
		const recipients = await Recipient.find({ campaign_id }).exec();

		if (recipients.length === 0) {
			throw new Error("No recipients found in this campaign");
		}

		// Gửi email đồng thời cho tất cả người nhận
		let emailCount = 0;
		await Promise.all(
			recipients.map(async (recipient) => {
				const encodedHTML = encodeHTML(
					html,
					campaign_id,
					recipient.email,
					recipient.name,
				);
				const body = {
					html: encodedHTML,
					email: recipient.email,
					subject: campaign.subject,
				};
				await Support.transporter.sendMail(Support.mailOptions(body));
				emailCount++;
			}),
		);
		return emailCount;
	} catch (error) {
		throw new Error(`Failed to send email | ${error.message} `);
	}
};

const sendSchedule = async (user, campaign_id, html, scheduleDate) => {
	try {
		schedule.scheduleJob(scheduleDate, async () => {
			try {
				console.log('Scheduled email sent');
				await sendEmail(user, campaign_id, html);
			} catch (err) {
				console.error("Error during scheduled email:", err.message);
			}
		});
		return `Emails scheduled to be sent at ${scheduleDate}`;
	} catch (error) {
		console.error(`Error scheduling email: ${error.message}`);
		throw error;
	}
};

const getClickedRecipients = async (user, campaign_id) => {
	try {
		const recipients = await Recipient.find({ campaign_id });
		const total = recipients.length;

		// Analytics clicking
		const clickedList = recipients.filter(
			(recipient) => recipient.clicked_at !== null,
		);
		const clicking = {
			list: clickedList,
			clicked: clickedList.length,
			percentage: Math.round((clickedList.length / total) * 100),
		};

		const openedList = recipients.filter(
			(recipient) => recipient.opened_at !== null,
		);
		const opening = {
			list: openedList,
			opened: openedList.length,
			percentage: Math.round((openedList.length / total) * 100),
		};

		const unwatchedList = recipients.filter(
			(recipient) =>
				recipient.clicked_at === null && recipient.opened_at === null,
		);
		const unwatch = {
			list: unwatchedList,
			unwatch: unwatchedList.length,
			percentage: Math.round((unwatchedList.length / total) * 100),
		};

		const blockedList = recipients.filter((recipient) => recipient.status === 'blocked');
		const blocked = {
			list: blockedList,
            blocked: blockedList.length,
            percentage: Math.round((blockedList.length / total) * 100),
		}
		return {
			total,
			clicking,
			opening,
			unwatch,
			blocked
		};
	} catch (error) {
		throw new Error(`Failed to get clicked recipients | ${error.message} `);
	}
};

const insertBlacklist = async (campaign_id, email, message) => {
	try {
		const campaign = await Campaign.findOne({_id: campaign_id});
		if(!campaign_id || !email || !campaign){
			throw new Error(`The campaign not found!`);
		}

		const recipient = await Recipient.findOne({campaign_id, email});
		if(!recipient){
			throw new Error(`The recipient in ${campaign.name} not found`);
		}

		recipient.error_message = message;
		recipient.status = 'blocked';
		recipient.updated_at = Date.now();
		await recipient.save();

		let blacklist = await Blacklist.findOne({email});
		if(!blacklist){
			blacklist = new Blacklist({
				email,
				reason: message,
			})
		}

		blacklist.reason = message;
		await blacklist.save();

		return blacklist;
	} catch (error) {
		throw new Error(`Error to add ${email} to Blacklist | ${error.message}`);
	}
}


const encodeHTML = (html, campaign_id, email, name) => {
	try {
		const trackByImg = `<table role="presentation" style="width: 100%; padding: 20px; background-color: #f0f0f5; text-align: center; color: #333;">
		<tr>
			<td style="padding-right: 30px;">
			<span style="font-size: 14px; font-weight: 600; color: #333;">@mailgenius.store</span>
			</td>
			<td style="padding-right: 30px;">
			<a href="${process.env.SERVER_FE_URL}/blacklist?campaign_id=${campaign_id}&email=${email}" target="_blank" style="font-size: 14px; text-decoration: none; color: #007aff; font-weight: 500;">Do not receive this email</a>
			</td>
			<td>
			<span style="font-size: 14px; font-weight: 600; color: #333;">https://mailgenius.store</span>
			</td>
		</tr>
		</table>
		<img src="${process.env.SERVER_URL}/delivery/tracking?campaign_id=${campaign_id}&email=${email}" style="display:none" alt="mailgenius.store" />`;
		html = html
			.replace(/customerName/g, name)
			.replace(/href="([^"]+)"/g, (match, p1) => {
				return `href="${process.env.SERVER_URL
					}/delivery/redirect?campaign_id=${campaign_id}&email=${email}&url=${encodeURIComponent(
						p1,
					)}"`;
			});

		return html.replace(/<\/body>/, `${trackByImg}</body>`);
	} catch (error) {
		throw new Error(`Failed to encode HTML | ${error.message} `);
	}
};
const DeliveryService = {
	sendOne,
	trackByPixel,
	redirectTracking,
	sendEmail,
	sendSchedule,
	getClickedRecipients,
	insertBlacklist
};

module.exports = DeliveryService;
