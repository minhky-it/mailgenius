const vnpayService = require("../services/vnpayService.js");

const createPayment = async (req, res) => {
	try {
        const user = req.user;
		const ipAddr =
			req.headers["x-forwarded-for"] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;



        const amount = req.body.amount;
        const bankCode = req.body.bankCode;

        const orderInfo = "Charge in Mailgenius";

        const data = {
            ipAddr,
            amount,
            bankCode,
            orderInfo,
        }
        const response = await vnpayService.createPaymentURL(data, user);

        res.status(200).json({
            message: "Payment URL created successfully",
            data: response,
        })
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
			message: `Failed to create payment | ${error.message}`,
		});
	}
};

const getIPN = async (req, res) => {
    try{
        const response = await vnpayService.getIPN(req.query);
        return res.status(200).json(response);
    }catch(e){
        console.error('Error in getIPN:', e);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: `Failed to get IPN | ${e.message}`
        });
    }
}

const returnUrl = async (req, res) =>{
    try{
        const response = await vnpayService.returnURL(req.query);
        return res.status(200).json(response);
    }catch(e){
        console.error('Error in returnUrl:', e);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: `Failed to return URL | ${e.message}`
        });
    }
}
module.exports = vnpayController = {
	createPayment,
    getIPN,
    returnUrl,
};
