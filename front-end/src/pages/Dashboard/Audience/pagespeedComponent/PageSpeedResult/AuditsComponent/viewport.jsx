import React from "react";

const Viewport = ({ data }) => {
	const { title, description, score, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score}</p>

			<h3 className="text-lg font-semibold mt-4">Viewport Details</h3>
			<p className="mb-2">
				Viewport Content: <code>{details?.viewportContent}</code>
			</p>
			<p>No warnings found. The viewport is properly configured.</p>
		</div>
	);
};

export default Viewport;
