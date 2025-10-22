import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ show, onHide, category = null, onSave }) => {
  const [formData, setFormData] = useState({ categoryName: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({ categoryName: category.categoryName, description: category.description });
    } else {
      setFormData({ categoryName: '', description: '' });
    }
  }, [category]);

  const validate = () => {
    const newErrors = {};
    if (!formData.categoryName.trim()) newErrors.categoryName = 'Name is required';
    if (formData.categoryName.trim().length < 3) newErrors.categoryName = 'Name must be at least 3 chars';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { ...formData };
      if (category) {
        // Update
        await axios.put(`/api/categories/${category.categoryId}`, payload);
      } else {
        // Create
        await axios.post('/api/categories', payload);
      }
      onSave(); // Refresh dashboard
      onHide();
    } catch (error) {
      // Handle 400s (e.g., duplicate)
      if (error.response?.status === 400) {
        setErrors({ general: 'Category name already exists or invalid input' });
      } else {
        setErrors({ general: 'Server error—try again' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{category ? 'Edit Category' : 'Add New Category'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              isInvalid={!!errors.categoryName}
            />
            <Form.Control.Feedback type="invalid">{errors.categoryName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : (category ? 'Update' : 'Create')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryForm;