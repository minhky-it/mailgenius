const Template = require("../models/templateModel.js");
const TemplateService = require("../services/templateService.js");

const _ = require("lodash");

const views = async (req, res) => {
    try {
        const user = req.user;
        const { type } = req.query;

        const response = await TemplateService.views(user, type);
        return res.status(200).json({
            message: "Template views retrieved successfully",
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

        const response = await TemplateService.view(user, id);
        return res.status(200).json({
            message: "Template view retrieved successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to retrieve view | ${error.message}`
        })
    }
};

const create = async (req, res) => {
    try {
        const user = req.user;
        const fields = req.body;
        const response = await TemplateService.create(user, fields);

        return res.status(200).json({
            message: "Template created successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to create | ${err.message}`
        })
    }
}

const store = async (req, res) => {
    try {
        const user = req.user;
        const content = req.body;
        const { id } = req.query;
        const response = await TemplateService.storeContent(user, id, content);

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
        const response = await TemplateService.loadContent(user, id);
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

const searchTmps = async (req, res) => {
    try {
        const { name, type } = req.body;
        const user = req.user;
        const response = await TemplateService.searchTmps(user, name, type)

        return res.status(200).json({
            message: "Template retrieved successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to search | ${error.message}`
        })
    }
}

const update = async (req, res) => {
    try {
        const data = req.body;
        const response = await TemplateService.update(req.user, data);
        return res.status(200).json({
            message: "Template updated successfully",
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to update | ${err.message}`
        })
    }
};

const remove = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.query;
        const response = await TemplateService.remove(user, id);
        return res.status(200).json({
            message: "Template removed successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to remove | ${error.message}`
        })
    }
}

const TemplateController = {
    update,
    remove,
    view,
    views,
    create,
    store,
    load,
    searchTmps
}

module.exports = TemplateController;