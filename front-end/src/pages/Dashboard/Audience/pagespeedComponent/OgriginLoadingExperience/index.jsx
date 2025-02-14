import React from "react";
import { Tag, Card } from "antd";
const OriginLoadingExperience = ({ data }) => {
	const metrics = data.metrics;

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">
				Origin Loading Experience for {data.initial_url}
			</h2>
			<div className="space-y-4">
				<div className="border-b pb-4">
					<h3 className="text-lg font-semibold">
						Overall Category: <Tag color="#B03052">{data.overall_category}</Tag>
					</h3>
				</div>
				<div className="flex flex-rows">
					{Object.entries(metrics).map(([key, value]) => (
						<Card key={key} className="border rounded-lg shadow-md m-4">
							<h4 className="text-md font-semibold">
								{key.replace(/_/g, " ")}
							</h4>
							<p>
								<strong>Percentile:</strong> {value.percentile}
							</p>
							<p>
								<strong>Category:</strong>{" "}
								<Tag color={getCategoryColor(value.category)}>
									{value.category}
								</Tag>
							</p>
							<div className="mt-2">
								<h5 className="font-semibold">Distributions:</h5>
								<ul className="list-disc list-inside">
									{value.distributions.map((dist, index) => (
										<li key={index}>
											{dist.min} - {dist.max || "∞"}:{" "}
											{Math.round(dist.proportion * 100)}%
										</li>
									))}
								</ul>
							</div>
						</Card>
					))}
				</div>
			</div>
			<div className="mt-4">
				<a
					href={data.initial_url}
					className="text-blue-500 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					View Initial URL
				</a>
			</div>
		</div>
	);
};
const getCategoryColor = (category) => {
	switch (category) {
		case "FAST":
			return "#06D001";
		case "AVERAGE":
			return "#D76C82";
		case "SLOW":
			return "#B03052";
		default:
			return "#7ED4AD";
	}
};

export default OriginLoadingExperience;
