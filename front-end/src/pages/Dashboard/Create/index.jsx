import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { POST } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { EnvelopeClosedIcon, ReaderIcon, RocketIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const { Meta } = Card;

function Create() {
	const createFastCampaign = async () => {
		const data = {
			name: "New Project",
			subject: "New Project From MailGenius",
			description: "Description of the new project",
			type: "email",
		};

		const response = await POST(`${SERVICE.EMAIL}/campaign/create`, { ...data });
		if (response.error) {
			console.log(response.message);
			return;
		}

		window.location.href = `/dashboard/campaigns/editor?id=${response.data._id}`;
	};

	const createFastTemplate = async () => {
		const data = {
			name: "New Template",
			subject: "New Template From MailGenius",
			type: "email",
		};

		const response = await POST(`${SERVICE.EMAIL}/template/create`, { ...data });
		if (response.error) {
			console.log(response.message);
			return;
		}
		window.location.href = `/dashboard/templates/scratch?id=${response.data._id}`;
	};

	const onClickLandingpage = () => {
		window.location.href = `/dashboard/landing`;
	};

	return (
		<>
			<div className="space-y-2 px-20 py-4">
				<span className="font-GraphikFont font-semibold">Quick action</span>
				<div className="flex flex-row space-x-6">
					<button onClick={createFastCampaign} className="flex flex-row border border-gray-800 text-[#007c89] bg-white font-semibold text-sm px-6 py-4 rounded-full hover:shadow-xl w-1/3">
						<RocketIcon className="w-5 h-5 mr-4" />
						<span>Create campaign</span>
					</button>
					<button onClick={onClickLandingpage} className="flex flex-row border border-gray-800 text-[#007c89] bg-white font-semibold text-sm px-6 py-4 rounded-full hover:shadow-xl w-1/3">
						<ReaderIcon className="w-5 h-5 mr-4" />
						<span>Sign-up landing page</span>
					</button>
					<button onClick={createFastTemplate} className="flex flex-row border border-gray-800 text-[#007c89] bg-white font-semibold text-sm px-6 py-4 rounded-full hover:shadow-xl w-1/3">
						<EnvelopeClosedIcon className="w-5 h-5 mr-4" />
						<span>Create email template</span>
					</button>
				</div>
			</div>
			<div className="mx-10 my-5">
				<div className="m-6 p-10 font-calistogaFont bg-gray-100 border rounded-xl shadow-md">
					<span className="font-Means font-semibold text-3xl my-1">
						Design your email
					</span>
					<div className="flex justify-between my-1">
						<p className="text-[#65686c]">
							Get started with flexible templates and our built-in, expert
							advice.
						</p>
						<Link
							to="/dashboard/templates"
							className="text-[#007c89] text-lg flex flex-row items-center"
						>
							See all email templates
							<ArrowRightIcon className="ml-3" />
						</Link>
					</div>
					<hr className="mb-10 mt-2 border-[#a8abb0]" />
					<div>
						<Row gutter={16} justify="center">
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="From scratch"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/streamlined-template-selection/SFS%282%29.jpg"
											/>
										}
									>
										<Meta
											title="From scratch"
											description="Begin with a black canvas to fully customize your email's design and content."
										/>
									</Card>
								</div>
							</Col>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="Basic layout"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/streamlined-template-selection/Basic%282%29.jpg"
											/>
										}
									>
										<Meta
											title="Basic layout"
											description="Start with basic elements to easily manipulate content."
										/>
									</Card>
								</div>
							</Col>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="Fully designed template"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/streamlined-template-selection/Professional_full.jpg"
											/>
										}
									>
										<Meta
											title="Fully designed template"
											description="Choose a professionally designed template and adjust it to your needs with ease."
										/>
									</Card>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>

			<div className="mx-10 my-5">
				<div className="m-6 p-10 font-calistogaFont bg-gray-100 border rounded-xl shadow-md">
					<span className="font-Means font-semibold text-3xl my-1">
						Create a form to learn more about your audience
					</span>
					<div className="flex justify-between my-1">
						<p className="text-[#65686c]">
							Grow your audience with customizable forms.
						</p>
						<Link
							to="/dashboard/landing"
							className="text-[#007c89] text-lg flex flex-row items-center"
						>
							Try out new features
							<ArrowRightIcon className="ml-3" />
						</Link>
					</div>
					<hr className="mb-10 mt-2 border-[#a8abb0]" />
					<div>
						<Row gutter={16} justify="center">
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="Pop-up form"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/forms-landing-pages/forms-overview-aui-updates/popupform_aui3x_compressed.png"
											/>
										}
									>
										<Meta
											title="Pop-up form"
											description="Capture email and/or SMS contacts with a pop-up form that can be added to any site."
										/>
									</Card>
								</div>
							</Col>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="Embedded form"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/forms-landing-pages/forms-overview-aui-updates/embedded_form_aui3x_compressed.png"
											/>
										}
									>
										<Meta
											title="Embedded form"
											description="Create a custom form that you can embed anywhere on your website."
										/>
									</Card>
								</div>
							</Col>
							<Col className="gutter-row" xs={24} sm={12} md={8}>
								<div>
									<Card
										hoverable
										cover={
											<img
												alt="Signup landing page"
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/forms-landing-pages/forms-overview-aui-updates/signup_landing_page_aui3x_compressed.png"
											/>
										}
									>
										<Meta
											title="Signup landing page"
											description="Create a page to grow your audience that you can share anywhere."
										/>
									</Card>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</>
	);
}

export default Create;
