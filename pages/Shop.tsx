import React, { useState } from 'react';
import { ShoppingBag, Filter, Star, ShoppingCart, Heart, X, User, Send, CheckCircle, Search, ChevronDown, Share2, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { Product, Review } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// Mock Products with detailed info and reviews
const mockProductsData: Product[] = [
  {
    id: '1',
    name: 'Pure Desi Cow Ghee',
    category: 'Home-made Food Items', // Ghee is food
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    rating: 4.8,
    reviews: 124,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Our Pure Desi Cow Ghee is made using the traditional Bilona method from the milk of free-grazing indigenous cows. It has a rich aroma, granular texture, and is packed with essential nutrients.',
    sellerName: 'Kamla Devi',
    sellerDistrict: 'Bikaner, Rajasthan',
    reviewList: [
      { id: 'r1', userName: 'Riya S.', rating: 5, comment: 'Absolutely authentic taste! Reminds me of my grandmother\'s home.', date: '10 Oct 2023' },
      { id: 'r2', userName: 'Amit K.', rating: 4, comment: 'Great quality, but shipping took a bit longer than expected.', date: '05 Oct 2023' }
    ]
  },
  {
    id: '2',
    name: 'Homemade Mango Pickle',
    category: 'Household Items', // Pickles listed under Household Items
    price: 250,
    originalPrice: 300,
    discount: 16,
    rating: 4.9,
    reviews: 89,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1589135233689-d536d328b68a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted with raw mangoes and traditional spices, preserved in cold-pressed mustard oil. No artificial preservatives, just pure nostalgic taste.',
    sellerName: 'Sunita Meena',
    sellerDistrict: 'Jaipur, Rajasthan',
    reviewList: [
      { id: 'r3', userName: 'Sunita D.', rating: 5, comment: 'Perfect balance of spices. Very tasty.', date: '12 Sep 2023' }
    ]
  },
  {
    id: '3',
    name: 'Organic Turmeric Powder',
    category: 'Household Items', // Spices listed under Household Items
    price: 180,
    originalPrice: 220,
    discount: 18,
    rating: 4.7,
    reviews: 56,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1615485290386-dda9871e6d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'High curcumin content turmeric powder sourced directly from organic farms in Meghalaya. Adds vibrant color and potent health benefits to your meals.',
    sellerName: 'Lakshmi Bai',
    sellerDistrict: 'Shillong, Meghalaya',
    reviewList: []
  },
  {
    id: '4',
    name: 'Handmade Besan Laddu',
    category: 'Home-made Food Items',
    price: 450,
    originalPrice: 550,
    discount: 18,
    rating: 4.8,
    reviews: 42,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1605692638741-7583527968db?q=80&w=800&auto=format&fit=crop',
    description: 'Delicious, melt-in-the-mouth Besan Laddus made with pure ghee and premium gram flour. A traditional Indian sweet treat.',
    sellerName: 'Radha Gupta',
    sellerDistrict: 'Mathura, UP',
    reviewList: [
      { id: 'r4', userName: 'Pooja M.', rating: 5, comment: 'Very tasty and authentic.', date: '20 Aug 2023' }
    ]
  },
  {
    id: '5',
    name: 'Herbal Hair Oil',
    category: 'Herbal Products',
    price: 280,
    originalPrice: 350,
    discount: 20,
    rating: 4.8,
    reviews: 33,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
    description: 'A rejuvenating blend of herbs and oils to strengthen hair roots and promote growth. 100% natural and chemical-free.',
    sellerName: 'Kaveri Amma',
    sellerDistrict: 'Coimbatore, Tamil Nadu',
    reviewList: []
  },
  {
    id: '6',
    name: 'Decorative Bandhanwar',
    category: 'Handicrafts',
    price: 350,
    originalPrice: 450,
    discount: 22,
    rating: 4.9,
    reviews: 15,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1603903631867-6a1f0c143776?q=80&w=800&auto=format&fit=crop', // using generic festive image
    description: 'Beautifully handcrafted Bandhanwar to adorn your doors during festivals. Made with colorful beads and fabrics by skilled artisans.',
    sellerName: 'Priya Singh',
    sellerDistrict: 'Udaipur, Rajasthan',
    reviewList: [
      { id: 'r5', userName: 'Rahul V.', rating: 5, comment: 'Beautiful craftsmanship. Looks great on my door.', date: '01 Nov 2023' }
    ]
  },
  {
    id: '7',
    name: 'Jute Shopping Bag',
    category: 'Textiles',
    price: 150,
    originalPrice: 200,
    discount: 25,
    rating: 4.6,
    reviews: 28,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=800&auto=format&fit=crop',
    description: 'Eco-friendly and durable jute bag for your daily shopping needs. Stylish, sustainable, and sturdy.',
    sellerName: 'Meena Kumari',
    sellerDistrict: 'Kolkata, West Bengal',
    reviewList: []
  },
  {
    id: '8',
    name: 'Organic Red Chilli Powder',
    category: 'Household Items', // Spices
    price: 220,
    originalPrice: 280,
    discount: 21,
    rating: 4.5,
    reviews: 64,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1621959332717-c526d72cb172?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sun-dried red chillies ground to perfection. Adds the perfect amount of heat and vibrant red color to your dishes.',
    sellerName: 'Savitri Devi',
    sellerDistrict: 'Guntur, Andhra Pradesh',
    reviewList: []
  },
  {
    id: '9',
    name: 'Neem & Tulsi Soap',
    category: 'Herbal Products',
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 4.7,
    reviews: 12,
    isOrganic: true,
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=800&auto=format&fit=crop',
    description: 'Handmade soap enriched with the goodness of Neem and Tulsi. Gentle on skin and effective against impurities.',
    sellerName: 'Anjali Verma',
    sellerDistrict: 'Haridwar, Uttarakhand',
    reviewList: []
  },
  {
    id: '10',
    name: 'Cotton Saree',
    category: 'Textiles',
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    rating: 4.8,
    reviews: 8,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant and comfortable cotton saree, handwoven by traditional weavers. Perfect for daily wear and summer comfort.',
    sellerName: 'Rani Devi',
    sellerDistrict: 'Chanderi, MP',
    reviewList: []
  },
  {
    id: '11',
    name: 'Rose Agarbatti Pack',
    category: 'Household Items',
    price: 50,
    originalPrice: 70,
    discount: 28,
    rating: 4.9,
    reviews: 45,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1585165954428-574c4969054c?q=80&w=800&auto=format&fit=crop', // generic flower/scent image
    description: 'Premium quality incense sticks with a soothing rose fragrance. Creates a divine atmosphere for prayer and meditation.',
    sellerName: 'Pushpa Ben',
    sellerDistrict: 'Ahmedabad, Gujarat',
    reviewList: []
  },
  {
    id: '12',
    name: 'Spicy Namkeen Mix',
    category: 'Home-made Food Items',
    price: 200,
    originalPrice: 250,
    discount: 20,
    rating: 4.5,
    reviews: 30,
    isOrganic: false,
    image: 'https://images.unsplash.com/photo-1599487488170-9a12416bca55?q=80&w=800&auto=format&fit=crop',
    description: 'Crunchy and spicy namkeen mix, prepared with traditional recipes. A perfect tea-time snack.',
    sellerName: 'Indu Sharma',
    sellerDistrict: 'Indore, MP',
    reviewList: []
  }
];

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProductsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterTab, setFilterTab] = useState<'all' | 'bestsellers' | 'organic' | 'new'>('all');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Modal & Review State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  // Wishlist & Cart Context
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const categories = [
    'All', 
    'Household Items', 
    'Handicrafts', 
    'Textiles', 
    'Herbal Products', 
    'Home-made Food Items'
  ];

  const filteredProducts = products.filter(p => {
    // Search Filter
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category Filter
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    
    // Tab Filter
    if (filterTab === 'bestsellers' && p.rating < 4.8) return false;
    if (filterTab === 'organic' && !p.isOrganic) return false;
    // 'new' tab logic omitted for brevity
    
    return true;
  });

  const suggestions = products.filter(p => 
    searchQuery.length > 0 && 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setReviewForm({ name: '', rating: 5, comment: '' }); // Reset form
  };

  const handleSuggestionClick = (product: Product) => {
    handleProductClick(product);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCartId(product.id);
    setTimeout(() => setAddedToCartId(null), 2000);
  };

  const handleWhatsAppShare = (product: Product) => {
    const text = `Check out this ${product.name} on Desi Didi Mart! Price: ₹${product.price}. Seller: ${product.sellerName}, ${product.sellerDistrict}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewForm.name || !reviewForm.comment) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        const currentReviews = p.reviewList || [];
        const newCount = p.reviews + 1;
        // Calculate new weighted average rating
        const newRating = parseFloat((((p.rating * p.reviews) + newReview.rating) / newCount).toFixed(1));
        
        return {
          ...p,
          reviews: newCount,
          rating: newRating,
          reviewList: [newReview, ...currentReviews]
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    
    // Update the currently selected product view
    const updatedSelected = updatedProducts.find(p => p.id === selectedProduct.id) || null;
    setSelectedProduct(updatedSelected);
    
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="bg-cream py-8 border-b border-saffron-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-heading font-bold text-earth mb-6">Desi Didi Mart Grocery</h1>
          
          {/* Search Bar Section */}
          <div className="max-w-2xl mx-auto relative mb-6 z-40">
             <div className="flex shadow-lg rounded-full bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-saffron overflow-hidden h-12 md:h-14 transition-shadow">
                {/* Category Dropdown (Desktop) */}
                <div className="hidden md:flex items-center border-r border-gray-200 px-4 bg-gray-50 relative hover:bg-gray-100 transition-colors">
                   <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer appearance-none pr-6 text-sm"
                   >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                   <ChevronDown size={14} className="absolute right-2 text-gray-500 pointer-events-none" />
                </div>

                {/* Search Input */}
                <div className="flex-1 relative flex items-center">
                   <Search className="ml-4 text-gray-400" size={20} />
                   <input 
                     type="text"
                     placeholder="Search for ghee, spices, pickles..."
                     className="flex-1 px-4 py-2 h-full outline-none text-gray-700 placeholder-gray-400"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onFocus={() => setShowSuggestions(true)}
                     onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                   />
                   {searchQuery && (
                     <button onClick={() => setSearchQuery('')} className="p-2 text-gray-400 hover:text-gray-600">
                       <X size={16} />
                     </button>
                   )}
                </div>
                
                <button className="bg-saffron text-white px-6 md:px-8 font-medium hover:bg-saffron-600 transition-colors">
                   Search
                </button>
             </div>

             {/* Auto-Suggestions Dropdown */}
             {showSuggestions && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
                   {suggestions.length > 0 ? (
                      <ul>
                         {suggestions.map(p => (
                            <li 
                               key={p.id}
                               onMouseDown={() => handleSuggestionClick(p)}
                               className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                            >
                               <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                               <div>
                                  <p className="text-sm font-bold text-gray-900 line-clamp-1">{p.name}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{p.category}</span>
                                    <span>•</span>
                                    <span className="text-earth font-medium">₹{p.price}</span>
                                  </div>
                               </div>
                            </li>
                         ))}
                      </ul>
                   ) : (
                      <div className="p-6 text-center">
                        <ShoppingBag className="mx-auto text-gray-300 mb-2" size={24} />
                        <p className="text-sm text-gray-500">No products found matching "{searchQuery}"</p>
                      </div>
                   )}
                </div>
             )}
          </div>

          <div className="inline-block bg-saffron text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
            Flat 10% - 30% Discount for Members & Workers!
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-saffron" />
              <h3 className="font-bold text-lg text-gray-900">Categories</h3>
            </div>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-saffron-50 text-saffron font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-forest-50 rounded-lg border border-forest-100">
              <div className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest mb-2">
                    <ShoppingBag size={20} />
                 </div>
                 <p className="text-sm text-forest-800 font-bold mb-1">Why Shop With Us?</p>
                 <p className="text-xs text-forest-600">
                    100% Profits go to Rural Women. Pure, Chemical-free products.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
            {/* Filter Tabs */}
            <div className="flex overflow-x-auto gap-4 mb-6 pb-2">
                {[
                    { id: 'all', label: 'All Products' },
                    { id: 'bestsellers', label: 'Bestsellers' },
                    { id: 'organic', label: '100% Organic' },
                    { id: 'new', label: 'New Arrivals' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilterTab(tab.id as any)}
                        className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                            filterTab === tab.id 
                            ? 'bg-earth text-white shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group cursor-pointer relative"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors shadow-sm ${
                      isInWishlist(product.id) 
                      ? 'bg-white text-red-500 hover:bg-red-50' 
                      : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
                  >
                    <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                  </button>

                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.isOrganic && (
                      <div className="absolute bottom-2 left-2 bg-cream/90 text-earth text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-earth/20">
                        ORGANIC
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                      <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700 border border-yellow-100">
                        {product.rating} <Star size={10} className="fill-yellow-700" /> ({product.reviews})
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-earth">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className={`w-full flex items-center justify-center gap-2 ${addedToCartId === product.id ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {addedToCartId === product.id ? (
                        <>
                           <CheckCircle size={16} /> Added
                        </>
                      ) : (
                        <>
                           <ShoppingCart size={16} /> Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
                <Search className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try checking your spelling or use different keywords.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 text-saffron font-bold hover:underline"
                >
                  Clear all filters
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal with Reviews */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative">
                <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Product Image Side */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative shrink-0">
                    <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-sm text-saffron font-medium">
                              {selectedProduct.category}
                              {selectedProduct.isOrganic && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Organic</span>}
                          </div>
                          <button 
                            onClick={() => toggleWishlist(selectedProduct)}
                            className={`p-2 rounded-full transition-colors ${
                              isInWishlist(selectedProduct.id) 
                              ? 'bg-red-50 text-red-500' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <Heart size={20} className={isInWishlist(selectedProduct.id) ? 'fill-current' : ''} />
                          </button>
                        </div>

                        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                        
                        {/* Seller Info */}
                        {selectedProduct.sellerName && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                             <User size={16} className="text-saffron" />
                             <span>Sold by: <span className="font-bold text-gray-900">{selectedProduct.sellerName}</span></span>
                             {selectedProduct.sellerDistrict && (
                                <>
                                  <span className="text-gray-300">|</span>
                                  <MapPin size={14} className="text-gray-400" />
                                  <span>{selectedProduct.sellerDistrict}</span>
                                </>
                             )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <span className="font-bold text-lg">{selectedProduct.rating}</span>
                                <Star className="fill-current" size={18} />
                            </div>
                            <span className="text-gray-400 text-sm">|</span>
                            <span className="text-gray-500 text-sm">{selectedProduct.reviews} Reviews</span>
                        </div>
                        <div className="flex items-end gap-3 mb-6">
                             <span className="text-3xl font-bold text-earth">₹{selectedProduct.price}</span>
                             <span className="text-lg text-gray-400 line-through mb-1">₹{selectedProduct.originalPrice}</span>
                             <span className="text-sm font-bold text-green-600 mb-1.5">{selectedProduct.discount}% OFF</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {selectedProduct.description || "Experience the authentic taste of tradition with this premium village-made product. Sourced directly from rural households, ensuring 100% purity and quality."}
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <Button 
                                  variant="primary" 
                                  className="flex-1"
                                  onClick={() => {
                                    addToCart(selectedProduct);
                                    setSelectedProduct(null); // Close and maybe navigate or show toast
                                  }}
                                >
                                  Buy Now
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={(e) => handleAddToCart(e, selectedProduct)}
                                >
                                    {addedToCartId === selectedProduct.id ? 'Added!' : 'Add to Cart'}
                                </Button>
                            </div>
                            <Button 
                                variant="secondary" 
                                className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                onClick={() => handleWhatsAppShare(selectedProduct)}
                            >
                                <Share2 size={18} className="mr-2" /> Share on WhatsApp
                            </Button>
                        </div>
                    </div>

                    {/* Reviews Section - Enhanced */}
                    <div className="border-t border-gray-100 pt-6 mt-auto bg-gray-50 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 md:p-8">
                        <h3 className="font-bold text-xl text-gray-900 mb-6">Ratings & Reviews</h3>
                        
                        <div className="flex flex-col gap-6 mb-8">
                           {/* Summary Stats */}
                           <div className="flex items-start gap-6">
                              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[120px]">
                                 <div className="text-4xl font-bold text-gray-900 mb-1">{selectedProduct.rating} <span className="text-lg text-gray-400 font-normal">/5</span></div>
                                 <div className="flex text-yellow-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                       <Star key={i} size={14} className={i < Math.round(selectedProduct.rating) ? "fill-current" : "text-gray-300"} />
                                    ))}
                                 </div>
                                 <span className="text-xs text-gray-500">{selectedProduct.reviews} Reviews</span>
                              </div>
                              
                              {/* Distribution Bars */}
                              <div className="flex-1 space-y-1.5 py-1">
                                 {[5, 4, 3, 2, 1].map(star => {
                                    const count = selectedProduct.reviewList?.filter(r => Math.round(r.rating) === star).length || 0;
                                    const total = selectedProduct.reviewList?.length || 1;
                                    const pct = (count / total) * 100;
                                    return (
                                       <div key={star} className="flex items-center gap-3 text-xs text-gray-600">
                                          <span className="w-3 font-bold">{star}</span> <Star size={10} className="text-gray-400" />
                                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                             <div className={`h-full rounded-full ${star >= 4 ? 'bg-green-500' : star === 3 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                                          </div>
                                          <span className="w-6 text-right text-gray-400">{count}</span>
                                       </div>
                                    )
                                 })}
                              </div>
                           </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedProduct.reviewList && selectedProduct.reviewList.length > 0 ? (
                                selectedProduct.reviewList.map((review) => (
                                    <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-full flex items-center justify-center text-sm font-bold text-saffron-800">
                                                    {review.userName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900">{review.userName}</p>
                                                    <div className="flex items-center gap-1">
                                                      <div className="flex bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded gap-0.5 items-center font-bold">
                                                        {review.rating} <Star size={8} className="fill-white" />
                                                      </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                                    <p className="text-sm text-gray-500">No reviews yet.</p>
                                    <p className="text-xs text-gray-400 mt-1">Be the first to share your experience!</p>
                                </div>
                            )}
                        </div>

                        {/* Add Review Form */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-saffron rounded-full"></span>
                                Write a Review
                            </h4>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Your Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Sunita Sharma" 
                                            required
                                            className="w-full px-3 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none"
                                            value={reviewForm.name}
                                            onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Your Rating</label>
                                        <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg border border-gray-300">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star} 
                                                    type="button"
                                                    onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star size={20} className={star <= reviewForm.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">Your Review</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="What did you like or dislike? What did you use this product for?" 
                                            required
                                            className="flex-1 px-3 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none"
                                            value={reviewForm.comment}
                                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                                        />
                                        <Button type="submit" size="sm" variant="primary" className="px-4 shrink-0">
                                            Submit <Send size={14} className="ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Shop;