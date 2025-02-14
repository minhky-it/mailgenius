import React from "react";

const LargestContentfulPaint = ({ data }) => {
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
				<strong>Display Value:</strong> {data?.displayValue}
			</p>
			<p className="mb-2">
				<strong>Numeric Value:</strong> {data?.numericValue} {data?.numericUnit}
			</p>
		</div>
	);
};

export default LargestContentfulPaint;
