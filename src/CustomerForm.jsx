import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerForm = ({ show, onHide, customer = null, onSave }) => {
  const isEdit = !!customer;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setForm({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || ''
      });
    } else {
      setForm({ firstName: '', lastName: '', email: '', phone: '' });
    }
  }, [customer]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit) {
        await axios.put(`/api/customers/${customer.userId}`, form);
      } else {
        await axios.post('/api/customers', form);
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
        <Modal.Title>{isEdit ? 'Edit Customer' : 'Add New Customer'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
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

export default CustomerForm;