const LandingModel = require("../models/landingModel.js");
const redis = require("../redis/index.js");

const retrieve = async (user) => {
    try{
        const cacheKey = `${user.id}-landing`;
        const cachedLanding = await redis.get(cacheKey);
        if(cachedLanding){
            return JSON.parse(cachedLanding);
        }
        let landing = await LandingModel.findOne({user_id:user.id}).lean();
        if(!landing){
            const string_url = `${process.env.SERVER_FE_URL}/landing?id=${user.id}`;
            let newLanding = new LandingModel({user_id: user.id, status: "hidden", string_url});
            await newLanding.save();
        }
        delete landing.html;
        delete landing.content;

        await redis.set(cacheKey, JSON.stringify(landing), "EX", 3600);

        return landing;
    }catch(e){
        throw new Error(`Error retrieving remote data: ${e.message}`);
    }
};

const retrieveHTML = async (id) => {
    try{
        // const cacheKey = `${id}-landing`;
        // const cachedLanding = await redis.get(cacheKey);
        // if(cachedLanding){
        //     return JSON.parse(cachedLanding);
        // }
        let landing = await LandingModel.findOne({user_id: id}).lean();
        if(!landing){
            throw new Error("Landing not found");
        }

        return landing;
    }catch(e){
        throw new Error(`Error retrieving HTML: ${e.message}`);
    }
}

const patch = async (user, fields) => {
    try{
        const acptKeys = ["title", "description", "metadata", "status", "keywords"];
        const cacheKey = `${user.id}-landing`;
        const landing = await LandingModel.findOne({user_id:user.id});
        if(!landing){
            throw new Error("No landing data found");
        }
        Object.keys(fields).forEach((key) => {
            if(acptKeys.includes(key)){
                landing[key] = fields[key];
            }
        })
        await landing.save();
        await redis.del(cacheKey);
        return landing;
    }catch(e){
        throw new Error(`Error patching remote data: ${e.message}`);
    }
}

const saveHTML = async (user, data) => {
    try{
        const landing = await LandingModel.findOne({user_id:user.id});
        if(!landing){
            throw new Error("No landing data found");
        }
        landing.html = data;
        await landing.save();
        return true;
    }catch(error){
        throw new Error(`Error saving HTML: ${error.message}`);
    }
}

const scratchDesign = async (user, data) => {
    try{
        let landing = await LandingModel.findOne({user_id:user.id});
        if(!landing){
            if(!landing){
                throw new Error("No landing data found");
            }
        }
        landing.content = data;
        await landing.save();
        return landing;
    }catch(error){
        throw new Error(`Error scratching design: ${error.message}`);
    }
}

const retrieveDesign = async (user) => {
    try {
        const landing = await LandingModel.findOne({ user_id: user.id }).lean();
        landing.content = landing.content || {};
        if(!landing){
            throw new Error(`Landing was not found`);
        }
        return landing.content;
    } catch (error) {
        throw new Error(`Error getting scratch design: ${error.message}`)
    }
} 

const LandingService = {
    retrieve,
    patch,
    scratchDesign,
    retrieveDesign,
    retrieveHTML,
    saveHTML
}

module.exports = LandingService;