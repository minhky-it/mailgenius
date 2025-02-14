import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChevronRightIcon, UploadIcon } from "@radix-ui/react-icons";
import { message } from "antd";
import { SERVICE } from "../../enum/service";
import { PATCH, PATCH_FORM } from "../../api/index.js";
import { CameraOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function ProfileContent() {
	const { user } = useContext(AuthContext);
	const [name, setName] = useState(user?.name || '');
	const [phone, setPhone] = useState(user?.phone || '');
	const [imageUrl, setImageUrl] = useState(user?.profile_avatar?.url);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);

	const [messageApi, contextHolder] = message.useMessage();
	const success = (msg, type) => {
		messageApi.open({ type, content: msg });
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			const isJpgOrPng = selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
				return;
			}
			const isLt2M = selectedFile.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error('Image must be smaller than 2MB!');
				return;
			}
			setFile(selectedFile);
			getBase64(selectedFile, (url) => setImageUrl(url));
		}
	};

	const handleSubmitFile = async (e) => {
		e.preventDefault();
		if (!file) {
			message.error('Please select a file to upload!');
			return;
		}
		setLoading(true);
		const formData = new FormData();
		formData.append('profile_avatar', file);
		const response = await PATCH_FORM(`${SERVICE.AUTH}/user-management/patch`, formData);
		if (response.data) {
			message.success("Picture updated successfully", "success");
			const newUser = JSON.parse(localStorage.getItem("user"));
			newUser.profile_avatar.url = imageUrl;
			localStorage.setItem("user", JSON.stringify(newUser));
		}
		setLoading(false);
	};

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await PATCH(`${SERVICE.AUTH}/authentication/update-profile`, { name, phone });

		if (response.data) {
			success("Profile updated successfully", "success");
			const newUser = JSON.parse(localStorage.getItem("user"));
			newUser.name = name;
			newUser.phone = phone;
			localStorage.setItem("user", JSON.stringify(newUser));
		}
	};

	return (
		<>
			{contextHolder}
			<div className="m-6">
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="font-calistogaFont text-3xl text-gray-800">Basic Information</h2>
				</div>
				<div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="flex flex-col items-center md:col-span-1">
						<form onSubmit={handleSubmitFile} encType="multipart/form-data">
							<div className="avatar-uploader flex flex-col items-center">
								{imageUrl ? (
									<img className="rounded-full size-40 object-cover" src={imageUrl} alt="avatar" />
								) : (
									<div>
										{loading ? <LoadingOutlined /> : <PlusOutlined />}
										<div style={{ marginTop: 8 }}>Upload</div>
									</div>
								)}
								<input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="mt-3 text-sm" />
							</div>
							<button
								type="submit"
								className="mt-4 flex flex-row items-center bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
							>
								<UploadIcon className="w-4 h-4 mr-2" />
								{loading ? 'Uploading...' : 'Upload'}
							</button>
						</form>
					</div>
					<div className="md:col-span-2">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="flex flex-col space-y-1">
								<label className="font-medium text-gray-700 text-sm">Full Name</label>
								<div className="relative">
									<input
										className="border rounded-lg w-full py-2 px-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Enter your full name"
										required
									/>
									<ChevronRightIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>
							</div>

							<div className="flex flex-col space-y-1">
								<label className="font-medium text-gray-700 text-sm">Email</label>
								<input
									className="border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed"
									value={user?.email}
									disabled
								/>
							</div>

							<div className="flex flex-col space-y-1">
								<label className="font-medium text-gray-700 text-sm">Phone Number</label>
								<div className="relative">
									<input
										className="border rounded-lg w-full py-2 px-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder="Enter your phone number"
										required
									/>
									<ChevronRightIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1">
									<label className="font-medium text-gray-700 text-sm">Role</label>
									<input className="border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed" value={user.role} disabled />
								</div>

								<div className="flex flex-col space-y-1">
									<label className="font-medium text-gray-700 text-sm">Creation Date</label>
									<input
										className="border rounded-lg w-full py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed"
										value={new Date(user?.timestamp).toLocaleString("vi-VN")}
										disabled
									/>
								</div>
							</div>

							<button type="submit" className="py-3 px-8 block mx-auto bg-blue-500 text-white rounded-md shadow-lg hover:brightness-125 transition-all duration-300">
								Update Information
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileContent;
