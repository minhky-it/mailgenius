import React from "react";

const ScriptTreemapData = ({ data }) => {
	const { title, description, score, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>

			<h3 className="text-lg font-semibold mt-4">Script Treemap Details</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								URL
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Resource Size (Bytes)
							</th>
							<th className="py-2 px-4 border-b border-gray-300 text-left">
								Unused Bytes
							</th>
						</tr>
					</thead>
					<tbody>
						{details?.nodes?.map((node, index) => (
							<React.Fragment key={index}>
								<tr className="hover:bg-gray-50">
									<td className="py-2 px-4 border-b border-gray-300">
										{node?.name}
									</td>
									<td className="py-2 px-4 border-b border-gray-300">
										{node?.resourceBytes}
									</td>
									<td className="py-2 px-4 border-b border-gray-300">
										{node?.unusedBytes}
									</td>
								</tr>
								{node?.children &&
									node?.children?.map((child, childIndex) => (
										<tr key={childIndex} className="hover:bg-gray-100">
											<td className="py-2 px-8 border-b border-gray-300">
												{child?.name}
											</td>
											<td className="py-2 px-4 border-b border-gray-300">
												{child?.resourceBytes}
											</td>
											<td className="py-2 px-4 border-b border-gray-300">
												{child?.unusedBytes}
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

export default ScriptTreemapData;
