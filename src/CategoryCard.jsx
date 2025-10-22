import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import CategoryForm from './CategoryForm'; // For edit modal


 import ElectronicsImg from './assets/Elect.webp';
 import ClothingImg from './assets/boutique.webp';
 import BooksImg from './assets/Books.webp';
 import HomeGardenImg from './assets/Garden.webp';
import SportsImg from './assets/Sports.webp';

const CategoryCard = ({ category, onUpdate, onDeactivate }) => {
  const [showEdit, setShowEdit] = useState(false);


  const getImageUrl = (name) => {
    const images = {
      'Electronics': ElectronicsImg,
      'Clothing': ClothingImg,
      'Books': BooksImg,
      'Home & Garden': HomeGardenImg,
      'Sports': SportsImg
    };
    return images[name] || 'https://source.unsplash.com/300x200/?category'; // Fallback
  };

  const handleDeactivate = () => {
    if (window.confirm('Deactivate this category? Reassign products first if any.')) {
      onDeactivate(category.categoryId);
    }
  };

  return (
    <>
      <Card className="category-card h-100">
        <Card.Img variant="top" src={getImageUrl(category.categoryName)} className="category-image" alt={category.categoryName} />
        <Card.Body>
          <Card.Title>{category.categoryName}</Card.Title>
          <Card.Text>{category.description}</Card.Text>
          <Badge className="stats-badge">Products: 0</Badge> {/* Placeholder—fetch real count later */}
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" className="btn-deactivate" onClick={handleDeactivate}>
              Deactivate
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <CategoryForm
        show={showEdit}
        onHide={() => setShowEdit(false)}
        category={category}
        onSave={onUpdate}
      />
    </>
  );
};

export default CategoryCard;