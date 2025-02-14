import { Link } from "react-router-dom";
import { GET, POST } from "../../../../api";
import { SERVICE } from "../../../../enum/service";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function CreateTemplate() {
	const [types, setTypes] = useState(null);
	const fetchTypes = async () => {
		const response = await GET(`${SERVICE.EMAIL}/campaign/types?except=all`);
		if (response.error) {
			console.log(response.error);
			return;
		}

		setTypes(response.data);
	};

	const [template, setTemplate] = useState({
		name: "",
		subject: "",
		type: "email",
	});

	const handleChangeValue = (e) => {
		setTemplate({ ...template, [e.target.name]: e.target.value });
	}

	const handleCreateTemplate = async (e) => {
		e.preventDefault();
		const response = await POST(`${SERVICE.EMAIL}/template/create`, { ...template });
		if (response.error) {
			console.log(response.error);
			return;
		}
		const { _id } = response.data;
		window.location = `/dashboard/templates/scratch?id=${_id}`;
	}

	useEffect(() => {
		fetchTypes();
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center relative">
			<div>
				<Link className="top-6 left-6 absolute border border-[#007c89] p-2 rounded-xl bg-green-100 hover:bg-green-200" to="/dashboard/templates">
					<ArrowLeftIcon className="w-6 h-6 text-[#007c89]" />
				</Link>
			</div>
			<div className="w-full max-w-4xl bg-gray-100 rounded-lg shadow-lg p-8">
				<h1 className="font-Means font-semibold text-3xl text-center mb-6">
					Create a New Template
				</h1>
				<form className="space-y-4">
					{/* Name Field */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Template name
						</label>
						<input
							value={template.name}
							onChange={e => handleChangeValue(e)}
							type="text"
							id="name"
							name="name"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
							placeholder="Enter template name"
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
							onChange={e => handleChangeValue(e)}
							type="text"
							name="subject"
							id="subject"
							className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007c89] focus:border-transparent transition"
							placeholder="Enter template subject"
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
							onClick={e => handleCreateTemplate(e)}
							className="py-3 px-8 block mx-auto bg-[#3598a5] text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
						>
							Create Template
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateTemplate;