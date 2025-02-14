const { producer, consumer } = require("./index.js");
const PlanService = require("../services/planService.js");

const listenPlanRequest = async () => {
	try {
		await consumer.plan.connect();
		await consumer.plan.subscribe({
			topic: "plan-requests",
			fromBeginning: false,
		});

		await consumer.plan.run({
			eachMessage: async ({ topic, partition, message }) => {
				const {user_id, plan, requestId} = JSON.parse(message.value.toString());
				const result = await PlanService.create(requestId, user_id, plan);

				await producer.send({
					topic: "plan-responses",
					messages: [{ value: JSON.stringify({ requestId, plan: result }) }],
				});
			},
		});
	} catch (e) {
		console.error(`Error in listenPlanRequest | ${e.message}`);
		await producer.send({
			topic: "plan-responses",
			messages: [{ value: JSON.stringify({ requestId, result: e.message }) }],
		});
	}
};

module.exports = PlanKafka = {
	listenPlanRequest,
};
