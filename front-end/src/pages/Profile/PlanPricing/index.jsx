import React from "react";
import { useState, useEffect } from "react";
import { GET } from "../../../api/index.js";
import { SERVICE } from "../../../enum/service.js";
import { Link } from "react-router-dom";

function PlanPricing() {
	useEffect(() => {
		fetch();
	}, []);

	const fetch = async () => {
		const response = await GET(`${SERVICE.PAYMENT}/plan/views`);

		if (response.error) {
			console.error(response.error);
			return;
		}

		setPlans(response.data);
	};
	const [plans, setPlans] = useState(null);

	return (
		<>
			<div className="text-center mb-12 h-full overflow-y-auto custom-scrollbar2">
				<h1 className="font-GraphikFont text-4xl font-semibold text-gray-800 my-2 text-center">Our Pricing Plans</h1>
				<p className="text-gray-600 mt-2">
					Choose the plan that fits your needs
				</p>
				<div className="mt-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans &&
						plans.map((plan, index) => (
							<div
								key={index}
								className="max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-sans"
							>
								{/* Header Section */}
								<div className="flex items-center justify-between mb-6 space-x-10">
									<h2 className="text-2xl font-bold text-gray-800 tracking-wider w-2/6">
										{plan.name}
									</h2>
									<p className="text-2xl font-bold text-red-500 tracking-tighter w-4/6">
										{plan.price.toLocaleString("vi-VN")} VND
									</p>
								</div>

								{/* Plan Details */}
								<div className="bg-gray-100 p-4 rounded-lg mb-2 shadow-inner">
									<p className="text-green-400 font-semibold text-lg">
										{plan.duration} {plan.billing_cycle}
									</p>
									<p className="text-gray-700 mb-2 italic">
										{plan.description}
									</p>
									<p className="text-gray-700">
										<span className="font-medium text-gray-800">
											Cancellation policy:
											<br />
										</span>{" "}
										{plan.cancelPolicy}
									</p>
								</div>

								{/* Features List */}
								<div className="mb-6">
									<h3 className="text-lg text-start font-semibold text-gray-800 mb-2">
										Features:
									</h3>
									<ul className="space-y-2">
										{plan.features.map((feature, idx) => (
											<li key={idx} className="flex items-center text-gray-700">
												<span className="inline-block size-2 bg-red-400 rounded-full mr-4"></span>
												{feature}
											</li>
										))}
									</ul>
								</div>

								{/* Call-to-Action Button */}
								<Link
									to={`/planning?buyId=${plan._id}`}
									className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
								>
									Choose {plan.name}
								</Link>
							</div>
						))}
				</div>
			</div>

		</>
	);
}

export default PlanPricing;