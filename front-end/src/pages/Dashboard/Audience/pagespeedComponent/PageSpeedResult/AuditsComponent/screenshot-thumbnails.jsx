import React from "react";

const ScreenshotThumbnails = ({ data }) => {
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
			<h3 className="text-lg font-semibold mt-4">Details:</h3>
			<div className="mt-2">
				{data?.details?.items?.map((item, index) => (
					<div key={index} className="mb-2 flex items-center">
						<div className="flex flex-col">
							<p>
								<strong>Timestamp:</strong> {new Date(item?.timestamp)?.toLocaleString()}
							</p>
							<p>
								<strong>Timing:</strong> {item?.timing} seconds
							</p>
						</div>
						<p className="ml-4">
							<strong>Images:</strong>{" "}
							<img
								src={item?.data}
								alt={`Screenshot ${index}`}
								className="mt-2 rounded"
							/>
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ScreenshotThumbnails;
