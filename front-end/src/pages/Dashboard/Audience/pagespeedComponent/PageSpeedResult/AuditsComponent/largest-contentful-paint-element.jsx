import React from "react";

const LargestContentfulPaintElement = ({ data }) => {
	const { title, description, score, displayValue, metricSavings, details } =
		data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>
			<p className="mb-4">
				LCP Time: {displayValue} (Savings: {metricSavings?.LCP} ms)
			</p>

			<h3 className="text-lg font-semibold mt-4">
				Largest Contentful Paint Element
			</h3>
			<div className="mt-2">
				<div className="border border-gray-300 p-2 rounded-lg">
					<div className="mb-2">
						<strong>Element:</strong>
						<div
							dangerouslySetInnerHTML={{
								__html: details?.items[0]?.items[0]?.node?.snippet,
							}}
						/>
					</div>
					<p className="text-sm text-gray-500">
						Selector: {details?.items[0]?.items[0]?.node?.selector}
					</p>
				</div>
			</div>

			<h3 className="text-lg font-semibold mt-4">LCP Timing Breakdown</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							{details?.items[1]?.headings?.map((heading) => (
								<th
									key={heading?.key}
									className="py-2 px-4 border-b border-gray-300 text-left"
								>
									{heading?.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{details?.items[1]?.items?.map((item, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.phase}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.percent}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.timing?.toFixed(2)} ms
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LargestContentfulPaintElement;
