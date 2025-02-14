import vnpayIMG from "../../../assets/images/vnpay.jpg";
import useQuery from "../../../hooks/useQuery";
import { GET } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReturnPayment() {
	const [countdown, setCountdown] = useState(10); // 10 giây đếm ngược
	const navigate = useNavigate();
	const query = useQuery();
	// Lấy dữ liệu trả về từ VNPAY
	console.log(query);

	useEffect(() => {
		fetch();

		if (countdown > 0) {
			const timer = setTimeout(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);

			return () => clearTimeout(timer); // Xóa timeout khi component unmount
		} else {
			navigate("/"); // Chuyển hướng về trang chủ
		}
	}, [countdown, navigate]);

	const fetch = async () => {
		const response = await GET(`${SERVICE.PAYMENT}/vnpay/return?${query}`);
		if (response.error) {
			console.log(response.message);
			return;
		}
		setResult(response);
	};
	const [result, setResult] = useState(null);
	return (
		<>
			<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
				{/* Logo */}
				<div className="flex justify-center mb-4">
					<img src={vnpayIMG} alt="VNPay Logo" className="w-32 h-auto" />
				</div>

				{/* Tiêu đề thông báo */}
				<h2 className={`text-xl font-semibold text-center mb-6 ${result?.vnp_TransactionStatus === "00" ? "text-green-600" : 'text-red-600'}`}>
					{result?.vnp_TransactionStatus === "00" ? "Transaction Successful!" : "Transaction Failed"}
				</h2>

				{/* Thông tin giao dịch */}
				<div className="space-y-4">
					<div className="flex justify-between text-sm text-gray-700">
						<span>Transaction ID:</span>
						<span className="font-medium">{result?.vnp_TxnRef}</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Amount:</span>
						<span className="font-medium">
							{Number(result?.vnp_Amount).toLocaleString()} VND
						</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Bank:</span>
						<span className="font-medium">{result?.vnp_BankCode}</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Card Nunmber:</span>
						<span className="font-medium">{result?.vnp_CardType}</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Bank Transaction Code:</span>
						<span className="font-medium">{result?.vnp_BankTranNo}</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Transaction Date:</span>
						<span className="font-medium">
							{result?.vnp_PayDate
								? new Date(
									`${result.vnp_PayDate.slice(
										0,
										4,
									)}-${result.vnp_PayDate.slice(
										4,
										6,
									)}-${result.vnp_PayDate.slice(
										6,
										8,
									)}T${result.vnp_PayDate.slice(
										8,
										10,
									)}:${result.vnp_PayDate.slice(
										10,
										12,
									)}:${result.vnp_PayDate.slice(12, 14)}`,
								).toLocaleString("vi-VN")
								: "Invalid Date"}
						</span>
					</div>
					<div className="flex justify-between text-sm text-gray-700">
						<span>Status:</span>
						<span className={`font-medium  ${result?.vnp_TransactionStatus === "00" ? "text-green-600" : 'text-red-600'}`}>
							{result?.vnp_TransactionStatus === "00" ? "Success!" : "Failed!"}
						</span>
					</div>
				</div>

				{/* Thông tin bổ sung */}
				<p className="mt-6 text-center text-sm text-gray-500">
					Thanks for using VNPay service.
				</p>
				{/* timeout to return to home page */}
				<p className="mt-2 text-center text-sm text-gray-500">
					Redirecting to the homepage in{" "}
					<span className="font-semibold">{countdown}</span> seconds...
				</p>
			</div>
		</>
	);
}

export default ReturnPayment;