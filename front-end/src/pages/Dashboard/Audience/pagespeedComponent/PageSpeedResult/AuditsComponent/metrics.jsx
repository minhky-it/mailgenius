import React from "react";

const Metrics = ({ data }) => {
	return (
		<div className="p-4 bg-gray-800 text-white rounded-lg">
			<h2 className="text-xl font-bold mb-2">{data?.title}</h2>
			<p className="mb-4">{data?.description}</p>
			<p className="mb-2">
				<strong>Score:</strong> {data?.score * 100} 
			</p>
			<p className="mb-2">
				<strong>Score Display Mode:</strong> {data?.scoreDisplayMode}
			</p>
			<p className="mb-2">
				<strong>Numeric Value:</strong> {data?.numericValue} {data?.numericUnit}
			</p>

			<h3 className="text-lg font-semibold mt-4">Details:</h3>
			{data?.details?.items?.map((item, index) => (
				<div key={index} className="mb-2">
					<h4 className="font-semibold">Metrics Data:</h4>
					<ul className="list-disc list-inside">
						<li>
							<strong>Observed Largest Contentful Paint:</strong>{" "}
							{item?.observedLargestContentfulPaint} ms
						</li>
						<li>
							<strong>Max Potential FID:</strong> {item?.maxPotentialFID} ms
						</li>
						<li>
							<strong>Total Blocking Time:</strong> {item?.totalBlockingTime} ms
						</li>
						<li>
							<strong>Observed First Contentful Paint:</strong>{" "}
							{item?.observedFirstContentfulPaint} ms
						</li>
						<li>
							<strong>Observed Speed Index:</strong> {item?.observedSpeedIndex}{" "}
							ms
						</li>
						<li>
							<strong>Cumulative Layout Shift:</strong>{" "}
							{item?.cumulativeLayoutShift}
						</li>
						<li>
							<strong>Time to First Byte:</strong> {item?.timeToFirstByte} ms
						</li>
						<li>
							<strong>Interactive:</strong> {item?.interactive} ms
						</li>
						<li>
							<strong>Largest Contentful Paint:</strong>{" "}
							{item?.largestContentfulPaint} ms
						</li>
						<li>
							<strong>Observed Load:</strong> {item?.observedLoad} ms
						</li>
						{/* Thêm các thuộc tính khác nếu cần */}
					</ul>
				</div>
			))}
		</div>
	);
};

export default Metrics;
