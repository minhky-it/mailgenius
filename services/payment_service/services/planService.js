const Plan = require("../models/Plan.js");
const UserPayment = require("../models/UserPayment.js");
const Transaction = require("../models/Transaction.js");
const Support = require("../supports/index.js");
const redis = require("../redis/index.js");
const PlanKafka = require("../kafka_client/planTopic.js");
const getPlans = async () => {
    try{
        const plans = await Plan.find({}).exec();
        return plans;
    }catch(error){
        throw new Error(`Error getting plans | ${error.message}`);
    }
}

const getPlanById = async (id) => {
    try{
        const cacheKey = `plan:${id}`;
        const cache = await redis.get(cacheKey);
        if(cache){
            return JSON.parse(cache);
        }
        const plan = await Plan.findById(id).exec();
        if(!plan){
            throw new Error("Plan not found");
        }
        await redis.set(cacheKey, JSON.stringify(plan));
        return plan;
    }catch(error){
        throw new Error(`Error getting plan by id | ${error.message}`);
    }
}

const buyAPlan = async (id, user) => {
    try{
        const plan = await Plan.findOne({_id: id}).exec();
        if(!plan){
            throw new Error("Plan not found");
        }

        const userPayment = await UserPayment.findOne({user_id: user.id}).exec();
        if(!userPayment){
            throw new Error("User not found");
        }

        if(userPayment.coins >= plan.price){
            userPayment.coins -= plan.price;
            userPayment.memberships.planId = plan._id;
            userPayment.memberships.planName = plan.name;
            userPayment.memberships.expire = new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000);
            await userPayment.save();

            const transaction = new Transaction({
                user_id: user.id,
                amount: plan.price,
                request_id: Support.generateRequestId(),
                status: "success",
                platform_id: "plan_" + plan._id,
                platform: "Plan MailGenius",
                transaction_type: "buy_plan"
            });
            const cacheKey = `payment:${user.id}`;
            await redis.del(cacheKey);

            await transaction.save();
            // create a subcription
            await PlanKafka.sendPlanRequest(user.id, plan, Support.generateRequestId());
        }else{
            throw new Error("Not enough coins");
        }
        return plan;
    }catch(error){
        throw new Error(`Error buying a plan | ${error.message}`);
    }
}

const PlanService = {
    getPlans,
    getPlanById,
    buyAPlan
}

module.exports = PlanService;