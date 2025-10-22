import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ShippingForm = ({ show, onHide, shipping = null, onSave }) => {
  const isEdit = !!shipping;

  const [form, setForm] = useState({
    orderId: '',
    courierService: '',
    trackingNumber: '',
    shippingStatus: '',
    shippingCost: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shipping) {
      setForm({
        orderId: shipping.orderId || '',
        courierService: shipping.courierService || '',
        trackingNumber: shipping.trackingNumber || '',
        shippingStatus: shipping.shippingStatus || '',
        shippingCost: shipping.shippingCost?.toString() || ''
      });
    } else {
      setForm({ orderId: '', courierService: '', trackingNumber: '', shippingStatus: '', shippingCost: '' });
    }
  }, [shipping]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      orderId: parseInt(form.orderId),
      courierService: form.courierService,
      trackingNumber: form.trackingNumber,
      shippingStatus: form.shippingStatus,
      shippingCost: parseFloat(form.shippingCost)
    };

    try {
      if (isEdit) {
        await axios.put(`/api/shipping/${shipping.shippingId}`, payload);
      } else {
        await axios.post('/api/shipping', payload);
      }
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
        <Modal.Title>{isEdit ? 'Update Shipping' : 'Add New Shipping'}</Modal.Title>
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
            <Form.Label>Courier Service</Form.Label>
            <Form.Control
              value={form.courierService}
              onChange={e => setForm({ ...form, courierService: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tracking Number</Form.Label>
            <Form.Control
              value={form.trackingNumber}
              onChange={e => setForm({ ...form, trackingNumber: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shipping Status</Form.Label>
            <Form.Select
              value={form.shippingStatus}
              onChange={e => setForm({ ...form, shippingStatus: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shipping Cost</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={form.shippingCost}
              onChange={e => setForm({ ...form, shippingCost: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : (isEdit ? 'Update' : 'Create')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ShippingForm;