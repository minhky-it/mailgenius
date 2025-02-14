const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis',   // Địa chỉ Redis (hoặc tên dịch vụ trong Docker Compose nếu bạn đang chạy Redis trong container)
    port: 6379,          // Cổng Redis mặc định
    // password: 'yourpassword'  // Mật khẩu bạn đã cấu hình trong redis.conf
});

module.exports = redis;