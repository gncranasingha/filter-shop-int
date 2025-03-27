import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { FaCartArrowDown } from "react-icons/fa";

export default function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <FaCartArrowDown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any filters to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block bg-[#2563eb] hover:bg-[#1e40af] text-white font-medium py-2 px-6 rounded transition-colors duration-300"
          > 
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-semibold">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3">Quantity</div>
              <div className="col-span-2">Total</div>
            </div>
            
            {cart.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
            
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="block w-full bg-[#2563eb] hover:bg-[#1e40af] text-white text-center font-medium py-3 rounded transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
          
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold mb-2">Promo Code</h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
              />
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r transition-colors duration-300">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}