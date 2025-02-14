const { loginGoogle, refresh, validate } = require('../services/authorizationService.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const Exception = require('../exceptions/exception.js');

// renew access token
const refreshToken = async (req, res) => {
    try {
        const { ACCESS_TOKEN, REFRESH_TOKEN } = req.body;
        const response = await refresh(ACCESS_TOKEN, REFRESH_TOKEN);
        res.status(HttpStatusCode.OK).json({
            message: "Renew access token successfully",
            data: response,
        });
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "TOKEN FAILED",
            error: error.message,
        });
    }
}
// check token validity
const validateToken = async (req, res) => {
    try{
        const { TOKEN } = req.body;
        const response = await validate(TOKEN);
        res.status(HttpStatusCode.OK).json({
            message: "Validate token successfully",
            data: response,
        });
    }catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "VALIDATE TOKEN FAILED",
            error: error.message,
        });
    }
};

const verifyTokenGoogle = async (req, res) => {
    try{
        const {user, idToken} = req.body;
        const response = await loginGoogle(user, idToken);
        // Implement Google OAuth verification
        res.status(HttpStatusCode.OK).json({
            message: "Google OAuth verification successful",
            data: {...response}
        });
    }catch(error){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "GOOGLE OAUTH VERIFICATION FAILED",
            error: error.message,
        });
    }
}
module.exports = {
    refreshToken,
    validateToken,
    verifyTokenGoogle
};
