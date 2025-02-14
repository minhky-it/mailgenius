import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
	AccessibilityIcon,
	ChevronDownIcon,
	CubeIcon,
	ExitIcon,
	PersonIcon,
	RocketIcon,
} from "@radix-ui/react-icons";
import { Dropdown } from "antd";
function Header() {
	const { user, handleLogout } = useContext(AuthContext);
	const items = [
		{
			label: (
				<Link
					to="/profile"
					className="py-1 px-1 w-full rounded-lg flex font-georgiaFont"
				>
					<PersonIcon className="h-full my-auto mr-4" />
					<span>Profile</span>
				</Link>
			),
			key: "0",
		},
		{
			label: (
				<Link
					to="/dashboard/campaigns"
					className="py-1 px-1 w-full rounded-lg flex justify-start font-georgiaFont"
				>
					<RocketIcon className="h-full my-auto mr-4" />
					<span>Campaigns</span>
				</Link>
			),
			key: "1",
		},
		{
			label: (
				<Link
					to="/dashboard/audience/all-contacts"
					className="py-1 px-1 w-full rounded-lg flex justify-start font-georgiaFont"
				>
					<AccessibilityIcon className="h-full my-auto mr-4" />
					<span>Audience</span>
				</Link>
			),
			key: "2",
		},
		{
			label: (
				<Link
					to="/dashboard/templates"
					className="py-1 px-1 w-full rounded-lg flex justify-start font-georgiaFont"
				>
					<CubeIcon className="h-full my-auto mr-4" />
					<span>Templates</span>
				</Link>
			),
			key: "3",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link
					onClick={() => handleLogout()}
					className="py-1 px-1 w-full rounded-lg flex justify-start font-georgiaFont"
				>
					<ExitIcon className="h-full my-auto mr-4" />
					<span>Log out</span>
				</Link>
			),
			key: "4",
		},
	];

	return (
		<>
			<div className="w-full bg-white border-b flex items-center border-gray-300 shadow-sm z-40 fixed top-0 h-16">
				<div className="mx-auto flex items-center py-2 px-6">
					<div className="mx-auto flex items-center">
						{/* Navigation */}
						<div className="flex items-center space-x-6">
							<Link
								to="/"
								className="text-md text-gray-700 hover:text-gray-900 font-medium"
							>
								Home
							</Link>
							<Link
								to="/about"
								className="text-md text-gray-700 hover:text-gray-900 font-medium"
							>
								About
							</Link>
						</div>

						{/* Logo */}
						<Link to="/" className="flex items-center space-x-2 mx-8">
							<img
								src={Logo}
								className="h-12 w-12 rounded-full shadow-lg border border-gray-200 bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
								alt="Logo"
							/>
						</Link>

						{/* Navigation */}
						<div className="flex items-center space-x-6">
							<Link
								to="/contact"
								className="text-md text-gray-700 hover:text-gray-900 font-medium"
							>
								Contact
							</Link>
							<Link
								to="/support"
								className="text-md text-gray-700 hover:text-gray-900 font-medium"
							>
								Support
							</Link>
						</div>
					</div>
				</div>
				{/* User Actions */}
				<div className="flex items-center space-x-6 absolute top-0 right-8 h-full">
					{user ? (
						<div className="flex items-center space-x-4">
							<Dropdown menu={{ items }} trigger={["click"]}>
								<button onClick={(e) => e.preventDefault()} className="flex items-center cursor-pointer bg-transparent border-none p-0">
									<img
										className="h-10 w-10 rounded-full shadow-md"
										src={user.profile_avatar.url}
										alt="Profile"
									/>
									<div className="ml-3 text-left">
										<span className="block text-sm font-medium text-gray-900">
											{user.name}
										</span>
										<span className="block text-xs text-gray-500">
											{user.email}
										</span>
									</div>
									<ChevronDownIcon className="h-4 w-4 ml-2 text-gray-500" />
								</button>
							</Dropdown>
						</div>
					) : (
						<div className="flex items-center space-x-4">
							<Link
								to="/login"
								className="px-5 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="px-5 py-2 bg-gray-900 text-white rounded-md shadow-md hover:shadow-lg"
							>
								Register
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;