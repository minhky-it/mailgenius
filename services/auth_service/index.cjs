const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const { producer, consumer } = require("./kafka_client/index.js");
const listenAuthRequests = require("./kafka_client/authentication.js");
const init = require("./init/index.js");
const redis = require("./redis/index.js");
const {
	authenticationRouter,
	authorizationRouter,
	userManagementRouter,
} = require("./routes/index.js");

async function startServer() {
	try {
		// Initialize Express app
		const app = express();
		const port = 3001;
		app.use(express.json());

		// MongoDB connection
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Redis connection
		await redis.on("connect", async () => {
			console.log("Redis connected");
		})

		// Kafka producer and consumer
		producer.connect();
		consumer.connect();
		await listenAuthRequests();

		// Router list
		app.use("/authentication", authenticationRouter);
		app.use("/authorization", authorizationRouter);
		app.use("/user-management", userManagementRouter);

		// Initialize database
		init();

		// Start the Express server
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (error) {
		throw new Error(`Failed to start server | ${error.message}`);
	}
}

startServer();
