import StripImg from "../../../assets/images/stripe.png";
import VNPayImg from "../../../assets/images/vnpay.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import StripeAPI from "./stripeAPI.jsx";
import {
	Elements,
} from "@stripe/react-stripe-js";
import VNPAY from "./vnpay.jsx";

// Nạp public key từ Stripe
const stripePromise = loadStripe(
	"pk_test_51QUiIIB3jZUzFP3ckvuZyKo4l2ZVLZrW6uL5u4XfSmrvf8ZR96Knt8lvxHBgmc32XrP14mKhyOkoarKn2bGp655D00chqxSfHI",
);

function PaymentContent() {
	// Chuyển tất cả các thành phần bên trong <Elements> context
	return (
		<Elements stripe={stripePromise}>
			<Payment />
		</Elements>
	);
}

function Payment() {

	const [vendor, setVendor] = useState(null);

	const handleChangeVendor = (value) => {
		setVendor(value);
	};


	return (
		<>
			{/* Chọn nhà cung cấp thanh toán */}
			<div class="flex space-x-8 items-center my-4 text-center">
				<label
					class="flex flex-col items-center cursor-pointer"
					onClick={() => handleChangeVendor("stripe")}
				>
					<input
						type="radio"
						name="payment-provider"
						value="stripe"
						class="hidden peer"
					/>
					<div class="p-4 border border-gray-300 rounded-lg shadow-sm peer-checked:border-blue-500 peer-checked:shadow-md transition-all">
						<img
							src={StripImg}
							alt="StripeAPI"
							class="w-16 h-16 object-contain"
						/>
						<span class="mt-2 text-gray-700 text-sm font-medium">STRIPE</span>
					</div>
				</label>
				<label
					class="flex flex-col items-center cursor-pointer"
					onClick={() => handleChangeVendor("vnpay")}
				>
					<input
						type="radio"
						name="payment-provider"
						value="vnpay"
						class="hidden peer"
					/>
					<div class="p-4 border border-gray-300 rounded-lg shadow-sm peer-checked:border-blue-500 peer-checked:shadow-md transition-all">
						<img src={VNPayImg} alt="VNPay" class="w-16 h-16 object-contain" />
						<span class="mt-2 text-gray-700 text-sm font-medium">VNPAY</span>
					</div>
				</label>
			</div>

			{/* StripeAPI */}
			{vendor && vendor === "stripe" && <StripeAPI stripe={stripePromise} />}

			{/* VNPay */}
			{vendor && vendor === "vnpay" && <VNPAY />}
		</>
	);
}

export default PaymentContent;
