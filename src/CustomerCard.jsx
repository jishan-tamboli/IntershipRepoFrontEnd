import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import CustomerForm from './CustomerForm';

const CustomerCard = ({ customer, onUpdate, onDeactivate }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeactivate = () => {
    if (window.confirm('Deactivate this customer?')) {
      onDeactivate(customer.userId);
    }
  };

  return (
    <>
      <Card className="category-card h-100">
        <Card.Body>
          <Card.Title>{customer.firstName} {customer.lastName}</Card.Title>
          <Card.Text>Email: {customer.email}</Card.Text>
          <Card.Text>Phone: {customer.phone}</Card.Text>
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeactivate}>
              Deactivate
            </Button>
          </div>
        </Card.Body>
      </Card>

      <CustomerForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        customer={customer}
        onSave={onUpdate}
      />
    </>
  );
};

export default CustomerCard;