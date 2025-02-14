import React from "react";

const NetworkRequests = ({ data }) => {
	const { title, description, score, displayValue, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>
			<p className="mb-4">{displayValue}</p>

			<h3 className="text-lg font-semibold mt-4">Network Requests</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							{details?.headings?.map((heading) => (
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
						{details?.items?.map((item, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b border-gray-300">
									<a
										href={item?.url}
										className="text-blue-600 hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{item?.url}
									</a>
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.protocol}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.networkRequestTime?.toFixed(2)} ms
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.networkEndTime?.toFixed(2)} ms
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{(item?.transferSize / 1024)?.toFixed(2)} KB
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{(item?.resourceSize / 1024)?.toFixed(2)} KB
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.statusCode}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.mimeType}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.resourceType}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default NetworkRequests;
