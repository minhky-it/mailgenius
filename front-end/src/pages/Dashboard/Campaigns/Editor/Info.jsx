import { useContext, useEffect, useState } from "react";
import { Tag, message } from "antd";
import { ScratchContext } from "../../../../context/ScratchContext";
import { MessageContext } from "../../../../context/MessageContext.jsx";
import { GET, PATCH } from "../../../../api/index.js";
import { SERVICE } from "../../../../enum/service.js";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
function Info() {
	const { campaignId, campaign, setCampaign } = useContext(ScratchContext);
	const { showMessage } = useContext(MessageContext);


	const [messageApi, contextHolder] = message.useMessage();
	const success = (msg, type) => {
		messageApi.open({
			type: type,
			content: msg,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await PATCH(`${SERVICE.EMAIL}/campaign/update`, {
			_id: campaignId,
			name: campaign.name,
			subject: campaign.subject,
			description: campaign.description,
		});

		if (response.data) {
			success("Campaign updated successfully", "success");
		}
	};

	useEffect(() => {
		fetchCampaignDetails(campaignId);
	}, [campaignId]);

	const fetchCampaignDetails = async (campaignId) => {
		const response = await GET(
			`${SERVICE.EMAIL}/campaign/view?id=${campaignId}`,
		);

		if (response.error) {
			showMessage(response.message, "error");
			return;
		}

		setCampaign(response.data);
	};


	const onSave = async () => {
		const response = await PATCH(`${SERVICE.EMAIL}/campaign/update`, {
			...campaign,
		});
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}
		await fetchCampaignDetails(campaignId);
	};
	const handleChangeValue = (e) => {
		setCampaign({...campaign, [e.target.name]: e.target.value });
	}
	return (
		<>
			{contextHolder}
			<div class="mx-6 p-6 bg-gray-50 rounded-lg shadow-md">
				<h1 class="text-4xl font-Means font-semibold text-gray-800">
					Campaign Details
				</h1>
				<hr className="border-gray-300 my-4" />
				<form onSubmit={handleSubmit} className="space-y-4 font-GraphikFont">
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Campaign ID</span>
						<span class="text-gray-800 font-helveticeFont">{campaignId}</span>
					</div>
					<div className="flex justify-between items-center mb-4">
						<span className="text-gray-600 font-medium">Name</span>
						<div className="relative flex justify-end w-4/6">
							<input
								type="text"
								id="campaign_name"
								value={campaign?.name}
								name="name"
								onChange={(e) => handleChangeValue(e)}
								className="w-full text-end font-helveticeFont border-b border-gray-300 py-2 px-3 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="New campaign name"
								required
							/>
							<ChevronLeftIcon className="w-5 h-5 absolute left-0 bottom-0 transform -translate-y-1/2 text-gray-400" />
						</div>
					</div>
					<div className="flex justify-between items-center mb-4">
						<span className="text-gray-600 font-medium">Subject</span>
						<div className="relative flex justify-end w-4/6">
							<input
								type="text"
								id="campaign_subject"
								value={campaign?.subject}
								onChange={(e) => handleChangeValue(e)}
								name="subject"
								className="w-full text-end font-helveticeFont border-b border-gray-300 py-2 px-3 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="New campaign subject"
								required
							/>
							<ChevronLeftIcon className="w-5 h-5 absolute left-0 bottom-0 transform -translate-y-1/2 text-gray-400" />
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Description</span>
						<div className="relative flex justify-end w-4/6">
							<input
								type="text"
								id="campaign_description"
								value={campaign?.description}
								onChange={e => handleChangeValue(e)}
								name="description"
								className="w-full text-end font-helveticeFont border-b border-gray-300 py-2 px-3 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="New campaign name"
								required
							/>
							<ChevronLeftIcon className="w-5 h-5 absolute left-0 bottom-0 transform -translate-y-1/2 text-gray-400" />
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Type</span>
						<span class="text-gray-800 font-helveticeFont capitalize">
							{campaign?.type}
						</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Status</span>
						<Tag color="blue">{campaign?.status}</Tag>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Created at</span>
						<span class="text-gray-800 font-helveticeFont">
							{new Date(campaign?.create_at).toDateString()}
						</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-gray-600 font-medium">Updated at</span>
						<span class="text-gray-800 font-helveticeFont">
							{new Date(campaign?.update_at).toDateString()}
						</span>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="py-3 px-8 bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
						>
							Update campaign
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Info;
