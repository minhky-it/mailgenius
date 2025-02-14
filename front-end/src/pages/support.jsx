import { useState } from "react";

const services = [
    { name: "Dịch vụ 1", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { name: "Dịch vụ 2", video: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
    { name: "Dịch vụ 3", video: "https://www.youtube.com/embed/tgbNymZ7vqY" },
];

function Support() {
    const [selectedVideo, setSelectedVideo] = useState(services[0].video);

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="w-1/4 bg-white shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Dịch vụ hỗ trợ</h2>
                    <ul>
                        {services.map((service, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg"
                                onClick={() => setSelectedVideo(service.video)}
                            >
                                {service.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Video Display */}
                <div className="flex-1 flex justify-center items-center p-4">
                    <iframe
                        width="80%"
                        height="80%"
                        src={selectedVideo}
                        title="Hướng dẫn"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default Support;