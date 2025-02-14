import React, { useEffect, useState, useContext } from "react";
import { ScratchContext } from "../../../../context/ScratchContext";
import GroupAdd from "../../../../assets/icons/group-add.svg";
import PersonAdd from "../../../../assets/icons/person-add.svg";
import { DELETE, PATCH, POST, GET } from "../../../../api";
import {
	PersonIcon,
} from "@radix-ui/react-icons";
import { SERVICE } from "../../../../enum/service";
import { Modal, Button } from "antd";

function Recipients() {
	const { campaignId } = useContext(ScratchContext);

	const [activeTab, setActiveTab] = useState("type-1");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		handleGetRecipients();
	}, []);

	const deleteRecipient = async (_id) => {
		const response = await DELETE(
			`${SERVICE.EMAIL}/recipient/remove?id=${_id}`,
		);
		if (response.error) {
			console.log(response.message);
			return;
		}

		handleGetRecipients();
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editInfo, setEditInfo] = useState({
		name: "",
		email: "",
		_id: "",
	});

	const handleEditInfo = (e) => {
		setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
	};

	const showModal = (_id, name, email) => {
		setEditInfo({ _id, name, email });
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		const response = await PATCH(`${SERVICE.EMAIL}/recipient/edit`, {
			...editInfo,
		});
		if (response.error) {
			console.log(response.message);
			return;
		}
		handleGetRecipients();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Recipients and other state logic
	const [recipients, setRecipients] = useState([]);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [bulkInput, setBulkInput] = useState("");

	const handleAddRecipient = async (e) => {
		e.preventDefault();
		if (email && name) {
			const data = {
				campaign_id: campaignId,
				recipients: [{ email, name }],
			};
			const response = await POST(`${SERVICE.EMAIL}/recipient/adds`, {
				...data,
			});
			if (response.error) {
				console.log(response.message);
				return;
			}

			await handleGetRecipients();
			setEmail(""); // Clear the email input field
			setName(""); // Clear the name input field
		}
	};

	const handleGetRecipients = async () => {
		const response = await GET(
			`${SERVICE.EMAIL}/recipient/views?campaign_id=${campaignId}`,
		);
		if (response.error) {
			console.log(response.message);
			return;
		}

		setRecipients(response.data);
	};

	const handleBulkAdd = async () => {
		const lines = bulkInput.split("\n");
		const newRecipients = lines
			.map((line) => {
				const [name, email] = line.split(",");
				return name && email
					? { name: name.trim(), email: email.trim() }
					: null;
			})
			.filter(Boolean); // Remove any invalid entries
		const data = {
			campaign_id: campaignId,
			recipients: [...newRecipients],
		};
		const response = await POST(`${SERVICE.EMAIL}/recipient/adds`, { ...data });
		if (response.error) {
			console.log(response.message);
			return;
		}

		await handleGetRecipients();
		setBulkInput("");
	};

	const [isFormValid, setIsFormValid] = useState(false);
	useEffect(() => {
		setIsFormValid(editInfo.email !== '' && editInfo.name !== '' && editInfo.email.includes('@'));
	}, [editInfo.email, editInfo.name]);

	function Type1() {
		return (
			<div class="mx-4 p-10 bg-gray-50 rounded-lg shadow-md">
				<h1 class="text-4xl font-Means font-semibold text-gray-800 mb-4">
					Add recipients
				</h1>
				<form className="space-y-6" onSubmit={handleAddRecipient}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Recipient's email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter recipient's email"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
						/>
					</div>

					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Recipient name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter recipient's name"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
						/>
					</div>

					<div className="text-center">
						<button
							type="submit"
							className="py-3 px-8 block mx-auto bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
						>
							Add recipient
						</button>
					</div>
				</form>
			</div>
		);
	}

	function Type2() {
		return (
			<div class="mx-4 p-10 bg-gray-50 rounded-lg shadow-md">
				<h1 class="text-4xl font-Means font-semibold text-gray-800 mb-4">
					Add more recipients
				</h1>
				<div className="space-y-6">
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Recipients list
						</label>
						<textarea
							value={bulkInput}
							onChange={(e) => setBulkInput(e.target.value)}
							rows="6"
							placeholder={`Paste the email and name pairs, separated by lines\nExample:\nJohn, john@example.com\nJane, jane@example.com`}
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
						></textarea>
					</div>

					<div className="text-center">
						<button
							onClick={handleBulkAdd}
							className="py-3 px-8 block mx-auto bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
						>
							Add more recipients
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="p-6">
				<div className="flex border-b-2 border-gray-200">
					<button
						onClick={() => handleTabClick("type-1")}
						className={`flex flex-row items-center px-4 py-2 space-x-2 text-sm font-medium border-b-2 ${activeTab === "type-1"
							? "border-blue-500 text-blue-500"
							: "border-transparent text-gray-500"
							}`}
					>
						<img src={PersonAdd} alt="GroupAdd" className="w-4 h-4" />
						<span>Add Recipients</span>
					</button>
					<button
						onClick={() => handleTabClick("type-2")}
						className={`flex flex-row items-center px-4 py-2 space-x-1 text-sm font-medium border-b-2 ${activeTab === "type-2"
							? "border-blue-500 text-blue-500"
							: "border-transparent text-gray-500"
							}`}
					>
						<img src={GroupAdd} alt="GroupAdd" className="w-6 h-6" />
						<span>Add More Recipients</span>
					</button>
				</div>

				<div className="mt-6">
					{activeTab === "type-1" && Type1()}
					{activeTab === "type-2" && Type2()}
				</div>
			</div>
			{recipients.length > 0 && (
				<div className="px-10 w-full mb-10">
					<div className="flex flex-row items-center justify-between mb-4">
						<div className="flex items-center space-x-2">
							<PersonIcon className="size-6" />
							<h2 className="text-2xl font-semibold">Recipients List</h2>
						</div>
						<Button onClick={handleGetRecipients}>
							<i className="fa-solid fa-retweet" />
							Refresh
						</Button>
					</div>

					<table className="min-w-full table-auto font-GraphikFont">
						<thead className="text-sm">
							<tr className="text-left text-gray-700">
								<th className="py-2 px-4 border-b">Full name</th>
								<th className="py-2 px-4 border-b">Email</th>
								<th className="py-2 px-4 border-b text-center">Actions</th>
							</tr>
						</thead>
						<tbody class="text-sm font-sans text-gray-800">
							{recipients.map((recipient, index) => (
								<tr
									key={index}
									class="border-b border-gray-300 hover:bg-gray-200 transition"
								>
									<td class="py-3 px-5">{recipient.name}</td>
									<td class="py-3 px-5">{recipient.email}</td>
									<td class="py-3 px-5 flex justify-center">
										<div className="border border-blue-400 w-fit h-[48px] rounded-lg flex flex-row items-center">
											<button
												onClick={() =>
													showModal(
														recipient._id,
														recipient.name,
														recipient.email,
													)
												}
												class="text-blue-400 font-semibold mx-2 underline-offset-2 hover:underline"
											>
												Edit
											</button>
											<hr className="border-r border-blue-400 h-full" />
											<button
												onClick={async () => deleteRecipient(recipient._id)}
												class="text-red-400 font-semibold mx-2 underline-offset-2 hover:underline"
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Modal
						title="Edit recipient information"
						open={isModalOpen}
						onOk={() => handleOk()}
						onCancel={handleCancel}
						okButtonProps={{ disabled: !isFormValid }}
						className="rounded-lg shadow-lg p-6"
					>
						<div className="space-y-4">
							{/* Email Input */}
							<div>
								<label
									htmlFor="email"
									className="block text-gray-700 font-medium mb-2"
								>
									Email
								</label>
								<input
									type="email"
									name="email"
									onChange={(e) => handleEditInfo(e)}
									id="email"
									value={editInfo.email}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* Name Input */}
							<div>
								<label
									htmlFor="name"
									className="block text-gray-700 font-medium mb-2"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									onChange={(e) => handleEditInfo(e)}
									id="name"
									value={editInfo.name}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</Modal>
				</div>
			)}
		</>
	);
}

export default Recipients;