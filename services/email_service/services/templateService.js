const Template = require("../models/templateModel.js");
const { CAMPAIGN_TYPE } = require("../enum/index.js");

const create = async (user, fields) => {
	try {
		const { name } = fields;
		const keyword = normalizeKeyword(name);
		const template = new Template({ ...fields, keyword: keyword, user_id: user.id });
		await template.save();
		return template;
	} catch (e) {
		throw new Error(`Error in creating template service | ${e.message}`);
	}
};

const views = async (user, type) => {
	try {
		const user_id = user.id;
		if (type === CAMPAIGN_TYPE.ALL) {
			const templates = await Template.find({ user_id })
				.sort({ create_at: -1 })
				.lean()
				.exec();

			const optimized = templates.map(({ content, ...rest }) => rest);
			return optimized;
		}
		const templates = await Template.find({ user_id, type })
			.sort({ create_at: -1 })
			.lean()
			.exec();

		return templates.map(({ content, ...rest }) => rest);
	} catch (error) {
		throw new Error(`Failed to get template views | ${error.message} `);
	}
};

const view = async (user, id) => {
	try {
		const user_id = user.id;
		const cacheKey = `template:${user_id}:${id}`;
		const cachedTemplate = await redis.get(cacheKey);

		if (cachedTemplate) {
			return JSON.parse(cachedTemplate);
		}

		const template = await Template.findOne({ _id: id, user_id }).lean().exec();
		if (!template) throw new Error("Template not found");

		await redis.setex(cacheKey, 3600, JSON.stringify(template)); // Lưu trong 1 giờ (3600 giây)
		return template;
	} catch (error) {
		throw new Error(`Failed to get template view | ${error.message} `);
	}
};

const storeContent = async (user, id, content) => {
	try {
		const template = await Template.findOne({ _id: id, user_id: user.id }).exec();
		if (!template) throw new Error("Template not found");

		template.content = content;

		await template.save();
		return template;
	} catch (error) {
		throw new Error(`Failed to store content | ${error.message} `);
	}
};

const loadContent = async (user, id) => {
	try {
		const template = await Template.findOne({ _id: id, user_id: user.id }).exec();
		if (!template) throw new Error("Template not found");
		return template.content;
	} catch (error) {
		throw new Error(`Failed to load content | ${error.message} `);
	}
};

const normalizeKeyword = (keyword) => {
	return keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const searchTmps = async (user, name, type) => {
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

		const templates = await Template.find({
			$and: regexQueries,
			...(type !== "all" && { type }),
			user_id: user.id,
		}).lean().exec();

		const sanitizedTemplate = templates.map(({ content, ...rest }) => rest);
		return sanitizedTemplate;
	} catch (error) {
		throw new Error(`Failed to search templates | ${error.message} `);
	}
};

const remove = async (user, _id) => {
	try {
		const user_id = user.id;
		const template = await Template.findOneAndDelete({ _id, user_id });
		if (!template) throw new Error("Template not found");
		return {
			template,
		};
	} catch (error) {
		throw new Error(`Failed to remove template | ${error.message} `);
	}
};

const update = async (user, fields) => {
	try {
		const template = await Template.findOne({
			_id: fields._id,
			user_id: user.id,
		});
		if (!template) throw new Error("Template not found");
		template.name = fields.name;
		template.subject = fields.subject;
		template.keyword = normalizeKeyword(template.name);
		template.update_at = Date.now();
		await template.save();
		return template;
	} catch (error) {
		throw new Error(`Error in updating template service | ${error.message}`);
	}
};

const TemplateService = {
	remove,
	update,
	view,
	views,
	create,
	storeContent,
	loadContent,
	searchTmps,
};

module.exports = TemplateService;