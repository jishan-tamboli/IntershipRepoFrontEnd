import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ show, onHide, product = null, onSave }) => {
  const isEdit = !!product;

  const [form, setForm] = useState({
    productName: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    categoryId: ''  // CHANGED: Use flat categoryId in form state for simplicity
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load categories for dropdown
  useEffect(() => {
    axios.get('/api/categories/dashboard')
      .then(res => setCategories(res.data))
      .catch(() => setError('Failed to load categories'));
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stockQuantity: product.stockQuantity?.toString() || '',
        imageUrl: product.imageUrl || '',
        categoryId: product.category?.categoryId?.toString() || ''  // CHANGED: Use flat categoryId
      });
    } else {
      setForm({
        productName: '',
        description: '',
        price: '',
        stockQuantity: '',
        imageUrl: '',
        categoryId: ''
      });
    }
  }, [product]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      productName: form.productName,
      description: form.description,
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity, 10),
      imageUrl: form.imageUrl || null,
      categoryId: parseInt(form.categoryId, 10)  // CHANGED: Send flat "categoryId"
    };

    try {
      if (isEdit) {
        await axios.put(`/api/products/${product.productId}`, payload);
      } else {
        await axios.post('/api/products', payload);
      }
      onSave();   // refresh list
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
        <Modal.Title>{isEdit ? 'Edit Product' : 'Add New Product'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              value={form.productName}
              onChange={e => setForm({ ...form, productName: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock Quantity *</Form.Label>
            <Form.Control
              type="number"
              value={form.stockQuantity}
              onChange={e => setForm({ ...form, stockQuantity: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL (optional)</Form.Label>
            <Form.Control
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <Form.Select
              value={form.categoryId}  // CHANGED: Use flat categoryId
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">-- Select --</option>
              {categories.map(c => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </Form.Select>
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

export default ProductForm;