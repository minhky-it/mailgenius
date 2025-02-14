import React from "react";

const FinalScreenshot = ({ data }) => {
	const { title, description, score, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">Final Screenshot</h3>
			<div className="mt-2">
				<img
					src={details?.data}
					alt="Final Screenshot"
					className="w-[50%] h-[50%] rounded-lg"
				/>
			</div>
			<p className="mt-2 text-sm text-gray-500">
				Timestamp: {new Date(details?.timestamp)?.toLocaleString()}
			</p>
		</div>
	);
};

export default FinalScreenshot;
