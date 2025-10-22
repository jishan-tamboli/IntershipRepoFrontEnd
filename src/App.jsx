import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import ProductDashboard from './ProductDashboard';
import OrderDashboard from './OrderDashboard';
import CustomerDashboard from './CustomerDashboard';
import PaymentDashboard from './PaymentDashboard';
import CartDashboard from './CartDashboard';
import WishlistDashboard from './WishlistDashboard';
import ShippingDashboard from './ShippingDashboard';
import ReviewDashboard from './ReviewDashboard';
import CouponDashboard from './CouponDashboard'; // NEW
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductDashboard />} />
            <Route path="/orders" element={<OrderDashboard />} />
            <Route path="/customers" element={<CustomerDashboard />} />
            <Route path="/payments" element={<PaymentDashboard />} />
            <Route path="/cart" element={<CartDashboard />} />
            <Route path="/wishlist" element={<WishlistDashboard />} />
            <Route path="/shipping" element={<ShippingDashboard />} />
            <Route path="/reviews" element={<ReviewDashboard />} />
            <Route path="/coupons" element={<CouponDashboard />} /> // NEW
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;