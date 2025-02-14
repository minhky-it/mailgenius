import React, { useEffect, useState, useContext } from "react";
import { GET } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { MessageContext } from "../../../context/MessageContext";

function Billing() {
	const { showMessage } = useContext(MessageContext);
	const [transactions, setTransactions] = useState([]);

	// Mock transaction data (replace this with actual API call if needed)
	useEffect(() => {
		fetch();
	}, []);

	const fetch = async () => {
		const response = await GET(`${SERVICE.PAYMENT}/transaction/views`);
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}

		setTransactions(response.data);
		showMessage(response.message);
	};

	return (
		<div className="p-6">
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm">
					<thead>
						<tr className="bg-gray-50">
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
								Date
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
								Platform
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
								Type
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
								Amount (VND)
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, index) => (
							<tr
								key={transaction._id}
								className={`hover:bg-gray-100 ${
									index % 2 === 0 ? "bg-white" : "bg-gray-50"
								}`}
							>
								<td className="px-4 py-3 text-gray-700 border-b">
									{new Date(transaction.create).toLocaleString("vi-VN")}
								</td>
								<td className="px-4 py-3 text-gray-700 border-b">
									{transaction.platform}
								</td>
								<td className="px-4 py-3 text-gray-700 border-b">
									{transaction.transaction_type.toUpperCase()}
								</td>
								<td className="px-4 py-3 text-gray-700 border-b">
									{transaction.amount.toLocaleString("vi-VN")}
								</td>
								<td
									className={`px-4 py-3 border-b font-medium ${
										transaction.status === "success"
											? "text-green-600"
											: transaction.status === "pending"
											? "text-yellow-600"
											: "text-red-600"
									}`}
								>
									{transaction.status.toUpperCase()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Billing;
