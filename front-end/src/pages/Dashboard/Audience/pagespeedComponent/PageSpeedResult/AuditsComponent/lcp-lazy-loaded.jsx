import React from "react";

const LCPLazyLoaded = ({ data }) => {
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
				<strong>LCP Savings:</strong> {data?.metricSavings?.LCP}
			</p>

			<h3 className="text-lg font-semibold mt-4">Details:</h3>
			<div className="mt-2">
				{data?.details?.items?.map((item, index) => (
					<div key={index} className="mb-2">
						<p>
							<strong>Node Label:</strong> {item?.node?.nodeLabel}
						</p>
						<p>
							<strong>Selector:</strong> {item?.node?.selector}
						</p>
						<p>
							<strong>Path:</strong> {item?.node?.path}
						</p>
						<p>
							<strong>Bounding Rect:</strong>
						</p>
						<ul className="list-disc list-inside">
							<li>
								<strong>Right:</strong> {item?.node?.boundingRect?.right}
							</li>
							<li>
								<strong>Bottom:</strong> {item?.node?.boundingRect?.bottom}
							</li>
							<li>
								<strong>Top:</strong> {item?.node?.boundingRect?.top}
							</li>
							<li>
								<strong>Left:</strong> {item?.node?.boundingRect?.left}
							</li>
							<li>
								<strong>Height:</strong> {item?.node?.boundingRect?.height}
							</li>
							<li>
								<strong>Width:</strong> {item?.node?.boundingRect?.width}
							</li>
						</ul>
						<p>
							<strong>Snippet:</strong>
						</p>
						<div className="bg-gray-700 p-2 rounded">
							<code>{item?.node?.snippet}</code>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LCPLazyLoaded;
