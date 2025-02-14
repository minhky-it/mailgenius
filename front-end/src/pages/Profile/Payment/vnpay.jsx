import { useState } from "react";
import { POST } from "../../../api";
import { InputNumber } from "antd";
import { SERVICE } from "../../../enum/service";

function VNPAY() {
	const [amount, setAmount] = useState(10000);
	const [bankCode, setBankCode] = useState("VNBANK");

	const handleSetBankCode = (codeBank) => {
		setBankCode(codeBank);
	};

	const handleChangeAmount = (amount) => {
		setAmount(amount);
		console.log(amount);
	};
	const handleProceed = async () => {
		console.log(amount);
		const response = await POST(`${SERVICE.PAYMENT}/vnpay/create`, { amount, bankCode })
		if (response.error) {
			console.log(response.message);
			return;
		}

		window.location = response.data;
	}
	return (
		<>
			{/* Ô nhập tiền */}
			<div className="mb-4">
				<label
					htmlFor="amount"
					className="block text-sm font-medium text-gray-700"
				>
					Enter the amount:
				</label>
				<InputNumber
					prefix="vnđ"
					value={amount}
					defaultValue={10000}
					formatter={(value) =>
						`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					}
					min={10000}
					max={10000000}
					parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
					className="mt-1 w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
					onChange={handleChangeAmount}
				/>
			</div>

			{/* Phương thức thanh toán */}
			<div className="mb-4">
				<p className="text-sm font-medium text-gray-700 mb-2">
					Choose payment method:
				</p>
				<div className="flex space-x-4">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="payment-method"
							value="VNBANK"
							checked={bankCode === "VNBANK"}
							onChange={() => handleSetBankCode("VNBANK")}
							className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
						/>
						<span className="text-gray-700">ATM card</span>
					</label>
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="payment-method"
							value="INTCARD"
							checked={bankCode === "INTCARD"}
							onChange={() => handleSetBankCode("INTCARD")}
							className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
						/>
						<span className="text-gray-700">International payment</span>
					</label>
				</div>
			</div>

			{/* Payment Button */}
			<div className="my-2 flex justify-center">
				<button onClick={handleProceed} className="w-1/3 bg-[#64a30e] text-lg leading-5 font-medium text-white p-3 rounded-full hover:brightness-125 transition-all  flex items-center justify-center">
					Proceed to Payment
				</button>
			</div>
		</>
	);
}

export default VNPAY;
