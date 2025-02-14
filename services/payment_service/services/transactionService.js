const Transaction = require("../models/Transaction.js");

const views = async (user) => {
    try{
        const user_id = user.id;
        const transactions = await Transaction.find({user_id}).sort({date: -1}).exec();
        return transactions;
    }catch(error){
        throw new Error(`Error getting payment details | ${error.message}`);
    }
}

const TransactionService = {views}

module.exports = TransactionService;