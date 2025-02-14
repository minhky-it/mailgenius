const Campaign = require("../models/campaignModel.js");
const Recipients = require("../models/recipientsModel.js");
const { CAMPAIGN_TYPE } = require("../enum/index.js");
const juice = require("juice");
const redis = require("../redis/index.js");
const Plan = require("../models/planModel.js");
const create = async (user, fields) => {
	try {
		const { name } = fields;
		const keyword = normalizeKeyword(name);
		const campaign = new Campaign({ ...fields, keyword: keyword, user_id: user.id });
		await campaign.save();

		const plan = await Plan.findOne({ user_id: user.id });
		if (!plan) throw new Error("User does not have a valid plan");
		plan.plan_service.campaign.data.daily += 1;
		plan.plan_service.campaign.data.total += 1;
		await plan.save();
		return campaign;
	} catch (e) {
		throw new Error(`Error in creating campaign service | ${e.message}`);
	}
};

const update = async (user, fields) => {
	try {
		const ACPT_KEYS = ["name", "subject", "description"];
		const cacheKey = `campaign:${user.id}:${fields._id}`;

		const campaign = await Campaign.findOne({
			_id: fields._id,
			user_id: user.id,
		});
		if (!campaign) throw new Error("Campaign not found");

		Object.keys(fields).forEach((key) => {
			if (ACPT_KEYS.includes(key)) {
				if (campaign[key] !== undefined) {
					campaign[key] = fields[key];
				}
			}
		});
		campaign.keyword = normalizeKeyword(campaign.name);
		campaign.update_at = Date.now();
		const result = await campaign.save();
		redis.del(cacheKey);
		const resultObject = result.toObject();
		delete resultObject.content;
		return resultObject;
	} catch (error) {
		throw new Error(`Error in updating campaign service | ${error.message}`);
	}
};

const views = async (user, type) => {
	try {
		const user_id = user.id;
		if (type === CAMPAIGN_TYPE.ALL) {
			const campaigns = await Campaign.find({ user_id })
				.sort({ create_at: -1 })
				.lean()
				.exec();

			const optimized = campaigns.map(({ content, ...rest }) => rest);
			return optimized;
		}
		const campaigns = await Campaign.find({ user_id, type })
			.sort({ create_at: -1 })
			.lean()
			.exec();

		return campaigns.map(({ content, ...rest }) => rest);
	} catch (error) {
		throw new Error(`Failed to get campaign views | ${error.message} `);
	}
};

const view = async (user, id) => {
	try {
		const user_id = user.id;
		const cacheKey = `campaign:${user_id}:${id}`;
		const cachedCampaign = await redis.get(cacheKey);

		if (cachedCampaign) {
			return JSON.parse(cachedCampaign);
		}

		const campaign = await Campaign.findOne({ _id: id, user_id }).lean().exec();
		if (!campaign) throw new Error("Campaign not found");

		delete campaign.content;

		await redis.setex(cacheKey, 3600, JSON.stringify(campaign)); // Lưu trong 1 giờ (3600 giây)
		return campaign;
	} catch (error) {
		throw new Error(`Failed to get campaign view | ${error.message} `);
	}
};

const remove = async (user, _id) => {
	try {
		const user_id = user.id;
		const campaign = await Campaign.findOneAndDelete({ _id, user_id });
		const recipients = await Recipients.findByCampaignIdandDelete(_id);
		if (!campaign) throw new Error("Campaign not found");
		return {
			campaign,
			recipients,
		};
	} catch (error) {
		throw new Error(`Failed to remove campaign | ${error.message} `);
	}
};

const viewType = async (except) => {
	try {
		return [...Object.values(CAMPAIGN_TYPE)].filter(
			(type) => !type.includes(except),
		);
	} catch (error) {
		throw new Error(`Failed to get campaign types | ${error.message} `);
	}
};

const storeContent = async (user, id, content) => {
	try {
		const campaign = await Campaign.findOne({ _id: id, user_id: user.id }).exec();
		if (!campaign) throw new Error("Campaign not found");

		campaign.content = content;

		await campaign.save();
		return campaign;
	} catch (error) {
		throw new Error(`Failed to store content | ${error.message} `);
	}
};

const loadContent = async (user, id) => {
	try {
		const campaign = await Campaign.findOne({ _id: id, user_id: user.id }).exec();
		if (!campaign) throw new Error("Campaign not found");
		return campaign.content;
	} catch (error) {
		throw new Error(`Failed to load content | ${error.message} `);
	}
};

const convertToTableLayout = async (content) => {
	try {
		// Optionally, clean the string of escape characters before processing
		const cleanContent = content
			.replace(/\\"/g, '"')
			.replace(/\\+/g, "")
			.toString();

		// Log the cleaned content
		console.log("Cleaned Content before juice: ", cleanContent);

		// Apply juice for CSS inlining
		const data = juice(cleanContent);

		// Log the final result after juice
		console.log("Content after juice: ", data);

		// Remove extra escape characters after juice
		const finalResult = data
			.replace(/\\"/g, '"')
			.replace(/\\+/g, "")
			.toString();

		return finalResult;
	} catch (error) {
		throw new Error(`Failed to convert to table layout | ${error.message}`);
	}
};

const normalizeKeyword = (keyword) => {
	return keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const searchCampaigns = async (user, name, type) => {
	try {
		const keywords = name.split(" ").map(normalizeKeyword);
		const regexQueries = keywords.map((keyword) => ({
			keyword: { $regex: new RegExp(keyword, "i") },
		}));

		if (type !== "all") {
			regexQueries.forEach(query => {
				query.type = type;
				query.user_id = user.id;
			});
		}

		const campaigns = await Campaign.find({
			$and: regexQueries,
			...(type !== "all" && { type }),
			user_id: user.id,
		}).lean().exec();

		const sanitizedCampaigns = campaigns.map(({ content, ...rest }) => rest);
		return sanitizedCampaigns;
	} catch (error) {
		throw new Error(`Failed to search campaigns | ${error.message} `);
	}
};

const CampaignService = {
	create,
	views,
	view,
	update,
	remove,
	viewType,
	storeContent,
	loadContent,
	convertToTableLayout,
	searchCampaigns,
};

module.exports = CampaignService;