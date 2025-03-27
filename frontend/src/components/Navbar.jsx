import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaCartArrowDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-hot-toast';
import { FaPhoneAlt } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiIdentification } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";



export default function Navbar() {
  const { currentUser } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
 
 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
         
          <Link to="/" className="text-2xl font-bold text-[#2563eb]" onClick={closeAllMenus}>
            FilterShop
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-[#2563eb] font-medium' : 'text-gray-600 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
             
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-[#2563eb] font-medium' : 'text-gray-600 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              
              <span>Products</span>
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-[#2563eb] font-medium' : 'text-gray-600 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              <span>About</span>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-[#2563eb] font-medium' : 'text-gray-600 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
                <span>Contact</span>
            </NavLink>
          </div>

         
          <div className="flex items-center space-x-4">
          
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-[#2563eb]"
              onClick={closeAllMenus}
            >
              <FaCartArrowDown className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2563eb] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-2 text-gray-600 hover:text-[#2563eb] flex items-center"
                  aria-label="User menu"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="h-6 w-6" />
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Account
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="p-2 text-gray-600 hover:text-[#2563eb]"
                onClick={closeAllMenus}
              >
                <FaUser className="h-6 w-6" />
              </Link>
            )}

         
            <button
              className="md:hidden p-2 text-gray-600 hover:text-[#2563eb]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#2563eb] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              <div className="flex items-center">
                <IoHomeSharp className="h-5 w-5 mr-2" />
                Home
              </div>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#2563eb] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              <div className="flex items-center">
                <HiMiniSquares2X2 className="h-5 w-5 mr-2" />
                Products
              </div>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#2563eb] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              <div className="flex items-center">
                < HiIdentification className="h-5 w-5 mr-2" />
                About
              </div>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#2563eb] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]'}`
              }
              onClick={closeAllMenus}
            >
              <div className="flex items-center">
                <FaPhoneAlt className="h-5 w-5 mr-2" />
                Contact
              </div>
            </NavLink>

            {currentUser && (
              <>
                <NavLink
                  to="/account"
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#2563eb] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]'}`
                  }
                  onClick={closeAllMenus}
                >
                  <div className="flex items-center">
                    <FaUser className="h-5 w-5 mr-2" />
                    My Account
                  </div>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#2563eb]"
                >
                  <div className="flex items-center">
                    < FaArrowCircleLeft className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}