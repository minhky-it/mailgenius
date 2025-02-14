const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV || "dev"}`,
});
const init = require("./init/index.js");
const { producer, consumer } = require("./kafka_client/index.js");
// const listenCreateUserPayment = require("./kafka_client/paymentTopic.js");
const AuthKafka = require("./kafka_client/authTopic.js");
const PlanKafka = require("./kafka_client/planTopic.js");
const redis = require("./redis/index.js");
const {
	PaymentRouter,
	VnpayRouter,
	TransactionRouter,
	PlanRouter
} = require("./routes/index.js");
async function startServer() {
	try {
		const app = express();
		const port = 3003;

		app.use(express.json());

		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Redis
		await redis.on("connect", () => {
			console.log("Connected to Redis");
		});

		// Kafka producer and consumer
		producer.connect();
		consumer.auth.connect();
		consumer.payment.connect();
		await AuthKafka.listenAuthResponses();
		await PlanKafka.listenPlanResponses();

		// Router list
		app.use("/payment", PaymentRouter);
		app.use("/vnpay", VnpayRouter);
		app.use("/transaction", TransactionRouter);
		app.use("/plan", PlanRouter);
		// Create a new configuration 
		init();
		// Start the Express server
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (error) {
		console.log(error);
	}
}
startServer();
