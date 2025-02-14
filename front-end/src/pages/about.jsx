function About() {
	return (
		<>
			<div className="flex flex-col lg:flex-row justify-between items-center px-8 lg:px-16 py-12 max-w-screen-xl mx-auto">
				{/* Text Content */}
				<div className="max-w-lg">
					<h1 className="text-4xl font-georgiaFont font-bold tracking-tight mb-4">
						Grow with the #1 email marketing and automations platform*
					</h1>
					<p className="text-gray-600 text-lg mb-6">
						Get powerful features in a platform that's affordable and easy to
						use—with onboarding support and resources to help you switch.
					</p>
					<div className="flex items-center gap-4">
						<span
							className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded transition"
						>
							Talk to Sales
						</span>
						<span
							className="text-black border-b-2 border-black hover:text-yellow-500 hover:border-yellow-500 transition hover:cursor-pointer"
						>
							See all pricing options
						</span>
					</div>
				</div>

				{/* Image Content */}
				<div className="mt-8 lg:mt-0 lg:max-w-xl">
					<img
						src="https://eep.io/images/yzco4xsimv0y/6cUjm8mOAd1ClKIVv0G8AS/a3b9c773ea16ad4f7dde485b94bba223/Switch_to_Mailchimp_-_Hero.png?w=1520&fm=avif&q=60"
						alt="Hero Section"
						className="rounded-lg shadow-lg motion-preset-slide-right "
					/>
				</div>
			</div>
			<div className="bg-yellow-400 py-12">
				<div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					{/* Stat 1 */}
					<div>
						<h3 className="text-2xl font-semibold text-black mb-2">
							11 million global users
						</h3>
						<p className="text-gray-800">
							trust Mailchimp with their marketing
						</p>
					</div>

					{/* Stat 2 */}
					<div>
						<h3 className="text-2xl font-semibold text-black mb-2">
							4.5/5 star rating
						</h3>
						<p className="text-gray-800">
							based on{" "}
							<span href="#" className="underline">
								Capterra
							</span>{" "}
							reviews for ease of use, customer service, features, value, and
							more*
						</p>
					</div>

					{/* Stat 3 */}
					<div>
						<h3 className="text-2xl font-semibold text-black mb-2">
							89% of customers agree
						</h3>
						<p className="text-gray-800">
							our personalized onboarding service made it easy for them to
							onboard to the platform*
						</p>
					</div>
				</div>
			</div>
			<div className="bg-beige py-16">
				<div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-6">
					{/* Left Image and Content */}
					<div className="flex-shrink-0">
						<img
							src="https://eep.io/images/yzco4xsimv0y/2j2BU2bKW2Rvtb1EjTH1E0/10e784d04374f157ec1dd3d86070f5ab/Switch_to_Mailchimp_-_Intuit_Assist.png?w=640&fm=avif&q=60"
							alt="AI Marketing Tools"
							className="w-full max-w-md motion-preset-slide-left "
						/>
					</div>

					{/* Right Text Content */}
					<div className="text-center lg:text-left">
						<h2 className="text-4xl font-georgiaFont font-bold mt-2 tracking-tight mb-4">
							Let Intuit Assist help you personalize your marketing at scale*
						</h2>
						<p className="text-gray-700 mb-6">
							Mailchimp uses generative AI to automate manual marketing tasks—
							such as writing a first draft or visualizing data. This can help
							you boost customer engagement and drive higher conversion.
						</p>
						<span
							href="#"
							className="text-yellow-400 font-semibold flex items-center gap-2 hover:underline hover:cursor-pointer"
						>
							Explore AI marketing tools
							<span>&rarr;</span>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
