const UserPayment = require("../models/UserPayment.js");
const Transaction = require("../models/Transaction.js");
const Support = require("../supports/index.js");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const redis = require("../redis/index.js");
const create = async (user, requestId) => {
	try {
		let payment = await UserPayment.findOneAndUpdate(
			{ user_id: user._id },
			{ $setOnInsert: { user_id: user._id } },
			{ new: true, upsert: true },
		);

		return payment;
	} catch (error) {
		throw new Error(`Error creating user payment | ${error.message}`);
	}
};

const view = async (user) => {
	try {
		const cacheKey = `payment:${user.id}`;
		const cache = await redis.get(cacheKey);
		if (cache) {
			return JSON.parse(cache);
		}

		let payment = await UserPayment.findOne({ user_id: user.id });
		if (!payment){
			payment = await create(user, Support.generateRequestId());
		}

		await redis.set(cacheKey, JSON.stringify(payment));
		return payment;
	} catch (error) {
		throw new Error(`Error viewing user payment | ${error.message}`);
	}
};

const createPayment = async (user_id, amount) => {
	try {
		if (!user_id) {
			throw new Error("User ID is required");
		}

		const request_id = Support.generateRequestId();
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "vnd",
			metadata: { user_id, requestId: request_id },
			payment_method_types: ["card"],
		});

		const transaction = new Transaction({
			user_id,
			platform: "stripe",
			platform_id: "",
			request_id: request_id,
			transaction_type: "card",
			amount,
		});

		// save transaction
		await transaction.save();
		const cacheKey = `payment:${user_id}`;
		await redis.del(cacheKey);

		return {
			clientSecret: paymentIntent.client_secret,
		};
	} catch (error) {
		throw new Error(`Error creating payment | ${error.message}`);
	}
};

const confirmPayment = async (itent) => {
	try {
		const { metadata, amount, id } = await stripe.paymentIntents.retrieve(
			itent.id,
		);
		const { user_id, requestId } = metadata;

		// update payment of user
		const payment = await UserPayment.findOne({ user_id });
		payment.coins += amount;
		await payment.save();

		const transaction = await Transaction.findOne({
			user_id,
			request_id: requestId,
		});

		transaction.updated = Date.now();
		transaction.status = "success";
		transaction.platform_id = id;
		await transaction.save();
		const cacheKey = `payment:${user_id}`;
		await redis.del(cacheKey);
		return transaction;
	} catch (error) {
		throw new Error(`Error updating payment status | ${error.message}`);
	}
};

const PaymentService = {
	create,
	view,
	createPayment,
	confirmPayment,
};

module.exports = PaymentService;
