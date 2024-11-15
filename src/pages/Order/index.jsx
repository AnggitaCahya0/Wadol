import { Col, Row, Typography, Card, Table } from "antd";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const dataSource = [
  {
    key: '1',
    product: 'food',
    qty: 5,
    total: '100',
  },
  {
    key: '2',
    product: 'drinks',
    qty: 10,
    total: '50',
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

const dataM = [
    {
        key: '1',
        product: 'food',
        qty: 2,
        total: '50',
      },
      {
        key: '2',
        product: 'drinks',
        qty: 5,
        total: '25',
      },
    ];
  
const Orders = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <Title>Annual {lastSegment}</Title>
            <Text style={{ fontSize: "12pt" }}>Left Table</Text>
            <Table dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
        <Col xs={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <Title>Monthly {lastSegment}</Title>
            <Text style={{ fontSize: "12pt" }}>Right Table</Text>
            <Table dataSource={dataM} columns={columns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Orders;