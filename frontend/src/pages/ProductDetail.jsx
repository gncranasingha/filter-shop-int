import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { IoMdStar } from "react-icons/io";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
         const mockProducts = [
          {
            id: '1',
            name: 'tshirt',
            brand: 'polo',
            price: 24.99,
            rating: 4,
            reviews: 128,
            images: [
              'https://www.mrbigandtall.ca/cdn/shop/products/BW-5463-964-1101_black.jpg?v=1656516131',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-9vUNtDCH_MidCfxM9jss6pjL764FqFWNA&s',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkXnTgtGCkfF1PcXyPR5UIEnSkgdMT1DNvQ&s',
            ],
            category: 'tshirt',
            description: 'sfein foij er jiegei egij egoijg regrdjihdiseij  gijgrg ',
            specifications: {
              dimensions: '20" x 20" x 1"',
              mervRating: 'MERV 11',
              lifespan: '3-6 months',
              compatibility: 'dfrj refdp rthtje etpjo'
            }
          },
          
        ];
        
        const foundProduct = mockProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
         <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 border-2 rounded ${selectedImage === index ? 'border-[#2563eb]' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        
      
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">Brand: {product.brand}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoMdStar 
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-2xl font-bold text-[#2563eb] mb-6">${product.price}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l"
              >
                -
              </button>
              <span className="border-t border-b border-gray-200 px-4 py-1">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>
                
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white py-3 rounded-lg mb-4 transition-colors duration-300"
          >
            Add to Cart
          </button>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Product Specifications</h3>
            <ul className="space-y-1">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="flex">
                  <span className="font-medium w-32">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
     
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    </div>
  );
}