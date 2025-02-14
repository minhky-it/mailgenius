import Info from "./Info.jsx";
import Recipients from "./recipients.jsx";
import Scratch from "./Scratch.jsx";
import Upload from "./upload.jsx";
import Schedule from "./schedule.jsx";
import { useContext } from "react";
import { ScratchContext } from "../../../../context/ScratchContext";
function Editor() {
	const { stage } = useContext(ScratchContext);

	const renderStage = () => {
		switch (stage) {
			case "info":
				return <Info />;
			case "recipients":
				return <Recipients />;
			case "edit":
				return <Scratch />;
			case "upload":
				return <Upload />;
			case "schedule":
				return <Schedule />;
			default:
				return <Scratch />;
		}
	};
	return (
		<>
			<div className="col-span-4">{renderStage()}</div>
		</>
	);
}

export default Editor;