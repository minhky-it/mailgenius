import {
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import CashIcon from "../../../assets/icons/cash.svg";
import { POST } from "../../../api/index.js";
import { useState, useContext } from "react";
import { SERVICE } from "../../../enum/service";
import { MessageContext } from "../../../context/MessageContext";

function StripeAPI() {
	const stripe = useStripe();
	const elements = useElements();


	const [amount, setAmount] = useState(null);
	const { showMessage } = useContext(MessageContext);
	const [isLoading, setIsLoading] = useState(false);
	// Hàm chọn số tiền
	const handleAmountSelect = (amount) => {
		setAmount(amount);
	};
	// Xử lý thanh toán
	const handleSubmitStripe = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const response = await POST(`${SERVICE.PAYMENT}/payment/create`, {
			amount,
			currency: "vnd",
		});

		if (response.error) {
			showMessage(response.message, "error");
			setIsLoading(false);
			return;
		}
		const { clientSecret } = response.data;

		const { error, paymentIntent: confirmedPaymentIntent } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});

		if (error) {
			showMessage("Error processing payment", "error");
		} else if (confirmedPaymentIntent.status === "succeeded") {
			// send to server
			const response = await POST(`${SERVICE.PAYMENT}/payment/confirm`, {
				confirmedPaymentIntent,
			});

			if (response.error) {
				showMessage(response.message, "error");
				setIsLoading(false);
				return;
			}
			// handleFetchPayment();
			showMessage("Payment successful", "success");
		}
		setIsLoading(false);
	};
	return (
		<>
			<div className="font-helveticeFont mt-6 text-[#241c15] bg-[#f2f4f7] px-10 py-6 rounded-md overflow-y-auto z-10 custom-scrollbar">
				<h3 className="font-semibold text-[17px] mb-4 text-[#241c15]">
					Choose deposit amount
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
					<button
						onClick={() => handleAmountSelect(50000)}
						className="bg-gray-200 p-3 rounded-lg text-lg hover:bg-gray-300 transition-all font-helveticeFont flex items-center justify-center"
					>
						<span className="flex items-center">
							50.000
							<img src={CashIcon} alt="Cash Icon" className="w-7 h-7 ml-2" />
						</span>
					</button>
					<button
						onClick={() => handleAmountSelect(100000)}
						className="bg-gray-200 rounded-lg text-lg hover:bg-gray-300 transition-all font-helveticeFont flex items-center justify-center"
					>
						<span className="flex items-center">
							100.000
							<img src={CashIcon} alt="Cash Icon" className="w-7 h-7 ml-2" />
						</span>
					</button>
					<button
						onClick={() => handleAmountSelect(200000)}
						className="bg-gray-200 p-3 rounded-lg text-lg hover:bg-gray-300 transition-all font-helveticeFont flex items-center justify-center"
					>
						<span className="flex items-center">
							200.000
							<img src={CashIcon} alt="Cash Icon" className="w-7 h-7 ml-2" />
						</span>
					</button>
					<button
						onClick={() => handleAmountSelect(500000)}
						className="bg-gray-200 p-3 rounded-lg text-lg hover:bg-gray-300 transition-all font-helveticeFont flex items-center justify-center"
					>
						<span className="flex items-center">
							500.000
							<img src={CashIcon} alt="Cash Icon" className="w-7 h-7 ml-2" />
						</span>
					</button>
				</div>

				{amount && (
					<div>
						<h3 className="text-base italic font-medium font-helveticeFont mb-4">
							Payment {amount.toLocaleString("vi-VN")} VND
						</h3>
						<form
							onSubmit={handleSubmitStripe}
							className="flex flex-col items-center"
						>
							<CardElement className="border p-2 rounded-md mb-4 w-full" />
							<button
								type="submit"
								disabled={!stripe || isLoading}
								className="w-1/3 bg-[#64a30e] text-lg leading-5 font-medium text-white p-3 rounded-full hover:brightness-125 transition-all  flex items-center justify-center"
							>
								<SketchLogoIcon className="w-5 h-5 inline-block mr-4 my-auto" />
								{isLoading ? "Processing..." : "Payment"}
							</button>
						</form>
					</div>
				)}
			</div>
		</>
	);
}

export default StripeAPI;
