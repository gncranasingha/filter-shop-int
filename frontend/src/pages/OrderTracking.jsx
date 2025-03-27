import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaTruck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

export default function OrderTracking() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const statusStages = [
    { id: 'placed', label: 'Order Placed', icon: FaClock },
    { id: 'processed', label: 'Processed', icon: FaCheckCircle },
    { id: 'shipped', label: 'Shipped', icon: FaTruck },
    { id: 'delivered', label: 'Delivered', icon: FaCheckCircle },
  ];

  const trackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');

    
    setTimeout(() => {
      try {
       
        const mockOrders = {
          '12345': {
            id: '12345',
            date: '2023-06-15',
            status: 'shipped',
            items: [
              { name: 'tshirts', quantity: 2, price: 24.99 },
              { name: 'shouse', quantity: 1, price: 34.99 },
            ],
            total: 84.97,
            shippingAddress: '130-b2, ussana division track 06, anuradhapura',
            estimatedDelivery: '2023-06-20',
          },
      
        };

        const foundOrder = mockOrders[orderId];
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          throw new Error('Order not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={trackOrder} className="mb-8">
          <div className="flex">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
              className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-6 py-2 rounded-r transition-colors duration-300 disabled:opacity-70"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        
        {order && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>
            <p className="text-gray-600 mb-6">Placed on {new Date(order.date).toLocaleDateString()}</p>
            
            {/* Order Status */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Order Status</h3>
              <div className="relative">
                <div className="absolute h-1 bg-gray-200 top-1/2 left-0 right-0 -translate-y-1/2"></div>
                <div className="relative flex justify-between">
                  {statusStages.map((stage, index) => {
                    const isCompleted = statusStages.findIndex(s => s.id === order.status) >= index;
                    const Icon = stage.icon;
                    
                    return (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 z-10 ${
                          isCompleted ? 'bg-[#2563eb] text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`text-sm ${isCompleted ? 'text-[#2563eb] font-medium' : 'text-gray-500'}`}>
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.quantity} × {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t mt-4 pt-4 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <p className="mb-2">{order.shippingAddress}</p>
                {order.estimatedDelivery && (
                  <p>
                    <span className="font-medium">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}