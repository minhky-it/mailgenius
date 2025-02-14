import ProfileContent from "./ProfileContent";
import SecurityContent from "./SecurityContent";
import ConnectionsContent from "./ConnectContent";
function GeneralContent() {
    return (<>
        <div className="h-full overflow-y-auto z-10 mt-4 custom-scrollbar">
            <div className="relative rounded-lg border p-4 my-4 pb-10 bg-white">
                <ProfileContent />
            </div>
            <div className="relative rounded-lg border p-4 my-4 pb-10 bg-white">
                <SecurityContent />
            </div>
            <div className="relative rounded-lg border p-4 my-4 pb-10 bg-white">
                <ConnectionsContent />
            </div>
        </div>
    </>)
}

export default GeneralContent;