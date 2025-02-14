import BootupTime from "./AuditsComponent/bootup-time";
import CriticalRequestChains from "./AuditsComponent/critical-request-chains";
import CumulativeLayoutShift from "./AuditsComponent/cumulative-layout-shift";
import Diagnostics from "./AuditsComponent/diagnostics";
import DOMSize from "./AuditsComponent/dome-size";
import DuplicatedJavaScript from "./AuditsComponent/duplicated-javascript";
import EfficientAnimatedContent from "./AuditsComponent/efficient-animated-content";
import FinalScreenshot from "./AuditsComponent/final-screenshot";
import FirstContentfulPaint from "./AuditsComponent/first-contentful-paint";
import FirstMeaningfulPaint from "./AuditsComponent/first-meaningful-paint";
import FontDisplay from "./AuditsComponent/font-display";
import TimeToInteractive from "./AuditsComponent/interactive";
import LargestContentfulPaint from "./AuditsComponent/largest-contentful-paint";
import LargestContentfulPaintElement from "./AuditsComponent/largest-contentful-paint-element";
import LayoutShifts from "./AuditsComponent/layout-shifts";
import LCPLazyLoaded from "./AuditsComponent/lcp-lazy-loaded";
import LegacyJavaScript from "./AuditsComponent/legacy-javascript";
import LongTasks from "./AuditsComponent/long-tasks";
import MainThreadTasks from "./AuditsComponent/main-thread-tasks";
import MainThreadWorkBreakdown from "./AuditsComponent/mainthread-work-breakdown";
import MaxPotentialFID from "./AuditsComponent/max-potential-fid";
import Metrics from "./AuditsComponent/metrics";
import ModernImageFormats from "./AuditsComponent/modern-image-formats";
import NetworkRequests from "./AuditsComponent/network-requests";
import NetworkRTT from "./AuditsComponent/network-rtt";
import NetworkServerLatency from "./AuditsComponent/network-server-latency";
import NonCompositedAnimations from "./AuditsComponent/non-composited-animations";
import OffscreenImages from "./AuditsComponent/offscreen-images";
import PrioritizeLCPImage from "./AuditsComponent/prioritize-lcp-image";
import Redirects from "./AuditsComponent/redirects";
import RenderBlockingResources from "./AuditsComponent/render-blocking-resources";
import ResourceSummary from "./AuditsComponent/resource-summary";
import ScreenshotThumbnails from "./AuditsComponent/screenshot-thumbnails";
import ScriptTreemapData from "./AuditsComponent/script-treemap-data";
import ServerResponseTime from "./AuditsComponent/server-response-time";
import SpeedIndex from "./AuditsComponent/speed-index";
import ThirdPartyFacades from "./AuditsComponent/third-party-facades";
import ThirdPartySummary from "./AuditsComponent/third-party-summary";
import TotalBlockingTime from "./AuditsComponent/total-blocking-time";
import TotalByteWeight from "./AuditsComponent/total-byte-weight";
import UnminifiedCSS from "./AuditsComponent/unminified-css";
import UnminifiedJavaScript from "./AuditsComponent/unminified-javascript";
import UnsizedImages from "./AuditsComponent/unsized-images";
import UnusedCSSRules from "./AuditsComponent/unused-css-rules";
import UnusedJavaScript from "./AuditsComponent/unused-javascript";
import UserTimings from "./AuditsComponent/user-timings";
import UsesLongCacheTTL from "./AuditsComponent/uses-long-cache-ttl";
import UsesOptimizedImages from "./AuditsComponent/uses-optimized-images";
import UsesPassiveEventListeners from "./AuditsComponent/uses-passive-event-listeners";
import UsesRelPreconnect from "./AuditsComponent/uses-rel-preconnect";
import UsesResponsiveImages from "./AuditsComponent/uses-responsive-images";
import UsesTextCompression from "./AuditsComponent/uses-text-compression";
import Viewport from "./AuditsComponent/viewport";
import { Divider, Collapse } from "antd";
function Audits({ data }) {
	return (
		<>
			{/*  modern-image-formats */}
			<Collapse
				items={[
					{
						key: "1",
						label: `Serve images in next-gen formats`,
						children: (
							<ModernImageFormats
								data={data?.["modern-image-formats"]}
							/>
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["modern-image-formats"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "critical-request-chains" */}
			<Collapse
				items={[
					{
						key: "2",
						label: "Avoid deep critical request chains",
						children: (
							<CriticalRequestChains
								data={data?.["critical-request-chains"]}
							/>
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["critical-request-chains"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "resource-summary" */}
			<Collapse
				items={[
					{
						key: "3",
						label: "Resource summary",
						children: (
							<ResourceSummary data={data?.["resource-summary"]} />
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["resource-summary"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "unminified-javascript" */}
			<Collapse
				items={[
					{
						key: "4",
						label: "Unminified javascript",
						children: (
							<UnminifiedJavaScript
								data={data?.["unminified-javascript"]}
							/>
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["unminified-javascript"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "layout-shifts" */}
			<Collapse
				items={[
					{
						key: "5",
						label: "Layout shifts",
						children: <LayoutShifts data={data?.["layout-shifts"]} />,
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["layout-shifts"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "offscreen-images" */}
			<Collapse
				items={[
					{
						key: "6",
						label: "Offscreen images",
						children: (
							<OffscreenImages data={data?.["offscreen-images"]} />
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["offscreen-images"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "first-meaningful-paint" */}
			<Collapse
				items={[
					{
						key: "7",
						label: "First meaningful paint",
						children: (
							<FirstMeaningfulPaint
								data={data?.["first-meaningful-paint"]}
							/>
						),
						extra: (
							<span className="bg-orange-500 px-4 py-2 rounded-md text-white">
								{data?.["first-meaningful-paint"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* network-requests */}
			<Collapse
				items={[
					{
						key: "8",
						label: "Network requests",
						children: (
							<NetworkRequests data={data?.["network-requests"]} />
						),
						extra: (
							<span className="bg-blue-300 px-4 py-2 rounded-md text-white">
								{data?.["network-requests"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "network-rtt" */}
			<Collapse
				items={[
					{
						key: "9",
						label: "Network RTT",
						children: <NetworkRTT data={data?.["network-rtt"]} />,
						extra: (
							<span className="bg-blue-300 px-4 py-2 rounded-md text-white">
								{data?.["network-rtt"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "speed-index" */}
			<Collapse
				items={[
					{
						key: "10",
						label: "Speed index",
						children: <SpeedIndex data={data?.["speed-index"]} />,
						extra: (
							<span className="bg-blue-300 px-4 py-2 rounded-md text-white">
								{data?.["speed-index"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* cumulative-layout-shift */}
			<Collapse
				items={[
					{
						key: "11",
						label: "Cumulative layout shift",
						children: (
							<CumulativeLayoutShift
								data={data?.["cumulative-layout-shift"]}
							/>
						),
						extra: (
							<span className="bg-red-200 px-4 py-2 rounded-md text-white">
								{data?.["cumulative-layout-shift"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* "final-screenshot" */}
			<Collapse
				items={[
					{
						key: "12",
						label: "Final screenshot",
						children: (
							<FinalScreenshot data={data?.["final-screenshot"]} />
						),
						extra: (
							<span className="bg-red-200 px-4 py-2 rounded-md text-white">
								{data?.["final-screenshot"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* prioritize-lcp-image */}
			<Collapse
				items={[
					{
						key: "13",
						label: "Prioritize LCP Image",
						children: (
							<PrioritizeLCPImage
								data={data?.["prioritize-lcp-image"]}
							/>
						),
						extra: (
							<span className="bg-brown-400 px-4 py-2 rounded-md text-white">
								{data?.["prioritize-lcp-image"].score}
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* non-composited-animations */}
			<Collapse
				items={[
					{
						key: "14",
						label: "Non composited animations",
						children: (
							<NonCompositedAnimations
								data={data?.["non-composited-animations"]}
							/>
						),
						extra: (
							<span className="bg-brown-400 px-4 py-2 rounded-md text-white">
								{data?.["non-composited-animations"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* largest-contentful-paint-element */}
			<Collapse
				items={[
					{
						key: "15",
						label: "Largest Contentful Paint Element",
						children: (
							<LargestContentfulPaintElement
								data={data?.["largest-contentful-paint-element"]}
							/>
						),
						extra: (
							<span className="bg-brown-400 px-4 py-2 rounded-md text-white">
								{data?.["largest-contentful-paint-element"].score}{" "}
								scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* unused-javascript */}
			<Collapse
				items={[
					{
						key: "16",
						label: "Unused javascript",
						children: (
							<UnusedJavaScript data={data?.["unused-javascript"]} />
						),
						extra: (
							<span className="bg-brown-400 px-4 py-2 rounded-md text-white">
								{data?.["unused-javascript"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* diagnostics */}
			<Collapse
				items={[
					{
						key: "17",
						label: "Diagnostics",
						children: <Diagnostics data={data?.["diagnostics"]} />,
						extra: (
							<span className="bg-pink-700 px-4 py-2 rounded-md text-white">
								{data?.["diagnostics"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* total-blocking-time */}
			<Collapse
				items={[
					{
						key: "18",
						label: "Total blocking time",
						children: (
							<TotalBlockingTime
								data={data?.["total-blocking-time"]}
							/>
						),
						extra: (
							<span className="bg-pink-700 px-4 py-2 rounded-md text-white">
								{data?.["total-blocking-time"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* total-byte-weight */}
			<Collapse
				items={[
					{
						key: "19",
						label: "Total byte weight",
						children: (
							<TotalByteWeight data={data?.["total-byte-weight"]} />
						),
						extra: (
							<span className="bg-pink-700 px-4 py-2 rounded-md text-white">
								{data?.["total-byte-weight"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* font-display */}
			<Collapse
				items={[
					{
						key: "20",
						label: "Font display",
						children: <FontDisplay data={data?.["font-display"]} />,
						extra: (
							<span className="bg-pink-700 px-4 py-2 rounded-md text-white">
								{data?.["font-display"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* interactive */}
			<Collapse
				items={[
					{
						key: "21",
						label: "Interactive",
						children: (
							<TimeToInteractive data={data?.["interactive"]} />
						),
						extra: (
							<span className="bg-pink-700 px-4 py-2 rounded-md text-white">
								{data?.["interactive"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* user-timings */}
			<Collapse
				items={[
					{
						key: "22",
						label: "User timings",
						children: <UserTimings data={data?.["user-timings"]} />,
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["user-timings"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* mainthread-work-breakdown */}
			<Collapse
				items={[
					{
						key: "23",
						label: "Mainthread work breakdown",
						children: (
							<MainThreadWorkBreakdown
								data={data?.["mainthread-work-breakdown"]}
							/>
						),
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["mainthread-work-breakdown"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* unused-css-rules */}
			<Collapse
				items={[
					{
						key: "24",
						label: "Unused css rules",
						children: (
							<UnusedCSSRules data={data?.["unused-css-rules"]} />
						),
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["unused-css-rules"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* render-blocking-resources */}
			<Collapse
				items={[
					{
						key: "25",
						label: "Render blocking resources",
						children: (
							<RenderBlockingResources
								data={data?.["render-blocking-resources"]}
							/>
						),
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["render-blocking-resources"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* unsized-images */}
			<Collapse
				items={[
					{
						key: "26",
						label: "Unsized images",
						children: (
							<UnsizedImages data={data?.["unsized-images"]} />
						),
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["unsized-images"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* legacy-javascript */}
			<Collapse
				items={[
					{
						key: "27",
						label: "Legacy javascript",
						children: (
							<LegacyJavaScript data={data?.["legacy-javascript"]} />
						),
						extra: (
							<span className="bg-green-800 px-4 py-2 rounded-md text-white">
								{data?.["legacy-javascript"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-rel-preconnect */}
			<Collapse
				items={[
					{
						key: "28",
						label: "Uses rel preconnect",
						children: (
							<UsesRelPreconnect
								data={data?.["uses-rel-preconnect"]}
							/>
						),
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["uses-rel-preconnect"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* bootup-time */}
			<Collapse
				items={[
					{
						key: "29",
						label: "bootup-time",
						children: <BootupTime data={data?.["bootup-time"]} />,
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["bootup-time"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* max-potential-fid */}
			<Collapse
				items={[
					{
						key: "30",
						label: "Max potential fid",
						children: (
							<MaxPotentialFID data={data?.["max-potential-fid"]} />
						),
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["max-potential-fid"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* redirects */}
			<Collapse
				items={[
					{
						key: "31",
						label: "Redirects",
						children: <Redirects data={data?.["redirects"]} />,
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["redirects"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* efficient-animated-content */}
			<Collapse
				items={[
					{
						key: "32",
						label: "Efficient animated content",
						children: (
							<EfficientAnimatedContent
								data={data?.["efficient-animated-content"]}
							/>
						),
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["efficient-animated-content"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* viewport */}
			<Collapse
				items={[
					{
						key: "33",
						label: "viewport",
						children: <Viewport data={data?.["viewport"]} />,
						extra: (
							<span className="bg-purple-800 px-4 py-2 rounded-md text-white">
								{data?.["viewport"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-long-cache-ttl */}
			<Collapse
				items={[
					{
						key: "33",
						label: "Uses long cache ttl",
						children: (
							<UsesLongCacheTTL data={data?.["uses-long-cache-ttl"]} />
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["uses-long-cache-ttl"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* unminified-css */}
			<Collapse
				items={[
					{
						key: "34",
						label: "Unminified css",
						children: (
							<UnminifiedCSS data={data?.["unminified-css"]} />
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["unminified-css"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* main-thread-tasks */}
			<Collapse
				items={[
					{
						key: "35",
						label: "Main thread tasks",
						children: (
							<MainThreadTasks data={data?.["main-thread-tasks"]} />
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["main-thread-tasks"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* first-contentful-paint */}
			<Collapse
				items={[
					{
						key: "36",
						label: "First contentful paint",
						children: (
							<FirstContentfulPaint
								data={data?.["first-contentful-paint"]}
							/>
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["first-contentful-paint"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* script-treemap-data */}
			<Collapse
				items={[
					{
						key: "37",
						label: "Script treemap data",
						children: (
							<ScriptTreemapData
								data={data?.["script-treemap-data"]}
							/>
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["script-treemap-data"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-optimized-images */}
			<Collapse
				items={[
					{
						key: "38",
						label: "Uses optimized images",
						children: (
							<UsesOptimizedImages
								data={data?.["uses-optimized-images"]}
							/>
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["uses-optimized-images"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* duplicated-javascript */}
			<Collapse
				items={[
					{
						key: "39",
						label: "Duplicated javascript",
						children: (
							<DuplicatedJavaScript
								data={data?.["duplicated-javascript"]}
							/>
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["duplicated-javascript"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* third-party-summary */}
			<Collapse
				items={[
					{
						key: "40",
						label: "Third party summary",
						children: (
							<ThirdPartySummary
								data={data?.["third-party-summary"]}
							/>
						),
						extra: (
							<span className="bg-yellow-500 px-4 py-2 rounded-md text-white">
								{data?.["third-party-summary"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* server-response-time */}
			<Collapse
				items={[
					{
						key: "41",
						label: "Server response time",
						children: (
							<ServerResponseTime
								data={data?.["server-response-time"]}
							/>
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["server-response-time"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-responsive-images */}
			<Collapse
				items={[
					{
						key: "42",
						label: "Uses responsive images",
						children: (
							<UsesResponsiveImages
								data={data?.["uses-responsive-images"]}
							/>
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["uses-responsive-images"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* network-server-latency */}
			<Collapse
				items={[
					{
						key: "43",
						label: "Network server latency",
						children: (
							<NetworkServerLatency
								data={data?.["network-server-latency"]}
							/>
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["network-server-latency"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* dom-size */}
			<Collapse
				items={[
					{
						key: "44",
						label: "DOM size",
						children: <DOMSize data={data?.["dom-size"]} />,
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["dom-size"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* third-party-facades */}
			<Collapse
				items={[
					{
						key: "45",
						label: "Third party facades",
						children: (
							<ThirdPartyFacades
								data={data?.["third-party-facades"]}
							/>
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["third-party-facades"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* screenshot-thumbnails */}
			<Collapse
				items={[
					{
						key: "46",
						label: "Screenshot thumbnails",
						children: (
							<ScreenshotThumbnails
								data={data?.["screenshot-thumbnails"]}
							/>
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["screenshot-thumbnails"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* lcp-lazy-loaded */}
			<Collapse
				items={[
					{
						key: "47",
						label: "Lcp lazy loaded",
						children: (
							<LCPLazyLoaded data={data?.["lcp-lazy-loaded"]} />
						),
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["lcp-lazy-loaded"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* metrics */}
			<Collapse
				items={[
					{
						key: "48",
						label: "Metrics",
						children: <Metrics data={data?.["metrics"]} />,
						extra: (
							<span className="bg-slate-900 px-4 py-2 rounded-md text-white">
								{data?.["metrics"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-text-compression */}
			<Collapse
				items={[
					{
						key: "49",
						label: "Uses text compression",
						children: (
							<UsesTextCompression
								data={data?.["uses-text-compression"]}
							/>
						),
						extra: (
							<span className="bg-slate-500 px-4 py-2 rounded-md text-white">
								{data?.["uses-text-compression"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* largest-contentful-paint */}
			<Collapse
				items={[
					{
						key: "50",
						label: "Largest contentful paint",
						children: (
							<LargestContentfulPaint
								data={data?.["largest-contentful-paint"]}
							/>
						),
						extra: (
							<span className="bg-slate-500 px-4 py-2 rounded-md text-white">
								{data?.["largest-contentful-paint"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* long-tasks */}
			<Collapse
				items={[
					{
						key: "51",
						label: "Long tasks",
						children: <LongTasks data={data?.["long-tasks"]} />,
						extra: (
							<span className="bg-slate-500 px-4 py-2 rounded-md text-white">
								{data?.["uses-text-compression"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
			{/* uses-passive-event-listeners */}
			<Collapse
				items={[
					{
						key: "52",
						label: "Uses passive event listeners",
						children: (
							<UsesPassiveEventListeners
								data={data?.["uses-passive-event-listeners"]}
							/>
						),
						extra: (
							<span className="bg-slate-500 px-4 py-2 rounded-md text-white">
								{data?.["uses-text-compression"].score * 100} scores
							</span>
						),
					},
				]}
			/>
			<Divider />
		</>
	);
}

export default Audits;
