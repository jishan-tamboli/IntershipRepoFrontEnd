import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import WishlistItemCard from './WishlistItemCard';

const WishlistDashboard = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const customerId = 1; // Demo; replace with auth

  useEffect(() => {
    axios.get(`/api/wishlists/customer/${customerId}`)
      .then(res => setWishlistItems(res.data))
      .catch(() => alert('Failed to load wishlist'));
  }, [refresh]);

  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Wishlist Management</h1>
          <p className="text-muted">{wishlistItems.length} items in wishlist</p>
        </Col>
      </Row>

      <Row>
        {wishlistItems.length ? (
          wishlistItems.map(w => (
            <Col md={4} key={w.wishlistId} className="mb-4">
              <WishlistItemCard
                wishlistItem={w}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">Wishlist is empty.</p></Col>
        )}
      </Row>
    </Container>
  );
};

export default WishlistDashboard;