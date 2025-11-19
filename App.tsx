import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Directors from './pages/Directors';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Coordinators from './pages/Coordinators';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Franchise from './pages/Franchise';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Gallery from './pages/Gallery';
import SHGDirectory from './pages/SHGDirectory';
import SHGRegister from './pages/SHGRegister';
import SHGDetails from './pages/SHGDetails';

const App: React.FC = () => {
  // Initialize Push Notifications Mock Permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      // Simulate requesting permission after a delay to not block initial render
      setTimeout(() => {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
             if (permission === 'granted') {
                console.log("Push Notifications Enabled for Desi Didi Mart!");
                // Here we would typically get the FCM token and save to DB
             }
          });
        }
      }, 3000);
    }
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="directors" element={<Directors />} />
                <Route path="contact" element={<Contact />} />
                <Route path="shop" element={<Shop />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="coordinators" element={<Coordinators />} />
                <Route path="shg-directory" element={<SHGDirectory />} />
                <Route path="shg/register" element={<SHGRegister />} />
                <Route path="shg/:id" element={<SHGDetails />} />
                <Route path="franchise" element={<Franchise />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cart" element={<Cart />} />
                <Route path="seller-dashboard" element={<SellerDashboard />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="admin" element={<AdminLogin />} />
              </Route>
            </Routes>
          </HashRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;