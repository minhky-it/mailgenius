const { Kafka } = require("kafkajs");

// Initialize
const kafka = new Kafka({
    clientId: "payment-service",
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
    payment: kafka.consumer({
        groupId: "payment-service-consumer",
    }),
    auth: kafka.consumer({
        groupId: "auth-service-consumer",
    }),
    plan: kafka.consumer({
        groupId: "plan-service-consumer",
    })
}

module.exports = {
    producer,
    consumer,
    kafka
}