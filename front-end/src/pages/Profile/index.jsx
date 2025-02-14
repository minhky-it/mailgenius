import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ProfileContent from "./ProfileContent";
import SecurityContent from "./SecurityContent";
import ConnectionsContent from "./ConnectContent";
import GeneralContent from "./GeneralContent";
import PaymentContent from "./PaymentContent";
import PlanPricing from "./PlanPricing";
import useQuery from "../../hooks/useQuery";

const tabs = [
	{
		id: "overview",
		label: "Account Overview",
		icon: "fa-regular fa-address-card",
	},
	{
		id: "profile",
		label: "Personal Information",
		icon: "fa-regular fa-user",
	},
	{
		id: "payment",
		label: "Payment and Billing",
		icon: "fa-regular fa-credit-card",
	},
	{
		id: "plan",
		label: "Plan and Pricing",
		icon: "fa-brands fa-wolf-pack-battalion",
	},
	{
		id: "security",
		label: "Passwords and Security",
		icon: "fa-solid fa-shield-halved",
	},
	{
		id: "connections",
		label: "Account Linking",
		icon: "fa-solid fa-circle-nodes",
	},
];
function Profile() {
	const { user } = useContext(AuthContext);
	const [activeTab, setActiveTab] = useState("profile");

	const query = useQuery();
	const tab = query.get("tab");

	useEffect(() => {
		// Set active tab
		if (tab) {
			setActiveTab(tab);
		}
	}, [tab]);

	// Render content
	const renderContent = () => {
		switch (activeTab) {
			case "overview":
				return <GeneralContent />;
			case "profile":
				return <ProfileContent />;
			case "payment":
				return <PaymentContent />;
			case "security":
				return <SecurityContent />;
			case "connections":
				return <ConnectionsContent />;
			case "plan":
				return <PlanPricing />;
			default:
				return <GeneralContent />;
		}
	};

	return (
		<div className="mt-2 p-4">
			<div className="flex items-center justify-between">
				<h2 className="font-Means text-5xl font-semibold ml-20 tracking-tighter">Profile</h2>
				<span className="py-1 px-2 border rounded-md bg-[#efeeea] text-[#241c15] cursor-pointer uppercase">
					Id: {user._id}
				</span>
			</div>
			{/* <hr className="border-gray-300 my-5" /> */}
			{/* Content */}
			<div className="flex flex-col md:flex-row bg-gray-100 h-screen cursor-pointer mt-5">
				{/* Sidebar */}
				<div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-8 mb-4 md:mb-0 mx-2">
					<div className="mb-3">
						<h2 className="font-georgiaFont text-gray-600">Welcome</h2>
						<p className="text-[#241c15] font-semibold">
							{user.email || "NGUYEN VAN HAI"}
						</p>
					</div>
					<hr className="border-gray-200 my-3" />
					<ul className="space-y-4">
						{tabs.map((tab) => (
							<>
								<li
									className={`flex items-center cursor-pointer ${activeTab === tab.id
										? "text-[#007c89] font-semibold"
										: "text-gray-600 hover:text-[#007c89]"
										}`}
									onClick={() => setActiveTab(tab.id)}
								>
									<span className="mr-4">
										<i className={tab.icon}></i>
									</span>
									{tab.label}
								</li>
								<hr className="border-gray-200" />
							</>
						))}
					</ul>
				</div>
				{/* Content */}
				<div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6 mx-2">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}

export default Profile;
