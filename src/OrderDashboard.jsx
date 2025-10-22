import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import OrderCard from './OrderCard';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/orders/active')
      .then(res => setOrders(res.data))
      .catch(() => alert('Failed to load orders'));
  }, [refresh]);

  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Order Management</h1>
          <p className="text-muted">{orders.length} active orders</p>
        </Col>
      </Row>

      <Row>
        {orders.length ? (
          orders.map(o => (
            <Col md={4} key={o.orderId} className="mb-4">
              <OrderCard
                order={o}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No orders yet.</p></Col>
        )}
      </Row>
    </Container>
  );
};

export default OrderDashboard;