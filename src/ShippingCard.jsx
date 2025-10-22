import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import ShippingForm from './ShippingForm';

const ShippingCard = ({ shipping, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <Card className="category-card h-100">
        <Card.Body>
          <Card.Title>Shipping #{shipping.shippingId}</Card.Title>
          <Card.Text>Order ID: {shipping.orderId}</Card.Text>
          <Card.Text>Courier: {shipping.courierService}</Card.Text>
          <Card.Text>Tracking: {shipping.trackingNumber}</Card.Text>
          <Card.Text>Status: {shipping.shippingStatus}</Card.Text>
          <Card.Text>Cost: ${shipping.shippingCost}</Card.Text>
          <div className="mt-2">
            <Button variant="primary" size="sm" onClick={() => setShowEdit(true)}>
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ShippingForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        shipping={shipping}
        onSave={onUpdate}
      />
    </>
  );
};

export default ShippingCard;