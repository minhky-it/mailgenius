import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Input, Modal } from "antd";
import { useContext, useState, useEffect } from "react";
import { ScratchContext } from "../../context/ScratchContext";
import { MessageContext } from "../../context/MessageContext";
import { POST } from "../../api";
import { SERVICE } from "../../enum/service";

function Header() {
	const { campaign, html } = useContext(ScratchContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [email, setEmail] = useState('');
	const { showMessage } = useContext(MessageContext);

	const handleSendTest = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		setIsFormValid(email.trim() !== '' && email.includes('@'));
	}, [email]);

	const handleSend = async () => {
		setIsModalOpen(false);
		const response = await POST(`${SERVICE.EMAIL}/delivery/send-one`, {
			email,
			subject: campaign?.name || 'Test Tracking Email',
			html
		});
		if (response.error) {
			showMessage(response.message, "error");
			console.log(response.message);
			return;
		}
		showMessage(response.message);
	};
	return (
		<>
			<div className="bg-white shadow-md rounded-full m-4">
				<div className="container-fluid mx-auto px-4 py-3 flex items-center justify-between font-georgiaFont">
					<div className="flex flex-row items-center">
						<Link to="/" className="mx-4">
							<img
								src={Logo}
								className="rounded-lg"
								alt="Logo"
								height={60}
								width={60}
							/>
						</Link>
						<Input
							value={campaign?.name}
							name="design-name"
							className="hover:border-gray-500 focus:border-black font-calistogaFont text-lg"
							placeholder="Design name"
						/>
					</div>

					<div></div>
					<div className="flex flex-row space-x-4 font-helveticeFont items-center text-sm">
						<Link to={"/dashboard/audience/all-contacts"} className="py-3 px-8 block text-[#3598a5] border border-[#3598a5] font-medium rounded-full hover:brightness-125 transition-all duration-300 disabled:opacity-50">
							View Analytics
						</Link>
						<button
							onClick={handleSendTest}
							className="py-3 px-8 block text-[#3598a5] border border-[#3598a5] font-medium rounded-full hover:brightness-125 transition-all duration-300 disabled:opacity-50">
							Send test
						</button>
						<Link
							className="py-3 px-8 block bg-[#3598a5] text-white font-medium rounded-full hover:brightness-125 transition-all duration-300 disabled:opacity-50"
							to="/dashboard/campaigns"
						>
							Save and exit
						</Link>
					</div>
				</div>
			</div>
			<Modal
				title="Send a Test Email"
				visible={isModalOpen}
				onCancel={handleCloseModal}
				onOk={handleSend}
				okButtonProps={{ disabled: !isFormValid }}
			>
				<Input
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Send a test to email"
					className="mb-4"
				/>
			</Modal>
		</>
	);
}

export default Header;