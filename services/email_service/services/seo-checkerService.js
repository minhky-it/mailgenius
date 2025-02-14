const cheerio = require("cheerio");
const axios = require("axios");
const redis = require("../redis/index.js");
const googleTrends = require("google-trends-api");

const crawl = async (url) => {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);

		const title = $("title").text();
		const titleLength = title.length;

		const metaKeywords = $('meta[name="keywords"]').attr("content") || "";
		const metaDescription = $('meta[name="description"]').attr("content") || "";
		const metaDescriptionLength = metaDescription.length;

		const h1 = $("h1").text();
		const h2 = $("h2").text();
		const h3 = $("h3").text();
		const h4 = $("h4").text();
		const h5 = $("h5").text();
		const h6 = $("h6").text();

		const formattedUrl = url.toLowerCase();

		const bodyText = $("body").text();

		const canonicalLink = $('link[rel="canonical"]').attr("href") || "";
		const isSecure = url.startsWith("https://");
		const strongText = $("strong").text();
		const emphasizedText = $("em").text();

		return {
			title,
			titleLength,
			metaKeywords,
			metaDescription,
			metaDescriptionLength,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			bodyText,
			formattedUrl,
			canonicalLink,
			isSecure,
			strongText,
			emphasizedText,
		};
	} catch (error) {
		throw new Error(`Cannot connect to this website: ${error.message}`);
	}
};

const checkPageSpeed = async (url,strategy) => {
	try {
		// Kiểm tra cache trước khi cào dữ liệu từ website
		const cachedData = await redis.get(url);
		if (cachedData) {
		    return JSON.parse(cachedData);
		}
		const API_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
			url,
		)}&key=${
			process.env.GOOGLE_CONOLE_KEY
		}&category=SEO&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=DESKTOP`;
		const { data } = await axios.get(API_URL);

		const {loadingExperience, originLoadingExperience, lighthouseResult, analysisUTCTimestamp} = data;
		// Score calculation
		const performanceScore = lighthouseResult.categories.performance.score * 100;
		const seoScore = lighthouseResult.categories.seo.score * 100;
		const accessibilityScore = lighthouseResult.categories.accessibility.score * 100;
		const bestPracticesScore = lighthouseResult.categories?.["best-practices"].score * 100;
		 await redis.setex(url, 3600, JSON.stringify({
			performanceScore,
			seoScore,
			accessibilityScore,
			bestPracticesScore,
			loadingExperience,
			originLoadingExperience,
			lighthouseResult,
			analysisUTCTimestamp
		}));
		return {
			performanceScore,
			seoScore,
			accessibilityScore,
			bestPracticesScore,
			loadingExperience,
			originLoadingExperience,
			lighthouseResult,
			analysisUTCTimestamp
		};
	} catch (error) {
		throw new Error(`Can not get website: ${error.message}`);
	}
};

const googleTrending = async () => {
	try{
		const result = await googleTrends.dailyTrends({
			geo: 'VN',
			category: 'all'
		});
		return JSON.parse(result);
	}catch(error){
		throw new Error(`Can not get website: ${error.message}`);
	}
};
const seoService = {
	crawl,
	checkPageSpeed,
	googleTrending
};

module.exports = seoService;
