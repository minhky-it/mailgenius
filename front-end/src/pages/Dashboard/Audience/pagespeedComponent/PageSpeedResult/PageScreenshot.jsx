import { Row, Col, Card, Collapse } from "antd";
function PageScreenShot({ data }) {
	const { screenshot, nodes } = data;
	return (
		<>
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-4">Full Page Screenshot</h1>
				<img
					src={screenshot.data}
					alt="Screenshot"
					className="mb-4"
					style={{ width: "200px", height: "300px" }}
				/>
				<Collapse
					items={[
						{
							label: "Nodes",
							children: (
								<Row gutter={16}>
									{Object.entries(nodes).map(([key, node]) => (
										<Col span={8} key={key}>
											<Card title={key} bordered={false} className="mb-4">
												<p>ID: {node.id}</p>
												<p>Top: {node.top}</p>
												<p>Left: {node.left}</p>
												<p>Right: {node.right}</p>
												<p>Bottom: {node.bottom}</p>
												<p>Width: {node.width}</p>
												<p>Height: {node.height}</p>
											</Card>
										</Col>
									))}
								</Row>
							),
						},
					]}
				/>
			</div>
		</>
	);
}

export default PageScreenShot;
