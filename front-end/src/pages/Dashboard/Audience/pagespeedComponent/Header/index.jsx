import { Progress } from "antd";
import OriginLoadingExperience from "../OgriginLoadingExperience";
import LoadingExperienceCard from "../LoaingExperienceCard";
function HeaderPageSpeed({ data }) {
	return (
		<>
			<div className="p-6">
				<div className="flex items-center justify-around space-x-6">
					<div className="flex flex-col items-center justify-center">
						<Progress
							type="circle"
							percent={data?.performanceScore}
							format={(percent) => `${percent}`}
							className="text-gray-800"
							strokeWidth={8}
							strokeColor="#7C444F"
						/>
						<span className="mt-4 text-lg font-semibold text-gray-800">
							PERFORMANCE
						</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<Progress
							type="circle"
							percent={data?.seoScore}
							format={(percent) => `${percent}`}
							className="text-red-800"
							strokeWidth={8}
							strokeColor="#9F5255"
						/>
						<span className="mt-4 text-lg font-semibold text-gray-800">
							SEO
						</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<Progress
							type="circle"
							percent={data?.accessibilityScore}
							format={(percent) => `${percent}`}
							className="text-green-800"
							strokeWidth={8}
							strokeColor="#E16A54"
						/>
						<span className="mt-4 text-lg font-semibold text-gray-800">
							ACCESSIBILITY
						</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<Progress
							type="circle"
							percent={data?.bestPracticesScore}
							format={(percent) => `${percent}`}
							className="text-blue-800"
							strokeWidth={8}
							strokeColor="#F39E60"
						/>
						<span className="mt-4 text-lg font-semibold text-gray-800">
							BEST PRACTICES
						</span>
					</div>

					<img
						src={
							data.lighthouseResult.audits?.["final-screenshot"].details.data
						}
						alt="Final Screenshot"
						className="w-[45%] h-auto rounded-lg shadow-md border border-gray-200 block"
					/>
				</div>
				{/* Timestamp */}
				<div className="flex flex-col p-4 my-4">
					<span className="text-sm font-medium text-gray-600">Timestamp</span>
					<span className="mt-1 text-lg font-semibold text-gray-800">
						{new Date(data?.analysisUTCTimestamp).toLocaleString()}
					</span>
				</div>
				{/* OriginLoadingExperience */}
				<OriginLoadingExperience data={data?.originLoadingExperience} />
                <LoadingExperienceCard loadingExperience={data?.loadingExperience} />
			</div>
		</>
	);
}

export default HeaderPageSpeed;
