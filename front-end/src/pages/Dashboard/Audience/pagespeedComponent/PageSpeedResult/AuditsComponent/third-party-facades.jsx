import React from "react";

const ThirdPartyFacades = ({ data }) => {
	const { title, description, score } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			{score !== null ? (
				<p className="font-semibold">Score: {score * 100} </p>
			) : (
				<p className="font-semibold">Score: Not Applicable</p>
			)}
		</div>
	);
};

export default ThirdPartyFacades;
