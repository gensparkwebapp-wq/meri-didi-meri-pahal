
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut, Edit, Camera, Grid, Plus, Trash2, Home, Briefcase, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { fileToBase64 } from '../utils/imageUtils';

const mockOrders: Order[] = [
  { id: '#ORD-8932', date: '12 Oct 2023', total: 1450, status: 'Delivered', items: 3 },
  { id: '#ORD-8931', date: '05 Oct 2023', total: 850, status: 'Processing', items: 2 },
  { id: '#ORD-8810', date: '20 Sep 2023', total: 2100, status: 'Delivered', items: 5 },
];

const mockAddresses = [
  { id: 1, type: 'Home', name: 'Sunita Sharma', phone: '+91 98765 43210', address: '123, Adarsh Nagar, Jaipur, Rajasthan - 302004', isDefault: true },
  { id: 2, type: 'Work', name: 'Sunita Sharma', phone: '+91 98765 43210', address: 'Office 405, World Trade Park, Malviya Nagar, Jaipur - 302017', isDefault: false }
];

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
  };

  // Handle Photo Upload Logic
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setIsUploading(true);
          try {
              // Convert file to Base64 string to save in localStorage/Context
              const base64 = await fileToBase64(file);
              updateProfile({ avatar: base64 });
          } catch (error) {
              console.error("Error uploading profile photo:", error);
              alert("Failed to upload photo. Please try again.");
          } finally {
              setIsUploading(false);
          }
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Profile Header */}
      <div className="bg-earth text-white pt-12 pb-24 relative overflow-hidden">
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
               <div className="relative group">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-28 h-28 rounded-full border-4 border-white/30 shadow-xl object-cover bg-white"
                  />
                  {/* File Input hidden inside Label */}
                  <label className={`absolute bottom-1 right-1 bg-saffron p-2 rounded-full text-white hover:bg-saffron-600 transition-colors shadow-md cursor-pointer ${isUploading ? 'opacity-75 cursor-wait' : ''}`}>
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      disabled={isUploading}
                    />
                  </label>
               </div>
               <div className="text-center md:text-left">
                  <h1 className="text-3xl font-heading font-bold">{user.name}</h1>
                  <p className="text-white/80 flex items-center justify-center md:justify-start gap-2 mt-1">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm capitalize">{user.role}</span>
                    <span>•</span>
                    <span>{user.phone}</span>
                  </p>
                  <p className="text-sm text-white/60 mt-1">{user.address}</p>
               </div>
            </div>
         </div>
         {/* Decorative Circle */}
         <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Nav */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
               <nav className="flex flex-col">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'overview' ? 'bg-saffron-50 text-saffron border-saffron' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid size={20} /> Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'orders' ? 'bg-saffron-50 text-saffron border-saffron' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Package size={20} /> My Orders
                  </button>
                  <button 
                    onClick={() => setActiveTab('addresses')}
                    className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'addresses' ? 'bg-saffron-50 text-saffron border-saffron' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                  >
                    <MapPin size={20} /> Saved Addresses
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'settings' ? 'bg-saffron-50 text-saffron border-saffron' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Settings size={20} /> Profile Settings
                  </button>
                  <div className="border-t border-gray-100 mt-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                  </div>
               </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-3/4">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {/* Stats Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div 
                      onClick={() => setActiveTab('orders')}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                             <Package size={24} />
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Total Orders</p>
                             <h3 className="text-2xl font-bold text-gray-900">12</h3>
                          </div>
                       </div>
                    </div>
                    <div 
                      onClick={() => setActiveTab('addresses')}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                             <MapPin size={24} />
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Saved Addresses</p>
                             <h3 className="text-2xl font-bold text-gray-900">{mockAddresses.length}</h3>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                             <User size={24} />
                          </div>
                          <div>
                             <p className="text-sm text-gray-500">Membership</p>
                             <h3 className="text-lg font-bold text-gray-900">Active</h3>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Recent Activity */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-sm text-gray-500">
                                    <th className="pb-3 font-medium">Order ID</th>
                                    <th className="pb-3 font-medium">Date</th>
                                    <th className="pb-3 font-medium">Items</th>
                                    <th className="pb-3 font-medium">Total</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {mockOrders.slice(0,2).map(order => (
                                    <tr key={order.id} className="group">
                                        <td className="py-4 font-medium text-gray-900">{order.id}</td>
                                        <td className="py-4 text-gray-600">{order.date}</td>
                                        <td className="py-4 text-gray-600">{order.items} Items</td>
                                        <td className="py-4 font-bold text-gray-900">₹{order.total}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => setActiveTab('orders')} className="w-full mt-4 text-saffron font-medium hover:underline text-sm text-center">
                            View All Orders
                        </button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'orders' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">My Order History</h3>
                    <div className="space-y-4">
                        {mockOrders.map(order => (
                            <div key={order.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-wrap justify-between items-center mb-4">
                                    <div>
                                        <span className="font-bold text-gray-900">{order.id}</span>
                                        <span className="text-gray-400 mx-2">•</span>
                                        <span className="text-gray-500 text-sm">{order.date}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-600">
                                        {order.items} Items in this order
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Total Amount</p>
                                        <p className="text-xl font-bold text-earth">₹{order.total}</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                                    <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                                    <Button size="sm" variant="primary" className="flex-1">Track Order</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'addresses' && (
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-heading font-bold text-gray-900">My Addresses</h3>
                     <Button variant="primary" size="sm" className="flex items-center gap-2">
                        <Plus size={16} /> Add New Address
                     </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     {mockAddresses.map((addr) => (
                        <div key={addr.id} className="border border-gray-200 rounded-xl p-5 hover:border-saffron transition-colors relative group">
                           {addr.isDefault && (
                              <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                                 Default
                              </div>
                           )}
                           <div className="flex items-center gap-2 mb-3">
                              {addr.type === 'Home' ? <Home size={18} className="text-gray-400" /> : <Briefcase size={18} className="text-gray-400" />}
                              <span className="font-bold text-gray-900 uppercase text-sm tracking-wide">{addr.type}</span>
                           </div>
                           
                           <h4 className="font-bold text-gray-900 text-sm">{addr.name}</h4>
                           <p className="text-gray-500 text-sm mb-1">{addr.phone}</p>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4 h-10 line-clamp-2">
                              {addr.address}
                           </p>

                           <div className="flex gap-3 pt-3 border-t border-gray-50">
                              <button className="flex-1 text-sm font-medium text-saffron hover:text-saffron-600">Edit</button>
                              <div className="w-px bg-gray-200"></div>
                              <button className="flex-1 text-sm font-medium text-red-400 hover:text-red-600">Delete</button>
                           </div>
                        </div>
                     ))}
                     
                     {/* Add New Placeholder */}
                     <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-saffron hover:text-saffron hover:bg-saffron-50 transition-all cursor-pointer min-h-[200px]">
                        <Plus size={32} className="mb-2" />
                        <span className="font-medium">Add Another Address</span>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'settings' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-heading font-bold text-gray-900">Profile Settings</h3>
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="text-saffron hover:text-saffron-600 font-medium flex items-center gap-1"
                            >
                                <Edit size={16} /> Edit Profile
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input 
                                    type="tel" 
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Default Address</label>
                                <input 
                                    type="text" 
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" variant="primary">Save Changes</Button>
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </div>
                        )}
                    </form>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
