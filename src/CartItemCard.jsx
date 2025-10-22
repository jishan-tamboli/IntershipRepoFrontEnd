import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const CartItemCard = ({ cartItem, onUpdate }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleUpdate = () => {
    axios.put(`/api/carts/${cartItem.cartId}`, { quantity })
      .then(() => onUpdate())
      .catch(() => alert('Failed to update'));
  };

  const handleRemove = () => {
    if (window.confirm('Remove from cart?')) {
      axios.delete(`/api/carts/${cartItem.cartId}`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to remove'));
    }
  };

  return (
    <Card className="category-card h-100">
      <Card.Body>
        <Card.Title>Product ID: {cartItem.productId}</Card.Title>
        <Card.Text>Quantity: <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} /></Card.Text>
        <Card.Text>Total: ${cartItem.totalPrice}</Card.Text>
        <div className="mt-2">
          <Button variant="primary" size="sm" className="me-2" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="danger" size="sm" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartItemCard;