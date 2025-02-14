import { Col, Card, Row } from "antd";
const EntitiesDisplay = ({entities}) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Entities</h1>
            <Row gutter={16}>
                {entities.map((entity, index) => (
                    <Col span={8} key={index}>
                        <Card title={entity.name} bordered={false} className="mb-4">
                            {entity.homepage && (
                                <p>
                                    <strong>Homepage:</strong> <a href={entity.homepage} target="_blank" rel="noopener noreferrer">{entity.homepage}</a>
                                </p>
                            )}
                            <p><strong>Category:</strong> {entity.category}</p>
                            <p><strong>Origins:</strong></p>
                            <ul>
                                {entity.origins.map((origin, idx) => (
                                    <li key={idx}>{origin}</li>
                                ))}
                            </ul>
                            {entity.isFirstParty && <p className="text-green-500">First Party</p>}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default EntitiesDisplay;