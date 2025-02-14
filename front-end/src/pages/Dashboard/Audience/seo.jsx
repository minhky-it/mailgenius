import { useState, useContext } from "react";
import { GET, POST } from "../../../api/index";
import { SERVICE } from "../../../enum/service";
import ReactMarkdown from "react-markdown";
import { Button, Spin } from "antd";
import { MessageContext } from "../../../context/MessageContext";

function SEOAnalyzer() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [anlyzing, setAnlyzing] = useState(false);
	const [recommend, setRecommendations] = useState("");
	const { showMessage } = useContext(MessageContext);
	const handleInputChange = (e) => {
		setUrl(e.target.value);
	};

	const analyzeSEO = async () => {
		setLoading(true);
		const response = await GET(`${SERVICE.EMAIL}/seo/check?url=${url}`);
		if (response.error) {
			showMessage(response.message, "error");
			setLoading(false);
			return;
		}
		setData(response.data);
		await getRecommended(response.data);
		showMessage(response.message);
		setLoading(false);
	};

	const getRecommended = async (data) => {
		setAnlyzing(true);
		const response = await POST(`${SERVICE.DATA}/gemini/generate/seo-booster`, { ...data });
		if (response.error) {
			setAnlyzing(false);
			showMessage(response.message, 'error');
			return;
		}
		setAnlyzing(false);
		setRecommendations(response.data);
		showMessage(response.message);
		document.querySelector("#scrollBtm").scrollIntoView({ behavior: "smooth" });
	};

	const handleClear = () => {
		setData(null);
		setRecommendations("");
		setUrl("");
	};

	const isUrlValid = (url) => {
		return url.trim() !== '' && (url.startsWith('http://') || url.startsWith('https://'));
	};

	return (
		<>
			<div className="bg-white rounded-2xl shadow-xl m-10 p-4">
				<h2 className="text-3xl font-medium text-gray-900 mb-6 text-center">
					MailGenius SEO Optimizer
				</h2>
				<input
					type="text"
					placeholder="Enter URL https://www.example.com"
					value={url}
					onChange={handleInputChange}
					className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition mb-4"
				/>
				<div className="flex justify-between">
					<Button
						loading={loading}
						size="large"
						type="dashed"
						onClick={async () => analyzeSEO()}
						disabled={!isUrlValid(url)}
					>
						Analyze
					</Button>
					<Button onClick={handleClear} color="danger" size="large" type="dashed">
						Clear the analyze
					</Button>
				</div>
				<div className="content-seo p-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						In the fast-paced digital world, staying ahead in search engine
						rankings is crucial for any website.
					</h2>
					<p className="text-gray-700 mb-4">
						<span className="font-semibold">MailGenius SEO Optimizer</span> is
						designed to help you optimize your website's performance, boost your
						search engine rankings, and drive more organic traffic.
					</p>
					<ul className="list-disc list-inside mb-4 text-gray-700">
						<li>
							Analyze your website's SEO performance with comprehensive reports.
						</li>
						<li>
							Identify and fix critical SEO issues that could be impacting your
							rankings.
						</li>
						<li>Track your keyword rankings and monitor your competitors.</li>
						<li>
							Get actionable insights and recommendations to improve your SEO
							strategy.
						</li>
					</ul>
					<p className="text-gray-700 mb-4">
						Whether you're a seasoned SEO expert or a beginner looking to
						improve your website's visibility,{" "}
						<span className="font-semibold">MailGenius SEO Optimizer</span>{" "}
						provides the tools and insights you need to succeed in the
						competitive online landscape.
					</p>
					<p className="text-gray-700">
						Start optimizing your website today with{" "}
						<span className="font-semibold">MailGenius SEO Optimizer</span> and
						take your SEO game to the next level!
					</p>
				</div>
			</div>
			{data && (
				<div className="bg-white rounded-2xl shadow-xl m-10 p-6 font-sans">
					<h2 className="font-GraphikFont text-2xl font-semibold text-gray-800 my-3 text-center">
						SEO Analysis Result
						<hr className="border-2 border-gray-800 my-3 w-16 rounded-full mx-auto" />
					</h2>
					{data && (
						<div>
							<h1 class="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
								{data.title}
							</h1>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Title length:
								</strong>{" "}
								{data.titleLength}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Meta keywords:
								</strong>{" "}
								{data.metaKeywords}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Meta description:
								</strong>{" "}
								{data.metaDescription}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Meta description length:
								</strong>{" "}
								{data.metaDescriptionLength}
							</p>
							<hr className="border-gray-300 my-4" />
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H1:</strong>{" "}
								{data.h1}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H2:</strong>{" "}
								{data.h2}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H3:</strong>{" "}
								{data.h3}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H4:</strong>{" "}
								{data.h4}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H5:</strong>{" "}
								{data.h5}
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">H6:</strong>{" "}
								{data.h6}
							</p>
							<hr className="border-gray-300 my-4" />
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Formatted URL:
								</strong>{" "}
								<a
									href={data.formattedUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-500 hover:underline"
								>
									{data.formattedUrl}
								</a>
							</p>
							<p class="text-base text-gray-600 mb-3">
								<strong class="text-gray-800 font-semibold">
									Word Count:
								</strong>{" "}
								{data.wordCount}
							</p>

							<p class="text-base text-gray-800 mb-4">
								<strong class="font-semibold">Canonical Link:</strong>{" "}
								<a
									href={data.canonicalLink}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
								>
									{data.canonicalLink}
								</a>
							</p>
							<p class="text-base text-gray-800 mb-4">
								<strong class="font-semibold">Is Secure:</strong>{" "}
								{data.isSecure ? "Yes" : "No"}
							</p>
							<p class="text-base text-gray-800 mb-4">
								<strong class="font-semibold">Strong Text:</strong>{" "}
								{data.strongText}
							</p>
							<p class="text-base text-gray-800 mb-4">
								<strong class="font-semibold">Emphasized Text:</strong>{" "}
								{data.emphasizedText || "No emphasized text"}
							</p>
							<Spin spinning={anlyzing}>
								<div className="bg-blue-50 mx-1 p-6 border rounded-2xl shadow-lg relative">
									<Button
										onClick={async () => getRecommended(data)}
										className="absolute top-1 right-1 bg-green-300 px-4 py-2 rounded-xl m-2 border-none">Retry</Button>
									<ReactMarkdown className={"space-y-2 mt-6"}>{recommend}</ReactMarkdown>
								</div>
								<span id="scrollBtm"></span>
							</Spin>
						</div>
					)}
					{!data && <p>No SEO data found for the given URL.</p>}
				</div>
			)}
		</>
	);
}

export default SEOAnalyzer;