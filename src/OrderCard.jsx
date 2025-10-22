import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import OrderForm from './OrderForm';
import axios from 'axios';

const OrderCard = ({ order, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleCancel = () => {
    if (window.confirm('Cancel this order?')) {
      axios.patch(`/api/orders/${order.orderId}/cancel`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to cancel'));
    }
  };

  return (
    <>
      <Card className="category-card h-100">
        <Card.Body>
          <Card.Title>Order #{order.orderId}</Card.Title>
          <Card.Text>Customer ID: {order.customerId}</Card.Text>
          <Card.Text>Shipping: {order.shippingAddress}</Card.Text>
          <Badge bg="success" className="mb-2">${order.totalAmount}</Badge>
          <Badge bg="info">Status: {order.orderStatus}</Badge>
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>
              Update Status
            </Button>
            <Button variant="danger" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>

      <OrderForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        order={order}
        onSave={onUpdate}
      />
    </>
  );
};

export default OrderCard;