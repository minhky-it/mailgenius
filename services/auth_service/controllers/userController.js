const UserService = require('../services/userService.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');

// View list of users
const listUser = async (req, res) => {
    try {
        const users = await UserService.list(req.user);
        res.status(HttpStatusCode.OK).json({
            message: "List of users",
            data:  users,
        });
    } catch (error) {
        res.status(HttpStatusCode.FORBIDDEN).json({
            message: `Couldn't list users | ${error.message}`,
            error: error.message,
        });
    }
}

// View user by email
const findUsers = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UserService.findByEmail(email);

        if (user) {
            res.status(HttpStatusCode.OK).json({
                message: "User found",
                data: user,
            });
        } else {
            res.status(HttpStatusCode.NOT_FOUND).json({
                message: "User not found",
                data: null
            });
        }
    } catch (error) {
        res.status(HttpStatusCode.FORBIDDEN).json({
            message: "Couldn't find user",
            error: `Error in user controller | ${error.message}`,
        });
    }
}

// Get connection of user
const getConnection = async (req, res) => {
    try{
        const id = req.user.id;
        const response = await UserService.getConnections(id);

        res.status(HttpStatusCode.OK).json({
            message: "User connections",
            data: response,
        });
    }catch(error){
        res.status(HttpStatusCode.FORBIDDEN).json({
            message: `Couldn't get connection | ${error.message}`,
            error: error.message,
        });
    }
};

const patchProfile = async (req, res) => {
    try{
        const form = req.body;
        const image = req.file;
        const response = await UserService.patchProfile(req.user, form, image);
        res.status(HttpStatusCode.OK).json({
            message: "User profile updated successfully",
            data: response
        });
    }catch(error){
        res.status(HttpStatusCode.FORBIDDEN).json({
            message: `Couldn't patch profile | ${error.message}`,
            error: error.message,
        });
    }
}


module.exports = userController = {
    listUser,
    findUsers,
    getConnection,
    patchProfile
}