import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios'; // Added import for axios
import ProductForm from './ProductForm';
import ReviewForm from './ReviewForm'; // Added import for ReviewForm

const ProductCard = ({ product, onUpdate, onDeactivate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showReview, setShowReview] = useState(false); // Added state for review form

  const img = product.imageUrl
    ? product.imageUrl
    : `https://source.unsplash.com/300x200/?${encodeURIComponent(product.productName)}`;

  const handleDeactivate = () => {
    if (window.confirm('Deactivate this product?')) {
      onDeactivate(product.productId);
    }
  };

  return (
    <>
      <Card className="category-card h-100">
        <Card.Img variant="top" src={img} className="category-image" alt={product.productName} />
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Badge bg="success" className="mb-2">${product.price}</Badge>{' '}
          <Badge bg="info">Stock: {product.stockQuantity}</Badge>
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" className="me-2" onClick={handleDeactivate}>
              Deactivate
            </Button>
            <Button className="me-2" onClick={() => axios.post('/api/carts', { customerId: 1, productId: product.productId, quantity: 1 }).then(onUpdate)}>Add to Cart</Button>
            <Button className="me-2" onClick={() => axios.post('/api/wishlists', { customerId: 1, productId: product.productId }).then(onUpdate)}>Add to Wishlist</Button>
            <Button onClick={() => setShowReview(true)}>Add Review</Button>
          </div>
        </Card.Body>
      </Card>

      <ProductForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        product={product}
        onSave={onUpdate}
      />

      <ReviewForm
        show={showReview}
        onHide={() => setShowReview(false)}
        productId={product.productId}
        onSave={onUpdate}
      />
    </>
  );
};

export default ProductCard;