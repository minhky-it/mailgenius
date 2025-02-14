import { GET, POST } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MessageContext } from "../../../context/MessageContext";

function CreateCampaign() {
	const { showMessage } = useContext(MessageContext);
	const [types, setTypes] = useState(null);
	const fetchTypes = async () => {
		const response = await GET(`${SERVICE.EMAIL}/campaign/types?except=all`);
		if (response.error) {
			console.log(response.error);
			return;
		}

		setTypes(response.data);
	};

	const [campaign, setCampaign] = useState({
		name: "",
		subject: "",
		description: "",
		type: "email",
	});

	const handleChangeValue = (e) => {
		setCampaign({ ...campaign, [e.target.name]: e.target.value });
	}

	const handleCreateCampaign = async (e) => {
		e.preventDefault();
		const response = await POST(`${SERVICE.EMAIL}/campaign/create`, { ...campaign });
		if (response.error) {
			showMessage(response.message, "error");
			console.log(response.error);
			return;
		}
		showMessage(response.message);
		const { _id } = response.data;
		window.location = `/dashboard/campaigns/editor?id=${_id}`;
	}

	useEffect(() => {
		fetchTypes();
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-4xl bg-gray-100 rounded-lg shadow-lg p-8">
				<h1 className="font-Means font-semibold text-3xl text-center mb-6">
					Create a New Campaign
				</h1>
				<form onSubmit={e => handleCreateCampaign(e)} className="space-y-4">
					{/* Name Field */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Campaign name
						</label>
						<input
							required
							value={campaign.name}
							onChange={e => handleChangeValue(e)}
							type="text"
							id="name"
							name="name"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
							placeholder="Enter campaign name"
						/>
					</div>

					{/* Subject Field */}
					<div>
						<label
							htmlFor="subject"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Subject
						</label>
						<input
							required
							type="text"
							onChange={e => handleChangeValue(e)}
							name="subject"
							id="subject"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
							placeholder="Enter email subject"
						/>
					</div>

					{/* Description Field */}
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Description
						</label>
						<textarea
							required
							onChange={e => handleChangeValue(e)}
							name="description"
							id="description"
							rows="4"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
							placeholder="Enter campaign description"
						/>
					</div>

					{/* Type Field */}
					<div>
						<label
							htmlFor="type"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Campaign type
						</label>
						<select
							onChange={e => handleChangeValue(e)}
							id="type"
							name="type"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
						>
							{types &&
								types.map((item) => (
									<option className="text-[#09090b] uppercase-first-letter" value={item} key={item}>
										{item.toUpperCase()}
									</option>
								))}
						</select>
					</div>

					{/* Submit Button */}
					<div className="text-center">
						<button
							className="py-3 px-8 block mx-auto bg-[#3598a5] text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
						>
							Create Campaign
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateCampaign;