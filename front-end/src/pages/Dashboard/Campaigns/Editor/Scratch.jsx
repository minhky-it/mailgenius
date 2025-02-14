import React from "react";
import { Drawer, Input, Spin, Modal, Card, Col, Row } from "antd";
import { useState, useContext, useEffect, useRef } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { ScratchContext } from "../../../../context/ScratchContext";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import newsLetter from "grapesjs-preset-newsletter";
import { SERVICE } from "../../../../enum/service";
import { POST, GET } from "../../../../api";
import { MessageContext } from "../../../../context/MessageContext";
const { Meta } = Card;

function Scratch() {
	const [tmps, setTmps] = useState(null);
	const handleFetchTmps = async (type) => {
		const response = await GET(`${SERVICE.EMAIL}/template/views?type=${type}`);

		if (response.error) {
			console.log(response.message);
			return;
		}
		setTmps([...response.data]);
	};

	const onClickTemplate = async (id) => {
		const response = await GET(`${SERVICE.EMAIL}/template/editor?id=${id}`);

		// Cập nhật HTML vào editor
		if (editorRef.current) {
			editorRef.current.loadProjectData(response.data);
		}

		showMessage(response.message);
		toggleModal();
	}

	const { campaignId, setHtml } = useContext(ScratchContext);
	const { showMessage } = useContext(MessageContext);
	const editorRef = useRef(null);
	const token = localStorage.getItem("access_token");
	const [data, setData] = useState({
		description: "",
		link: "",
		name: "",
		image: "",
	});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		init();
		handleFetchTmps("all")
	}, [campaignId]);
	const endPoint = `/api/${SERVICE.EMAIL}/campaign/editor?id=${campaignId}`;
	const init = (html, template) => {
		// Khởi tạo editor lần đầu
		const editor = grapesjs.init({
			container: "#editor",
			plugins: [newsLetter, websitePlugin, basicBlockPlugin, formPlugin],
			width: "auto",
			storageManager: {
				type: "remote",
				options: {
					local: { key: `gjsProjectData_${campaignId}` },
					remote: {
						urlLoad: endPoint,
						urlStore: endPoint,
						fetchOptions: (opts) => ({
							...opts,
							method: opts.method === "POST" ? "PATCH" : opts.method,
							headers: {
								...opts.headers,
								Authorization: token, // Đính kèm token vào header
							},
						}),
						onLoad: (result) => result.data,
					},
				},
				autosave: true,
				autoload: true,
				stepsBeforeSave: 1,
			},
		});
		editor.Panels.addButton("options",
			{
				id: "my-button",
				className:
					"fa-solid fa-wand-magic-sparkles bg-[#463a3c] text-white px-4 py-2 rounded-sm hover:bg-[#5c4c4e]",
				command: "generateAI",
				attributes: { title: "Generate your email with AI" },
			}
		);

		editor.Panels.addButton("options",
			{
				id: "button-template",
				className:
					"fa-solid fa-file-code bg-[#463a3c] text-white px-4 py-2 rounded-sm hover:bg-[#5c4c4e]",
				command: "open-template",
				attributes: { title: "Select some templates" },
			}
		);

		editor.Commands.add("generateAI", {
			run(editor, sender) {
				sender.set("active", false);
				toggleDrawer();
			},
		});

		editor.Commands.add("open-template", {
			run(editor, sender) {
				sender.set("active", false);
				toggleModal();
			},
		});

		editorRef.current = editor;

		if (html) {
			editor.setComponents(html);
		}

		const data = editor.getProjectData();
		if (data) {
			editor.loadProjectData(data);
		}

		editor.on("load", () => {
			const htmlTemplate = editor.getHtml();
			setHtml(htmlTemplate);
		});

		editor.on("storage:end", () => {
			const html = editor.getHtml();
				const css = editor.getCss();
				const fullTemplate = `
					<html>
						<head>
						<style>${css}</style>
						</head>
						<body>${html}</body>
					</html>
					`;
			setHtml(fullTemplate);
		});

		const htmlTemplate = editor.getHtml();
		setHtml(htmlTemplate);
	};

	const [open, setOpen] = useState(false);
	const [openTmp, setOpenTmp] = useState(false);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const toggleModal = () => {
		setOpenTmp(!openTmp);
	};

	const [loadingGenerator, setLoadingGenerator] = useState(false);
	const generateEmail = async (data) => {
		setLoadingGenerator(true);
		const response = await POST(`${SERVICE.DATA}/gemini/generate`, { ...data });

		if (response.error) {
			setLoadingGenerator(false);
			showMessage(response.message, "error");
			return;
		}

		const raw = response.data;
		const processedHtml =
			'"' +
			raw
				.replace(/\\/g, "\\\\")
				.replace(/"/g, '\\"')
				.replace(/\n/g, "\\n")
				.replace(/\r/g, "\\r")
				.replace(/\t/g, "\\t") +
			'"';
		const formattedHtml = JSON.parse(processedHtml);
		setHtml(formattedHtml);

		// Cập nhật HTML vào editor
		if (editorRef.current) {
			editorRef.current.setComponents(formattedHtml);
		}

		console.log(response);
		setLoadingGenerator(false);
		showMessage(response.message);
		toggleDrawer();
	};
	return (
		<div className="relative">
			<div
				id="editor"
				className="col-span-4 bg-gray-100 relative min-h-screen "
			></div>
			<div className="absolute top-0 left-48 z-40">
				<Drawer
					onClose={toggleDrawer}
					open={open}
					title={
						<p className="font-GraphikFont text-xl font-semibold text-center">
							Create an email using AI{" "}
						</p>
					}
				>
					<div className="relative">
						<Spin tip="Loading" size="large" spinning={loadingGenerator}>
							<Input.TextArea
								className="mb-2 text-base rounded-2xl bg-gray-100 p-4 border border-gray-300 hover:border-[#3598a5] focus:border-[#007c89] focus:ring-2 focus:ring-[#007c89] transition-all duration-200"
								rows={4}
								placeholder="Describe the email you want to generate using AI"
								name="description"
								value={data.description}
								onChange={handleChange}
							/>

							<span className="font-GraphikFont text-gray-700 text-sm font-bold my-2">Enter your product name</span>
							<Input
								type="text"
								className="w-full my-2 text-base rounded-2xl bg-gray-100 p-4 border border-gray-300 hover:border-[#3598a5] focus:border-[#007c89] focus:ring-2 focus:ring-[#007c89] transition-all duration-200"
								placeholder="Enter product name"
								name="name"
								value={data.name}
								onChange={handleChange}
							/>

							<span className="font-GraphikFont text-gray-700 text-sm font-bold my-2">Product photo link</span>
							<Input
								type="text"
								className="w-full my-2 text-base rounded-2xl bg-gray-100 p-4 border border-gray-300 hover:border-[#3598a5] focus:border-[#007c89] focus:ring-2 focus:ring-[#007c89] transition-all duration-200"
								placeholder="Enter product image URL"
								name="image"
								value={data.image}
								onChange={handleChange}
							/>

							<span className="font-GraphikFont text-gray-700 text-sm font-bold my-2">Enter your product link</span>
							<Input
								type="text"
								className="w-full my-2 text-base rounded-2xl bg-gray-100 p-4 border border-gray-300 hover:border-[#3598a5] focus:border-[#007c89] focus:ring-2 focus:ring-[#007c89] transition-all duration-200"
								placeholder="Enter product URL"
								name="link"
								value={data.link}
								onChange={handleChange}
							/>

							<button
								onClick={() => generateEmail(data)}
								className="motion-preset-oscillate absolute -bottom-10 right-3 z-10 bg-[#3598a5] w-10 h-10 flex justify-center items-center rounded-full hover:bg-[#007c89] transition-all duration-300"
							>
								<ArrowUpIcon className="size-6 text-white" />
							</button>
						</Spin>
					</div>
				</Drawer>
			</div>

			<Modal
				title="Get started with flexible templates"
				centered
				open={openTmp}
				onCancel={toggleModal}
				width={window.innerWidth - 250}
			>
				<div className="custom-scrollbar">
					<Row gutter={16} justify="start">
						{tmps &&
							tmps.map((tmp) => (
								<Col className="gutter-row mb-4" xs={12} sm={6} md={4}>
									<Card
										key={tmp._id}
										onClick={() => { onClickTemplate(tmp._id) }}
										hoverable
										cover={
											<img
												alt={tmp.name}
												src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/streamlined-template-selection/SFS%282%29.jpg"
											/>
										}
									>
										<Meta
											title={tmp.name}
											description={tmp.subject}
										/>
									</Card>
								</Col>
							))}
					</Row>
				</div>
			</Modal>
		</div>
	);
}

export default Scratch;
