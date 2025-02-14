import useQuery from "../../hooks/useQuery";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GET, POST } from "../../api/index.js";
import { SERVICE } from "../../enum/service";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function ProceedPlan() {
	const [id, setId] = useState(null);
	const query = useQuery();
	const { user } = useContext(AuthContext);
	const [payment, setPayment] = useState(null);
	useEffect(() => {
		setId(query.get("buyId"));
		fetchPayment();
		fetchPlan(query.get("buyId"));
	}, []);

	const fetchPayment = async () => {
		const response = await GET(`${SERVICE.PAYMENT}/payment/view`);
		if (response.error) {
			console.error(response.error);
			return;
		}
		setPayment(response.data);
	}

	const processPayment = async () => {
		const response = await POST(`${SERVICE.PAYMENT}/plan/buy?id=${id}`);

		if (response.error) {
			console.error(response.error);
			return;
		}

		window.location = "/profile?tab=payment"
	}

	const [plan, setPlan] = useState(null);

	const fetchPlan = async (id) => {
		const response = await GET(`${SERVICE.PAYMENT}/plan/view?id=${id}`);
		if (response.error) {
			console.error(response.error);
			return;
		}
		setPlan(response.data);
	}

	// const plan = {
	// 	name: "Standard Plan",
	// 	price: 100000,
	// 	duration: 1,
	// 	billing_cycle: "monthly",
	// 	features: [
	// 		"Basic, Standard features",
	// 		"5000 emails/month",
	// 		"500 contacts",
	// 		"24/7 support",
	// 		"Custom landing page",
	// 		"1 Gb storage",
	// 	],
	// 	description: "Standard plan for users",
	// 	deleted: false,
	// 	cancelPolicy: "Cancellation allowed",
	// };


	const remainingCoins = payment?.coins - plan?.price;

	return (
		<div className="flex items-center justify-center p-6">
			<div className="w-full bg-white rounded-xl shadow-lg grid grid-cols-12 gap-2 p-10 border border-gray-300">
				{/* Left Section - Plan Details */}
				<div className="col-span-8 pr-8">
					<div className="bg-red-50 p-6 rounded-xl shadow-sm space-y-3">
						<div className="flex flex-row justify-between items-center">
							<h2 className="text-4xl font-Means font-extrabold text-red-600">
								{plan?.name}
							</h2>
							<p className="text-3xl font-cursiveFont font-bold text-gray-900 tracking-tighter">
								{plan?.price.toLocaleString("vi-VN")} VND
							</p>
						</div>
						<ul className="space-y-2 font-GraphikFont flex flex-col">
							<li>
								<span className="text-gray-800 font-semibold">Duration:</span>{" "}
								{plan?.duration} {plan?.billing_cycle}
							</li>
							<li>
								<span className="text-gray-800 font-semibold">
									Description:
								</span>{" "}
								{plan?.description}
							</li>
							<li>
								<span className="text-gray-800 font-semibold">
									Cancellation policy:
								</span>{" "}
								{plan?.cancelPolicy}
							</li>
						</ul>
					</div>

					<div className="mt-6">
						<h3 className="text-3xl font-georgiaFont font-bold text-gray-800 mb-4">Features</h3>
						<ul className="grid grid-cols-2 gap-4 text-lg font-helveticeFont">
							{plan?.features.map((feature, idx) => (
								<li
									key={idx}
									className="bg-gray-100 p-3 rounded-lg flex items-center shadow-sm"
								>
									<CheckCircledIcon className="w-8 h-8 text-green-500 mr-4" />
									<p className="text-gray-800 font-medium">{feature}</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Right Section - User Info */}
				<div className="col-span-4 pl-8 p-6 bg-gray-50 border border-gray-300 rounded-xl  flex flex-col">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-3xl font-Means font-bold text-gray-800 tracking-tight">
							Purchase summary
						</h2>
						<Link to="/profile?tab=plan" className="my-auto">
							<Tag color="orange">Close</Tag>
						</Link>
					</div>
					<div className="space-y-6 font-helveticeFont">
						<div className="flex justify-between items-center">
							<span className="text-lg font-medium text-gray-800">Name:</span>
							<span className="text-base font-semibold text-gray-900">
								{user?.name}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-lg font-medium text-gray-800 ">Email:</span>
							<span className="text-base font-semibold text-gray-900 tracking-tight">
								{user?.email}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-lg font-medium text-gray-800">
								Current coins:
							</span>
							<span className="text-base font-semibold text-gray-900 tracking-tighter">
								{payment?.coins.toLocaleString("vi-VN")} VND
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-lg font-medium text-gray-800">
								Remaining coins:
							</span>
							<span className="text-base font-semibold text-gray-900 tracking-tighter">
								{remainingCoins.toLocaleString("vi-VN")} VND
							</span>
						</div>
					</div>
					<button
						onClick={processPayment}
						className={`mt-auto w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${remainingCoins >= 0
							? "bg-red-500 hover:bg-red-600"
							: "bg-gray-400 cursor-not-allowed"
							}`}
						disabled={remainingCoins < 0}
					>
						{remainingCoins >= 0 ? "Proceed to Buy" : "Insufficient Coins"}
					</button>

				</div>
			</div>
		</div >
	);
}

export default ProceedPlan;