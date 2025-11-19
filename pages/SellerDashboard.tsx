import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, TrendingUp, Plus, Upload, DollarSign, 
  Download, Eye, EyeOff, Edit2, Trash2, Search, Filter, Save, X, BarChart3
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Product } from '../types';

// Mock Data for Seller's Products
const initialSellerProducts: Product[] = [
  {
    id: '1',
    name: 'Pure Desi Cow Ghee',
    category: 'Home-made Food Items',
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    rating: 4.8,
    reviews: 124,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    isVisible: true
  },
  {
    id: '2',
    name: 'Homemade Mango Pickle',
    category: 'Household Items',
    price: 250,
    originalPrice: 300,
    discount: 16,
    rating: 4.9,
    reviews: 89,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1589135233689-d536d328b68a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 42,
    isVisible: true
  },
  {
    id: '3',
    name: 'Cotton Saree - Handloom',
    category: 'Textiles',
    price: 850,
    originalPrice: 1200,
    discount: 29,
    rating: 4.5,
    reviews: 12,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    stock: 0,
    isVisible: false
  }
];

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'earnings'>('overview');
  const [products, setProducts] = useState<Product[]>(initialSellerProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Household Items',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: null as File | null
  });

  // Toggle Visibility
  const toggleVisibility = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isVisible: !p.isVisible } : p
    ));
  };

  // Update Stock
  const updateStock = (id: string, newStock: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  // Handle Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      discount: Math.round(((Number(newProduct.originalPrice) - Number(newProduct.price)) / Number(newProduct.originalPrice)) * 100),
      rating: 0,
      reviews: 0,
      isOrganic: true,
      image: 'https://images.unsplash.com/photo-1596450533115-53002f2224f8?q=80&w=800&auto=format&fit=crop', // Placeholder
      stock: Number(newProduct.stock),
      isVisible: true,
      description: newProduct.description
    };
    setProducts([...products, product]);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', category: 'Household Items', price: '', originalPrice: '', stock: '', description: '', image: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
           <h1 className="text-xl font-heading font-bold text-earth flex items-center gap-2">
              <LayoutDashboard className="text-saffron" /> Seller Dashboard
           </h1>
           <div className="flex gap-4 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-5 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-saffron text-saffron' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={`px-3 py-5 border-b-2 transition-colors ${activeTab === 'products' ? 'border-saffron text-saffron' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                My Products
              </button>
              <button 
                onClick={() => setActiveTab('earnings')}
                className={`px-3 py-5 border-b-2 transition-colors ${activeTab === 'earnings' ? 'border-saffron text-saffron' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Earnings & Reports
              </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                         <DollarSign size={24} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12% vs last month</span>
                   </div>
                   <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
                   <h3 className="text-3xl font-bold text-gray-900">₹24,500</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                         <Package size={24} />
                      </div>
                   </div>
                   <p className="text-gray-500 text-sm mb-1">Total Products</p>
                   <h3 className="text-3xl font-bold text-gray-900">{products.length}</h3>
                   <p className="text-xs text-gray-400 mt-1">{products.filter(p => p.isVisible).length} Active Listing</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-saffron-50 text-saffron rounded-lg">
                         <TrendingUp size={24} />
                      </div>
                      <span className="text-xs font-bold text-saffron bg-saffron-50 px-2 py-1 rounded">High Demand</span>
                   </div>
                   <p className="text-gray-500 text-sm mb-1">Orders Pending</p>
                   <h3 className="text-3xl font-bold text-gray-900">8</h3>
                </div>
             </div>

             {/* Quick Actions */}
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-earth to-earth-800 rounded-xl p-8 text-white shadow-lg">
                   <h3 className="text-xl font-bold mb-2">Upload New Product</h3>
                   <p className="text-white/80 mb-6 text-sm">Add a new item to your catalog. Ensure you have good lighting photos.</p>
                   <Button onClick={() => { setActiveTab('products'); setIsAddModalOpen(true); }} variant="primary" className="bg-white text-earth hover:bg-gray-100 border-none">
                      <Plus size={18} className="mr-2" /> Add Product
                   </Button>
                </div>
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Report</h3>
                   <p className="text-gray-500 mb-6 text-sm">Download your monthly sales summary and tax invoice details.</p>
                   <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                      <Download size={18} className="mr-2" /> Download PDF
                   </Button>
                </div>
             </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-96">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search your products..." 
                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                   />
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
                   <Plus size={18} className="mr-2" /> Upload Product
                </Button>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                         <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product Info</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Visibility</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                     <div>
                                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.category}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <div className="text-sm">
                                     <span className="font-bold text-gray-900">₹{product.price}</span>
                                     <span className="text-xs text-gray-400 block line-through">₹{product.originalPrice}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                     <input 
                                       type="number" 
                                       className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm outline-none focus:border-saffron"
                                       value={product.stock || 0}
                                       onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                                     />
                                     <span className={`text-xs font-medium ${
                                        (product.stock || 0) > 10 ? 'text-green-600' : 
                                        (product.stock || 0) > 0 ? 'text-yellow-600' : 'text-red-600'
                                     }`}>
                                        {(product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                                     </span>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <button 
                                    onClick={() => toggleVisibility(product.id)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                       product.isVisible 
                                       ? 'bg-green-50 text-green-700 border border-green-200' 
                                       : 'bg-gray-100 text-gray-500 border border-gray-200'
                                    }`}
                                  >
                                     {product.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                                     {product.isVisible ? 'Active' : 'Hidden'}
                                  </button>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     <button className="p-2 text-gray-400 hover:text-saffron hover:bg-saffron-50 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                     </button>
                                     <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                     </button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && (
           <div className="animate-in fade-in duration-500">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Earnings Summary</h2>
                    <Button variant="outline" size="sm">
                       <Filter size={14} className="mr-2" /> Last 30 Days
                    </Button>
                 </div>
                 
                 {/* Simple Bar Chart Visualization using CSS Grid */}
                 <div className="h-64 flex items-end justify-between gap-2 md:gap-4 pb-4 border-b border-gray-100">
                    {[35, 45, 30, 60, 75, 50, 80, 65, 55, 70, 90, 85].map((height, i) => (
                       <div key={i} className="w-full bg-gray-50 rounded-t-md relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-saffron/80 rounded-t-md transition-all group-hover:bg-saffron" 
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                             ₹{height * 100}
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="flex justify-between text-xs text-gray-400 mt-2 uppercase">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    <button className="text-saffron text-sm font-medium hover:underline">View All</button>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {[
                       { id: '#TRX-9882', date: 'Oct 24, 2023', product: 'Pure Desi Cow Ghee', amount: 1200, status: 'Completed' },
                       { id: '#TRX-9881', date: 'Oct 22, 2023', product: 'Cotton Saree', amount: 850, status: 'Completed' },
                       { id: '#TRX-9879', date: 'Oct 20, 2023', product: 'Homemade Mango Pickle', amount: 250, status: 'Processing' },
                       { id: '#TRX-9875', date: 'Oct 18, 2023', product: 'Herbal Hair Oil', amount: 280, status: 'Completed' },
                    ].map((trx, i) => (
                       <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-full ${trx.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {trx.status === 'Completed' ? <CheckCircle size={16} /> : <TrendingUp size={16} />}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-900">{trx.product}</p>
                                <p className="text-xs text-gray-500">{trx.id} • {trx.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-bold text-gray-900">+₹{trx.amount}</p>
                             <p className={`text-xs font-medium ${trx.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{trx.status}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="p-6 bg-gray-50 border-t border-gray-200 text-center">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-white">
                       <Download size={16} className="mr-2" /> Download Transaction Report
                    </Button>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
               <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center gap-2">
                     <Upload size={20} className="text-saffron" /> Upload New Product
                  </h2>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                     <X size={24} />
                  </button>
               </div>
               
               <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                  {/* Image Upload */}
                  <div className="flex justify-center">
                     <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-saffron hover:text-saffron hover:bg-saffron-50 transition-colors cursor-pointer relative">
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.files?.[0] || null})}
                        />
                        {newProduct.image ? (
                           <div className="text-center">
                              <Package size={32} className="mx-auto mb-2 text-saffron" />
                              <span className="text-sm font-medium text-gray-900">{newProduct.image.name}</span>
                           </div>
                        ) : (
                           <>
                              <Upload size={32} className="mb-2" />
                              <span className="text-sm font-medium">Click to upload product image</span>
                              <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
                           </>
                        )}
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Product Name</label>
                        <input 
                           required
                           type="text" 
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="e.g. Handmade Pickle"
                           value={newProduct.name}
                           onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select 
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                           value={newProduct.category}
                           onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        >
                           <option>Household Items</option>
                           <option>Handicrafts</option>
                           <option>Textiles</option>
                           <option>Herbal Products</option>
                           <option>Home-made Food Items</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Selling Price (₹)</label>
                        <input 
                           required
                           type="number" 
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="0"
                           value={newProduct.price}
                           onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">MRP / Original Price (₹)</label>
                        <input 
                           type="number" 
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="0"
                           value={newProduct.originalPrice}
                           onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Initial Stock</label>
                        <input 
                           required
                           type="number" 
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="Quantity"
                           value={newProduct.stock}
                           onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-sm font-medium text-gray-700">Description</label>
                     <textarea 
                        required
                        rows={4} 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none resize-none"
                        placeholder="Describe your product..."
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                     ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                     <Button type="submit" variant="primary" className="flex-1">
                        <Save size={18} className="mr-2" /> Save & Publish
                     </Button>
                     <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                        Cancel
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

// Helper icon component
function CheckCircle({ size = 24, className = "" }: { size?: number, className?: string }) {
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg" 
         width={size} 
         height={size} 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="2" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className={className}
      >
         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
         <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
   );
}

export default SellerDashboard;
