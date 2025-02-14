import useQuery from "../hooks/useQuery.js";
import { useState, useContext } from "react";
import { POST } from "../api/index.js";
import { SERVICE } from "../enum/service.js";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { MessageContext } from "../context/MessageContext.jsx";
function FormBlacklist() {
	const query = useQuery();
	const campaign_id = query.get("campaign_id");
	const email = query.get("email");
	const [reason, setReason] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { showMessage } = useContext(MessageContext);
	const handleFetchCampaign = async () => {};

	const options = [
		"Too many emails",
		"Not relevant",
		"I no longer use your service",
	];

	const handleChangeValue = (e) => {
		const { value } = e.target;
		setReason(value);
	};

	const handleOtherRs = (name, value) => {
		setReason(value);
	};

	const handleSubmit = async () => {
		setError(null);
		setLoading(true);
		const data = {
			message: reason,
			campaign_id,
			email,
		};

        if(!data.message){
            showMessage("Please choose a reason!", "error");
            setLoading(false);
            return;
        }

		const response = await POST(`${SERVICE.EMAIL}/delivery/blacklist`, {
			...data,
		});
		if (response.error) {
			showMessage(response.message, "error");
			setError(true);
			setLoading(false);
			return;
		}
		showMessage("Your feedback has been submitted successfully!", "success");
		setLoading(false);
		setError(false);
	};

	function form() {
		return (
			<>
				<div className="first-item w-full md:w-1/4 flex justify-center items-center mb-4 md:mb-0">
					<img
						src="https://static.vecteezy.com/system/resources/thumbnails/050/702/095/small_2x/yellow-why-speech-bubble-icon-symbol-web-design-sticker-design-png.png"
						alt="Why Icon"
					/>
				</div>
				<div className="w-full md:w-3/4">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">
						Please choose 1 reason why you do not want to receive the email from
						us!
					</h3>
					<div className="space-y-4">
						{options.map((opt, index) => (
							<div className="flex items-center space-x-3" key={index}>
								<input
									onClick={(e) => handleChangeValue(e)}
									value={opt}
									type="radio"
									id={`reason${index}`}
									name="reason"
									className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
								/>
								<label for={`reason${index}`} className="text-gray-700 text-sm">
									Option {index + 1}: {opt}
								</label>
							</div>
						))}
						<div className="flex items-center space-x-3">
							<input
								type="radio"
								id="reason4"
								name="reason"
								className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
							/>
							<label for="reason4" className="text-gray-700 text-sm">
								Other (Please specify):
							</label>
							<textarea
								onChange={(e) => handleOtherRs("reason", e.target.value)}
								className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
								rows="3"
								id="reason4-details"
								placeholder="Enter your reason here..."
							></textarea>
						</div>
					</div>
					<div className="mt-6 space-x-4">
						<Link
							to="/"
							className="px-6 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Back to Home
						</Link>
						<button
							onClick={handleSubmit}
							className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Submit
						</button>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			{error === null && (
				<div className="bg-white rounded-lg m-4 border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start">
					{form()}
				</div>
			)}
			{error === false && (
				<div className="text-center bg-white rounded-lg m-4 border border-gray-200 shadown-sm p-6">
					<Result
						status="success"
						title="Thanks for submitting your feedback!"
						subTitle="Were always looking to improve our service and your feedback is invaluable to us."
						extra={
							<Link
								to="/"
								className="px-4 py-2 border border-gray-200 bg-none rounded-lg"
							>
								Back Home
							</Link>
						}
					/>
				</div>
			)}
			{error === true && (
				<div className="text-center bg-white rounded-lg m-4 border border-gray-200 shadown-sm p-6">
					<Result
						status="500"
						title="500"
						subTitle="Sorry, something went wrong."
						extra={
							<Link
								to="/"
								className="px-4 py-2 border border-gray-200 bg-none rounded-lg"
							>
								Back Home
							</Link>
						}
					/>
				</div>
			)}
		</>
	);
}

export default FormBlacklist;
