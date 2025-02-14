const AuthenticateService = require('../services/authenticationService.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const Exception = require('../exceptions/exception.js');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate email and password
        if (!email || !password) {
            return res.status(503).json({
                message: "Invalid email or password"
            });
        }
        
        const response = await AuthenticateService.login(email, password);


        res.status(HttpStatusCode.OK).json({
            message: Exception.LOGIN_SUCCESS,
            data: {
                ...response
            },
        });
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: Exception.LOGIN_FAILED,
            error: error.message,
        });
    }
}

const register = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body;

        // Validate email and password and confirm password
        if (password !== confirm_password) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Password and confirm",
            });
        }

        const existingUser = await AuthenticateService.findUserByEmail(email, password);

        if (existingUser) {
            return res.status(HttpStatusCode.CONFLICT).json({
                message: Exception.REGISTER_FAILED,
            });
        }

        const newUser = await AuthenticateService.register({ email, password });

        return res.status(HttpStatusCode.INSERT_OK).json({
            message: Exception.REGISTER_SUCCESS,
            data: newUser,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: Exception.REGISTER_FAILED,
            error: `Can not regist| ${error.message}`,
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const { name, phone } = req.body;
        const response = await AuthenticateService.updateProfile(token, name, phone);

        res.status(HttpStatusCode.OK).json({
            message: "Profile updated successfully",
            data: { ...response }
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to update profile | ${error.message}`,
            error: error.message,
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await AuthenticateService.resetPassword(email);
        res.status(HttpStatusCode.OK).json({
            message: "An email resetting was sent to your email address",
            data: { ...response }
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to reset password | ${error.message}`,
            error: error.message,
        });
    }
}

const verifyTokenRstPwd = async (req, res) => {
    try {
        const { token } = req.body;
        const response = await AuthenticateService.verifyTokenRstPwd(token);
        res.status(HttpStatusCode.OK).json({
            message: "Token is valid",
            data: { ...response }
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Token verification failed",
            error: error.message,
        });
    }
}

const rstPwdRenew = async (req, res) => {
    try {
        const { token, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Password and confirm password must be the same",
            });
        }

        const response = await AuthenticateService.updateRsTPassword(token, password);
        res.status(HttpStatusCode.OK).json({
            message: "Password reset successful",
            data: { ...response }
        });
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to reset password | ${error.message}`,
            error: error.message,
        });
    }
}

const changePassword = async (req, res) => {
    try {
        // get token from header
        const token = req.headers['authorization'].split(' ')[1];
        const { current_password, new_password, confirm_new_password } = req.body;

        if (new_password !== confirm_new_password) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "New password and confirm password must be the same",
            });
        }

        const response = await AuthenticateService.changePassword(token, current_password, new_password);

        res.status(HttpStatusCode.OK).json({
            message: "Password change successful",
            data: response
        });

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to change password | ${error.message}`,
            error: error.message,
        });
    }
}
const AuthenticateController = {
    login,
    register,
    resetPassword,
    verifyTokenRstPwd,
    rstPwdRenew,
    changePassword,
    updateProfile,
}

module.exports = AuthenticateController;
