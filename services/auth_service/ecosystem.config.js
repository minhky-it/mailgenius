module.exports = {
	apps: [
		{
			name: "my-app",
			script: "./index.cjs", // File chính của ứng dụng
			instances: "max", // Tối đa hóa số instance dựa trên số CPU
			exec_mode: "cluster", // Chạy dưới chế độ cluster
			watch: false, // Theo dõi file thay đổi
			max_memory_restart: "500M", // Restart nếu vượt quá 200MB
			max_restarts: 3,
			restart_delay: 10000,
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
