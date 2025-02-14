import { ScratchContext } from "../../context/ScratchContext";
import { useContext, useState } from "react";
import { Steps } from 'antd';
import React from "react";

function Sidebar() {
	const { handleSetStage } = useContext(ScratchContext);
	const [currentStage, setCurrentStage] = useState("info");


	const handleStageChange = (stage) => {
		setCurrentStage(stage);
		handleSetStage(stage);
	};

	const steps = [
		{ value: "info", label: "Infomation", description: "Campaign information" },
		{ value: "edit", label: "Edit", description: "Edit the email template" },
		{ value: "upload", label: "Upload and Analyze", description: "Upload a CSV file and analyze the recipient list" },
		{ value: "recipients", label: "Recipient", description: "Select recipients for the campaign" },
		{ value: "schedule", label: "Schedule", description: "Schedule the campaign" },
	];

	const currentStepIndex = steps.findIndex(step => step.value === currentStage);

	return (
		<div className="flex flex-col ml-10 ">
			<Steps
				progressDot
				direction="vertical"
				current={currentStepIndex}
				onChange={(current) => handleStageChange(steps[current].value)}
				items={steps.map(step => ({
					title: step.label,
					description: step.description,
				}))}
			/>
		</div >


	);
}

export default Sidebar;
