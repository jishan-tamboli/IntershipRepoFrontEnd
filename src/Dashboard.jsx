import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0); // Trigger refresh

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories/dashboard');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    }
  };

  const handleCreate = () => setShowForm(true);

  const handleUpdate = () => {
    setRefresh(prev => prev + 1); // Refresh list
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`/api/categories/${id}/deactivate`);
      setRefresh(prev => prev + 1); // Refresh
      alert('Category deactivated');
    } catch (error) {
      console.error('Deactivate error:', error);
      alert('Failed to deactivate');
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Category Dashboard</h1>
          <p className="text-muted">Manage your product categories ({categories.length} active)</p>
          <Button variant="success" onClick={handleCreate}>Add New Category</Button>
        </Col>
      </Row>
      <Row>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Col md={4} key={category.categoryId} className="mb-4">
              <CategoryCard
                category={category}
                onUpdate={handleUpdate}
                onDeactivate={handleDeactivate}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No active categories. Add one to get started!</p>
          </Col>
        )}
      </Row>

      <CategoryForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={() => setRefresh(prev => prev + 1)}
      />
    </Container>
  );
};

export default Dashboard;