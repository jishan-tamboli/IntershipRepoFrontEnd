import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/reviews') // Assume GET /api/reviews for all (add if needed)
      .then(res => setReviews(res.data))
      .catch(() => alert('Failed to load reviews'));
  }, [refresh]);

  const handleUpdate = () => setRefresh(v => v + 1);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Review Management</h1>
          <p className="text-muted">{reviews.length} reviews</p>
        </Col>
      </Row>

      <Row>
        {reviews.length ? (
          reviews.map(r => (
            <Col md={4} key={r.reviewId} className="mb-4">
              <ReviewCard
                review={r}
                onUpdate={handleUpdate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No reviews yet.</p></Col>
        )}
      </Row>
    </Container>
  );
};

export default ReviewDashboard;