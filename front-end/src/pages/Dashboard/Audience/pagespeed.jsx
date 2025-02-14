import { Button, Divider } from "antd";
import { useState } from "react";
import { GET } from "../../../api/index";
import { SERVICE } from "../../../enum/service";
import HeaderPageSpeed from "./pagespeedComponent/Header";
import PageSpeedResult from "./pagespeedComponent/PageSpeedResult";
function PageSpeed() {
	const [data, setData] = useState(null);
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const measure = async (url) => {
		setLoading(true);
		const response = await GET(`${SERVICE.EMAIL}/seo/check-speed?url=${url}`);
		if (response.error) {
			setLoading(false);
			console.log(response.message);
			return;
		}
		setLoading(false);
		setData(response.data);
	};

	const clear = () => {
		setData(null);
		setUrl("");
	}

	const isUrlValid = (url) => {
		return url.trim() !== '' && (url.startsWith('http://') || url.startsWith('https://'));
	};

	return (
		<>
			<div className="bg-white rounded-2xl shadow-xl m-10 p-4">
				<h2 className="text-3xl font-medium text-gray-900 mb-6 text-center">
					PageSpeed Insight Mailgenius
				</h2>
				<input
					type="text"
					placeholder="Enter URL https://www.example.com"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition mb-4"
				/>
				<div className="flex justify-between">
					<Button
						loading={loading}
						size="large"
						type="dashed"
						onClick={async () => measure(url)}
						disabled={!isUrlValid(url)}
					>
						Analyze
					</Button>
					<Button
						onClick={() => clear()}
						color="danger"
						size="large"
						type="dashed"
					>
						Clear the analyze
					</Button>
				</div>
			</div>
			{data && (
				<>
					<div className="bg-white rounded-2xl shadow-xl m-10 p-6">
						{/* Header of Result */}
						<HeaderPageSpeed data={data} />
						<Divider />
						<PageSpeedResult data={data.lighthouseResult} />
					</div>
				</>
			)}
		</>
	);
}

export default PageSpeed;