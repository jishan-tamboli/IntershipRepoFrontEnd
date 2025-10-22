import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ShippingCard from './ShippingCard';
import ShippingForm from './ShippingForm';

const ShippingDashboard = () => {
  const [shippings, setShippings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/shipping')
      .then(res => setShippings(res.data))
      .catch(() => alert('Failed to load shipping'));
  }, [refresh]);

  const handleCreate = () => setShowForm(true);
  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Shipping Management</h1>
          <p className="text-muted">{shippings.length} shipping entries</p>
          <Button variant="success" onClick={handleCreate}>Add New Shipping</Button>
        </Col>
      </Row>

      <Row>
        {shippings.length ? (
          shippings.map(s => (
            <Col md={4} key={s.shippingId} className="mb-4">
              <ShippingCard
                shipping={s}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No shipping yet.</p></Col>
        )}
      </Row>

      <ShippingForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleUpdate}
      />
    </Container>
  );
};

export default ShippingDashboard;