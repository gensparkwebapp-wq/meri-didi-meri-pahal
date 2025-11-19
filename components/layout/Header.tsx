import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User as UserIcon, Heart, ChevronDown, LogOut, Settings, ShoppingBag, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Desi Didi Mart', path: '/shop' },
    { label: 'SHG Directory', path: '/shg-directory' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Coordinators', path: '/coordinators' },
    { label: 'Franchise', path: '/franchise' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-cream-50 py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-saffron to-earth flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-white">
              MP
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-earth leading-none">Meri Didi</span>
              <span className="text-xs text-saffron font-bold tracking-wider uppercase">Meri Pehal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-saffron ${
                  location.pathname === item.path ? 'text-saffron font-bold border-b-2 border-saffron' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-saffron transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-gray-600 hover:text-saffron transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white font-bold animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-saffron transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-saffron text-white font-bold animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Auth Logic */}
            {user ? (
              <div className="relative ml-2" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2">
                    <div className="p-4 bg-cream-50 border-b border-gray-100">
                      <p className="font-bold text-earth truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      {/* Admin Link */}
                       <Link 
                        to="/admin-dashboard" 
                        className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-white bg-earth hover:bg-earth-800 rounded-lg mb-1"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <ShieldCheck size={16} /> Admin Panel
                      </Link>

                      {/* Seller Dashboard Link */}
                      <Link 
                        to="/seller-dashboard" 
                        className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-saffron bg-saffron-50 hover:bg-saffron-100 rounded-lg mb-1"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard size={16} /> Seller Dashboard
                      </Link>
                      
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} /> Profile Settings
                      </Link>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <ShoppingBag size={16} /> My Orders
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Heart size={16} /> My Wishlist
                      </Link>
                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" className="ml-2">
                  <UserIcon size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-saffron-50 text-saffron'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
             <Link
                to="/cart"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <ShoppingCart size={20} /> My Cart ({cartCount})
              </Link>
             <Link
                to="/wishlist"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <Heart size={20} /> My Wishlist ({wishlist.length})
              </Link>
            <div className="border-t pt-4 flex flex-col gap-3">
              {user ? (
                <>
                   <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <div>
                         <p className="font-bold text-gray-900">{user.name}</p>
                         <p className="text-xs text-gray-500">View Profile</p>
                      </div>
                   </Link>
                   <Link to="/admin-dashboard" className="flex items-center gap-2 px-4 py-3 text-white bg-earth rounded-lg">
                      <ShieldCheck size={18} /> Admin Panel
                   </Link>
                   <Link to="/seller-dashboard" className="flex items-center gap-2 px-4 py-3 text-saffron font-bold hover:bg-saffron-50 rounded-lg">
                      <LayoutDashboard size={18} /> Seller Dashboard
                   </Link>
                   <Button variant="outline" className="w-full justify-center text-red-500 border-red-200" onClick={logout}>
                      Sign Out
                   </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full justify-center">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button variant="primary" className="w-full justify-center">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;