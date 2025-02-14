import { useState } from "react";
import { POST } from "../../api/index";
import { SERVICE } from "../../enum/service";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";

function SecurityContent() {
	const { showMessage } = useContext(MessageContext);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!currentPassword || !newPassword || !confirmPassword) {
			showMessage("Please fill in all information", "error");
			setIsLoading(false);
			return;
		}

		if (newPassword !== confirmPassword) {
			showMessage("New password and confirm password do not match!", "error");
			setIsLoading(false);
			return;
		}

		const response = await POST(
			`${SERVICE.AUTH}/authentication/change-password`,
			{
				current_password: currentPassword,
				new_password: newPassword,
				confirm_new_password: confirmPassword,
			},
		);

		if (response.error) {
			showMessage(response.message, "error");
		}

		showMessage("Password changed successfully!", "success");
		setIsLoading(false);
	};

	return (
		<>
			<div className="m-6">
				<div className="border-b pb-2">
					<h2 className="font-calistogaFont text-3xl text-gray-800">
						Password & Security
					</h2>
				</div>
				<div className="font-helveticeFont mt-6 text-gray-800 bg-white px-8 py-6 rounded-lg border border-gray-200 overflow-y-auto z-10 custom-scrollbar shadow-lg">
					<h3 className="font-semibold text-lg mb-4 text-[#241c15]">
						Change password
					</h3>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Current Password */}
						<div className="flex flex-col">
							<label
								htmlFor="currentPassword"
								className="font-medium text-gray-700 text-sm mb-2"
							>
								Current password
							</label>
							<input
								type="password"
								id="currentPassword"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								className="rounded-md border border-gray-300 py-2 px-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="Enter current password"
								required
							/>
						</div>

						{/* New Password */}
						<div className="flex flex-col">
							<label
								htmlFor="newPassword"
								className="font-medium text-gray-700 text-sm mb-2"
							>
								New password
							</label>
							<input
								type="password"
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className="rounded-md border border-gray-300 py-2 px-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="Enter new password"
								required
							/>
						</div>

						{/* Confirm New Password */}
						<div className="flex flex-col">
							<label
								htmlFor="confirmPassword"
								className="font-medium text-gray-700 text-sm mb-2"
							>
								Confirm new password
							</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="rounded-md border border-gray-300 py-2 px-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
								placeholder="Re-enter new password"
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="py-3 px-8 block mx-auto bg-blue-500 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50"
							disabled={isLoading}
						>
							{isLoading ? "Changing..." : "Change password"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SecurityContent;
