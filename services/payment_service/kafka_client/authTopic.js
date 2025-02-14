const { producer, consumer } = require("./index.js");

// Bộ nhớ tạm để lưu kết quả xác thực
const authResults = new Map();

// Lắng nghe phản hồi từ auth-service
const listenAuthResponses = async () => {
    await consumer.auth.connect();
    await consumer.auth.subscribe({ topic: 'auth-responses', fromBeginning: false });

    await consumer.auth.run({
        eachMessage: async ({ topic, partition, message }) => {
            const { requestId, isValid, user } = JSON.parse(message.value.toString());
            authResults.set(requestId, {isValid, user}); // Lưu kết quả vào bộ nhớ tạm
        },
    });
};

// Gửi yêu cầu xác thực
const sendAuthRequest = async (token, requestId) => {
    await producer.send({
        topic: 'auth-requests',
        messages: [
            { value: JSON.stringify({ token, requestId }) },
        ],
    });
};

// Receive auth request from auth-service
const waitForAuthResult = (requestId) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            authResults.delete(requestId); // Xóa kết quả nếu hết hạn
            reject(false);
        }, 5000); // Timeout sau 5 giây nếu không có phản hồi

        const interval = setInterval(() => {
            if (authResults.has(requestId)) {
                const {isValid, user} = authResults.get(requestId);
                clearTimeout(timeout);
                clearInterval(interval);
                authResults.delete(requestId); // Xóa kết quả sau khi xử lý
                resolve({isValid, user});
            }
        }, 100); // Kiểm tra kết quả mỗi 100ms
    });
};

module.exports = AuthKafka = {
    listenAuthResponses,
    sendAuthRequest,
    waitForAuthResult
}