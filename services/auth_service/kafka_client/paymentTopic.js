const { producer, consumer } = require("./index.js");

const createUserPaymentProducer = async (user, requestId) =>{
    await producer.send({
        topic: "create_user_payment",
        messages: [
            {
                value: JSON.stringify({user, requestId})
            }
        ]
    })
}

module.exports = createUserPaymentProducer;