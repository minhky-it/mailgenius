import React from "react";

const UnsizedImages = ({ data }) => {
	const { title, description, score } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">Image Size Details</h3>
			<p>
				No unsized images found?. All image elements have explicit width and
				height?.
			</p>
		</div>
	);
};

export default UnsizedImages;
