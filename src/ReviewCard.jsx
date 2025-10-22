import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ReviewCard = ({ review, onUpdate }) => {

  const handleApprove = () => {
    axios.patch(`/api/reviews/${review.reviewId}/approve`)
      .then(() => onUpdate())
      .catch(() => alert('Failed to approve'));
  };

  const handleReject = () => {
    axios.patch(`/api/reviews/${review.reviewId}/reject`)
      .then(() => onUpdate())
      .catch(() => alert('Failed to reject'));
  };

  const handleDelete = () => {
    if (window.confirm('Delete review?')) {
      axios.delete(`/api/reviews/${review.reviewId}`)
        .then(() => onUpdate())
        .catch(() => alert('Failed to delete'));
    }
  };

  return (
    <Card className="category-card h-100">
      <Card.Body>
        <Card.Title>Review #{review.reviewId}</Card.Title>
        <Card.Text>Product ID: {review.productId}</Card.Text>
        <Card.Text>Customer ID: {review.customerId}</Card.Text>
        <Card.Text>Rating: {review.rating} stars</Card.Text>
        <Card.Text>Text: {review.reviewText}</Card.Text>
        <Card.Text>Status: {review.status ? 'Approved' : 'Pending/Rejected'}</Card.Text>
        <div className="mt-2">
          <Button variant="success" size="sm" className="me-2" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="warning" size="sm" className="me-2" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;