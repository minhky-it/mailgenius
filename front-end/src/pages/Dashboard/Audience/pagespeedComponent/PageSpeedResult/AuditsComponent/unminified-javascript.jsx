import React from "react";

const UnminifiedJavaScript = ({ data }) => {
	const { title, description, score, metricSavings, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>
			<p className="mb-2">LCP Savings: {metricSavings?.LCP} ms</p>
			<p className="mb-4">FCP Savings: {metricSavings?.FCP} ms</p>

			<h3 className="text-lg font-semibold mt-4">Details</h3>
			<p>No unminified JavaScript files found that can be minified?.</p>
			<p>Overall Savings: {details?.overallSavingsBytes} bytes</p>
			<p>Overall Savings (ms): {details?.overallSavingsMs} ms</p>

			{details?.items?.length > 0 && (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-gray-100 border border-gray-300">
						<thead>
							<tr className="bg-gray-200">
								{details?.headings?.map((heading, index) => (
									<th
										key={index}
										className="py-2 px-4 border-b border-gray-300 text-left"
									>
										{heading?.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{details?.items?.map((item, index) => (
								<tr key={index} className="hover:bg-gray-50">
									<td className="py-2 px-4 border-b border-gray-300">
										{item?.label}
									</td>
									<td className="py-2 px-4 border-b border-gray-300">
										{item?.requestCount}
									</td>
									<td className="py-2 px-4 border-b border-gray-300">
										{item?.transferSize?.toLocaleString()} bytes
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UnminifiedJavaScript;
