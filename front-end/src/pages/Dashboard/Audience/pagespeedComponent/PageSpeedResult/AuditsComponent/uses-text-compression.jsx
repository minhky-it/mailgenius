import React from "react";

const UsesTextCompression = ({ data }) => {
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
				<strong>Numeric Value:</strong> {data?.numericValue} {data?.numericUnit}
			</p>

			<h3 className="text-lg font-semibold mt-4">Metric Savings:</h3>
			<p className="mb-2">
				<strong>LCP Savings:</strong> {data?.metricSavings?.LCP} ms
			</p>
			<p className="mb-2">
				<strong>FCP Savings:</strong> {data?.metricSavings?.FCP} ms
			</p>

			<h3 className="text-lg font-semibold mt-4">Details:</h3>
			<p className="mb-2">
				<strong>Overall Savings:</strong> {data?.details?.overallSavingsMs} ms
			</p>
			<p className="mb-2">
				<strong>Overall Savings (Bytes):</strong>{" "}
				{data?.details?.overallSavingsBytes} bytes
			</p>
			<p className="mb-2">
				<strong>Sorted By:</strong> {data?.details?.sortedBy?.join(", ")}
			</p>

			{data?.details?.items?.length > 0 ? (
				<table className="min-w-full mt-2">
					<thead>
						<tr>
							{data?.details?.headings?.map((heading, index) => (
								<th
									key={index}
									className="px-4 py-2 border-b border-gray-600 text-left"
								>
									{heading?.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data?.details?.items?.map((item, index) => (
							<tr key={index} className="hover:bg-gray-700">
								{/* Giả sử item có các thuộc tính tương ứng với headings */}
								{data?.details?.headings?.map((heading, hIndex) => (
									<td
										key={hIndex}
										className="px-4 py-2 border-b border-gray-600"
									>
										{item[heading?.key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="mt-2">No details available?.</p>
			)}
		</div>
	);
};

export default UsesTextCompression;
