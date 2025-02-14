import React from "react";

const Diagnostics = ({ data }) => {
	const { title, description, score, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">Diagnostics Details</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Metric
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Value
							</th>
						</tr>
					</thead>
					<tbody>
						{Object?.entries(details?.items[0])?.map(([key, value]) => (
							<tr key={key} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b border-gray-300">
									{key
										?.replace(/([A-Z])/g, " $1")
										?.replace(/^./, (str) => str?.toUpperCase())}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">{value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Diagnostics;
