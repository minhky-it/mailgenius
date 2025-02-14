const User = require("../models/UserModel.js");
const { USER_ROLE } = require("../enum/index.js");
const Support = require("../supports/index.js");
const createUserPaymentProducer = require("../kafka_client/paymentTopic.js");
const bcrypt = require("bcryptjs");
const init = async () => {
    await generateUsers();
}

const generateUsers = async () => {
    try{
        const users = [
            {
                name: "John Doe",
                email: "jonhole@gmail.com",
                password: bcrypt.hashSync("password", 10),
                role: USER_ROLE.DESIGNER,
                status: "active",
                phone: "1234567890",
                address: "1234 Main St",
            },
            {
                name: "Administrator",
                email: "admin@mailgenius.store",
                password: bcrypt.hashSync("password", 10),
                role: USER_ROLE.ADMIN,
                status: "active",
                phone: "1234567810",
                address: "1234 Main St",
            },
            {
                name: "User normal",
                email: "user@mailgenius.store",
                password: bcrypt.hashSync("password", 10),
                role: USER_ROLE.USER,
                status: "active",
                phone: "1234567811",
                address: "1234 Main St",
            }
        ]

        for(let user of users){
            // check existed user
            const existedUser = await User.findOne({ email: user.email });
            if(existedUser) continue;
            const newUser = new User(user);
            await newUser.save();
            await createUserPaymentProducer(newUser, Support.generateRequestId());
        }

        console.log('Users generated successfully');

    }catch(error){
        console.log(error);
    }
}

module.exports = init;