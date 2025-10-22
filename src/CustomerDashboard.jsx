import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import CustomerCard from './CustomerCard';
import CustomerForm from './CustomerForm';

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get('/api/customers/active')
      .then(res => setCustomers(res.data))
      .catch(() => alert('Failed to load customers'));
  }, [refresh]);

  const handleCreate = () => setShowForm(true);
  const handleUpdate = () => setRefresh(v => v + 1);
  const handleDeactivate = async (id) => {
    await axios.patch(`/api/customers/${id}/deactivate`);
    setRefresh(v => v + 1);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Customer Management</h1>
          <p className="text-muted">{customers.length} active customers</p>
          <Button variant="success" onClick={handleCreate}>Add New Customer</Button>
        </Col>
      </Row>

      <Row>
        {customers.length ? (
          customers.map(c => (
            <Col md={4} key={c.userId} className="mb-4">
              <CustomerCard
                customer={c}
                onUpdate={handleUpdate}
                onDeactivate={handleDeactivate}
              />
            </Col>
          ))
        ) : (
          <Col><p className="text-center">No customers yet. Add one!</p></Col>
        )}
      </Row>

      <CustomerForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleUpdate}
      />
    </Container>
  );
};

export default CustomerDashboard;