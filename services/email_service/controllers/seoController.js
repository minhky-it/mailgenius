const seoService = require("../services/seo-checkerService.js");

const crawl = async (req, res) => {
    try{
        const { url } = req.query;
        const response = await seoService.crawl(url);

        return res.status(200).json({
            message: "Website crawled successfully",
            data: response
        });
    }catch(e){
        return res.status(500).json({
            error: "Failed to crawl website",
            message: `Failed to crawl website | ${e.message}`
        })
    }
}

const checkPageSpeed = async (req, res) => {
    try{
        const { url } = req.query;
        const response = await seoService.checkPageSpeed(url);

        return res.status(200).json({
            message: "Page speed checked successfully",
            data: response
        });
    }catch(e){
        return res.status(500).json({
            error: "Failed to check page speed",
            message: `Failed to check page speed | ${e.message}`
        })
    }
}

const trending = async (req, res) => {
    try{
        const response = await seoService.googleTrending();
        return res.status(200).json({
            message: "Trending keywords fetched successfully",
            data: response
        });
    }catch(error){
        return res.status(500).json({
            error: "Failed to fetch trending keywords",
            message: `Failed to fetch trending keywords | ${error.message}`
        })
    }
}
const seoController = {
    crawl,
    checkPageSpeed,
    trending,
}

module.exports = seoController;