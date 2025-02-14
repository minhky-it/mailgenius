import { useState } from "react";
import Payment from "./PaymentContentComponent/payment.jsx";
import Billing from "./PaymentContentComponent/billing.jsx";
function PaymentDetails() {
	// State to manage active tab
	const [activeTab, setActiveTab] = useState("payment");

	// Tab click handler
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<>
			<div className="p-6 h-full overflow-y-auto custom-scrollbar2">
				{/* Tabs */}
				<div className="flex border-b-2 border-gray-200">
					<button
						onClick={() => handleTabClick("payment")}
						className={`px-4 py-2 text-sm font-medium ${
							activeTab === "payment"
								? "border-b-2 border-blue-500 text-blue-500"
								: "text-gray-500"
						}`}
					>
						<i className="fa-solid fa-coins"></i> Payment
					</button>
					<button
						onClick={() => handleTabClick("billing")}
						className={`px-4 py-2 text-sm font-medium ${
							activeTab === "billing"
								? "border-b-2 border-blue-500 text-blue-500"
								: "text-gray-500"
						}`}
					>
						<i className="fa-solid fa-money-bills"></i> Billing
					</button>
				</div>

				{/* Tab Content */}
				<div>
					{activeTab === "payment" && <Payment />}
					{activeTab === "billing" && <Billing />}
				</div>
			</div>
		</>
	);
}

export default PaymentDetails;
