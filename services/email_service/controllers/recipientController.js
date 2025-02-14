const RecipientService = require("../services/recipientService.js");

const addToCampaign = async (req, res) => {
    try{
        const user = req.user;
        const {campaign_id, recipients} = req.body;

        const response = await RecipientService.addToCampaign(user, campaign_id, recipients);

        return res.status(200).json({
            message: "Recipients added to campaign successfully",
            data: response
        });
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to add recipient to campaign | ${error.message}`
        })
    }
}

const viewList = async (req, res) => {
    try{
        const user = req.user;
        const {campaign_id} = req.query;
        const response = await RecipientService.viewList(user, campaign_id);

        return res.status(200).json({
            message: "Recipient list retrieved successfully",
            data: response
        });
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to view recipient list | ${error.message}`
        })
    }
}
const removeRecipient = async (req, res) => {
    try{
        const user = req.user;
        const {id} = req.query;
        const response = await RecipientService.removeRecipient(user, id);

        return res.status(200).json({
            message: "Recipient removed successfully",
            data: response
        });
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to remove recipient | ${error.message}`
        })
    }
}

const patchRecipient = async (req, res) => {
    try{
        const user = req.user;
        const {_id, email, name} = req.body;
        const response = await RecipientService.patchRecipient(user, _id, email, name);

        return res.status(200).json({
            message: "Recipient updated successfully",
            data: response
        });
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to patch recipient | ${error.message}`
        })
    }
}
const RecipientController = {
    addToCampaign,
    viewList,
    removeRecipient,
    patchRecipient
 
};

module.exports = RecipientController;