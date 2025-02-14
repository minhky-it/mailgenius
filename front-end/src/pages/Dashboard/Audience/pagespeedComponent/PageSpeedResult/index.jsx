import { Card, Tag, Divider, Collapse } from "antd";
import Categories from "./categories";
import PageScreenShot from "./PageScreenshot";
import EntitiesDisplay from "./entities";
import Audits from "./audits";
function PageSpeedResult({ data }) {
	const report = data;
	return (
		<>
			<div className="p-6 flex">
				<Card className="border rounded-lg shadow-md flex-1 m-2">
					<h2 className="text-xl font-bold mb-4">Lighthouse Report</h2>
					<p>
						<strong>Lighthouse Version:</strong> {report.lighthouseVersion}
					</p>
					<p>
						<strong>User Agent:</strong> {report.userAgent}
					</p>
					<p>
						<strong>Fetch Time:</strong>{" "}
						{new Date(report.fetchTime).toLocaleString()}
					</p>
				</Card>

				<Card className="border rounded-lg shadow-md flex-1 m-2">
					<h3 className="text-lg font-semibold mb-2">Environment</h3>
					<p>
						<strong>Network User Agent:</strong>{" "}
						{report.environment.networkUser}
					</p>
					<p>
						<strong>Host User Agent:</strong> {report.environment.hostUser}
					</p>
					<p>
						<strong>Benchmark Index:</strong>{" "}
						{report.environment.benchmarkIndex}
					</p>
					<p>
						<strong>Axe-Core Version:</strong>{" "}
						{report.environment.credits["axe-core"]}
					</p>
				</Card>

				<Card className="border rounded-lg shadow-md flex-1 m-2">
					<h3 className="text-lg font-semibold mb-2">Config Settings</h3>
					<p>
						<strong>Emulated Form Factor:</strong>{" "}
						{report.configSettings.emulatedFormFactor}
					</p>
					<p>
						<strong>Form Factor:</strong> {report.configSettings.formFactor}
					</p>
					<p>
						<strong>Locale:</strong> {report.configSettings.locale}
					</p>
					<p>
						<strong>Only Categories:</strong>
						{report.configSettings.onlyCategories.map((category, index) => (
							<Tag key={index} className="ml-1">
								{category}
							</Tag>
						))}
					</p>
					<p>
						<strong>Channel:</strong> {report.configSettings.channel}
					</p>
				</Card>
			</div>
			<Divider />
			<Categories report={report} />
            <Divider />
            <PageScreenShot data={report.fullPageScreenshot} />
            <Divider />
            <EntitiesDisplay entities={report.entities} />
            <Divider />
            <Audits data={report.audits}/>
		</>
	);
}

export default PageSpeedResult;
