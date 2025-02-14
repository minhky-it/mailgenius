import { Card } from "antd";
import PictureDash from "../../assets/images/picture-dash.png";
function Home() {
	const onClickSignUp = () => {
		window.location.href = "/register";
	};
	return (
		<>
			<div className="flex flex-col lg:flex-row justify-between items-center px-2 lg:px-10 py-20 max-w-screen-xl mx-auto space-x-16">
				<div className="flex-1 max-w-lg text-left">
					<h1 className="text-4xl font-georgiaFont font-bold mt-2 tracking-tighter">MailGenius gets it done</h1>
					<p className="text-xl text-gray-800 mt-4 font-helveticeFont">
						Convert new customers and increase growth with the #1 email provider for deliverability.*
					</p>
				</div>

				<div className="flex-1 flex justify-center">
					<Card className="shadow-lg rounded-lg motion-preset-compress">
						<img src={PictureDash} alt="SEO Checker" className="w-full h-200" />
					</Card>
				</div>
			</div>
			<div className="bg-white rounded-xl">
				<div className="flex flex-col lg:flex-row justify-between items-center lg:px-16 py-12 max-w-screen-xl mx-auto">
					<div className="flex-1 flex flex-col md:flex-row items-center gap-8">
						<div className="flex-1 max-w-2xl text-left">
							<h1 className="text-4xl font-georgiaFont font-bold mt-2 tracking-tight">
								Try our Standard plan for{" "}
								<span className="text-yellow-400 underline">free!</span>
							</h1>
							<p className="text-lg text-gray-800 mt-4 font-helveticeFont">
								Find out why customers see up to 24x ROI* using the Standard plan
								with a risk-free 14-day trial. Cancel or downgrade to our
								<span className="underline mx-1">
									Essentials
								</span>
								or basic
								<span className="underline mx-1">
									Free
								</span>
								plans at any time.
							</p>
							<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 font-helveticeFont">
								<ul className="space-y-2">
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Generative AI
										features
									</li>
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Advanced
										segmentation & reporting
									</li>
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Enhanced
										automations
									</li>
								</ul>
								<ul className="space-y-2">
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Custom-coded email
										templates
									</li>
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Data-driven
										optimization tools
									</li>
									<li className="flex items-center">
										<span className="text-yellow-400 mr-2">✔</span>Personalized
										onboarding
									</li>
								</ul>
							</div>
							<div className="mt-6">
								<span
									className="text-yellow-400 flex items-center font-semibold hover:underline hover:cursor-pointer"
								>
									See all plans <span className="ml-2">→</span>
								</span>
							</div>
						</div>
					</div>
					<div className="flex-auto max-w-sm border border-gray-200 rounded-lg shadow-lg p-6">
						<h2 className="text-3xl font-bold text-gray-800 font-georgiaFont">Standard</h2>
						<p className="text-base text-gray-800 mt-2">
							Send up to 6,000 emails each month.
						</p>
						<div className="mt-4">
							<label htmlFor="contacts" className="block text-gray-800 font-semibold">
								Contacts
							</label>
							<select
								id="contacts"
								className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
							>
								<option value="500">500</option>
								<option value="1000">1,000</option>
								<option value="5000">5,000</option>
							</select>
						</div>
						<div className="mt-6">
							<p className="text-lg text-gray-800">
								<span className="font-bold text-2xl">Free</span> for 14 days
							</p>
							<p className="text-sm text-gray-600">
								Then, starts at <span className="font-bold">$20/month*</span>
							</p>
						</div>
						<div className="mt-6">
							<button onClick={onClickSignUp} className="w-full py-3 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 transition duration-200">
								Sign Up Free
							</button>
						</div>
						<p className="text-gray-500 text-xs mt-4">
							*See{" "}
							<span className="text-blue-600 hover:underline">
								Free Trial Terms
							</span>
							. Overages apply if contact or email send limit is exceeded.
							<span href="#" className="text-blue-600 hover:underline">
								Learn more
							</span>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
