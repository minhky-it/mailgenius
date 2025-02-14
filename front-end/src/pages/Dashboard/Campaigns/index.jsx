import { useState, useEffect } from "react";
import { Tag } from "antd";
import { GET, POST, DELETE } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { Link } from "react-router-dom";
import { EnvelopeClosedIcon, IdCardIcon, MagnifyingGlassIcon, ReaderIcon } from "@radix-ui/react-icons";
import { debounce } from 'lodash';

function Campaigns() {
	const [camps, setCamps] = useState(null);
	const [types, setTypes] = useState(null);
	const [type, setType] = useState("email");
	useEffect(() => {
		handleFetchCamps("all");
		handleFetchType();
	}, []);

	const handleFetchCamps = async (type) => {
		const response = await GET(`${SERVICE.EMAIL}/campaign/views?type=${type}`);

		if (response.error) {
			console.log(response.message);
			return;
		}
		setCamps([...response.data]);
	};

	const handleFetchType = async () => {
		const response = await GET(`${SERVICE.EMAIL}/campaign/types`);
		if (response.error) {
			console.log(response.message);
			return;
		}
		setTypes([...response.data]);
	};

	const handleChangeType = (e) => {
		setType(e.target.value);
		handleFetchCamps(e.target.value);
	};

	const handleSearchCamps = debounce(async (name) => {
		const response = await POST(`${SERVICE.EMAIL}/campaign/search`, { name, type });
		console.log(response);
		if (response.error) {
			console.log(response.message);
			return;
		}
		setCamps([...response.data]);
	}, 500);

	const deleteCampaign = async (id) => {
		const response = await DELETE(`${SERVICE.EMAIL}/campaign/remove?id=${id}`);
		if (response.error) {
			console.log(response.message);
			return;
		}
		handleFetchCamps(type);
	}
	return (
		<>
			<div class="flex items-center space-x-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-md m-2 font-GraphikFont">
				<div className="relative w-full">
					<input
						onChange={e => handleSearchCamps(e.target.value)}
						type="text"
						placeholder="Search campaigns"
						className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 placeholder:text-[#241c15a6] text-[#09090b] hover:border-[#007c89] focus:border-[#007c89] focus:outline-none"
					/>
					<MagnifyingGlassIcon className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
				</div>
				<select
					onChange={(e) => handleChangeType(e)}
					name="type"
					class="px-4 py-2 border border-gray-300 rounded-md hover:border-[#007c89] focus:border-[#007c89] focus:outline-none"
				>
					{types &&
						types.map((item) => (
							<option className="text-[#09090b] uppercase-first-letter" value={item} key={item}>
								{item.toUpperCase()}
							</option>
						))}
				</select>
			</div >

			<table className="table-auto font-GraphikFont w-11/12 mx-auto">
				<thead className="text-sm">
					<tr className="text-left text-gray-500">
						<th>Name</th>
						<th>Description</th>
						<th>Status</th>
						<th>Create at</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="text-sm font-helveticeFont">
					{camps &&
						camps.map((item) => (
							<tr className="border-b border-gray-400 text-[#241c15a6]">
								<td className="py-4 space-y-2">
									<Link to={`/dashboard/campaigns/editor?id=${item._id}`} className="text-[#007c89] text-base font-semibold">
										{item.name}
									</Link>
									<div className="flex flex-col space-y-1">
										<span className="text-[#241c15]">
											{item.type === "email" ? (
												<div className="flex items-center space-x-2">
													<EnvelopeClosedIcon />
													<span>Regular email</span>
												</div>
											) : []}
											{item.type === "landing" ? (
												<div className="flex items-center space-x-2">
													<IdCardIcon />
													<span>Landing page</span>
												</div>
											) : []}
											{item.type === "form" ? (
												<div className="flex items-center space-x-2">
													<ReaderIcon />
													<span>Popup form</span>
												</div>
											) : []}
										</span>
										<span class="subject text-sm">
											{item.subject}
										</span>
									</div>
								</td>
								<td className="py-4">
									<div class="description text-sm">
										{item.description}
									</div>
								</td>
								<td className="py-4">
									<div class="flex justify-between items-center text-sm">
										<Tag color="cyan">{item.status}</Tag>
									</div>
								</td>
								<td className="py-4">{new Date(item.create_at).toDateString()}</td>
								<td className="py-4">
									<div className="border border-[#007c89] w-fit h-[48px] rounded-lg flex flex-row items-center">
										<Link
											to={`/dashboard/campaigns/editor?id=${item._id}`}
											className="text-[#007c89] font-semibold mx-2 underline-offset-2 hover:underline"
										>
											Edit
										</Link>
										<hr className="border-r border-[#007c89] h-full" />
										<button onClick={async () => deleteCampaign(item._id)} className="text-red-400 font-semibold mx-2 underline-offset-2 hover:underline">
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table >
		</>
	);
}

export default Campaigns;