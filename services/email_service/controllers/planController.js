const PlanService = require("../services/planService.js");

const getPlan = async (req, res) => {
    try{
        const user = req.user;
        const response = await PlanService.getPlan(user);
        return res.status(200).json({
            message: "Plan retrieved successfully",
            data: response
        });
    }catch(e){
        return res.status(500).json({
            message: "Failed to get plan",
            error: e.message
        });
    }
}

const PlanController = {
    getPlan
}

module.exports = PlanController;