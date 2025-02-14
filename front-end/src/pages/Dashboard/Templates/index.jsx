import { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GET, DELETE, PATCH, POST } from "../../../api";
import { SERVICE } from "../../../enum/service";
import { debounce } from 'lodash';

const { Meta } = Card;

function Templates() {
    const [tmps, setTmps] = useState(null);
    useEffect(() => {
        handleFetchTmps("email");
    }, []);

    const handleFetchTmps = async (type) => {
        const response = await GET(`${SERVICE.EMAIL}/template/views?type=${type}`);

        if (response.error) {
            console.log(response.message);
            return;
        }
        setTmps([...response.data]);
    };

    const onClickTemplate = (id, tmpName) => {
        window.location.href = `/dashboard/templates/scratch?id=${id}&name=${tmpName}`;
    }

    const deleteTemplate = async (_id) => {
        const response = await DELETE(
            `${SERVICE.EMAIL}/template/remove?id=${_id}`,
        );
        if (response.error) {
            console.log(response.message);
            return;
        }

        handleFetchTmps("email");
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState({ _id: '', name: '', subject: '' });
    const handleEdit = (_id, name, subject) => {
        setCurrentTemplate({ _id, name, subject });
        setIsModalVisible(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTemplate((prev) => ({ ...prev, [name]: value }));
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        const response = await PATCH(`${SERVICE.EMAIL}/template/update`, { ...currentTemplate });
        if (response.error) {
            console.log(response.message);
            return;
        }
        handleFetchTmps("email");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = debounce(async (name) => {
        const response = await POST(`${SERVICE.EMAIL}/template/search`, { name, type: "email" });
        if (response.error) {
            console.log(response.message);
            return;
        }
        setTmps([...response.data]);
    }, 500);

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        setIsFormValid(currentTemplate.name !== '' && currentTemplate.subject !== '');
    }, [currentTemplate.name, currentTemplate.subject]);

    return (
        <>
            <div className="mx-10 my-5">
                <div className="m-6 p-10 pb-4 font-calistogaFont bg-gray-100 border rounded-xl shadow-md">
                    <span className="font-Means font-semibold text-3xl my-1">
                        Email template
                    </span>
                    <div className="flex justify-between my-1">
                        <p className="text-[#65686c]">
                            Get started with flexible templates and our built-in, expert
                            advice.
                        </p>
                        <Link
                            to="/dashboard/templates/create"
                            className="text-[#007c89] text-lg flex flex-row items-center"
                        >
                            Start from scratch
                            <ArrowRightIcon className="ml-3" />
                        </Link>
                    </div>
                    <hr className="mb-6 mt-2 border-[#a8abb0]" />
                    <div>
                        <div className="relative w-full mb-6">
                            <input
                                onChange={e => handleSearch(e.target.value)}
                                type="text"
                                placeholder="Search templates"
                                className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 placeholder:text-[#241c15a6] text-[#09090b] hover:border-[#007c89] focus:border-[#007c89] focus:outline-none"
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <Row gutter={16} justify="start">
                            {tmps &&
                                tmps.map((tmp) => (
                                    <Col className="gutter-row mb-4" xs={24} sm={12} md={8}>
                                        <Card
                                            onClick={() => { onClickTemplate(tmp._id, tmp.name) }}
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
                                            <div className="absolute top-2 right-2 flex space-x-2">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    icon={<EditOutlined />}
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(tmp._id, tmp.name, tmp.subject);
                                                    }}
                                                />
                                                <Button
                                                    type="danger"
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteTemplate(tmp._id);
                                                    }}
                                                />
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </div>
            </div>
            <Modal
                title="Edit Template"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: !isFormValid }}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            name="name"
                            value={currentTemplate.name}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Subject">
                        <Input
                            name="subject"
                            value={currentTemplate.subject}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Templates;