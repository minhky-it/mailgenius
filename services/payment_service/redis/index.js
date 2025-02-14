const Redis = require('ioredis');
const redis = new Redis({
    host: 'redis',   // Địa chỉ Redis
    port: 6379,          // Cổng Redis mặc định
    // password: 'yourpassword', // Nếu bạn có mật khẩu
});

module.exports = redis;