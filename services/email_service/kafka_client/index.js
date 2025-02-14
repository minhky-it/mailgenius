const { Kafka, Partitioners } = require("kafkajs");

// Initialize
const kafka = new Kafka({
	clientId: "email-service",
	brokers: ["kafka:9092"],
	retry: {
		retries: 10,
		factor: 1.5,
		minTimeout: 1000,
		maxTimeout: 5000,
	},
});

const producer = kafka.producer();
const consumer = {
	auth: kafka.consumer({
		groupId: "email-service-consumer",
		autoOffsetReset: "earliest",
		sessionTimeout: 30000,
		heartbeatInterval: 3000,
	}),
	plan: kafka.consumer({
		groupId: "plan-service-consumer-email",
	}),
};

module.exports = {
	producer,
	consumer,
	kafka,
};
