const PaymentService = require("../services/paymentService.js");

const view = async (req, res) => {
    try{
        const response = await PaymentService.view(req.user);

        return res.status(200).json({
            message: "Get payment details successfully",
            data: response
        });
    }catch(error){
        res.status(500).json({ 
            error: error.message,
            message: `Error in payment controller | ${error.message}`
        });
    }
};

const create = async (req, res) => {
    try{
        const { amount } = req.body;
        const response = await PaymentService.createPayment(req.user.id, amount);

        return res.status(201).json({
            message: "Payment created successfully",
            data: response
        });
    }catch(error){
        res.status(500).json({ 
            error: error.message,
            message: `Error in payment controller | ${error.message}`
        });
    }
};

const confirm = async (req, res) => {
    try{
        const { confirmedPaymentIntent } = req.body;
        const response = await PaymentService.confirmPayment(confirmedPaymentIntent);
        
        return res.status(200).json({
            message: "Payment confirmed successfully",
            data: response
        });
    }catch(error){
        res.status(500).json({ 
            error: error.message,
            message: `Error in payment controller | ${error.message}`
        });
    }
}

const PaymentController = {
    view,
    create,
    confirm
}

module.exports = PaymentController;