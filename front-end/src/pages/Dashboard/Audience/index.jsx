import React, { useState, useEffect } from "react";
import { GET } from "../../../api/index";
import { SERVICE } from "../../../enum/service";
import { Card, Statistic, Progress, Tag } from "antd";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
);

const conicColors = {
	"0%": "#87d068",
	"50%": "#ffe58f",
	"100%": "#ffccc7",
};

const response_fake = {
	data: {
		opening: {
			list: [
				{ opened_at: "2023-01-15T12:00:00Z" },
				{ opened_at: "2023-01-15T12:00:00Z" },
				{ opened_at: "2023-02-10T12:00:00Z" },
				{ opened_at: "2023-03-12T12:00:00Z" },
				{ opened_at: "2023-04-08T12:00:00Z" },
				{ opened_at: "2023-05-20T12:00:00Z" },
				{ opened_at: "2023-06-15T12:00:00Z" },
				{ opened_at: "2023-07-25T12:00:00Z" },
				{ opened_at: "2023-08-18T12:00:00Z" },
				{ opened_at: "2023-09-09T12:00:00Z" },
				{ opened_at: "2023-10-14T12:00:00Z" },
				{ opened_at: "2023-11-21T12:00:00Z" },
				{ opened_at: "2023-10-14T12:00:00Z" },
				{ opened_at: "2023-12-05T12:00:00Z" },
				{ opened_at: "2024-01-15T12:00:00Z" },
				{ opened_at: "2024-02-10T12:00:00Z" },
				{ opened_at: "2024-03-12T12:00:00Z" },
				{ opened_at: "2024-04-08T12:00:00Z" },
				{ opened_at: "2024-05-20T12:00:00Z" },
				{ opened_at: "2024-05-20T12:00:00Z" },
				{ opened_at: "2024-05-20T12:00:00Z" },
				{ opened_at: "2024-06-15T12:00:00Z" },
				{ opened_at: "2024-07-25T12:00:00Z" },
				{ opened_at: "2024-08-18T12:00:00Z" },
				{ opened_at: "2024-09-09T12:00:00Z" },
				{ opened_at: "2024-10-14T12:00:00Z" },
				{ opened_at: "2024-11-21T12:00:00Z" },
				{ opened_at: "2024-12-05T12:00:00Z" },
			],
		},
		clicking: {
			list: [
				{ clicked_at: "2023-01-20T12:00:00Z" },
				{ clicked_at: "2023-02-15T12:00:00Z" },
				{ clicked_at: "2023-03-18T12:00:00Z" },
				{ clicked_at: "2023-04-25T12:00:00Z" },
				{ clicked_at: "2023-05-22T12:00:00Z" },
				{ clicked_at: "2023-05-22T12:00:00Z" },
				{ clicked_at: "2023-05-22T12:00:00Z" },
				{ clicked_at: "2023-06-30T12:00:00Z" },
				{ clicked_at: "2023-07-27T12:00:00Z" },
				{ clicked_at: "2023-08-21T12:00:00Z" },
				{ clicked_at: "2023-09-12T12:00:00Z" },
				{ clicked_at: "2023-10-17T12:00:00Z" },
				{ clicked_at: "2023-11-25T12:00:00Z" },
				{ clicked_at: "2023-12-15T12:00:00Z" },
				{ clicked_at: "2024-01-20T12:00:00Z" },
				{ clicked_at: "2024-02-15T12:00:00Z" },
				{ clicked_at: "2024-03-18T12:00:00Z" },
				{ clicked_at: "2024-04-25T12:00:00Z" },
				{ clicked_at: "2023-12-15T12:00:00Z" },
				{ clicked_at: "2024-01-20T12:00:00Z" },
				{ clicked_at: "2024-05-22T12:00:00Z" },
				{ clicked_at: "2024-06-30T12:00:00Z" },
				{ clicked_at: "2024-07-27T12:00:00Z" },
				{ clicked_at: "2024-08-21T12:00:00Z" },
				{ clicked_at: "2024-07-27T12:00:00Z" },
				{ clicked_at: "2024-07-27T12:00:00Z" },
				{ clicked_at: "2024-07-27T12:00:00Z" },
				{ clicked_at: "2024-07-27T12:00:00Z" },
				{ clicked_at: "2024-09-12T12:00:00Z" },
				{ clicked_at: "2024-10-17T12:00:00Z" },
				{ clicked_at: "2024-11-25T12:00:00Z" },
				{ clicked_at: "2024-12-15T12:00:00Z" },
			],
		},
	},
	error: false,
	message: "Success",
};

