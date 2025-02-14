import { Divider, Tag, Progress } from "antd";
import { Link } from "react-router-dom";
import { GET } from "../../api";
import { SERVICE } from "../../enum/service";
import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import dayjs from "dayjs";

function Subcription() {
	const { showMessage } = useContext(MessageContext);
	const [subscription, setSubscription] = useState(null);
	useEffect(() => {
		fetchSubscription();
	}, []);

	const fetchSubscription = async () => {
		const response = await GET(`${SERVICE.EMAIL}/plan`);
		if (response.error) {
			showMessage(response.error.message, "error");
			return;
		}
		setSubscription(response.data);
	};
	return (
		<>
			{subscription && (
				<div className="bottom-0 pb-20 bg-[#F6F4F0] p-2 text-[#333] text-center">
					<span className="text-xl font-bold text-[#86A788] text-center inline-block mx-4">
						{subscription.plan_name}
					</span>
					<span className="text-sm text-[#333] text-center font-semibold">
						<Tag color="#E16A54">
							{dayjs(subscription.expired_at).format("DD/MM/YYYY")}
						</Tag>
					</span>

					<Divider />

					<div className="text-center">
						<Link
							className="block text-base text-[#86A788] hover:text-[#6e9371] hover:font-bold hover:underline hover:underline-offset-2 font-medium"
							to="/profile?tab=plan"
						>
							Upgrade
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default Subcription;