import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import CouponForm from './CouponForm';
import axios from 'axios';
const CouponCard = ({ coupon, onUpdate, onDeactivate }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeactivate = () => {
    if (window.confirm('Deactivate this coupon?')) {
      onDeactivate(coupon.couponId);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this coupon?')) {
      axios.delete(`/api/coupons/${coupon.couponId}`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to delete'));
    }
  };

  return (
    <>
      <Card className="category-card h-100">
        <Card.Body>
          <Card.Title>{coupon.couponCode}</Card.Title>
          <Card.Text>Type: {coupon.discountType}</Card.Text>
          <Card.Text>Value: {coupon.discountValue}</Card.Text>
          <Card.Text>Valid: {coupon.validFrom} to {coupon.validTo}</Card.Text>
          <Card.Text>Limit: {coupon.usageLimit}</Card.Text>
          <Card.Text>Status: {coupon.status ? 'Active' : 'Inactive'}</Card.Text>
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant="warning" size="sm" className="me-2" onClick={handleDeactivate}>
              Deactivate
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>

      <CouponForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        coupon={coupon}
        onSave={onUpdate}
      />
    </>
  );
};

export default CouponCard;