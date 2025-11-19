import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-2xl text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-saffron-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-saffron fill-saffron/20" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
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
            <h1 className="text-3xl font-heading font-bold text-earth">Shopping Cart ({cart.length} Items)</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category} {item.isOrganic && '• Organic'}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-earth">
                    <span>₹{item.price}</span>
                    {item.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through font-normal">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-bold text-lg text-earth">₹{item.price * item.quantity}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium pl-2">
                Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-earth mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5% GST)</span>
                  <span>₹{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full mb-3">
                Proceed to Checkout
              </Button>
              <Link to="/shop">
                <Button variant="outline" className="w-full justify-center">
                    Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                <strong>Note:</strong> Delivery usually takes 3-5 business days. Cash on Delivery is available for this order.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;