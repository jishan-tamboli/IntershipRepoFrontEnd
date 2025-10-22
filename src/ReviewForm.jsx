import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewForm = ({ show, onHide, review = null, onSave, productId }) => {
  const isEdit = !!review;

  const [form, setForm] = useState({
    rating: '',
    reviewText: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      setForm({
        rating: review.rating?.toString() || '',
        reviewText: review.reviewText || ''
      });
    } else {
      setForm({ rating: '', reviewText: '' });
    }
  }, [review]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      productId: isEdit ? review.productId : productId,
      customerId: 1, // Demo; replace with auth
      rating: parseInt(form.rating),
      reviewText: form.reviewText
    };

    try {
      if (isEdit) {
        await axios.put(`/api/reviews/${review.reviewId}`, payload);
      } else {
        await axios.post('/api/reviews', payload);
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
        <Modal.Title>{isEdit ? 'Update Review' : 'Add Review'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Rating (1-5) *</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={e => setForm({ ...form, rating: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.reviewText}
              onChange={e => setForm({ ...form, reviewText: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : (isEdit ? 'Update' : 'Submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewForm;