const Exception = require('../exceptions/exception.js');
const jwt = require('jsonwebtoken');
const Support = require("../supports/index.js");
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel.js');
const admin = require("../firebase/index.js");
const UserStatus = require("../models/UserStatusModel.js");
const { USER_STATUS } = require('../enum/index.js');
const UserConnection = require("../models/UserConnectionModel.js");
const createUserPaymentProducer = require("../kafka_client/paymentTopic.js");

const refresh = async (ACCESS_TOKEN, REFRESH_TOKEN) => {
    try {
        const ACCESS_PAYLOAD = jwt.decode(ACCESS_TOKEN, process.env.SECRECT_KEY);
        const REFRESH_PAYLOAD = jwt.verify(REFRESH_TOKEN, process.env.REFRESH_SECRET_KEY);

        if(ACCESS_PAYLOAD.email !== REFRESH_PAYLOAD.email){
            throw new Exception('Invalid refresh token');
        }

        const user = await User.findOne({email: ACCESS_PAYLOAD.email});
        if(!user){
            throw new Exception('User not found');
        }
        
        const access_token = Support.generate_access(user);
        const refresh_token = Support.generate_refresh(user);


        return {
            access_token,
            refresh_token,
        }
    } catch (error) {
        throw new Exception("Failed at renew token service: " + error.message);
    }
}

const validate = async (ACCESS_TOKEN) => {
    try {
        const payload = jwt.verify(ACCESS_TOKEN, process.env.SECRECT_KEY);
        return payload;
    }catch (error){
        throw new Exception("Failed at token validation service: " + error.message);
    }
}

const loginGoogle = async (USER, TOKEN) => {
    try{
        // Verify token with Firebase SDK
        const decodedToken = await admin.auth().verifyIdToken(TOKEN);
        
        if(!decodedToken){
            throw new Exception('Invalid token');
        }

        // Find user in db with email
        let user = await User.findOne({email: USER.email}).lean().select('-password');
        
        // If user does not exist, create a new user
        if(!user){
            user = new User({
                email: USER.email,
                // google_id: USER.uid,
                name: USER.displayName,
                profile_avatar: {
                    url: USER.photoURL,
                    public_id: null,
                },
                password: bcrypt.hashSync(`${USER.email.split('@')[0]}`, 10)
            });
            const userDB = await user.save();
            const user_status = new UserStatus({
                user_id: userDB._id,
                status: USER_STATUS.ACTIVE,
            });
            await user_status.save();
            await createUserPaymentProducer(user, Support.generateRequestId());
            const userConnection = new UserConnection({
                user_id: userDB._id,
                connections: [{
                    platform: "GOOGLE",
                    uid: USER.uid
                }]
            });
            await userConnection.save();
        }
        
        await createUserPaymentProducer(user, Support.generateRequestId());

        // Generate access and refresh tokens

        const out_user = user.toObject ? user.toObject() : user;;
        delete out_user.password;
        
        const access_token = Support.generate_access(out_user);
        const refresh_token = Support.generate_refresh(out_user);
        
        return {
            access_token,
            refresh_token,
            user: out_user
        }
    }catch(error){
        throw new Exception('Failed to login with google | ' + error.message);
    }
}

module.exports = {
    refresh,
    validate,
    loginGoogle
}