import React from "react";

const DOMSize = ({ data }) => {
	const { title, description, score, displayValue, details } = data;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="mb-4">{description}</p>
			<p className="font-semibold">Score: {score * 100} </p>
			<p className="mb-4">Total DOM Elements: {displayValue}</p>

			<h3 className="text-lg font-semibold mt-4">DOM Size Details</h3>
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
									{item?.statistic}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.node ? (
										<div>
											<a
												href={item?.node?.path}
												className="text-blue-600 hover:underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												{item?.node?.nodeLabel}
											</a>
											<div className="text-sm text-gray-500">
												<p>Path: {item?.node?.path}</p>
												<p>Selector: {item?.node?.selector}</p>
												<p>
													Bounding Rect:{" "}
													{JSON?.stringify(item?.node?.boundingRect)}
												</p>
											</div>
										</div>
									) : (
										"N/A"
									)}
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.value?.value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DOMSize;
