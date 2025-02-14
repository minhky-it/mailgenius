import { useState } from "react";

const contacts = [
    { name: "Zalo", qr: "https://via.placeholder.com/150?text=Zalo+QR" },
    { name: "Facebook", qr: "https://via.placeholder.com/150?text=Facebook+QR" },
    { name: "Gmail", qr: "https://via.placeholder.com/150?text=Gmail+QR" },
    { name: "Phone", qr: "https://via.placeholder.com/150?text=Phone+QR" },
];

function Contact() {
    const [selectedQR, setSelectedQR] = useState(null);

    return (
        <div className="flex h-screen bg-gray-100 justify-center items-center">
            <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
                onClick={() => setSelectedQR(contacts[0])}
            >
                Liên Hệ
            </button>

            {selectedQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-700"
                            onClick={() => setSelectedQR(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Quét mã QR để liên hệ</h2>
                        <img src={selectedQR.qr} alt="QR Code" className="w-64 h-64 rounded-lg shadow-lg" />
                        <div className="flex justify-around mt-4">
                            {contacts.map((contact, index) => (
                                <button
                                    key={index}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => setSelectedQR(contact)}
                                >
                                    {contact.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;