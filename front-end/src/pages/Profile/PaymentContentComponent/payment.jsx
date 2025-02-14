import { GET } from "../../../api/index";
import { useEffect, useState, useContext } from "react";
import { SERVICE } from "../../../enum/service";
import { MessageContext } from "../../../context/MessageContext";
import PaymentContent from "../Payment/index.jsx";
import { Progress } from "antd";
function Payment() {
	// Dữ liệu thanh toán
	const [payment, setPayment] = useState(null);
	const [subscription, setSubscription] = useState(null);
	const { showMessage } = useContext(MessageContext);

	// Gọi API để lấy thông tin thanh toán
	useEffect(() => {
		handleFetchPayment();
		handleFetchPlan();
	}, []);

	const handleFetchPayment = async () => {
		const response = await GET(`${SERVICE.PAYMENT}/payment/view`);
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}
		setPayment(response.data);
		showMessage(response.message);
	};

	const handleFetchPlan = async () => {
		const response = await GET(`${SERVICE.EMAIL}/plan`);
		setSubscription(response.data);
	}
	return (
		<>
			<div className="m-4">
				<div className="font-helveticeFont mt-6 bg-white px-4 py-6 rounded-lg border border-gray-200 shadow-sm overflow-y-auto z-10 custom-scrollbar">
					<h3 className="font-semibold text-[18px] mb-4 text-[#241c15]">
						Payment Details
					</h3>
	
					<div className="flex items-center justify-between mb-4">
						<span className="font-medium text-gray-500">💰 Coins:</span>
						<span className="font-medium text-gray-800">
							{payment?.coins.toLocaleString("vi-VN")}
						</span>
					</div>
	
					{/* Memberships Section */}
					<div className="mb-4">
						<div className="font-medium text-gray-500 mb-2">
							🎉 Memberships:
						</div>
						<div className="bg-gray-50 p-4 rounded-md border border-gray-200">
							<p className="font-medium text-[#241c15]">
								Plan:{" "}
								<span className="text-blue-600">
									{payment?.memberships?.planName || "N/A"}
								</span>
							</p>
							<p className="font-medium text-[#241c15] mt-1">
								Expire:{" "}
								<span className="text-green-600">
									{new Date(payment?.memberships?.expire).toLocaleDateString(
										"vi-VN",
									)}
								</span>
							</p>
						</div>
	
						{/* Cancel Plan Button */}
						<button
							className="mt-4 px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
							// onClick={handleCancelPlan}
						>
							Cancel Plan
						</button>
					</div>
	
					<div className="flex items-center justify-between">
						<span className="font-medium text-gray-500">🕒 Timestamp:</span>
						<span className="font-medium text-gray-800">
							{new Date(payment?.timestamp).toLocaleString("vi-VN")}
						</span>
					</div>
				</div>
	
				{subscription && (
					<div className="flex flex-col md:flex-row justify-between px-4 py-6 bg-white border border-gray-200 shadow-sm rounded-lg my-4">
						<div className="space-y-2 w-full mx-2">
							<label className="block text-base font-medium text-[#86A788]">
								Campaign
							</label>
							<div className="text-sm">
								<span>Daily create</span>
								<Progress
									strokeLinecap="round"
									percent={(subscription?.plan_service?.campaign?.data?.total / subscription.plan_service?.campaign?.limit?.daily_create) * 100}
									format={(percent) => `${Math.round((percent / 100) * subscription.plan_service?.campaign?.limit?.daily_create)}/${subscription.plan_service?.campaign?.limit?.daily_create}`}
									strokeColor="#86A788"
									size={[, 8]}
								/>
								<span>Total create</span>
								<Progress
									strokeLinecap="round"
									percent={(subscription.plan_service?.campaign?.data?.total / subscription.plan_service?.campaign?.limit?.total_create) * 100}
									format={(percent) => `${Math.round((percent / 100) * subscription.plan_service?.campaign?.limit?. total_create)}/${subscription.plan_service?.campaign?.limit?.total_create}`}
									strokeColor="#86A788"
									size={[, 8]}
								/>
							</div>
						</div>
						<div className="space-y-2 w-full mx-2">
							<label className="block text-base font-medium text-[#86A788]">
								Email
							</label>
							<div className="text-sm">
								<span>Daily send</span>
								<Progress
									strokeLinecap="round"
									percent={(subscription?.plan_service?.email?.data?.daily / subscription.plan_service?.email?.limit?.daily_send) * 100}
									format={(percent) => `${(percent / 100) * subscription.plan_service?.email?.limit?.daily_send}/${subscription.plan_service?.email?.limit?.daily_send}`}
									strokeColor="#86A788"
									size={[, 8]}
								/>
								<span>Total send</span>
								<Progress
									strokeLinecap="round"
									percent={(subscription?.plan_service?.email?.data?.total / subscription.plan_service?.email?.limit?.total_send) * 100}
									format={(percent) => `${Math.round((percent / 100) * subscription.plan_service?.email?.limit?.total_send)}/${subscription.plan_service?.email?.limit?.total_send}`}
									strokeColor="#86A788"
									size={[, 8]}
								/>
							</div>
						</div>
					</div>
				)}
	
				{/* Payment vendors */}
				<PaymentContent />
			</div>
		</>
	);
}

export default Payment;
