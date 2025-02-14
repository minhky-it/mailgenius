import { createContext, useEffect, useState, useRef } from "react";
import useQuery from "../hooks/useQuery";
import { SERVICE } from "../enum/service";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import newsLetter from "grapesjs-preset-newsletter";
export const TemplateContext = createContext();

export const TemplateContextProvider = ({ children }) => {
	const query = useQuery();
	const templateId = query.get("id");
	const templateName = query.get("name");
	const token = localStorage.getItem("access_token");
	const editorRef = useRef(null);
	const [html, setHtml] = useState(null);

	useEffect(() => {
		init();
	}, [templateId]);

	const endPoint = `/api/${SERVICE.EMAIL}/template/editor?id=${templateId}`;
	const init = (html) => {
		// Khởi tạo editor lần đầu
		const editor = grapesjs.init({
			container: "#editor",
			plugins: [newsLetter, websitePlugin, basicBlockPlugin, formPlugin],
			width: "auto",
			storageManager: {
				type: "remote",
				options: {
					local: { key: `gjsProjectData_${templateId}` },
					remote: {
						urlLoad: endPoint,
						urlStore: endPoint,
						fetchOptions: (opts) => ({
							...opts,
							method: opts.method === "POST" ? "PATCH" : opts.method,
							headers: {
								...opts.headers,
								Authorization: token,  // Đính kèm token vào header
							},
						}),
						onLoad: (result) => result.data,
					},
				},
				autosave: true,
				autoload: true,
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
				window.location = "/dashboard/templates";
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
			const htmlTemplate = editor.getHtml();
			setHtml(htmlTemplate);
		});

		const htmlTemplate = editor.getHtml();
		setHtml(htmlTemplate);
	};

	return (
		<TemplateContext.Provider
			value={{
				templateName,
			}}
		>
			{children}
		</TemplateContext.Provider>
	);
};