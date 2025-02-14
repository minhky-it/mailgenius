import Header from "./Header";
import Sidebar from "./Sidebar";

function Personal({ children }) {
	return (
		<>
			<Header />
			<div className="flex relative mt-16">
				{/* Sidebar */}
				<div className="min-w-[20%] bg-gray-50 h-screen fixed z-40">
					<Sidebar />
				</div>

				<div className="bg-[#e6f4f1] w-[80%]  ml-[20%] min-h-screen">
					{children}
				</div>
			</div>
		</>
	);
}

export default Personal;