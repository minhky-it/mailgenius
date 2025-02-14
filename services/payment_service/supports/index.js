
const generateRequestId = () => {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const Support = {
    generateRequestId,
}

module.exports = Support;