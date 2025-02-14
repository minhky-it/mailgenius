function ModernImageFormats({ data }) {
	return (
		<div className="p-4">
			<p className="text-gray-600 text-lg mb-6">{data?.description}</p>

			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<span className="text-lg font-medium text-gray-800">Score</span>
					<span className="text-xl font-bold text-gray-700">{data?.score * 100} </span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-lg font-medium text-gray-800">
						Display Value
					</span>
					<span className="text-xl font-bold text-gray-700">
						{data?.displayValue}
					</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-lg font-medium text-gray-800">
						Potential Savings (LCP)
					</span>
					<span className="text-xl font-bold text-gray-700">
						{data?.metricSavings?.LCP} ms
					</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-lg font-medium text-gray-800">
						Potential Savings (FCP)
					</span>
					<span className="text-xl font-bold text-gray-700">
						{data?.metricSavings?.FCP} ms
					</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-lg font-medium text-gray-800">
						Numeric Value
					</span>
					<span className="text-xl font-bold text-gray-700">
						{data?.numericValue} {data?.numericUnit}
					</span>
				</div>
			</div>

			<div className="mt-6 text-center">
				<a
					href="https://developer?.chrome?.com/docs/lighthouse/performance/uses-webp-images/"
					className="text-blue-500 underline text-lg"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn more about modern image formats
				</a>
			</div>
			<div className="p-4 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-bold mb-4">
					Opportunities for Optimization
				</h2>
				<div className="mb-4">
					<h3 className="text-lg font-semibold">Debug Data</h3>
					<p>LCP: {data?.details?.debugData?.metricSavings?.LCP} ms</p>
					<p>FCP: {data?.details?.debugData?.metricSavings?.FCP} ms</p>
					<p>
						Overall Savings: {data?.details?.overallSavingsBytes?.toFixed(2)} bytes
					</p>
					<p>Overall Savings (ms): {data?.details?.overallSavingsMs} ms</p>
				</div>
				<table className="min-w-full bg-gray-100 border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							{data?.details?.headings?.map((heading) => (
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
						{data?.details?.items?.map((item, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.node?.nodeLabel}
								</td>
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
									{item?.totalBytes?.toFixed(2)} bytes
								</td>
								<td className="py-2 px-4 border-b border-gray-300">
									{item?.wastedBytes?.toFixed(2)} bytes
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ModernImageFormats;
