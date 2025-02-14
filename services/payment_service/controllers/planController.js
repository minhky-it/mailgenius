const PlanService = require("../services/planService.js");

const getPlans = async (req, res) => {
    try{
        const plans = await PlanService.getPlans();

        return res.status(200).json({
            message: "Get plans successfully",
            data: plans
        });

    }catch(err){
        res.status(500).json({
            error: err.message,
            message: "Failed to get plans"
        });
    }
}

const getPlanById = async (req, res) =>{
    try{
        const id = req.query.id;
        const plan = await PlanService.getPlanById(id);

        return res.status(200).json({
            message: "Get plan by ID successfully",
            data: plan
        });
    }catch(error){
        res.status(500).json({
            error: error.message,
            message: `Failed to get plan by ID | ${error.message}`
        });
    }
}

const buyAPlan = async (req, res) => {
    try{
        const id = req.query.id;
        const user = req.user;

        const plan = await PlanService.buyAPlan(id, user);
        return res.status(200).json({
            message: "Buy a plan successfully",
            data: plan
        });
    }catch(error){
        res.status(500).json({
            error: error.message,
            message: `Failed to buy a plan | ${error.message}`
        });
    }
}

const PlanController = {
    getPlans,
    getPlanById,
    buyAPlan
}

module.exports = PlanController;