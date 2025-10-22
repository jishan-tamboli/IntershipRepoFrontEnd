import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CartItemCard from './CartItemCard';

const CartDashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const customerId = 1; 

  useEffect(() => {
    axios.get(`/api/carts/customer/${customerId}`)
      .then(res => setCartItems(res.data))
      .catch(() => alert('Failed to load cart'));
  }, [refresh]);

  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Cart Management</h1>
          <p className="text-muted">{cartItems.length} items in cart</p>
        </Col>
      </Row>

      <Row>
        {cartItems.length ? (
          cartItems.map(c => (
            <Col md={4} key={c.cartId} className="mb-4">
              <CartItemCard
                cartItem={c}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">Cart is empty.</p></Col>
        )}
      </Row>
    </Container>
  );
};

export default CartDashboard;