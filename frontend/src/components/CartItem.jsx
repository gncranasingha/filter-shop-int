import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, newQuantity);
    setQuantity(qty);
    onUpdateQuantity(item.id, qty);
  };

  return (
    <div className="grid grid-cols-12 items-center p-4 border-b">
      <div className="col-span-5 flex items-center">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 mr-4"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
        <Link to={`/products/${item.id}`} className="flex items-center">
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-16 w-16 object-cover rounded mr-4"
          />
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.brand}</p>
          </div>
        </Link>
      </div>
      
      <div className="col-span-2 text-gray-700">${item.price.toFixed(2)}</div>
      
      <div className="col-span-3">
        <div className="flex items-center">
          <button 
            onClick={() => handleQuantityChange(quantity - 1)}
            className="bg-gray-200 px-3 py-1 rounded-l"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="w-16 text-center border-t border-b border-gray-200 py-1"
          />
          <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded-r"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="col-span-2 text-right font-medium">
        ${(item.price * quantity).toFixed(2)}
      </div>
    </div>
  );
}