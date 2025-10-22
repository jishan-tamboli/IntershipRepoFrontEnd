import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/products/active')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, [refresh]);

  const handleCreate = () => setShowForm(true);
  const handleUpdate = () => setRefresh(v => v + 1);
  const handleDeactivate = async (id) => {
    await axios.patch(`/api/products/${id}/deactivate`);
    setRefresh(v => v + 1);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Product Management</h1>
          <p className="text-muted">{products.length} active products</p>
          <Button variant="success" onClick={handleCreate}>Add New Product</Button>
        </Col>
      </Row>

      <Row>
        {products.length ? (
          products.map(p => (
            <Col md={4} key={p.productId} className="mb-4">
              <ProductCard
                product={p}
                onUpdate={handleUpdate}
                onDeactivate={handleDeactivate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No products yet. Add one!</p></Col>
        )}
      </Row>

      <ProductForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleUpdate}
      />
    </Container>
  );
};

export default ProductDashboard;