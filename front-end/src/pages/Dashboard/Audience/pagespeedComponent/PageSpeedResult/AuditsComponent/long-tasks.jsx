import React from "react";

const LongTasks = ({ data }) => {
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
				<strong>Metric Savings (TBT):</strong> {data?.metricSavings?.TBT} ms
			</p>

			<h3 className="text-lg font-semibold mt-4">Details:</h3>
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
								<td className="px-4 py-2 border-b border-gray-600">
									<a href={item?.url} className="text-blue-400 hover:underline">
										{item?.url}
									</a>
								</td>
								<td className="px-4 py-2 border-b border-gray-600">
									{item?.startTime?.toFixed(1)} ms
								</td>
								<td className="px-4 py-2 border-b border-gray-600">
									{item?.duration?.toFixed(1)} ms
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="mt-2">No long tasks found?.</p>
			)}
		</div>
	);
};

export default LongTasks;
