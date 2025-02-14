import React from "react";

const CriticalRequestChains = ({ data }) => {
	const { title, description, score, displayValue, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">
				Score: {score * 100}  ({displayValue})
			</p>
			<h3 className="text-lg font-semibold mt-4">Longest Chain</h3>
			<p>Length: {details?.longestChain?.length}</p>
			<p>Transfer Size: {details?.longestChain?.transferSize} bytes</p>
			<p>Duration: {details?.longestChain?.duration?.toFixed(2)} ms</p>

			<h3 className="text-lg font-semibold mt-4">Chains</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Request URL
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Transfer Size
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Start Time
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								End Time
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Duration
							</th>
						</tr>
					</thead>
					<tbody>
						{Object?.entries(details?.chains)?.map(([chainId, chain]) => (
							<React.Fragment key={chainId}>
								<tr className="hover:bg-gray-50">
									<td
										className="py-2 px-4 border-b border-gray-300"
										colSpan="5"
									>
										<strong>Chain ID: {chainId}</strong>
									</td>
								</tr>
								{Object.entries(chain?.children)?.map(([childId, child]) => (
									<tr key={childId} className="hover:bg-gray-50">
										<td className="py-2 px-4 border-b border-gray-300">
											<a
												href={child?.request?.url}
												className="text-blue-600 hover:underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												{child?.request?.url}
											</a>
										</td>
										<td className="py-2 px-4 border-b border-gray-300">
											{child?.request?.transferSize} bytes
										</td>
										<td className="py-2 px-4 border-b border-gray-300">
											{child?.request?.startTime?.toFixed(2)} ms
										</td>
										<td className="py-2 px-4 border-b border-gray-300">
											{child?.request?.endTime?.toFixed(2)} ms
										</td>
										<td className="py-2 px-4 border-b border-gray-300">
											{(
												child?.request?.endTime - child?.request?.startTime
											)?.toFixed(2)}{" "}
											ms
										</td>
									</tr>
								))}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CriticalRequestChains;
