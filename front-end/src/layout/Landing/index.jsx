import { LandingContextProvider } from "../../context/LandingContext";
function LandingLayout({ children }) {
    return (
        <LandingContextProvider>
            <>
                <div className="container-fluid mx-auto h-screen z-10">
                    {children}
                </div>
            </>
        </LandingContextProvider>
    )
}

export default LandingLayout;