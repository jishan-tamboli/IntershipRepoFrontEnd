import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ show, onHide, order = null, onSave }) => {
  const [form, setForm] = useState({ orderStatus: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setForm({ orderStatus: order.orderStatus || 'Pending' });
    }
  }, [order]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.put(`/api/orders/${order.orderId}`, form);
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
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Status *</Form.Label>
            <Form.Select
              value={form.orderStatus}
              onChange={e => setForm({ ...form, orderStatus: e.target.value })}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Update'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderForm;