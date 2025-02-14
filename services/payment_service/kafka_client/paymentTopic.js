const { producer, consumer } = require("./index.js");
const PaymentService = require("../services/paymentService.js");

const listenCreateUserPayment = async () => {
    // from auth service
    await consumer.payment.connect();
    await consumer.payment.subscribe({ topic: "create_user_payment", fromBeginning: false });

    await consumer.payment.run({
        eachMessage: async ({topic, partition, message}) => {
            const { user, requestId } = JSON.parse(message.value.toString());

            await PaymentService.create(user, requestId);
        }
    });
};

module.exports = listenCreateUserPayment;