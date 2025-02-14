const Support = require("../support/index.js");
const AuthKafka = require("../kafka_client/authTopic.js");


const authenticationMiddleware = async (req, res, next) => {
    try{
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({ 
                error: 'Token is required',
                message: "Authentication is required"
            });
        }
        const requestId = Support.generateRequestId();
    
        await AuthKafka.sendAuthRequest(token, requestId);
        const {isValid, user} = await AuthKafka.waitForAuthResult(requestId);
    
        if (!isValid) {
            return res.status(428).json({
                error: 'Invalid token',
                message: "Invalid token"
            });
        }
        req.user = user;
        next();
    }catch(error){
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            messages: `Failed to authenticate | ${error.message}` });
    }
}

module.exports = authenticationMiddleware;