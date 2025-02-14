const { Kafka, Partitioners } = require('kafkajs');

// Initialize Kafka
const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['kafka:9092'],  // Kafka broker address
});

const producer = kafka.producer({});
const consumer = kafka.consumer({ 
    groupId: 'auth-group', 
    autoOffsetReset: 'earliest',
    sessionTimeout: 30000,  
    heartbeatInterval: 3000,
});


module.exports = {
    kafka,
    producer,
    consumer
}