import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: 'Tshirt 01',
            brand: 'polo',
            price: 24.99,
            rating: 4,
            reviews: 128,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOitT4riB-dKG5ZRXS6DMyRfGUH43C7R3lmw&s',
          },
          {
            id: 2,
            name: 't-shirt',
            brand: 'addidas',
            price: 34.99,
            rating: 5,
            reviews: 256,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwf-V9T39H5c6CI-i3VsA4452AIJGSGUldcQ&s',
          },
          {
            id: 3,
            name: 't-shirt',
            brand: 'addidas',
            price: 12.99,
            rating: 4,
            reviews: 89,
            image: 'https://assets.timberland.com/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1721255330/TB0A6WWTP47-ALT10/Small-Logo-Print-Short-Sleeve-TShirt.png',
          },
          {
            id: 4,
            name: 'tshirt',
            brand: 'polo',
            price: 29.99,
            rating: 4,
            reviews: 175,
            image: 'https://www.artofbrilliance.co.uk/wp-content/uploads/2021/07/aob-tshirt.jpg',
          },
        ];
        
        setFeaturedProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      
      <div className="bg-[#2563eb] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quality cloths for Every Need</h1>
          <p className="text-xl mb-8">Find the perfect Cloths for you</p>
          <SearchBar />
        </div>
      </div>
      
     
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-[#2563eb] hover:underline">
            View All Products
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2563eb]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      
      <div className="bg-[#1e40af] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Summer Sale - Up to 30% Off!</h2>
          <p className="text-xl mb-6">Limited time offer on selected tshirts. Don't miss out!</p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-[#2563eb] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
      
     
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Air Filters', 'Water Filters', 'Oil Filters', 'HVAC Filters'].map((category, index) => (
            <Link 
              key={index} 
              to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-2xl">{index + 1}</span>
              </div>
              <h3 className="font-semibold">{category}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}