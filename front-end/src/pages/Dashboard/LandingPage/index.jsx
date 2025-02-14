import { Helmet } from "react-helmet";
import { useContext } from "react";
import { LandingContext } from "../../../context/LandingContext";

function LandingPage() {
	const { landing } = useContext(LandingContext);
	return (
		<>
			<Helmet>
				<title>{landing?.title}</title>
				<meta name="description" content="Build and send custom emails" />
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

export default LandingPage;
