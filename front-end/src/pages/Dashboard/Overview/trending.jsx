import { GET } from "../../../api/index.js";
import { useEffect, useState } from "react";
import { SERVICE } from "../../../enum/service.js";
import { Carousel, Modal } from "antd";

const contentStyle = {
	margin: 0,
	color: "#fff",
	background: "#364d79",
};
function Treding() {
	const [trending, setTrending] = useState([]);
	const handleTrending = async () => {
		const response = await GET(`${SERVICE.EMAIL}/seo/trending`);
		setTrending(response.data?.default?.trendingSearchesDays);
		console.log(response.data?.default?.trendingSearchesDays);
	};

	useEffect(() => {
		handleTrending();
	}, []);

	const onChange = (currentSlide) => {
		console.log(currentSlide);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrend, setSelectedTrend] = useState(null);
	const showModal = (article) => {
		setSelectedTrend(article);
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			{trending && (
				<>
					{trending.map((trend, index) => (
						<div key={index} className="p-6 my-6 mx-4">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								{trend?.formattedDate}
							</h3>

							<Carousel
								autoplay
								dots={{ className: "custom-dots" }}
								effect="fade"
							>
								{trend.trendingSearches?.map((item, index) => (
									<div
										key={index}
										className="flex flex-col items-center text-center"
									>
										<div
											className="bg-white shadow-md rounded-lg p-6 border border-gray-300 w-full"
											style={contentStyle}
										>
											<h4 className="text-xl font-medium text-white mb-2">
												{item.title.query}
											</h4>

											<span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
												{item.formattedTraffic}
											</span>

											<div className="flex flex-row flex-no-wrap items-center">
												<img
													src={item.image.imageUrl}
													alt={item.image.source}
													className="object-cover w-36 h-36 rounded-md shadow-sm"
												/>
												<div className="article_item mx-4">
													{item.articles.map((article) => (
														<>{article.title}</>
													))}
												</div>
											</div>

											<div className="flex gap-3 justify-center">
												<a
													href={item.image.newsUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-800 transition"
												>
													View
												</a>

												<button
													onClick={() => showModal(item.articles)}
													rel="noopener noreferrer"
													className="bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-gray-700 transition"
												>
													Details
												</button>
											</div>
										</div>
									</div>
								))}
							</Carousel>
							<div className="flex flex-wrap gap-4 my-4">
								{trend?.trendingSearches?.map((search, idx) => (
									<div
										key={idx}
										className="bg-white border border-gray-200 shadow-lg p-5 rounded-xl w-full sm:w-[48%] md:w-[30%] lg:w-[23%] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
									>
										<a
											href={`https://google.com${search.title.exploreLink}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-900 text-lg font-semibold hover:text-blue-600 transition"
										>
											{search.title.query}
										</a>
										<span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-full ml-2">
											{search.formattedTraffic}
										</span>

										<hr className="my-3 border-gray-300" />

										<div className="flex flex-row items-center">
											<img
												src={search.image?.imageUrl}
												alt={search.image?.source}
												className="w-24 h-24 object-cover rounded-lg shadow-md mb-3 mx-3"
											/>

											<div className="flex flex-col text-center">
												<a
													href={search.image.newsUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-gray-700 transition my-2"
												>
													View
												</a>

												<button
                                                    onClick={() => showModal(search.articles)}
													className="bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-800 transition my-2"
												>
													Details
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</>
			)}
			<Modal
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				centered={true}
				width="75%"
			>
				{selectedTrend &&
					selectedTrend.map((item, index) => (
						<div
							key={index}
							className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-none"
						>
							<img
								src={item.image?.imageUrl}
								alt={item.title}
								className="w-16 h-16 object-cover rounded-xl shadow-sm"
							/>

							<div className="flex flex-col">
								<a
									href={item.url}
									target="_blank"
									className="text-lg font-semibold text-gray-900"
								>
									{item.title}
								</a>
								<span className="text-gray-500 text-sm">
									{item.source} • {item.timeAgo}
								</span>
							</div>
						</div>
					))}
			</Modal>
		</>
	);
}

export default Treding;
