
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, LogIn, User as UserIcon, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login, lastUsedEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Form State
  const [identifier, setIdentifier] = useState(''); // Can be email or mobile
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLockedMode, setIsLockedMode] = useState(false);

  // Auto-redirect if session persists
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // "Login Once" Logic: Check for previously used email
  useEffect(() => {
    if (lastUsedEmail && !isAuthenticated) {
      setIdentifier(lastUsedEmail);
      setIsLockedMode(true);
    }
  }, [lastUsedEmail, isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login Logic
    setTimeout(() => {
      login({
        id: 'u1',
        name: 'Sunita Sharma', // Mock Data
        email: identifier.includes('@') ? identifier : 'sunita@example.com',
        phone: identifier.includes('@') ? '+91 9876543210' : identifier,
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        address: 'Jaipur, Rajasthan'
      });
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-saffron flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
            MP
          </div>
          <h2 className="text-3xl font-heading font-bold text-earth">
            {isLockedMode ? 'Welcome Back' : 'Sign In'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLockedMode 
              ? `Continue as ${identifier}` 
              : 'Sign in to Desi Didi Mart ecosystem'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Identifier Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {identifier.includes('@') ? <UserIcon size={20} /> : <Phone size={20} />}
              </div>
              <input
                type="text"
                required
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg outline-none transition-colors ${
                  isLockedMode 
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-saffron focus:border-saffron'
                }`}
                placeholder="Mobile Number or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                readOnly={isLockedMode}
              />
              {isLockedMode && (
                <button 
                  type="button"
                  onClick={() => { setIsLockedMode(false); setIdentifier(''); }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-saffron font-bold hover:underline"
                >
                  Switch Account
                </button>
              )}
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-saffron focus:border-saffron outline-none transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-saffron focus:ring-saffron border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                Keep me logged in
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-saffron hover:text-saffron-600">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            size="lg"
            isLoading={isLoading}
          >
            Sign In <LogIn className="ml-2" size={18} />
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="font-bold text-saffron hover:text-saffron-600">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
