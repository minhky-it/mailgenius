import { Helmet } from "react-helmet";
import { useContext } from "react";
import { TemplateContext } from "../../../../context/TemplateContext";
function TemplatePage() {
	const { templateName } = useContext(TemplateContext);
	return (
		<>
			<Helmet>
				<title>{templateName}</title>
				<meta name="description" content="Build template" />
				<link rel="icon" href="/favicon.ico" />
			</Helmet>
			<div
				id="editor"
				className="w-full bg-gray-100 relative h-full"
			>

			</div>
		</>
	);
}

export default TemplatePage;
