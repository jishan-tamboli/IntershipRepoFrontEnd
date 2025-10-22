import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import CouponCard from './CouponCard';
import CouponForm from './CouponForm';

const CouponDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/coupons/active')
      .then(res => setCoupons(res.data))
      .catch(() => alert('Failed to load coupons'));
  }, [refresh]);

  const handleCreate = () => setShowForm(true);
  const handleUpdate = () => setRefresh(v => v + 1);
  const handleDeactivate = async (id) => {
    await axios.patch(`/api/coupons/${id}/deactivate`);
    setRefresh(v => v + 1);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Coupon Management</h1>
          <p className="text-muted">{coupons.length} active coupons</p>
          <Button variant="success" onClick={handleCreate}>Add New Coupon</Button>
        </Col>
      </Row>

      <Row>
        {coupons.length ? (
          coupons.map(c => (
            <Col md={4} key={c.couponId} className="mb-4">
              <CouponCard
                coupon={c}
                onUpdate={handleUpdate}
                onDeactivate={handleDeactivate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No coupons yet. Add one!</p></Col>
        )}
      </Row>

      <CouponForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleUpdate}
      />
    </Container>
  );
};

export default CouponDashboard;