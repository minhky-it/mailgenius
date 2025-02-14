import { createContext, useEffect, useState, useContext } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import newsLetter from "grapesjs-preset-newsletter";
import { Modal, Switch } from "antd";
import { GET, PATCH, PUT } from "../api/index.js";
import { SERVICE } from "../enum/service.js";
import { MessageContext } from "./MessageContext.jsx";
export const LandingContext = createContext();
export const LandingContextProvider = ({ children }) => {
	const { showMessage } = useContext(MessageContext);
	useEffect(() => {
		init();
		handleGetInfo();
	}, []);
	const [landing, setLanding] = useState(null);

	const handleGetInfo = async () => {
		const response = await GET(`${SERVICE.EMAIL}/landing/`);
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}
		setLanding(response.data);
	};
	const hanlePublish = async (html) => {
		const response = await PUT(`${SERVICE.EMAIL}/landing/publish`, { html });
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}
		showMessage(response.message, "success");
	};
	const init = (html) => {
		// Khởi tạo editor lần đầu
		const endPoint = `/api/${SERVICE.EMAIL}/landing/scratch`;
		const token = localStorage.getItem("access_token");

		const editor = grapesjs.init({
			container: "#editor",
			plugins: [newsLetter, websitePlugin, basicBlockPlugin, formPlugin],
			width: "auto",
			storageManager: {
				type: "remote",
				options: {
					local: { key: `gjsProjectData_` },
					remote: {
						urlLoad: endPoint,
						urlStore: endPoint,
						fetchOptions: (opts) => ({
							...opts,
							method: opts.method === "POST" ? "PATCH" : opts.method,
							headers: {
								...opts.headers,
								Authorization: token,
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

		editor.Panels.addButton("options", {
			id: "generate",
			className: "fa-solid fa-earth-americas",
			command: "publish",
			attributes: { title: "Publish your website" },
		});

		editor.Commands.add("publish", {
			async run(editor, sender) {
				sender.set("active", false);
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
				await hanlePublish(fullTemplate);
			},
		});

		editor.Panels.addButton("options", {
			id: "edit",
			className: "fa-solid fa-pen-to-square",
			command: "edit_configuration",
			attributes: { title: "Click here to edit meta data" },
		});

		editor.Commands.add("edit_configuration", {
			run(editor, sender) {
				sender.set("active", false);
				showModal();
			},
		});

		editor.Panels.addButton("options", {
			id: "exit",
			className: "fa-solid fa-xmark",
			command: "exit",
			attributes: { title: "Click here to exit" },
		});

		editor.Commands.add("exit", {
			run(editor, sender) {
				sender.set("active", false);
				window.location = "/dashboard";
			},
		});

		// Load dữ liệu nếu đã tồn tại
		const data = editor.getProjectData();
		if (data) {
			editor.loadProjectData(data); // Tải dữ liệu dự án vào editor
		}
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleChangeValue = (e) => {
		const { value, name } = e.target;
		setLanding((prev) => ({ ...prev, [name]: value }));
	};

	const handleChangeScope = (checked) => {
		let value = checked ? "public" : "hidden";
		setLanding((prev) => ({ ...prev, status: value }));
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		const response = await PATCH(`${SERVICE.EMAIL}/landing/`, { ...landing });
		if (response.error) {
			showMessage(response.message, "error");
			return;
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<LandingContext.Provider value={{ landing }}>
			<Modal
				title="Edit meta data of the landing page"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				className="rounded-lg bg-white shadow-lg p-6 max-w-2xl mx-auto"
			>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="block text-gray-700 font-semibold mb-2"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						value={landing && landing.title}
						onChange={(e) => handleChangeValue(e)}
						className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="description"
						className="block text-gray-700 font-semibold mb-2"
					>
						Description
					</label>
					<textarea
						id="description"
						placeholder="Description"
						name="description"
						value={landing && landing.description}
						onChange={(e) => handleChangeValue(e)}
						className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="metadata"
						className="block text-gray-700 font-semibold mb-2"
					>
						Meta data
					</label>
					<textarea
						id="METADATA"
						placeholder="metadata"
						name="metadata"
						value={landing && landing.metadata}
						onChange={(e) => handleChangeValue(e)}
						className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="keywords"
						className="block text-gray-700 font-semibold mb-2"
					>
						Keywords
					</label>
					<input
						type="text"
						name="keywords"
						id="keywords"
						placeholder="Keywords"
						value={landing && landing.keywords}
						onChange={(e) => handleChangeValue(e)}
						className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="public-url">Public URL</label>
					<input
						className="w-full p-3"
						type="text"
						id="public-url"
						placeholder="Public URL"
						value={landing && landing.string_url}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="public-url">Visibility</label>
					<Switch
						name="visibility"
						value={landing && landing.status === "public" ? true : false}
						onChange={handleChangeScope}
					/>
				</div>
			</Modal>

			{children}
		</LandingContext.Provider>
	);
};
