import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const WishlistItemCard = ({ wishlistItem, onUpdate }) => {

  const handleRemove = () => {
    if (window.confirm('Remove from wishlist?')) {
      axios.delete(`/api/wishlists/${wishlistItem.wishlistId}`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to remove'));
    }
  };

  const handleMoveToCart = () => {
    axios.post('/api/carts', { customerId: wishlistItem.customerId, productId: wishlistItem.productId, quantity: 1 })
      .then(() => {
        axios.delete(`/api/wishlists/${wishlistItem.wishlistId}`);
        onUpdate();
      })
      .catch(() => alert('Failed to move to cart'));
  };

  return (
    <Card className="category-card h-100">
      <Card.Body>
        <Card.Title>Product ID: {wishlistItem.productId}</Card.Title>
        <div className="mt-2">
          <Button variant="primary" size="sm" className="me-2" onClick={handleMoveToCart}>
            Move to Cart
          </Button>
          <Button variant="danger" size="sm" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WishlistItemCard;