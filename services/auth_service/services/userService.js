const User = require("../models/UserModel.js");
const UserConnection = require("../models/UserConnectionModel.js");
const Cloudinary = require("../cloudinary/index.js");
const Support = require("../supports/index.js");
const { USER_ROLE } = require("../enum/index.js");
const redis = require("../redis/index.js");
const list = async (user) => {
    try {
        const { role } = user;
        if (role !== USER_ROLE.ADMIN) {
            throw new Error("Unauthorized");
        }
        const users = await User.find().lean();
        // remove password

        users.forEach(user => delete user.password);
        return users;
    } catch (error) {
        throw new Error(`Failed to list users | ${error.message}`);
    }
};

const findByEmail = async (email) => {
    try {
        const cacheKey = `user:${email}`;
        const userCache = await redis.get(cacheKey);
        if (userCache) {
            return JSON.parse(userCache);
        }
        const user = await User.findOne({ email }).lean();
        // remove password
        delete user.password;
        redis.setex(cacheKey, 3600, JSON.stringify(user));
        return user;
    } catch (error) {
        throw new Error("Failed to find user by email");
    }
}

const getConnections = async (id) => {
    try{
        const cacheKey = `connections:${id}`;
        const connectionsCache = await redis.get(cacheKey);
        if(connectionsCache){
            return JSON.parse(connectionsCache);
        }

        const connections = await UserConnection.findOne({ user_id: id }).lean();
        redis.setex(cacheKey, 3600, JSON.stringify(connections));

        return connections;
    }
    catch(error){
        throw new Error(`Failed to get connections for user ${id} | ${error.message}`)
    }
}

const patchProfile = async (user, profile, file) => {
    try{
        // Acceptable keys for update profile
        const ACPT_KEYS = ["phone", "name", "profile_avatar", "address"];

        // find user
        const userDB = await User.findOne({email: user.email}).select('-password');
        if(!userDB){
            throw new Error("User not found");
        }

        if(file){
            if(file.size > 3000000){
                throw new Error("File size must be less than 3MB");
            }
            if(!Support.isImage(file.mimetype)){
                throw new Error("File must be an image");
            }

            const public_id = Support.generateRequestId();
            const {autoCropUrl, publicId} = await Cloudinary.upload(public_id, file.buffer);

            // remove old url with public id
            const old_public_id = userDB.profile_avatar.public_id;
            if(old_public_id && old_public_id !== null){
                await Cloudinary.remove(old_public_id);
            }

            profile.profile_avatar = {
                url: autoCropUrl,
                public_id: publicId
            }
        }


        Object.keys(profile).forEach(key => {
            if(!ACPT_KEYS.includes(key)){
                throw new Error(`Invalid field ${key}`);
            }

            if(userDB[key] !== undefined){
                userDB[key] = profile[key];
            }
        });

        await userDB.save();

        // remove cache of user
        const cacheKey = `user:${user.email}`;
        await redis.del(cacheKey);

        return {...userDB.toObject()};
    }catch(error){
        throw new Error(`Failed to update user profile | ${error.message}`)
    }
}


module.exports = UserService = {
    list,
    findByEmail,
    getConnections,
    patchProfile
}