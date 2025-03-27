import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    brand: '',
  });
  
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
   
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const mockProducts = [
         
          {
            id: 1,
            name: 't-shirt 01',
            brand: 'nike',
            price: 24.99,
            rating: 4,
            reviews: 128,
            image: 'https://www.artofbrilliance.co.uk/wp-content/uploads/2021/07/aob-tshirt.jpg',
            category: 'tshirt',
            type: 'standard',
          },
          {
            id: 2,
            name: 't-shirt 02',
            brand: 'addidas',
            price: 34.99,
            rating: 5,
            reviews: 256,
            image: 'https://cbu01.alicdn.com/img/ibank/O1CN01umiZRL1QqPeLj6e0G_!!2215075932027-0-cib.jpg',
            category: 'tshirt',
            type: 'hepa',
          },
         
          {
            id: 3,
            name: 't-shirt 03',
            brand: 'addidas',
            price: 89.99,
            rating: 4,
            reviews: 175,
            image: 'https://media.canva.com/v2/mockup-template-rasterize/color0:171618/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAFLsJd5odY%2F1%2F0%2F933w-xBtZhbBcHcY.png/mockuptemplateid:FAqieNuus/size:L?csig=AAAAAAAAAAAAAAAAAAAAAJMmC2EC1RinE1lugh9Drm7WFO7n0qLEo4Inge8OKrL0&exp=1743136641&osig=AAAAAAAAAAAAAAAAAAAAAJ7shCzQ-itJsguDYg2oaCdnyqYUuaYPwGtcAPPY2QnS&seoslug=black-bold-logo-text-graphic-t-shirt&signer=marketplace-rpc',
            category: 'shouse',
            type: 'under-sink',
          },
          
          {
            id: 4,
            name: 't-shirt 04',
            brand: 'polo',
            price: 12.99,
            rating: 4,
            reviews: 89,
            image: 'https://us.karhu.com/cdn/shop/products/Photo_1_c2c9d1a3-bcb1-49fd-bf9a-79542dddf04d_1500x.jpg?v=1649252687',
            category: 'shouse',
            type: 'synthetic',
          },
         
        ];
        
          let filteredProducts = mockProducts;
        if (category) {
          filteredProducts = mockProducts.filter(
            product => product.category === category.toLowerCase().replace(' ', '-')
          );
        }
        
        // Apply additional filters
        if (filters.category) {
          filteredProducts = filteredProducts.filter(
            product => product.category === filters.category
          );
        }
        if (filters.brand) {
          filteredProducts = filteredProducts.filter(
            product => product.brand.toLowerCase() === filters.brand.toLowerCase()
          );
        }
        if (filters.price) {
          const [min, max] = filters.price.split('-').map(Number);
          filteredProducts = filteredProducts.filter(
            product => product.price >= min && product.price <= max
          );
        }
        
        // sorting
        filteredProducts = [...filteredProducts].sort((a, b) => {
          switch (sortOption) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            default:
              return a.id - b.id; // Default sort by ID 
          }
        });
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, filters, sortOption]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="shouse">Shouse</option>
              <option value="tshirt">tshits</option>
              
            </select>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Prices</option>
              <option value="0-20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-">Over $100</option>
            </select>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Brand</h3>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Brands</option>
              <option value="addidas">Addidas</option>
              <option value="polo">Polo</option>
              <option value="nike">Nike</option>
              
            </select>
          </div>
          
          <button
            onClick={() => setFilters({
              category: '',
              price: '',
              brand: '',
            })}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded transition-colors duration-300"
          >
            Clear Filters
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p>{products.length} products found</p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">No products match your filters.</p>
              <button
                onClick={() => setFilters({
                  category: '',
                  price: '',
                  brand: '',
                })}
                className="mt-4 bg-[#2563eb] text-white px-4 py-2 rounded hover:bg-[#1e40af]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}