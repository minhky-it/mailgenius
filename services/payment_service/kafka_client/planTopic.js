const { producer, consumer } = require("./index.js");

const planResults = new Map();

const listenPlanResponses = async () => {
    await consumer.plan.connect();
    await consumer.plan.subscribe({ topic: 'plan-responses', fromBeginning: false });

    await consumer.plan.run({
        eachMessage: async ({ topic, partition, message }) => {
            const { requestId, plan } = JSON.parse(message.value.toString());
            planResults.set(requestId, plan);
        },
    });
};

const sendPlanRequest = async (user_id, plan, requestId) => {
    await producer.send({
        topic: 'plan-requests',
        messages: [
            { value: JSON.stringify({ user_id, plan, requestId }) },
        ],
    });

    const returnPlan  = await waitForPlanResult(requestId);
    if (!returnPlan) {
        throw new Error("Error requesting plan: " + requestId);
    }
    return returnPlan;
};

// Receive auth request from auth-service
const waitForPlanResult = (requestId) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            planResults.delete(requestId); // Xóa kết quả nếu hết hạn
            reject(false);
        }, 5000); // Timeout sau 5 giây nếu không có phản hồi

        const interval = setInterval(() => {
            if (planResults.has(requestId)) {
                const plan = planResults.get(requestId);
                clearTimeout(timeout);
                clearInterval(interval);
                planResults.delete(requestId); // Xóa kết quả sau khi xử lý
                resolve(plan);
            }
        }, 100); // Kiểm tra kết quả mỗi 100ms
    });
};


module.exports = PlanKafka = {
    sendPlanRequest,
    listenPlanResponses
};