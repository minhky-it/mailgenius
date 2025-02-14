const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Exception = require('../exceptions/exception.js');
const generate_access = (user) => {
    try{
        const header = {
            alg: 'HS512',
            typ: "JWT",
            from: "MailGenius",
            author: "DxK"
        };
        const payload = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { header, expiresIn : "24h" });

        return token;
    }catch(error){
        throw new Exception(`${Exception.INTERNAL_SERVER_ERROR} | ${error.message}`);
    }
}

const generate_refresh = (user) => {
    try{
        const header = {
            alg: 'HS512',
            typ: "JWT",
            from: "MailGenius",
            author: "DxK"
        };

        const payload = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {header, expiresIn : "7d"});
        return token;
        
    }catch(error){
        throw new Exception(`${Exception.INTERNAL_SERVER_ERROR} | ${error.message}`);
    
    }
}

const sendEmail = async ({subject, body, email}) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_APP_NAME,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: body,
        });

        return info;
    }catch(error){
        throw new Exception(`${Exception.INTERNAL_SERVER_ERROR} | ${error.message}`);
    }
}

const generate_jwt3days = async (user) => {
    try{
        const header = {
            alg: 'HS512',
            typ: "JWT",
            from: "MailGenius",
            author: "DxK",
            tag: "Reset Password"
        };
        const payload = {
            id: user.id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { header, expiresIn : "3d" });
        return token;
        
    }catch(error){
        throw new Exception(`Error in generate token | ${error.message}`);
    }
}

const generate_jwt5m = async (user) => {
    try{
        const header = {
            alg: 'HS512',
            typ: "JWT",
            from: "MailGenius",
            author: "DxK",
            tag: "Verify"
        };

        const payload = {
            id: user.id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { header, expiresIn : "5m" });
        return token;
    }
    catch(error){
        throw new Exception(`Error in generate token | ${error.message}`);
    }
}

const generateRequestId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const validatePhoneNumber = (phone) => {
    try{
        const regex = /^\+[1-9]\d{1,14}$/;
        return regex.test(phone);
    }catch(error){
        throw new Exception(`Error in validate phone number | ${error.message}`);
    }
};

const isImage = (mimetype) => {
    try{
        if (!mimetype) {
            throw new Error("No mimetype provided");
        }
        const regex = /^(image\/jpeg|image\/png|image\/gif|image\/bmp)$/;
        return regex.test(mimetype);
    }catch(error){
        throw new Exception(`Error in validate image | ${error.message}`);
    }
};

const Support = {
    generate_access,
    generate_refresh,
    sendEmail,
    generate_jwt3days,
    generate_jwt5m,
    generateRequestId,
    validatePhoneNumber,
    isImage
 };
module.exports = Support;