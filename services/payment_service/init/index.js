const Plan = require("../models/Plan.js");
const init = async () => {
    try{
        await generatePlans();
    }catch(error){
        console.log(error);
    }
}


const generatePlans = async () => {
    try{
        const plans = await Plan.find({}).exec();
        if(plans.length === 0){
            await generateBasicPlan();
            await generateStandardPlan();
            await generatePremiumPlan();
        }
    }catch(error){
        console.log(error);
    }
}

const generateBasicPlan = async () => {
    try{
        const basicPlan = new Plan({
            name: "Basic Plan",
            price: 60000,
            duration: 30,
            billing_cycle: "monthly",
            features: [
                "Basic features",
                "1000 emails/month",
                "50 contacts",
                "24/7 support",
                "200 Mb storage",  
            ],
            description: "Basic plan for users",
            cancelPolicy: "No cancellation allowed"
        });
        await basicPlan.save();
    }catch(error){
        console.log(error);
    }
}

const generateStandardPlan = async () => {
    try{
        const standardPlan = new Plan({
            name: "Standard Plan",
            price: 100000,
            duration: 30,
            billing_cycle: "monthly",
            features: [
                "Basic, Standard features",
                "5000 emails/month",
                "500 contacts",
                "24/7 support",
                "Custom landing page",
                "1 Gb storage",  
            ],
            description: "Standard plan for users",
            cancelPolicy: "Cancellation allowed"
        });
        await standardPlan.save();
    }catch(error){
        console.log(error);
    }
}

const generatePremiumPlan = async () => {
    try{
        const premiumPlan = new Plan({
            name: "Premium Plan",
            price: 200000,
            duration: 30,
            billing_cycle: "monthly",
            features: [
                "Basic, Standard, Premium features",
                "10000 emails/month",
                "1000 contacts",
                "24/7 support",
                "5 Gb storage",
                "Custome landing page",
                "Pop-up forms",
                "Create AI Emails"  
            ],
            description: "Premium plan for users",
            cancelPolicy: "Cancellation allowed"
        });
        await premiumPlan.save();
    }catch(error){
        console.log(error);
    }
}

module.exports = init;