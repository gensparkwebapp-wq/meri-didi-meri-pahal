import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock Admin Login
    setTimeout(() => {
      if (email === 'admin@merididi.org' && password === 'admin123') {
         login({
            id: 'admin1',
            name: 'Super Admin',
            email: email,
            phone: '+91 00000 00000',
            role: 'Admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff',
            address: 'Head Office, Jaipur'
         });
         navigate('/admin-dashboard');
      } else {
         alert('Invalid Credentials. Use admin@merididi.org / admin123');
         setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
         <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-earth-800 blur-3xl"></div>
         <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-saffron blur-3xl"></div>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border-t-4 border-earth">
        <div className="text-center mb-8">
           <div className="w-20 h-20 bg-earth text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck size={40} />
           </div>
           <h1 className="text-2xl font-heading font-bold text-gray-900">Admin Portal</h1>
           <p className="text-sm text-gray-500 mt-2">Meri Didi - Meri Pehal Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Admin ID</label>
              <div className="relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                   type="email" 
                   className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-earth outline-none transition-all font-medium"
                   placeholder="admin@merididi.org"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                   type="password" 
                   className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-earth outline-none transition-all font-medium"
                   placeholder="••••••••"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
              </div>
           </div>

           <Button 
             type="submit" 
             variant="earth" 
             className="w-full py-3 text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
             isLoading={isLoading}
           >
             Access Dashboard <ArrowRight size={18} className="ml-2" />
           </Button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">
              Authorized personnel only. <br/> All activities are monitored and logged.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;