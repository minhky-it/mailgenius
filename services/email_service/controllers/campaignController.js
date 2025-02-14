const Campaign = require("../models/campaignModel.js");
const CampaignService = require("../services/campaignService.js");
const _ = require("lodash");

const create = async (req, res) => {
    try {
        const user = req.user;
        const fields = req.body;
        const response = await CampaignService.create(user, fields);

        return res.status(200).json({
            message: "Campaign created successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to create | ${err.message}`
        })
    }
}

const views = async (req, res) => {
    try {
        const user = req.user;
        const { type } = req.query;

        const response = await CampaignService.views(user, type);
        return res.status(200).json({
            message: "Campaign views retrieved successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to retrieve views | ${err.message}`
        })
    }
};

const view = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.query;

        const response = await CampaignService.view(user, id);
        return res.status(200).json({
            message: "Campaign view retrieved successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to retrieve view | ${error.message}`
        })
    }
};


const update = async (req, res) => {
    try {
        const data = req.body;
        const response = await CampaignService.update(req.user, data);
        return res.status(200).json({
            message: "Campaign updated successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to update | ${err.message}`
        })
    }
};

const viewTypes = async (req, res) => {
    try {
        const { except } = req.query;
        const response = await CampaignService.viewType(except);
        return res.status(200).json({
            message: "Campaign view types retrieved successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to retrieve view types | ${err.message}`
        })
    }
};

const remove = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.query;
        const response = await CampaignService.remove(user, id);
        return res.status(200).json({
            message: "Campaign removed successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to remove | ${error.message}`
        })
    }
}

const store = async (req, res) => {
    try {
        const user = req.user;
        const content = req.body;
        console.log(content);
        const { id } = req.query;
        const response = await CampaignService.storeContent(user, id, content);

        return res.status(200).json({
            message: "Content stored successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to store | ${error.message}`
        })
    }
};

const load = async (req, res) => {
    try {
        const { id } = req.query;
        const user = req.user;
        const response = await CampaignService.loadContent(user, id);
        return res.status(200).json({
            message: "Content loaded successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to load | ${error.message}`
        })
    }
}

const convertToTableLayout = async (req, res) => {
    try {
        const { content } = req.body;
        const response = await CampaignService.convertToTableLayout(content);
        return res.status(200).json({
            message: "Content converted successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to convert | ${error.message}`
        })
    }
};

const searchCamps = async (req, res) => {
    try {
        const { name, type } = req.body;
        const user = req.user;
        const response = await CampaignService.searchCampaigns(user, name, type)

        return res.status(200).json({
            message: "Campaigns retrieved successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to search | ${error.message}`
        })
    }
}

const CampaignController = {
    create,
    views,
    update,
    view,
    remove,
    viewTypes,
    store,
    load,
    convertToTableLayout,
    searchCamps,
}

module.exports = CampaignController;