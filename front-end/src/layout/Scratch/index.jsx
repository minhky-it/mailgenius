import { ScratchContextProvider } from "../../context/ScratchContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
function ScratchLayout({ children }) {
    return (
        <ScratchContextProvider>
            <Header />
            <div className="container mx-auto grid grid-cols-5 h-full z-10">
                <Sidebar />
                {children}
            </div>
        </ScratchContextProvider>
    )
}

export default ScratchLayout;