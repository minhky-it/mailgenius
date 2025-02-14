import { ChevronRightIcon } from "@radix-ui/react-icons";
import GoogleIcon from "../../assets/icons/google.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GET } from "../../api";
import { SERVICE } from "../../enum/service";
import { MessageContext } from "../../context/MessageContext.jsx";

function ConnectionsContent() {
	const { user } = useContext(AuthContext);
	const { showMessage } = useContext(MessageContext);
	const [connections, setConnections] = useState([]);
	const handleFetchConnections = async () => {
		const response = await GET(`${SERVICE.AUTH}/user-management/connections/`);

		if (response.error) {
			showMessage(response.message, "error");
			return;
		}

		showMessage("Connections fetched successfully", "success");
		const data = response.data !== null ? response.data.connections : null;
		setConnections(Array.isArray(data) ? [...data] : []);
	};

	useEffect(() => {
		handleFetchConnections();
	}, []);
	return (
		<>
			{connections &&
				connections.map((connector) => (
					<div className="mx-4 my-2 text-[#241c15] flex flexx-row h-20 border border-gray-300 p-4 rounded-3xl">
						<img
							src={connector?.platform === "GOOGLE" ? GoogleIcon : null}
							alt={connector?.platform}
							className="w-10 h-10 my-auto mr-4 border border-gray-300- rounded-full p-2"
						/>
						<div className="flex justify-between w-full my-auto">
							<div className="flex flex-col">
								<span className="text-base font-semibold">{user.email}</span>
								<span className="text-xs text-gray-400">
									{connector?.platform} ACCOUNT
								</span>
							</div>
							<div className="flex items-center">
								<span className="text-orange-500">
									<i>{connector?.uid}</i>
								</span>
								<ChevronRightIcon className="my-auto size-5" />
							</div>
						</div>
					</div>
				))}
		</>
	);
}

export default ConnectionsContent;
