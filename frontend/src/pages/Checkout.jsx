import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPaymentSlip(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //  process the order here
    console.log('Order submitted:', {
      user: currentUser?.uid,
      shippingInfo: formData,
      paymentMethod,
      paymentSlip,
      items: cart,
      total: totalPrice,
    });
    
   
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/track-order?orderId=12345'); 
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                    className="h-4 w-4 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <label htmlFor="credit" className="ml-2">Credit/Debit Card</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="h-4 w-4 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  <label htmlFor="bank" className="ml-2">Bank Transfer</label>
                </div>
                
                {paymentMethod === 'bank' && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm mb-2">Please upload your payment slip after making the bank transfer.</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#2563eb] file:text-white
                        hover:file:bg-[#1e40af]"
                    />
                  </div>
                )}
              </div>
            </div>
           
            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold py-3 rounded-lg transition-colors duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}