function Campaigns() {
	const [campaigns, setCampaigns] = useState(null);
	const [selectedCampaigns, setSelectedCampaigns] = useState(null);
	const [dataCamp, setDataCamp] = useState(null);
	const [dataOpen, setdataOpen] = useState([]);
	const [dataClick, setdataClick] = useState([]);
	const [labels, setLabels] = useState([]);

	const handleFetch = async () => {
		const response = await GET(`${SERVICE.EMAIL}/campaign/views?type=email`);
		if (response.error) {
			console.log(response.message);
			return;
		}
		if (response.data.length === 0) return;
		setCampaigns(response.data);
		await handleFetchAnalyze(response.data[0]._id);
		setSelectedCampaigns(response.data[0]);
	};

	const handleFetchAnalyze = async (id) => {
		try {
			const response = await GET(
				`${SERVICE.EMAIL}/delivery/clicked?campaign_id=${id}`,
			);

			if (response.error) {
				console.log(response.message);
				return;
			}

			setDataCamp(response.data);

			// const openingList = response.data.opening?.list || [];
			// const clickingList = response.data.clicking?.list || [];

			const openingList = response_fake.data.opening?.list || [];
			const clickingList = response_fake.data.clicking?.list || [];
			if (openingList.length === 0 && clickingList.length === 0) {
				setdataOpen([]);
				setdataClick([]);
				return;
			}

			// Nhóm dữ liệu theo tháng
			const groupByMonth = (list, dateField) => {
				return list.reduce((acc, item) => {
					const date = dayjs(item[dateField]);
					const monthKey = date.format("MM-YYYY"); // Khóa nhóm: Tháng và Năm
					acc[monthKey] = (acc[monthKey] || 0) + 1; // Tăng chỉ số đếm
					return acc;
				}, {});
			};

			// Nhóm open và click theo tháng
			const openByMonth = groupByMonth(openingList, "opened_at");
			const clickByMonth = groupByMonth(clickingList, "clicked_at");

			// Tạo labels và dữ liệu hiển thị
			const uniqueMonths = [
				...new Set([...Object.keys(openByMonth), ...Object.keys(clickByMonth)]),
			].sort((a, b) => {
				const [monthA, yearA] = a.split("-").map(Number);
				const [monthB, yearB] = b.split("-").map(Number);
				return yearA !== yearB ? yearA - yearB : monthA - monthB;
			});

			const dataOpen = uniqueMonths.map((month) => openByMonth[month] || 0);
			const dataClick = uniqueMonths.map((month) => clickByMonth[month] || 0);

			setLabels(uniqueMonths); // Cập nhật nhãn (labels)
			setdataOpen(dataOpen); // Cập nhật dữ liệu open
			setdataClick(dataClick); // Cập nhật dữ liệu click
		} catch (error) {
			console.error("Error fetching campaign data:", error);
		}
	};

	const handleChangeCamp = async (e) => {
		const id = e.target.value;
		const selectedItem = campaigns.find((item) => item._id === id);
		setSelectedCampaigns(selectedItem ? selectedItem : null);
		await handleFetchAnalyze(id);
	};
	useEffect(() => {
		handleFetch();
	}, []);

	const Table = ({ data }) => (
		<table className="min-w-full bg-white rounded-lg shadow-sm mt-4">
			<thead className="bg-gray-50">
				<tr>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Index
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Name
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Email
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Timestamp
					</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((item, index) => (
						<tr className="hover:bg-gray-50" key={index}>
							<td className="py-2 px-4 border-b text-gray-700">{index + 1}</td>
							<td className="py-2 px-4 border-b text-gray-700">{item.name}</td>
							<td className="py-2 px-4 border-b text-gray-700">{item.email}</td>
							<td className="py-2 px-4 border-b text-gray-700">
								{item.status === "clicked"
									? new Date(item.clicked_at).toLocaleString("vi-VN")
									: item.status === "pending"
									? null
									: new Date(item.opened_at).toLocaleString("vi-VN")}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
	const TableBlocked = ({ data }) => (
		<table className="min-w-full bg-white rounded-lg shadow-sm mt-4">
			<thead className="bg-gray-50">
				<tr>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Index
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Name
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Email
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Timestamp
					</th>
					<th className="text-left py-2 px-4 border-b font-medium text-gray-600">
						Reason
					</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((item, index) => (
						<tr className="hover:bg-gray-50" key={index}>
							<td className="py-2 px-4 border-b text-gray-700">{index + 1}</td>
							<td className="py-2 px-4 border-b text-gray-700">{item.name}</td>
							<td className="py-2 px-4 border-b text-gray-700">{item.email}</td>
							<td className="py-2 px-4 border-b text-gray-700">
								{item.status === "clicked"
									? new Date(item.clicked_at).toLocaleString("vi-VN")
									: item.status === "pending"
									? null
									: new Date(item.opened_at).toLocaleString("vi-VN")}
							</td>
							<td className="py-2 px-4 border-b text-red-600">
								{item.error_message}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
	return (
		<>
			<div className="min-h-screen p-10 font-helveticeFont">
				<div className="bg-white shadow-lg flex flex-row rounded-lg p-6 mb-8">
					{/* Campaigns List */}
					<div className="relative w-4/5 mx-4 bg-white p-6 rounded-lg border border-gray-300">
						<h1 className="font-Means text-4xl font-bold text-gray-800 my-6">
							Campaigns
						</h1>
						<select
							onChange={async (e) => handleChangeCamp(e)}
							name="campaigns"
							id="campaigns"
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#007c89] focus:outline-none mb-6"
						>
							{campaigns &&
								campaigns.map((item, index) => {
									let alias =
										item.name.length > 100
											? item.name.substring(0, 100) + "..."
											: item.name;
									return (
										<option
											name="campaigns"
											key={index}
											value={item._id}
											title={item.name}
										>
											{alias}
										</option>
									);
								})}
						</select>
						<div className="flex flex-row selectedCamp ">
							<div className="w-1/4 space-y-4">
								<div>
									<label className="block text-gray-600 font-semibold">
										Name:
									</label>
									<span className="text-gray-800">
										{selectedCampaigns?.name}
									</span>
								</div>
								<div>
									<label className="block text-gray-600 font-semibold">
										Subject:
									</label>
									<span className="text-gray-800">
										{selectedCampaigns?.subject}
									</span>
								</div>
								<div>
									<label className="block text-gray-600 font-semibold">
										Status:
									</label>
									<span className="text-gray-800">
										<Tag color="cyan">{selectedCampaigns?.status}</Tag>
									</span>
								</div>
							</div>
							<div className="w-3/4 flex items-center justify-center h-72">
								<Line
									data={{
										labels: labels,
										datasets: [
											{
												label: "Open",
												data: dataOpen,
												borderColor: "rgb(75, 192, 192)",
												tension: 0.5,
											},
											{
												label: "Click",
												data: dataClick,
												borderColor: "rgb(255, 99, 132)",
												tension: 0.5,
											},
										],
									}}
									options={{
										responsive: true,
										plugins: {
											legend: {
												display: true,
												position: "right",
											},
										},
										scales: {
											x: {
												title: {
													display: true,
													text: "Timestamp",
												},
											},
											y: {
												title: {
													display: true,
													text: "Number of visits",
												},
											},
										},
									}}
								/>
							</div>
						</div>
						<div className="">
							<label className="block text-gray-600 font-semibold">
								Description:
							</label>
							<span className="text-gray-800">
								{selectedCampaigns?.description}
							</span>
						</div>
					</div>

					{/* Recipients Card */}
					<Card
						bordered={false}
						className="bg-white border border-gray-300 rounded-lg w-1/5 p-6"
					>
						<Statistic
							title="Recipients"
							value={dataCamp?.total}
							precision={0}
							valueStyle={{ color: "#3f8600" }}
							suffix="people"
						/>
						<div className="action_card mt-4">
							<Link
								to={`/dashboard/campaigns/editor?id=${selectedCampaigns?._id}`}
								className="py-3 block mx-auto bg-[#3598a5] text-white text-center font-medium rounded-md shadow-lg hover:brightness-125 hover:text-white transition-all duration-300 disabled:opacity-50"
							>
								View detail
							</Link>
						</div>
					</Card>
				</div>

				<div className="flex flex-col">
					{/* Clicked Card */}
					<Card className="bg-white shadow-md rounded-lg p-6 my-4">
						<Progress
							type="dashboard"
							percent={dataCamp?.clicking.percentage}
							strokeColor={conicColors}
						/>
						<Statistic
							title="Clicked count"
							value={dataCamp?.clicking.clicked}
							precision={0}
							valueStyle={{ color: "#3f8600" }}
							suffix="times"
						/>
						<Table data={dataCamp?.clicking.list} />
					</Card>

					{/* Opening Card */}
					<Card className="bg-white shadow-md rounded-lg p-6 my-4">
						<Progress
							type="dashboard"
							percent={dataCamp?.opening.percentage}
							strokeColor={conicColors}
						/>
						<Statistic
							title="Opened count"
							value={dataCamp?.opening.opened}
							precision={0}
							valueStyle={{ color: "#3f8600" }}
							suffix="people"
						/>
						<Table data={dataCamp?.opening.list} />
					</Card>

					{/* Unwatch Card */}
					<Card className="bg-white shadow-md rounded-lg p-6 my-4">
						<Progress
							type="dashboard"
							percent={dataCamp?.unwatch.percentage}
							strokeColor={conicColors}
						/>
						<Statistic
							title="Unwatch count"
							value={dataCamp?.unwatch.unwatch}
							precision={0}
							valueStyle={{ color: "#3f8600" }}
							suffix="people"
						/>
						<Table data={dataCamp?.unwatch.list} />
					</Card>
					{/* Blocked Card */}
					<Card className="bg-white border border-red-700 shadow-md rounded-lg p-6 my-4">
						<Progress
							type="dashboard"
							percent={dataCamp?.blocked.percentage}
							strokeColor={conicColors}
						/>
						<Statistic
							title="Blocked count"
							value={dataCamp?.blocked.blocked}
							precision={0}
							valueStyle={{ color: "#3f8600" }}
							suffix="people"
						/>
						<TableBlocked data={dataCamp?.blocked.list} />
					</Card>
				</div>
			</div>
		</>
	);
}

export default Campaigns;
