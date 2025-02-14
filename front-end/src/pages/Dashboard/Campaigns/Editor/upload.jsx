import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ScratchContext } from "../../../../context/ScratchContext";
import useQuery from "../../../../hooks/useQuery";
import { POST, POST_FORM, GET } from "../../../../api";
import { SERVICE } from "../../../../enum/service";
import { ArchiveIcon, CheckboxIcon, CopyIcon, PersonIcon, UploadIcon } from "@radix-ui/react-icons";
import { Radio, Checkbox, Button, message, Spin } from "antd";

function Upload() {
    const query = useQuery();
    const [msgError, setMsgError] = useState(null);
    const { user } = useContext(AuthContext);
    const { recommendations, setRecommendations, campaignId } = useContext(ScratchContext);

    useEffect(() => {
        setRecommendations([]);
        handleGetRecommendations();
    }, []);

    const handleGetRecommendations = async () => {
        const response = await GET(
            `${SERVICE.DATA}/recommendation/get?campaign_id=${campaignId}`,
        );
        if (response.error) {
            console.log(response.message);
            return;
        }
        setRecommendations(response.data.recommendations);
    };

    const [files, setFiles] = useState([]);
    const handleFileChange = (event) => {
        const { name, files: selectedFiles } = event.target;
        const index = parseInt(name);
        const file = selectedFiles[0];

        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index] = file;
            return newFiles;
        });
    };

    const [recipients, setRecipients] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleProductChange = (e) => {
        const selected = recommendations.find(
            (item) => item.product_id === e.target.value
        );
        setSelectedProduct(selected?.product_id);
        setRecipients(selected?.recommendations || []);
        console.log(selectedCheckbox);
        setSelectedCheckbox([]);
    };

    const [selectedCheckbox, setSelectedCheckbox] = useState([]);
    const handleRecipientsChange = (checkedValues) => {
        setSelectedCheckbox(checkedValues);
    };


    const handleSelectAll = () => {
        if (selectedCheckbox.length === recipients.length) {
            setSelectedCheckbox([]);
        } else {
            setSelectedCheckbox(recipients.map(recipient => recipient.user_id));
        }
    };

    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
        });
    };

    const handleCopy = () => {
        const recipientsData = recipients
            .filter(recipient => selectedCheckbox.includes(recipient.user_id))
            .map(recipient => `${recipient.email.split('@')[0]} , ${recipient.email}`)
            .join('\n');

        navigator.clipboard.writeText(recipientsData)
            .then(() => {
                success('Copied to clipboard', 'success');
            })
            .catch(() => {
                console.error('Failed to copy to clipboard');
            });
    };

    const [uploadResponse, setUploadResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsgError("");
        setLoading(true);
        const campaignId = query.get("id");
        const userId = user._id;
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("campaign_id", campaignId);
        formData.append("transaction_file", files[0]);

        const response = await POST_FORM(`${SERVICE.DATA}/campaign/upload`, formData);
        if (response.code === 200 || response.code === 201) {
            message.success(response.message);
            setUploadResponse(response.data);
        } else {
            message.error("Upload failed");
        }
        setLoading(false);
    };

    const handleAnalyze = async () => {
        setAnalyzing(true);
        const userId = user._id;
        const response = await POST(`${SERVICE.DATA}/alsmodel/analyze`, {
            num_recs: 10,
            user_id: userId,
            campaign_id: uploadResponse.campaign_id,
            transaction_path: uploadResponse.transaction_path,
        });

        if (response.code === 200) {
            message.success(response.message);
            const parsedData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            setRecommendations(parsedData);
        } else {
            setMsgError("Please upload an other transaction file");
            message.error('An error occurred while analyzing');
        }
        setAnalyzing(false);
    };
    return (
        <div className="flex flex-col space-x-4 mx-6">
            <Spin spinning={loading || analyzing}>
                <form enctype="multipart/form-data" onSubmit={handleSubmit}
                    className="font-GraphikFont w-full mx-2 p-8 bg-white shadow-md rounded-lg">
                    <div className="flex flex-row items-center space-x-2">
                        <UploadIcon className="size-6" />
                        <h2 className="text-2xl font-semibold">Upload CSV Files</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Transaction CSV file with some headers as user_id, email, product_id,  product_name, rating</p>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold my-2">Transaction CSV</label>
                        <input type="file" accept=".csv" name="0" onChange={handleFileChange} required className="w-full px-5 py-3 border border-blue-400 bg-blue-100 rounded-md" />
                    </div>
                    {msgError && (
                        <div className="text-red-500 text-sm mt-2">{msgError}</div>
                    )}
                    {uploadResponse && !msgError ? (
                        <button type="button" onClick={handleAnalyze} className="mt-6 w-full py-3 px-8 block mx-auto bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50">
                            Analyze
                        </button>
                    ) : (
                        <button type="submit" className="mt-6 w-full py-3 px-8 block mx-auto bg-blue-400 text-white font-medium rounded-md shadow-lg hover:brightness-125 transition-all duration-300 disabled:opacity-50">
                            Upload
                        </button>
                    )}
                </form>
            </Spin>

            {/* {uploadResponse && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Upload Response</h3>
                    <p><strong>Campaign ID:</strong> {uploadResponse.campaign_id}</p>
                    <p><strong>Strategy ID:</strong> {uploadResponse.strategy_id}</p>
                    <p><strong>Transaction Path:</strong> {uploadResponse.transaction_path}</p>
                    <p><strong>User ID:</strong> {uploadResponse.user_id}</p>
                </div>
            )} */}

            {contextHolder}
            <div className="flex flex-row space-x-4 my-4">
                {/* Bảng Sản Phẩm */}
                <div className="w-1/2">
                    <div className="flex flex-row items-center space-x-2 mb-4">
                        <ArchiveIcon className="size-6" />
                        <h2 className="text-2xl font-semibold text-center">Products</h2>
                    </div>
                    <Radio.Group name="radiogroup" value={selectedProduct} onChange={handleProductChange}>
                        <table className="min-w-full table-auto font-GraphikFont">
                            <thead className="text-sm">
                                <tr className="text-left text-gray-700">
                                    <th className="py-2 px-4 border-b">Select</th>
                                    <th className="py-2 px-4 border-b">Product ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-helveticeFont">
                                {recommendations && recommendations.length > 0 ? (
                                    recommendations.map((product) => (
                                        <tr key={product.product_id} className="border-b border-gray-400 hover:bg-gray-200 text-[#241c15a6]">
                                            <td className="py-2 px-4 border-b cursor-pointer">
                                                <Radio value={product.product_id}></Radio>
                                            </td>
                                            <td className="py-2 px-4 border-b">{product.product_id}</td>
                                            <td className="py-2 px-4 border-b">{product.product_name || "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-2 px-4 border-b text-center">No recommendations available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Radio.Group>
                </div>

                {/* Bảng Người Dùng */}
                <div className="w-1/2">
                    <div className="flex flex-row items-center space-x-2 mb-4">
                        <PersonIcon className="size-6" />
                        <h2 className="text-2xl font-semibold text-center">Users</h2>
                    </div>
                    <div className="flex justify-between mb-4">
                        <Button onClick={handleSelectAll}>
                            <CheckboxIcon className="size-4" />
                            Select All
                        </Button>
                        <Button onClick={handleCopy}>
                            <CopyIcon className="size-4" />
                            Copy
                        </Button>
                    </div>
                    <Checkbox.Group value={selectedCheckbox} onChange={handleRecipientsChange} >
                        <table className="min-w-full table-auto font-GraphikFont">
                            <thead className="text-sm">
                                <tr className="text-left text-gray-700">
                                    <th className="py-2 px-4 border-b">Select</th>
                                    <th className="py-2 px-4 border-b">User ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Prediction</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-helveticeFont">
                                {recommendations && recommendations.length > 0 ? (
                                    recipients.map((recipient) => (
                                        <tr key={recipient.user_id} className="border-b border-gray-400 hover:bg-gray-200 text-[#241c15a6]">
                                            <td className="py-2 px-4 border-b cursor-pointer">
                                                <Checkbox value={recipient.user_id} />
                                            </td>
                                            <td className="py-2 px-4 border-b">{recipient.user_id}</td>
                                            <td className="py-2 px-4 border-b">{recipient.email.split('@')[0] || "N/A"}</td>
                                            <td className="py-2 px-4 border-b">{recipient.email || "N/A"}</td>
                                            <td className="py-2 px-4 border-b">{recipient.rating.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-2 px-4 border-b text-center">No recommendations available</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </Checkbox.Group>

                </div>
            </div>
        </div>
    );
}

export default Upload;