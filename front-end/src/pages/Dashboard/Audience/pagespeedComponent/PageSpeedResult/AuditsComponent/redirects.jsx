import React from "react";

const Redirects = ({ data }) => {
	const { title, description, score } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">Redirect Details</h3>
			<p>
				No redirects found. All pages load directly without additional delays.
			</p>
		</div>
	);
};

export default Redirects;
