const { producer, consumer } = require("./index.js");
const jwt = require("jsonwebtoken");

const authenticateToken = (token) => {
	try {
		if (token.startsWith("Bearer ")) {
			token = token.slice(7); // Remove 'Bearer ' prefix
		}
		jwt.verify(token, process.env.SECRET_KEY);
		return {
			isValid: true,
			user: jwt.decode(token),
		};
	} catch (error) {
		return {
			isValid: false,
			error: error.message,
			user: null,
		};
	}
};

const listenAuthRequests = async () => {
	await consumer.subscribe({ topic: "auth-requests", fromBeginning: false });
	// await consumer.assign([{ topic: "auth-requests", partition: 0 }]);

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const { token, requestId } = JSON.parse(message.value.toString());
			const { isValid, user } = authenticateToken(token);

			await producer.connect();
			await producer.send({
				topic: "auth-responses",
				messages: [
					{ value: JSON.stringify({ requestId, isValid, user }), partition: 0 },
				],
			});
		},
	});
};

module.exports = listenAuthRequests;
