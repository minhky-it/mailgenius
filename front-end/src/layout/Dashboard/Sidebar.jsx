import React, { useState } from "react";
import {
	ChevronUpIcon,
	ChevronDownIcon,
	CubeIcon,
	HomeIcon,
	Pencil2Icon,
	RocketIcon,
	AccessibilityIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import Subcription from "./Subcription";

function Sidebar() {
	const [isVisible, setIsVisible] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const [isVisible3, setIsVisible3] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = () => {
		setIsVisible(!isVisible);
	};
	const handleClick2 = () => {
		setIsVisible2(!isVisible2);
	};
	const handleClick3 = () => {
		setIsVisible3(!isVisible3);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
	};

	return (
		<div className="flex flex-col h-full justify-between">
			<aside className="text-black overflow-y-auto custom-scrollbar2 px-2">
				<Link
					to={"/dashboard/create"}
					className="mt-4 flex items-center justify-center w-full border border-[#56b4c1] text-[#007c89] px-4 py-3 rounded-full hover:bg-[#56b4c1] hover:text-[#ffffff]"
				>
					<Pencil2Icon className="w-6 h-6 mx-2" />
					<span className="text-xl font-semibold mx-2">Create</span>
				</Link>
				<nav className="mt-4">
					<ul className="space-y-1">
						<li>
							<Link
								to={"/dashboard/overview"}
								className={`flex items-center w-full p-4 rounded-lg hover:bg-gray-200 ${selectedItem === "overview" ? "bg-gray-300" : ""
									}`}
								onClick={() => handleItemClick("overview")}
							>
								<HomeIcon className="w-6 h-6 mx-1" />
								<span className="font-medium flex-1 ms-3 text-left">
									Overview
								</span>
							</Link>
						</li>
						<li>
							<Link
								onClick={handleClick}
								className="flex items-center w-full p-4 rounded-lg hover:bg-gray-200"
							>
								<RocketIcon className="w-6 h-6 mx-1" />
								<span className="font-medium flex-1 ms-3 text-left">
									Campaigns
								</span>
								{isVisible ? (
									<ChevronUpIcon className="w-4 h-4 mx-1" />
								) : (
									<ChevronDownIcon className="w-4 h-4 mx-1" />
								)}
							</Link>
							{isVisible && (
								<ul className="font-helveticeFont text-sm">
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "createCampaign"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("createCampaign")}
									>
										<Link
											className="flex w-full"
											to={"/dashboard/campaigns/create"}
										>
											Create campaign
										</Link>
									</li>
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "allCampaigns"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("allCampaigns")}
									>
										<Link className="flex w-full" to={"/dashboard/campaigns"}>
											All campaigns
										</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<Link
								onClick={handleClick2}
								className="flex items-center w-full p-4 rounded-lg hover:bg-gray-200"
							>
								<AccessibilityIcon className="w-6 h-6 mx-1" />
								<span className="font-medium flex-1 ms-3 text-left">
									Audience
								</span>
								{isVisible2 ? (
									<ChevronUpIcon className="w-4 h-4 mx-1" />
								) : (
									<ChevronDownIcon className="w-4 h-4 mx-1" />
								)}
							</Link>
							{isVisible2 && (
								<ul className="font-helveticeFont text-sm">
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "allContacts"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("allContacts")}
									>
										<Link
											className="flex w-full"
											to="/dashboard/audience/all-contacts"
										>
											All contacts
										</Link>
									</li>
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "popUpForms"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("popUpForms")}
									>
										<Link
											className="flex w-full"
											to="/dashboard/audience/seo-checker"
										>
											SEO checker
										</Link>
									</li>
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "pagespeed"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("pagespeed")}
									>
										<Link
											className="flex w-full"
											to="/dashboard/audience/page-speed-insight"
										>
											Page Speed Insight
										</Link>
									</li>
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "signUpLandingPage"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("signUpLandingPage")}
									>
										<Link className="flex w-full" to="/dashboard/landing">
											Sign-up landing page
										</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<Link
								onClick={handleClick3}
								className="flex items-center w-full p-4 rounded-lg hover:bg-gray-200"
							>
								<CubeIcon className="w-6 h-6 mx-1" />
								<span className="font-medium flex-1 ms-3 text-left">
									Contents
								</span>
								{isVisible3 ? (
									<ChevronUpIcon className="w-4 h-4 mx-1" />
								) : (
									<ChevronDownIcon className="w-4 h-4 mx-1" />
								)}
							</Link>
							{isVisible3 && (
								<ul className="font-helveticeFont text-sm">
									<li
										className={`w-full text-gray-600 p-3 hover:bg-gray-200 ${selectedItem === "emailTemplate"
											? "bg-gray-200 border-[#007c89] border-l-4"
											: ""
											}`}
										onClick={() => handleItemClick("emailTemplate")}
									>
										<Link
											className="flex w-full"
											to="/dashboard/templates"
										>
											Templates
										</Link>
									</li>
								</ul>
							)}
						</li>
					</ul>
				</nav>
			</aside>
			<Subcription />
		</div>
	);
}

export default Sidebar;