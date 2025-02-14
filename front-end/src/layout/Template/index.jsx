import { TemplateContextProvider } from "../../context/TemplateContext";

function TemplateLayout({ children }) {
    return (
        <TemplateContextProvider>
            <>
                <div className="container-fluid mx-auto h-screen z-10">
                    {children}
                </div>
            </>
        </TemplateContextProvider>
    )
}

export default TemplateLayout;