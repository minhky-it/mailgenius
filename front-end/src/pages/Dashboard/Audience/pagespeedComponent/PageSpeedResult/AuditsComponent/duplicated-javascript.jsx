import React from "react";

const DuplicatedJavaScript = ({ data }) => {
	const { title, description, score } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">
				Duplicate JavaScript Details
			</h3>
			<p>No duplicate JavaScript modules found?. All modules are optimized?.</p>
		</div>
	);
};

export default DuplicatedJavaScript;
