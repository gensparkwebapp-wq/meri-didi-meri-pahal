import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-2xl text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-red-400 fill-red-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your wishlist yet.</p>
          <Link to="/shop">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-8">
            <Link to="/shop" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-gray-600 border border-gray-200">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-heading font-bold text-earth">My Wishlist ({wishlist.length})</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group relative">
              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
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
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-700">
                      {product.rating} <Star size={10} className="fill-yellow-700" />
                    </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-earth">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <Button 
                  onClick={() => handleMoveToCart(product)}
                  variant="primary" 
                  className="w-full flex items-center justify-center gap-2 text-sm h-9"
                >
                  <ShoppingCart size={16} /> Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;