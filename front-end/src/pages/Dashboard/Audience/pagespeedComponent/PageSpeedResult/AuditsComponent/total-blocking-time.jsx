import React from "react";

const TotalBlockingTime = ({ data }) => {
	const { title, description, score, displayValue, numericValue, numericUnit } =
		data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>
			<p className="mb-4">
				Total Blocking Time: {displayValue} ({numericValue?.toFixed(2)}{" "}
				{numericUnit})
			</p>
		</div>
	);
};

export default TotalBlockingTime;
