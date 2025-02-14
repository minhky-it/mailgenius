const express = require("express");
const { producer, consumer } = require("./kafka_client/index.js");
const {
	SEORouter,
	CampaignRouter,
	RecipientRouter,
	DeliveryRouter,
	PlanRouter,
	LandingRouter,
	TemplateRouter,
} = require("./routes/index.js");
const authenticationMiddleware = require("./middleware/authentication.js");
const AuthKafka = require("./kafka_client/authTopic.js");
const PlanKafka = require("./kafka_client/planTopic.js");
const mongoose = require("mongoose");
const redis = require("./redis/index.js");
require("dotenv/config");
async function startServer() {
	try {
		const app = express();
		const port = 3002;
		app.use(express.json({ limit: '50mb' }));

		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Connect to Redis
		await redis.on("connect", async () => {
			console.log("Connected to Redis");
		});

		await producer.connect();
		await consumer.auth.connect();
		await consumer.plan.connect();

		await AuthKafka.listenAuthResponses();
		await PlanKafka.listenPlanRequest();

		// Router list
		app.use("/campaign", CampaignRouter);
		app.use("/recipient", authenticationMiddleware, RecipientRouter);
		app.use("/delivery", DeliveryRouter);
		app.use("/seo", SEORouter);
		app.use("/plan", PlanRouter);
		app.use("/landing", LandingRouter);
		app.use("/template", TemplateRouter);
		// Start the Express server
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (err) {
		console.error("Error starting server:", err);
		throw new Error("Error starting server:", err);
	}
}

startServer();