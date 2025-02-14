import { ScratchContext } from "../../../../context/ScratchContext";
import { useContext, useState, useEffect } from "react";
import { Result, Spin, DatePicker, TimePicker } from "antd";
import { POST } from "../../../../api";
import { SERVICE } from "../../../../enum/service";
import { MessageContext } from "../../../../context/MessageContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Schedule() {
	const { campaignId, campaign, html, handleSetStage, dateStore,
		selectedDate, selectedTime, setSelectedDate, setSelectedTime } = useContext(ScratchContext);
	const { showMessage } = useContext(MessageContext);
	const [sending, setSending] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);

	const onChangeDate = (date, dateString) => {
		setSelectedDate(dateString);
	};

	const onChangeTime = (time, timeString) => {
		setSelectedTime(timeString);
	};

	useEffect(() => {
		if (campaignId) {
			const dateSelectedList = JSON.parse(localStorage.getItem('dateSelectedList')) || [];
			const currentEntry = dateSelectedList.find(entry => entry.campaignId === campaignId);

			if (currentEntry) {
				setSelectedDate(currentEntry.date);
				setSelectedTime(currentEntry.time);
			}
		}
	}, [campaignId]);

	const handleSend = async () => {
		setSending(true);
		const data = {
			campaign_id: campaignId,
			html,
		};

		const response = await POST(`${SERVICE.EMAIL}/delivery/send`, { ...data });
		if (response.error) {
			setSending(false);
			showMessage(response.message, "error");
			setStatus("failed");
			setError(response.message);
			return;
		}
		setSending(false);
		showMessage(response.message);
		setStatus("success");
	};

	const scheduleDateTime = new Date(`${selectedDate}T${selectedTime}`);
	const handleSchedule = async () => {
		const data = {
			campaign_id: campaignId,
			html,
			schedule: scheduleDateTime,
		};

		const response = await POST(`${SERVICE.EMAIL}/delivery/schedule`, { ...data });
		if (response.error) {
			showMessage(response.message, "error");
			setError(response.message);
			return;
		}
		dateStore(selectedDate, selectedTime);
		showMessage(response.message);
	};
	return (
		<>
			<div className="mx-4 p-10 bg-gray-50 rounded-lg shadow-md space-y-6">
				{!status && (
					<Spin spinning={sending}>
						<h1 className="text-4xl font-Means font-semibold text-gray-800 mb-4">
							Schedule email sending
						</h1>

						<div className="mb-4">
							<label
								className="block text-sm font-medium text-gray-700 mb-2"
								htmlFor="subject"
							>
								Subject
							</label>
							<input
								value={campaign?.subject}
								type="text"
								id="subject"
								className="rounded-md border border-gray-300 p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
								placeholder="Enter email subject"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Select sending time
							</label>
							<div className="flex space-x-4">
								<DatePicker
									placeholder="Select date YYYY-MM-DD"
									className="w-1/2 p-3 border border-gray-300 rounded-lg"
									onChange={onChangeDate}
									value={selectedDate ? dayjs(selectedDate) : null}
								/>
								<TimePicker
									placeholder="Select time HH:MM:SS"
									className="w-1/2 p-3 border border-gray-300 rounded-lg"
									onChange={onChangeTime}
									value={selectedTime ? dayjs("2000-01-01T" + selectedTime) : null}
								/>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex justify-end space-x-4">
							<button
								disabled={!selectedDate || !selectedTime}
								onClick={async () => handleSchedule()}
								className="py-3 px-8 block border border-blue-400 text-blue-400 font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
							>
								Schedule send
							</button>
							<button
								onClick={async () => handleSend()}
								className="py-3 px-8 block bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
							>
								Send now
							</button>
						</div>
					</Spin>
				)}
				{status === "success" && (
					<Result
						status="success"
						title="Successfully send email marketing!"
						subTitle={`Campaign id: ${campaignId} Email Server takes 1-5 minutes, please wait.`}
						extra={[
							<Link
								to="/dashboard/audience/all-contacts"
								class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 text-white py-2 px-4 rounded-lg shadow-lg text-center font-medium"
							>
								Go console
							</Link>,
						]}
					/>
				)}
				{status === "failed" && (
					<Result
						status="error"
						title="Submission failed"
						subTitle="Please check and modify the following information before resubmitting."
						extra={[
							<button
								onClick={() => handleSetStage("info")}
								class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 text-white py-2 px-4 rounded-lg shadow-lg text-center font-medium"
							>
								Back to check
							</button>,
						]}
					>
						<span>
							<strong>Error: </strong>
							{error}
						</span>
					</Result>
				)}
			</div>
		</>
	);
}

export default Schedule;