import { Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
const PaymentCard = ({ payment, onUpdate }) => {

  const handleRefund = () => {
    if (window.confirm('Refund this payment?')) {
      axios.patch(`/api/payments/${payment.paymentId}/refund`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to refund'));
    }
  };

  return (
    <Card className="category-card h-100">
      <Card.Body>
        <Card.Title>Payment #{payment.paymentId}</Card.Title>
        <Card.Text>Order ID: {payment.orderId}</Card.Text>
        <Badge bg="success" className="mb-2">${payment.amount}</Badge>
        <Badge bg="info">Method: {payment.paymentMethod}</Badge>
        <Badge bg="warning">Status: {payment.paymentStatus}</Badge>
        <div className="mt-2">
          <Button variant="danger" size="sm" onClick={handleRefund} disabled={payment.paymentStatus === 'Refunded'}>
            Refund
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaymentCard;