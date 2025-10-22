import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ show, onHide, onSave }) => {
  const [form, setForm] = useState({
    orderId: '',
    amount: '',
    paymentMethod: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      orderId: parseInt(form.orderId),
      amount: parseFloat(form.amount),
      paymentMethod: form.paymentMethod
    };

    try {
      await axios.post('/api/payments', payload);
      onSave();
      onHide();
    } catch (err) {
      setError(err.response?.data || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Process New Payment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Order ID *</Form.Label>
            <Form.Control
              type="number"
              value={form.orderId}
              onChange={e => setForm({ ...form, orderId: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method *</Form.Label>
            <Form.Select
              value={form.paymentMethod}
              onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
              required
            >
              <option value="">-- Select --</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Processing…' : 'Process'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PaymentForm;