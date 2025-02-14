import { Button, Card } from "antd";
import SeoChecker from "../../../assets/images/seo-checker.png";
import PageSpeedInsight from "../../../assets/images/page-speed.png";
import Trending from "./trending.jsx";
function Overview() {
    const onClickSEO = () => {
        window.location.href = `/dashboard/audience/seo-checker`;
    };

    const onClickPageSpeed = () => {
        window.location.href = `/dashboard/audience/page-speed-insight`;
    };
    return (
        <>
            <div className="bg-white">
                <Trending />
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-10 py-6">
                    <div className="flex-1 max-w-lg text-left">
                        <h3 className="text-gray-500 uppercase text-sm">AI MARKETING TOOLS</h3>
                        <h1 className="text-4xl font-georgiaFont font-bold mt-2">Say hello to your AI growth assistant</h1>
                        <p className="text-gray-600 mt-4 font-calistogaFont">
                            Our AI-powered SEO Checker helps analyze your website's SEO
                            performance and provides actionable insights to improve rankings.
                        </p>
                        <Button onClick={onClickSEO} type="primary" className="bg-yellow-400 text-black mt-4 px-6 py-3 rounded-full border-none">
                            Start Free Trial
                        </Button>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <Card className="shadow-lg rounded-lg">
                            <img src={SeoChecker} alt="SEO Checker" className="w-full h-auto" />
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-10 py-6">
                    <div className="flex-1 flex justify-center">
                        <Card className="shadow-lg rounded-lg overflow-hidden">
                            <img src={PageSpeedInsight} alt="PageSpeed Insight" className="w-full h-auto" />
                        </Card>
                    </div>

                    <div className="flex-1 max-w-lg text-left">
                        <h3 className="text-gray-500 uppercase text-sm">AI MARKETING TOOLS</h3>
                        <h1 className="text-4xl font-georgiaFont font-bold mt-2">Optimize Your Website Performance</h1>
                        <p className="text-gray-600 font-calistogaFont mt-4">
                            PageSpeed Insight helps improve your website loading speed by
                            analyzing and providing optimization tips for a better user experience.
                        </p>
                        <Button onClick={onClickPageSpeed} type="primary" className="bg-yellow-400 text-black mt-4 px-6 py-3 rounded-full border-none">
                            Start Free Trial
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview;