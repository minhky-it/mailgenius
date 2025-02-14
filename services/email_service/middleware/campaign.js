const Plan = require("../models/planModel.js");
const campaignMiddleware = async (req, res, next) => {
    try{
        const user = req.user;
        const plan = await Plan.findOne({ user_id: user.id });
        const temp_1 = plan.plan_service.campaign.data.daily < plan.plan_service.campaign.limit.daily_create;
        const temp_2 = plan.plan_service.campaign.data.total < plan.plan_service.campaign.limit.total_create;
        if(temp_1 && temp_2){
            return next();
        }
        return res.status(403).json({
            error: "Forbidden",
            message: "You've reached your daily or total campaign limit"
        });
    }catch(err){
        return res.status(500).json({
            error: "Internal Server Error",
            message: `Failed to validate campaign | ${err.message}`
        });
    }
};

module.exports = campaignMiddleware;