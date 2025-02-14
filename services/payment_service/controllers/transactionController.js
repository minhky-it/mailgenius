const TransactionService = require("../services/transactionService.js");

const views = async (req, res) => {
    try{
        const user = req.user;
        const response = await TransactionService.views(user);

        return res.status(200).json({
            message: "Get transaction details successfully",
            data: response
        });
    }catch(error){
        res.status(500).json({
            error: error.message,
            message: `Failed to view transaction | ${error.message}`
        });
    }
}

const TransactionController = {
    views
}

module.exports = TransactionController;