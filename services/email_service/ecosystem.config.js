module.exports = {
    apps: [
      {
        name: 'email-app',
        script: './index.js', // File chính của ứng dụng
        instances: 'max', // Tối đa hóa số instance dựa trên số CPU
        exec_mode: 'cluster', // Chạy dưới chế độ cluster
        watch: false, // Theo dõi file thay đổi
        max_restarts: 3,
        max_memory_restart: '500M', // Restart nếu vượt quá 500MB
        restart_delay: 10000, 
        env: {
          NODE_ENV: 'dev',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  