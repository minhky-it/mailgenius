const Plan = require("../models/planModel.js");

const create = async (requestId, user_id, plan) => {
    try{
        // check existed plan before creating
        await Plan.findOneAndDelete({ user_id: user_id });
        console.log('created plan', plan);

        let service = defineService(plan.name);
        const savePlan = new Plan({
            user_id,
            plan_name: plan.name,
            create_at: plan.create,
            expired_at: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
            plan_service: service
        });
        
        await savePlan.save();
        return {requestId, plan: savePlan};
    }catch(err){
        throw new Error(`Error in creating subscription service | ${err.message}`);
    }
}

const getPlan = async (user) => {
    try{
        let plan = await Plan.findOne({ user_id: user.id });
        if(!plan){
            plan = new Plan({
                user_id: user.id,
                plan_name: "Free Plan",
                create_at: new Date(),
                expired_at: new Date(Date.now() + 3000 * 24 * 60 * 60 * 1000),
                plan_service: {
                    email: {
                        limit: {
                            daily_send: 5,
                            total_send: 30
                        },
                    },
                    campaign: {
                        limit: {
                            daily_create: 1,
                            total_create: 3
                        },
                    },
                }
            })
            await plan.save();
        }
        return plan;
    }catch(error){
        throw new Error(`Error in getting plan service | ${error.message}`);
    }
};

// private

const defineService = (name) => {
    try{
        let result = null;
        switch(name){
            case "Basic Plan":
                result = {
                    email: {
                        limit: {
                            daily_send: 100,
                            total_send: 3000
                        },
                    },
                    campaign: {
                        limit: {
                            daily_create: 3,
                            total_create: 30
                        },
                    },
                }
                break;
            case "Standard Plan":
                result = {
                    email: {
                        limit: {
                            daily_send: 1000,
                            total_send: 30000
                        },
                    },
                    campaign: {
                        limit: {
                            daily_create: 10,
                            total_create: 100
                        },
                    },
                }
                break;
            case "Premium Plan":
                result = {
                    email: {
                        limit: {
                            daily_send: 10000,
                            total_send: 300000
                        },
                    },
                    campaign: {
                        limit: {
                            daily_create: 999999,
                            total_create: 9999999
                        },
                    },
                }
                break;
            default:
                throw new Error("Invalid plan name");
        }

        return result;
    }catch(error){
        throw new Error(`Failed to define service | ${error.message}`);
    }
}

const PlanService = {
    create,
    getPlan
}

module.exports = PlanService;