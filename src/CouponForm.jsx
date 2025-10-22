import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CouponForm = ({ show, onHide, coupon = null, onSave }) => {
  const isEdit = !!coupon;

  const [form, setForm] = useState({
    couponCode: '',
    discountType: '',
    discountValue: '',
    validFrom: '',
    validTo: '',
    usageLimit: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coupon) {
      setForm({
        couponCode: coupon.couponCode || '',
        discountType: coupon.discountType || '',
        discountValue: coupon.discountValue?.toString() || '',
        validFrom: coupon.validFrom || '',
        validTo: coupon.validTo || '',
        usageLimit: coupon.usageLimit?.toString() || ''
      });
    } else {
      setForm({ couponCode: '', discountType: '', discountValue: '', validFrom: '', validTo: '', usageLimit: '' });
    }
  }, [coupon]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      couponCode: form.couponCode,
      discountType: form.discountType,
      discountValue: parseFloat(form.discountValue),
      validFrom: form.validFrom,
      validTo: form.validTo,
      usageLimit: parseInt(form.usageLimit)
    };

    try {
      if (isEdit) {
        await axios.put(`/api/coupons/${coupon.couponId}`, payload);
      } else {
        await axios.post('/api/coupons', payload);
      }
      onSave();
      onHide();
    } catch (err) {
      setError(err.response?.data || 'Server error – try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Coupon' : 'Add New Coupon'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Code *</Form.Label>
            <Form.Control
              value={form.couponCode}
              onChange={e => setForm({ ...form, couponCode: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount Type *</Form.Label>
            <Form.Select
              value={form.discountType}
              onChange={e => setForm({ ...form, discountType: e.target.value })}
              required
            >
              <option value="">-- Select --</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount Value *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={form.discountValue}
              onChange={e => setForm({ ...form, discountValue: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Valid From</Form.Label>
            <Form.Control
              type="datetime-local"
              value={form.validFrom}
              onChange={e => setForm({ ...form, validFrom: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Valid To</Form.Label>
            <Form.Control
              type="datetime-local"
              value={form.validTo}
              onChange={e => setForm({ ...form, validTo: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Usage Limit</Form.Label>
            <Form.Control
              type="number"
              value={form.usageLimit}
              onChange={e => setForm({ ...form, usageLimit: e.target.value })}
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

export default CouponForm;