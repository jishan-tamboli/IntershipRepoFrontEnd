import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import PaymentCard from './PaymentCard';
import PaymentForm from './PaymentForm';

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/payments')
      .then(res => setPayments(res.data))
      .catch(() => alert('Failed to load payments'));
  }, [refresh]);

  const handleCreate = () => setShowForm(true);
  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Payment Management</h1>
          <p className="text-muted">{payments.length} payments</p>
          <Button variant="success" onClick={handleCreate}>Process New Payment</Button>
        </Col>
      </Row>

      <Row>
        {payments.length ? (
          payments.map(p => (
            <Col md={4} key={p.paymentId} className="mb-4">
              <PaymentCard
                payment={p}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No payments yet.</p></Col>
        )}
      </Row>

      <PaymentForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleUpdate}
      />
    </Container>
  );
};

export default PaymentDashboard;