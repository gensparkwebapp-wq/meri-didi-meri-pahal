
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle, Truck, ShieldCheck, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping State
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '',
    landmark: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      navigate('/shop');
    }
  }, [cart, navigate, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };

  const grandTotal = cartTotal + Math.round(cartTotal * 0.05); // Including 5% Tax

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-green-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-6">Thank you for shopping with Desi Didi Mart. Your order has been confirmed.</p>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 text-left">
             <div className="flex justify-between mb-2">
                <span className="text-gray-500 text-sm">Order ID</span>
                <span className="font-bold text-gray-900">{orderId}</span>
             </div>
             <div className="flex justify-between mb-2">
                <span className="text-gray-500 text-sm">Estimated Delivery</span>
                <span className="font-bold text-gray-900">3-5 Days</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Amount to Pay</span>
                <span className="font-bold text-saffron">₹{grandTotal}</span>
             </div>
          </div>

          <div className="space-y-3">
            <Link to="/profile">
              <Button variant="primary" className="w-full">Track Order</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200 py-4">
         <div className="container mx-auto px-4 flex items-center gap-4">
            <Link to="/cart" className="text-gray-500 hover:text-gray-900">
               <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
         </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Left Column - Steps */}
          <div className="flex-1 space-y-6">
             
             {/* Step 1: Shipping */}
             <div className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${step === 1 ? 'border-saffron ring-1 ring-saffron' : 'border-gray-200 opacity-60'}`}>
                <div className="flex items-center gap-3 mb-6">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 1 ? 'bg-saffron' : 'bg-gray-300'}`}>1</div>
                   <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <MapPin size={20} /> Shipping Address
                   </h2>
                </div>
                
                {step === 1 && (
                   <div className="grid md:grid-cols-2 gap-4 animate-in fade-in">
                      <div className="col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                         <input 
                           name="fullName" 
                           value={shippingDetails.fullName} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="Receiver's Name"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                         <input 
                           name="phone" 
                           value={shippingDetails.phone} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="10-digit number"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                         <input 
                           name="pincode" 
                           value={shippingDetails.pincode} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="e.g. 302020"
                         />
                      </div>
                      <div className="col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Flat / House No / Building</label>
                         <input 
                           name="address" 
                           value={shippingDetails.address} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                           placeholder="Address Line 1"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                         <input 
                           name="city" 
                           value={shippingDetails.city} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                         <input 
                           name="state" 
                           value={shippingDetails.state} 
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                         />
                      </div>
                      <div className="col-span-2 pt-4">
                         <Button 
                           onClick={() => setStep(2)} 
                           className="w-full md:w-auto"
                           disabled={!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.address}
                         >
                            Deliver Here
                         </Button>
                      </div>
                   </div>
                )}
                {step > 1 && (
                   <div className="text-sm text-gray-600 pl-11">
                      <p className="font-bold text-gray-900">{shippingDetails.fullName}</p>
                      <p>{shippingDetails.address}, {shippingDetails.city} - {shippingDetails.pincode}</p>
                      <p>{shippingDetails.phone}</p>
                      <button onClick={() => setStep(1)} className="text-saffron font-bold text-xs mt-2 hover:underline">CHANGE</button>
                   </div>
                )}
             </div>

             {/* Step 2: Payment */}
             <div className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${step === 2 ? 'border-saffron ring-1 ring-saffron' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 2 ? 'bg-saffron' : 'bg-gray-300'}`}>2</div>
                   <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard size={20} /> Payment Method
                   </h2>
                </div>

                {step === 2 && (
                   <div className="space-y-4 animate-in fade-in">
                      <div 
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 ${paymentMethod === 'upi' ? 'border-saffron bg-saffron-50' : 'border-gray-200 hover:border-saffron'}`}
                      >
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-saffron' : 'border-gray-300'}`}>
                            {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-saffron"></div>}
                         </div>
                         <span className="font-medium">UPI (Google Pay / PhonePe)</span>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-saffron bg-saffron-50' : 'border-gray-200 hover:border-saffron'}`}
                      >
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-saffron' : 'border-gray-300'}`}>
                            {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-saffron"></div>}
                         </div>
                         <div>
                            <span className="font-medium block">Cash on Delivery</span>
                            <span className="text-xs text-gray-500">Pay when you receive the order</span>
                         </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                         <div className="bg-green-50 p-3 rounded-lg flex items-start gap-3 mb-4">
                            <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-sm font-bold text-green-800">Safe & Secure Payment</p>
                               <p className="text-xs text-green-600">Every order supports a rural woman entrepreneur directly.</p>
                            </div>
                         </div>
                         <Button 
                           onClick={handlePlaceOrder} 
                           className="w-full py-3 text-lg shadow-lg shadow-saffron/20"
                           isLoading={isProcessing}
                         >
                            {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                         </Button>
                      </div>
                   </div>
                )}
             </div>

             <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500 text-sm">
                <Truck size={16} className="inline mr-2" />
                Free Delivery on this order
             </div>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-96 shrink-0">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                   <ShoppingBag size={18} /> Order Summary
                </h3>
                
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                   {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 text-sm">
                         <div className="w-12 h-12 rounded-md bg-gray-100 shrink-0 overflow-hidden">
                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="flex-1">
                            <p className="text-gray-900 line-clamp-2">{item.name}</p>
                            <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                         </div>
                         <div className="font-bold text-gray-900">₹{item.price * item.quantity}</div>
                      </div>
                   ))}
                </div>

                <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                   <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="text-green-600 font-bold">Free</span>
                   </div>
                   <div className="flex justify-between text-gray-600">
                      <span>Tax (5%)</span>
                      <span>₹{Math.round(cartTotal * 0.05)}</span>
                   </div>
                   <div className="flex justify-between font-bold text-lg text-earth pt-2 border-t border-dashed border-gray-200 mt-2">
                      <span>Total</span>
                      <span>₹{grandTotal}</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
