import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { IoIosStar } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              <Link to={`/products/${product.id}`} className="hover:text-[#2563eb]">
                {product.name}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm">{product.brand}</p>
          </div>
          <div className="bg-[#2563eb] text-white px-2 py-1 rounded text-sm font-medium">
            ${product.price}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IoIosStar 
                key={i}
                className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center bg-[#2563eb] hover:bg-[#1e40af] text-white py-2 rounded transition-colors duration-300"
        >
          <FaCartArrowDown className="h-5 w-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}