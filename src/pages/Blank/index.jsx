import { Col, Row, Typography, Card, Table } from "antd";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const dataSource = [
  {
    key: '1',
    product: 'Mike',
    qty: 120,
    total: '10 Downing Street',
  },
  {
    key: '2',
    product: 'Mike',
    qty: 240,
    total: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
];

const dataSource2 = [
  {
    key: '1',
    product: 'Mike',
    qty: 120,
    total: '10 Downing Street',
  },
  {
    key: '2',
    product: 'Mike',
    qty: 240,
    total: '10 Downing Street',
  },
];



const Blank = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <Title>Annual Orders {lastSegment}</Title>
            <Text style={{ fontSize: "12pt" }}>Left Table</Text>
            <Table dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
        <Col xs={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <Title>Monthly Orders {lastSegment}</Title>
            <Text style={{ fontSize: "12pt" }}>Right Table</Text>
            <Table dataSource={dataSourc2} columns={columns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Blank;