import {
	createContext,
	useState,
	useCallback,
} from "react";
import "grapesjs/dist/css/grapes.min.css";
import useQuery from "../hooks/useQuery";
export const ScratchContext = createContext();

export const ScratchContextProvider = ({ children }) => {
	const query = useQuery();
	const campaignId = query.get("id");
	const [campaign, setCampaign] = useState(null);
	const [stage, setStage] = useState("info");
	const [html, setHtml] = useState(null);
	const [recommendations, setRecommendations] = useState([]);
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTime, setSelectedTime] = useState('');

	const handleSetStage = useCallback((stage) => {
		setStage(stage);
	}, []);

	const dateStore = (date, time) => {
		const newEntry = {
			campaignId: campaignId,
			date: date,
			time: time,
		};

		let dateSelectedList = JSON.parse(localStorage.getItem('dateSelectedList')) || [];

		const existingIndex = dateSelectedList.findIndex(entry => entry.campaignId === campaignId);

		if (existingIndex !== -1) {
			// Replace existing entry
			dateSelectedList[existingIndex] = newEntry;
		} else {
			// Add new entry
			dateSelectedList.push(newEntry);
		}

		localStorage.setItem('dateSelectedList', JSON.stringify(dateSelectedList));
	};

	return (
		<ScratchContext.Provider
			value={{
				campaignId,
				campaign,
				setCampaign,
				stage,
				handleSetStage,
				recommendations,
				setRecommendations,
				dateStore,
				selectedDate,
				selectedTime,
				setSelectedDate,
				setSelectedTime,
				setHtml,
				html
			}}
		>
			{children}
		</ScratchContext.Provider>
	);
};